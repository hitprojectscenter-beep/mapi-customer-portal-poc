import { NextRequest, NextResponse } from "next/server";
import {
  sheetsConfigured, chatConfigured, sheetUrl, appendOrderRow, chatNotify
} from "@/lib/googleServer";
import { dbConfigured, insertOrder } from "@/lib/db";
import { emailConfigured, sendEmail, salesEmail, brandedEmail, esc } from "@/lib/emailServer";

export const runtime = "nodejs";

// Per-IP throttle for the public order-intake endpoint
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 20;

function throttled(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

const s = (v: unknown, max = 200): string => (typeof v === "string" ? v.slice(0, max) : "");

/** Status for admin surfaces: is the portal database live? */
export async function GET() {
  return NextResponse.json({
    ok: true,
    postgres: dbConfigured(),
    sheets: sheetsConfigured(),
    chat: chatConfigured(),
    email: emailConfigured(),
    sheetUrl: sheetsConfigured() ? sheetUrl() : null
  });
}

/**
 * Completed-order intake → the portal database (Google Sheets "Orders" tab)
 * + Google Chat notification. Fire-and-forget from the order wizard; demo
 * mode (no env) still returns ok so the customer flow never breaks.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) {
    return NextResponse.json({ ok: false, error: "too_many_requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const serviceName = s(body.serviceName, 120);
  const slug = s(body.slug, 60);
  if (!serviceName || !slug) {
    return NextResponse.json({ ok: false, error: "missing_service" }, { status: 422 });
  }

  if (!dbConfigured() && !sheetsConfigured() && !chatConfigured() && !emailConfigured()) {
    return NextResponse.json({ ok: true, stored: "none" });
  }

  const total = Number(body.total) || 0;
  const stored: string[] = [];
  const errors: string[] = [];

  // Primary store: PostgreSQL
  if (dbConfigured()) {
    try {
      await insertOrder({
        orderId: s(body.orderId, 40),
        serviceName, slug, total,
        routeDetails: s(body.routeDetails, 500),
        delivery: s(body.delivery, 60),
        customerName: s(body.customerName, 120),
        email: s(body.email, 120),
        phone: s(body.phone, 30)
      });
      stored.push("postgres");
    } catch (e) {
      errors.push(`postgres: ${(e as Error).message}`);
    }
  }

  if (sheetsConfigured()) {
    try {
      await appendOrderRow([
        new Date().toISOString(),
        s(body.orderId, 40),
        serviceName,
        slug,
        total,
        s(body.routeDetails, 500),
        s(body.delivery, 60),
        s(body.customerName, 120),
        s(body.email, 120),
        s(body.phone, 30),
        "התקבלה"
      ]);
      stored.push("sheets");
    } catch (e) {
      errors.push(`sheets: ${(e as Error).message}`);
    }
  }

  if (chatConfigured()) {
    try {
      await chatNotify(
        `🛒 הזמנה חדשה: *${serviceName}*` +
        `\nסה"כ: ₪${total.toLocaleString()}${body.customerName ? ` · ${s(body.customerName, 80)}` : ""}` +
        (s(body.routeDetails, 200) ? `\n${s(body.routeDetails, 200)}` : "") +
        (sheetsConfigured() ? `\n${sheetUrl()}` : "")
      );
      stored.push("chat");
    } catch (e) {
      errors.push(`chat: ${(e as Error).message}`);
    }
  }

  // Email — order confirmation to the customer + a notification to sales.
  if (emailConfigured()) {
    const orderId = s(body.orderId, 40);
    const customerEmail = s(body.email, 120);
    const customerName = s(body.customerName, 120);
    const delivery = s(body.delivery, 60);
    const routeDetails = s(body.routeDetails, 500);

    const detailRows = ([
      ["מספר הזמנה", orderId || "—"],
      ["שירות", serviceName],
      ['סה"כ לתשלום', `₪${total.toLocaleString()} (כולל מע"מ)`],
      delivery ? ["אספקה", delivery] : null,
      routeDetails ? ["פרטים", routeDetails] : null
    ].filter(Boolean) as [string, string][])
      .map(([k, v]) => `<tr><td style="padding:6px 0;color:#5b6b7b;width:38%;">${esc(k)}</td><td style="padding:6px 0;font-weight:bold;">${esc(v)}</td></tr>`)
      .join("");

    if (customerEmail) {
      try {
        await sendEmail({
          to: customerEmail,
          replyTo: salesEmail(),
          subject: `אישור הזמנה${orderId ? ` ${orderId}` : ""} — ${serviceName} · מפ"י`,
          text: `שלום ${customerName || ""}, הזמנתך ל${serviceName} התקבלה. סה"כ ₪${total.toLocaleString()}.`,
          html: brandedEmail({
            title: "אישור קבלת הזמנה",
            preheader: `הזמנתך ל${serviceName} התקבלה`,
            bodyHtml:
              `<p>שלום ${esc(customerName || "")},</p>` +
              `<p>תודה על הזמנתך מהמרכז למיפוי ישראל. ההזמנה התקבלה ונמצאת בטיפול.</p>` +
              `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:14px 0;border-top:1px solid #eee;border-bottom:1px solid #eee;">${detailRows}</table>` +
              `<p>נעדכן אותך עם התקדמות ההפקה והמסירה. ניתן לעקוב גם באזור האישי בפורטל.</p>`
          })
        });
        stored.push("email:customer");
      } catch (e) {
        errors.push(`email(customer): ${(e as Error).message}`);
      }
    }

    try {
      await sendEmail({
        to: salesEmail(),
        replyTo: customerEmail || undefined,
        subject: `הזמנה חדשה${orderId ? ` ${orderId}` : ""} — ${serviceName} · ₪${total.toLocaleString()}`,
        text: `הזמנה חדשה: ${serviceName}, ₪${total.toLocaleString()}, ${customerName} ${customerEmail || ""}.`,
        html: brandedEmail({
          title: "הזמנה חדשה התקבלה בפורטל",
          bodyHtml:
            `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows}` +
            `<tr><td style="padding:6px 0;color:#5b6b7b;width:38%;">לקוח</td><td style="padding:6px 0;">${esc(customerName || "—")}</td></tr>` +
            `<tr><td style="padding:6px 0;color:#5b6b7b;">אימייל</td><td style="padding:6px 0;">${esc(customerEmail || "—")}</td></tr>` +
            `<tr><td style="padding:6px 0;color:#5b6b7b;">טלפון</td><td style="padding:6px 0;">${esc(s(body.phone, 30) || "—")}</td></tr>` +
            `</table>` +
            (sheetsConfigured() ? `<p style="margin-top:14px;"><a href="${sheetUrl()}" style="color:#0B61A1;">פתיחת גיליון ההזמנות ←</a></p>` : "")
        })
      });
      stored.push("email:sales");
    } catch (e) {
      errors.push(`email(sales): ${(e as Error).message}`);
    }
  }

  if (errors.length > 0) console.warn("[orders intake]", errors.join(" | "));
  return NextResponse.json({
    ok: errors.length === 0 || stored.length > 0,
    stored: stored.join("+") || "none",
    emailed: stored.includes("email:customer")
  });
}

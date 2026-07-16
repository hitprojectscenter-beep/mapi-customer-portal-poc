import { NextRequest, NextResponse } from "next/server";
import {
  sheetsConfigured, chatConfigured, sheetUrl, appendLeadRow, chatNotify
} from "@/lib/googleServer";

export const runtime = "nodejs";

// Basic per-IP throttle for the public intake endpoint
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 30;

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

interface LeadPayload {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  organization?: string;
  familyLabel?: string;
  interest?: string;
  sourceLabel?: string;
  score?: number;
  band?: string;
  assignee?: string;
  queue?: string;
  estimatedValue?: number;
  campaign?: string;
}

const s = (v: unknown, max = 200): string =>
  typeof v === "string" ? v.slice(0, max) : "";

/** Status for the admin console: is the Workspace backend live? */
export async function GET() {
  return NextResponse.json({
    ok: true,
    sheets: sheetsConfigured(),
    chat: chatConfigured(),
    sheetUrl: sheetsConfigured() ? sheetUrl() : null
  });
}

/**
 * Lead intake → Google Workspace.
 * Called fire-and-forget from the public capture hooks; when Sheets is not
 * configured this still returns ok so the demo flow is unaffected.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) {
    return NextResponse.json({ ok: false, error: "too_many_requests" }, { status: 429 });
  }

  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Spec minimum (HLD 4.2): first + last name + phone-or-email
  const firstName = s(body.firstName, 60);
  const lastName = s(body.lastName, 60);
  const email = s(body.email, 120);
  const phone = s(body.phone, 30);
  if (!firstName || !lastName || (!email && !phone)) {
    return NextResponse.json({ ok: false, error: "below_minimum" }, { status: 422 });
  }

  if (!sheetsConfigured() && !chatConfigured()) {
    return NextResponse.json({ ok: true, stored: "none" });
  }

  const stored: string[] = [];
  const errors: string[] = [];

  if (sheetsConfigured()) {
    try {
      await appendLeadRow([
        new Date().toISOString(),
        s(body.id, 40),
        firstName,
        lastName,
        email,
        phone,
        s(body.organization, 120),
        s(body.familyLabel, 60),
        s(body.interest, 160),
        s(body.sourceLabel, 40),
        Number(body.score) || 0,
        s(body.band, 10),
        s(body.assignee, 60),
        s(body.queue, 60),
        Number(body.estimatedValue) || 0,
        s(body.campaign, 80)
      ]);
      stored.push("sheets");
    } catch (e) {
      errors.push(`sheets: ${(e as Error).message}`);
    }
  }

  if (chatConfigured()) {
    try {
      const value = Number(body.estimatedValue) > 0 ? ` · היקף משוער ₪${Number(body.estimatedValue).toLocaleString()}` : "";
      await chatNotify(
        `🔔 ליד חדש: *${firstName} ${lastName}*` +
        (body.organization ? ` (${s(body.organization, 80)})` : "") +
        `\n${s(body.familyLabel, 60)} · מקור: ${s(body.sourceLabel, 40)} · ניקוד AI: ${Number(body.score) || 0}/100${value}` +
        `\nמטפל: ${s(body.assignee, 60)}` +
        (sheetsConfigured() ? `\n${sheetUrl()}` : "")
      );
      stored.push("chat");
    } catch (e) {
      errors.push(`chat: ${(e as Error).message}`);
    }
  }

  // Partial success still reports what worked; failures are logged server-side
  if (errors.length > 0) console.warn("[leads intake]", errors.join(" | "));
  return NextResponse.json({ ok: errors.length === 0 || stored.length > 0, stored: stored.join("+") || "none" });
}

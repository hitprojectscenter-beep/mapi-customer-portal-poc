import { NextRequest, NextResponse } from "next/server";
import { sheetsConfigured, chatConfigured, appendFeedbackRow, chatNotify } from "@/lib/googleServer";
import { dbConfigured, insertFeedback } from "@/lib/db";

export const runtime = "nodejs";

// Per-IP throttle for the public feedback endpoint
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 15;

function throttled(ip: string): boolean {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || e.resetAt < now) { hits.set(ip, { count: 1, resetAt: now + WINDOW_MS }); return false; }
  e.count += 1;
  return e.count > MAX_HITS;
}

const s = (v: unknown, max = 1000): string => (typeof v === "string" ? v.slice(0, max) : "");

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) return NextResponse.json({ ok: false, error: "too_many_requests" }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 }); }

  const kind = body.kind === "error" ? "error" : "survey";
  const rating = kind === "survey" ? Math.max(0, Math.min(5, Number(body.rating) || 0)) : null;
  const message = s(body.message, 2000);
  const pageUrl = s(body.pageUrl, 300);
  const email = s(body.email, 120);

  // A survey needs a rating; an error report needs a message
  if (kind === "survey" && !rating) return NextResponse.json({ ok: false, error: "no_rating" }, { status: 422 });
  if (kind === "error" && !message) return NextResponse.json({ ok: false, error: "no_message" }, { status: 422 });

  if (!dbConfigured() && !sheetsConfigured() && !chatConfigured()) {
    return NextResponse.json({ ok: true, stored: "none" });
  }

  const stored: string[] = [];
  const errors: string[] = [];

  if (dbConfigured()) {
    try { await insertFeedback({ kind, rating, message, pageUrl, email }); stored.push("postgres"); }
    catch (e) { errors.push(`postgres: ${(e as Error).message}`); }
  }
  if (sheetsConfigured()) {
    try { await appendFeedbackRow([new Date().toISOString(), kind === "error" ? "דיווח שגיאה" : "סקר שביעות רצון", rating ?? "", message, pageUrl, email]); stored.push("sheets"); }
    catch (e) { errors.push(`sheets: ${(e as Error).message}`); }
  }
  if (chatConfigured()) {
    try {
      await chatNotify(
        kind === "error"
          ? `⚠️ דיווח על טעות: ${message}${email ? `\nמאת: ${email}` : ""}${pageUrl ? `\nעמוד: ${pageUrl}` : ""}`
          : `⭐ סקר שביעות רצון: ${rating}/5${message ? `\n"${message}"` : ""}${pageUrl ? `\n${pageUrl}` : ""}`
      );
      stored.push("chat");
    } catch (e) { errors.push(`chat: ${(e as Error).message}`); }
  }

  if (errors.length) console.warn("[feedback]", errors.join(" | "));
  return NextResponse.json({ ok: errors.length === 0 || stored.length > 0, stored: stored.join("+") || "none" });
}

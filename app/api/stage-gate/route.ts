import { NextRequest, NextResponse } from "next/server";
import { STAGE_COOKIE, stagePassword, stageToken } from "@/lib/stageGate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Verify the staging password and set the gate cookie. Only meaningful in the
// preview environment; the middleware is what enforces the gate.
export async function POST(req: NextRequest) {
  let body: { password?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 }); }

  const pw = stagePassword();
  if (!pw) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  if (typeof body?.password !== "string" || body.password !== pw) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(STAGE_COOKIE, await stageToken(pw), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12 // 12h
  });
  return res;
}

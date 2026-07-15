import { NextRequest, NextResponse } from "next/server";
import {
  verifyCredentials,
  issueToken,
  rateLimitOk,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS
} from "@/lib/cmsServer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimitOk(ip)) {
    return NextResponse.json(
      { ok: false, error: "too_many_attempts" },
      { status: 429 }
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";
  const payload = verifyCredentials(email, password);
  if (!payload) {
    return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
  }

  const res = NextResponse.json({
    ok: true,
    session: { email: payload.email, name: payload.name, role: payload.role }
  });
  res.cookies.set(SESSION_COOKIE, issueToken(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS
  });
  return res;
}

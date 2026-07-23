import { NextRequest, NextResponse } from "next/server";
import { issueToken, rateLimitOk, SESSION_COOKIE, SESSION_TTL_SECONDS } from "@/lib/cmsServer";

export const runtime = "nodejs";

// "Sign in with Google Workspace" for the CMS back-office.
// The client posts the Google Identity Services ID token (credential);
// we verify it against Google's tokeninfo endpoint and gate on an email
// allowlist, then issue the same HMAC session cookie as password login.

const CLIENT_ID = (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "").trim();

function allowedEmails(): string[] {
  const raw = (process.env.CMS_ALLOWED_GOOGLE_EMAILS || "mapicomportal@gmail.com,hitprojectscenter@gmail.com").trim();
  return raw.split(",").map(e => e.trim().toLowerCase()).filter(Boolean);
}

interface TokenInfo {
  aud?: string;
  email?: string;
  email_verified?: string;
  name?: string;
  exp?: string;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimitOk(ip)) {
    return NextResponse.json({ ok: false, error: "too_many_attempts" }, { status: 429 });
  }
  if (!CLIENT_ID) {
    return NextResponse.json({ ok: false, error: "google_login_disabled" }, { status: 404 });
  }

  let credential = "";
  try {
    const body = await req.json();
    credential = typeof body?.credential === "string" ? body.credential : "";
  } catch { /* handled below */ }
  if (!credential) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Server-side verification with Google (signature, expiry, audience)
  const res = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "invalid_token" }, { status: 401 });
  }
  const info = (await res.json()) as TokenInfo;

  const email = (info.email || "").toLowerCase();
  if (
    info.aud !== CLIENT_ID ||
    info.email_verified !== "true" ||
    !email ||
    !allowedEmails().includes(email)
  ) {
    return NextResponse.json({ ok: false, error: "not_authorized" }, { status: 403 });
  }

  const payload = {
    email,
    name: info.name || "מנהל תוכן",
    role: "ראש אגף שיווק ומכירות",
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  };
  const out = NextResponse.json({ ok: true, session: { email: payload.email, name: payload.name, role: payload.role } });
  out.cookies.set(SESSION_COOKIE, issueToken(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS
  });
  return out;
}

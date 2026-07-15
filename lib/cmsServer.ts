// Server-side CMS auth utilities (Node runtime only — used by /api/cms/*).
// Production-grade within the Vercel platform:
//  - credential hashes come from env (rotate without a code change)
//  - session is a signed HMAC token in an httpOnly cookie (JS cannot read it)
//  - login endpoint is rate-limited
// The demo fallbacks keep the POC working when env vars are not set.

import { createHash, createHmac, timingSafeEqual } from "crypto";

// -- Credentials ------------------------------------------------------------

// Fallbacks = the demo manager account (same hashes as the original POC gate)
const EMAIL_HASH =
  process.env.CMS_EMAIL_HASH ||
  "26b98d010dc8ce83ed05af9b95f6456b59c72bb7cac8cce0a771f46f298b4183";
const PASSWORD_HASH =
  process.env.CMS_PASSWORD_HASH ||
  "3be2b71f27d50b5d49dfcd1173e6bbacdb8ef4fece6d758a24e69affac7a2a67";

const SESSION_SECRET = process.env.CMS_SESSION_SECRET || "mapi-poc-dev-secret-not-for-real-use";
if (process.env.NODE_ENV === "production" && !process.env.CMS_SESSION_SECRET) {
  console.warn("[CMS] CMS_SESSION_SECRET is not set — using the dev fallback. Set it in Vercel env.");
}

export const SESSION_COOKIE = "mapi_cms_token";
export const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8h workday

const MANAGER_NAME = process.env.CMS_MANAGER_NAME || "אלעד אסרף";
const MANAGER_ROLE = process.env.CMS_MANAGER_ROLE || "ראש אגף שיווק ומכירות";

function sha256Hex(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

function safeEqualHex(aHex: string, bHex: string): boolean {
  const a = Buffer.from(aHex, "hex");
  const b = Buffer.from(bHex, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

export interface CmsTokenPayload {
  email: string;
  name: string;
  role: string;
  exp: number; // unix seconds
}

export function verifyCredentials(email: string, password: string): CmsTokenPayload | null {
  const emailOk = safeEqualHex(sha256Hex(email.trim().toLowerCase()), EMAIL_HASH);
  const passOk = safeEqualHex(sha256Hex(password), PASSWORD_HASH);
  if (!emailOk || !passOk) return null;
  return {
    email: email.trim().toLowerCase(),
    name: MANAGER_NAME,
    role: MANAGER_ROLE,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  };
}

// -- Signed token (base64url payload + HMAC) ---------------------------------

function b64url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function sign(payloadB64: string): string {
  return b64url(createHmac("sha256", SESSION_SECRET).update(payloadB64).digest());
}

export function issueToken(payload: CmsTokenPayload): string {
  const p = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  return `${p}.${sign(p)}`;
}

export function verifyToken(token: string | undefined | null): CmsTokenPayload | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const p = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(p);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(p.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")
    ) as CmsTokenPayload;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

// -- Login rate limiting ------------------------------------------------------
// In-memory per serverless instance: strong enough to blunt brute force from a
// single source; a shared store (Vercel KV / Redis) is the full upgrade path.

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export function rateLimitOk(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_ATTEMPTS;
}

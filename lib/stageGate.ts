// Free, code-level password gate for the TEST/DEV (Vercel "preview") environment
// only — production and local are never gated. Lets us password-protect the
// staging URL without Vercel's paid Password Protection feature.
//
// Activation: set the env var STAGE_PASSWORD (Preview scope) in Vercel, and set
// Vercel Authentication → Disabled so requests reach the app. With no
// STAGE_PASSWORD set, the gate is inert (nobody is locked out).
//
// Edge-safe: uses only Web Crypto + TextEncoder + process.env, so it works in
// both the Edge middleware and the Node API route.

export const STAGE_COOKIE = "stage_gate";

/** The configured staging password (empty = gate disabled). */
export function stagePassword(): string {
  return (process.env.STAGE_PASSWORD || "").trim();
}

/** A non-reversible token derived from the password — stored in the cookie so
 *  the raw password is never persisted, and forging it requires the password. */
export async function stageToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`mapi-stage-gate::${password}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

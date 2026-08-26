import { NextResponse, type NextRequest } from "next/server";
import { STAGE_COOKIE, stagePassword, stageToken } from "@/lib/stageGate";

// Password gate for the TEST/DEV (non-production) environments. Two independent
// safety rails keep production public:
//   1. Explicit production (VERCEL_ENV="production") is never gated.
//   2. The gate only activates when STAGE_PASSWORD is set — and that variable is
//      configured with the "Preview" scope only, so production never has a
//      password and the gate is inert there regardless.
// We gate on "not production" (a blocklist) rather than "== preview" (an
// allowlist), because Vercel does not reliably expose VERCEL_ENV to the Edge
// middleware runtime; an allowlist would silently fail OPEN and leave test public.
export async function middleware(req: NextRequest) {
  if (process.env.VERCEL_ENV === "production") return NextResponse.next();

  const pw = stagePassword();
  if (!pw) return NextResponse.next();

  const { pathname } = req.nextUrl;
  // Always allow the gate page, its API, and framework internals.
  if (
    pathname === "/stage-gate" ||
    pathname.startsWith("/api/stage-gate") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(STAGE_COOKIE)?.value;
  if (cookie && cookie === (await stageToken(pw))) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/stage-gate";
  url.search = "";
  url.searchParams.set("from", pathname + req.nextUrl.search);
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except static assets (the gate page/API are allow-listed above).
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

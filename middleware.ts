import { NextResponse, type NextRequest } from "next/server";
import { STAGE_COOKIE, stagePassword, stageToken } from "@/lib/stageGate";

// Password gate for the TEST/DEV ("preview") environment only. Fail-open:
// production (VERCEL_ENV="production") and local (undefined) always pass, and if
// no STAGE_PASSWORD is configured the gate is inert — so it can never lock the
// live site or lock everyone out by accident.
export async function middleware(req: NextRequest) {
  if (process.env.VERCEL_ENV !== "preview") return NextResponse.next();

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

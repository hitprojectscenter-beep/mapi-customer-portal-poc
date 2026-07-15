import { NextRequest, NextResponse } from "next/server";
import { verifyToken, SESSION_COOKIE } from "@/lib/cmsServer";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const payload = verifyToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (!payload) {
    return NextResponse.json({ ok: false, session: null }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    session: { email: payload.email, name: payload.name, role: payload.role }
  });
}

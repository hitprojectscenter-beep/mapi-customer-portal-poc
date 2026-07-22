import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { dbConfigured, createPayment, getPayment, settlePayment } from "@/lib/db";

export const runtime = "nodejs";

// Payment Sandbox — simulates the שוה"ם (government payment server) contract
// from the spec (10.1 + 13.18):
//   create  → transaction + redirect URL to the hosted payment page
//   callback→ webhook with Payment Reference ID + Status (Success/Failure)
//             settles the payment and marks the order as paid
// DEMO ONLY: no real charging. In production the payment page is hosted by
// the government server; only the create/callback endpoints change targets.

const s = (v: unknown, max = 160): string => (typeof v === "string" ? v.slice(0, max) : "");

export async function GET(req: NextRequest) {
  const txId = req.nextUrl.searchParams.get("tx");
  if (!txId) {
    return NextResponse.json({ ok: true, sandbox: true, postgres: dbConfigured() });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  const payment = await getPayment(s(txId, 60));
  if (!payment) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true, payment });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const action = s(body.action, 20) || "create";

  if (action === "create") {
    const serviceName = s(body.serviceName, 120);
    const amount = Number(body.amount) || 0;
    if (!serviceName || amount <= 0) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
    }
    const txId = `tx-${randomBytes(6).toString("hex")}`;
    const referenceId = `MAPI-${Date.now().toString().slice(-8)}`;
    if (dbConfigured()) {
      await createPayment({
        txId, referenceId,
        orderId: s(body.orderId, 40),
        serviceName, slug: s(body.slug, 60), amount
      });
    }
    // Stateless demo fallback: the pay page reads these from the query string
    const q = new URLSearchParams({ ref: referenceId, svc: serviceName, amt: String(amount) });
    return NextResponse.json({
      ok: true,
      txId,
      referenceId,
      paymentUrl: `/pay/${txId}?${q.toString()}`
    });
  }

  if (action === "callback") {
    // The webhook per spec: Payment Reference ID + Status
    const txId = s(body.txId, 60);
    const status = s(body.status, 12) as "success" | "failed" | "cancelled";
    if (!txId || !["success", "failed", "cancelled"].includes(status)) {
      return NextResponse.json({ ok: false, error: "bad_callback" }, { status: 422 });
    }
    if (dbConfigured()) {
      const payment = await settlePayment(txId, status);
      if (!payment) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
      return NextResponse.json({ ok: true, referenceId: payment.reference_id, status });
    }
    return NextResponse.json({ ok: true, status, demo: true });
  }

  return NextResponse.json({ ok: false, error: "unknown_action" }, { status: 400 });
}

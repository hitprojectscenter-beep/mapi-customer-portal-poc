import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Mock GO++ (Geo++ GNSMART) connector — simulates the integration contract
// from spec 10.6 so the real SOAP integration drops in later:
//  - Two components: VRS web server + secured RTK server reachable only
//    through it (SOAP). No direct unsecured RTK access.
//  - createUser is gated on ALL FOUR: username + password + SIM + IP.
//  - monthlyUsage returns per-subscriber rows (the data that arrives today
//    as a manual Excel export — flagged high-risk in the spec).

const s = (v: unknown, max = 80): string => (typeof v === "string" ? v.slice(0, max) : "");

// Deterministic demo subscribers (Gan-Shmuel-style monthly report rows)
const SUBSCRIBERS = [
  { user: "KtzGnSh01", org: 'קיבוץ גן שמואל', product: "RTK" },
  { user: "TlvSrv02", org: "מודדי המרכז בע\"מ", product: "RTK" },
  { user: "HfaEng03", org: "הנדסה צפון", product: "VRS" },
  { user: "BshGeo04", org: "גיאו-נגב", product: "VRS" },
  { user: "JrsMap05", org: "ירושלים מדידות", product: "RTK" }
];

function usageFor(month: string) {
  // Stable pseudo-usage derived from month string (demo determinism)
  const seed = month.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return SUBSCRIBERS.map((sub, i) => {
    const minutes = ((seed * (i + 3)) % 400) + 25;
    const bankTotal = sub.product === "VRS" ? 5142 : 12; // minutes vs months
    const used = sub.product === "VRS" ? (seed * (i + 7)) % 5000 : ((seed + i) % 11) + 1;
    const utilization = Math.min(99, Math.round((used / bankTotal) * 100));
    return {
      user: sub.user,
      organization: sub.org,
      product: sub.product,
      minutesThisMonth: minutes,
      bankTotal,
      bankUsed: used,
      utilizationPct: utilization,
      renewalTriggered: utilization >= 93,
      active: minutes > 0
    };
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    connector: "GO++ GNSMART (mock)",
    protocol: "SOAP (סימולציה)",
    components: ["VRS Web Server", "Secured RTK Server (דרך ה-VRS בלבד)"],
    productionNote: "נדרש WSDL והרשאות Integration User מצוות GO++ — ראו אפיון 10.6"
  });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const action = s(body.action, 24);

  if (action === "createUser") {
    // Spec gate: user creation requires ALL of username+password+SIM+IP
    const username = s(body.username, 40);
    const password = s(body.password, 40);
    const sim = s(body.sim, 30);
    const ip = s(body.ip, 20);
    const missing: string[] = [];
    if (!username) missing.push("username");
    if (!password) missing.push("password");
    if (!sim) missing.push("SIM");
    if (!ip) missing.push("IP");
    if (missing.length > 0) {
      return NextResponse.json(
        { ok: false, error: "gate_incomplete", missing, note: "לפי אפיון 10.6: יצירת משתמש GO++ מותנית בכל ארבעת הרכיבים" },
        { status: 422 }
      );
    }
    return NextResponse.json({
      ok: true,
      created: { username, sim: sim.replace(/.(?=.{4})/g, "•"), ip, environment: "GNSMART (mock)" },
      soapAction: "urn:gnsmart#CreateSubscriber"
    });
  }

  if (action === "monthlyUsage") {
    const month = s(body.month, 7) || "2026-07";
    return NextResponse.json({
      ok: true,
      month,
      source: "בפרודקשן: SOAP pull / קליטת Excel חודשי (אוטומציית RPA — סיכון גבוה באפיון עד להסדרת API)",
      rows: usageFor(month)
    });
  }

  return NextResponse.json({ ok: false, error: "unknown_action" }, { status: 400 });
}

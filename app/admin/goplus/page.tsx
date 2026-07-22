"use client";

// GO++ (GNSMART) sync console — demonstrates the spec-10.6 contract:
// monthly usage pull (today: manual Excel), 93% renewal triggers, and the
// four-component user-creation gate (username+password+SIM+IP).

import { useState } from "react";

interface UsageRow {
  user: string; organization: string; product: string;
  minutesThisMonth: number; bankTotal: number; bankUsed: number;
  utilizationPct: number; renewalTriggered: boolean; active: boolean;
}

export default function GoPlusAdminPage() {
  const [month, setMonth] = useState("2026-07");
  const [rows, setRows] = useState<UsageRow[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [gate, setGate] = useState({ username: "", password: "", sim: "", ip: "" });
  const [gateResult, setGateResult] = useState<string | null>(null);

  const pullUsage = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/goplus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "monthlyUsage", month })
      });
      const data = await res.json();
      setRows(data?.rows || []);
    } catch {
      setRows([]);
    } finally {
      setBusy(false);
    }
  };

  const createUser = async () => {
    setGateResult(null);
    const res = await fetch("/api/goplus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "createUser", ...gate })
    });
    const data = await res.json();
    if (data?.ok) {
      setGateResult(`✓ נוצר משתמש ${data.created.username} · SIM ${data.created.sim} · ${data.created.ip} (SOAP: ${data.soapAction})`);
    } else {
      setGateResult(`✗ השער נחסם — חסרים: ${(data?.missing || []).join(", ")} (לפי אפיון 10.6 נדרשים כל הארבעה)`);
    }
  };

  const input = "w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-sm";

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-primary mb-1">סנכרון GO++ (GNSMART)</h1>
        <p className="text-sm text-on-surface-variant">
          מחבר מדומה לפי אפיון 10.6 — שרת VRS + שרת RTK מאובטח (SOAP). בפרודקשן: WSDL + Integration User מצוות GO++.
        </p>
      </header>

      {/* Monthly usage pull */}
      <section className="bg-white rounded-2xl border border-gold/25 p-5">
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <h2 className="font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-gold-dark" aria-hidden="true">cloud_sync</span>
            משיכת שימוש חודשי
          </h2>
          <input type="month" value={month} onChange={e => setMonth(e.target.value)} className={`${input} max-w-[170px]`} aria-label="חודש" />
          <button type="button" onClick={pullUsage} disabled={busy}
            className="shine btn-lux-primary px-5 py-2 rounded-full text-sm disabled:opacity-50"
            data-tooltip="בפרודקשן: SOAP pull מ-GNSMART או קליטת ה-Excel החודשי באוטומציית RPA">
            {busy ? "מושך..." : "משוך נתוני שימוש"}
          </button>
        </div>

        {rows && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right text-xs text-on-surface-variant border-b border-outline-variant">
                  <th className="py-2 pe-3">מנוי</th><th className="pe-3">ארגון</th><th className="pe-3">מוצר</th>
                  <th className="pe-3">דקות החודש</th><th className="pe-3">בנק (נוצל/סה"כ)</th><th className="pe-3">ניצול</th><th>חידוש</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.user} className="border-b border-outline-variant/40">
                    <td className="py-2 pe-3 font-mono text-xs">{r.user}</td>
                    <td className="pe-3">{r.organization}</td>
                    <td className="pe-3">{r.product}</td>
                    <td className="pe-3">{r.minutesThisMonth}</td>
                    <td className="pe-3">{r.bankUsed.toLocaleString()}/{r.bankTotal.toLocaleString()}{r.product === "VRS" ? " דק'" : " חוד'"}</td>
                    <td className="pe-3">
                      <span className={`font-bold ${r.utilizationPct >= 93 ? "text-error-red" : r.utilizationPct >= 75 ? "text-alert-yellow" : "text-positive-green"}`}>
                        {r.utilizationPct}%
                      </span>
                    </td>
                    <td>
                      {r.renewalTriggered ? (
                        <span className="text-[11px] font-bold bg-error-red/10 text-error-red rounded-full px-2 py-0.5"
                          data-tooltip="חציית סף 93% — לפי האפיון נפתחת אוטומטית הזדמנות חידוש">
                          נפתחה הזדמנות חידוש
                        </span>
                      ) : (
                        <span className="text-[11px] text-on-surface-variant">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[11px] text-on-surface-variant mt-2">
              מקור בפרודקשן: ייצוא Excel חודשי ידני (מסומן סיכון גבוה באפיון) עד להסדרת API מול צוות GO++.
            </p>
          </div>
        )}
      </section>

      {/* Four-gate user creation */}
      <section className="bg-white rounded-2xl border border-gold/25 p-5">
        <h2 className="font-bold text-primary flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-gold-dark" aria-hidden="true">person_add</span>
          יצירת משתמש GO++ — שער 4 הרכיבים
        </h2>
        <p className="text-xs text-on-surface-variant mb-4">לפי האפיון: היצירה מותנית בכל הארבעה — שם משתמש, סיסמה, SIM וכתובת IP.</p>
        <div className="grid sm:grid-cols-4 gap-3 mb-3">
          <input placeholder="שם משתמש" value={gate.username} onChange={e => setGate({ ...gate, username: e.target.value })} className={input} aria-label="שם משתמש" />
          <input placeholder="סיסמה" type="password" value={gate.password} onChange={e => setGate({ ...gate, password: e.target.value })} className={input} aria-label="סיסמה" />
          <input placeholder="SIM" value={gate.sim} onChange={e => setGate({ ...gate, sim: e.target.value })} className={input} aria-label="SIM" />
          <input placeholder="IP" value={gate.ip} onChange={e => setGate({ ...gate, ip: e.target.value })} className={input} aria-label="IP" />
        </div>
        <button type="button" onClick={createUser} className="shine btn-lux-ghost px-5 py-2 rounded-full text-sm">
          צור משתמש (סימולציה)
        </button>
        {gateResult && (
          <p className={`mt-3 text-sm font-semibold ${gateResult.startsWith("✓") ? "text-positive-green" : "text-error-red"}`} aria-live="polite">
            {gateResult}
          </p>
        )}
      </section>
    </div>
  );
}

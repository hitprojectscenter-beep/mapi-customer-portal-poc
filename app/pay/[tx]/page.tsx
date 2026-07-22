"use client";

// Mock government payment page (שוה"ם sandbox). DEMO ONLY — clearly labeled,
// card fields are disabled placeholders; real credentials must never be
// entered here. Production replaces this page with the hosted government
// payment page; the create/callback contract stays identical.

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function MockPaymentPage() {
  const params = useParams<{ tx: string }>();
  const search = useSearchParams();
  const router = useRouter();
  const txId = params?.tx || "";

  const [busy, setBusy] = useState<"success" | "failed" | "cancelled" | null>(null);
  const [done, setDone] = useState<{ status: string; ref: string } | null>(null);

  const ref = search?.get("ref") || "";
  const svc = search?.get("svc") || "";
  const amt = Number(search?.get("amt") || 0);

  useEffect(() => {
    document.title = "שרת התשלומים הממשלתי — סביבת הדגמה";
  }, []);

  const settle = async (status: "success" | "failed" | "cancelled") => {
    setBusy(status);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "callback", txId, status })
      });
      const data = await res.json();
      setDone({ status, ref: (data?.referenceId as string) || ref });
    } catch {
      setDone({ status, ref });
    } finally {
      setBusy(null);
    }
  };

  const backToPortal = () => router.push(`/orders?paid=${done?.status === "success" ? "1" : "0"}&ref=${encodeURIComponent(done?.ref || ref)}`);

  return (
    <div className="min-h-[80vh] bg-[#eef2f6] flex items-center justify-center px-4 py-10" dir="rtl">
      <div className="w-full max-w-lg">
        {/* Sandbox banner */}
        <div className="bg-alert-yellow/15 border border-alert-yellow/50 rounded-t-2xl px-5 py-3 text-center">
          <p className="text-sm font-bold text-primary">⚠️ סביבת הדגמה (Sandbox) — אין להזין פרטי תשלום אמיתיים</p>
          <p className="text-[11px] text-on-surface-variant mt-0.5">בפרודקשן: העמוד מתארח בשרת התשלומים הממשלתי (ecom.gov.il)</p>
        </div>

        <div className="bg-white rounded-b-2xl shadow-xl border border-outline-variant/40 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant/50">
            <div>
              <p className="text-xs text-on-surface-variant">שירות התשלומים הממשלתי</p>
              <p className="font-bold text-primary">מדינת ישראל — סימולציה</p>
            </div>
            <span className="material-symbols-outlined text-[40px] text-secondary" aria-hidden="true">account_balance</span>
          </div>

          {!done ? (
            <>
              <div className="bg-surface-container/60 rounded-xl p-4 mb-6 text-sm space-y-1">
                <p><span className="text-on-surface-variant">עבור:</span> <b className="text-primary">{svc || "שירות מפ\"י"}</b></p>
                <p><span className="text-on-surface-variant">סכום לחיוב:</span> <b className="text-primary">₪{amt.toLocaleString()}</b></p>
                <p><span className="text-on-surface-variant">מספר סימוכין:</span> <span className="font-mono">{ref}</span></p>
              </div>

              {/* Disabled demo card block — not a real form */}
              <div className="space-y-3 mb-6 opacity-70" aria-hidden="true">
                <input disabled value="4580 •••• •••• 1234 (דמו)" className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-sm font-mono" />
                <div className="grid grid-cols-2 gap-3">
                  <input disabled value="12/28 (דמו)" className="bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-sm font-mono" />
                  <input disabled value="••• (דמו)" className="bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-sm font-mono" />
                </div>
              </div>

              <div className="space-y-2">
                <button type="button" disabled={!!busy} onClick={() => settle("success")}
                  className="w-full bg-positive-green text-white py-3.5 rounded-full font-bold hover:brightness-110 transition-all disabled:opacity-50">
                  {busy === "success" ? "מעבד..." : "אישור תשלום (סימולציית הצלחה)"}
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" disabled={!!busy} onClick={() => settle("failed")}
                    className="bg-error-red/10 text-error-red border border-error-red/30 py-2.5 rounded-full text-sm font-semibold hover:bg-error-red hover:text-white transition-colors disabled:opacity-50">
                    סימולציית כשל
                  </button>
                  <button type="button" disabled={!!busy} onClick={() => settle("cancelled")}
                    className="bg-surface-container text-on-surface-variant border border-outline-variant py-2.5 rounded-full text-sm font-semibold hover:text-primary transition-colors disabled:opacity-50">
                    ביטול
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-6" aria-live="polite">
              <span className={`material-symbols-outlined text-[64px] ${done.status === "success" ? "text-positive-green" : "text-error-red"}`} aria-hidden="true">
                {done.status === "success" ? "check_circle" : "cancel"}
              </span>
              <h2 className="text-xl font-bold text-primary mt-3">
                {done.status === "success" ? "התשלום אושר" : done.status === "failed" ? "התשלום נכשל" : "התשלום בוטל"}
              </h2>
              <p className="text-sm text-on-surface-variant mt-2">
                מספר סימוכין: <span className="font-mono font-bold">{done.ref}</span>
              </p>
              {done.status === "success" && (
                <p className="text-xs text-on-surface-variant mt-1">
                  ה-Webhook עודכן: ההזמנה סומנה "שולמה" במסד הנתונים, והקבלה תישלח למייל (בפרודקשן: PDF מתויק על ההזדמנות)
                </p>
              )}
              <div className="flex gap-2 justify-center mt-6">
                <button type="button" onClick={backToPortal} className="btn-lux-primary px-6 py-2.5 rounded-full text-sm">
                  חזרה לפורטל מפ"י
                </button>
                {done.status === "success" && (
                  <button type="button" onClick={() => window.print()} className="btn-lux-ghost px-6 py-2.5 rounded-full text-sm">
                    הדפסת קבלה
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-[11px] text-on-surface-variant mt-3">
          החוזה זהה לאפיון 10.1: יצירת עסקה → דף תשלום מתארח → Webhook עם מספר סימוכין וסטטוס → עדכון ההזמנה
        </p>
      </div>
    </div>
  );
}

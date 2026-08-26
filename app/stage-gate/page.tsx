"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function GateForm() {
  const params = useSearchParams();
  const from = params.get("from") || "/";
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw.trim()) return;
    setBusy(true); setErr("");
    try {
      const r = await fetch("/api/stage-gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw })
      });
      if (r.ok) {
        window.location.href = from.startsWith("/") ? from : "/";
      } else {
        const d = await r.json().catch(() => ({}));
        setErr(d?.error === "not_configured" ? "השער אינו מוגדר בסביבה זו." : "סיסמה שגויה, נסו שוב.");
      }
    } catch {
      setErr("שגיאת רשת — נסו שוב.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-primary flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10 text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gold-tint border border-gold/30 flex items-center justify-center">
          <span className="material-symbols-outlined text-[34px] text-gold-dark" aria-hidden="true">lock</span>
        </div>
        <h1 className="text-xl font-extrabold text-primary mb-1">סביבת בדיקות (Test)</h1>
        <p className="text-sm text-on-surface-variant mb-6">גישה לסביבה זו מוגנת בסיסמה. הזינו את הסיסמה שקיבלתם כדי להמשיך.</p>

        <form onSubmit={submit} className="space-y-4 text-right">
          <div>
            <label htmlFor="stage-pw" className="block text-xs font-semibold text-primary mb-1.5">סיסמה</label>
            <div className="relative">
              <input
                id="stage-pw"
                type={show ? "text" : "password"}
                autoFocus
                value={pw}
                onChange={e => setPw(e.target.value)}
                dir="ltr"
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 min-h-[48px] focus:ring-2 focus:ring-gold/50 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute inset-y-0 left-2 flex items-center text-on-surface-variant hover:text-primary"
                aria-label={show ? "הסתר סיסמה" : "הצג סיסמה"}
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">{show ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
          </div>
          {err && <p className="text-sm text-error-red text-center">{err}</p>}
          <button
            type="submit"
            disabled={busy}
            className="shine shine-glow w-full py-3.5 rounded-full min-h-[52px] bg-gradient-to-l from-primary to-secondary text-white font-bold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">{busy ? "hourglass_top" : "login"}</span>
            {busy ? "בודק…" : "כניסה"}
          </button>
        </form>

        <p className="text-[11px] text-on-surface-variant mt-6">
          זוהי סביבת בדיקות פנימית של פורטל מפ״י — אינה הסביבה הרשמית.
        </p>
      </div>
    </div>
  );
}

export default function StageGatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary" />}>
      <GateForm />
    </Suspense>
  );
}

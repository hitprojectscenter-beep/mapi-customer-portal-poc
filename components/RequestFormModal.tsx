"use client";

// Reusable request/contact form — used for plan requests and sales-rep
// inquiries. Submits to /api/leads (Postgres + Sheets + Google Chat; the
// Sheet's Apps Script emails MapiComPortal@gmail.com in production). This is
// the SALES channel — distinct from the call center (self-service/phone).

import { useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  /** What is being requested (plan name / "פנייה לנציג מכירות") */
  subject: string;
  /** Short context line shown at the top */
  intro?: string;
  /** Lead family label for routing/reporting */
  familyLabel?: string;
}

export default function RequestFormModal({ open, onClose, subject, intro, familyLabel = "פנייה" }: Props) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", organization: "", notes: "" });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) { const t = setTimeout(() => { setSent(false); setErr(""); }, 250); return () => clearTimeout(t); }
    setTimeout(() => firstRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim() || (!form.email.trim() && !form.phone.trim())) {
      setErr("יש למלא שם פרטי, שם משפחה וטלפון או אימייל."); return;
    }
    setErr(""); setBusy(true);
    try {
      await fetch("/api/leads", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: `req-${Date.now().toString(36)}`,
          firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone,
          organization: form.organization, familyLabel, interest: `${subject}${form.notes ? " — " + form.notes : ""}`,
          sourceLabel: "פנייה לנציג מכירות", assignee: "אגף שיווק ומכירות", queue: "מכירות"
        })
      });
      setSent(true);
    } catch { setErr("שגיאת רשת — נסו שוב."); } finally { setBusy(false); }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" aria-hidden="true" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button type="button" onClick={onClose} className="shine absolute top-4 left-4 w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant" aria-label="סגירה" data-tooltip="סגירת הטופס">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">close</span>
        </button>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-positive-green/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="material-symbols-outlined text-[40px] text-positive-green" aria-hidden="true">mark_email_read</span>
            </div>
            <h3 className="text-lg font-bold text-primary mb-1">הפנייה נשלחה!</h3>
            <p className="text-sm text-on-surface-variant">נציג מאגף השיווק והמכירות יחזור אליכם בהקדם.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-primary mb-1 text-center">{subject}</h3>
            <p className="text-sm text-on-surface-variant mb-1 text-center">{intro || "מלאו את פרטיכם ונציג מכירות יחזור אליכם."}</p>
            <p className="text-[11px] text-gold-dark mb-5 text-center">הפנייה מנותבת לאגף השיווק והמכירות של מפ"י</p>
            <form onSubmit={submit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input ref={firstRef} value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="שם פרטי *" className="bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gold/50 focus:outline-none" data-tooltip="שם פרטי (חובה)" />
                <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="שם משפחה *" className="bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gold/50 focus:outline-none" data-tooltip="שם משפחה (חובה)" />
              </div>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="אימייל" dir="ltr" className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gold/50 focus:outline-none" data-tooltip="כתובת אימייל לחזרה (טלפון או אימייל — לפחות אחד)" />
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="טלפון" dir="ltr" className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gold/50 focus:outline-none" data-tooltip="מספר טלפון לחזרה (טלפון או אימייל — לפחות אחד)" />
              <input value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} placeholder="ארגון (רשות)" className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gold/50 focus:outline-none" data-tooltip="שם הארגון/הרשות, אם רלוונטי" />
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="פרטים נוספים על הבקשה (רשות)" className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gold/50 focus:outline-none resize-none" data-tooltip="פירוט הצורך יעזור לנציג להתכונן לשיחה" />
              {err && <p className="text-sm text-error-red text-center">{err}</p>}
              <button type="submit" disabled={busy} className="shine shine-glow btn-lux-primary w-full py-3 rounded-full flex items-center justify-center gap-2 disabled:opacity-60" data-tooltip="שליחת הפנייה לאגף השיווק והמכירות של מפי.">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">{busy ? "hourglass_top" : "send"}</span>
                <span>{busy ? "שולח..." : "שליחת פנייה"}</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

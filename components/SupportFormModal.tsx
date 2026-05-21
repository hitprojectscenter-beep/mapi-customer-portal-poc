"use client";

import { useEffect, useId, useRef, useState } from "react";

const MAPI_SUPPORT_URL = "https://www.gov.il/he/pages/mapi_support";

interface Props {
  open: boolean;
  onClose: () => void;
  triggerOriginRef?: React.RefObject<HTMLElement>;
}

export default function SupportFormModal({ open, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    nationalId: "",
    email: "",
    phone: "",
    inquiryType: "",
    relatedOrder: "",
    subject: "",
    message: ""
  });
  const firstRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => firstRef.current?.focus(), 80);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setSubmitted(false), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      <div className="relative bg-white w-full sm:w-auto sm:max-w-2xl sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white shadow-md hover:bg-surface-container flex items-center justify-center shine"
          aria-label="סגור חלון"
          data-tooltip="סגור טופס פנייה"
          data-tooltip-position="bottom"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {submitted ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="w-20 h-20 bg-positive-green/10 rounded-full mx-auto mb-5 flex items-center justify-center">
              <span className="material-symbols-outlined text-[48px] text-positive-green">
                check_circle
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-3">
              הפנייה הועברה למוקד
            </h2>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              מספר אסמכתא: <span className="font-mono font-bold text-primary">SUP-2026-{Math.floor(Math.random() * 9000) + 1000}</span>
              <br />
              נציג מהמוקד הארצי של מפ&quot;י יחזור אליך תוך 1-2 ימי עסקים.
            </p>
            <div className="bg-surface-container rounded-2xl p-4 mb-6 text-center text-sm">
              <p className="font-bold text-primary mb-2">📌 מסלולי מענה נוספים:</p>
              <ul className="text-on-surface-variant space-y-1 list-disc pr-5">
                <li>חיוג ישיר: <a href="tel:*6274" className="text-secondary font-bold">*6274</a></li>
                <li>מייל: <a href="mailto:service@mapi.gov.il" className="text-secondary font-bold">service@mapi.gov.il</a></li>
                <li>טופס gov.il המלא:{" "}
                  <a
                    href={MAPI_SUPPORT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary font-bold underline"
                  >
                    mapi_support
                  </a>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shine shine-glow bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary transition-colors"
            >
              סיום
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-l from-primary to-secondary text-white p-6 sm:p-8 sm:rounded-t-3xl">
              <div className="flex flex-row-reverse items-center gap-4 mb-3">
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[32px]">support_agent</span>
                </div>
                <div className="text-center flex-1">
                  <span className="text-xs uppercase tracking-widest text-secondary-container font-bold block">
                    שירות לקוחות
                  </span>
                  <h2 id={titleId} className="text-xl sm:text-2xl font-extrabold leading-tight">
                    פנייה למוקד מפ&quot;י
                  </h2>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                הפנייה תועבר למערכת המוקד הארצית{" "}
                <a
                  href={MAPI_SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold hover:text-secondary-container"
                >
                  (mapi_support)
                </a>
                . מענה תוך 1-2 ימי עסקים.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {/* Quick contact strip */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <a
                  href="tel:*6274"
                  className="shine flex flex-col items-center bg-surface-container hover:bg-secondary/10 rounded-xl p-3 text-center transition-colors"
                  data-tooltip="חיוג ישיר למוקד"
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-secondary text-[22px] mb-1">
                    phone
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                    טלפון
                  </span>
                  <span className="text-sm font-extrabold text-primary">*6274</span>
                </a>
                <a
                  href="mailto:service@mapi.gov.il"
                  className="shine flex flex-col items-center bg-surface-container hover:bg-secondary/10 rounded-xl p-3 text-center transition-colors"
                  data-tooltip="פתח מייל בתוכנת המייל שלך"
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-secondary text-[22px] mb-1">
                    mail
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                    מייל
                  </span>
                  <span className="text-[11px] font-bold text-primary truncate w-full">
                    service@
                  </span>
                </a>
                <a
                  href={MAPI_SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine flex flex-col items-center bg-surface-container hover:bg-secondary/10 rounded-xl p-3 text-center transition-colors"
                  data-tooltip="פתיחת טופס gov.il המלא"
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-secondary text-[22px] mb-1">
                    open_in_new
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                    gov.il
                  </span>
                  <span className="text-[11px] font-bold text-primary">טופס מלא</span>
                </a>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="sf-name" className="block text-xs font-bold text-primary mb-1 text-center">
                      שם מלא <span className="text-error-red">*</span>
                    </label>
                    <input
                      ref={firstRef}
                      id="sf-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="sf-id" className="block text-xs font-bold text-primary mb-1 text-center">
                      ת.ז.
                    </label>
                    <input
                      id="sf-id"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{9}"
                      placeholder='9 ספרות'
                      value={form.nationalId}
                      onChange={(e) =>
                        setForm({ ...form, nationalId: e.target.value.replace(/\D/g, "") })
                      }
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="sf-email" className="block text-xs font-bold text-primary mb-1 text-center">
                      מייל <span className="text-error-red">*</span>
                    </label>
                    <input
                      id="sf-email"
                      type="email"
                      inputMode="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label htmlFor="sf-phone" className="block text-xs font-bold text-primary mb-1 text-center">
                      טלפון <span className="text-error-red">*</span>
                    </label>
                    <input
                      id="sf-phone"
                      type="tel"
                      inputMode="tel"
                      required
                      autoComplete="tel"
                      placeholder="05X-XXXXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="sf-type" className="block text-xs font-bold text-primary mb-1 text-center">
                      נושא הפנייה <span className="text-error-red">*</span>
                    </label>
                    <select
                      id="sf-type"
                      required
                      value={form.inquiryType}
                      onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                    >
                      <option value="">בחר...</option>
                      <option value="technical">תקלה טכנית בפורטל</option>
                      <option value="order">בעיה עם הזמנה</option>
                      <option value="content">שאלת תוכן מקצועית</option>
                      <option value="payment">חשבונית / תשלום</option>
                      <option value="quote">הצעת מחיר</option>
                      <option value="other">אחר</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sf-order" className="block text-xs font-bold text-primary mb-1 text-center">
                      מספר הזמנה (אופציונלי)
                    </label>
                    <input
                      id="sf-order"
                      type="text"
                      placeholder='למשל: ORD-2026-145'
                      value={form.relatedOrder}
                      onChange={(e) => setForm({ ...form, relatedOrder: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="sf-subject" className="block text-xs font-bold text-primary mb-1 text-center">
                    נושא קצר <span className="text-error-red">*</span>
                  </label>
                  <input
                    id="sf-subject"
                    type="text"
                    required
                    placeholder='למשל: לא קיבלתי את המפה שהזמנתי'
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label htmlFor="sf-msg" className="block text-xs font-bold text-primary mb-1 text-center">
                    תיאור מפורט <span className="text-error-red">*</span>
                  </label>
                  <textarea
                    id="sf-msg"
                    required
                    rows={4}
                    placeholder="תאר/י את הבעיה..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none resize-none"
                  />
                </div>

                <p className="text-[11px] text-on-surface-variant text-center leading-relaxed">
                  הפנייה תועבר לעיבוד במערכת המוקד הארצית של מפ&quot;י תוך כפיפות ל-
                  <a
                    href="https://www.gov.il/he/policies/privacy_policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline"
                  >
                    מדיניות הפרטיות
                  </a>
                  .
                </p>

                <div className="flex flex-col-reverse sm:flex-row-reverse items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="shine sm:flex-1 text-on-surface-variant font-bold hover:text-primary transition-colors px-4 py-3 rounded-full border border-outline-variant"
                    data-tooltip="ביטול הפנייה"
                    data-tooltip-position="bottom"
                  >
                    ביטול
                  </button>
                  <button
                    type="submit"
                    className="shine shine-glow sm:flex-[2] bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-2 min-h-[48px]"
                    data-tooltip='שליחת הפנייה למוקד הארצי של מפ"י'
                    data-tooltip-position="bottom"
                  >
                    <span className="material-symbols-outlined">send</span>
                    שלח פנייה למוקד
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

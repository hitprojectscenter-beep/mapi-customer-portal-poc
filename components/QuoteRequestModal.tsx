"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Service } from "@/lib/data";

interface Props {
  service: Service | null;
  open: boolean;
  onClose: () => void;
}

export default function QuoteRequestModal({ service, open, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    businessId: "",
    notes: ""
  });
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus first field
    setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Reset when closing/changing service
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setSubmitted(false), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!open || !service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const priceLabel =
    service.priceTo && service.priceTo > service.priceFrom
      ? `החל מ-${service.priceUnit}${service.priceFrom.toLocaleString()} ועד ${service.priceUnit}${service.priceTo.toLocaleString()}`
      : `החל מ-${service.priceUnit}${service.priceFrom.toLocaleString()}${
          service.priceUnit === "₪/חודש" ? "" : ""
        }`;

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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative bg-white w-full sm:w-auto sm:max-w-2xl sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white shadow-md hover:bg-surface-container flex items-center justify-center shine"
          aria-label="סגור חלון"
          data-tooltip="סגירת בקשת הצעת מחיר"
          data-tooltip-position="bottom"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {submitted ? (
          /* Success State */
          <div className="p-8 sm:p-12 text-center">
            <div className="w-20 h-20 bg-positive-green/10 rounded-full mx-auto mb-5 flex items-center justify-center animate-fade-in">
              <span className="material-symbols-outlined text-[48px] text-positive-green">
                mark_email_read
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-3">
              הבקשה נשלחה!
            </h2>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              נציג שירות לקוחות יחזור אליך תוך שעות העבודה הקרובות עם הצעת מחיר מפורטת
              ל-<span className="font-bold text-primary">{service.name}</span>.
            </p>
            <div className="bg-surface-container rounded-2xl p-4 text-center text-sm mb-6">
              <p className="font-bold text-primary mb-2">📌 מה הלאה?</p>
              <ul className="text-on-surface-variant space-y-1 list-disc pr-5">
                <li>קיבלת אישור במייל <strong>{form.email || "שהזנת"}</strong></li>
                <li>נציג יחזור אליך עם הצעת מחיר מותאמת אישית</li>
                <li>תוכל לאשר את ההצעה ולעבור לתשלום בקלות</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shine shine-glow bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary transition-colors"
              data-tooltip="סגירה - תוכל לעיין בשירותים נוספים"
              data-tooltip-position="bottom"
            >
              סיום
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-l from-primary to-secondary text-white p-6 sm:p-8 sm:rounded-t-3xl">
              <div className="flex flex-row-reverse items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[32px]">
                    {service.icon}
                  </span>
                </div>
                <div className="text-center flex-1">
                  <span className="text-xs uppercase tracking-widest text-secondary-container font-bold block">
                    {service.categoryLabel}
                  </span>
                  <h2 id={titleId} className="text-xl sm:text-2xl font-extrabold leading-tight">
                    {service.name}
                  </h2>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {service.shortDescription}
              </p>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              {/* Price + Details */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <div className="bg-secondary/5 rounded-2xl p-4 border border-secondary/20 text-center">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">
                    מחיר משוער
                  </p>
                  <p className="text-lg font-extrabold text-primary">{priceLabel}</p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    (כולל מע"מ - מחיר סופי לפי פרטי הבקשה)
                  </p>
                </div>
                <div className="bg-surface-container rounded-2xl p-4 text-center">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">
                    זמן אספקה
                  </p>
                  <p className="text-base font-bold text-primary">{service.deliveryDays}</p>
                  <p className="text-xs text-on-surface-variant mt-1">מרגע אישור התשלום</p>
                </div>
              </div>

              {/* Features (compact) */}
              {service.features.length > 0 && (
                <div className="mb-6 bg-white rounded-2xl border border-outline-variant/50 p-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-2 text-center">
                    מה כלול
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-1.5 text-sm text-center">
                    {service.features.slice(0, 6).map((f, i) => (
                      <li key={i} className="flex items-center justify-center gap-2">
                        <span>{f}</span>
                        <span className="material-symbols-outlined text-positive-green text-[16px] flex-shrink-0">
                          check_circle
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-base font-extrabold text-primary text-center flex items-center gap-2 justify-center">
                  <span>פרטי המבקש</span>
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    person
                  </span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="qr-fname"
                      className="block text-xs font-bold text-primary mb-1 text-center"
                    >
                      שם פרטי <span className="text-error-red">*</span>
                    </label>
                    <input
                      ref={firstFieldRef}
                      id="qr-fname"
                      type="text"
                      required
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="qr-lname"
                      className="block text-xs font-bold text-primary mb-1 text-center"
                    >
                      שם משפחה <span className="text-error-red">*</span>
                    </label>
                    <input
                      id="qr-lname"
                      type="text"
                      required
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="qr-email"
                    className="block text-xs font-bold text-primary mb-1 text-center"
                  >
                    כתובת מייל <span className="text-error-red">*</span>
                  </label>
                  <input
                    id="qr-email"
                    type="email"
                    inputMode="email"
                    required
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                    dir="ltr"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="qr-org"
                      className="block text-xs font-bold text-primary mb-1 text-center"
                    >
                      ארגון / חברה
                    </label>
                    <input
                      id="qr-org"
                      type="text"
                      autoComplete="organization"
                      placeholder="(אופציונלי)"
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="qr-cid"
                      className="block text-xs font-bold text-primary mb-1 text-center"
                    >
                      ח.פ. / ת.ז.
                    </label>
                    <input
                      id="qr-cid"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{7,9}"
                      placeholder="9 ספרות"
                      value={form.businessId}
                      onChange={(e) =>
                        setForm({ ...form, businessId: e.target.value.replace(/\D/g, "") })
                      }
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="qr-notes"
                    className="block text-xs font-bold text-primary mb-1 text-center"
                  >
                    הערות נוספות (אופציונלי)
                  </label>
                  <textarea
                    id="qr-notes"
                    rows={2}
                    placeholder='למשל: גודל מסוים, אזור גיאוגרפי, פורמט מבוקש...'
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none resize-none"
                  />
                </div>

                <p className="text-[11px] text-on-surface-variant text-center leading-relaxed">
                  בלחיצה על "שלח בקשה" הנך מאשר/ת את{" "}
                  <a
                    href="https://www.gov.il/he/policies/privacy_policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline"
                  >
                    מדיניות הפרטיות
                  </a>{" "}
                  של מפ&quot;י.
                </p>

                {/* Sticky actions on mobile */}
                <div className="flex flex-col-reverse sm:flex-row-reverse items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="shine sm:flex-1 text-on-surface-variant font-bold hover:text-primary transition-colors px-4 py-3 rounded-full border border-outline-variant"
                    data-tooltip="ביטול ויציאה"
                    data-tooltip-position="bottom"
                  >
                    ביטול
                  </button>
                  <button
                    type="submit"
                    className="shine shine-glow sm:flex-[2] bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-2 min-h-[48px]"
                    data-tooltip="שליחת הבקשה לקבלת הצעת מחיר מפורטת"
                    data-tooltip-position="bottom"
                  >
                    <span className="material-symbols-outlined">send</span>
                    שלח בקשת הצעת מחיר
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

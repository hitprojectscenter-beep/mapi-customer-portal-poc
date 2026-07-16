"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { captureLead } from "@/lib/leads";

const MAPI_SUPPORT_URL = "https://www.gov.il/he/pages/mapi_support";

interface Props {
  open: boolean;
  onClose: () => void;
  triggerOriginRef?: React.RefObject<HTMLElement>;
}

export default function SupportFormModal({ open, onClose }: Props) {
  const { t } = useLanguage();
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
      const tid = setTimeout(() => setSubmitted(false), 250);
      return () => clearTimeout(tid);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // [HLD 13] "טופס יצירת קשר → יוצר Lead / Case": a quote inquiry becomes a
    // sales lead; every other inquiry type remains a service Case.
    if (form.inquiryType === "quote") {
      const [firstName, ...rest] = form.fullName.trim().split(/\s+/);
      captureLead({
        firstName: firstName || "",
        lastName: rest.join(" ") || "",
        email: form.email,
        phone: form.phone,
        family: "maps",
        interest: form.subject || form.message.slice(0, 80),
        source: "form"
      });
    }
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

      <div
        style={{ paddingBottom: "var(--safe-bottom)" }}
        className="relative bg-white w-full sm:w-auto sm:max-w-2xl sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[92vh] max-h-[92dvh] sm:max-h-[88vh] sm:max-h-[88dvh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white shadow-md hover:bg-surface-container flex items-center justify-center shine"
          aria-label={t("support.closeAria")}
          data-tooltip={t("support.closeTip")}
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
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
              {t("support.success")}
            </h2>
            <p className="text-on-surface-variant mb-6 leading-relaxed font-light">
              {t("support.refNum")}{" "}
              <span className="font-mono font-bold text-primary">SUP-2026-{Math.floor(Math.random() * 9000) + 1000}</span>
              <br />
              {t("case.respondTime")}
            </p>
            <div className="bg-surface-container rounded-2xl p-4 mb-6 text-center text-sm">
              <p className="font-bold text-primary mb-2">{t("support.altRoutes")}</p>
              <ul className="text-on-surface-variant space-y-1 list-disc pr-5 font-light">
                <li>{t("support.directDial")}: <a href="tel:*6274" className="text-secondary font-bold">*6274</a></li>
                <li>{t("support.quickEmail")}: <a href="mailto:service@mapi.gov.il" className="text-secondary font-bold">service@mapi.gov.il</a></li>
                <li>{t("support.govFormLabel")}:{" "}
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
              className="shine shine-glow bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-secondary transition-colors"
            >
              {t("support.done")}
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-l from-primary to-secondary text-white p-6 sm:p-8 sm:rounded-t-2xl">
              <div className="flex flex-row-reverse items-center gap-4 mb-3">
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[32px]">support_agent</span>
                </div>
                <div className="text-center flex-1">
                  <span className="text-xs uppercase tracking-widest text-secondary-container font-semibold block">
                    {t("support.headerEyebrow")}
                  </span>
                  <h2 id={titleId} className="text-xl sm:text-2xl font-bold leading-tight">
                    {t("support.title")}
                  </h2>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed font-light">
                {t("support.subtitle")}{" "}
                <a
                  href={MAPI_SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium hover:text-secondary-container"
                >
                  (mapi_support)
                </a>
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {/* Quick contact strip */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <a
                  href="tel:*6274"
                  className="shine flex flex-col items-center bg-surface-container hover:bg-secondary/10 rounded-xl p-3 text-center transition-colors"
                  data-tooltip={t("support.phoneTip")}
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-secondary text-[22px] mb-1">phone</span>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">
                    {t("support.quickPhone")}
                  </span>
                  <span className="text-sm font-bold text-primary">*6274</span>
                </a>
                <a
                  href="mailto:service@mapi.gov.il"
                  className="shine flex flex-col items-center bg-surface-container hover:bg-secondary/10 rounded-xl p-3 text-center transition-colors"
                  data-tooltip={t("support.emailTip")}
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-secondary text-[22px] mb-1">mail</span>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">
                    {t("support.quickEmail")}
                  </span>
                  <span className="text-[11px] font-bold text-primary truncate w-full">service@</span>
                </a>
                <a
                  href={MAPI_SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine flex flex-col items-center bg-surface-container hover:bg-secondary/10 rounded-xl p-3 text-center transition-colors"
                  data-tooltip={t("support.govTip")}
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-secondary text-[22px] mb-1">open_in_new</span>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">
                    {t("support.quickGov")}
                  </span>
                  <span className="text-[11px] font-bold text-primary">{t("support.quickGovDesc")}</span>
                </a>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="sf-name" className="block text-xs font-semibold text-primary mb-1 text-center">
                      {t("support.fullName")} <span className="text-error-red">*</span>
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
                    <label htmlFor="sf-id" className="block text-xs font-semibold text-primary mb-1 text-center">
                      {t("support.nationalId")}
                    </label>
                    <input
                      id="sf-id"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{9}"
                      placeholder={t("support.idHint")}
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
                    <label htmlFor="sf-email" className="block text-xs font-semibold text-primary mb-1 text-center">
                      {t("support.quickEmail")} <span className="text-error-red">*</span>
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
                    <label htmlFor="sf-phone" className="block text-xs font-semibold text-primary mb-1 text-center">
                      {t("support.phone")} <span className="text-error-red">*</span>
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
                    <label htmlFor="sf-type" className="block text-xs font-semibold text-primary mb-1 text-center">
                      {t("support.inquiryType")} <span className="text-error-red">*</span>
                    </label>
                    <select
                      id="sf-type"
                      required
                      value={form.inquiryType}
                      onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                    >
                      <option value="">{t("support.typeSelect")}</option>
                      <option value="technical">{t("support.type.tech")}</option>
                      <option value="order">{t("support.type.order")}</option>
                      <option value="content">{t("support.type.content")}</option>
                      <option value="payment">{t("support.type.payment")}</option>
                      <option value="quote">{t("support.type.quote")}</option>
                      <option value="other">{t("support.type.other")}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sf-order" className="block text-xs font-semibold text-primary mb-1 text-center">
                      {t("support.orderOptional")}
                    </label>
                    <input
                      id="sf-order"
                      type="text"
                      placeholder={t("support.orderPlaceholder")}
                      value={form.relatedOrder}
                      onChange={(e) => setForm({ ...form, relatedOrder: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="sf-subject" className="block text-xs font-semibold text-primary mb-1 text-center">
                    {t("support.subject")} <span className="text-error-red">*</span>
                  </label>
                  <input
                    id="sf-subject"
                    type="text"
                    required
                    placeholder={t("support.subjectPlaceholder")}
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label htmlFor="sf-msg" className="block text-xs font-semibold text-primary mb-1 text-center">
                    {t("support.message")} <span className="text-error-red">*</span>
                  </label>
                  <textarea
                    id="sf-msg"
                    required
                    rows={4}
                    placeholder={t("support.descPlaceholder")}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none resize-none"
                  />
                </div>

                <p className="text-[11px] text-on-surface-variant text-center leading-relaxed font-light">
                  {t("support.privacyNote")}
                  <a
                    href="https://www.gov.il/he/policies/privacy_policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline"
                  >
                    {t("support.privacyLink")}
                  </a>
                </p>

                <div className="flex flex-col-reverse sm:flex-row-reverse items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="shine sm:flex-1 text-on-surface-variant font-medium hover:text-primary transition-colors px-4 py-3 rounded-full border border-outline-variant"
                    data-tooltip={t("support.cancelTip")}
                    data-tooltip-position="bottom"
                  >
                    {t("support.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="shine shine-glow sm:flex-[2] bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2 min-h-[48px]"
                    data-tooltip={t("support.submitTip")}
                    data-tooltip-position="bottom"
                  >
                    <span className="material-symbols-outlined">send</span>
                    {t("support.send")}
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

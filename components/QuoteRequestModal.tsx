"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Service } from "@/lib/data";
import { getServiceName, getServiceShortDescription, getServiceCategoryLabel, getServiceDeliveryDays } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

interface Props {
  service: Service | null;
  open: boolean;
  onClose: () => void;
}

export default function QuoteRequestModal({ service, open, onClose }: Props) {
  const { t, lang } = useLanguage();
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const tid = setTimeout(() => setSubmitted(false), 250);
      return () => clearTimeout(tid);
    }
  }, [open]);

  if (!open || !service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const localName = getServiceName(service.slug, service.name, lang);
  const localShort = getServiceShortDescription(service.slug, service.shortDescription, lang);
  const localCategory = getServiceCategoryLabel(service.slug, service.categoryLabel, lang);
  const localDelivery = getServiceDeliveryDays(service.slug, service.deliveryDays, lang);

  const priceLabel =
    service.priceTo && service.priceTo > service.priceFrom
      ? `${t("quote.priceRange")}${service.priceUnit}${service.priceFrom.toLocaleString()} ${t("quote.priceUnit")} ${service.priceUnit}${service.priceTo.toLocaleString()}`
      : `${t("quote.priceRange")}${service.priceUnit}${service.priceFrom.toLocaleString()}`;

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
        ref={dialogRef}
        style={{ paddingBottom: "var(--safe-bottom)" }}
        className="relative bg-white w-full sm:w-auto sm:max-w-2xl sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[92vh] max-h-[92dvh] sm:max-h-[88vh] sm:max-h-[88dvh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white shadow-md hover:bg-surface-container flex items-center justify-center shine"
          aria-label={t("quote.closeAria")}
          data-tooltip={t("quote.closeTip")}
          data-tooltip-position="bottom"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {submitted ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="w-20 h-20 bg-positive-green/10 rounded-full mx-auto mb-5 flex items-center justify-center animate-fade-in">
              <span className="material-symbols-outlined text-[48px] text-positive-green">
                mark_email_read
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
              {t("quote.success")}
            </h2>
            <p className="text-on-surface-variant mb-6 leading-relaxed font-light">
              {t("quote.successSub")} <span className="font-bold text-primary">{localName}</span>.
            </p>
            <div className="bg-surface-container rounded-2xl p-4 text-center text-sm mb-6">
              <p className="font-bold text-primary mb-2">{t("case.whatNextEmoji")}</p>
              <ul className="text-on-surface-variant space-y-1 list-disc pr-5 font-light">
                <li>{t("case.next1")}: <strong>{form.email || "—"}</strong></li>
                <li>{t("case.next3")}</li>
                <li>{t("seg.requestProposal")}</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shine shine-glow bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-secondary transition-colors"
              data-tooltip={t("quote.done")}
              data-tooltip-position="bottom"
            >
              {t("quote.done")}
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-l from-primary to-secondary text-white p-6 sm:p-8 sm:rounded-t-2xl">
              <div className="flex flex-row-reverse items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[32px]">
                    {service.icon}
                  </span>
                </div>
                <div className="text-center flex-1">
                  <span className="text-xs uppercase tracking-widest text-secondary-container font-semibold block">
                    {localCategory}
                  </span>
                  <h2 id={titleId} className="text-xl sm:text-2xl font-bold leading-tight">
                    {localName}
                  </h2>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed font-light">{localShort}</p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <div className="bg-secondary/5 rounded-2xl p-4 border border-secondary/20 text-center">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-secondary mb-1">
                    {t("quote.estimate")}
                  </p>
                  <p className="text-base font-bold text-primary">{priceLabel}</p>
                  <p className="text-xs text-on-surface-variant mt-1 font-light">{t("of.includesVat")}</p>
                </div>
                <div className="bg-surface-container rounded-2xl p-4 text-center">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-1">
                    {t("quote.delivery")}
                  </p>
                  <p className="text-base font-bold text-primary">{localDelivery}</p>
                </div>
              </div>

              {service.features.length > 0 && (
                <div className="mb-6 bg-white rounded-2xl border border-outline-variant/50 p-4">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-secondary mb-2 text-center">
                    {t("quote.included.short")}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-1.5 text-sm text-center font-light">
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-primary text-center flex items-center gap-2 justify-center">
                  <span>{t("quote.requesterDetails")}</span>
                  <span className="material-symbols-outlined text-secondary text-[20px]">person</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="qr-fname" className="block text-xs font-semibold text-primary mb-1 text-center">
                      {t("quote.firstName")} <span className="text-error-red">*</span>
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
                    <label htmlFor="qr-lname" className="block text-xs font-semibold text-primary mb-1 text-center">
                      {t("quote.lastName")} <span className="text-error-red">*</span>
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
                  <label htmlFor="qr-email" className="block text-xs font-semibold text-primary mb-1 text-center">
                    {t("quote.email")} <span className="text-error-red">*</span>
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
                    <label htmlFor="qr-org" className="block text-xs font-semibold text-primary mb-1 text-center">
                      {t("quote.organization")}
                    </label>
                    <input
                      id="qr-org"
                      type="text"
                      autoComplete="organization"
                      placeholder={`(${t("common.optional")})`}
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="qr-cid" className="block text-xs font-semibold text-primary mb-1 text-center">
                      {t("quote.businessId")}
                    </label>
                    <input
                      id="qr-cid"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{7,9}"
                      placeholder={t("support.idHint")}
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
                  <label htmlFor="qr-notes" className="block text-xs font-semibold text-primary mb-1 text-center">
                    {t("quote.notes")} ({t("common.optional")})
                  </label>
                  <textarea
                    id="qr-notes"
                    rows={2}
                    placeholder={t("quote.notes.placeholder")}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none resize-none"
                  />
                </div>

                <p className="text-[11px] text-on-surface-variant text-center leading-relaxed font-light">
                  {t("quote.privacyConsent")}{" "}
                  <a
                    href="https://www.gov.il/he/policies/privacy_policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline"
                  >
                    {t("quote.privacyLink")}
                  </a>
                </p>

                <div className="flex flex-col-reverse sm:flex-row-reverse items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="shine sm:flex-1 text-on-surface-variant font-medium hover:text-primary transition-colors px-4 py-3 rounded-full border border-outline-variant"
                    data-tooltip={t("quote.cancel")}
                    data-tooltip-position="bottom"
                  >
                    {t("quote.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="shine shine-glow sm:flex-[2] bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2 min-h-[48px]"
                    data-tooltip={t("quote.send.tip")}
                    data-tooltip-position="bottom"
                  >
                    <span className="material-symbols-outlined">send</span>
                    {t("quote.send")}
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

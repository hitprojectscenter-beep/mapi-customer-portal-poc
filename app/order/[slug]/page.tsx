"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { services, getServiceName } from "@/lib/data";
import GovMapEmbed from "@/components/GovMapEmbed";
import { useLanguage } from "@/lib/LanguageContext";
import type { TKey } from "@/lib/i18n";

type Step = 1 | 2 | 3 | 4;

const STEP_LABEL_KEYS: Record<Step, TKey> = {
  1: "order.step1",
  2: "order.step2",
  3: "order.step3",
  4: "order.step4"
};

export default function OrderPage() {
  const { t, lang } = useLanguage();
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const service = services.find((s) => s.slug === params.slug);
  const localName = service ? getServiceName(service.slug, service.name, lang) : "";

  const [step, setStep] = useState<Step>(1);
  const [size, setSize] = useState("A2");
  const [includeOrthophoto, setIncludeOrthophoto] = useState(true);
  const [delivery, setDelivery] = useState("digital");
  const [purpose, setPurpose] = useState("");
  const [areaMarked, setAreaMarked] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptQuote, setAcceptQuote] = useState(false);

  const price = useMemo(() => {
    if (!service) return 0;
    if (service.priceTable && service.priceTable.length > 0) {
      const row = service.priceTable.find((r) => r.label.startsWith(size));
      if (row) return includeOrthophoto && row.with ? row.with : row.without;
    }
    return service.priceFrom;
  }, [service, size, includeOrthophoto]);

  const shippingCost = delivery === "physical" || delivery === "both" ? 39 : 0;
  const totalPrice = price + shippingCost;

  if (!service) {
    return (
      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-20 text-center">
        <h1 className="text-3xl font-bold text-primary">{t("svc.notFound")}</h1>
        <Link href="/catalog" className="text-secondary underline mt-4 inline-block">
          {t("svc.notFoundBack")}
        </Link>
      </div>
    );
  }

  if (!service.inScope) {
    return (
      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-20 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">{t("svc.notInScope")}</h1>
        <p className="text-on-surface-variant mb-6">
          {t("svc.notInScopeSub")}
        </p>
        <a
          href={service.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-alert-yellow text-white px-8 py-4 rounded-full font-bold inline-flex items-center gap-2"
        >
          <span>{t("svc.openForm")}</span>
          <span className="material-symbols-outlined">open_in_new</span>
        </a>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-8">
          <nav aria-label={t("nav.skipToContent")} className="text-sm text-white/70 mb-4">
            <ol className="flex flex-row-reverse items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-white">{t("common.home")}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/catalog/${service.slug}`} className="hover:text-white">
                  {localName}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-bold">{t("of.title")}</li>
            </ol>
          </nav>
          <h1 className="text-2xl md:text-3xl font-extrabold">{t("of.title")}: {localName}</h1>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-outline-variant sticky top-20 z-30">
        <div className="max-w-container-max-width mx-auto px-3 md:px-margin-desktop py-3 md:py-4">
          {/* Mobile compact view */}
          <div className="md:hidden flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-on-surface-variant">
              {t("of.stepOf").replace("{step}", String(step))}
            </span>
            <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-l from-positive-green to-secondary transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-primary truncate max-w-[120px]">
              {t(STEP_LABEL_KEYS[step])}
            </span>
          </div>

          {/* Desktop full step indicator */}
          <ol className="hidden md:flex flex-row-reverse items-center justify-between gap-4">
            <li className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-positive-green text-white flex items-center justify-center text-sm font-bold">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </span>
              <span className="text-sm font-bold text-positive-green">{t("order.step.identification")}</span>
            </li>
            {([1, 2, 3, 4] as Step[]).map((s) => {
              const isCurrent = s === step;
              const isComplete = s < step;
              return (
                <li key={s} className="flex items-center gap-2 flex-1">
                  <div className="flex-1 h-px bg-outline-variant relative">
                    <div
                      className={`absolute inset-0 transition-all ${
                        isComplete ? "bg-positive-green" : ""
                      }`}
                    />
                  </div>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      isComplete
                        ? "bg-positive-green text-white"
                        : isCurrent
                        ? "bg-secondary text-white"
                        : "bg-surface-container text-on-surface-variant"
                    }`}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {isComplete ? (
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    ) : (
                      s
                    )}
                  </span>
                  <span
                    className={`hidden lg:inline text-sm whitespace-nowrap ${
                      isCurrent ? "font-bold text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    {t(STEP_LABEL_KEYS[s])}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
        {step === 1 && (
          <div className="grid lg:grid-cols-3 gap-8">
            <aside className="bg-secondary/5 rounded-3xl p-6 border border-secondary/20 lg:col-span-1">
              <h2 className="text-lg font-extrabold text-primary mb-3 flex items-center gap-2 justify-center">
                <span>{t("order.step1")}</span>
                <span className="material-symbols-outlined text-secondary">info</span>
              </h2>
              <p className="text-sm text-on-surface-variant text-center leading-relaxed">
                {t("of.step1Hint")}
                <br />
                <br />
                {t("of.requiredHint")}
              </p>
            </aside>
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/50">
              <h3 className="text-xl font-extrabold text-primary mb-6 text-center">
                {t("order.step1Title")}
              </h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="size" className="block text-sm font-bold text-primary mb-2 text-center">
                    {t("order.size")} <span className="text-error-red">*</span>
                  </label>
                  <select
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none"
                  >
                    {service.priceTable?.map((row) => {
                      const sizeKey = row.label.split(" ")[0];
                      return (
                        <option key={sizeKey} value={sizeKey}>
                          {row.label} - ₪{row.without} {row.with ? `/ ${t("svc.with")} ₪${row.with}` : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <fieldset>
                  <legend className="block text-sm font-bold text-primary mb-2 text-center">
                    {t("order.includeOrtho.q")} <span className="text-error-red">*</span>
                  </legend>
                  <div className="flex flex-row-reverse gap-4">
                    {[true, false].map((val) => (
                      <label
                        key={String(val)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl cursor-pointer border transition-all ${
                          includeOrthophoto === val
                            ? "border-secondary bg-secondary/5 ring-2 ring-secondary"
                            : "border-outline-variant hover:border-secondary"
                        }`}
                      >
                        <input
                          type="radio"
                          name="orthophoto"
                          checked={includeOrthophoto === val}
                          onChange={() => setIncludeOrthophoto(val)}
                          className="sr-only"
                        />
                        <span className="font-bold">{val ? t("common.yes") : t("common.no")}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="block text-sm font-bold text-primary mb-2 text-center">
                    {t("common.delivery")} <span className="text-error-red">*</span>
                  </legend>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { id: "digital", label: t("order.delivery.digital"), icon: "download" },
                      { id: "physical", label: t("order.delivery.physical"), icon: "local_shipping" },
                      { id: "both", label: t("order.delivery.both"), icon: "all_inclusive" }
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl cursor-pointer border transition-all ${
                          delivery === opt.id
                            ? "border-secondary bg-secondary/5 ring-2 ring-secondary"
                            : "border-outline-variant hover:border-secondary"
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          checked={delivery === opt.id}
                          onChange={() => setDelivery(opt.id)}
                          className="sr-only"
                        />
                        <span className="material-symbols-outlined text-secondary text-[20px]">
                          {opt.icon}
                        </span>
                        <span className="text-sm font-medium">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="purpose" className="block text-sm font-bold text-primary mb-2 text-center">
                    {t("order.purpose")} ({t("common.optional")})
                  </label>
                  <textarea
                    id="purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    rows={3}
                    placeholder={t("order.purposePlaceholder")}
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none resize-none"
                  />
                </div>
              </div>
              <div className="flex flex-row-reverse items-center justify-between mt-8 pt-6 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => router.push(`/catalog/${service.slug}`)}
                  className="shine text-on-surface-variant font-bold hover:text-primary transition-colors px-3 py-2 rounded-lg"
                  data-tooltip={t("svc.notFoundBack")}
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined align-middle ml-1">arrow_forward</span>
                  {t("order.back")}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="shine shine-glow bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary transition-colors flex items-center gap-2"
                  data-tooltip={t("order.step2")}
                  data-tooltip-position="bottom"
                >
                  {t("order.continue")}
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid lg:grid-cols-3 gap-8">
            <aside className="bg-secondary/5 rounded-3xl p-6 border border-secondary/20 lg:col-span-1">
              <h2 className="text-lg font-extrabold text-primary mb-3 flex items-center gap-2 justify-center">
                <span>{t("of.step2Heading")}</span>
                <span className="material-symbols-outlined text-secondary">my_location</span>
              </h2>
              <p className="text-sm text-on-surface-variant text-center leading-relaxed mb-4">
                {t("of.areaHint")}
              </p>
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-on-surface-variant mb-2 text-center">{t("of.selDetails")}</p>
                {areaMarked ? (
                  <>
                    <p className="text-sm font-bold text-positive-green text-center">{t("of.areaOk")}</p>
                    <p className="text-xs text-on-surface-variant text-center mt-2">
                      {t("of.areaArea")}
                      <br />
                      {t("of.areaCenter")}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-on-surface-variant text-center">
                    {t("of.selPrompt")}
                  </p>
                )}
              </div>
            </aside>
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/50">
              <h3 className="text-xl font-extrabold text-primary mb-6 text-center">
                {t("of.mapTitle")}
              </h3>

              {/* Real GovMap embed */}
              <GovMapEmbed
                mode={service.category === "cadastre" ? "cadastre" : service.category === "orthophoto" ? "ortho" : service.category === "geodesy" ? "cors" : "default"}
                height="500px"
                allowDraw={true}
                title={`${t("of.govmapTitle")} ${localName}`}
                onAreaSelected={() => setAreaMarked(true)}
              />

              <div className="mt-6 bg-secondary/5 rounded-2xl p-4 border border-secondary/20">
                <div className="flex flex-row-reverse items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[24px] flex-shrink-0">
                    info
                  </span>
                  <div className="text-center sm:text-right">
                    <p className="text-sm font-bold text-primary mb-1">
                      {t("order.howToMark")}
                    </p>
                    <p className="text-xs text-on-surface-variant leading-relaxed whitespace-pre-line">
                      {t("order.howToMarkSteps")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row-reverse items-center justify-between mt-8 pt-6 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="shine text-on-surface-variant font-bold hover:text-primary transition-colors px-3 py-2 rounded-lg"
                  data-tooltip={t("order.step1")}
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined align-middle ml-1">arrow_forward</span>
                  {t("order.back")}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!areaMarked}
                  className="shine shine-glow bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary transition-colors flex items-center gap-2 disabled:bg-outline-variant disabled:cursor-not-allowed disabled:hover:bg-outline-variant"
                  data-tooltip={areaMarked ? t("order.step3") : t("of.selPrompt")}
                  data-tooltip-position="bottom"
                >
                  {t("order.continue")}
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/50">
              <h3 className="text-xl font-extrabold text-primary mb-6 text-center">
                {t("of.sumTitle")}
              </h3>
              <ul className="space-y-3 text-center" role="list">
                {[
                  { label: t("of.svcType"), value: localName },
                  { label: t("of.svcSize"), value: size },
                  { label: t("of.svcOrtho"), value: includeOrthophoto ? t("common.yes") : t("common.no") },
                  {
                    label: t("of.svcDelivery"),
                    value:
                      delivery === "digital"
                        ? t("order.delivery.digital")
                        : delivery === "physical"
                        ? t("order.delivery.physical")
                        : t("order.delivery.both")
                  },
                  { label: t("of.svcArea"), value: t("of.svcArea1") },
                  { label: t("of.requester"), value: t("of.requesterName") }
                ].map((row, i) => (
                  <li key={i} className="flex flex-row-reverse items-center justify-between py-2 border-b border-outline-variant/30">
                    <span className="text-on-surface-variant text-sm">{row.label}</span>
                    <span className="font-bold text-primary">
                      <span className="material-symbols-outlined text-positive-green text-[18px] align-middle ml-2">
                        check_circle
                      </span>
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="shine flex-1 bg-surface-container hover:bg-surface-container-high text-primary px-4 py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-1"
                  data-tooltip={t("order.step1")}
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  {t("order.editDetails")}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="shine flex-1 bg-surface-container hover:bg-surface-container-high text-primary px-4 py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-1"
                  data-tooltip={t("order.step2")}
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  {t("order.editArea")}
                </button>
              </div>
            </div>

            <aside className="bg-gradient-to-br from-primary to-tertiary text-white rounded-3xl p-6 md:p-8 sticky top-44">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 justify-center">
                <span>{t("order.quote.title")}</span>
                <span className="material-symbols-outlined">request_quote</span>
              </h3>
              <div className="space-y-2 mb-4 text-center">
                <div className="flex flex-row-reverse justify-between text-sm">
                  <span className="text-white/70">
                    {localName} {size}
                    {includeOrthophoto ? t("of.includingOrtho") : ""}
                  </span>
                  <span>₪{price}</span>
                </div>
                {shippingCost > 0 && (
                  <div className="flex flex-row-reverse justify-between text-sm">
                    <span className="text-white/70">{t("order.quote.shipping")}</span>
                    <span>₪{shippingCost}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-white/20 pt-4 mb-6 text-center">
                <div className="flex flex-row-reverse justify-between items-baseline">
                  <span className="text-sm font-bold">{t("order.quote.total")}</span>
                  <span className="text-3xl font-black text-secondary-container">
                    ₪{totalPrice}
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-1">{t("of.includesVat")}</p>
              </div>

              <div className="space-y-2 mb-6">
                <button
                  className="shine w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  data-tooltip={t("order.quote.downloadPdf")}
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  {t("order.quote.downloadPdf")}
                </button>
                <button
                  className="shine w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  data-tooltip={t("order.quote.sendEmail")}
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  {t("order.quote.sendEmail")}
                </button>
              </div>

              <p className="text-xs text-secondary-container mb-4">
                ⏱ {t("order.quote.validity")}
              </p>

              <div className="space-y-3 mb-6 text-center text-sm">
                <label className="flex items-center justify-center gap-2 cursor-pointer">
                  <span>{t("order.terms.terms")}</span>
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-secondary"
                  />
                </label>
                <label className="flex items-center justify-center gap-2 cursor-pointer">
                  <span>{t("order.terms.quote")}</span>
                  <input
                    type="checkbox"
                    checked={acceptQuote}
                    onChange={(e) => setAcceptQuote(e.target.checked)}
                    className="w-4 h-4 rounded text-secondary"
                  />
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="shine px-4 py-3 rounded-xl text-white/70 font-bold hover:text-white"
                  data-tooltip={t("order.step2")}
                  data-tooltip-position="bottom"
                >
                  ← {t("order.back")}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  disabled={!acceptTerms || !acceptQuote}
                  className="shine flex-1 bg-secondary hover:bg-secondary/90 text-white px-4 py-3 rounded-xl font-bold disabled:bg-white/20 disabled:cursor-not-allowed transition-colors"
                  data-tooltip={
                    !acceptTerms || !acceptQuote
                      ? t("of.acceptPayTip")
                      : t("of.gotoGovPay")
                  }
                  data-tooltip-position="bottom"
                >
                  {t("of.acceptPaymentBtn")}
                </button>
              </div>
            </aside>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white rounded-3xl p-8 md:p-16 border border-outline-variant/50 max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-positive-green/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="material-symbols-outlined text-[64px] text-positive-green">
                lock
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-primary mb-4">{t("of.payTitle")}</h2>
            <p className="text-on-surface-variant mb-6">
              {t("of.payIntro")}
              <br />
              {t("of.payAmount")} <span className="font-bold text-primary">₪{totalPrice}</span>
            </p>
            <div className="bg-secondary/5 rounded-2xl p-4 mb-8 text-center">
              <p className="text-xs text-on-surface-variant mb-2">{t("of.nextSteps")}</p>
              <ol className="text-sm space-y-1 list-decimal pr-5">
                <li>{t("of.next1")}</li>
                <li>{t("of.next2")}</li>
                <li>{t("of.next3")}</li>
                <li>{t("of.next4")}</li>
              </ol>
            </div>
            <div className="flex flex-col sm:flex-row-reverse gap-3">
              <Link
                href="/dashboard?paid=true"
                className="shine shine-glow flex-1 bg-positive-green text-white px-6 py-4 rounded-full font-bold hover:bg-positive-green/90 transition-colors flex items-center justify-center gap-2"
                data-tooltip={t("of.simulateTip")}
                data-tooltip-position="bottom"
              >
                <span className="material-symbols-outlined">payments</span>
                {t("of.simulatePay")}
              </Link>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="shine px-6 py-4 rounded-full text-primary font-bold hover:bg-surface-container transition-colors"
                data-tooltip={t("order.step3")}
                data-tooltip-position="bottom"
              >
                ← {t("order.back")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { SEGMENTS } from "@/lib/segments";

export default function SegmentsLandingPage() {
  const { t } = useLanguage();
  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-l from-primary via-tertiary to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
        <div className="relative max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-16 md:py-20 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 text-white/90 border border-white/10">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span className="text-xs font-bold tracking-wide">{t("seg.eyebrow")}</span>
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            {t("seg.title")}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {t("seg.subtitle")}
          </p>
        </div>
      </div>

      {/* Segment Cards */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEGMENTS.map((seg) => (
            <Link
              key={seg.id}
              href={`/segments/${seg.id}`}
              className="shine group bg-white rounded-3xl p-6 md:p-8 border-2 border-outline-variant/50 hover:border-secondary/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden text-center"
              data-tooltip={t(seg.shortKey)}
              data-tooltip-position="bottom"
            >
              {seg.popular && (
                <span className="absolute top-4 left-4 bg-positive-green text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  {t("seg.popular")}
                </span>
              )}
              <div className={`w-16 h-16 ${seg.colorClasses.bg} ${seg.colorClasses.text} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-[36px]">{seg.icon}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-secondary/70 mb-2">
                {t("seg.tier")}: {t(seg.tierKey)}
              </p>
              <h3 className="text-xl font-extrabold text-primary mb-3 leading-tight">
                {t(seg.nameKey)}
              </h3>
              <p className="text-sm text-on-surface-variant mb-5 leading-relaxed">
                {t(seg.shortKey)}
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                {seg.defaultDiscountPercent > 0 && (
                  <span className="bg-positive-green/10 text-positive-green text-xs font-bold px-3 py-1 rounded-full">
                    {t("seg.discount")} {seg.defaultDiscountPercent}%
                  </span>
                )}
                {seg.multiYearContracts && (
                  <span className="bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full">
                    {t("seg.contractsMulti")}
                  </span>
                )}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-secondary font-bold text-sm group-hover:gap-3 transition-all">
                <span>{t("seg.startHere")}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why segments */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop pb-20">
        <div className="bg-white rounded-3xl border border-outline-variant/50 p-8 md:p-12 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[28px]">price_check</span>
            </div>
            <h3 className="font-extrabold text-primary mb-2">{t("seg.specialPricing")}</h3>
            <p className="text-sm text-on-surface-variant">{t("seg.subscriptionBenefit")}</p>
          </div>
          <div>
            <div className="w-14 h-14 bg-positive-green/10 text-positive-green rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[28px]">support_agent</span>
            </div>
            <h3 className="font-extrabold text-primary mb-2">{t("seg.dedicatedContact")}</h3>
            <p className="text-sm text-on-surface-variant">{t("seg.priorityChannel")}</p>
          </div>
          <div>
            <div className="w-14 h-14 bg-alert-yellow/10 text-alert-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[28px]">workspace_premium</span>
            </div>
            <h3 className="font-extrabold text-primary mb-2">{t("seg.contractsMulti")}</h3>
            <p className="text-sm text-on-surface-variant">{t("seg.contractsMultiSub")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

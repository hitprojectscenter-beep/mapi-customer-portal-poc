"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { plans, comparisonRows } from "@/lib/plans";
import type { TKey } from "@/lib/i18n";

const COLOR_BG = {
  gray: "bg-white border-outline-variant",
  blue: "bg-gradient-to-b from-primary to-tertiary text-white border-primary shadow-2xl scale-100 md:scale-105",
  gold: "bg-white border-alert-yellow/40"
} as const;

const COLOR_ACCENT = {
  gray: "text-primary",
  blue: "text-white",
  gold: "text-alert-yellow"
} as const;

const COLOR_CTA = {
  gray: "bg-primary text-white hover:bg-secondary",
  blue: "bg-white text-primary hover:bg-secondary-container",
  gold: "bg-alert-yellow text-white hover:bg-alert-yellow/90"
} as const;

const FAQ_KEYS: Array<{ q: TKey; a: TKey }> = [
  { q: "planFaq.q1", a: "planFaq.a1" },
  { q: "planFaq.q2", a: "planFaq.a2" },
  { q: "planFaq.q3", a: "planFaq.a3" },
  { q: "planFaq.q4", a: "planFaq.a4" }
];

export default function PlansPage() {
  const { t } = useLanguage();
  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-l from-primary via-tertiary to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-5" aria-hidden="true" />
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-12 md:py-16 relative">
          <nav aria-label="Breadcrumb" className="text-xs text-white/70 mb-4">
            <ol className="flex flex-row-reverse items-center gap-2">
              <li><Link href="/" className="hover:text-white">{t("common.home")}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold">{t("nav.plans")}</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-center">{t("plans.title")}</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto text-center font-light">{t("plans.subtitle")}</p>
        </div>
      </section>

      {/* Plan cards */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10 md:py-14">
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {plans.map(plan => (
            <article
              key={plan.id}
              className={`relative rounded-2xl border-2 p-6 md:p-8 flex flex-col ${COLOR_BG[plan.color]} transition-all`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-alert-yellow text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  ★ {t("plans.mostPopular")}
                </span>
              )}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                plan.color === "blue" ? "bg-white/15 text-white" :
                plan.color === "gold" ? "bg-alert-yellow/10 text-alert-yellow" : "bg-secondary/10 text-secondary"
              }`}>
                <span className="material-symbols-outlined text-[30px]">{plan.icon}</span>
              </div>
              <h2 className={`text-xl md:text-2xl font-bold mb-2 ${COLOR_ACCENT[plan.color]}`}>
                {t(plan.nameKey)}
              </h2>
              <p className={`text-sm mb-6 font-light ${plan.color === "blue" ? "text-white/80" : "text-on-surface-variant"}`}>
                {t(plan.taglineKey)}
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl md:text-5xl font-bold ${COLOR_ACCENT[plan.color]}`}>
                    {t(plan.price.displayKey)}
                  </span>
                  <span className={`text-sm ${plan.color === "blue" ? "text-white/70" : "text-on-surface-variant"}`}>
                    {t(plan.price.unitKey)}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1" role="list">
                {plan.featuresKeys.map(fk => (
                  <li key={fk} className="flex items-start gap-2 text-sm">
                    <span
                      className="material-symbols-outlined text-[18px] flex-shrink-0 mt-0.5"
                      style={{ color: plan.color === "blue" ? "#4ADE80" : "#2E7D32" }}
                    >
                      check_circle
                    </span>
                    <span className={plan.color === "blue" ? "text-white/95" : "text-on-surface"}>
                      {t(fk)}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.code === "PUBLIC" ? "/cases/new?type=public-sector" : plan.code === "PREMIUM" ? "/dashboard?trial=premium" : "/login?plan=open"}
                className={`shine shine-glow block w-full text-center py-3.5 rounded-full font-semibold transition-colors ${COLOR_CTA[plan.color]}`}
              >
                {t(plan.ctaKey)}
              </Link>
              {plan.code === "PREMIUM" && (
                <p className="text-[11px] text-white/70 text-center mt-3 font-light">
                  {t("svc.trial.terms")}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white border-y border-outline-variant/50">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10 md:py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 text-center">{t("plans.compare")}</h2>
          <p className="text-center text-on-surface-variant font-light mb-8">{t("planCmp.title")}</p>

          <div className="overflow-x-auto -mx-4 md:mx-0">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="p-3 text-start text-xs uppercase tracking-wider font-semibold text-on-surface-variant">
                    {t("planCmp.feature")}
                  </th>
                  {plans.map(p => (
                    <th key={p.id} className="p-3 text-center font-bold text-primary">
                      <div className={`inline-flex items-center gap-1.5 ${p.highlight ? "text-secondary" : ""}`}>
                        <span className="material-symbols-outlined text-[18px]">{p.icon}</span>
                        <span>{t(p.nameKey)}</span>
                        {p.highlight && <span className="text-alert-yellow">★</span>}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={`border-b border-outline-variant/40 ${i % 2 === 0 ? "bg-surface-container/20" : ""}`}>
                    <td className="p-3 text-start font-medium text-primary">{t(row.featureKey)}</td>
                    {(["open", "premium", "public"] as const).map(col => {
                      const v = row[col];
                      return (
                        <td key={col} className="p-3 text-center">
                          {v === true ? (
                            <span className="material-symbols-outlined text-positive-green text-[22px]">check_circle</span>
                          ) : v === false ? (
                            <span className="material-symbols-outlined text-outline-variant text-[22px]">remove</span>
                          ) : (
                            <span className="text-sm font-medium">{v}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">{t("plans.faq")}</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_KEYS.map((item, i) => (
            <details key={i} className="bg-white rounded-xl p-5 border border-outline-variant/50 group open:shadow-md transition-shadow">
              <summary className="font-semibold text-primary cursor-pointer flex items-center justify-between">
                <span>{t(item.q)}</span>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="text-sm text-on-surface-variant mt-3 leading-relaxed font-light">{t(item.a)}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-white py-12 md:py-14">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t("plans.contactSales")}</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto font-light">
            {t("plans.subtitle")}
          </p>
          <Link
            href="/cases/new"
            className="shine shine-glow inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-secondary-container transition-colors"
          >
            <span className="material-symbols-outlined">support_agent</span>
            {t("plans.contactSales")}
          </Link>
        </div>
      </section>
    </div>
  );
}

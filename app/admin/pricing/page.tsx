"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { mockPricingRules } from "@/lib/admin";
import type { TKey } from "@/lib/i18n";

export default function PricingPage() {
  const { t } = useLanguage();

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">{t("price.title")}</h1>
        <p className="text-on-surface-variant">{t("price.subtitle")}</p>
      </header>

      {/* Formula card */}
      <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-secondary">function</span>
          <div className="flex-1">
            <h3 className="font-bold text-primary mb-1">{t("price.formula")}</h3>
            <p className="text-sm text-on-surface-variant font-mono">{t("price.formulaHint")}</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-outline-variant/50 p-4 mb-4 flex items-center justify-between flex-wrap gap-3">
        <input
          type="search"
          placeholder={t("price.search")}
          className="flex-1 min-w-[200px] bg-surface-container border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
        />
        <div className="flex gap-2 flex-wrap">
          <button className="shine text-xs bg-surface-container hover:bg-surface-container-high px-3 py-2 rounded-full font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">upload</span>
            <span>{t("price.import")}</span>
          </button>
          <button className="shine text-xs bg-surface-container hover:bg-surface-container-high px-3 py-2 rounded-full font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>{t("price.export")}</span>
          </button>
          <button className="shine shine-glow text-xs bg-primary text-white hover:bg-secondary px-4 py-2 rounded-full font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>{t("price.newRule")}</span>
          </button>
        </div>
      </div>

      {/* Bulk Discount info */}
      <div className="bg-positive-green/5 border border-positive-green/20 rounded-2xl p-4 mb-6 text-sm">
        <p className="font-bold text-positive-green mb-1">{t("price.bulkDiscount")}</p>
        <p className="text-on-surface-variant">{t("price.bulkDiscountSub")}</p>
      </div>

      {/* Pricing table */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-container/50 border-b border-outline-variant text-xs uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="py-3 px-3 text-right">{t("price.col.service")}</th>
                <th className="py-3 px-3">{t("price.col.segment")}</th>
                <th className="py-3 px-3">{t("price.col.basePrice")}</th>
                <th className="py-3 px-3">{t("price.col.discount")}</th>
                <th className="py-3 px-3">{t("price.col.indexation")}</th>
                <th className="py-3 px-3">{t("price.col.exceptionLimit")}</th>
                <th className="py-3 px-3">{t("price.col.effective")}</th>
                <th className="py-3 px-3">{t("price.col.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {mockPricingRules.map((rule) => (
                <tr key={rule.id} className="border-b border-outline-variant/40 hover:bg-surface-container/30 transition-colors">
                  <td className="py-3 px-3 font-medium text-primary">{rule.serviceName}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-block bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {t(`seg.${rule.segment}.name` as TKey)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-bold">₪{rule.basePrice.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center">
                    {rule.discountPercent > 0 ? (
                      <span className="font-bold text-positive-green">{rule.discountPercent}%</span>
                    ) : (
                      <span className="text-on-surface-variant">—</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center text-xs">
                    {t(`price.indexation.${rule.indexation}` as TKey)}
                  </td>
                  <td className="py-3 px-3 text-center text-xs text-on-surface-variant">
                    ₪{rule.exceptionCeiling.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-center text-xs text-on-surface-variant font-mono">{rule.effectiveFrom}</td>
                  <td className="py-3 px-3">
                    <div className="flex justify-center gap-1">
                      <button
                        className="shine w-8 h-8 rounded-lg hover:bg-secondary/10 hover:text-secondary text-on-surface-variant flex items-center justify-center"
                        aria-label="edit"
                        data-tooltip={t("price.history")}
                        data-tooltip-position="bottom"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button
                        className="shine w-8 h-8 rounded-lg hover:bg-error-red/10 hover:text-error-red text-on-surface-variant flex items-center justify-center"
                        aria-label="delete"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tier summary */}
      <section className="grid sm:grid-cols-3 gap-4 mt-6">
        {(["standard", "gold", "platinum"] as const).map((tier) => (
          <div key={tier} className="bg-white rounded-2xl p-5 border border-outline-variant/50 text-center">
            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
              tier === "platinum" ? "bg-tertiary/10 text-tertiary"
              : tier === "gold" ? "bg-alert-yellow/10 text-alert-yellow"
              : "bg-secondary/10 text-secondary"
            }`}>
              <span className="material-symbols-outlined">workspace_premium</span>
            </div>
            <p className="font-extrabold text-primary">{t(`price.tier.${tier}` as TKey)}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

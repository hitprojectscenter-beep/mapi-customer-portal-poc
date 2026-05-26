"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { mockStrategicAccounts } from "@/lib/pipeline";
import type { TKey } from "@/lib/i18n";

const tierClasses: Record<number, string> = {
  1: "bg-error-red/10 text-error-red border-error-red/30",
  2: "bg-alert-yellow/10 text-alert-yellow border-alert-yellow/30",
  3: "bg-secondary/10 text-secondary border-secondary/30"
};

const healthClasses: Record<string, string> = {
  healthy: "bg-positive-green/10 text-positive-green",
  watch: "bg-alert-yellow/10 text-alert-yellow",
  atRisk: "bg-error-red/10 text-error-red"
};

const trendIcons: Record<string, { icon: string; color: string }> = {
  up: { icon: "trending_up", color: "text-positive-green" },
  flat: { icon: "trending_flat", color: "text-on-surface-variant" },
  down: { icon: "trending_down", color: "text-error-red" }
};

export default function StrategicAccountsPage() {
  const { t } = useLanguage();

  const tier1 = mockStrategicAccounts.filter((a) => a.tier === 1);
  const atRisk = mockStrategicAccounts.filter((a) => a.health === "atRisk" || a.health === "watch");
  const growing = mockStrategicAccounts.filter((a) => a.trend === "up");
  const totalRevenue = mockStrategicAccounts.reduce((sum, a) => sum + a.revenue12mNis, 0);

  // Sort: Tier 1 first, then by revenue desc
  const sorted = [...mockStrategicAccounts].sort((a, b) =>
    a.tier !== b.tier ? a.tier - b.tier : b.revenue12mNis - a.revenue12mNis
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">{t("strat.title")}</h1>
        <p className="text-sm text-on-surface-variant max-w-3xl">{t("strat.subtitle")}</p>
      </header>

      {/* KPI strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-outline-variant/50 text-center">
          <p className="text-2xl font-black text-primary">{mockStrategicAccounts.length}</p>
          <p className="text-[11px] text-on-surface-variant mt-1">{t("strat.top20")}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-outline-variant/50 text-center">
          <p className="text-2xl font-black text-error-red">{tier1.length}</p>
          <p className="text-[11px] text-on-surface-variant mt-1">{t("strat.tier1")}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-outline-variant/50 text-center">
          <p className="text-2xl font-black text-positive-green">{growing.length}</p>
          <p className="text-[11px] text-on-surface-variant mt-1">{t("strat.growing")}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-outline-variant/50 text-center">
          <p className="text-2xl font-black text-alert-yellow">{atRisk.length}</p>
          <p className="text-[11px] text-on-surface-variant mt-1">{t("strat.atRisk")}</p>
        </div>
      </section>

      {/* Tier breakdown */}
      <section className="grid sm:grid-cols-3 gap-3">
        {[1, 2, 3].map((tier) => {
          const accs = mockStrategicAccounts.filter((a) => a.tier === tier);
          const tierRev = accs.reduce((s, a) => s + a.revenue12mNis, 0);
          const pct = ((tierRev / totalRevenue) * 100).toFixed(0);
          return (
            <div key={tier} className={`rounded-2xl p-4 border ${tierClasses[tier].split(" ").slice(0,2).join(" ")}`}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-primary text-sm">{t(`strat.tier${tier}` as TKey)}</p>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${tierClasses[tier]}`}>
                  T{tier}
                </span>
              </div>
              <p className="text-xl font-black text-primary">{accs.length} <span className="text-xs font-normal text-on-surface-variant">לקוחות</span></p>
              <p className="text-xs text-on-surface-variant mt-1">₪{(tierRev / 1_000_000).toFixed(2)}M • {pct}% מההכנסה</p>
            </div>
          );
        })}
      </section>

      {/* Table */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 overflow-hidden">
        <header className="px-5 py-3 border-b border-outline-variant/50">
          <h2 className="text-base font-extrabold text-primary">{t("strat.top20")}</h2>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-surface-container/50 text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3 text-right">{t("strat.col.customer")}</th>
                <th className="py-2.5 px-3">{t("strat.col.tier")}</th>
                <th className="py-2.5 px-3">{t("strat.col.am")}</th>
                <th className="py-2.5 px-3">{t("strat.col.revenue12m")}</th>
                <th className="py-2.5 px-3">{t("strat.col.contractEnd")}</th>
                <th className="py-2.5 px-3">{t("strat.col.trend")}</th>
                <th className="py-2.5 px-3">{t("strat.col.health")}</th>
                <th className="py-2.5 px-3">{t("strat.crossSell")}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((a) => (
                <tr key={a.id} className="border-b border-outline-variant/30 hover:bg-surface-container/30">
                  <td className="py-2.5 px-3 font-medium text-primary">{a.name}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${tierClasses[a.tier]}`}>
                      T{a.tier}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center text-on-surface-variant">{a.accountManager}</td>
                  <td className="py-2.5 px-3 text-center font-bold text-primary">₪{(a.revenue12mNis / 1000).toFixed(0)}K</td>
                  <td className="py-2.5 px-3 text-center font-mono text-on-surface-variant">{a.contractEnd}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`material-symbols-outlined ${trendIcons[a.trend].color} text-[18px] align-middle`}>
                      {trendIcons[a.trend].icon}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${healthClasses[a.health]}`}>
                      {a.health === "healthy" ? "תקין" : a.health === "watch" ? "מעקב" : "בסיכון"}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {a.crossSellOpportunities > 0 ? (
                      <span className="inline-flex items-center gap-1 bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full">
                        <span className="material-symbols-outlined text-[12px]">add_shopping_cart</span>
                        {a.crossSellOpportunities}
                      </span>
                    ) : (
                      <span className="text-on-surface-variant">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

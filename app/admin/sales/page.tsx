"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { mockPipeline, mockRevenueBySegment, responsibilityMatrix, migrationScope } from "@/lib/admin";
import type { TKey } from "@/lib/i18n";

const roleClasses: Record<string, string> = {
  sales: "bg-secondary/10 text-secondary",
  division: "bg-positive-green/10 text-positive-green",
  both: "bg-tertiary/10 text-tertiary"
};

const migStatusClasses: Record<string, string> = {
  planned: "bg-alert-yellow/10 text-alert-yellow",
  inProgress: "bg-secondary/10 text-secondary",
  done: "bg-positive-green/10 text-positive-green"
};

export default function SalesDashboardPage() {
  const { t } = useLanguage();

  const totalRevenue = mockRevenueBySegment.reduce((sum, r) => sum + r.revenue, 0);
  const totalTarget = mockRevenueBySegment.reduce((sum, r) => sum + r.target, 0);
  const attainment = ((totalRevenue / totalTarget) * 100).toFixed(1);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">{t("sales.title")}</h1>
        <p className="text-on-surface-variant">{t("sales.subtitle")}</p>
      </header>

      {/* Target vs Actual */}
      <section className="bg-gradient-to-br from-primary to-tertiary text-white rounded-3xl p-6 md:p-8 mb-6">
        <h2 className="font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">flag</span>
          <span>{t("sales.targetVsActual")} - {t("sales.thisYear")}</span>
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-xs text-white/70 mb-1">{t("sales.target")}</p>
            <p className="text-2xl md:text-3xl font-black">₪{(totalTarget / 1_000_000).toFixed(1)}M</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/70 mb-1">{t("sales.actual")}</p>
            <p className="text-2xl md:text-3xl font-black text-secondary-container">₪{(totalRevenue / 1_000_000).toFixed(1)}M</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/70 mb-1">{t("sales.attainment")}</p>
            <p className="text-2xl md:text-3xl font-black text-positive-green">{attainment}%</p>
          </div>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-l from-positive-green to-secondary-container transition-all"
            style={{ width: `${Math.min(parseFloat(attainment), 100)}%` }}
          />
        </div>
      </section>

      {/* Revenue by Segment */}
      <section className="bg-white rounded-3xl border border-outline-variant/50 p-6 mb-6">
        <h2 className="text-xl font-extrabold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">groups</span>
          <span>{t("sales.revenueBySegment")}</span>
        </h2>
        <div className="space-y-3">
          {mockRevenueBySegment.map((r) => (
            <div key={r.segment}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-primary">{t(`seg.${r.segment}.name` as TKey)}</span>
                <span className="text-xs font-mono">
                  ₪{(r.revenue / 1000).toFixed(0)}K / ₪{(r.target / 1000).toFixed(0)}K
                  <span className={`ml-2 font-bold ${r.percent >= 100 ? "text-positive-green" : r.percent >= 85 ? "text-alert-yellow" : "text-error-red"}`}>
                    {r.percent.toFixed(0)}%
                  </span>
                </span>
              </div>
              <div className="h-2.5 bg-surface-container rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    r.percent >= 100 ? "bg-positive-green" : r.percent >= 85 ? "bg-alert-yellow" : "bg-error-red"
                  }`}
                  style={{ width: `${Math.min(r.percent, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pipeline / Funnel */}
      <section className="bg-white rounded-3xl border border-outline-variant/50 p-6 mb-6">
        <h2 className="text-xl font-extrabold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">filter_alt</span>
          <span>{t("sales.conversionFunnel")}</span>
        </h2>
        <div className="space-y-2">
          {mockPipeline.map((p, i) => {
            const widthPct = (p.count / mockPipeline[0].count) * 100;
            return (
              <div key={p.stage} className="flex items-center gap-3">
                <span className="w-28 text-sm font-bold text-primary">{t(`sales.stage.${p.stage}` as TKey)}</span>
                <div className="flex-1 bg-surface-container rounded-xl h-10 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-l from-secondary to-primary flex items-center px-4 text-white text-sm font-bold transition-all"
                    style={{ width: `${widthPct}%`, minWidth: "20%" }}
                  >
                    {p.count}
                  </div>
                </div>
                <span className="w-24 text-right text-sm font-bold text-on-surface-variant">₪{(p.value / 1000).toFixed(0)}K</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Formulas */}
      <section className="bg-secondary/5 border border-secondary/20 rounded-3xl p-6 mb-6">
        <h2 className="text-xl font-extrabold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">function</span>
          <span>{t("price.formula")} / KPI</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {(["sales.formula.revenue", "sales.formula.arr", "sales.formula.winRate", "sales.formula.cac"] as TKey[]).map((k) => (
            <div key={k} className="bg-white rounded-xl p-3 border border-outline-variant/40">
              <p className="font-mono text-xs text-on-surface-variant">{t(k)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Responsibility Matrix */}
      <section className="bg-white rounded-3xl border border-outline-variant/50 p-6 mb-6">
        <h2 className="text-xl font-extrabold text-primary mb-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">supervisor_account</span>
          <span>{t("sales.respMatrix")}</span>
        </h2>
        <p className="text-sm text-on-surface-variant mb-4">{t("sales.respMatrixSub")}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-outline-variant text-xs uppercase text-on-surface-variant tracking-wider">
              <tr>
                <th className="py-2 text-right pr-4">{t("sales.stage.lead")}</th>
                <th className="py-2 text-center">{t("sales.role.sales")}</th>
                <th className="py-2 text-center">{t("sales.role.division")}</th>
                <th className="py-2 text-center">{t("sales.role.both")}</th>
              </tr>
            </thead>
            <tbody>
              {responsibilityMatrix.map((row) => (
                <tr key={row.stageKey} className="border-b border-outline-variant/40">
                  <td className="py-3 pr-4 font-medium text-primary">{t(row.stageKey as TKey)}</td>
                  {(["sales", "division", "both"] as const).map((role) => (
                    <td key={role} className="py-3 text-center">
                      {row.responsible === role ? (
                        <span className={`inline-block w-7 h-7 rounded-full ${roleClasses[role]} flex items-center justify-center font-bold mx-auto`}>
                          ✓
                        </span>
                      ) : (
                        <span className="text-on-surface-variant">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Migration scope */}
      <section className="bg-white rounded-3xl border border-outline-variant/50 p-6">
        <h2 className="text-xl font-extrabold text-primary mb-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">database</span>
          <span>{t("mig.title")}</span>
        </h2>
        <p className="text-sm text-on-surface-variant mb-4">{t("mig.subtitle")}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-container/50 border-b border-outline-variant text-xs uppercase text-on-surface-variant tracking-wider">
              <tr>
                <th className="py-2 px-3">{t("mig.col.entity")}</th>
                <th className="py-2 px-3">{t("mig.col.years")}</th>
                <th className="py-2 px-3">{t("mig.col.records")}</th>
                <th className="py-2 px-3">{t("mig.col.structure")}</th>
                <th className="py-2 px-3">{t("mig.col.status")}</th>
              </tr>
            </thead>
            <tbody>
              {migrationScope.map((m) => (
                <tr key={m.entityKey} className="border-b border-outline-variant/40">
                  <td className="py-3 px-3 font-medium text-primary">{t(m.entityKey as TKey)}</td>
                  <td className="py-3 px-3 text-center">{m.years}</td>
                  <td className="py-3 px-3 text-center font-mono text-xs">{m.estimatedRecords.toLocaleString()}</td>
                  <td className="py-3 px-3 text-xs">{m.targetStructure}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${migStatusClasses[m.status]}`}>
                      {t(`mig.status.${m.status}` as TKey)}
                    </span>
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

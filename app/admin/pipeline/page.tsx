"use client";

import { useLanguage } from "@/lib/LanguageContext";
import {
  PIPELINE_STAGES, ROUTE_TYPES, mockPipelineEntries,
  QUOTE_APPROVAL_POLICY, DETERMINISTIC_DISCOUNTS, PRICE_BOOK_POLICY,
  SLA_BY_ROUTE, RENEWAL_TIMELINE
} from "@/lib/pipeline";
import type { TKey } from "@/lib/i18n";

const slaClasses: Record<string, string> = {
  onTime: "bg-positive-green/10 text-positive-green",
  warning: "bg-alert-yellow/10 text-alert-yellow",
  breach: "bg-error-red/10 text-error-red"
};

const routeClasses: Record<string, string> = {
  A: "bg-positive-green/10 text-positive-green",
  B: "bg-secondary/10 text-secondary",
  C: "bg-alert-yellow/10 text-alert-yellow",
  D: "bg-tertiary/10 text-tertiary"
};

export default function PipelinePage() {
  const { t } = useLanguage();

  // Count by stage
  const byStage = PIPELINE_STAGES.map((s) => ({
    stage: s,
    count: mockPipelineEntries.filter((e) => e.currentStage === s.id).length,
    value: mockPipelineEntries
      .filter((e) => e.currentStage === s.id)
      .reduce((sum, e) => sum + e.amount, 0)
  }));

  const maxCount = Math.max(...byStage.map((s) => s.count), 1);
  const totalValue = mockPipelineEntries.reduce((sum, e) => sum + e.amount, 0);

  // SLA stats
  const onTime = mockPipelineEntries.filter((e) => e.slaStatus === "onTime").length;
  const warning = mockPipelineEntries.filter((e) => e.slaStatus === "warning").length;
  const breach = mockPipelineEntries.filter((e) => e.slaStatus === "breach").length;
  const slaScore = ((onTime / mockPipelineEntries.length) * 100).toFixed(0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">{t("pipe.title")}</h1>
        <p className="text-sm text-on-surface-variant max-w-3xl">{t("pipe.subtitle")}</p>
      </header>

      {/* SLA KPI Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-outline-variant/50 text-center">
          <p className="text-2xl font-black text-primary">{mockPipelineEntries.length}</p>
          <p className="text-[11px] text-on-surface-variant mt-1">{t("pipe.kpi.activeOpps")}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-outline-variant/50 text-center">
          <p className="text-2xl font-black text-positive-green">₪{(totalValue / 1000).toFixed(0)}K</p>
          <p className="text-[11px] text-on-surface-variant mt-1">{t("pipe.kpi.totalValue")}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-outline-variant/50 text-center">
          <p className="text-2xl font-black text-secondary">{slaScore}%</p>
          <p className="text-[11px] text-on-surface-variant mt-1">{t("pipe.sla.onTime")}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-outline-variant/50 text-center">
          <p className="text-2xl font-black text-error-red">{breach}</p>
          <p className="text-[11px] text-on-surface-variant mt-1">{t("pipe.sla.breach")}</p>
        </div>
      </section>

      {/* Visual funnel by stage */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 p-5">
        <h2 className="text-base font-extrabold text-primary mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">filter_alt</span>
          <span>{t("pipe.stageFunnel")}</span>
        </h2>
        <div className="space-y-2">
          {byStage.map(({ stage, count, value }) => {
            const widthPct = (count / maxCount) * 100;
            return (
              <div key={stage.id} className="flex items-center gap-3">
                <span className="w-32 text-xs font-medium text-primary truncate">{t(stage.labelKey)}</span>
                <div className="flex-1 bg-surface-container rounded-lg h-8 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-l from-secondary/80 to-primary/80 flex items-center px-3 text-white text-xs font-bold transition-all"
                    style={{ width: `${Math.max(widthPct, 8)}%` }}
                  >
                    {count > 0 && count}
                  </div>
                </div>
                <span className="w-20 text-right text-xs text-on-surface-variant font-mono">
                  ₪{(value / 1000).toFixed(0)}K
                </span>
                <span className="w-12 text-right text-[11px] font-bold text-secondary font-mono">
                  {stage.probability}%
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Route Type Legend (v7: includes route assignments) */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 p-5">
        <h2 className="text-base font-extrabold text-primary mb-3">{t("pipe.routeTypes")} (A/B/C/D)</h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {ROUTE_TYPES.map((rt) => (
            <div key={rt.id} className="border border-outline-variant/40 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${routeClasses[rt.id]}`}>
                  {rt.id}
                </span>
                <p className="text-xs font-bold text-primary">{t(rt.labelKey)}</p>
              </div>
              <p className="text-[11px] text-on-surface-variant mb-1.5">{rt.description}</p>
              <p className="text-[10px] text-secondary font-medium">{rt.routes}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11-stage SLA table (v7 4.1 + 4.2) */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 overflow-hidden">
        <header className="px-5 py-3 border-b border-outline-variant/50">
          <h2 className="text-base font-extrabold text-primary">{t("pipe.slaActionsTitle")}</h2>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-surface-container/50 text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3 text-right">{t("pipe.col.stage")}</th>
                <th className="py-2.5 px-3">{t("pipe.probability")}</th>
                <th className="py-2.5 px-3">{t("pipe.slaTarget")}</th>
                <th className="py-2.5 px-3">{t("pipe.sla.owner")}</th>
                <th className="py-2.5 px-3 text-right">{t("pipe.breachAction")}</th>
              </tr>
            </thead>
            <tbody>
              {PIPELINE_STAGES.map((s) => (
                <tr key={s.id} className={`border-b border-outline-variant/30 ${s.terminal ? "bg-surface-container/20" : ""}`}>
                  <td className="py-2.5 px-3 font-medium text-primary">
                    {t(s.labelKey)}
                    <span className="block text-[10px] text-on-surface-variant font-normal mt-0.5">{s.transition}</span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-secondary">{s.probability}%</td>
                  <td className="py-2.5 px-3 text-center text-on-surface-variant whitespace-nowrap">{s.slaTarget}</td>
                  <td className="py-2.5 px-3 text-center text-on-surface-variant">{s.ownerRole}</td>
                  <td className="py-2.5 px-3 text-right text-[11px] text-on-surface-variant">{s.breachAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* V8: pricing & approval policy (4.6) — the V7 ladders were removed */}
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border border-outline-variant/50 p-5">
          <header className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-secondary text-[20px]">approval</span>
            <h2 className="text-base font-extrabold text-primary">{t("pipe.approvalThresholds")}</h2>
          </header>
          <p className="text-sm text-primary bg-positive-green/5 border border-positive-green/20 rounded-xl px-4 py-3 leading-relaxed">
            ✓ {QUOTE_APPROVAL_POLICY} <span className="text-[11px] text-on-surface-variant">(אפיון V8, סעיף 4.6.4)</span>
          </p>
          <header className="flex items-center gap-2 mt-5 mb-3">
            <span className="material-symbols-outlined text-secondary text-[20px]">menu_book</span>
            <h2 className="text-base font-extrabold text-primary">{t("pipe.priceBooks")}</h2>
          </header>
          <p className="text-[13px] text-on-surface-variant bg-surface-container/40 border border-outline-variant/40 rounded-xl px-4 py-3 leading-relaxed">
            {PRICE_BOOK_POLICY} <span className="text-[11px]">(סעיף 4.6.1 — מחליף את 7 המחירונים וההצמדה למדד מגרסה 7)</span>
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-outline-variant/50 overflow-hidden">
          <header className="px-5 py-3 border-b border-outline-variant/50 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">percent</span>
            <h2 className="text-base font-extrabold text-primary">{t("pipe.discountLevels")}</h2>
          </header>
          <p className="px-5 py-2.5 text-[11px] text-on-surface-variant bg-surface-container/30 border-b border-outline-variant/30">
            "לא יוגדרו כלל הנחות ידניות בתהליך. ההנחות בתהליך יוגדרו בתנאים דטרמיניסטיים" (סעיף 4.6.3)
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-surface-container/50 text-on-surface-variant uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3 text-right">{t("pipe.col.discount")}</th>
                  <th className="py-2.5 px-3 text-right">{t("pipe.col.range")}</th>
                  <th className="py-2.5 px-3 text-right">{t("pipe.col.docs")}</th>
                </tr>
              </thead>
              <tbody>
                {DETERMINISTIC_DISCOUNTS.map((d, i) => (
                  <tr key={i} className="border-b border-outline-variant/30">
                    <td className="py-2.5 px-3 font-bold text-primary whitespace-nowrap">{d.name}</td>
                    <td className="py-2.5 px-3 text-on-surface-variant">{d.rule}</td>
                    <td className="py-2.5 px-3 text-[11px] text-on-surface-variant">{d.management}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* V8: SLA per route in business days (4.3.4) */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 overflow-hidden">
        <header className="px-5 py-3 border-b border-outline-variant/50 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">timer</span>
          <h2 className="text-base font-extrabold text-primary">SLA לפי מסלול מכירה (ימי עסקים) — אפיון V8 סעיף 4.3.4</h2>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <tbody>
              {SLA_BY_ROUTE.map((r, i) => (
                <tr key={i} className="border-b border-outline-variant/30">
                  <td className="py-2.5 px-3 font-bold text-primary whitespace-nowrap w-56">{r.route}</td>
                  <td className="py-2.5 px-3 text-on-surface-variant">{r.sla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-5 py-2.5 text-[11px] text-on-surface-variant bg-surface-container/30 border-t border-outline-variant/30">
          תהליך אסקלציה רץ ברקע על כל חריגה · מסלולי שירות עצמי (סוג A) מדלגים משלב 1 ישירות לשלב 6
        </p>
      </section>

      {/* Renewal timeline (v7 4.9) */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 p-5">
        <h2 className="text-base font-extrabold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">update</span>
          <span>{t("pipe.renewalTimeline")}</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {RENEWAL_TIMELINE.map((m, i) => (
            <div key={m.offset} className="relative border border-outline-variant/40 rounded-xl p-3 bg-gradient-to-b from-white to-surface-container/20">
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                  i < 2 ? "bg-positive-green/10 text-positive-green" : i < 4 ? "bg-alert-yellow/10 text-alert-yellow" : "bg-error-red/10 text-error-red"
                }`}>
                  {m.offset}
                </span>
                <p className="text-xs font-bold text-primary">{m.title}</p>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">{m.action}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live entries */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 overflow-hidden">
        <header className="px-5 py-3 border-b border-outline-variant/50">
          <h2 className="text-base font-extrabold text-primary">{t("pipe.activeOpps")}</h2>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-surface-container/50 text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3">{t("pipe.col.routeId")}</th>
                <th className="py-2.5 px-3 text-right">{t("pipe.col.opportunity")}</th>
                <th className="py-2.5 px-3">{t("pipe.col.customer")}</th>
                <th className="py-2.5 px-3">{t("pipe.col.type")}</th>
                <th className="py-2.5 px-3">{t("pipe.col.stage")}</th>
                <th className="py-2.5 px-3">{t("pipe.col.daysInStage")}</th>
                <th className="py-2.5 px-3">SLA</th>
                <th className="py-2.5 px-3">{t("pipe.col.amount")}</th>
              </tr>
            </thead>
            <tbody>
              {mockPipelineEntries.map((e) => {
                const stage = PIPELINE_STAGES.find((s) => s.id === e.currentStage);
                return (
                  <tr key={e.routeId} className="border-b border-outline-variant/30 hover:bg-surface-container/30">
                    <td className="py-2.5 px-3 font-mono text-on-surface-variant">{e.routeId}</td>
                    <td className="py-2.5 px-3 font-medium">{e.routeName}</td>
                    <td className="py-2.5 px-3 text-on-surface-variant">{e.customerName}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${routeClasses[e.routeType]}`}>
                        {e.routeType}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center text-xs">{stage ? t(stage.labelKey) : e.currentStage}</td>
                    <td className="py-2.5 px-3 text-center font-mono">{e.daysInStage}d</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${slaClasses[e.slaStatus]}`}>
                        {t(`pipe.sla.${e.slaStatus}` as TKey)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold">₪{e.amount.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

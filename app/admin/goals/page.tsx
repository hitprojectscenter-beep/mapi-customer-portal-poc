"use client";

import { useLanguage } from "@/lib/LanguageContext";
import type { TKey } from "@/lib/i18n";

interface Goal {
  id: string;
  labelKey: TKey;
  targetKey: TKey;
  current: number;
  target: number;
  unit: "%" | "₪M" | "days" | "score";
  icon: string;
  iconClasses: string;
}

const GOALS: Goal[] = [
  { id: "revenue", labelKey: "goals.kpi.revenue", targetKey: "goals.kpi.revenueTarget", current: 12.4, target: 15, unit: "%", icon: "trending_up", iconClasses: "bg-positive-green/10 text-positive-green" },
  { id: "cycle", labelKey: "goals.kpi.cycle", targetKey: "goals.kpi.cycleTarget", current: 18, target: 30, unit: "%", icon: "speed", iconClasses: "bg-secondary/10 text-secondary" },
  { id: "satisfaction", labelKey: "goals.kpi.satisfaction", targetKey: "goals.kpi.satisfactionTarget", current: 4.4, target: 4.2, unit: "score", icon: "sentiment_satisfied", iconClasses: "bg-positive-green/10 text-positive-green" },
  { id: "adoption", labelKey: "goals.kpi.adoption", targetKey: "goals.kpi.adoptionTarget", current: 42, target: 60, unit: "%", icon: "phone_iphone", iconClasses: "bg-tertiary/10 text-tertiary" },
  { id: "renewal", labelKey: "goals.kpi.renewal", targetKey: "goals.kpi.renewalTarget", current: 87, target: 85, unit: "%", icon: "autorenew", iconClasses: "bg-positive-green/10 text-positive-green" },
  { id: "upsell", labelKey: "goals.kpi.upsell", targetKey: "goals.kpi.upsellTarget", current: 18, target: 25, unit: "%", icon: "shopping_cart_checkout", iconClasses: "bg-alert-yellow/10 text-alert-yellow" }
];

const MEASURE_ITEMS: Array<{ key: TKey; icon: string }> = [
  { key: "goals.dashboardRT", icon: "monitor_heart" },
  { key: "goals.monthlyMeeting", icon: "event" },
  { key: "goals.qbr", icon: "calendar_view_month" },
  { key: "goals.executiveReport", icon: "summarize" }
];

export default function GoalsPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">{t("goals.title")}</h1>
        <p className="text-sm text-on-surface-variant max-w-3xl">{t("goals.subtitle")}</p>
      </header>

      {/* Goals Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GOALS.map((g) => {
          const isHigherBetter = !(g.id === "cycle"); // cycle: lower is better
          const attainment = isHigherBetter
            ? Math.min((g.current / g.target) * 100, 130)
            : Math.min((g.current / g.target) * 100, 130);
          const onTrack = isHigherBetter ? g.current >= g.target * 0.85 : g.current <= g.target * 1.15;
          return (
            <div key={g.id} className="bg-white rounded-2xl border border-outline-variant/50 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${g.iconClasses}`}>
                  <span className="material-symbols-outlined">{g.icon}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  onTrack ? "bg-positive-green/10 text-positive-green" : "bg-alert-yellow/10 text-alert-yellow"
                }`}>
                  {onTrack ? "On track" : "Behind"}
                </span>
              </div>
              <p className="text-sm font-bold text-primary mb-1">{t(g.labelKey)}</p>
              <p className="text-xs text-on-surface-variant mb-3">{t(g.targetKey)}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <p className="text-2xl font-black text-primary">
                  {g.unit === "score" ? g.current.toFixed(1) : g.current}
                </p>
                <span className="text-xs text-on-surface-variant font-mono">
                  / {g.unit === "score" ? g.target.toFixed(1) : g.target}{g.unit !== "score" ? g.unit : ""}
                </span>
              </div>
              <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${onTrack ? "bg-positive-green" : "bg-alert-yellow"}`}
                  style={{ width: `${Math.min(attainment, 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-on-surface-variant mt-1 font-mono text-center">{attainment.toFixed(0)}% attainment</p>
            </div>
          );
        })}
      </section>

      {/* Measurement */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 p-5">
        <h2 className="text-base font-extrabold text-primary mb-4">{t("goals.measurement")}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MEASURE_ITEMS.map((m) => (
            <div key={m.key} className="border border-outline-variant/40 rounded-xl p-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-[20px]">{m.icon}</span>
              <p className="text-xs text-primary font-medium leading-snug">{t(m.key)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

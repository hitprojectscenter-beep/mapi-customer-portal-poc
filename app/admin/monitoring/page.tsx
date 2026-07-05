"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { getErrors, clearErrors, capture, type CapturedError } from "@/lib/monitoring";

const SOURCE_BADGES: Record<CapturedError["source"], { icon: string; cls: string }> = {
  window: { icon: "web_asset", cls: "bg-error-red/10 text-error-red" },
  promise: { icon: "sync_problem", cls: "bg-alert-yellow/10 text-alert-yellow" },
  boundary: { icon: "fence", cls: "bg-secondary/10 text-secondary" },
  manual: { icon: "edit", cls: "bg-surface-container text-on-surface-variant" }
};

export default function MonitoringPage() {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<CapturedError[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const refresh = () => setErrors(getErrors());
  useEffect(() => { refresh(); }, []);

  const today = new Date().setHours(0, 0, 0, 0);
  const todayCount = errors.filter(e => e.timestamp >= today).length;

  const handleTestError = () => {
    capture(new Error("בדיקת מערכת ניטור — שגיאה יזומה (test error)"), "manual");
    refresh();
  };

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">monitor_heart</span>
            <span>{t("monitor.title")}</span>
          </h1>
          <p className="text-sm text-on-surface-variant font-light mt-1">{t("monitor.subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleTestError}
            className="shine bg-surface-container hover:bg-secondary/10 text-primary px-4 py-2 rounded-full text-xs font-semibold"
          >
            {t("monitor.testError")}
          </button>
          <button
            type="button"
            onClick={() => { clearErrors(); refresh(); }}
            className="shine bg-error-red/10 hover:bg-error-red hover:text-white text-error-red px-4 py-2 rounded-full text-xs font-semibold"
          >
            {t("monitor.clear")}
          </button>
        </div>
      </header>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl border border-outline-variant/50 p-4 text-center">
          <p className="text-2xl font-black text-primary" dir="ltr">{errors.length}</p>
          <p className="text-[11px] text-on-surface-variant mt-1">{t("monitor.kpi.total")}</p>
        </div>
        <div className="bg-white rounded-2xl border border-outline-variant/50 p-4 text-center">
          <p className={`text-2xl font-black ${todayCount > 0 ? "text-error-red" : "text-positive-green"}`} dir="ltr">{todayCount}</p>
          <p className="text-[11px] text-on-surface-variant mt-1">{t("monitor.kpi.today")}</p>
        </div>
        <div className="bg-white rounded-2xl border border-outline-variant/50 p-4 text-center">
          <p className="text-2xl font-black text-positive-green">
            <span className="material-symbols-outlined text-[28px] align-middle">
              {todayCount === 0 ? "check_circle" : "warning"}
            </span>
          </p>
          <p className="text-[11px] text-on-surface-variant mt-1">
            {todayCount === 0 ? t("monitor.kpi.healthy") : t("monitor.kpi.attention")}
          </p>
        </div>
      </div>

      {/* Error list */}
      {errors.length === 0 ? (
        <div className="bg-white rounded-2xl border border-outline-variant/50 p-12 text-center">
          <span className="material-symbols-outlined text-[56px] text-positive-green">verified</span>
          <p className="font-bold text-primary mt-3">{t("monitor.empty")}</p>
          <p className="text-sm text-on-surface-variant font-light mt-1">{t("monitor.emptySub")}</p>
        </div>
      ) : (
        <ul className="space-y-2" role="list">
          {errors.map(err => {
            const badge = SOURCE_BADGES[err.source];
            const isOpen = expanded === err.id;
            return (
              <li key={err.id} className="bg-white rounded-xl border border-outline-variant/50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : err.id)}
                  className="w-full flex items-center gap-3 p-4 text-start hover:bg-surface-container/30 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${badge.cls}`}>
                    <span className="material-symbols-outlined text-[18px]">{badge.icon}</span>
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-primary truncate" dir="ltr">{err.message}</p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5" dir="ltr">
                      {err.url} · {new Date(err.timestamp).toLocaleString("he-IL")}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant transition-transform" style={{ transform: isOpen ? "rotate(180deg)" : "none" }}>
                    expand_more
                  </span>
                </button>
                {isOpen && err.stack && (
                  <pre className="bg-primary text-white text-[11px] p-4 overflow-x-auto max-h-64" dir="ltr">
                    {err.stack}
                  </pre>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Production note */}
      <div className="bg-secondary/5 rounded-2xl border border-secondary/20 p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-secondary flex-shrink-0">info</span>
        <p className="text-xs text-on-surface-variant leading-relaxed font-light">{t("monitor.prodNote")}</p>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { mockApiProjects, getPortfolioSummary, getDailyUsageSeries } from "@/lib/apiProjects";

type Tab = "summary" | "projects" | "docs";

const PLAN_COLORS: Record<string, string> = {
  OPEN: "bg-surface-container text-primary",
  PREMIUM: "bg-secondary/10 text-secondary",
  PUBLIC: "bg-alert-yellow/10 text-alert-yellow"
};

const ENV_COLORS: Record<string, string> = {
  production: "bg-positive-green/10 text-positive-green",
  staging: "bg-alert-yellow/10 text-alert-yellow",
  development: "bg-secondary/10 text-secondary"
};

export default function ApiHubPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>("summary");
  const summary = useMemo(() => getPortfolioSummary(), []);
  const series = useMemo(() => getDailyUsageSeries(30), []);
  const maxCalls = Math.max(...series.map(s => s.calls), 1);

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-tertiary to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-5" aria-hidden="true" />
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-8 md:py-10 relative">
          <nav aria-label="Breadcrumb" className="text-xs text-white/70 mb-3">
            <ol className="flex flex-row-reverse items-center gap-2">
              <li><Link href="/dashboard" className="hover:text-white">{t("nav.dashboard")}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold">{t("nav.apiHub")}</li>
            </ol>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <span className="material-symbols-outlined text-[32px]">terminal</span>
                <span>{t("api.hub.title")}</span>
              </h1>
              <p className="text-white/80 font-light mt-1 text-sm">{t("api.hub.subtitle")}</p>
            </div>
            <button
              type="button"
              className="shine shine-glow bg-white text-primary px-5 py-2.5 rounded-full font-semibold hover:bg-secondary-container transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              <span>{t("api.hub.newProject")}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tab nav */}
      <nav className="bg-white border-b border-outline-variant/50 sticky top-[168px] z-30" role="tablist">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop flex gap-1 overflow-x-auto">
          {([
            ["summary", "api.hub.summary", "dashboard"],
            ["projects", "api.hub.projects", "folder_managed"],
            ["docs", "api.hub.docs", "menu_book"]
          ] as const).map(([key, tKey, icon]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                tab === key ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{icon}</span>
              {t(tKey)}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-8">
        {/* SUMMARY */}
        {tab === "summary" && (
          <>
            {/* KPI grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <KpiCard icon="folder_managed" label={t("api.hub.kpi.projects")} value={summary.totalProjects.toString()} tint="secondary" />
              <KpiCard icon="key" label={t("api.hub.kpi.keys")} value={summary.activeKeys.toString()} tint="primary" />
              <KpiCard icon="bolt" label={t("api.hub.kpi.calls")} value={summary.totalCalls.toLocaleString()} tint="alert" />
              <KpiCard icon="map" label={t("api.hub.kpi.maps")} value={summary.totalMaps.toLocaleString()} tint="green" />
              <KpiCard icon="database" label={t("api.hub.kpi.data")} value={`${summary.totalDataGB} GB`} tint="secondary" />
              <KpiCard icon="payments" label={t("api.hub.kpi.cost")} value={`₪${summary.totalCostILS.toLocaleString()}`} tint="primary" />
            </div>

            {/* Usage chart */}
            <div className="bg-white rounded-2xl border border-outline-variant/50 p-5 md:p-6 mb-6">
              <header className="flex items-center justify-between flex-wrap gap-3 mb-5">
                <div>
                  <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">show_chart</span>
                    {t("api.hub.usage30d")}
                  </h2>
                  <p className="text-xs text-on-surface-variant font-light mt-0.5">
                    {t("api.hub.est")} <span className="font-semibold text-primary">₪{summary.totalCostILS}</span> <span className="text-positive-green font-semibold">↓12%</span> {t("api.hub.vs")} {t("api.hub.lastMonth")}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-secondary" />
                    <span>{t("api.hub.calls")}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-positive-green" />
                    <span>{t("api.hub.mapsLabel")}</span>
                  </span>
                </div>
              </header>

              {/* SVG bar chart */}
              <div className="overflow-x-auto -mx-2 md:mx-0">
                <div className="min-w-[600px] px-2">
                  <svg viewBox="0 0 900 220" className="w-full h-56" role="img" aria-label={t("api.hub.usage30d")}>
                    {/* Y-axis grid */}
                    {[0, 1, 2, 3, 4].map(i => (
                      <line
                        key={i}
                        x1="30"
                        y1={20 + i * 40}
                        x2="890"
                        y2={20 + i * 40}
                        stroke="#E5E7EB"
                        strokeDasharray="2 3"
                      />
                    ))}
                    {series.map((d, i) => {
                      const x = 30 + (i * (860 / series.length));
                      const barW = (860 / series.length) * 0.6;
                      const h = (d.calls / maxCalls) * 180;
                      const y = 200 - h;
                      return (
                        <g key={d.date}>
                          <rect x={x} y={y} width={barW} height={h} fill="#1D8DDA" rx="2" opacity="0.9" />
                          <rect x={x} y={200 - (d.maps / 40) * 180} width={barW} height={Math.min((d.maps / 40) * 180, 30)} fill="#2E7D32" rx="2" opacity="0.7" />
                        </g>
                      );
                    })}
                    {/* X-axis labels */}
                    {series.filter((_, i) => i % 5 === 0).map((d, idx) => {
                      const origIdx = idx * 5;
                      const x = 30 + (origIdx * (860 / series.length)) + (860 / series.length) * 0.3;
                      return (
                        <text key={d.date} x={x} y="215" fontSize="10" fill="#6B7280" textAnchor="middle">
                          {d.date.slice(5)}
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>

            {/* Report error card */}
            <div className="bg-alert-yellow/5 rounded-2xl border-2 border-dashed border-alert-yellow/40 p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-alert-yellow/10 text-alert-yellow rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[26px]">flag</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-primary">{t("api.hub.reportError")}</h3>
                  <p className="text-sm text-on-surface-variant font-light mt-1">{t("api.hub.reportErrorSub")}</p>
                </div>
                <Link
                  href="/cases/new?type=data-error"
                  className="shine bg-alert-yellow text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-alert-yellow/90 transition-colors whitespace-nowrap"
                >
                  {t("svc.error.report")}
                </Link>
              </div>
            </div>
          </>
        )}

        {/* PROJECTS */}
        {tab === "projects" && (
          <ul className="space-y-4" role="list">
            {mockApiProjects.map(proj => (
              <li key={proj.id} className="bg-white rounded-2xl border border-outline-variant/50 hover:border-secondary/50 hover:shadow-lg transition-all p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-lg font-bold text-primary">{proj.name}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${PLAN_COLORS[proj.plan]}`}>
                        {proj.plan}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${ENV_COLORS[proj.environment]}`}>
                        {t(`api.hub.env.${proj.environment === "production" ? "prod" : proj.environment === "staging" ? "staging" : "dev"}` as const)}
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant font-light">{proj.description}</p>
                  </div>
                  <button
                    type="button"
                    className="shine bg-primary text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-secondary transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    <span>{t("api.hub.viewProject")}</span>
                  </button>
                </div>

                {/* Project metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-outline-variant/40">
                  <MetricCell label={t("api.hub.calls")} value={proj.usage.apiCallsMonthly.toLocaleString()} />
                  <MetricCell label={t("api.hub.mapsLabel")} value={proj.usage.mapsDownloaded.toString()} />
                  <MetricCell label={t("api.hub.kpi.data")} value={`${proj.usage.dataVolumeGB} GB`} />
                  <MetricCell label={t("api.hub.kpi.cost")} value={proj.usage.estimatedCostILS === 0 ? t("plan.open.price") : `₪${proj.usage.estimatedCostILS}`} />
                </div>

                {/* API keys */}
                <div className="mt-4 pt-4 border-t border-outline-variant/40">
                  <p className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-2">
                    {t("api.hub.keys")} ({proj.keys.length})
                  </p>
                  <ul className="space-y-1.5" role="list">
                    {proj.keys.map(k => (
                      <li key={k.id} className="flex items-center justify-between gap-3 bg-surface-container/30 rounded-lg px-3 py-2 text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="material-symbols-outlined text-secondary text-[16px]">key</span>
                          <code className="font-mono text-primary truncate" dir="ltr">{k.keyMasked}</code>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {k.scopes.slice(0, 2).map(s => (
                            <span key={s} className="bg-white border border-outline-variant px-2 py-0.5 rounded-full text-[10px] font-medium" dir="ltr">
                              {s}
                            </span>
                          ))}
                          {k.scopes.length > 2 && (
                            <span className="text-on-surface-variant text-[10px]">+{k.scopes.length - 2}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* DOCS */}
        {tab === "docs" && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-primary">{t("api.hub.docsTitle")}</h2>
              <p className="text-sm text-on-surface-variant font-light mt-1">{t("api.hub.docsSub")}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: "rocket_launch", key: "api.hub.docs.gettingStarted", color: "bg-secondary/10 text-secondary" },
                { icon: "map", key: "api.hub.docs.mapsAPI", color: "bg-primary/10 text-primary" },
                { icon: "layers", key: "api.hub.docs.gisAPI", color: "bg-positive-green/10 text-positive-green" },
                { icon: "satellite", key: "api.hub.docs.corsAPI", color: "bg-tertiary/10 text-tertiary" },
                { icon: "error", key: "api.hub.docs.errors", color: "bg-error-red/10 text-error-red" },
                { icon: "speed", key: "api.hub.docs.rateLimits", color: "bg-alert-yellow/10 text-alert-yellow" }
              ].map((doc, i) => (
                <a
                  key={i}
                  href="#"
                  className="shine bg-white rounded-2xl border border-outline-variant/50 hover:border-secondary/50 hover:shadow-lg transition-all p-5 flex items-start gap-3"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${doc.color}`}>
                    <span className="material-symbols-outlined text-[26px]">{doc.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-primary">{t(doc.key as never)}</p>
                    <p className="text-xs text-on-surface-variant font-light mt-0.5">→</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Code example */}
            <div className="mt-8">
              <p className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-3">Quick start — Fetch a map tile</p>
              <pre className="bg-primary text-white rounded-2xl p-5 text-xs overflow-x-auto" dir="ltr">
                <code>{`// JavaScript
const response = await fetch(
  'https://api.mapi.gov.il/v1/maps/tile?z=12&x=1234&y=1567',
  {
    headers: {
      'Authorization': 'Bearer mpk_prod_YOUR_API_KEY',
      'Accept': 'image/png'
    }
  }
);
const blob = await response.blob();
// Use the tile in your map viewer...`}</code>
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ---------------- Reusable small components ----------------

function KpiCard({ icon, label, value, tint }: { icon: string; label: string; value: string; tint: "primary" | "secondary" | "green" | "alert" }) {
  const tints = {
    primary: "bg-primary/5 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    green: "bg-positive-green/10 text-positive-green",
    alert: "bg-alert-yellow/10 text-alert-yellow"
  };
  return (
    <div className="bg-white rounded-2xl border border-outline-variant/50 p-4 flex items-start gap-3 hover:shadow-md transition-all">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${tints[tint]}`}>
        <span className="material-symbols-outlined text-[22px]">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">{label}</p>
        <p className="text-2xl font-bold text-primary" dir="ltr">{value}</p>
      </div>
    </div>
  );
}

function MetricCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">{label}</p>
      <p className="text-lg font-bold text-primary mt-0.5" dir="ltr">{value}</p>
    </div>
  );
}

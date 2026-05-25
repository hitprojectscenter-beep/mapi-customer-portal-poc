"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { mockApprovals, mockSubscriptions, mockPipeline, mockRevenueBySegment } from "@/lib/admin";
import type { TKey } from "@/lib/i18n";

interface Kpi {
  labelKey: TKey;
  value: string;
  delta: string;
  icon: string;
  iconClasses: string;
  href?: string;
}

export default function AdminDashboardPage() {
  const { t } = useLanguage();

  const pendingApprovals = mockApprovals.filter((a) => a.status === "pending").length;
  const activeSubs = mockSubscriptions.filter((s) => s.renewalStatus === "active" || s.renewalStatus === "due60" || s.renewalStatus === "due30").length;
  const renewalsDue = mockSubscriptions.filter((s) => s.renewalStatus === "due30" || s.renewalStatus === "due60").length;
  const totalRevenueYtd = mockRevenueBySegment.reduce((sum, r) => sum + r.revenue, 0);
  const wonValue = mockPipeline.find((p) => p.stage === "won")?.value ?? 0;
  const quoteValue = mockPipeline.find((p) => p.stage === "quote")?.value ?? 1;
  const winRate = (wonValue / (wonValue + quoteValue) * 100).toFixed(1);
  const totalPipeline = mockPipeline.reduce((sum, p) => sum + p.value, 0);

  const kpis: Kpi[] = [
    {
      labelKey: "admin.kpi.revenueYtd",
      value: `₪${(totalRevenueYtd / 1_000_000).toFixed(1)}M`,
      delta: "+12.4%",
      icon: "payments",
      iconClasses: "bg-positive-green/10 text-positive-green",
      href: "/admin/sales"
    },
    {
      labelKey: "admin.kpi.pipeline",
      value: `₪${(totalPipeline / 1_000_000).toFixed(1)}M`,
      delta: "+8.1%",
      icon: "leaderboard",
      iconClasses: "bg-secondary/10 text-secondary",
      href: "/admin/sales"
    },
    {
      labelKey: "admin.kpi.winRate",
      value: `${winRate}%`,
      delta: "+2.3pp",
      icon: "verified",
      iconClasses: "bg-tertiary/10 text-tertiary",
      href: "/admin/sales"
    },
    {
      labelKey: "admin.kpi.pendingApprovals",
      value: String(pendingApprovals),
      delta: "—",
      icon: "task_alt",
      iconClasses: "bg-alert-yellow/10 text-alert-yellow",
      href: "/admin/approvals"
    },
    {
      labelKey: "admin.kpi.activeSubs",
      value: String(activeSubs),
      delta: "+3",
      icon: "subscriptions",
      iconClasses: "bg-primary/10 text-primary",
      href: "/admin/subscriptions"
    },
    {
      labelKey: "admin.kpi.renewalsDue",
      value: String(renewalsDue),
      delta: "—",
      icon: "event_repeat",
      iconClasses: "bg-error-red/10 text-error-red",
      href: "/admin/subscriptions"
    },
    {
      labelKey: "admin.kpi.avgDealSize",
      value: "₪53,400",
      delta: "+₪4.1K",
      icon: "savings",
      iconClasses: "bg-positive-green/10 text-positive-green"
    },
    {
      labelKey: "admin.kpi.salesCycle",
      value: "42",
      delta: "-5 days",
      icon: "schedule",
      iconClasses: "bg-secondary/10 text-secondary"
    }
  ];

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">{t("admin.title")}</h1>
        <p className="text-on-surface-variant">{t("admin.subtitle")}</p>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8" aria-label="KPI overview">
        {kpis.map((kpi, i) => {
          const inner = (
            <div className="bg-white rounded-2xl p-5 border border-outline-variant/50 hover:shadow-lg transition-shadow h-full">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${kpi.iconClasses}`}>
                  <span className="material-symbols-outlined">{kpi.icon}</span>
                </div>
                <span className="text-[11px] text-positive-green font-mono font-bold">{kpi.delta}</span>
              </div>
              <p className="text-2xl md:text-3xl font-black text-primary leading-tight">{kpi.value}</p>
              <p className="text-xs text-on-surface-variant mt-1">{t(kpi.labelKey)}</p>
            </div>
          );
          return kpi.href ? (
            <Link key={i} href={kpi.href} className="shine block">
              {inner}
            </Link>
          ) : (
            <div key={i} className="shine">{inner}</div>
          );
        })}
      </section>

      {/* Revenue per Segment - quick view */}
      <section className="bg-white rounded-3xl border border-outline-variant/50 p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <h2 className="text-xl font-extrabold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">groups</span>
            <span>{t("sales.revenueBySegment")}</span>
          </h2>
          <Link
            href="/admin/sales"
            className="shine text-sm font-bold text-secondary hover:underline px-2 py-1 rounded"
            data-tooltip={t("admin.module.salesSub")}
          >
            {t("admin.module.sales")} →
          </Link>
        </div>
        <div className="space-y-3">
          {mockRevenueBySegment.map((r) => (
            <div key={r.segment} className="flex items-center gap-3">
              <span className="w-24 md:w-32 text-sm font-medium text-primary truncate">{t(`seg.${r.segment}.name` as TKey)}</span>
              <div className="flex-1 bg-surface-container rounded-full h-3 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-l from-secondary to-primary transition-all"
                  style={{ width: `${Math.min(r.percent, 100)}%` }}
                />
              </div>
              <span className="w-16 text-right text-xs font-bold text-on-surface-variant">{r.percent.toFixed(0)}%</span>
              <span className="w-24 text-right text-sm font-bold text-primary">₪{(r.revenue / 1000).toFixed(0)}K</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/admin/approvals"
          className="shine bg-gradient-to-br from-alert-yellow/10 to-alert-yellow/5 border border-alert-yellow/20 rounded-2xl p-5 hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-alert-yellow">task_alt</span>
            <h3 className="font-extrabold text-primary">{t("admin.module.approvals")}</h3>
          </div>
          <p className="text-sm text-on-surface-variant">{pendingApprovals} {t("appr.status.pending")}</p>
        </Link>
        <Link
          href="/admin/subscriptions"
          className="shine bg-gradient-to-br from-positive-green/10 to-positive-green/5 border border-positive-green/20 rounded-2xl p-5 hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-positive-green">subscriptions</span>
            <h3 className="font-extrabold text-primary">{t("admin.module.subscriptions")}</h3>
          </div>
          <p className="text-sm text-on-surface-variant">{renewalsDue} {t("sub.renewalsDue")}</p>
        </Link>
        <Link
          href="/admin/content"
          className="shine bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-2xl p-5 hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-secondary">edit_note</span>
            <h3 className="font-extrabold text-primary">{t("admin.module.content")}</h3>
          </div>
          <p className="text-sm text-on-surface-variant">{t("admin.module.contentSub")}</p>
        </Link>
      </section>
    </div>
  );
}

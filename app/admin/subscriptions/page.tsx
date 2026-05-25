"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { mockSubscriptions } from "@/lib/admin";
import type { TKey } from "@/lib/i18n";

const renewalClasses: Record<string, string> = {
  active: "bg-positive-green/10 text-positive-green",
  due60: "bg-alert-yellow/10 text-alert-yellow",
  due30: "bg-error-red/10 text-error-red",
  expired: "bg-error-red/20 text-error-red",
  renewed: "bg-secondary/10 text-secondary"
};

export default function SubscriptionsPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<"all" | "renewals" | "expired" | "multi">("all");

  const active = mockSubscriptions.filter((s) => s.renewalStatus === "active" || s.renewalStatus === "renewed");
  const renewals = mockSubscriptions.filter((s) => s.renewalStatus === "due30" || s.renewalStatus === "due60");
  const expired = mockSubscriptions.filter((s) => s.renewalStatus === "expired");
  const multi = mockSubscriptions.filter((s) => s.multiYear);

  const filtered = tab === "all" ? mockSubscriptions
                 : tab === "renewals" ? renewals
                 : tab === "expired" ? expired
                 : multi;

  const arr = mockSubscriptions
    .filter((s) => s.renewalStatus !== "expired")
    .reduce((sum, s) => sum + s.annualValue, 0);
  const churn = expired.length / mockSubscriptions.length * 100;

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">{t("sub.title")}</h1>
        <p className="text-on-surface-variant">{t("sub.subtitle")}</p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-outline-variant/50 text-center">
          <p className="text-2xl md:text-3xl font-black text-primary">₪{(arr / 1_000_000).toFixed(2)}M</p>
          <p className="text-xs text-on-surface-variant mt-1">{t("sub.totalArr")}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-outline-variant/50 text-center">
          <p className="text-2xl md:text-3xl font-black text-positive-green">{active.length}</p>
          <p className="text-xs text-on-surface-variant mt-1">{t("sub.active")}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-outline-variant/50 text-center">
          <p className="text-2xl md:text-3xl font-black text-alert-yellow">{renewals.length}</p>
          <p className="text-xs text-on-surface-variant mt-1">{t("sub.renewalsDue")}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-outline-variant/50 text-center">
          <p className="text-2xl md:text-3xl font-black text-error-red">{churn.toFixed(1)}%</p>
          <p className="text-xs text-on-surface-variant mt-1">{t("sub.churnRate")}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-outline-variant/40 flex-wrap">
        {[
          { id: "all" as const, labelKey: "sub.active" as TKey, count: mockSubscriptions.length },
          { id: "renewals" as const, labelKey: "sub.renewalsDue" as TKey, count: renewals.length },
          { id: "expired" as const, labelKey: "sub.expired" as TKey, count: expired.length },
          { id: "multi" as const, labelKey: "sub.multiYear" as TKey, count: multi.length }
        ].map((tabDef) => (
          <button
            key={tabDef.id}
            type="button"
            onClick={() => setTab(tabDef.id)}
            className={`shine px-4 py-2 font-bold text-sm rounded-t-xl transition-colors ${
              tab === tabDef.id
                ? "bg-white border-b-2 border-secondary text-secondary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            {t(tabDef.labelKey)} ({tabDef.count})
          </button>
        ))}
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-container/50 border-b border-outline-variant text-xs uppercase text-on-surface-variant tracking-wider">
              <tr>
                <th className="py-3 px-3">{t("sub.col.customer")}</th>
                <th className="py-3 px-3">{t("appr.col.segment")}</th>
                <th className="py-3 px-3">{t("sub.col.service")}</th>
                <th className="py-3 px-3">{t("sub.col.startDate")}</th>
                <th className="py-3 px-3">{t("sub.col.endDate")}</th>
                <th className="py-3 px-3">{t("sub.col.value")}</th>
                <th className="py-3 px-3">{t("sub.col.renewalStatus")}</th>
                <th className="py-3 px-3">{t("sub.col.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-outline-variant/40 hover:bg-surface-container/30">
                  <td className="py-3 px-3 font-medium">
                    {s.customerName}
                    {s.multiYear && (
                      <span className="ml-2 text-[10px] bg-tertiary/10 text-tertiary px-1.5 py-0.5 rounded-full font-bold">
                        {s.contractYears}Y
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center text-xs">{t(`seg.${s.segment}.name` as TKey)}</td>
                  <td className="py-3 px-3 text-xs">{s.serviceName}</td>
                  <td className="py-3 px-3 text-center text-xs text-on-surface-variant font-mono">{s.startDate}</td>
                  <td className="py-3 px-3 text-center text-xs text-on-surface-variant font-mono">{s.endDate}</td>
                  <td className="py-3 px-3 text-center font-bold">₪{s.annualValue.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-bold ${renewalClasses[s.renewalStatus]}`}>
                      {t(`sub.renewal.${s.renewalStatus}` as TKey)}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex justify-center gap-1">
                      <button
                        className="shine text-[10px] bg-positive-green/10 hover:bg-positive-green hover:text-white text-positive-green font-bold px-2 py-1 rounded-lg"
                        data-tooltip={t("sub.btn.renew")}
                      >
                        {t("sub.btn.renew")}
                      </button>
                      <button
                        className="shine w-7 h-7 rounded-lg hover:bg-secondary/10 hover:text-secondary text-on-surface-variant flex items-center justify-center"
                        aria-label="contact"
                        data-tooltip={t("sub.btn.contact")}
                      >
                        <span className="material-symbols-outlined text-[14px]">phone</span>
                      </button>
                      <button
                        className="shine w-7 h-7 rounded-lg hover:bg-secondary/10 hover:text-secondary text-on-surface-variant flex items-center justify-center"
                        aria-label="contract"
                        data-tooltip={t("sub.btn.viewContract")}
                      >
                        <span className="material-symbols-outlined text-[14px]">description</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

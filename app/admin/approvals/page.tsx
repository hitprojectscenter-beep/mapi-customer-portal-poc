"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { mockApprovals } from "@/lib/admin";
import type { TKey } from "@/lib/i18n";

const statusClasses: Record<string, string> = {
  pending: "bg-alert-yellow/10 text-alert-yellow",
  approved: "bg-positive-green/10 text-positive-green",
  rejected: "bg-error-red/10 text-error-red",
  exception: "bg-tertiary/10 text-tertiary"
};

export default function ApprovalsPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<"queue" | "history" | "metrics">("queue");

  const pending = mockApprovals.filter((a) => a.status === "pending");
  const history = mockApprovals.filter((a) => a.status !== "pending");

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">{t("appr.title")}</h1>
        <p className="text-on-surface-variant">{t("appr.subtitle")}</p>
      </header>

      {/* Policy summary */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 mb-6">
        <h2 className="font-bold text-primary mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">policy</span>
          <span>{t("appr.policyTitle")}</span>
        </h2>
        <ul className="space-y-2 text-sm" role="list">
          {(["appr.policyRule1", "appr.policyRule2", "appr.policyRule3", "appr.policyRule4"] as TKey[]).map((k) => (
            <li key={k} className="flex items-start gap-2">
              <span className="material-symbols-outlined text-positive-green text-[18px] flex-shrink-0">check_circle</span>
              <span className="text-on-surface-variant">{t(k)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Process flow */}
      <div className="bg-secondary/5 border border-secondary/20 rounded-3xl p-6 mb-6">
        <h2 className="font-bold text-primary text-center mb-5">{t("appr.flowTitle")}</h2>
        <div className="grid sm:grid-cols-4 gap-3">
          {([
            { tk: "appr.flow.step1", sk: "appr.flowStep1Sub", icon: "shopping_cart" },
            { tk: "appr.flow.step2", sk: "appr.flowStep2Sub", icon: "support_agent" },
            { tk: "appr.flow.step3", sk: "appr.flowStep3Sub", icon: "engineering" },
            { tk: "appr.flow.step4", sk: "appr.flowStep4Sub", icon: "task_alt" }
          ] as Array<{ tk: TKey; sk: TKey; icon: string }>).map((step, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-outline-variant/40 text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
              </div>
              <p className="text-xs font-bold text-secondary mb-1">{i + 1}.</p>
              <p className="font-extrabold text-primary text-sm">{t(step.tk)}</p>
              <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">{t(step.sk)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsibility split */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-outline-variant/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-secondary">support_agent</span>
            <p className="font-bold text-primary">{t("appr.respSales").split(":")[0]}</p>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">{t("appr.respSales")}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-outline-variant/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-positive-green">engineering</span>
            <p className="font-bold text-primary">{t("appr.respDivision").split(":")[0]}</p>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">{t("appr.respDivision")}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-outline-variant/40">
        {[
          { id: "queue" as const, labelKey: "appr.queue" as TKey, count: pending.length },
          { id: "history" as const, labelKey: "appr.history" as TKey, count: history.length },
          { id: "metrics" as const, labelKey: "appr.metrics" as TKey, count: 0 }
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
            {t(tabDef.labelKey)} {tabDef.count > 0 ? `(${tabDef.count})` : ""}
          </button>
        ))}
      </div>

      {/* Queue Table */}
      {(tab === "queue" || tab === "history") && (
        <div className="bg-white rounded-3xl border border-outline-variant/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-container/50 border-b border-outline-variant text-xs uppercase text-on-surface-variant tracking-wider">
                <tr>
                  <th className="py-3 px-3">{t("appr.col.quoteId")}</th>
                  <th className="py-3 px-3">{t("appr.col.customer")}</th>
                  <th className="py-3 px-3">{t("appr.col.segment")}</th>
                  <th className="py-3 px-3">{t("appr.col.service")}</th>
                  <th className="py-3 px-3">{t("appr.col.amount")}</th>
                  <th className="py-3 px-3">{t("appr.col.discount")}</th>
                  <th className="py-3 px-3">{t("appr.col.level")}</th>
                  <th className="py-3 px-3">{t("appr.col.aging")}</th>
                  <th className="py-3 px-3">{t("appr.col.action")}</th>
                </tr>
              </thead>
              <tbody>
                {(tab === "queue" ? pending : history).map((a) => (
                  <tr key={a.id} className="border-b border-outline-variant/40 hover:bg-surface-container/30">
                    <td className="py-3 px-3 font-mono text-xs">{a.quoteId}</td>
                    <td className="py-3 px-3 font-medium">{a.customerName}</td>
                    <td className="py-3 px-3 text-center text-xs">{t(`seg.${a.segment}.name` as TKey)}</td>
                    <td className="py-3 px-3 text-xs">{a.serviceName}</td>
                    <td className="py-3 px-3 text-center font-bold">₪{a.amount.toLocaleString()}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="font-bold text-positive-green">{a.discountPercent}%</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-block bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {t(`appr.level.${a.level}` as TKey)}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center text-xs">{a.agingDays}d</td>
                    <td className="py-3 px-3">
                      {a.status === "pending" ? (
                        <div className="flex justify-center gap-1">
                          <button
                            className="shine w-8 h-8 rounded-lg bg-positive-green/10 hover:bg-positive-green hover:text-white text-positive-green flex items-center justify-center"
                            aria-label="approve"
                            data-tooltip={t("appr.btn.approve")}
                          >
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </button>
                          <button
                            className="shine w-8 h-8 rounded-lg bg-error-red/10 hover:bg-error-red hover:text-white text-error-red flex items-center justify-center"
                            aria-label="reject"
                            data-tooltip={t("appr.btn.reject")}
                          >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                          <button
                            className="shine w-8 h-8 rounded-lg bg-alert-yellow/10 hover:bg-alert-yellow hover:text-white text-alert-yellow flex items-center justify-center"
                            aria-label="escalate"
                            data-tooltip={t("appr.btn.escalate")}
                          >
                            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                          </button>
                        </div>
                      ) : (
                        <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-bold ${statusClasses[a.status]}`}>
                          {t(`appr.status.${a.status}` as TKey)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Metrics tab */}
      {tab === "metrics" && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-outline-variant/50 text-center">
            <p className="text-3xl font-black text-primary">2.1d</p>
            <p className="text-xs text-on-surface-variant mt-1">Avg. approval time</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-outline-variant/50 text-center">
            <p className="text-3xl font-black text-positive-green">94%</p>
            <p className="text-xs text-on-surface-variant mt-1">SLA met (&lt;3d)</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-outline-variant/50 text-center">
            <p className="text-3xl font-black text-tertiary">3</p>
            <p className="text-xs text-on-surface-variant mt-1">{t("appr.status.exception")} this month</p>
          </div>
        </div>
      )}
    </div>
  );
}

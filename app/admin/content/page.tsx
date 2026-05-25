"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { mockContentItems } from "@/lib/admin";
import type { TKey } from "@/lib/i18n";

const statusClasses: Record<string, string> = {
  current: "bg-positive-green/10 text-positive-green",
  review: "bg-alert-yellow/10 text-alert-yellow",
  outdated: "bg-error-red/10 text-error-red"
};

export default function ContentPage() {
  const { t } = useLanguage();
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">{t("cnt.title")}</h1>
        <p className="text-on-surface-variant">{t("cnt.subtitle")}</p>
      </header>

      {/* Policy */}
      <div className="bg-secondary/5 border border-secondary/20 rounded-3xl p-6 mb-6">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-secondary">policy</span>
          <div>
            <h2 className="font-bold text-primary mb-2">{t("cnt.policyTitle")}</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">{t("cnt.policyText")}</p>
          </div>
        </div>
      </div>

      {/* Owners count cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {(["sales", "geo", "cadastre", "it"] as const).map((owner) => {
          const count = mockContentItems.filter((c) => c.owner === owner).length;
          const icon = owner === "sales" ? "support_agent" : owner === "geo" ? "public" : owner === "cadastre" ? "grid_on" : "computer";
          return (
            <div key={owner} className="bg-white rounded-2xl p-5 border border-outline-variant/50 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined">{icon}</span>
              </div>
              <p className="text-2xl font-black text-primary">{count}</p>
              <p className="text-xs text-on-surface-variant mt-1">{t(`cnt.owner.${owner}` as TKey)}</p>
            </div>
          );
        })}
      </section>

      {/* Content table */}
      <div className="bg-white rounded-3xl border border-outline-variant/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-container/50 border-b border-outline-variant text-xs uppercase text-on-surface-variant tracking-wider">
              <tr>
                <th className="py-3 px-3 text-right">{t("cnt.col.page")}</th>
                <th className="py-3 px-3">{t("cnt.col.owner")}</th>
                <th className="py-3 px-3">{t("cnt.col.lastUpdated")}</th>
                <th className="py-3 px-3">{t("cnt.col.nextReview")}</th>
                <th className="py-3 px-3">{t("cnt.col.status")}</th>
              </tr>
            </thead>
            <tbody>
              {mockContentItems.map((item) => (
                <tr key={item.id} className="border-b border-outline-variant/40 hover:bg-surface-container/30">
                  <td className="py-3 px-3 font-medium text-primary">{item.page}</td>
                  <td className="py-3 px-3 text-center text-xs">{t(`cnt.owner.${item.owner}` as TKey)}</td>
                  <td className="py-3 px-3 text-center font-mono text-xs">{item.lastUpdated}</td>
                  <td className="py-3 px-3 text-center font-mono text-xs">{item.nextReview}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${statusClasses[item.status]}`}>
                      {t(`cnt.status.${item.status}` as TKey)}
                    </span>
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

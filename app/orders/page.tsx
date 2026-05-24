"use client";

import Link from "next/link";
import { mockOrders } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

const statusClasses: Record<string, string> = {
  completed: "bg-positive-green/10 text-positive-green",
  active: "bg-secondary/10 text-secondary",
  "in-progress": "bg-alert-yellow/10 text-alert-yellow",
  cancelled: "bg-error-red/10 text-error-red"
};

export default function OrdersPage() {
  const { t } = useLanguage();
  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-primary text-white">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
          <nav aria-label={t("nav.skipToContent")} className="text-sm text-white/70 mb-4">
            <ol className="flex flex-row-reverse items-center gap-2">
              <li>
                <Link href="/dashboard" className="hover:text-white">{t("nav.dashboard")}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-bold">{t("orders.crumb")}</li>
            </ol>
          </nav>
          <div className="flex flex-row-reverse items-center justify-between flex-wrap gap-4">
            <h1 className="text-3xl md:text-4xl font-extrabold">{t("orders.title")}</h1>
            <Link
              href="/catalog"
              className="shine shine-glow bg-secondary text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-secondary/90 transition-colors"
              data-tooltip={t("orders.newOrderTip")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined">add</span>
              <span>{t("orders.newOrder")}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
        {/* Filters */}
        <div className="bg-white rounded-3xl p-6 border border-outline-variant/50 mb-6">
          <div className="grid sm:grid-cols-4 gap-4">
            <div>
              <label htmlFor="filter-status" className="block text-xs font-bold text-primary mb-1 text-center">
                {t("orders.filter.status")}
              </label>
              <select
                id="filter-status"
                className="w-full bg-surface-container border-0 rounded-xl px-4 py-2 text-center focus:ring-2 focus:ring-secondary focus:outline-none"
              >
                <option>{t("orders.filterAll")}</option>
                <option>{t("orders.filterCompleted")}</option>
                <option>{t("orders.filterInProgress")}</option>
                <option>{t("orders.filterActive")}</option>
              </select>
            </div>
            <div>
              <label htmlFor="filter-type" className="block text-xs font-bold text-primary mb-1 text-center">
                {t("orders.filter.type")}
              </label>
              <select
                id="filter-type"
                className="w-full bg-surface-container border-0 rounded-xl px-4 py-2 text-center focus:ring-2 focus:ring-secondary focus:outline-none"
              >
                <option>{t("orders.filterAll")}</option>
                <option>{t("orders.filterMaps")}</option>
                <option>{t("orders.filterGis")}</option>
              </select>
            </div>
            <div>
              <label htmlFor="filter-date" className="block text-xs font-bold text-primary mb-1 text-center">
                {t("orders.filter.dateRange")}
              </label>
              <input
                id="filter-date"
                type="text"
                placeholder={t("orders.dateRangePlaceholder")}
                className="w-full bg-surface-container border-0 rounded-xl px-4 py-2 text-center focus:ring-2 focus:ring-secondary focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="filter-search" className="block text-xs font-bold text-primary mb-1 text-center">
                {t("orders.filter.search")}
              </label>
              <input
                id="filter-search"
                type="search"
                placeholder={t("orders.searchPlaceholder")}
                className="w-full bg-surface-container border-0 rounded-xl px-4 py-2 text-center focus:ring-2 focus:ring-secondary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-outline-variant/50 overflow-hidden">
          <div className="p-4 border-b border-outline-variant flex flex-row-reverse items-center justify-between">
            <p className="text-sm text-on-surface-variant">
              <span className="font-bold text-primary">{mockOrders.length}</span> {t("orders.found")}
            </p>
            <div className="flex gap-2">
              <button
                className="shine text-xs bg-surface-container hover:bg-surface-container-high px-3 py-1.5 rounded-full font-bold flex items-center gap-1"
                data-tooltip={t("orders.exportTip")}
                data-tooltip-position="bottom"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>{t("orders.exportXls")}</span>
              </button>
            </div>
          </div>
          {/* Mobile cards */}
          <ul className="md:hidden divide-y divide-outline-variant/40" role="list">
            {mockOrders.map((order) => (
              <li key={order.id} className="p-4 hover:bg-surface-container/50 transition-colors">
                <div className="flex flex-row-reverse items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="material-symbols-outlined text-secondary text-[24px] flex-shrink-0">
                      {order.serviceIcon}
                    </span>
                    <div className="text-center min-w-0">
                      <p className="font-bold text-primary text-sm truncate">{t(order.serviceNameKey)}</p>
                      <p className="font-mono text-[10px] text-on-surface-variant">{order.id}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${
                      statusClasses[order.status]
                    }`}
                  >
                    {t(order.statusKey)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-on-surface-variant block">{t("orders.dateLabel")}</span>
                    <span className="font-bold text-primary">{order.date}</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block">{t("orders.amountLabel")}</span>
                    <span className="font-bold text-primary">₪{order.amount}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="shine flex-1 bg-secondary/10 text-secondary hover:bg-secondary hover:text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 min-h-[40px]">
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    <span>{t("orders.action.view")}</span>
                  </button>
                  <button className="shine flex-1 bg-secondary/10 text-secondary hover:bg-secondary hover:text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 min-h-[40px]">
                    <span className="material-symbols-outlined text-[16px]">replay</span>
                    <span>{t("orders.action.reorder")}</span>
                  </button>
                  <button className="shine flex-1 bg-secondary/10 text-secondary hover:bg-secondary hover:text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 min-h-[40px]">
                    <span className="material-symbols-outlined text-[16px]">receipt</span>
                    <span>{t("orders.action.invoice")}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="border-b border-outline-variant text-xs text-on-surface-variant uppercase tracking-wider bg-surface-container/50">
                  <th className="py-3 px-4">{t("orders.col.actions")}</th>
                  <th className="py-3 px-4">{t("orders.col.product")}</th>
                  <th className="py-3 px-4">{t("orders.col.amount")}</th>
                  <th className="py-3 px-4">{t("orders.col.status")}</th>
                  <th className="py-3 px-4">{t("orders.col.date")}</th>
                  <th className="py-3 px-4">{t("orders.col.service")}</th>
                  <th className="py-3 px-4">{t("orders.col.id")}</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-outline-variant/40 hover:bg-surface-container/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex gap-1 justify-center">
                        <button
                          className="shine w-8 h-8 rounded-lg hover:bg-secondary/10 hover:text-secondary text-on-surface-variant flex items-center justify-center"
                          aria-label={t("orders.action.view")}
                          data-tooltip={t("orders.viewTip")}
                          data-tooltip-position="bottom"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button
                          className="shine w-8 h-8 rounded-lg hover:bg-secondary/10 hover:text-secondary text-on-surface-variant flex items-center justify-center"
                          aria-label={t("orders.action.reorder")}
                          data-tooltip={t("orders.reorderTip")}
                          data-tooltip-position="bottom"
                        >
                          <span className="material-symbols-outlined text-[18px]">replay</span>
                        </button>
                        <button
                          className="shine w-8 h-8 rounded-lg hover:bg-secondary/10 hover:text-secondary text-on-surface-variant flex items-center justify-center"
                          aria-label={t("orders.action.invoice")}
                          data-tooltip={t("orders.invoiceTip")}
                          data-tooltip-position="bottom"
                        >
                          <span className="material-symbols-outlined text-[18px]">receipt</span>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-on-surface-variant">
                      {t(order.deliverableKey)}
                    </td>
                    <td className="py-4 px-4 font-bold text-primary">₪{order.amount}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          statusClasses[order.status]
                        }`}
                      >
                        {t(order.statusKey)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant text-sm">{order.date}</td>
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-2 justify-center">
                        <span>{t(order.serviceNameKey)}</span>
                        <span className="material-symbols-outlined text-secondary text-[20px]">
                          {order.serviceIcon}
                        </span>
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-on-surface-variant">{order.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 flex flex-row-reverse items-center justify-between">
            <p className="text-sm text-on-surface-variant">{t("orders.pageOf")}</p>
            <div className="flex gap-2">
              <button
                className="shine px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high font-bold text-sm"
                data-tooltip={t("orders.prevTip")}
                data-tooltip-position="bottom"
              >
                ← {t("orders.prev")}
              </button>
              <button
                className="shine px-4 py-2 rounded-full bg-primary text-white hover:bg-secondary font-bold text-sm"
                data-tooltip={t("orders.nextTip")}
                data-tooltip-position="bottom"
              >
                {t("orders.next")} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

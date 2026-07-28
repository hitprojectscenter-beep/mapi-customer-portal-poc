"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { mockOrders } from "@/lib/data";
import { openQuoteDoc } from "@/lib/quoteDoc";
import { useLanguage } from "@/lib/LanguageContext";

const STATUS_CLS: Record<string, string> = {
  completed: "bg-positive-green/10 text-positive-green",
  active: "bg-secondary/10 text-secondary",
  "in-progress": "bg-alert-yellow/10 text-alert-yellow",
  cancelled: "bg-error-red/10 text-error-red"
};

export default function OrderDetailPage() {
  const { t } = useLanguage();
  const params = useParams<{ id: string }>();
  const order = mockOrders.find(o => o.id === params?.id);
  if (!order) notFound();

  const downloadInvoice = () =>
    openQuoteDoc({
      title: "חשבונית / קבלה",
      serviceName: order.serviceName,
      orderId: order.id,
      total: order.amount,
      date: order.date,
      lines: [`סטטוס: ${order.statusLabel}`, `תאריך הזמנה: ${order.date}`]
    });

  const downloadDeliverable = () =>
    openQuoteDoc({
      title: "תוצר ההזמנה",
      serviceName: order.serviceName,
      orderId: order.id,
      total: order.amount,
      date: order.date,
      lines: [`תוצר: ${order.deliverable}`, "בפרודקשן: הקובץ הגאוגרפי (GeoTIFF/PDF/DWG/GeoJSON) יורד מארכיון מפ\"י."]
    });

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-primary text-white">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-8">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70 mb-4">
            <ol className="flex flex-row-reverse items-center gap-2 flex-wrap">
              <li><Link href="/dashboard" className="hover:text-white">{t("nav.dashboard")}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-bold">{order.id}</li>
            </ol>
          </nav>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-16 h-16 bg-white/10 border border-gold/30 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[36px] text-gold-light" aria-hidden="true">{order.serviceIcon}</span>
            </div>
            <div>
              <p className="text-white/70 text-xs">הזמנה {order.id}</p>
              <h1 className="text-2xl md:text-3xl font-extrabold">{order.serviceName}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10 grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8">
          <h2 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
            <span className="material-symbols-outlined text-gold-dark" aria-hidden="true">receipt_long</span>פרטי ההזמנה
          </h2>
          <dl className="divide-y divide-outline-variant/40">
            {[
              ["מספר הזמנה", order.id],
              ["שירות", order.serviceName],
              ["תאריך", order.date],
              ["סכום", `₪${order.amount.toLocaleString()}`],
              ["תוצר", order.deliverable]
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-3 gap-3">
                <dt className="text-on-surface-variant text-sm">{k}</dt>
                <dd className="font-semibold text-primary text-sm text-end">{v}</dd>
              </div>
            ))}
            <div className="flex justify-between py-3 gap-3 items-center">
              <dt className="text-on-surface-variant text-sm">סטטוס</dt>
              <dd><span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${STATUS_CLS[order.status]}`}>{order.statusLabel}</span></dd>
            </div>
          </dl>
        </section>

        <aside className="bg-white rounded-3xl border border-outline-variant/50 p-6 h-fit space-y-3">
          <h2 className="text-base font-bold text-primary mb-2">פעולות</h2>

          {/* Invoice is always available */}
          <button
            type="button"
            onClick={downloadInvoice}
            className="shine btn-lux-ghost w-full py-3 rounded-full text-sm flex items-center justify-center gap-2"
            data-tooltip="הפקת חשבונית/קבלה כ-PDF עבור הזמנה זו — פרטי העסקה, סכום ומספר הזמנה."
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">receipt</span>
            הורדת חשבונית
          </button>

          {/* Deliverable only for products that have one, and only once ready */}
          {order.hasDeliverable ? (
            order.status === "completed" ? (
              <button
                type="button"
                onClick={downloadDeliverable}
                className="shine btn-lux-primary w-full py-3 rounded-full text-sm flex items-center justify-center gap-2"
                data-tooltip="הורדת קובץ התוצר של ההזמנה (מפה/שכבה/תצלום). בפרודקשן — הקובץ הגאוגרפי מארכיון המרכז למיפוי ישראל."
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">download</span>
                הורדת תוצר
              </button>
            ) : (
              <div className="text-center text-xs text-on-surface-variant bg-surface-container rounded-xl px-3 py-2.5"
                data-tooltip="התוצר יהיה זמין להורדה עם השלמת ההזמנה.">
                התוצר יהיה זמין להורדה עם השלמת ההזמנה ({order.statusLabel})
              </div>
            )
          ) : (
            <div className="text-center text-xs text-on-surface-variant bg-surface-container rounded-xl px-3 py-2.5"
              data-tooltip="שירות זה (מנוי / תשלום אגרה) אינו כולל קובץ תוצר להורדה — חשבונית בלבד.">
              שירות זה אינו כולל תוצר להורדה — חשבונית בלבד
            </div>
          )}

          <Link
            href={`/catalog/${order.slug}`}
            className="shine block text-center text-sm text-secondary font-semibold hover:underline pt-2"
            data-tooltip="מעבר לעמוד המוצר בקטלוג — לפרטים או להזמנה חוזרת."
          >
            לעמוד המוצר בקטלוג ←
          </Link>
        </aside>
      </div>
    </div>
  );
}

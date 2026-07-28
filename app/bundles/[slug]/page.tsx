"use client";

// Pre-defined product-package detail + order page.
// A package is a FIXED set of real catalog products at a package price. It is
// ordered through the standard quote / sales-request flow — there is NO polygon
// marking here (that belongs only to the custom-map track, מסלול 8).

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useMemo, useState } from "react";
import { getBundle, bundleText } from "@/lib/bundles";
import { services, getServiceName } from "@/lib/data";
import { openQuoteDoc } from "@/lib/quoteDoc";
import { useLanguage } from "@/lib/LanguageContext";
import RequestFormModal from "@/components/RequestFormModal";

export default function BundleDetailPage() {
  const { t, lang } = useLanguage();
  const params = useParams<{ slug: string }>();
  const bundle = getBundle(params?.slug || "");
  const [reqOpen, setReqOpen] = useState(false);
  const [quoteDone, setQuoteDone] = useState(false);

  const included = useMemo(
    () => (bundle ? bundle.services.map(slug => services.find(s => s.slug === slug)).filter(Boolean) : []),
    [bundle]
  );

  if (!bundle) notFound();

  const bt = bundleText(bundle, lang);
  const savings = bundle.regularPrice - bundle.bundlePrice;

  const productLines = included.map(
    s => s && `${getServiceName(s.slug, s.name, lang)} — ₪${s.priceFrom.toLocaleString()}`
  ).filter(Boolean) as string[];

  const downloadQuote = () => {
    openQuoteDoc({
      title: "הצעת מחיר — חבילת מוצרים",
      serviceName: bt.name,
      orderId: `PKG-${bundle.slug.toUpperCase()}`,
      total: bundle.bundlePrice,
      date: new Date().toLocaleDateString("he-IL"),
      lines: [
        "חבילה מוגדרת-מראש — סט קבוע של מוצרים:",
        ...productLines,
        `מחיר רגיל (רכישה נפרדת): ₪${bundle.regularPrice.toLocaleString()}`,
        `חיסכון בחבילה: ₪${savings.toLocaleString()} (${bundle.savingsPct}%)`
      ]
    });
    setQuoteDone(true);
    setTimeout(() => setQuoteDone(false), 3500);
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <div className="text-white" style={{ background: `linear-gradient(135deg, ${bundle.colorFrom}, ${bundle.colorTo})` }}>
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-8">
          <nav aria-label="Breadcrumb" className="text-sm text-white/80 mb-4">
            <ol className="flex flex-row-reverse items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-white">{t("common.home")}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/bundles" className="hover:text-white">{t("nav.bundles")}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-bold">{bt.name}</li>
            </ol>
          </nav>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-16 h-16 bg-white/15 border border-white/30 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[36px]" aria-hidden="true">{bundle.icon}</span>
            </div>
            <div>
              <p className="text-white/80 text-xs uppercase tracking-widest">{bt.audience}</p>
              <h1 className="text-2xl md:text-3xl font-extrabold">{bt.name}</h1>
            </div>
            {bundle.isFeatured && (
              <span className="bg-white/95 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                ★ {t("bundles.featured")}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10 grid lg:grid-cols-3 gap-6">
        {/* Left: contents */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-8">
            <p className="text-on-surface-variant leading-relaxed mb-6">{bt.description}</p>

            {/* Pre-defined package note — explicitly no polygon */}
            <div className="flex items-start gap-3 bg-secondary/10 border border-secondary/30 rounded-2xl px-4 py-3 mb-6">
              <span className="material-symbols-outlined text-secondary text-[22px] flex-shrink-0" aria-hidden="true">inventory_2</span>
              <p className="text-sm text-primary">
                <span className="font-bold">חבילה מוגדרת-מראש.</span> זהו סט קבוע של מוצרי מדף — אין צורך בסימון אזור על המפה. סימון פוליגון נדרש רק בהזמנת מפה בהתאמה אישית.
              </p>
            </div>

            <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-gold-dark" aria-hidden="true">list_alt</span>
              המוצרים הכלולים בחבילה ({included.length})
            </h2>
            <ul className="space-y-3" role="list">
              {included.map(s => s && (
                <li key={s.slug}>
                  <Link
                    href={`/catalog/${s.slug}`}
                    className="shine flex items-center gap-3 bg-surface-container/60 hover:bg-secondary/10 border border-outline-variant/40 rounded-2xl p-4 transition-colors"
                    data-tooltip={`מעבר לעמוד המוצר: ${getServiceName(s.slug, s.name, lang)}`}
                  >
                    <div className="w-11 h-11 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined" aria-hidden="true">{s.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-primary text-sm truncate">{getServiceName(s.slug, s.name, lang)}</p>
                      <p className="text-xs text-on-surface-variant">{s.categoryLabel}</p>
                    </div>
                    <span className="text-sm font-semibold text-on-surface-variant" dir="ltr">₪{s.priceFrom.toLocaleString()}</span>
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]" aria-hidden="true">chevron_left</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Right: pricing + order */}
        <aside className="bg-white rounded-3xl border border-outline-variant/50 p-6 h-fit space-y-4 lg:sticky lg:top-[180px]">
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider">{t("bundles.regularPrice")}</span>
              <span className="text-sm text-on-surface-variant line-through" dir="ltr">₪{bundle.regularPrice.toLocaleString()}</span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm text-secondary uppercase tracking-wider font-semibold">{t("bundles.bundlePrice")}</span>
              <span className="text-3xl font-extrabold text-primary" dir="ltr">₪{bundle.bundlePrice.toLocaleString()}</span>
            </div>
            <div className="mt-2 text-center bg-error-red/10 text-error-red text-xs font-bold rounded-full px-3 py-1.5">
              {t("bundles.savings")} ₪{savings.toLocaleString()} · -{bundle.savingsPct}%
            </div>
          </div>

          <div className="border-t border-outline-variant/40 pt-4 space-y-3">
            <button
              type="button"
              onClick={() => setReqOpen(true)}
              className="shine shine-glow btn-lux-primary w-full py-3.5 rounded-full text-sm flex items-center justify-center gap-2"
              data-tooltip="בקשת הצעת מחיר רשמית לחבילה — הפנייה מנותבת לאגף השיווק והמכירות של מפי."
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">request_quote</span>
              בקשת הצעת מחיר לחבילה
            </button>
            <button
              type="button"
              onClick={downloadQuote}
              className="shine btn-lux-ghost w-full py-3 rounded-full text-sm flex items-center justify-center gap-2"
              data-tooltip="הפקת הצעת מחיר לחבילה כ-PDF — פירוט המוצרים, מחיר החבילה והחיסכון."
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">{quoteDone ? "check" : "download"}</span>
              {quoteDone ? "הצעת המחיר הופקה" : "הפקת הצעת מחיר (PDF)"}
            </button>
          </div>

          <p className="text-[11px] text-on-surface-variant text-center leading-relaxed">
            מחיר החבילה כולל את כל המוצרים המפורטים. אספקה בהתאם לתנאי כל מוצר בקטלוג.
          </p>
        </aside>
      </div>

      <RequestFormModal
        open={reqOpen}
        onClose={() => setReqOpen(false)}
        subject={`בקשת הצעת מחיר — ${bt.name}`}
        intro={`חבילה מוגדרת-מראש (${included.length} מוצרים) · מחיר חבילה ₪${bundle.bundlePrice.toLocaleString()}`}
        familyLabel="חבילת מוצרים"
      />
    </div>
  );
}

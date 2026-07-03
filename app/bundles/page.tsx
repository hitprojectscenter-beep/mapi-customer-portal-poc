"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { bundles } from "@/lib/bundles";
import { services, getServiceName } from "@/lib/data";

export default function BundlesPage() {
  const { t, lang } = useLanguage();
  const [showFeatured, setShowFeatured] = useState<"all" | "featured">("all");

  const displayed = useMemo(() => {
    return showFeatured === "featured" ? bundles.filter(b => b.isFeatured) : bundles;
  }, [showFeatured]);

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-l from-primary via-tertiary to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-5" aria-hidden="true" />
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10 md:py-14 relative">
          <nav aria-label="Breadcrumb" className="text-xs text-white/70 mb-3">
            <ol className="flex flex-row-reverse items-center gap-2">
              <li><Link href="/" className="hover:text-white">{t("common.home")}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold">{t("nav.bundles")}</li>
            </ol>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold mb-3">{t("bundles.title")}</h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl font-light">{t("bundles.subtitle")}</p>
        </div>
      </section>

      {/* Filter toolbar */}
      <div className="bg-white border-b border-outline-variant/50 sticky top-[168px] z-30">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-3 flex items-center justify-between flex-wrap gap-3">
          <div className="text-sm text-on-surface-variant">
            <span className="font-semibold text-primary">{displayed.length}</span> {t("plp.results")}
          </div>
          <div className="inline-flex bg-surface-container rounded-full p-1">
            <button
              type="button"
              onClick={() => setShowFeatured("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                showFeatured === "all" ? "bg-primary text-white" : "text-primary hover:bg-white"
              }`}
            >
              {t("bundles.allBundles")}
            </button>
            <button
              type="button"
              onClick={() => setShowFeatured("featured")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                showFeatured === "featured" ? "bg-primary text-white" : "text-primary hover:bg-white"
              }`}
            >
              ★ {t("bundles.featured")}
            </button>
          </div>
        </div>
      </div>

      {/* Bundle cards */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-8 md:py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map(bundle => {
            const includedServices = bundle.services
              .map(slug => services.find(s => s.slug === slug))
              .filter(Boolean)
              .slice(0, 4);

            return (
              <article
                key={bundle.id}
                className="group relative bg-white rounded-2xl border border-outline-variant/40 hover:border-secondary/50 hover:shadow-2xl transition-all overflow-hidden flex flex-col"
              >
                {/* Regional gradient header */}
                <div
                  className="relative h-32 flex items-end p-5"
                  style={{ background: `linear-gradient(135deg, ${bundle.colorFrom}, ${bundle.colorTo})` }}
                >
                  <span className="absolute top-3 end-3 bg-white/95 backdrop-blur-sm text-error-red text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    -{bundle.savingsPct}% {t("bundles.savings")}
                  </span>
                  {bundle.isFeatured && (
                    <span className="absolute top-3 start-3 bg-alert-yellow text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                      ★ {t("bundles.featured")}
                    </span>
                  )}
                  <div className="text-white">
                    <span className="material-symbols-outlined text-[36px] mb-1 opacity-80">{bundle.regionIcon}</span>
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-white/80">{bundle.region}</p>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-primary mb-2">{t(bundle.nameKey)}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4 font-light flex-1">
                    {t(bundle.descriptionKey)}
                  </p>

                  {/* Included services */}
                  <div className="mb-4">
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-secondary/80 mb-2">
                      {t("bundles.included")} ({bundle.mapCount})
                    </p>
                    <ul className="space-y-1.5" role="list">
                      {includedServices.map(s => s && (
                        <li key={s.slug} className="flex items-center gap-2 text-xs">
                          <span className="material-symbols-outlined text-secondary text-[16px] flex-shrink-0">{s.icon}</span>
                          <span className="text-on-surface truncate">{getServiceName(s.slug, s.name, lang)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="mb-4 pt-4 border-t border-outline-variant/40">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">{t("bundles.regularPrice")}</span>
                      <span className="text-sm text-on-surface-variant line-through" dir="ltr">₪{bundle.regularPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs text-secondary uppercase tracking-wider font-semibold">{t("bundles.bundlePrice")}</span>
                      <span className="text-2xl font-bold text-primary" dir="ltr">₪{bundle.bundlePrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link
                    href={`/order/custom-map?bundle=${bundle.slug}`}
                    className="shine shine-glow block w-full bg-primary hover:bg-secondary text-white text-center py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    <span>{t("bundles.buyBundle")}</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/WishlistContext";
import { useLanguage } from "@/lib/LanguageContext";
import { services } from "@/lib/data";
import ServiceCard from "@/components/ServiceCard";

export default function WishlistPage() {
  const { t } = useLanguage();
  const wish = useWishlist();

  const wishedServices = services.filter(s => wish.has(s.slug));

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-gradient-to-l from-primary to-tertiary text-white">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
          <nav aria-label={t("nav.skipToContent")} className="text-sm text-white/70 mb-3">
            <ol className="flex flex-row-reverse items-center gap-2">
              <li><Link href="/" className="hover:text-white">{t("common.home")}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold">{t("wish.title")}</li>
            </ol>
          </nav>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <span className="material-symbols-outlined text-[36px]">favorite</span>
              <span>{t("wish.title")}</span>
              {wish.count > 0 && (
                <span className="text-white/70 text-lg font-light">({wish.count})</span>
              )}
            </h1>
            {wish.count > 0 && (
              <button
                type="button"
                onClick={wish.clear}
                className="shine bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
                <span>{t("wish.removeAll")}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
        {wishedServices.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-outline-variant/50">
            <div className="w-32 h-32 bg-error-red/5 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="material-symbols-outlined text-[72px] text-error-red/60">favorite</span>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">{t("wish.empty")}</h2>
            <p className="text-on-surface-variant mb-8 font-light">{t("wish.emptySub")}</p>
            <Link
              href="/catalog"
              className="shine shine-glow inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-secondary transition-colors"
            >
              <span className="material-symbols-outlined">explore</span>
              {t("cart.empty.browse")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishedServices.map(s => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import type { Service } from "@/lib/data";
import { getServiceName, getServiceShortDescription, getServiceCategoryLabel } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { getRatingSummary } from "@/lib/reviews";
import StarRating from "./StarRating";

interface Props {
  service: Service;
  variant?: "compact" | "default";
}

export default function ServiceCard({ service, variant = "default" }: Props) {
  const { t, lang } = useLanguage();
  const cart = useCart();
  const wish = useWishlist();
  const isExternal = !service.inScope && !!(service.govFormUrl || service.externalUrl);
  const href = isExternal ? (service.govFormUrl || service.externalUrl)! : `/catalog/${service.slug}`;

  const localName = getServiceName(service.slug, service.name, lang);
  const localShort = getServiceShortDescription(service.slug, service.shortDescription, lang);
  const localCategory = getServiceCategoryLabel(service.slug, service.categoryLabel, lang);
  const rating = getRatingSummary(service.slug);
  const isWished = wish.has(service.slug);

  const handleExternalClick = (e: React.MouseEvent) => {
    if (!isExternal) return;
    e.preventDefault();
    const win = window.open(href, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = href;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cart.add(service);
  };

  const handleToggleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wish.toggle(service.slug);
  };

  return (
    <article className="group relative bg-white rounded-xl border border-outline-variant/40 hover:border-secondary/50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Top row: badges + wishlist */}
      <div className="absolute top-3 start-3 z-10 flex flex-col gap-1">
        {isExternal && (
          <span className="bg-alert-yellow/95 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
            <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            govforms
          </span>
        )}
        {rating.average >= 4.5 && (
          <span className="bg-positive-green/95 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-md">
            {t("services.recommended")}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleToggleWish}
        className={`shine absolute top-3 end-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-sm ${
          isWished
            ? "bg-error-red text-white shadow-lg scale-105"
            : "bg-white/90 text-primary hover:bg-white hover:scale-110 shadow-sm"
        }`}
        aria-label={isWished ? t("wish.aria.remove") : t("wish.aria.add")}
        data-tooltip={isWished ? t("wish.aria.remove") : t("wish.aria.add")}
        data-tooltip-position="bottom"
      >
        <span
          className="material-symbols-outlined text-[20px]"
          style={{ fontVariationSettings: isWished ? "'FILL' 1" : "'FILL' 0" }}
        >
          favorite
        </span>
      </button>

      {/* Media area - icon + subtle gradient */}
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onClick={isExternal ? handleExternalClick : undefined}
        className="block relative bg-gradient-to-br from-secondary/5 via-white to-primary/5 p-8 aspect-[4/3] flex items-center justify-center group-hover:from-secondary/10 group-hover:to-primary/10 transition-colors"
      >
        <div className="w-20 h-20 bg-white shadow-md rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
          <span className="material-symbols-outlined text-[40px]">{service.icon}</span>
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-secondary/80 mb-1">
          {localCategory}
        </p>
        <Link
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          onClick={isExternal ? handleExternalClick : undefined}
          className="block hover:text-secondary transition-colors mb-1.5"
        >
          <h3 className="text-base font-bold text-primary leading-tight line-clamp-2 min-h-[2.5em]">
            {localName}
          </h3>
        </Link>

        {/* Star rating */}
        {rating.count > 0 && (
          <div className="mb-2">
            <StarRating value={rating.average} size="sm" count={rating.count} />
          </div>
        )}

        <p className="text-xs text-on-surface-variant leading-relaxed mb-3 line-clamp-2 flex-1 font-light">
          {localShort}
        </p>

        {/* Price + CTA row */}
        <div className="mt-auto space-y-2">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-light block">
                {t("service.fromPrice")}
              </span>
              <span className="text-lg font-bold text-primary" dir="ltr">
                {service.priceUnit === "₪/חודש"
                  ? `${service.priceFrom.toLocaleString()} ${service.priceUnit}`
                  : `${service.priceUnit}${service.priceFrom.toLocaleString()}`}
              </span>
            </div>
            {!isExternal && (
              <span className="text-[10px] text-positive-green font-semibold uppercase tracking-wider">
                ● {t("svc.inStock")}
              </span>
            )}
          </div>

          {isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleExternalClick}
              className="shine block w-full bg-alert-yellow/10 hover:bg-alert-yellow hover:text-white text-alert-yellow text-center py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              <span>govforms</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              className="shine shine-glow block w-full btn-lux-primary text-center py-2.5 rounded-full text-sm transition-colors flex items-center justify-center gap-2"
              data-tooltip={`${t("svc.addToCart")} — התשלום מאובטח דרך שרת התשלומים הממשלתי`}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">add_shopping_cart</span>
              <span>{t("svc.addToCart")}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

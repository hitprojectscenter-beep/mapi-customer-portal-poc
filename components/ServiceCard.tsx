"use client";

import Link from "next/link";
import type { Service } from "@/lib/data";
import {
  getServiceName, getServiceShortDescription, getServiceCategoryLabel, getOrderFormUrl
} from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";
import PriceTag from "@/components/PriceTag";
import { useWishlist } from "@/lib/WishlistContext";
import { getRatingSummary } from "@/lib/reviews";
import { hasInPortalOrder } from "@/lib/serviceProcess";
import StarRating from "./StarRating";

interface Props {
  service: Service;
  variant?: "compact" | "default";
}

export default function ServiceCard({ service }: Props) {
  const { t, lang } = useLanguage();
  const wish = useWishlist();

  // Details live on the internal PDP. For services with an in-portal order form
  // (paper maps / boundaries / historic maps) the card orders inside the portal;
  // every other service still links out to the original government form.
  const pdpHref = `/catalog/${service.slug}`;
  const orderUrl = getOrderFormUrl(service);
  const inPortalOrder = hasInPortalOrder(service.slug);

  const localName = getServiceName(service.slug, service.name, lang);
  const localShort = getServiceShortDescription(service.slug, service.shortDescription, lang);
  const localCategory = getServiceCategoryLabel(service.slug, service.categoryLabel, lang);
  const rating = getRatingSummary(service.slug);
  const isWished = wish.has(service.slug);

  const handleToggleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wish.toggle(service.slug);
  };

  return (
    <article className="group relative bg-white rounded-xl border border-outline-variant/40 hover:border-secondary/50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      {rating.average >= 4.5 && (
        <div className="absolute top-3 start-3 z-10">
          <span className="bg-positive-green/95 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-md">
            {t("services.recommended")}
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={handleToggleWish}
        className={`shine absolute top-3 end-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-sm ${
          isWished ? "bg-error-red text-white shadow-lg scale-105" : "bg-white/90 text-primary hover:bg-white hover:scale-110 shadow-sm"
        }`}
        aria-label={isWished ? t("wish.aria.remove") : t("wish.aria.add")}
        data-tooltip={isWished ? t("wish.aria.remove") : t("wish.aria.add")}
        data-tooltip-position="bottom"
      >
        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: isWished ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
      </button>

      {/* Media → internal details page */}
      <Link
        href={pdpHref}
        className="block relative bg-gradient-to-br from-secondary/5 via-white to-primary/5 p-8 aspect-[4/3] flex items-center justify-center group-hover:from-secondary/10 group-hover:to-primary/10 transition-colors"
      >
        <div className="w-20 h-20 bg-white shadow-md rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
          <span className="material-symbols-outlined text-[40px]">{service.icon}</span>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-secondary/80 mb-1">{localCategory}</p>
        <Link href={pdpHref} className="block hover:text-secondary transition-colors mb-1.5">
          <h3 className="text-base font-bold text-primary leading-tight line-clamp-2 min-h-[2.5em]">{localName}</h3>
        </Link>

        {rating.count > 0 && (
          <div className="mb-2"><StarRating value={rating.average} size="sm" count={rating.count} /></div>
        )}

        <p className="text-xs text-on-surface-variant leading-relaxed mb-3 line-clamp-2 flex-1 font-light">{localShort}</p>

        <div className="mt-auto space-y-2">
          <div className="flex items-start justify-between gap-2">
            {service.externalHref ? (
              <span className="text-sm font-semibold text-secondary flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">public</span>שירות מקוון
              </span>
            ) : (
              <PriceTag amount={service.priceFrom} unit={service.priceUnit} size="sm" />
            )}
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider mt-4 flex-shrink-0 ${inPortalOrder ? "text-secondary" : "text-on-surface-variant/70"}`}
              data-tooltip={inPortalOrder ? "הזמנה מקוונת מלאה בתוך הפורטל." : "הזמנה בתוך הפורטל בפיתוח — כרגע ההזמנה מתבצעת בטופס הרשמי."}
              data-tooltip-position="bottom"
            >
              {inPortalOrder ? "הזמנה בפורטל" : "בפורטל · בקרוב"}
            </span>
          </div>

          {/* Primary action: in-portal order form when available, else the
              original government form opened in a NEW TAB. */}
          {inPortalOrder ? (
            <Link
              href={`/order/${service.slug}`}
              className="shine shine-glow block w-full btn-lux-primary text-center py-2.5 rounded-full text-sm transition-colors flex items-center justify-center gap-2"
              data-tooltip="פתיחת טופס ההזמנה המקוון בפורטל."
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">edit_note</span>
              <span>התחל הזמנה</span>
            </Link>
          ) : (
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shine shine-glow block w-full btn-lux-primary text-center py-2.5 rounded-full text-sm transition-colors flex items-center justify-center gap-2"
              data-tooltip="מעבר לטופס ההזמנה הרשמי — נפתח בלשונית חדשה; הפורטל נשאר פתוח."
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">open_in_new</span>
              <span>מעבר להזמנה</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

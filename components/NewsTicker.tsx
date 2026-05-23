"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { TKey } from "@/lib/i18n";

type BadgeKey = "news.badge.new" | "news.badge.promo" | "news.badge.update" | "news.badge.alert";

interface NewsItem {
  id: string;
  type: "promo" | "new" | "update" | "alert";
  icon: string;
  titleKey: TKey;
  href: string;
}

// Add news titles to a dedicated translation key for each item
const NEWS: NewsItem[] = [
  { id: "ortho-20", type: "new", icon: "new_releases", titleKey: "news.item.ortho" as TKey, href: "/catalog/aerial-photos" },
  { id: "elev-models", type: "update", icon: "terrain", titleKey: "news.item.elev" as TKey, href: "/catalog?category=orthophoto" },
  { id: "poster-yam", type: "promo", icon: "local_offer", titleKey: "news.item.poster" as TKey, href: "/catalog?category=maps" },
  { id: "topo-50k", type: "update", icon: "map", titleKey: "news.item.topo" as TKey, href: "/catalog?category=maps" },
  { id: "cors-discount", type: "promo", icon: "sensors", titleKey: "news.item.cors" as TKey, href: "/catalog/cors-subscription" },
  { id: "address-pts", type: "new", icon: "pin_drop", titleKey: "news.item.address" as TKey, href: "/catalog?category=gis" },
  { id: "color-aerial", type: "update", icon: "photo_camera", titleKey: "news.item.color" as TKey, href: "/catalog/aerial-photos" },
  { id: "ind-map", type: "promo", icon: "edit_location", titleKey: "news.item.custom" as TKey, href: "/catalog/custom-map" }
];

// News titles dictionary inlined here (separate from generic i18n)
const NEWS_TITLES: Record<string, Record<string, string>> = {
  "news.item.ortho": {
    he: 'אורתופוטו ברזולוציה 20 ס"מ דיוק חסר תקדים...',
    en: 'Orthophoto 20cm pixel unprecedented accuracy now...',
    fr: 'Orthophoto 20cm pixel précision sans précédent...',
    es: 'Ortofoto 20cm píxel precisión sin precedentes...',
    ru: 'Ортофото 20см пиксель беспрецедентная точность...',
    ar: 'صور جوية 20 سم لكل بكسل دقة...'
  },
  "news.item.elev": {
    he: 'מודלי גובה DSM ו-DTM 50 ס"מ עודכנו...',
    en: 'DSM and DTM elevation models 50cm updated...',
    fr: 'Modèles élévation DSM et DTM 50cm MAJ...',
    es: 'Modelos elevación DSM y DTM 50cm 2025...',
    ru: 'Модели высот DSM и DTM 50см обновлены...',
    ar: 'نماذج الارتفاع DSM وDTM بدقة 50 سم...'
  },
  "news.item.poster": {
    he: 'פוסטר שולי היבשת הים-תיכוניים במחיר השקה...',
    en: 'Mediterranean continental shelf poster launch price...',
    fr: 'Poster plateau continental méditerranéen prix lancement...',
    es: 'Póster plataforma continental mediterránea precio lanzamiento...',
    ru: 'Постер континентального шельфа Средиземного моря акция...',
    ar: 'ملصق الجرف القاري المتوسطي سعر الإطلاق...'
  },
  "news.item.topo": {
    he: '28 מפות טופוגרפיות 1:50,000 עודכנו 2025...',
    en: '28 topographic maps 1:50,000 updated 2025...',
    fr: '28 cartes topographiques 1:50,000 mises à jour...',
    es: '28 mapas topográficos 1:50,000 actualizados 2025...',
    ru: '28 топокарт 1:50,000 обновлены в 2025...',
    ar: '28 خريطة طبوغرافية 1:50,000 محدثة 2025...'
  },
  "news.item.cors": {
    he: 'מנוי CORS שנתי חיסכון 17% החודש...',
    en: 'Annual CORS subscription save 17% this month...',
    fr: 'Abonnement CORS annuel économie 17% maintenant...',
    es: 'Suscripción CORS anual ahorro 17% ahora...',
    ru: 'Годовая подписка CORS экономия 17% сейчас...',
    ar: 'اشتراك CORS سنوي توفير 17% الآن...'
  },
  "news.item.address": {
    he: 'מאגר נקודות כתובת ₪0.25 לכל כתובת...',
    en: 'Address points database ₪0.25 per address...',
    fr: 'Base de points d\'adresse 0,25₪ chacun...',
    es: 'Base de puntos de dirección 0,25₪ cada...',
    ru: 'База точек адресов 0,25₪ за каждый...',
    ar: 'قاعدة بيانات نقاط العنوان 0.25 ₪ لكل...'
  },
  "news.item.color": {
    he: 'תצלומי אוויר צבעוניים מ-2017 זמינים עכשיו...',
    en: 'Color aerial photos from 2017 available now...',
    fr: 'Photos aériennes couleur depuis 2017 disponibles...',
    es: 'Fotos aéreas color desde 2017 disponibles ahora...',
    ru: 'Цветные аэрофото с 2017 года доступны...',
    ar: 'صور جوية ملونة من 2017 متاحة الآن...'
  },
  "news.item.custom": {
    he: 'מפה אישית A4 החל מ-₪160 בלבד...',
    en: 'Custom A4 map from ₪160 only...',
    fr: 'Carte personnalisée A4 dès 160₪ seulement...',
    es: 'Mapa personalizado A4 desde 160₪ solamente...',
    ru: 'Персональная карта A4 от 160₪ всего...',
    ar: 'خريطة مخصصة A4 من 160 ₪ فقط...'
  }
};

const BADGE_BY_TYPE: Record<NewsItem["type"], BadgeKey> = {
  promo: "news.badge.promo",
  new: "news.badge.new",
  update: "news.badge.update",
  alert: "news.badge.alert"
};

const TYPE_STYLES: Record<NewsItem["type"], { bg: string; text: string; ring: string }> = {
  promo: { bg: "bg-alert-yellow", text: "text-white", ring: "ring-alert-yellow/40" },
  new: { bg: "bg-positive-green", text: "text-white", ring: "ring-positive-green/40" },
  update: { bg: "bg-secondary-container", text: "text-primary", ring: "ring-secondary-container/40" },
  alert: { bg: "bg-error-red", text: "text-white", ring: "ring-error-red/40" }
};

export default function NewsTicker() {
  const { t, lang } = useLanguage();
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (hidden) return null;

  const looped = [...NEWS, ...NEWS];
  const getTitle = (key: string) => NEWS_TITLES[key]?.[lang] || NEWS_TITLES[key]?.he || key;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[110] bg-gradient-to-l from-secondary via-primary to-secondary text-white border-b border-secondary-container/30 shadow-lg"
      role="region"
      aria-label={t("news.label")}
    >
      <div className="max-w-container-max-width mx-auto px-3 md:px-margin-desktop">
        <div className="flex items-center justify-center gap-2 sm:gap-4 h-10 sm:h-11">
          {/* Label */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2.5 sm:px-3 py-1 border border-white/20">
              <span className="material-symbols-outlined text-secondary-container text-[14px] sm:text-[16px] animate-pulse">
                campaign
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest">
                {t("news.label")}
              </span>
            </span>
          </div>

          {/* Marquee */}
          <div
            className="flex-1 overflow-hidden relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" aria-hidden="true" />
            <div
              className="flex items-center whitespace-nowrap gap-3 sm:gap-6"
              style={{
                animation: reducedMotion ? "none" : "marquee-news 70s linear infinite",
                animationPlayState: paused ? "paused" : "running"
              }}
            >
              {looped.map((item, idx) => {
                const style = TYPE_STYLES[item.type];
                return (
                  <Link
                    key={`${item.id}-${idx}`}
                    href={item.href}
                    className="shine flex items-center gap-2 sm:gap-2.5 py-1 px-1 rounded-full hover:bg-white/10 transition-colors"
                    data-tooltip={t("news.cta")}
                    data-tooltip-position="bottom"
                  >
                    <span className="material-symbols-outlined text-secondary-container text-[16px] sm:text-[18px] flex-shrink-0">
                      {item.icon}
                    </span>
                    <span
                      className={`${style.bg} ${style.text} px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold leading-tight ring-2 ${style.ring} flex-shrink-0`}
                    >
                      {getTitle(item.titleKey)}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-secondary-container hover:text-white transition-colors flex items-center gap-0.5">
                      {t("news.cta")}
                      <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={() => setHidden(true)}
            className="shine flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label={t("news.hide")}
            data-tooltip={t("news.hide")}
            data-tooltip-position="bottom"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">close</span>
          </button>
        </div>
      </div>
    </div>
  );
}

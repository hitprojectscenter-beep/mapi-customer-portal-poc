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
    he: 'חדש! אורתופוטו ברזולוציה 20 ס"מ לפיקסל - דיוק חסר תקדים',
    en: 'NEW! Orthophoto at 20cm/pixel resolution - unprecedented accuracy',
    fr: 'NOUVEAU! Orthophoto 20cm/pixel - précision sans précédent',
    es: '¡NUEVO! Ortofoto 20cm/píxel - precisión sin precedentes',
    ru: 'НОВОЕ! Ортофото 20см/пиксель - беспрецедентная точность',
    ar: 'جديد! صور جوية بدقة 20 سم/بكسل'
  },
  "news.item.elev": {
    he: 'מודלי גובה DSM/DTM ברזולוציה 50 ס"מ - עדכון 2025',
    en: 'DSM/DTM elevation models at 50cm resolution - 2025 update',
    fr: 'Modèles d\'élévation DSM/DTM 50cm - MAJ 2025',
    es: 'Modelos de elevación DSM/DTM a 50cm - actualización 2025',
    ru: 'Модели высот DSM/DTM 50см - обновление 2025',
    ar: 'نماذج الارتفاع DSM/DTM بدقة 50 سم - تحديث 2025'
  },
  "news.item.poster": {
    he: 'פוסטר שולי היבשת הים-תיכוניים - מבצע השקה ₪350',
    en: 'Mediterranean continental shelf poster - launch promo ₪350',
    fr: 'Poster plateau continental méditerranéen - 350₪',
    es: 'Póster plataforma continental - 350₪',
    ru: 'Постер континентального шельфа - 350₪',
    ar: 'ملصق الجرف القاري المتوسطي - 350 ₪'
  },
  "news.item.topo": {
    he: 'סדרת מפות טופוגרפיות 1:50,000 - 28 מפות עודכנו 2025',
    en: 'Topo maps 1:50,000 - 28 maps updated for 2025',
    fr: 'Cartes topo 1:50,000 - 28 mises à jour 2025',
    es: 'Mapas topográficos 1:50,000 - 28 actualizados 2025',
    ru: 'Топокарты 1:50,000 - 28 обновлены в 2025',
    ar: 'خرائط طبوغرافية 1:50,000 - 28 خريطة محدثة 2025'
  },
  "news.item.cors": {
    he: 'מנוי CORS שנתי - חיסכון 17% על מחיר חודשי',
    en: 'Annual CORS subscription - save 17% vs monthly',
    fr: 'Abonnement CORS annuel - 17% de réduction',
    es: 'Suscripción CORS anual - ahorro 17%',
    ru: 'Годовой CORS - скидка 17%',
    ar: 'اشتراك CORS سنوي - وفر 17%'
  },
  "news.item.address": {
    he: 'מאגר נקודות כתובת מורחב - ₪0.25 לכתובת בודדת',
    en: 'Extended address points database - ₪0.25 per address',
    fr: 'Base de points d\'adresse - 0,25₪ par adresse',
    es: 'Base de puntos de dirección - 0,25₪/dirección',
    ru: 'База точек адресов - 0,25₪ за адрес',
    ar: 'قاعدة بيانات نقاط العنوان - 0.25 ₪/عنوان'
  },
  "news.item.color": {
    he: 'תצלומי אוויר צבעוניים משנת 2017 ועד היום זמינים',
    en: 'Color aerial photos from 2017 onwards now available',
    fr: 'Photos aériennes couleur depuis 2017 disponibles',
    es: 'Fotos aéreas a color desde 2017 disponibles',
    ru: 'Цветные аэрофото с 2017 года доступны',
    ar: 'صور جوية ملونة من 2017 حتى اليوم'
  },
  "news.item.custom": {
    he: 'מפה בהתאמה אישית A4 - החל מ-₪160 בלבד',
    en: 'Custom A4 map - from ₪160 only',
    fr: 'Carte personnalisée A4 - dès 160₪',
    es: 'Mapa personalizado A4 - desde 160₪',
    ru: 'Персональная карта A4 - от 160₪',
    ar: 'خريطة مخصصة A4 - ابتداء من 160 ₪'
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
                const badgeKey = BADGE_BY_TYPE[item.type];
                return (
                  <Link
                    key={`${item.id}-${idx}`}
                    href={item.href}
                    className="shine flex items-center gap-2 sm:gap-2.5 py-1 px-1 rounded-full hover:bg-white/10 transition-colors"
                    data-tooltip={t("news.cta")}
                    data-tooltip-position="bottom"
                  >
                    <span className={`${style.bg} ${style.text} px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider ring-2 ${style.ring} flex-shrink-0`}>
                      {t(badgeKey)}
                    </span>
                    <span className="material-symbols-outlined text-secondary-container text-[16px] sm:text-[18px] flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="text-[11px] sm:text-xs font-medium leading-tight">
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

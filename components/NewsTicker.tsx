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
    he: 'השקנו אורתופוטו חדש בדיוק של 20 ס"מ...',
    en: 'We launched orthophoto at unprecedented 20cm accuracy...',
    fr: 'Nouvelle orthophoto disponible avec précision 20cm...',
    es: 'Lanzamos ortofoto con precisión de 20cm...',
    ru: 'Запущено ортофото с точностью 20см на пиксель...',
    ar: 'أطلقنا صورة جوية بدقة 20 سم رائدة...'
  },
  "news.item.elev": {
    he: 'מודלי הגובה DSM ו-DTM שודרגו לאחרונה...',
    en: 'Our DSM and DTM elevation models were upgraded...',
    fr: 'Nos modèles d\'élévation DSM et DTM mis à jour...',
    es: 'Modelos de elevación DSM y DTM actualizados...',
    ru: 'Модели высот DSM и DTM недавно обновлены...',
    ar: 'تم تحديث نماذج الارتفاع DSM وDTM...'
  },
  "news.item.poster": {
    he: 'פוסטר חדש על שולי היבשת הים-תיכוניים...',
    en: 'New poster of the Mediterranean continental shelf...',
    fr: 'Nouveau poster du plateau continental méditerranéen...',
    es: 'Nuevo póster de la plataforma continental mediterránea...',
    ru: 'Новый постер континентального шельфа Средиземного моря...',
    ar: 'ملصق جديد للجرف القاري المتوسطي...'
  },
  "news.item.topo": {
    he: 'סדרת המפות הטופוגרפיות 1:50,000 שודרגה השנה...',
    en: 'The topographic 1:50,000 series was updated...',
    fr: 'La série topographique 1:50,000 a été mise à jour...',
    es: 'La serie topográfica 1:50,000 fue actualizada...',
    ru: 'Серия топокарт 1:50,000 обновлена в этом году...',
    ar: 'تم تحديث سلسلة الخرائط الطبوغرافية 1:50,000...'
  },
  "news.item.cors": {
    he: 'במנוי CORS שנתי תחסכו 17% מהעלות...',
    en: 'Save 17% by switching to annual CORS subscription...',
    fr: 'Économisez 17% avec un abonnement CORS annuel...',
    es: 'Ahorra 17% con suscripción CORS anual...',
    ru: 'Экономьте 17% с годовой подпиской CORS...',
    ar: 'وفر 17% مع اشتراك CORS السنوي...'
  },
  "news.item.address": {
    he: 'כעת ניתן להזמין נקודות כתובת ב-₪0.25 לכתובת...',
    en: 'Order individual address points for just ₪0.25 each...',
    fr: 'Commandez des points d\'adresse à 0,25₪ chacun...',
    es: 'Solicita puntos de dirección a ₪0,25 cada uno...',
    ru: 'Заказывайте точки адресов по ₪0,25 за штуку...',
    ar: 'اطلب نقاط عنوان فردية بـ 0.25 ₪ فقط...'
  },
  "news.item.color": {
    he: 'תצלומי אוויר צבעוניים משנת 2017 פתוחים להזמנה...',
    en: 'Color aerial photos since 2017 now open for ordering...',
    fr: 'Photos aériennes couleur depuis 2017 prêtes à commander...',
    es: 'Fotos aéreas a color desde 2017 listas para pedir...',
    ru: 'Цветные аэрофото с 2017 года доступны для заказа...',
    ar: 'صور جوية ملونة منذ 2017 جاهزة للطلب...'
  },
  "news.item.custom": {
    he: 'הזמינו מפה אישית בגודל A4 רק ב-₪160...',
    en: 'Order a custom A4 map for only ₪160...',
    fr: 'Commandez une carte personnalisée A4 pour 160₪...',
    es: 'Pide un mapa personalizado A4 por solo ₪160...',
    ru: 'Закажите персональную карту A4 всего за ₪160...',
    ar: 'اطلب خريطة مخصصة A4 بـ 160 ₪ فقط...'
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

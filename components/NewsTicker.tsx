"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { TKey } from "@/lib/i18n";

interface NewsItem {
  id: string;
  type: "promo" | "new" | "update" | "alert";
  icon: string;
  titleKey: TKey;
  href: string;
}

// 4 news items - one of each type. Each sentence ≤ 7 words + "..."
const NEWS: NewsItem[] = [
  { id: "ortho-20", type: "new", icon: "new_releases", titleKey: "news.item.ortho" as TKey, href: "/catalog/aerial-photos" },
  { id: "elev-models", type: "update", icon: "terrain", titleKey: "news.item.elev" as TKey, href: "/catalog?category=orthophoto" },
  { id: "custom-map", type: "promo", icon: "local_offer", titleKey: "news.item.custom" as TKey, href: "/catalog/custom-map" },
  { id: "support-hours", type: "alert", icon: "schedule", titleKey: "news.item.hours" as TKey, href: "/help" }
];

// News titles dictionary - each sentence ≤ 7 words + "..."
const NEWS_TITLES: Record<string, Record<string, string>> = {
  "news.item.ortho": {
    he: 'השקנו אורתופוטו חדש בדיוק 20 ס"מ...',
    en: 'Launched new orthophoto at 20cm precision...',
    fr: 'Nouvelle orthophoto avec précision 20cm...',
    es: 'Nueva ortofoto con precisión de 20cm...',
    ru: 'Запустили ортофото с точностью 20 см...',
    ar: 'أطلقنا صورة جوية جديدة بدقة 20 سم...'
  },
  "news.item.elev": {
    he: 'מודלי הגובה DSM ו-DTM שודרגו לאחרונה...',
    en: 'DSM and DTM elevation models recently upgraded...',
    fr: 'Modèles d\'élévation DSM et DTM mis à jour...',
    es: 'Modelos DSM y DTM recientemente actualizados...',
    ru: 'Модели высот DSM и DTM обновлены...',
    ar: 'تم تحديث نماذج الارتفاع DSM وDTM...'
  },
  "news.item.custom": {
    he: 'הזמינו מפה אישית A4 רק ב-₪160...',
    en: 'Custom A4 map for only ₪160...',
    fr: 'Carte personnalisée A4 pour seulement 160₪...',
    es: 'Mapa personalizado A4 por solo ₪160...',
    ru: 'Персональная карта A4 всего за ₪160...',
    ar: 'خريطة مخصصة A4 بـ 160 ₪ فقط...'
  },
  "news.item.hours": {
    he: 'החל מיוני: שעות פעילות חדשות במוקד...',
    en: 'Starting June: new support center hours...',
    fr: 'Dès juin : nouveaux horaires du centre...',
    es: 'Desde junio: nuevos horarios de atención...',
    ru: 'С июня: новые часы работы поддержки...',
    ar: 'اعتباراً من يونيو: ساعات دعم جديدة...'
  }
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

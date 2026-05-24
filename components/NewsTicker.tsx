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
  time: string;
}

// 4 news items - one of each type, with a timestamp per item
const NEWS: NewsItem[] = [
  {
    id: "support-hours",
    type: "alert",
    icon: "schedule",
    titleKey: "news.item.hours" as TKey,
    href: "/help",
    time: "11:56"
  },
  {
    id: "custom-map",
    type: "promo",
    icon: "local_offer",
    titleKey: "news.item.custom" as TKey,
    href: "/catalog/custom-map",
    time: "10:50"
  },
  {
    id: "elev-models",
    type: "update",
    icon: "terrain",
    titleKey: "news.item.elev" as TKey,
    href: "/catalog?category=orthophoto",
    time: "10:41"
  },
  {
    id: "ortho-20",
    type: "new",
    icon: "new_releases",
    titleKey: "news.item.ortho" as TKey,
    href: "/catalog/aerial-photos",
    time: "10:34"
  }
];

// News titles - each sentence ≤ 7 words + "..."
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

// Type colors - kept from previous design (dot + accent)
const TYPE_COLORS: Record<NewsItem["type"], { dot: string; ring: string }> = {
  promo: { dot: "bg-alert-yellow", ring: "ring-alert-yellow/30" },
  new: { dot: "bg-positive-green", ring: "ring-positive-green/30" },
  update: { dot: "bg-secondary", ring: "ring-secondary/30" },
  alert: { dot: "bg-error-red", ring: "ring-error-red/30" }
};

export default function NewsTicker() {
  const { t, lang } = useLanguage();
  const [hidden, setHidden] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Mobile carousel: auto-rotate every 5s, paused on hover/focus
  useEffect(() => {
    if (reducedMotion || paused) return;
    const interval = setInterval(() => {
      setMobileIndex((i) => (i + 1) % NEWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reducedMotion, paused]);

  if (hidden) return null;

  const getTitle = (key: string) => NEWS_TITLES[key]?.[lang] || NEWS_TITLES[key]?.he || key;

  const prevItem = () => setMobileIndex((i) => (i - 1 + NEWS.length) % NEWS.length);
  const nextItem = () => setMobileIndex((i) => (i + 1) % NEWS.length);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[110] bg-white border-b border-outline-variant shadow-sm"
      role="region"
      aria-label={t("news.label")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-container-max-width mx-auto">
        <div className="flex items-stretch h-14 sm:h-16">
          {/* Right side: news label (RTL: appears on the right) */}
          <div className="hidden md:flex items-center px-3 lg:px-4 border-l border-outline-variant flex-shrink-0">
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px] animate-pulse">
                campaign
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
                {t("news.label")}
              </span>
            </span>
          </div>

          {/* News cards — desktop: 4 visible side-by-side */}
          <div className="hidden md:flex flex-1 items-stretch min-w-0">
            {NEWS.map((item) => {
              const colors = TYPE_COLORS[item.type];
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="shine flex-1 min-w-0 border-l border-outline-variant px-3 py-2 flex flex-col hover:bg-surface-container/50 transition-colors group"
                  data-tooltip={t("news.cta")}
                  data-tooltip-position="bottom"
                >
                  <div className="flex items-start gap-2 flex-1">
                    <span
                      className={`w-2 h-2 rounded-full ${colors.dot} flex-shrink-0 mt-1.5 ring-2 ${colors.ring}`}
                      aria-hidden="true"
                    />
                    <p className="text-[12px] lg:text-[13px] text-primary leading-snug line-clamp-2 text-right flex-1 group-hover:text-secondary transition-colors font-medium">
                      {getTitle(item.titleKey)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className="text-[10px] text-on-surface-variant font-mono tabular-nums">
                      {item.time}
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant text-[14px] group-hover:text-secondary transition-colors">
                      expand_more
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* News card — mobile: 1 at a time, auto-rotating */}
          <div
            className="md:hidden flex-1 flex items-stretch min-w-0 overflow-hidden"
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {NEWS.map((item, idx) => {
              const colors = TYPE_COLORS[item.type];
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`shine w-full flex-shrink-0 px-3 py-2 flex flex-col hover:bg-surface-container/50 transition-all duration-500 ${
                    idx === mobileIndex ? "opacity-100" : "opacity-0 pointer-events-none -ml-[100%]"
                  }`}
                  aria-hidden={idx !== mobileIndex}
                  tabIndex={idx === mobileIndex ? 0 : -1}
                >
                  <div className="flex items-start gap-2 flex-1">
                    <span
                      className={`w-2 h-2 rounded-full ${colors.dot} flex-shrink-0 mt-1.5 ring-2 ${colors.ring}`}
                      aria-hidden="true"
                    />
                    <p className="text-[12px] text-primary leading-snug line-clamp-2 text-right flex-1 font-medium">
                      {getTitle(item.titleKey)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className="text-[10px] text-on-surface-variant font-mono tabular-nums">
                      {item.time}
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant text-[14px]">
                      expand_more
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Left side: navigation arrows (RTL: appear on the left) + close */}
          <div className="flex items-center px-2 gap-1 border-r border-outline-variant flex-shrink-0">
            {/* Mobile-only navigation (prev/next) */}
            <button
              type="button"
              onClick={prevItem}
              className="shine md:hidden w-7 h-7 rounded-full border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary hover:bg-surface-container flex items-center justify-center transition-colors"
              aria-label="הקודם"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
            <button
              type="button"
              onClick={nextItem}
              className="shine md:hidden w-7 h-7 rounded-full border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary hover:bg-surface-container flex items-center justify-center transition-colors"
              aria-label="הבא"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>

            {/* Mobile dot indicators */}
            <div className="md:hidden flex items-center gap-1 px-1" role="tablist" aria-label="חדשות">
              {NEWS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMobileIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === mobileIndex
                      ? `${TYPE_COLORS[item.type].dot} scale-125`
                      : "bg-outline-variant"
                  }`}
                  aria-label={`חדשה ${idx + 1}`}
                  aria-selected={idx === mobileIndex}
                  role="tab"
                />
              ))}
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setHidden(true)}
              className="shine w-7 h-7 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-error-red transition-colors mr-1"
              aria-label={t("news.hide")}
              data-tooltip={t("news.hide")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

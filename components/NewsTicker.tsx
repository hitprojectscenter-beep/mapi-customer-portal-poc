"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export interface NewsItem {
  id: string;
  type: "promo" | "new" | "update" | "alert";
  icon: string;
  title: string;
  href?: string;
  cta?: string;
  badge?: string;
}

const NEWS: NewsItem[] = [
  {
    id: "ortho-20",
    type: "new",
    icon: "new_releases",
    title: 'חדש! אורתופוטו ברזולוציה של 20 ס"מ לפיקסל - דיוק חסר תקדים',
    href: "/catalog/aerial-photos",
    cta: "פרטים",
    badge: "מוצר חדש"
  },
  {
    id: "elev-models",
    type: "update",
    icon: "terrain",
    title: 'מודלי גבהים DSM ו-DTM ברזולוציה של 50 ס"מ - עדכון 2025',
    href: "/catalog/elevation-data",
    cta: "צפה במחירון",
    badge: "עדכון"
  },
  {
    id: "poster-yam",
    type: "promo",
    icon: "local_offer",
    title: 'פוסטר שולי היבשת הים-תיכוניים - מבצע השקה ₪350',
    href: "/catalog?category=maps",
    cta: "לרכישה",
    badge: "מבצע"
  },
  {
    id: "topo-50k",
    type: "update",
    icon: "map",
    title: 'סדרת מפות טופוגרפיות 1:50,000 - 28 מפות עודכנו עם נתוני 2025',
    href: "/catalog?category=maps",
    cta: "צפה במפות",
    badge: "עדכון"
  },
  {
    id: "cors-discount",
    type: "promo",
    icon: "sensors",
    title: 'מנוי CORS שנתי - חיסכון של 17% על מחיר חודשי',
    href: "/catalog/cors-subscription",
    cta: "חדש מנוי",
    badge: "מבצע"
  },
  {
    id: "address-pts",
    type: "new",
    icon: "pin_drop",
    title: 'מאגר נקודות כתובת מורחב - ₪0.25 לכתובת בודדת',
    href: "/catalog?category=gis",
    cta: "פרטים",
    badge: "חדש"
  },
  {
    id: "color-aerial",
    type: "update",
    icon: "photo_camera",
    title: 'תצלומי אוויר צבעוניים מ-2017 ועד היום זמינים להזמנה',
    href: "/catalog/aerial-photos",
    cta: "הזמן עכשיו",
    badge: "עדכון"
  },
  {
    id: "ind-map",
    type: "promo",
    icon: "edit_location",
    title: 'מפה בהתאמה אישית A4 - החל מ-₪160 בלבד',
    href: "/catalog/custom-map",
    cta: "התחל הזמנה",
    badge: "מבצע"
  }
];

const TYPE_STYLES: Record<NewsItem["type"], { bg: string; text: string; ring: string }> = {
  promo: { bg: "bg-alert-yellow", text: "text-white", ring: "ring-alert-yellow/40" },
  new: { bg: "bg-positive-green", text: "text-white", ring: "ring-positive-green/40" },
  update: { bg: "bg-secondary", text: "text-white", ring: "ring-secondary/40" },
  alert: { bg: "bg-error-red", text: "text-white", ring: "ring-error-red/40" }
};

export default function NewsTicker() {
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

  // Duplicate items for seamless looping
  const looped = [...NEWS, ...NEWS];

  return (
    <div
      className="fixed top-20 left-0 right-0 z-[90] bg-gradient-to-l from-primary via-tertiary to-primary text-white border-b border-white/10 shadow-lg"
      role="region"
      aria-label="חדשות ועדכונים"
    >
      <div className="max-w-container-max-width mx-auto px-3 md:px-margin-desktop">
        <div className="flex flex-row-reverse items-center gap-2 sm:gap-4 h-10 sm:h-11">
          {/* Label */}
          <div className="flex flex-row-reverse items-center gap-2 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2.5 sm:px-3 py-1 border border-white/20">
              <span className="material-symbols-outlined text-secondary-container text-[14px] sm:text-[16px] animate-pulse">
                campaign
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest">
                חדשות
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
            {/* Fade gradients on sides */}
            <div
              className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="flex items-center whitespace-nowrap gap-3 sm:gap-6"
              style={{
                animation: reducedMotion
                  ? "none"
                  : "marquee-news 70s linear infinite",
                animationPlayState: paused ? "paused" : "running"
              }}
            >
              {looped.map((item, idx) => {
                const style = TYPE_STYLES[item.type];
                return (
                  <Link
                    key={`${item.id}-${idx}`}
                    href={item.href || "/catalog"}
                    className="shine flex flex-row-reverse items-center gap-2 sm:gap-2.5 py-1 px-1 rounded-full hover:bg-white/10 transition-colors"
                    data-tooltip={item.cta || "פרטים"}
                    data-tooltip-position="bottom"
                  >
                    {item.badge && (
                      <span
                        className={`${style.bg} ${style.text} px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider ring-2 ${style.ring} flex-shrink-0`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <span className="material-symbols-outlined text-secondary-container text-[16px] sm:text-[18px] flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="text-[11px] sm:text-xs font-medium leading-tight">
                      {item.title}
                    </span>
                    {item.cta && (
                      <span className="text-[10px] sm:text-xs font-bold text-secondary-container hover:text-white transition-colors flex items-center gap-0.5">
                        {item.cta}
                        <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                      </span>
                    )}
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
            aria-label="הסתר שורת חדשות"
            data-tooltip="הסתר שורת חדשות"
            data-tooltip-position="bottom"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">close</span>
          </button>
        </div>
      </div>
    </div>
  );
}

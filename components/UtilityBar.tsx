"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

// Luxury utility strip: ivory, hairline gold bottom border, navy text.
// Fixed between the news ticker and the header (visible from sm up —
// on phones the header follows the ticker directly).
export default function UtilityBar() {
  const { t } = useLanguage();
  return (
    <div className="hidden sm:block utility-fixed bg-ivory text-primary text-xs border-b border-gold/25">
      <div className="max-w-container-max-width mx-auto px-3 sm:px-4 md:px-margin-desktop h-8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px] text-gold-dark" aria-hidden="true">verified</span>
            <span>{t("trust.national")}</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px] text-gold-dark" aria-hidden="true">shield</span>
            <span>{t("trust.security")}</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/orders"
            className="hover:text-gold-dark transition-colors flex items-center gap-1"
            data-tooltip={`${t("utility.trackOrder")} — מעקב סטטוס, משלוחים והיסטוריה`}
            data-tooltip-position="bottom"
          >
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">local_shipping</span>
            <span className="hidden sm:inline">{t("utility.trackOrder")}</span>
          </Link>
          <Link
            href="/help"
            className="hover:text-gold-dark transition-colors flex items-center gap-1"
            data-tooltip={`${t("utility.help")} — שאלות נפוצות, מדריכים ופתיחת פנייה`}
            data-tooltip-position="bottom"
          >
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">help</span>
            <span className="hidden sm:inline">{t("utility.help")}</span>
          </Link>
          <Link
            href="/cms/login"
            className="hover:text-gold-dark transition-colors flex items-center gap-1"
            data-tooltip="כניסת מנהלי תוכן מורשים — ניהול חדשות, קמפיינים ומשתמשים"
            data-tooltip-position="bottom"
          >
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">edit_note</span>
            <span className="hidden sm:inline">ניהול תוכן</span>
          </Link>
          <a
            href="tel:*6274"
            className="hover:text-gold-dark transition-colors flex items-center gap-1"
            data-tooltip="חיוג למוקד השירות *6274 — ימים א'-ה' 8:00-16:00"
            data-tooltip-position="bottom"
          >
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">phone</span>
            <span className="hidden sm:inline">*6274</span>
          </a>
        </div>
      </div>
    </div>
  );
}

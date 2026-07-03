"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function UtilityBar() {
  const { t } = useLanguage();
  return (
    <div className="bg-primary text-white text-xs border-b border-white/10">
      <div className="max-w-container-max-width mx-auto px-3 sm:px-4 md:px-margin-desktop h-8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-white/80">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>{t("trust.national")}</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-white/80">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            <span>{t("trust.security")}</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/orders" className="hover:text-secondary-container transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">local_shipping</span>
            <span className="hidden sm:inline">{t("utility.trackOrder")}</span>
          </Link>
          <Link href="/help" className="hover:text-secondary-container transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">help</span>
            <span className="hidden sm:inline">{t("utility.help")}</span>
          </Link>
          <a href="tel:*6274" className="hover:text-secondary-container transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">phone</span>
            <span className="hidden sm:inline">*6274</span>
          </a>
        </div>
      </div>
    </div>
  );
}

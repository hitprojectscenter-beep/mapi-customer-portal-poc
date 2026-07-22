"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";

export default function ScrollHintBubble() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Fade to lower opacity after user scrolls (user has "seen" the hint) but stay visible
    const onScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Storefront affordance only — keep back-office screens clean (and their
  // bottom action buttons clickable on small viewports)
  if (pathname.startsWith("/cms") || pathname.startsWith("/admin")) return null;
  if (dismissed) return null;

  const handleClick = () => {
    window.scrollTo({ top: window.scrollY + window.innerHeight * 0.8, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ bottom: "calc(1.5rem + var(--safe-bottom))" }}
      aria-label={t("scrollHint.aria")}
      className={`fixed left-[calc(50%+2.25rem)] sm:left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white border border-gold/40 text-primary px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:bg-gold-tint transition-all duration-300 shine group ${
        scrolled ? "opacity-70 hover:opacity-100" : "opacity-100"
      }`}
    >
      <span className="material-symbols-outlined text-gold-dark text-[20px] animate-bounce" aria-hidden="true">
        keyboard_arrow_down
      </span>
      <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
        {t("scrollHint.label")}
      </span>
      <span
        onClick={(e) => {
          e.stopPropagation();
          setDismissed(true);
        }}
        role="button"
        tabIndex={0}
        aria-label={t("common.close")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
            setDismissed(true);
          }
        }}
        className="ms-1 -me-1 w-6 h-6 rounded-full hover:bg-error-red/10 hover:text-error-red flex items-center justify-center transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-[14px]">close</span>
      </span>
    </button>
  );
}

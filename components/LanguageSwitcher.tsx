"use client";

import { useEffect, useRef, useState } from "react";
import { LANGUAGES, Lang } from "@/lib/i18n";
import { useLanguage } from "@/lib/LanguageContext";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (code: Lang) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="shine flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm font-bold text-primary hover:bg-surface-container transition-colors min-h-[40px]"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language / שינוי שפה"
        data-tooltip="Change language - שינוי שפה"
        data-tooltip-position="bottom"
      >
        <span className="text-base sm:text-lg leading-none" aria-hidden="true">
          {current.flag}
        </span>
        {!compact && (
          <span className="hidden sm:inline text-xs uppercase font-extrabold tracking-wider">
            {current.code}
          </span>
        )}
        <span className="material-symbols-outlined text-[16px] sm:text-[18px]" aria-hidden="true">
          {open ? "expand_less" : "expand_more"}
        </span>
      </button>

      {open && (
        <ul
          className="absolute top-full mt-2 left-0 right-auto rtl:right-0 rtl:left-auto bg-white border border-outline-variant rounded-2xl shadow-2xl py-2 min-w-[180px] z-[200] animate-fade-in"
          role="listbox"
          aria-label="Languages"
        >
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                onClick={() => choose(l.code)}
                className={`shine w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-surface-container transition-colors min-h-[40px] ${
                  l.code === lang ? "text-secondary font-bold" : "text-primary"
                }`}
                role="option"
                aria-selected={l.code === lang}
                dir={l.dir}
              >
                <span className="text-xl leading-none" aria-hidden="true">
                  {l.flag}
                </span>
                <span className="flex-1 text-start">{l.nativeLabel}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-60">{l.code}</span>
                {l.code === lang && (
                  <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">
                    check
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

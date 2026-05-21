"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  { label: "בית", href: "/", tooltip: "חזרה לדף הבית של הפורטל" },
  { label: "קטלוג שירותים", href: "/catalog", tooltip: "צפייה ב-14 השירותים של מפ\"י" },
  { label: 'אזור אישי', href: "/dashboard", tooltip: "לוח בקרה אישי, הזמנות והתראות" },
  { label: "מרכז עזרה", href: "/help", tooltip: "FAQ, מדריכים ותמיכה" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] glass-header border-b border-outline-variant/30">
      <a href="#main-content" className="skip-link shine" data-tooltip="קפיצה לתוכן הראשי - נגישות">
        דלג לתוכן הראשי
      </a>
      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop h-20 flex flex-row-reverse items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="text-right flex flex-col justify-center border-l border-outline-variant pl-4 ml-4 hidden md:flex">
            <span className="text-[10px] uppercase tracking-widest font-bold text-secondary">
              מדינת ישראל
            </span>
            <span className="text-xs font-medium text-primary">
              משרד הבינוי והשיכון
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 group shine rounded-2xl p-1 -m-1"
            aria-label="חזרה לדף הבית"
            data-tooltip="חזרה לדף הבית של פורטל מפ&quot;י"
            data-tooltip-position="bottom"
          >
            <div className="flex flex-col items-end leading-tight">
              <span className="font-extrabold text-xl tracking-tight text-primary group-hover:text-secondary transition-colors">
                MAPI
              </span>
              <span className="text-[10px] font-semibold text-secondary">
                המרכז למיפוי ישראל
              </span>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-white border border-outline-variant/50 flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all overflow-hidden">
              <Image
                src="/mapi-logo.svg"
                alt='לוגו המרכז למיפוי ישראל'
                width={48}
                height={48}
                priority
                className="w-full h-full object-contain p-1"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-row-reverse items-center gap-10" aria-label="ניווט ראשי">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-primary hover:text-secondary transition-colors relative group shine px-2 py-1 rounded-lg"
              data-tooltip={item.tooltip}
              data-tooltip-position="bottom"
            >
              {item.label}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-bold text-primary hover:text-secondary hidden sm:block transition-colors shine px-2 py-1 rounded-lg"
            data-tooltip="התחברות בהזדהות לאומית, SSO ארגוני, או מודד"
            data-tooltip-position="bottom"
          >
            התחברות
          </Link>
          <Link
            href="/dashboard"
            className="shine shine-glow bg-primary text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2"
            data-tooltip="לוח בקרה אישי - הזמנות, התראות ופעולות מהירות"
            data-tooltip-position="bottom"
          >
            <span>אזור אישי</span>
            <span className="material-symbols-outlined text-[18px]">person</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-container transition-colors shine"
            aria-label={open ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={open}
            data-tooltip={open ? "סגור תפריט ניווט" : "פתח תפריט ניווט"}
            data-tooltip-position="bottom"
          >
            <span className="material-symbols-outlined text-primary">
              {open ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-outline-variant shadow-2xl animate-fade-in"
          aria-label="ניווט מובייל"
        >
          <ul className="flex flex-col py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-4 text-right font-medium text-primary hover:bg-surface-container border-b border-outline-variant/30 shine"
                  title={item.tooltip}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block px-6 py-4 text-right font-medium text-secondary hover:bg-surface-container shine"
                title='התחברות לפורטל'
              >
                התחברות
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

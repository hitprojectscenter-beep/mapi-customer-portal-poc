"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "בית", href: "/" },
  { label: "קטלוג שירותים", href: "/catalog" },
  { label: 'אזור אישי', href: "/dashboard" },
  { label: "מרכז עזרה", href: "/help" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] glass-header border-b border-outline-variant/30">
      <a href="#main-content" className="skip-link">
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
              שר הבינוי והשיכון
            </span>
          </div>
          <Link href="/" className="flex items-center gap-3 group" aria-label="חזרה לדף הבית">
            <div className="flex flex-col items-end leading-tight">
              <span className="font-extrabold text-xl tracking-tight text-primary group-hover:text-secondary transition-colors">
                MAPI
              </span>
              <span className="text-[10px] font-semibold text-secondary">
                המרכז למיפוי ישראל
              </span>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white text-[28px]">
                public
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-row-reverse items-center gap-10" aria-label="ניווט ראשי">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-primary hover:text-secondary transition-colors relative group"
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
            className="text-sm font-bold text-primary hover:text-secondary hidden sm:block transition-colors"
          >
            התחברות
          </Link>
          <Link
            href="/dashboard"
            className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2"
          >
            <span>אזור אישי</span>
            <span className="material-symbols-outlined text-[18px]">person</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-container transition-colors"
            aria-label="פתח תפריט"
            aria-expanded={open}
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
                  className="block px-6 py-4 text-right font-medium text-primary hover:bg-surface-container border-b border-outline-variant/30"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block px-6 py-4 text-right font-medium text-secondary hover:bg-surface-container"
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

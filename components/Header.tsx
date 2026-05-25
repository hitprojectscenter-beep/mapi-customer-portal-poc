"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SupportFormModal from "./SupportFormModal";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.segments"), href: "/segments" },
    { label: t("nav.catalog"), href: "/catalog" },
    { label: t("nav.dashboard"), href: "/dashboard" },
    { label: t("nav.admin"), href: "/admin" },
    { label: t("nav.help"), href: "/help" }
  ];

  return (
    <>
      <header className="fixed top-14 sm:top-16 left-0 right-0 z-[100] glass-header border-b border-outline-variant/30">
        <a href="#main-content" className="skip-link shine" data-tooltip={t("nav.skipToContent")}>
          {t("nav.skipToContent")}
        </a>
        <div className="max-w-container-max-width mx-auto px-3 md:px-margin-desktop h-20 flex flex-row-reverse rtl:flex-row-reverse ltr:flex-row items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-center flex flex-col justify-center border-l border-outline-variant pl-4 ml-4 hidden md:flex">
              <span className="text-[10px] uppercase tracking-widest font-bold text-secondary">
                {t("header.country")}
              </span>
              <span className="text-xs font-medium text-primary">{t("header.ministry")}</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group shine rounded-2xl p-1 -m-1"
              aria-label={t("nav.home")}
              data-tooltip={t("nav.home")}
              data-tooltip-position="bottom"
            >
              <div className="flex flex-col items-center leading-tight">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-primary group-hover:text-secondary transition-colors">
                  MAPI
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-secondary">
                  {t("header.brandSub")}
                </span>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-white border border-outline-variant/50 flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all overflow-hidden">
                <Image
                  src="/mapi-logo.svg"
                  alt={t("header.brandSub")}
                  width={48}
                  height={48}
                  priority
                  className="w-full h-full object-contain p-1"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Main">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-primary hover:text-secondary transition-colors relative group shine px-2 py-1 rounded-lg"
                data-tooltip={item.label}
                data-tooltip-position="bottom"
              >
                {item.label}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <LanguageSwitcher compact />

            <button
              type="button"
              onClick={() => setSupportOpen(true)}
              className="shine flex items-center justify-center gap-2 bg-secondary/10 hover:bg-secondary hover:text-white text-secondary px-3 sm:px-4 py-2 rounded-full text-sm font-bold transition-colors min-h-[40px] min-w-[40px]"
              aria-label={t("nav.support")}
              data-tooltip={t("nav.support")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
              <span className="hidden md:inline">{t("nav.support")}</span>
            </button>

            <Link
              href="/login"
              className="text-sm font-bold text-primary hover:text-secondary hidden sm:block transition-colors shine px-2 py-1 rounded-lg"
              data-tooltip={t("nav.login")}
              data-tooltip-position="bottom"
            >
              {t("nav.login")}
            </Link>
            <Link
              href="/dashboard"
              className="shine shine-glow bg-primary text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-bold shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2 min-h-[40px]"
              data-tooltip={t("nav.dashboard")}
              data-tooltip-position="bottom"
            >
              <span className="hidden sm:inline">{t("nav.dashboard")}</span>
              <span className="material-symbols-outlined text-[18px]">person</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-container transition-colors shine min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label={open ? t("header.closeMenu") : t("header.openMenu")}
              aria-expanded={open}
              data-tooltip={open ? t("header.closeMenu") : t("header.openMenu")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-primary">{open ? "close" : "menu"}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav
            className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-outline-variant shadow-2xl animate-fade-in max-h-[calc(100vh-5rem)] overflow-y-auto"
            aria-label="Mobile"
          >
            <ul className="flex flex-col py-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="shine block px-6 py-4 text-center font-medium text-primary hover:bg-surface-container border-b border-outline-variant/30 min-h-[48px] flex items-center justify-center"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setSupportOpen(true);
                    setOpen(false);
                  }}
                  className="shine w-full text-center px-6 py-4 font-medium text-secondary hover:bg-surface-container border-b border-outline-variant/30 min-h-[48px] flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                  <span>{t("nav.support")}</span>
                </button>
              </li>
              <li>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="shine block px-6 py-4 text-center font-medium text-secondary hover:bg-surface-container min-h-[48px] flex items-center justify-center"
                >
                  {t("nav.login")}
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <SupportFormModal open={supportOpen} onClose={() => setSupportOpen(false)} />
    </>
  );
}

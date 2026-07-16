"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SupportFormModal from "./SupportFormModal";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchBar from "./SearchBar";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";

export default function Header() {
  const { t } = useLanguage();
  const cart = useCart();
  const wish = useWishlist();
  const [open, setOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Every nav control carries a representative icon + a detailed tooltip
  const navItems = [
    { label: t("nav.home"), href: "/", icon: "home", tip: t("nav.tip.home") },
    { label: t("nav.catalog"), href: "/catalog", icon: "storefront", tip: t("nav.tip.catalog") },
    { label: t("nav.bundles"), href: "/bundles", icon: "package_2", tip: t("nav.tip.bundles") },
    { label: t("nav.plans"), href: "/plans", icon: "workspace_premium", tip: t("nav.tip.plans") },
    { label: t("nav.apiHub"), href: "/api-hub", icon: "api", tip: t("nav.tip.apiHub") },
    { label: t("nav.dashboard"), href: "/dashboard", icon: "person", tip: t("nav.tip.dashboard") },
    { label: t("nav.help"), href: "/help", icon: "help", tip: t("nav.tip.help") }
  ];
  const adminQuickLinks = [
    { label: t("nav.pipeline"), href: "/admin/pipeline", icon: "filter_alt" },
    { label: t("nav.strategic"), href: "/admin/strategic", icon: "stars" },
    { label: t("nav.useCases"), href: "/admin/use-cases", icon: "menu_book" },
    { label: t("nav.goals"), href: "/admin/goals", icon: "flag" }
  ];
  // Used in mobile drawer below
  void adminQuickLinks;

  return (
    <>
      <header className="fixed top-[88px] sm:top-[96px] left-0 right-0 z-[100] glass-header border-b border-outline-variant/30">
        <a href="#main-content" className="skip-link shine" data-tooltip={t("nav.skipToContent")}>
          {t("nav.skipToContent")}
        </a>
        <div className="max-w-container-max-width mx-auto px-3 md:px-margin-desktop h-20 flex flex-row-reverse rtl:flex-row-reverse ltr:flex-row items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group shine rounded-2xl p-1 -m-1"
              aria-label={t("nav.home")}
              data-tooltip={t("nav.home")}
              data-tooltip-position="bottom"
            >
              <div className="flex flex-col items-center leading-tight">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-primary group-hover:text-secondary transition-colors" dir="rtl">
                  מפ&quot;י
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-secondary">
                  {t("header.brandSub")}
                </span>
              </div>
              <div className="h-11 w-12 sm:h-13 sm:w-14 rounded-2xl bg-white border border-outline-variant/50 flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all overflow-hidden">
                <Image
                  src="/mapi-logo.png"
                  alt={t("header.brandSub")}
                  width={56}
                  height={48}
                  priority
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-primary hover:text-gold-dark transition-colors relative group shine px-2 py-1 rounded-lg flex items-center gap-1.5"
                data-tooltip={item.tip}
                data-tooltip-position="bottom"
                data-tooltip-wrap="true"
              >
                <span className="material-symbols-outlined text-[18px] text-gold-dark/60 group-hover:text-gold-dark transition-colors" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
                <span className="absolute -bottom-1 right-0 w-0 h-px bg-gradient-to-l from-gold to-gold-light group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* SFCC-style utility icons: search / wishlist / account / cart */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <LanguageSwitcher compact />

            {/* Search icon (opens SearchBar overlay) */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="shine w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors"
              aria-label={t("header.search.aria")}
              data-tooltip={t("header.search.aria")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-primary text-[22px]">search</span>
            </button>

            {/* Support button */}
            <button
              type="button"
              onClick={() => setSupportOpen(true)}
              className="shine w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors hidden sm:flex"
              aria-label={t("nav.support")}
              data-tooltip={t("nav.support")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-primary text-[22px]">support_agent</span>
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="shine w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors relative"
              aria-label={t("header.wishlist")}
              data-tooltip={t("header.wishlist")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-primary text-[22px]">favorite</span>
              {wish.count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-error-red text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1" dir="ltr">
                  {wish.count}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/dashboard"
              className="shine w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors"
              aria-label={t("header.account")}
              data-tooltip={t("header.account")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-primary text-[22px]">person</span>
            </Link>

            {/* Cart with count badge */}
            <button
              type="button"
              onClick={cart.open}
              className="shine w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors relative"
              aria-label={`${t("header.cart")} (${cart.itemCount} ${t("header.cartCount")})`}
              data-tooltip={t("header.cart")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-primary text-[22px]">shopping_bag</span>
              {cart.itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-secondary text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1" dir="ltr">
                  {cart.itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 rounded-full hover:bg-surface-container transition-colors shine flex items-center justify-center"
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
            style={{ maxHeight: "calc(100dvh - 5rem - var(--safe-top))", paddingBottom: "var(--safe-bottom)" }}
            className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-outline-variant shadow-2xl animate-fade-in overflow-y-auto"
            aria-label="Mobile"
          >
            <ul className="flex flex-col py-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="shine block px-6 py-4 text-center font-medium text-primary hover:bg-gold-tint border-b border-outline-variant/30 min-h-[48px] flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px] text-gold-dark/70" aria-hidden="true">{item.icon}</span>
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
      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

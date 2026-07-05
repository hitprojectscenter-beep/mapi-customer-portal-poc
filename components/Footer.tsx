"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const MAPI_SITE = "https://www.gov.il/he/departments/survey_of_israel";
const GOV_ACCESSIBILITY = "https://www.gov.il/he/policies/accessibility";
const GOV_PRIVACY = "https://www.gov.il/he/policies/privacy_policy";
const GOV_TERMS = "https://www.gov.il/he/policies/terms_of_use";

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-5" aria-hidden="true" />

      {/* Newsletter strip (SFCC-style hero band above footer) */}
      <div className="border-b border-white/10 relative">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="text-center md:text-start">
              <p className="text-secondary-container text-xs uppercase tracking-widest font-semibold mb-2">
                {t("footer.newsletter")}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                {t("newsletter.title")}
              </h3>
              <p className="text-white/70 text-sm mt-2 font-light">
                {t("newsletter.sub")}
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="newsletter-email" className="sr-only">{t("newsletter.placeholder")}</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletter.placeholder")}
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white placeholder:text-white/50 focus:ring-2 focus:ring-secondary-container focus:outline-none min-h-[48px]"
                dir="ltr"
              />
              <button
                type="submit"
                className={`shine shine-glow whitespace-nowrap px-6 py-3 rounded-full font-semibold transition-colors min-h-[48px] flex items-center justify-center gap-2 ${
                  subscribed ? "bg-positive-green text-white" : "bg-white text-primary hover:bg-secondary-container"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {subscribed ? "check_circle" : "mail"}
                </span>
                <span>{subscribed ? t("newsletter.success") : t("newsletter.subscribe")}</span>
              </button>
            </form>
          </div>
          <p className="text-[11px] text-white/40 text-center md:text-end mt-3 font-light">
            🔒 {t("newsletter.privacy")}
          </p>
        </div>
      </div>

      {/* Trust badges strip */}
      <div className="border-b border-white/10 relative">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "verified_user", label: t("trust.national") },
            { icon: "shield", label: t("trust.security") },
            { icon: "lock", label: t("svc.securePayment") },
            { icon: "accessibility", label: "WCAG 2.1 AA" }
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2 justify-center md:justify-start">
              <span className="material-symbols-outlined text-secondary-container text-[24px]">{b.icon}</span>
              <span className="text-xs text-white/80 font-light">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop relative pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16">
          <div className="col-span-2 md:col-span-1 flex flex-col items-center gap-5">
            <a
              href={MAPI_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 shine rounded-2xl p-2 -m-2 group"
              data-tooltip={t("footer.mainSite")}
              data-tooltip-position="bottom"
            >
              <div className="flex flex-col items-center leading-tight">
                <span className="font-extrabold text-2xl tracking-tight text-white" dir="rtl">מפ&quot;י</span>
                <span className="text-[10px] font-semibold text-secondary-container">
                  {t("header.brandSub")}
                </span>
              </div>
              <div className="h-14 w-16 rounded-2xl bg-white flex items-center justify-center border border-white/20 group-hover:scale-105 transition-all overflow-hidden p-1">
                <Image
                  src="/mapi-logo.png"
                  alt={t("header.brandSub")}
                  width={64}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
            <p className="text-center text-white/60 text-sm leading-relaxed">
              {t("footer.about")}
            </p>
          </div>

          <div className="flex flex-col items-center gap-5">
            <h4 className="font-bold text-sm uppercase tracking-widest text-secondary-container">
              {t("footer.quickLinks")}
            </h4>
            <nav className="flex flex-col items-center gap-3 text-white/70 text-sm" aria-label="Footer links">
              <Link href="/catalog" className="hover:text-white transition-colors shine px-2 py-0.5 rounded">
                {t("nav.catalog")}
              </Link>
              <Link href="/dashboard" className="hover:text-white transition-colors shine px-2 py-0.5 rounded">
                {t("nav.dashboard")}
              </Link>
              <Link href="/help" className="hover:text-white transition-colors shine px-2 py-0.5 rounded">
                {t("nav.help")}
              </Link>
              <Link href="/cases/new" className="hover:text-white transition-colors shine px-2 py-0.5 rounded">
                {t("help.openCase")}
              </Link>
            </nav>
          </div>

          <div className="flex flex-col items-center gap-5">
            <h4 className="font-bold text-sm uppercase tracking-widest text-secondary-container">
              {t("footer.legal")}
            </h4>
            <nav className="flex flex-col items-center gap-3 text-white/70 text-sm" aria-label="Legal">
              <a href={GOV_TERMS} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors shine px-2 py-0.5 rounded">
                {t("footer.terms")}
              </a>
              <a href={GOV_PRIVACY} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors shine px-2 py-0.5 rounded">
                {t("footer.privacy")}
              </a>
              <a href={GOV_ACCESSIBILITY} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors shine px-2 py-0.5 rounded">
                {t("footer.accessibility")}
              </a>
              <a href={MAPI_SITE} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors shine px-2 py-0.5 rounded">
                {t("footer.mainSite")}
              </a>
            </nav>
          </div>

          <div className="flex flex-col items-center gap-5">
            <h4 className="font-bold text-sm uppercase tracking-widest text-secondary-container">
              {t("footer.contact")}
            </h4>
            <div className="flex flex-col items-center gap-3 text-white/70 text-center text-sm">
              <a
                href="https://maps.app.goo.gl/Q3w3VEr5K3y3Y3y39"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors shine px-2 py-0.5 rounded"
              >
                <span>{t("footer.address")}</span>
                <span className="material-symbols-outlined text-[18px]">location_on</span>
              </a>
              <a href="tel:*6274" className="flex items-center gap-2 hover:text-white transition-colors shine px-2 py-0.5 rounded">
                <span>{t("footer.phone")}</span>
                <span className="material-symbols-outlined text-[18px]">phone</span>
              </a>
              <a href="mailto:service@mapi.gov.il" className="hover:text-white transition-colors flex items-center gap-2 shine px-2 py-0.5 rounded">
                <span>{t("footer.email")}</span>
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row-reverse justify-between items-center gap-4">
          <p className="text-white/50 text-xs">{t("footer.copyright")}</p>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/MAPI.SURVEY/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center shine"
              aria-label="Facebook"
            >
              <span className="material-symbols-outlined text-[20px]">facebook</span>
            </a>
            <a
              href={MAPI_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center shine"
              aria-label="Website"
            >
              <span className="material-symbols-outlined text-[20px]">language</span>
            </a>
            <a
              href="mailto:service@mapi.gov.il"
              className="text-white/40 hover:text-white transition-colors w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center shine"
              aria-label="Email"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

const MAPI_SITE = "https://www.gov.il/he/departments/survey_of_israel";
const GOV_ACCESSIBILITY = "https://www.gov.il/he/policies/accessibility";
const GOV_PRIVACY = "https://www.gov.il/he/policies/privacy_policy";
const GOV_TERMS = "https://www.gov.il/he/policies/terms_of_use";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-primary text-white pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-5" aria-hidden="true" />
      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop relative">
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
                <span className="font-extrabold text-2xl tracking-tight text-white">MAPI</span>
                <span className="text-[10px] font-semibold text-secondary-container">
                  {t("header.brandSub")}
                </span>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:bg-white/20 group-hover:scale-105 transition-all overflow-hidden p-1">
                <Image
                  src="/mapi-logo-white.svg"
                  alt={t("header.brandSub")}
                  width={56}
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

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const MAPI_SITE = "https://www.gov.il/he/departments/survey_of_israel";
const GOV_PRIVACY = "https://www.gov.il/he/policies/privacy_policy";
const GOV_TERMS = "https://www.gov.il/he/policies/terms_of_use";

// Luxury footer: ivory-white, champagne hairlines and gold accents —
// no solid dark band. Every control keeps an icon + detailed tooltip.
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

  const quickLinks = [
    { href: "/catalog", label: t("nav.catalog"), icon: "storefront", tip: "כל מוצרי ושירותי מפ\"י — מחירים והזמנה מקוונת" },
    { href: "/dashboard", label: t("nav.dashboard"), icon: "person", tip: "האזור האישי — הזמנות, מנויים והצעות מחיר" },
    { href: "/help", label: t("nav.help"), icon: "help", tip: "מרכז העזרה — שאלות נפוצות ומדריכים" },
    { href: "/cases/new", label: t("help.openCase"), icon: "support_agent", tip: "פתיחת פנייה לצוות השירות — מענה תוך 2 ימי עסקים" }
  ];

  const legalLinks = [
    { href: GOV_TERMS, label: t("footer.terms"), icon: "gavel", external: true, tip: "תנאי השימוש באתרי הממשלה" },
    { href: GOV_PRIVACY, label: t("footer.privacy"), icon: "lock", external: true, tip: "מדיניות הפרטיות הממשלתית" },
    { href: "/accessibility", label: t("footer.accessibility"), icon: "accessibility_new", external: false, tip: "הצהרת הנגישות של הפורטל לפי ת\"י 5568" },
    { href: MAPI_SITE, label: t("footer.mainSite"), icon: "language", external: true, tip: "האתר הרשמי של המרכז למיפוי ישראל ב-gov.il" }
  ];

  return (
    <footer className="bg-ivory text-primary relative overflow-hidden border-t border-gold/30">
      <div className="absolute inset-0 dot-pattern opacity-[0.04]" aria-hidden="true" />

      {/* Newsletter strip — light card, champagne frame */}
      <div className="border-b border-gold/20 relative">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="text-center md:text-start">
              <p className="lux-label mb-2">{t("footer.newsletter")}</p>
              <h3 className="text-xl md:text-2xl font-bold text-primary leading-tight">
                {t("newsletter.title")}
              </h3>
              <p className="text-on-surface-variant text-sm mt-2 font-light">
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
                className="flex-1 bg-white border border-gold/30 rounded-full px-5 py-3 text-primary placeholder:text-primary/40 focus:ring-2 focus:ring-gold/50 focus:outline-none min-h-[48px]"
                dir="ltr"
                data-tooltip="כתובת המייל לקבלת עדכוני מוצרים ומבצעים — ללא דואר זבל, הסרה בקליק"
              />
              <button
                type="submit"
                className={`shine shine-glow whitespace-nowrap px-6 py-3 rounded-full font-semibold transition-colors min-h-[48px] flex items-center justify-center gap-2 ${
                  subscribed ? "bg-positive-green text-white" : "btn-lux-primary"
                }`}
                data-tooltip="הרשמה לעדכוני מוצרים, מבצעים ושירותים חדשים — ללא דואר זבל"
                data-tooltip-position="bottom"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  {subscribed ? "check_circle" : "mail"}
                </span>
                <span>{subscribed ? t("newsletter.success") : t("newsletter.subscribe")}</span>
              </button>
            </form>
          </div>
          <p className="text-[11px] text-on-surface-variant/70 text-center md:text-end mt-3 font-light">
            🔒 {t("newsletter.privacy")}
          </p>
        </div>
      </div>

      {/* Trust badges strip */}
      <div className="border-b border-gold/20 relative">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "verified_user", label: t("trust.national") },
            { icon: "shield", label: t("trust.security") },
            { icon: "lock", label: t("svc.securePayment") },
            { icon: "accessibility", label: "WCAG 2.1 AA" }
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2 justify-center md:justify-start">
              <span className="material-symbols-outlined text-gold-dark text-[24px]" aria-hidden="true">{b.icon}</span>
              <span className="text-xs text-on-surface-variant font-light">{b.label}</span>
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
                <span className="font-extrabold text-2xl tracking-tight text-primary" dir="rtl">מפ&quot;י</span>
                <span className="text-[10px] font-semibold text-gold-dark">
                  {t("header.brandSub")}
                </span>
              </div>
              <div className="h-14 w-16 rounded-2xl bg-white flex items-center justify-center border border-gold/30 group-hover:scale-105 group-hover:shadow-lg transition-all overflow-hidden p-1">
                <Image
                  src="/mapi-logo.png"
                  alt={t("header.brandSub")}
                  width={64}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
            <p className="text-center text-on-surface-variant text-sm leading-relaxed font-light">
              {t("footer.about")}
            </p>
          </div>

          <div className="flex flex-col items-center gap-5">
            <h4 className="lux-label">{t("footer.quickLinks")}</h4>
            <nav className="flex flex-col items-center gap-3 text-on-surface-variant text-sm" aria-label="Footer links">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="hover:text-gold-dark transition-colors shine px-2 py-0.5 rounded flex items-center gap-1.5"
                  data-tooltip={l.tip}
                >
                  <span className="material-symbols-outlined text-[16px] text-gold-dark/70" aria-hidden="true">{l.icon}</span>
                  <span>{l.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center gap-5">
            <h4 className="lux-label">{t("footer.legal")}</h4>
            <nav className="flex flex-col items-center gap-3 text-on-surface-variant text-sm" aria-label="Legal">
              {legalLinks.map((l) =>
                l.external ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-dark transition-colors shine px-2 py-0.5 rounded flex items-center gap-1.5"
                    data-tooltip={l.tip}
                  >
                    <span className="material-symbols-outlined text-[16px] text-gold-dark/70" aria-hidden="true">{l.icon}</span>
                    <span>{l.label}</span>
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="hover:text-gold-dark transition-colors shine px-2 py-0.5 rounded flex items-center gap-1.5"
                    data-tooltip={l.tip}
                  >
                    <span className="material-symbols-outlined text-[16px] text-gold-dark/70" aria-hidden="true">{l.icon}</span>
                    <span>{l.label}</span>
                  </Link>
                )
              )}
            </nav>
          </div>

          <div className="flex flex-col items-center gap-5">
            <h4 className="lux-label">{t("footer.contact")}</h4>
            <div className="flex flex-col items-center gap-3 text-on-surface-variant text-center text-sm">
              <a
                href="https://maps.app.goo.gl/Q3w3VEr5K3y3Y3y39"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold-dark transition-colors shine px-2 py-0.5 rounded"
                data-tooltip="פתיחת המיקום במפות Google — משרדי מפ&quot;י"
              >
                <span>{t("footer.address")}</span>
                <span className="material-symbols-outlined text-[18px] text-gold-dark/70" aria-hidden="true">location_on</span>
              </a>
              <a
                href="tel:*6274"
                className="flex items-center gap-2 hover:text-gold-dark transition-colors shine px-2 py-0.5 rounded"
                data-tooltip="חיוג למוקד השירות — ימים א'-ה' 8:00-16:00"
              >
                <span>{t("footer.phone")}</span>
                <span className="material-symbols-outlined text-[18px] text-gold-dark/70" aria-hidden="true">phone</span>
              </a>
              <a
                href="mailto:service@mapi.gov.il"
                className="hover:text-gold-dark transition-colors flex items-center gap-2 shine px-2 py-0.5 rounded"
                data-tooltip="שליחת מייל לצוות השירות — מענה תוך יום עסקים"
              >
                <span>{t("footer.email")}</span>
                <span className="material-symbols-outlined text-[18px] text-gold-dark/70" aria-hidden="true">mail</span>
              </a>
            </div>
          </div>
        </div>

        <div className="lux-hairline-t pt-8 flex flex-col md:flex-row-reverse justify-between items-center gap-4">
          <p className="text-on-surface-variant/80 text-xs">
            {t("footer.copyright")}
            {" · "}
            <Link
              href="/cms/login"
              className="hover:text-gold-dark underline decoration-gold/40"
              data-tooltip="כניסת מנהלי תוכן מורשים — חדשות, קמפיינים ומשתמשים"
            >
              ניהול תוכן
            </Link>
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/MAPI.SURVEY/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-gold-dark transition-colors w-10 h-10 rounded-full bg-white border border-gold/25 hover:border-gold/60 flex items-center justify-center shine"
              aria-label="Facebook"
              data-tooltip="עמוד הפייסבוק הרשמי של מפ&quot;י"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">thumb_up</span>
            </a>
            <a
              href={MAPI_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-gold-dark transition-colors w-10 h-10 rounded-full bg-white border border-gold/25 hover:border-gold/60 flex items-center justify-center shine"
              aria-label="Website"
              data-tooltip={t("footer.mainSite")}
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">language</span>
            </a>
            <a
              href="mailto:service@mapi.gov.il"
              className="text-on-surface-variant hover:text-gold-dark transition-colors w-10 h-10 rounded-full bg-white border border-gold/25 hover:border-gold/60 flex items-center justify-center shine"
              aria-label="Email"
              data-tooltip="שליחת מייל לצוות השירות"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

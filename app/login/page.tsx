"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function LoginPage() {
  const { t } = useLanguage();
  const features = [
    t("login.feat.security"),
    t("login.feat.idCard"),
    t("login.feat.history"),
    t("login.feat.itStandard")
  ];
  return (
    <div className="bg-primary min-h-[calc(100vh-5rem)] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-10" aria-hidden="true" />
      <div className="absolute inset-0 topo-pattern opacity-20" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" aria-hidden="true" />

      <div className="relative max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-12 w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Marketing Side */}
        <div className="text-white text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 text-white/90 border border-white/10">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="text-xs font-bold tracking-wide">{t("login.national")}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            {t("login.title")}
            <br />
            <span className="text-secondary-container">{t("login.titleSub")}</span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-lg">
            {t("login.intro")}
          </p>
          <div className="space-y-3">
            {features.map((feat, i) => (
              <div key={i} className="flex items-center justify-center gap-3 text-sm">
                <span>{feat}</span>
                <span className="material-symbols-outlined text-secondary-container">
                  check_circle
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
          <h2 className="text-2xl font-extrabold text-primary mb-2 text-center">
            {t("login.chooseMethod")}
          </h2>
          <p className="text-on-surface-variant text-sm mb-8 text-center">
            {t("login.intro")}
          </p>

          {/* Primary - National Identity */}
          <Link
            href="/dashboard"
            className="shine shine-glow block w-full bg-gradient-to-l from-primary to-secondary text-white p-5 rounded-2xl font-bold hover:shadow-xl transition-all mb-3"
            data-tooltip="התחברות לאזרחים פרטיים בעזרת מערכת ההזדהות הלאומית של ממשלת ישראל"
            data-tooltip-position="bottom"
          >
            <div className="flex flex-row-reverse items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">badge</span>
              </div>
              <div className="text-center flex-1">
                <p className="text-lg font-extrabold">{t("login.national")}</p>
                <p className="text-xs font-normal text-white/80">{t("login.nationalSub")}</p>
              </div>
              <span className="material-symbols-outlined">arrow_back</span>
            </div>
          </Link>

          {/* SSO */}
          <Link
            href="/dashboard"
            className="shine block w-full bg-white border-2 border-outline-variant hover:border-secondary text-primary p-5 rounded-2xl font-bold transition-all mb-3"
            data-tooltip={t("login.ssoSub")}
            data-tooltip-position="bottom"
          >
            <div className="flex flex-row-reverse items-center gap-4">
              <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">business</span>
              </div>
              <div className="text-center flex-1">
                <p className="text-lg font-extrabold">{t("login.sso")}</p>
                <p className="text-xs font-normal text-on-surface-variant">{t("login.ssoSub")}</p>
              </div>
              <span className="material-symbols-outlined">arrow_back</span>
            </div>
          </Link>

          {/* Surveyor License */}
          <Link
            href="/dashboard"
            className="shine block w-full bg-white border-2 border-outline-variant hover:border-secondary text-primary p-5 rounded-2xl font-bold transition-all"
            data-tooltip={t("login.surveyorSub")}
            data-tooltip-position="bottom"
          >
            <div className="flex flex-row-reverse items-center gap-4">
              <div className="w-14 h-14 bg-positive-green/10 text-positive-green rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">engineering</span>
              </div>
              <div className="text-center flex-1">
                <p className="text-lg font-extrabold">{t("login.surveyor")}</p>
                <p className="text-xs font-normal text-on-surface-variant">{t("login.surveyorSub")}</p>
              </div>
              <span className="material-symbols-outlined">arrow_back</span>
            </div>
          </Link>

          <div className="mt-8 pt-6 border-t border-outline-variant text-center">
            <p className="text-xs text-on-surface-variant mb-2">
              {t("login.newToPortal")}{" "}
              <a
                href="https://www.gov.il/he/departments/guides/identity_card"
                target="_blank"
                rel="noopener noreferrer"
                className="shine text-secondary font-bold hover:underline px-1 rounded"
              >
                {t("login.learnMore")}
              </a>
            </p>
            <p className="text-xs text-on-surface-variant">
              {t("login.problem")}{" "}
              <Link
                href="/help"
                className="shine text-secondary font-bold hover:underline px-1 rounded"
              >
                {t("login.helpCenter")}
              </Link>
            </p>
            <p className="text-xs text-on-surface-variant mt-3 bg-gold-tint/60 border border-gold/25 rounded-xl px-3 py-2 inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-gold-dark" aria-hidden="true">edit_note</span>
              <span>מנהל מערכת (שם משתמש + סיסמה)?</span>
              <Link
                href="/cms/login"
                className="shine text-gold-dark font-bold hover:underline px-1 rounded"
                data-tooltip="מסך הכניסה לממשק הניהול — שם עובדות הסיסמאות שקיבלת, לא כאן"
              >
                לממשק הניהול ←
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

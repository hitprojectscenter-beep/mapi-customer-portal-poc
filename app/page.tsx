"use client";

import Link from "next/link";
import { useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import QuoteRequestModal from "@/components/QuoteRequestModal";
import WowCounter from "@/components/WowCounter";
import GovMapEmbed from "@/components/GovMapEmbed";
import { services, categories, getServiceName, getServiceShortDescription, getServiceCategoryLabel, getCategoryLabel, type Service } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

export default function HomePage() {
  const { t, lang } = useLanguage();
  const featuredServices = services.filter((s) => s.highlight).slice(0, 4);
  const [quoteFor, setQuoteFor] = useState<Service | null>(null);

  return (
    <>
      {/* Cinematic Hero Section with WOW effects */}
      <section
        className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden wow-mesh wow-particles -mt-[136px] sm:-mt-[144px] pt-[136px] sm:pt-[144px]"
        aria-label="באנר ראשי"
      >
        {/* Aurora glow blobs */}
        <div
          className="wow-aurora bg-secondary"
          style={{ width: 500, height: 500, top: "10%", right: "-100px", animationDelay: "0s" }}
          aria-hidden="true"
        />
        <div
          className="wow-aurora bg-secondary-container"
          style={{ width: 400, height: 400, bottom: "10%", left: "-100px", animationDelay: "4s", opacity: 0.35 }}
          aria-hidden="true"
        />
        <div
          className="wow-aurora bg-primary-container"
          style={{ width: 300, height: 300, top: "40%", left: "30%", animationDelay: "8s", opacity: 0.3 }}
          aria-hidden="true"
        />

        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80")'
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 topo-pattern opacity-25" aria-hidden="true" />
        </div>

        {/* Data Vis Decorations */}
        <div className="absolute inset-0 pointer-events-none opacity-20 hidden sm:block" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-px h-32 bg-white/40" />
          <div className="absolute top-1/4 left-1/4 w-32 h-px bg-white/40" />
          <div className="absolute bottom-1/3 right-1/4 border border-white/20 rounded-full w-64 h-64" />
          <span className="absolute top-24 right-6 md:right-20 text-[10px] text-white/40 font-mono tracking-widest">
            COORD: 31.7683° N, 35.2137° E
          </span>
        </div>

        <div className="relative z-10 max-w-container-max-width mx-auto px-4 md:px-margin-desktop text-center py-16 md:py-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full mb-6 sm:mb-8 text-white/90 border border-white/10">
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">verified_user</span>
            <span className="text-[10px] sm:text-xs font-bold tracking-wide">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="text-white font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] leading-[1.1] mb-8 sm:mb-10 max-w-5xl mx-auto">
            {t("hero.titleLine1")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-secondary-container to-white">
              {t("hero.titleLine2")}
            </span>
          </h1>

          {/* Glassmorphism Search Bar */}
          <form
            role="search"
            action="/catalog"
            method="get"
            className="max-w-3xl mx-auto mb-8 sm:mb-12"
          >
            <div className="glass-effect p-1.5 sm:p-2 rounded-2xl flex flex-row-reverse items-center shadow-2xl">
              <label htmlFor="hero-search" className="sr-only">{t("hero.searchBtn")}</label>
              <input
                id="hero-search"
                name="q"
                type="search"
                placeholder={t("hero.searchPlaceholder")}
                className="bg-transparent border-none focus:ring-0 focus:outline-none text-white placeholder:text-white/50 text-center flex-grow px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base md:text-lg w-full min-h-[44px]"
              />
              <button
                type="submit"
                className="shine bg-white text-primary px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary-container transition-all whitespace-nowrap min-h-[44px]"
                data-tooltip={t("hero.searchBtn")}
                data-tooltip-position="bottom"
              >
                <span className="hidden sm:inline">{t("hero.searchBtn")}</span>
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row-reverse items-center justify-center gap-3 sm:gap-6">
            <Link
              href="/catalog"
              className="shine shine-glow group bg-secondary text-white px-6 sm:px-10 py-3.5 sm:py-5 rounded-full font-bold flex items-center gap-3 hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/20 w-full sm:w-auto justify-center min-h-[48px]"
              data-tooltip={t("hero.startOrder")}
              data-tooltip-position="bottom"
            >
              {t("hero.startOrder")}
              <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
            </Link>
            <a
              href="https://www.govmap.gov.il/"
              target="_blank"
              rel="noopener noreferrer"
              className="shine text-white/80 hover:text-white font-bold flex items-center gap-2 transition-all px-3 py-2 rounded-lg min-h-[44px]"
              data-tooltip={t("hero.freeMap")}
              data-tooltip-position="bottom"
            >
              <span>{t("hero.freeMap")}</span>
              <span className="material-symbols-outlined">open_in_new</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hidden sm:flex" aria-hidden="true">
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Shop by customer type */}
      <section className="py-12 sm:py-16 md:py-20 bg-white relative" aria-labelledby="segments-heading">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="text-secondary font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 block">
              {t("seg.eyebrow")}
            </span>
            <h2
              id="segments-heading"
              className="text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4"
            >
              {t("home.shopByNeed")}
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base md:text-lg leading-relaxed">
              {t("home.shopByNeedSub")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[
              { id: "citizen", icon: "person", nameKey: "seg.citizen.name", color: "bg-secondary/10 text-secondary" },
              { id: "surveyor", icon: "engineering", nameKey: "seg.surveyor.name", color: "bg-positive-green/10 text-positive-green" },
              { id: "municipality", icon: "location_city", nameKey: "seg.municipality.name", color: "bg-alert-yellow/10 text-alert-yellow" },
              { id: "government", icon: "account_balance", nameKey: "seg.government.name", color: "bg-primary/10 text-primary" },
              { id: "professional", icon: "architecture", nameKey: "seg.professional.name", color: "bg-tertiary/10 text-tertiary" },
              { id: "business", icon: "business_center", nameKey: "seg.business.name", color: "bg-error-red/10 text-error-red" }
            ].map((seg) => (
              <Link
                key={seg.id}
                href={`/segments/${seg.id}`}
                className="shine group bg-surface rounded-2xl p-4 md:p-5 border border-outline-variant/50 hover:border-secondary/30 hover:shadow-xl transition-all hover:-translate-y-1 text-center"
                data-tooltip={t(seg.nameKey as never)}
                data-tooltip-position="bottom"
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${seg.color} group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined">{seg.icon}</span>
                </div>
                <p className="text-sm font-extrabold text-primary leading-tight">{t(seg.nameKey as never)}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/segments"
              className="shine inline-flex items-center gap-2 text-secondary font-bold hover:underline"
              data-tooltip={t("seg.choose")}
            >
              <span>{t("seg.choose")}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 md:py-32 relative bg-surface" aria-labelledby="services-heading">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop">
          <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-12 md:mb-24 gap-6 md:gap-8">
            <div className="text-center max-w-2xl">
              <span className="text-secondary font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 block">
                {t("services.eyebrow")}
              </span>
              <h2
                id="services-heading"
                className="text-primary text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
              >
                {t("services.title")}
              </h2>
            </div>
            <p className="text-on-surface-variant text-sm sm:text-base md:text-lg max-w-sm text-center leading-relaxed">
              {t("services.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
            {/* Hero card 1 - no price, with quote button */}
            <div className="md:col-span-7 group premium-card wow-tilt relative overflow-hidden bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-outline-variant/50 hover:shadow-2xl transition-all duration-500 shine">
              <div className="relative z-10 flex flex-col h-full text-center items-center">
                <div className="card-icon w-16 h-16 sm:w-20 sm:h-20 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary mb-6 sm:mb-8 md:mb-10 transition-all duration-500">
                  <span className="material-symbols-outlined text-[36px] sm:text-[48px]">
                    {featuredServices[0]?.icon}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary mb-3 sm:mb-4">
                  {featuredServices[0] && getServiceName(featuredServices[0].slug, featuredServices[0].name, lang)}
                </h3>
                <p className="text-on-surface-variant text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-md">
                  {featuredServices[0] && getServiceShortDescription(featuredServices[0].slug, featuredServices[0].shortDescription, lang)}
                </p>
                <div className="mt-auto flex flex-col sm:flex-row-reverse items-stretch sm:items-center gap-2 sm:gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => setQuoteFor(featuredServices[0])}
                    className="shine shine-glow flex-1 bg-primary text-white px-5 py-3 sm:py-3.5 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-secondary transition-colors min-h-[48px]"
                    data-tooltip="קבלת הצעת מחיר מותאמת אישית למוצר זה"
                    data-tooltip-position="bottom"
                  >
                    <span className="material-symbols-outlined text-[20px]">request_quote</span>
                    {t("services.sendQuote")}
                  </button>
                  <Link
                    href={`/catalog/${featuredServices[0]?.slug}`}
                    className="shine flex-1 sm:flex-initial bg-surface-container hover:bg-surface-container-high text-primary px-5 py-3 sm:py-3.5 rounded-full font-bold flex items-center justify-center gap-2 transition-colors min-h-[48px]"
                    data-tooltip={t("services.details")}
                    data-tooltip-position="bottom"
                  >
                    {t("services.details")}
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                  </Link>
                </div>
              </div>
              <div className="absolute -left-20 -bottom-20 w-80 h-80 border-[40px] border-secondary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" aria-hidden="true" />
            </div>

            {/* Vertical dark card - no price */}
            <div className="md:col-span-5 group premium-card wow-tilt bg-primary rounded-3xl p-6 sm:p-8 md:p-10 text-white relative overflow-hidden hover:shadow-2xl transition-all duration-500 shine shine-gold">
              <div className="relative z-10 flex flex-col h-full text-center items-center">
                <div className="card-icon w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 sm:mb-8 md:mb-10 transition-all">
                  <span className="material-symbols-outlined text-[32px] sm:text-[40px]">
                    {featuredServices[1]?.icon}
                  </span>
                </div>
                <span className="bg-secondary px-3 py-1 rounded text-xs uppercase font-bold tracking-widest mb-3">
                  {t("services.recommended")}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-3 sm:mb-4">
                  {featuredServices[1] && getServiceName(featuredServices[1].slug, featuredServices[1].name, lang)}
                </h3>
                <p className="text-white/70 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
                  {featuredServices[1] && getServiceShortDescription(featuredServices[1].slug, featuredServices[1].shortDescription, lang)}
                </p>
                <div className="mt-auto w-full flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setQuoteFor(featuredServices[1])}
                    className="shine w-full py-3 sm:py-4 rounded-xl bg-white text-primary font-bold hover:bg-secondary-container transition-all flex items-center justify-center gap-2 min-h-[48px]"
                    data-tooltip="קבלת הצעת מחיר מותאמת לפי משתמשים וצרכים"
                    data-tooltip-position="bottom"
                  >
                    <span className="material-symbols-outlined text-[20px]">request_quote</span>
                    {t("services.sendQuote")}
                  </button>
                  <Link
                    href={`/catalog/${featuredServices[1]?.slug}`}
                    className="shine w-full py-2.5 sm:py-3 rounded-xl border border-white/20 font-bold hover:bg-white/10 transition-all text-center min-h-[44px] flex items-center justify-center gap-2"
                    data-tooltip={t("services.details")}
                    data-tooltip-position="bottom"
                  >
                    {t("services.details")}
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                  </Link>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-10" aria-hidden="true">
                <span className="material-symbols-outlined text-[140px] sm:text-[180px]">radar</span>
              </div>
            </div>

            {/* Smaller cards - no price, with quote */}
            {[featuredServices[2], featuredServices[3], services.find((s) => s.slug === "gis-layers")!].map(
              (service) =>
                service && (
                  <div key={service.slug} className="md:col-span-4">
                    <article className="group shine wow-tilt premium-card relative bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/50 hover:shadow-2xl hover:border-secondary/30 transition-all duration-500 h-full flex flex-col">
                      <div className="text-center flex flex-col items-center h-full">
                        <div className="card-icon w-12 h-12 sm:w-14 sm:h-14 bg-secondary/5 text-secondary flex items-center justify-center rounded-2xl mb-4 sm:mb-6 transition-all duration-500">
                          <span className="material-symbols-outlined text-[28px] sm:text-[32px]">
                            {service.icon}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-secondary/70 mb-2">
                          {getServiceCategoryLabel(service.slug, service.categoryLabel, lang)}
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold text-primary mb-3 leading-tight">
                          {getServiceName(service.slug, service.name, lang)}
                        </h3>
                        <p className="text-sm text-on-surface-variant mb-5 flex-1 leading-relaxed">
                          {getServiceShortDescription(service.slug, service.shortDescription, lang)}
                        </p>
                        <div className="w-full flex flex-col gap-2 mt-auto">
                          <button
                            type="button"
                            onClick={() => setQuoteFor(service)}
                            className="shine shine-glow w-full bg-primary text-white py-2.5 rounded-full font-bold text-sm hover:bg-secondary transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                            data-tooltip={t("services.sendQuote")}
                            data-tooltip-position="bottom"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              request_quote
                            </span>
                            {t("services.sendQuote")}
                          </button>
                          <Link
                            href={`/catalog/${service.slug}`}
                            className="shine w-full bg-transparent text-secondary py-2 rounded-full font-bold text-sm hover:bg-secondary/5 transition-colors flex items-center justify-center gap-1 min-h-[40px]"
                            data-tooltip={t("services.details")}
                            data-tooltip-position="bottom"
                          >
                            {t("services.details")}
                            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                )
            )}
          </div>

          {/* Link to official catalog */}
          <div className="mt-10 sm:mt-12 text-center">
            <a
              href="https://www.gov.il/he/departments/units/products_online_catalog_mapi/govil-landing-page"
              target="_blank"
              rel="noopener noreferrer"
              className="shine inline-flex items-center gap-2 text-secondary font-bold hover:text-primary transition-colors px-4 py-2 rounded-lg text-sm sm:text-base"
              data-tooltip={t("services.officialCatalog")}
              data-tooltip-position="bottom"
            >
              <span>{t("services.officialCatalog")}</span>
              <span className="material-symbols-outlined">open_in_new</span>
            </a>
          </div>
        </div>
      </section>

      {/* Prestige Stats Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 dot-pattern opacity-10" aria-hidden="true" />
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 leading-tight">
                {t("stats.title")}
              </h2>
              <p className="text-white/70 text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-xl">
                {t("stats.subtitle")}
              </p>
              <div className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                <div>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-black wow-counter mb-1 sm:mb-2">
                    <WowCounter value={2400000} format="compact" />
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest font-bold text-white/50">
                    {t("stats.queries")}
                  </p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-black wow-counter mb-1 sm:mb-2">
                    <WowCounter value={15000} format="compact" />
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest font-bold text-white/50">
                    {t("stats.professionals")}
                  </p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-black wow-counter mb-1 sm:mb-2">
                    <WowCounter value={97} suffix="%" format="number" />
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest font-bold text-white/50">
                    {t("stats.satisfaction")}
                  </p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-black text-secondary-container mb-1 sm:mb-2">
                    24/7
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest font-bold text-white/50">
                    {t("stats.uptime")}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="aspect-square bg-gradient-to-br from-secondary/20 to-transparent rounded-full flex items-center justify-center p-12 border border-white/5 animate-float">
                <div className="w-full h-full glass-effect rounded-3xl overflow-hidden shadow-2xl relative">
                  <div
                    className="w-full h-full bg-cover bg-center grayscale opacity-60 mix-blend-screen"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=900&q=80")'
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[100px] text-white/20">
                      explore
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-secondary text-white px-6 py-4 rounded-2xl shadow-xl">
                <p className="text-xs font-mono">LAT: 32.0621</p>
                <p className="text-xs font-mono">LON: 34.7748</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GovMap interactive section */}
      <section className="py-16 sm:py-20 md:py-32 bg-surface" aria-labelledby="govmap-heading">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-secondary font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 block">
              GovMap
            </span>
            <h2
              id="govmap-heading"
              className="text-primary text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4"
            >
              {lang === "he" ? "חקור את המפה הלאומית" :
                lang === "en" ? "Explore the National Map" :
                lang === "fr" ? "Explorez la carte nationale" :
                lang === "es" ? "Explora el mapa nacional" :
                lang === "ru" ? "Изучите национальную карту" :
                "استكشف الخريطة الوطنية"}
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              {lang === "he" ? 'גש למידע גיאוגרפי, גוש וחלקה, תצלומי אוויר ושכבות ממשלתיות נוספות - ישירות מתוך הפורטל. מבוסס על GovMap הרשמי של ממשלת ישראל.' :
                lang === "en" ? "Access geographic data, parcels, aerial photos and more government layers - directly from the portal. Powered by official Israel GovMap." :
                lang === "fr" ? "Accédez aux données géographiques, parcelles, photos aériennes et plus de couches gouvernementales - directement depuis le portail. Propulsé par GovMap officiel." :
                lang === "es" ? "Accede a datos geográficos, parcelas, fotos aéreas y más capas gubernamentales - directamente desde el portal. Impulsado por GovMap oficial." :
                lang === "ru" ? "Доступ к географическим данным, участкам, аэрофото и другим государственным слоям прямо из портала. На базе официальной GovMap." :
                "الوصول إلى البيانات الجغرافية والقطع والصور الجوية والمزيد من الطبقات الحكومية - مباشرة من البوابة. مدعوم بـ GovMap الرسمي."}
            </p>
          </div>

          <GovMapEmbed
            mode="cadastre"
            height="480px"
            title="GovMap"
            allowDraw={false}
          />

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: "layers", labelKey: "categories.parcels", href: "/catalog/cadastral-info",
                label: { he: 'גוש וחלקה', en: 'Block & Parcel', fr: 'Bloc & Parcelle', es: 'Bloque y Parcela', ru: 'Блок и участок', ar: 'قطعة وبلوك' } },
              { icon: "photo_camera", labelKey: "categories.aerial", href: "/catalog/aerial-photos",
                label: { he: 'תצלומי אוויר', en: 'Aerial Photos', fr: 'Photos aériennes', es: 'Fotos aéreas', ru: 'Аэрофото', ar: 'صور جوية' } },
              { icon: "terrain", labelKey: "categories.elevation", href: "/catalog?category=orthophoto",
                label: { he: 'מודלי גובה', en: 'Elevation Models', fr: 'Modèles d\'élévation', es: 'Modelos elevación', ru: 'Модели высот', ar: 'نماذج ارتفاع' } },
              { icon: "sensors", labelKey: "categories.cors", href: "/catalog/cors-subscription",
                label: { he: 'תחנות CORS', en: 'CORS Stations', fr: 'Stations CORS', es: 'Estaciones CORS', ru: 'Станции CORS', ar: 'محطات CORS' } }
            ].map((q) => {
              const label = q.label[lang] || q.label.he;
              return (
                <Link
                  key={q.href}
                  href={q.href}
                  className="shine wow-tilt bg-white rounded-2xl p-4 sm:p-5 border border-outline-variant/50 hover:border-secondary/40 hover:shadow-lg transition-all flex flex-col items-center text-center gap-2"
                  data-tooltip={label}
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-secondary text-[28px] sm:text-[32px]">
                    {q.icon}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-primary">
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 sm:py-20 md:py-32 bg-white" aria-labelledby="categories-heading">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop">
          <div className="text-center mb-12 sm:mb-16 md:mb-24">
            <h2 id="categories-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-4">
              {t("categories.title")}
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {categories.map((cat) => {
              const localizedLabel = getCategoryLabel(cat.id, cat.label, lang);
              return (
                <Link
                  key={cat.id}
                  href={`/catalog?category=${cat.id}`}
                  className="shine group flex flex-col items-center p-5 sm:p-6 md:p-10 bg-surface rounded-2xl sm:rounded-3xl hover:bg-primary transition-all duration-300 min-h-[120px] justify-center"
                  data-tooltip={localizedLabel}
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-[28px] sm:text-[32px] md:text-[40px] text-secondary mb-3 sm:mb-4 md:mb-6 group-hover:text-white transition-colors">
                    {cat.icon}
                  </span>
                  <span className="font-bold text-primary group-hover:text-white transition-colors text-xs sm:text-sm md:text-base text-center leading-tight">
                    {localizedLabel}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-surface-container relative">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-primary mb-4 sm:mb-6">
            {t("cta.ready")}
          </h2>
          <p className="text-on-surface-variant text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row-reverse items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/login"
              className="shine shine-glow w-full sm:w-auto bg-primary text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-secondary transition-colors shadow-xl min-h-[48px]"
              data-tooltip={t("cta.loginNational")}
              data-tooltip-position="bottom"
            >
              <span>{t("cta.loginNational")}</span>
              <span className="material-symbols-outlined">login</span>
            </Link>
            <Link
              href="/catalog"
              className="shine text-primary font-bold flex items-center gap-2 hover:text-secondary transition-colors px-3 py-2 rounded-lg min-h-[44px]"
              data-tooltip={t("cta.browseFree")}
              data-tooltip-position="bottom"
            >
              <span>{t("cta.browseFree")}</span>
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Request Modal */}
      <QuoteRequestModal
        service={quoteFor}
        open={!!quoteFor}
        onClose={() => setQuoteFor(null)}
      />
    </>
  );
}

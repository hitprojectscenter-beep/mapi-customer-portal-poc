"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { getSegment } from "@/lib/segments";
import { services, getServiceName, getServiceShortDescription, getServiceCategoryLabel } from "@/lib/data";

export default function SegmentDetailPage() {
  const { t, lang } = useLanguage();
  const params = useParams<{ type: string }>();
  const seg = getSegment(params?.type);
  if (!seg) {
    notFound();
  }

  const relevantServices = services.filter((s) => seg.topServiceSlugs.includes(s.slug)).slice(0, 4);
  // Fallback - if not enough matches in canonical data, pick first 4 in-scope services
  const displayServices = relevantServices.length > 0
    ? relevantServices
    : services.filter((s) => s.inScope).slice(0, 4);

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <div className={`bg-gradient-to-l ${seg.colorClasses.gradient} text-on-surface relative overflow-hidden border-b border-outline-variant/50`}>
        <div className="absolute inset-0 dot-pattern opacity-5" aria-hidden="true" />
        <div className="relative max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-12 md:py-16">
          <nav aria-label={t("nav.skipToContent")} className="text-sm text-on-surface-variant mb-6">
            <ol className="flex flex-row-reverse items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-primary">{t("common.home")}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/segments" className="hover:text-primary">{t("nav.segments")}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-primary font-bold">{t(seg.nameKey)}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-2 text-center lg:text-right">
              <span className={`inline-flex items-center gap-2 ${seg.colorClasses.bg} ${seg.colorClasses.text} px-3 py-1 rounded-full mb-4 border ${seg.colorClasses.border}`}>
                <span className="material-symbols-outlined text-[18px]">{seg.icon}</span>
                <span className="text-xs font-bold tracking-wide">{t("seg.tier")}: {t(seg.tierKey)}</span>
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4">{t(seg.nameKey)}</h1>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
                {t(seg.descKey)}
              </p>
            </div>

            <aside className="bg-white text-on-surface rounded-3xl shadow-2xl p-6 md:p-8 border border-outline-variant/50">
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest text-center mb-4">
                {t("seg.dedicatedContact")}
              </h3>
              <p className="text-xl font-extrabold text-primary text-center mb-2">{seg.contact.role}</p>
              <div className="space-y-3 mt-6">
                <a
                  href={`tel:${seg.contact.phone.replace(/\s.*/, "")}`}
                  className="shine flex items-center justify-center gap-3 bg-surface-container hover:bg-surface-container-high rounded-xl p-3 text-sm font-bold text-primary"
                  data-tooltip={seg.contact.hours}
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-secondary">phone</span>
                  <span>{seg.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${seg.contact.email}`}
                  className="shine flex items-center justify-center gap-3 bg-surface-container hover:bg-surface-container-high rounded-xl p-3 text-sm font-bold text-primary"
                >
                  <span className="material-symbols-outlined text-secondary">mail</span>
                  <span className="truncate">{seg.contact.email}</span>
                </a>
                <p className="text-xs text-on-surface-variant text-center mt-3">{seg.contact.hours}</p>
              </div>
              <Link
                href="/cases/new"
                className="shine shine-glow mt-6 block w-full bg-primary text-white text-center py-3 rounded-full font-bold hover:bg-secondary transition-colors"
                data-tooltip={t("seg.salesContact")}
                data-tooltip-position="bottom"
              >
                {t("seg.bookMeeting")}
              </Link>
            </aside>
          </div>
        </div>
      </div>

      {/* Benefits Strip */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary text-center mb-8">
          {t("seg.benefits")}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seg.defaultDiscountPercent > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-outline-variant/50 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-positive-green/10 text-positive-green rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined">percent</span>
              </div>
              <p className="text-2xl font-black text-positive-green">{seg.defaultDiscountPercent}%</p>
              <p className="text-xs text-on-surface-variant mt-1">{t("seg.discount")}</p>
            </div>
          )}
          <div className="bg-white rounded-2xl p-6 border border-outline-variant/50 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <p className="text-sm font-bold text-primary">{t("seg.priorityChannel")}</p>
          </div>
          {seg.multiYearContracts && (
            <div className="bg-white rounded-2xl p-6 border border-outline-variant/50 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-alert-yellow/10 text-alert-yellow rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined">workspace_premium</span>
              </div>
              <p className="text-sm font-bold text-primary">{t("seg.contractsMulti")}</p>
              <p className="text-xs text-on-surface-variant mt-1">{t("seg.contractsMultiSub")}</p>
            </div>
          )}
          <div className="bg-white rounded-2xl p-6 border border-outline-variant/50 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined">badge</span>
            </div>
            <p className="text-sm font-bold text-primary">{t("seg.dedicatedAccountMgr")}</p>
          </div>
        </div>
      </section>

      {/* Relevant Services */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop pb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary text-center mb-8">
          {t("seg.relevantServices")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map((s) => {
            const localName = getServiceName(s.slug, s.name, lang);
            const localShort = getServiceShortDescription(s.slug, s.shortDescription, lang);
            const localCat = getServiceCategoryLabel(s.slug, s.categoryLabel, lang);
            return (
              <Link
                key={s.slug}
                href={s.inScope ? `/catalog/${s.slug}` : (s.externalUrl || "/catalog")}
                target={s.inScope ? undefined : "_blank"}
                className="shine bg-white rounded-3xl p-6 border border-outline-variant/50 hover:border-secondary/30 hover:shadow-xl transition-all text-center group"
                data-tooltip={localShort}
                data-tooltip-position="bottom"
              >
                <div className="w-14 h-14 bg-secondary/5 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">{s.icon}</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-secondary/70 mb-1">{localCat}</p>
                <h3 className="font-extrabold text-primary mb-2 leading-tight">{localName}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{localShort}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop pb-20">
        <div className="bg-gradient-to-l from-primary to-secondary text-white rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-10" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">{t("seg.requestProposal")}</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">{t("home.salesTeam")}</p>
            <div className="flex flex-col sm:flex-row-reverse gap-3 justify-center">
              <Link
                href="/catalog"
                className="shine shine-glow inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-secondary-container transition-colors"
              >
                <span>{t("nav.catalog")}</span>
                <span className="material-symbols-outlined">arrow_back</span>
              </Link>
              <Link
                href="/cases/new"
                className="shine inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors"
              >
                <span className="material-symbols-outlined">support_agent</span>
                <span>{t("seg.talkToSales")}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

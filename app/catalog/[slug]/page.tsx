"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { services, getServiceName, getServiceShortDescription, getServiceCategoryLabel, getServiceDeliveryDays } from "@/lib/data";
import GovMapEmbed from "@/components/GovMapEmbed";
import { useLanguage } from "@/lib/LanguageContext";

// Service categories where a map preview adds value
const MAP_RELEVANT_CATEGORIES = ["maps", "cadastre", "orthophoto", "gis", "geodesy"];

export default function ServiceDetailPage() {
  const { t, lang } = useLanguage();
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  const localName = getServiceName(service.slug, service.name, lang);
  const localDesc = getServiceShortDescription(service.slug, service.description, lang);
  const localCategory = getServiceCategoryLabel(service.slug, service.categoryLabel, lang);
  const localDelivery = getServiceDeliveryDays(service.slug, service.deliveryDays, lang);

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-l from-primary to-tertiary text-white">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10 md:py-14">
          <nav aria-label={t("nav.skipToContent")} className="text-sm text-white/70 mb-6">
            <ol className="flex flex-row-reverse items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-white">{t("common.home")}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/catalog" className="hover:text-white">{t("svc.catalogCrumb")}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-bold">{localName}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-2 text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full mb-4 text-white/90 border border-white/10">
                <span className="text-xs font-bold tracking-wide">{localCategory}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{localName}</h1>
              <p className="text-white/80 text-lg leading-relaxed mb-6">{localDesc}</p>
              <div className="flex flex-wrap gap-3">
                {service.features.map((f, i) => (
                  <span
                    key={i}
                    className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-secondary-container text-[18px]">
                      check_circle
                    </span>
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <aside className="bg-white text-on-surface rounded-3xl shadow-2xl p-6 md:p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="text-center">
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest">{t("services.fromPrice")}</p>
                  <p className="text-3xl font-black text-secondary">
                    ₪{service.priceFrom.toLocaleString()}
                    <span className="text-base font-normal text-on-surface-variant mr-1">
                      {service.priceUnit === "₪/חודש" ? "/חודש" : ""}
                    </span>
                  </p>
                </div>
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[32px]">{service.icon}</span>
                </div>
              </div>

              <div className="bg-surface-container rounded-2xl p-4 mb-6 text-center">
                <p className="text-xs text-on-surface-variant mb-1">{t("svc.deliveryTime")}</p>
                <p className="font-bold text-primary">{localDelivery}</p>
              </div>

              {service.inScope ? (
                <Link
                  href={`/order/${service.slug}`}
                  className="shine shine-glow block w-full bg-primary text-white text-center py-4 rounded-full font-bold hover:bg-secondary transition-colors text-lg"
                  data-tooltip={t("svc.startOrderTip")}
                  data-tooltip-position="bottom"
                >
                  {t("svc.startOrder")}
                </Link>
              ) : (
                <a
                  href={service.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine block w-full bg-alert-yellow text-white text-center py-4 rounded-full font-bold hover:bg-alert-yellow/90 transition-colors text-lg flex items-center justify-center gap-2"
                  data-tooltip={t("svc.openGovformsTip")}
                  data-tooltip-position="bottom"
                >
                  <span>{t("svc.openGovforms")}</span>
                  <span className="material-symbols-outlined">open_in_new</span>
                </a>
              )}

              <p className="text-xs text-on-surface-variant text-center mt-4">
                {t("svc.securityNote")}
                <br />{t("svc.paymentNote")}
              </p>
            </aside>
          </div>
        </div>
      </div>

      {/* GovMap preview for geo-relevant services */}
      {MAP_RELEVANT_CATEGORIES.includes(service.category) && (
        <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-12">
          <div className="text-center mb-6">
            <span className="text-secondary font-bold text-sm tracking-[0.2em] uppercase mb-2 block">
              {t("svc.exploreEyebrow")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">
              {t("svc.exploreMap")}
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base mt-2 max-w-2xl mx-auto">
              {t("svc.exploreMapSub")}
            </p>
          </div>
          <GovMapEmbed
            mode={
              service.category === "cadastre" ? "cadastre" :
              service.category === "orthophoto" ? "ortho" :
              service.category === "geodesy" ? "cors" : "default"
            }
            height="420px"
            title={localName}
            allowDraw={false}
          />
        </section>
      )}

      {/* Price Table */}
      {service.priceTable && service.priceTable.length > 0 && (
        <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-16">
          <div className="text-center mb-8">
            <span className="text-secondary font-bold text-sm tracking-[0.2em] uppercase mb-2 block">
              {t("svc.pricesEyebrow")}
            </span>
            <h2 className="text-3xl font-extrabold text-primary">{t("svc.pricesTitle")}</h2>
          </div>
          <div className="bg-white rounded-3xl border border-outline-variant/50 overflow-hidden shadow-sm">
            <table className="w-full text-center">
              <thead className="bg-surface-container">
                <tr>
                  <th className="px-6 py-4 font-bold text-primary">{service.priceTable[0].with !== undefined ? (service.slug === "custom-map" ? t("svc.mapSize") : t("svc.path")) : t("svc.path")}</th>
                  {service.priceTable[0].with !== undefined ? (
                    <>
                      <th className="px-6 py-4 font-bold text-primary text-center">{t("svc.without")}</th>
                      <th className="px-6 py-4 font-bold text-primary text-center">{t("svc.with")}</th>
                    </>
                  ) : (
                    <th className="px-6 py-4 font-bold text-primary text-center">{t("svc.price")}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {service.priceTable.map((row, i) => (
                  <tr key={i} className="border-t border-outline-variant/50 hover:bg-surface-container/50">
                    <td className="px-6 py-4 font-medium">{row.label}</td>
                    {row.with !== undefined ? (
                      <>
                        <td className="px-6 py-4 text-center text-on-surface-variant">
                          ₪{row.without.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-secondary">
                          ₪{row.with.toLocaleString()}
                        </td>
                      </>
                    ) : (
                      <td className="px-6 py-4 text-center font-bold text-secondary">
                        ₪{row.without.toLocaleString()}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faq && service.faq.length > 0 && (
        <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-16 bg-white">
          <div className="text-center mb-8">
            <span className="text-secondary font-bold text-sm tracking-[0.2em] uppercase mb-2 block">
              {t("svc.faqEyebrow")}
            </span>
            <h2 className="text-3xl font-extrabold text-primary">{t("svc.faqTitle")}</h2>
          </div>
          <div className="space-y-4">
            {service.faq.map((item, i) => (
              <details
                key={i}
                className="bg-surface rounded-2xl p-6 border border-outline-variant/50 group"
              >
                <summary className="font-bold text-primary cursor-pointer flex items-center justify-between flex-row-reverse">
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                  <span className="text-center">{item.q}</span>
                </summary>
                <p className="text-on-surface-variant mt-4 text-center leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary-container/5 py-16">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop">
          <div className="bg-gradient-to-l from-primary to-secondary rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 dot-pattern opacity-10" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
                {t("svc.ctaReady")}
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                {t("svc.ctaSub")}
              </p>
              {service.inScope ? (
                <Link
                  href={`/order/${service.slug}`}
                  className="shine shine-glow inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-secondary-container transition-colors"
                  data-tooltip={t("svc.startNowTip")}
                  data-tooltip-position="bottom"
                >
                  <span>{t("svc.startNow")}</span>
                  <span className="material-symbols-outlined">arrow_back</span>
                </Link>
              ) : (
                <a
                  href={service.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine inline-flex items-center gap-2 bg-alert-yellow text-white px-8 py-4 rounded-full font-bold hover:bg-alert-yellow/90 transition-colors"
                  data-tooltip={t("svc.openGovformsTip")}
                  data-tooltip-position="bottom"
                >
                  <span>{t("svc.openGovforms")}</span>
                  <span className="material-symbols-outlined">open_in_new</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

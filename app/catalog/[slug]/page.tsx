"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  services, getServiceName, getServiceShortDescription,
  getServiceCategoryLabel, getServiceDeliveryDays
} from "@/lib/data";
import GovMapEmbed from "@/components/GovMapEmbed";
import ReviewsSection from "@/components/ReviewsSection";
import RelatedProducts from "@/components/RelatedProducts";
import StarRating from "@/components/StarRating";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { useRecentlyViewed } from "@/lib/useRecentlyViewed";
import { getRatingSummary } from "@/lib/reviews";

const MAP_RELEVANT = ["maps", "cadastre", "orthophoto", "gis", "geodesy"];

type TabKey = "desc" | "specs" | "delivery" | "reviews";

export default function ServiceDetailPage() {
  const { t, lang } = useLanguage();
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const service = services.find((s) => s.slug === slug);

  const cart = useCart();
  const wish = useWishlist();
  const { slugs: recent, track } = useRecentlyViewed();

  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<TabKey>("desc");
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    if (service) {
      track(service.slug);
      document.title = `${getServiceName(service.slug, service.name, lang)} · מפ"י`;
    }
  }, [service, lang, track]);

  if (!service) {
    notFound();
  }

  const localName = getServiceName(service.slug, service.name, lang);
  const localDesc = getServiceShortDescription(service.slug, service.description, lang);
  const localCategory = getServiceCategoryLabel(service.slug, service.categoryLabel, lang);
  const localDelivery = getServiceDeliveryDays(service.slug, service.deliveryDays, lang);
  const rating = getRatingSummary(service.slug);
  const isWished = wish.has(service.slug);

  const handleAdd = () => {
    cart.add(service, { quantity: qty });
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2500);
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* Slim breadcrumb (SFCC PDP style) */}
      <div className="bg-white border-b border-outline-variant/50">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-3">
          <nav aria-label={t("nav.skipToContent")} className="text-xs text-on-surface-variant">
            <ol className="flex flex-row-reverse items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-secondary">{t("common.home")}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/catalog" className="hover:text-secondary">{t("svc.catalogCrumb")}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/catalog?category=${service.category}`} className="hover:text-secondary">{localCategory}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-primary font-semibold truncate">{localName}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main PDP: Gallery left / Info right (SFCC hero layout) */}
      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-8">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12">
          {/* Gallery */}
          <section aria-label="Product Gallery">
            {/* Main image (icon-based, SFCC-style large tile) */}
            <div className="relative aspect-square bg-gradient-to-br from-secondary/5 via-white to-primary/5 rounded-2xl border border-outline-variant/40 flex items-center justify-center overflow-hidden">
              <div className="absolute top-4 start-4 z-10 flex flex-col gap-2">
                {!service.inScope && (
                  <span className="bg-alert-yellow/95 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    govforms
                  </span>
                )}
                {rating.average >= 4.5 && (
                  <span className="bg-positive-green/95 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    ★ {t("services.recommended")}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => wish.toggle(service.slug)}
                className={`shine absolute top-4 end-4 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all backdrop-blur-sm ${
                  isWished
                    ? "bg-error-red text-white shadow-lg scale-105"
                    : "bg-white/90 text-primary hover:bg-white hover:scale-110 shadow-md"
                }`}
                aria-label={isWished ? t("wish.aria.remove") : t("wish.aria.add")}
                data-tooltip={isWished ? t("wish.aria.remove") : t("wish.aria.add")}
                data-tooltip-position="bottom"
              >
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: isWished ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>

              <div className="w-40 h-40 lg:w-56 lg:h-56 bg-white shadow-2xl rounded-3xl flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined" style={{ fontSize: "min(120px, 30vw)" }}>{service.icon}</span>
              </div>
            </div>

            {/* Thumbnails row (feature icons as thumbnails) */}
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {["photo_camera", "map", "layers", "verified"].map((icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="shine flex-shrink-0 w-20 h-20 bg-white border border-outline-variant hover:border-secondary rounded-xl flex items-center justify-center text-secondary transition-colors"
                  aria-label={`${t("svc.gallery.thumbnail")} ${i + 1}`}
                >
                  <span className="material-symbols-outlined text-[28px]">{i === 0 ? service.icon : icon}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Info Panel */}
          <section aria-labelledby="product-title">
            <p className="text-xs uppercase tracking-widest font-semibold text-secondary mb-2">
              {localCategory}
            </p>
            <h1 id="product-title" className="text-2xl lg:text-3xl font-bold text-primary leading-tight mb-3">
              {localName}
            </h1>

            {/* Rating + reviews link */}
            {rating.count > 0 && (
              <button
                type="button"
                onClick={() => {
                  setTab("reviews");
                  document.getElementById("pdp-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="flex items-center gap-2 mb-4 shine px-2 py-1 rounded hover:bg-surface-container/50"
              >
                <StarRating value={rating.average} size="md" showValue />
                <span className="text-sm text-secondary hover:underline font-medium">
                  ({rating.count} {t("review.title").toLowerCase()})
                </span>
              </button>
            )}

            <p className="text-base text-on-surface-variant leading-relaxed mb-6 font-light">
              {localDesc}
            </p>

            {/* SKU + Stock line */}
            <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-6 pb-6 border-b border-outline-variant">
              <span>
                <span className="font-semibold">{t("svc.sku")}:</span> {service.slug.toUpperCase()}
              </span>
              {service.inScope && (
                <span className="text-positive-green font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 bg-positive-green rounded-full inline-block" />
                  {t("svc.inStock")}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">
                {t("services.fromPrice")}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-primary" dir="ltr">
                  {service.priceUnit === "₪/חודש"
                    ? `${service.priceFrom.toLocaleString()} ${service.priceUnit}`
                    : `${service.priceUnit}${service.priceFrom.toLocaleString()}`}
                </p>
                {service.priceTo && service.priceTo > service.priceFrom && (
                  <p className="text-sm text-on-surface-variant line-through" dir="ltr">
                    {service.priceUnit}{service.priceTo.toLocaleString()}
                  </p>
                )}
              </div>
              <p className="text-[11px] text-on-surface-variant mt-1 font-light">
                {t("of.includesVat")} · {t("svc.perMonth") === "/month" ? "" : ""}
              </p>
            </div>

            {/* Delivery info card */}
            <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/20 mb-6">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-[24px]">local_shipping</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-primary">{t("svc.deliveryFast")}</p>
                  <p className="text-xs text-on-surface-variant font-light mt-0.5">{localDelivery}</p>
                </div>
              </div>
            </div>

            {/* Quantity + Add-to-Cart or Govforms */}
            {service.inScope ? (
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <label htmlFor="qty" className="text-sm font-semibold text-primary">
                    {t("svc.quantity")}:
                  </label>
                  <div className="inline-flex items-center border border-outline-variant rounded-full overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 h-10 hover:bg-surface-container flex items-center justify-center text-primary"
                      aria-label={t("cart.decrease")}
                    >−</button>
                    <input
                      id="qty"
                      type="number"
                      min={1}
                      max={99}
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
                      className="w-14 text-center bg-transparent border-0 focus:ring-0 focus:outline-none font-bold text-primary"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setQty(Math.min(99, qty + 1))}
                      className="w-10 h-10 hover:bg-surface-container flex items-center justify-center text-primary"
                      aria-label={t("cart.increase")}
                    >+</button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className={`shine shine-glow flex-1 text-white px-6 py-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 min-h-[54px] ${
                      showAdded ? "bg-positive-green" : "bg-primary hover:bg-secondary"
                    }`}
                  >
                    <span className="material-symbols-outlined">
                      {showAdded ? "check_circle" : "add_shopping_cart"}
                    </span>
                    <span>{showAdded ? t("svc.addedToCart") : t("svc.addToCart")}</span>
                  </button>
                  <Link
                    href={`/order/${service.slug}`}
                    className="shine bg-white border border-primary text-primary hover:bg-primary hover:text-white px-6 py-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 min-h-[54px]"
                    data-tooltip={t("svc.startOrder")}
                    data-tooltip-position="bottom"
                  >
                    <span className="material-symbols-outlined">bolt</span>
                    <span className="hidden sm:inline">{t("svc.startOrder")}</span>
                  </Link>
                </div>
              </div>
            ) : (
              <a
                href={service.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shine block w-full bg-alert-yellow text-white text-center py-4 rounded-full font-semibold hover:bg-alert-yellow/90 transition-colors flex items-center justify-center gap-2 mb-6"
                data-tooltip={t("svc.openGovformsTip")}
                data-tooltip-position="bottom"
              >
                <span>{t("svc.openGovforms")}</span>
                <span className="material-symbols-outlined">open_in_new</span>
              </a>
            )}

            {/* Trust badges strip */}
            <div className="grid grid-cols-4 gap-3 pt-4 border-t border-outline-variant">
              {[
                { icon: "shield", label: t("trust.security") },
                { icon: "verified", label: t("trust.national") },
                { icon: "lock", label: t("svc.securePayment") },
                { icon: "support_agent", label: t("trust.support") }
              ].map((b, i) => (
                <div key={i} className="text-center">
                  <span className="material-symbols-outlined text-secondary text-[24px]">{b.icon}</span>
                  <p className="text-[10px] text-on-surface-variant mt-1 font-light leading-tight">{b.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Tabs section (SFCC PDP standard) */}
      <div id="pdp-tabs" className="bg-white border-y border-outline-variant/50">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop">
          <nav className="flex gap-1 overflow-x-auto -mb-px" role="tablist">
            {([
              ["desc", "svc.tabs.desc", "description"],
              ["specs", "svc.tabs.specs", "list_alt"],
              ["delivery", "svc.tabs.delivery", "local_shipping"],
              ["reviews", "svc.tabs.reviews", "reviews"]
            ] as const).map(([key, tKey, icon]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`px-4 md:px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                  tab === key
                    ? "border-primary text-primary"
                    : "border-transparent text-on-surface-variant hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{icon}</span>
                <span>{t(tKey)}</span>
                {key === "reviews" && rating.count > 0 && (
                  <span className="bg-surface-container text-primary text-[10px] font-bold rounded-full px-2 py-0.5">
                    {rating.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-8">
        {tab === "desc" && (
          <div className="prose prose-sm max-w-none">
            <p className="text-base text-on-surface leading-relaxed font-light">{localDesc}</p>
            {service.features.length > 0 && (
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {service.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-surface-container/30 rounded-xl p-4"
                  >
                    <span className="material-symbols-outlined text-positive-green flex-shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span className="text-sm text-primary">{f}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "specs" && (
          <div>
            {/* Price table if exists */}
            {service.priceTable && service.priceTable.length > 0 ? (
              <div className="bg-white rounded-xl border border-outline-variant/50 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-4 py-3 text-start">
                        {service.priceTable[0].with !== undefined ? t("svc.mapSize") : t("svc.path")}
                      </th>
                      {service.priceTable[0].with !== undefined ? (
                        <>
                          <th className="px-4 py-3 text-center">{t("svc.without")}</th>
                          <th className="px-4 py-3 text-center">{t("svc.with")}</th>
                        </>
                      ) : (
                        <th className="px-4 py-3 text-center">{t("svc.price")}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {service.priceTable.map((row, i) => (
                      <tr key={i} className={`border-t border-outline-variant/40 ${i % 2 === 0 ? "bg-white" : "bg-surface-container/30"}`}>
                        <td className="px-4 py-3 font-medium">{row.label}</td>
                        {row.with !== undefined ? (
                          <>
                            <td className="px-4 py-3 text-center text-on-surface-variant" dir="ltr">
                              ₪{row.without.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-center font-bold text-secondary" dir="ltr">
                              ₪{row.with.toLocaleString()}
                            </td>
                          </>
                        ) : (
                          <td className="px-4 py-3 text-center font-bold text-secondary" dir="ltr">
                            ₪{row.without.toLocaleString()}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-on-surface-variant font-light">—</p>
            )}
          </div>
        )}

        {tab === "delivery" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 border border-outline-variant/50">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-secondary text-[32px]">local_shipping</span>
                <h3 className="font-bold text-primary">{t("svc.tabs.delivery")}</h3>
              </div>
              <p className="text-sm text-on-surface-variant font-light">{localDelivery}</p>
              <p className="text-sm text-on-surface-variant font-light mt-2">
                {t("svc.deliveryFast")} · {t("cart.page.free")}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-outline-variant/50">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-secondary text-[32px]">verified_user</span>
                <h3 className="font-bold text-primary">{t("svc.satisfaction")}</h3>
              </div>
              <p className="text-sm text-on-surface-variant font-light">{t("trust.gdpr")}</p>
              <p className="text-sm text-on-surface-variant font-light mt-2">{t("trust.support")}</p>
            </div>
          </div>
        )}

        {tab === "reviews" && (
          <ReviewsSection slug={service.slug} />
        )}
      </div>

      {/* GovMap Preview (keeps existing MAPI functionality) */}
      {MAP_RELEVANT.includes(service.category) && (
        <section className="bg-white border-t border-outline-variant/50 py-10">
          <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop">
            <div className="text-center mb-5">
              <span className="text-secondary font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">
                {t("svc.exploreEyebrow")}
              </span>
              <h2 className="text-2xl font-bold text-primary">{t("svc.exploreMap")}</h2>
              <p className="text-sm text-on-surface-variant mt-2 max-w-2xl mx-auto font-light">
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
          </div>
        </section>
      )}

      {/* FAQ if exists */}
      {service.faq && service.faq.length > 0 && (
        <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
          <div className="text-center mb-6">
            <span className="text-secondary font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">
              {t("svc.faqEyebrow")}
            </span>
            <h2 className="text-2xl font-bold text-primary">{t("svc.faqTitle")}</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {service.faq.map((item, i) => (
              <details
                key={i}
                className="bg-white rounded-xl p-5 border border-outline-variant/50 group open:shadow-md transition-shadow"
              >
                <summary className="font-semibold text-primary cursor-pointer flex items-center justify-between">
                  <span>{item.q}</span>
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <p className="text-sm text-on-surface-variant mt-3 leading-relaxed font-light">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* You may also like (SFCC signature) */}
      <RelatedProducts currentSlug={service.slug} category={service.category} />

      {/* Recently viewed */}
      {recent.filter(s => s !== service.slug).length > 0 && (
        <RelatedProducts
          currentSlug={service.slug}
          title={t("svc.recentTitle")}
          subtitle=""
          limit={4}
        />
      )}
    </div>
  );
}

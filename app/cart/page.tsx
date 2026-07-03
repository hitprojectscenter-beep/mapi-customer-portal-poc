"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { useLanguage } from "@/lib/LanguageContext";
import { getServiceName } from "@/lib/serviceTranslations";

export default function CartPage() {
  const { t, lang } = useLanguage();
  const cart = useCart();
  const [promo, setPromo] = useState("");

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-gradient-to-l from-primary to-tertiary text-white">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
          <nav aria-label={t("nav.skipToContent")} className="text-sm text-white/70 mb-3">
            <ol className="flex flex-row-reverse items-center gap-2">
              <li><Link href="/" className="hover:text-white">{t("common.home")}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold">{t("cart.page.title")}</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <span className="material-symbols-outlined text-[36px]">shopping_bag</span>
            <span>{t("cart.page.title")}</span>
            {cart.itemCount > 0 && (
              <span className="text-white/70 text-lg font-light">({cart.itemCount})</span>
            )}
          </h1>
          <p className="text-white/80 font-light mt-2">{t("cart.page.subtitle")}</p>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
        {cart.lines.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-outline-variant/50">
            <div className="w-32 h-32 bg-surface-container rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="material-symbols-outlined text-[72px] text-on-surface-variant">shopping_bag</span>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">{t("cart.empty.title")}</h2>
            <p className="text-on-surface-variant mb-8 font-light">{t("cart.page.emptyAction")}</p>
            <Link
              href="/catalog"
              className="shine shine-glow inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-secondary transition-colors"
            >
              <span className="material-symbols-outlined">explore</span>
              {t("cart.empty.browse")}
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart lines */}
            <section className="lg:col-span-2 bg-white rounded-2xl border border-outline-variant/50 overflow-hidden">
              <header className="px-6 py-4 border-b border-outline-variant/50 flex items-center justify-between">
                <h2 className="text-lg font-bold text-primary">{cart.itemCount} {t("orders.found")}</h2>
                <button
                  type="button"
                  onClick={cart.clear}
                  className="text-sm text-error-red hover:underline font-medium"
                >
                  {t("wish.removeAll")}
                </button>
              </header>
              <ul className="divide-y divide-outline-variant/40" role="list">
                {cart.lines.map(line => {
                  const localName = getServiceName(line.slug, line.name, lang);
                  return (
                    <li key={`${line.slug}-${line.variant || ""}`} className="p-4 md:p-6 hover:bg-surface-container/20 transition-colors">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl flex items-center justify-center">
                          <span className="material-symbols-outlined text-secondary text-[36px]">{line.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <Link
                              href={`/catalog/${line.slug}`}
                              className="font-bold text-primary hover:text-secondary transition-colors"
                            >
                              {localName}
                            </Link>
                            <button
                              type="button"
                              onClick={() => cart.remove(line.slug, line.variant)}
                              className="text-on-surface-variant hover:text-error-red transition-colors"
                              aria-label={t("cart.remove")}
                            >
                              <span className="material-symbols-outlined">delete</span>
                            </button>
                          </div>
                          {line.variant && (
                            <p className="text-xs text-on-surface-variant mb-2">{line.variant}</p>
                          )}
                          <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-on-surface-variant">{t("cart.page.qty")}:</span>
                              <div className="inline-flex items-center border border-outline-variant rounded-full overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => cart.updateQty(line.slug, line.quantity - 1, line.variant)}
                                  className="w-8 h-8 hover:bg-surface-container flex items-center justify-center text-primary"
                                  aria-label={t("cart.decrease")}
                                >−</button>
                                <span className="w-10 text-center font-bold" dir="ltr">{line.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => cart.updateQty(line.slug, line.quantity + 1, line.variant)}
                                  className="w-8 h-8 hover:bg-surface-container flex items-center justify-center text-primary"
                                  aria-label={t("cart.increase")}
                                >+</button>
                              </div>
                            </div>
                            <div className="text-end">
                              <p className="text-xs text-on-surface-variant">{t("cart.page.unitPrice")}: ₪{line.unitPrice.toLocaleString()}</p>
                              <p className="text-lg font-bold text-primary" dir="ltr">
                                {line.priceUnit === "₪/חודש"
                                  ? `${(line.unitPrice * line.quantity).toLocaleString()} ${line.priceUnit}`
                                  : `₪${(line.unitPrice * line.quantity).toLocaleString()}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Summary sidebar */}
            <aside className="bg-white rounded-2xl border border-outline-variant/50 p-6 h-fit sticky top-44">
              <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">receipt_long</span>
                {t("cart.page.orderSummary")}
              </h2>

              {/* Promo code */}
              <div className="mb-4 pb-4 border-b border-outline-variant/50">
                <label htmlFor="promo" className="block text-xs font-semibold text-primary mb-2">
                  {t("cart.page.promoCode")}
                </label>
                <div className="flex gap-2">
                  <input
                    id="promo"
                    type="text"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="MAPI15"
                    aria-label="קוד קופון"
                    className="flex-1 bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    className="shine bg-secondary/10 hover:bg-secondary hover:text-white text-secondary px-4 rounded-lg text-sm font-semibold"
                  >
                    {t("cart.page.applyPromo")}
                  </button>
                </div>
              </div>

              <dl className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <dt className="text-on-surface-variant">{t("cart.subtotal")}</dt>
                  <dd className="font-semibold" dir="ltr">₪{cart.subtotal.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-on-surface-variant">{t("cart.page.shipping")}</dt>
                  <dd className="font-semibold text-positive-green">{t("cart.page.free")}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-on-surface-variant">{t("cart.tax")}</dt>
                  <dd className="font-semibold" dir="ltr">₪{cart.taxTotal.toLocaleString()}</dd>
                </div>
              </dl>

              <div className="flex justify-between items-baseline pt-4 border-t-2 border-primary mb-6">
                <dt className="font-bold text-primary">{t("cart.total")}</dt>
                <dd className="text-2xl font-bold text-primary" dir="ltr">₪{cart.grandTotal.toLocaleString()}</dd>
              </div>

              <Link
                href="/dashboard?checkout=true"
                className="shine shine-glow block w-full bg-primary text-white text-center py-4 rounded-full font-semibold hover:bg-secondary transition-colors mb-3"
              >
                <span className="material-symbols-outlined align-middle me-2">lock</span>
                {t("cart.page.proceedCheckout")}
              </Link>

              <p className="text-[11px] text-center text-on-surface-variant font-light">
                🔒 {t("cart.page.secure")}
              </p>

              <div className="mt-6 pt-6 border-t border-outline-variant/50">
                <div className="grid grid-cols-2 gap-2 text-[10px] text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-positive-green text-[16px]">check_circle</span>
                    {t("svc.securePayment")}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-positive-green text-[16px]">check_circle</span>
                    {t("svc.satisfaction")}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-positive-green text-[16px]">check_circle</span>
                    {t("trust.national")}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-positive-green text-[16px]">check_circle</span>
                    {t("trust.gdpr")}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

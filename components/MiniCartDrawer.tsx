"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import { useLanguage } from "@/lib/LanguageContext";
import { getServiceName } from "@/lib/serviceTranslations";

export default function MiniCartDrawer() {
  const { t, lang } = useLanguage();
  const cart = useCart();

  useEffect(() => {
    if (!cart.isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") cart.close(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [cart]);

  if (!cart.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300]" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-primary/60 backdrop-blur-sm animate-fade-in"
        onClick={cart.close}
        aria-hidden="true"
      />
      <aside
        style={{ paddingBottom: "var(--safe-bottom)", paddingTop: "var(--safe-top)" }}
        className="absolute inset-y-0 start-0 w-full sm:w-[420px] bg-white shadow-2xl flex flex-col animate-slide-in-left"
      >
        <header className="flex items-center justify-between px-5 py-4 border-b border-outline-variant">
          <button
            type="button"
            onClick={cart.close}
            className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center shine"
            aria-label={t("cart.close")}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span>{t("cart.mini.title")}</span>
            <span className="bg-secondary text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[24px] text-center">
              {cart.itemCount}
            </span>
          </h2>
        </header>

        {cart.lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant">shopping_bag</span>
            </div>
            <p className="font-bold text-primary mb-2">{t("cart.empty.title")}</p>
            <p className="text-sm text-on-surface-variant mb-6">{t("cart.empty.sub")}</p>
            <Link
              href="/catalog"
              onClick={cart.close}
              className="shine shine-glow bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-secondary transition-colors"
            >
              {t("cart.empty.browse")}
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-outline-variant/40" role="list">
              {cart.lines.map(line => {
                const localName = getServiceName(line.slug, line.name, lang);
                return (
                  <li key={`${line.slug}-${line.variant || ""}`} className="p-4 hover:bg-surface-container/30 transition-colors">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 flex-shrink-0 bg-secondary/5 text-secondary rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-[28px]">{line.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/catalog/${line.slug}`}
                          onClick={cart.close}
                          className="font-semibold text-primary text-sm hover:text-secondary block truncate"
                        >
                          {localName}
                        </Link>
                        {line.variant && (
                          <p className="text-xs text-on-surface-variant mt-0.5">{line.variant}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => cart.updateQty(line.slug, line.quantity - 1, line.variant)}
                              className="w-7 h-7 rounded-lg border border-outline-variant hover:bg-secondary hover:text-white hover:border-secondary flex items-center justify-center text-sm"
                              aria-label={t("cart.decrease")}
                            >−</button>
                            <span className="text-sm font-bold text-primary w-8 text-center" dir="ltr">{line.quantity}</span>
                            <button
                              type="button"
                              onClick={() => cart.updateQty(line.slug, line.quantity + 1, line.variant)}
                              className="w-7 h-7 rounded-lg border border-outline-variant hover:bg-secondary hover:text-white hover:border-secondary flex items-center justify-center text-sm"
                              aria-label={t("cart.increase")}
                            >+</button>
                          </div>
                          <div className="text-end">
                            <p className="text-sm font-bold text-primary" dir="ltr">
                              {line.priceUnit === "₪/חודש"
                                ? `${(line.unitPrice * line.quantity).toLocaleString()} ${line.priceUnit}`
                                : `${line.priceUnit}${(line.unitPrice * line.quantity).toLocaleString()}`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => cart.remove(line.slug, line.variant)}
                        className="text-on-surface-variant hover:text-error-red transition-colors self-start"
                        aria-label={t("cart.remove")}
                      >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-outline-variant p-5 bg-surface-container/30">
              <dl className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-on-surface-variant">{t("cart.subtotal")}</dt>
                  <dd className="font-semibold" dir="ltr">₪{cart.subtotal.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-on-surface-variant">{t("cart.tax")}</dt>
                  <dd className="font-semibold" dir="ltr">₪{cart.taxTotal.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between pt-2 border-t border-outline-variant/50">
                  <dt className="font-bold text-primary">{t("cart.total")}</dt>
                  <dd className="font-bold text-lg text-primary" dir="ltr">₪{cart.grandTotal.toLocaleString()}</dd>
                </div>
              </dl>
              <Link
                href="/cart"
                onClick={cart.close}
                className="shine shine-glow block w-full bg-primary text-white text-center py-3 rounded-full font-medium hover:bg-secondary transition-colors mb-2"
              >
                {t("cart.checkout")}
              </Link>
              <button
                type="button"
                onClick={cart.close}
                className="w-full text-primary py-2 rounded-full font-medium hover:bg-surface-container transition-colors text-sm"
              >
                {t("cart.continue")}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import type { TKey } from "@/lib/i18n";

interface FaqGroup {
  categoryKey: TKey;
  icon: string;
  items: Array<{ qKey: TKey; aKey: TKey }>;
}

const faqs: FaqGroup[] = [
  {
    categoryKey: "help.faqCategoryAuth",
    icon: "lock",
    items: [
      { qKey: "faq.auth.q1", aKey: "faq.auth.a1" },
      { qKey: "faq.auth.q2", aKey: "faq.auth.a2" },
      { qKey: "faq.auth.q3", aKey: "faq.auth.a3" }
    ]
  },
  {
    categoryKey: "help.faqCategoryOrders",
    icon: "shopping_cart",
    items: [
      { qKey: "faq.ord.q1", aKey: "faq.ord.a1" },
      { qKey: "faq.ord.q2", aKey: "faq.ord.a2" },
      { qKey: "faq.ord.q3", aKey: "faq.ord.a3" },
      { qKey: "faq.ord.q4", aKey: "faq.ord.a4" }
    ]
  },
  {
    categoryKey: "help.faqCategoryProfessional",
    icon: "engineering",
    items: [
      { qKey: "faq.pro.q1", aKey: "faq.pro.a1" },
      { qKey: "faq.pro.q2", aKey: "faq.pro.a2" },
      { qKey: "faq.pro.q3", aKey: "faq.pro.a3" }
    ]
  },
  {
    categoryKey: "help.faqCategoryTechnical",
    icon: "settings",
    items: [
      { qKey: "faq.tech.q1", aKey: "faq.tech.a1" },
      { qKey: "faq.tech.q2", aKey: "faq.tech.a2" },
      { qKey: "faq.tech.q3", aKey: "faq.tech.a3" }
    ]
  }
];

export default function HelpPage() {
  const { t } = useLanguage();
  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-l from-primary to-tertiary text-white">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-12 md:py-16">
          <nav aria-label={t("nav.skipToContent")} className="text-sm text-white/70 mb-4">
            <ol className="flex flex-row-reverse items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">{t("common.home")}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-bold">{t("help.title")}</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-center">{t("help.title")}</h1>
          <p className="text-white/80 text-lg max-w-2xl text-center mb-8">
            {t("help.subtitle")}
          </p>

          <form
            role="search"
            action="/help"
            method="get"
            className="max-w-2xl"
          >
            <div className="glass-effect p-2 rounded-2xl flex flex-row-reverse items-center shadow-2xl">
              <label htmlFor="help-search" className="sr-only">{t("help.search")}</label>
              <input
                id="help-search"
                name="q"
                type="search"
                placeholder={t("help.searchPlaceholder")}
                className="bg-transparent border-none focus:ring-0 focus:outline-none text-white placeholder:text-white/50 text-center flex-grow px-4 py-3 text-base"
              />
              <button
                type="submit"
                className="shine bg-white text-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary-container transition-all"
                data-tooltip={t("help.searchTip")}
                data-tooltip-position="bottom"
              >
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Quick Contact */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: "phone",
              title: t("help.callCenter"),
              desc: t("help.callNumber"),
              href: "tel:*6274",
              tip: t("help.callTip")
            },
            {
              icon: "mail",
              title: t("help.email"),
              desc: "service@mapi.gov.il",
              href: "mailto:service@mapi.gov.il",
              tip: t("help.emailTip")
            },
            {
              icon: "support_agent",
              title: t("help.openCase"),
              desc: t("help.openCaseSub"),
              href: "/cases/new",
              tip: t("help.caseTip")
            }
          ].map((c, i) => {
            const isExternal = c.href.startsWith("tel:") || c.href.startsWith("mailto:");
            const cls =
              "shine bg-white rounded-3xl p-6 border border-outline-variant/50 hover:shadow-xl transition-all hover:-translate-y-0.5 flex flex-row-reverse items-center gap-4";
            const inner = (
              <>
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[28px]">{c.icon}</span>
                </div>
                <div className="flex-1 text-center">
                  <p className="font-bold text-primary">{c.title}</p>
                  <p className="text-sm text-on-surface-variant">{c.desc}</p>
                </div>
                <span className="text-sm font-bold text-secondary">←</span>
              </>
            );
            return isExternal ? (
              <a
                key={i}
                href={c.href}
                className={cls}
                data-tooltip={c.tip}
                data-tooltip-position="bottom"
              >
                {inner}
              </a>
            ) : (
              <Link
                key={i}
                href={c.href}
                className={cls}
                data-tooltip={c.tip}
                data-tooltip-position="bottom"
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop pb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-8 text-center">
          {t("help.faqByCategory")}
        </h2>
        <div className="space-y-6">
          {faqs.map((cat, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/50">
              <div className="flex flex-row-reverse items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined">{cat.icon}</span>
                </div>
                <h3 className="text-xl font-extrabold text-primary">{t(cat.categoryKey)}</h3>
              </div>
              <div className="space-y-3">
                {cat.items.map((item, j) => (
                  <details
                    key={j}
                    className="bg-surface rounded-2xl p-4 border border-outline-variant/50 group"
                  >
                    <summary className="font-bold text-primary cursor-pointer flex items-center justify-between flex-row-reverse">
                      <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                        expand_more
                      </span>
                      <span className="text-center">{t(item.qKey)}</span>
                    </summary>
                    <p className="text-on-surface-variant mt-3 text-center leading-relaxed">
                      {t(item.aKey)}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop pb-20">
        <div className="bg-gradient-to-l from-primary to-secondary rounded-3xl p-10 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-10" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{t("help.notFound")}</h2>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              {t("help.notFoundSub")}
            </p>
            <Link
              href="/cases/new"
              className="shine shine-glow inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-secondary-container transition-colors"
              data-tooltip={t("help.openCaseTipBtn")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined">support_agent</span>
              <span>{t("help.openCaseBtn")}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

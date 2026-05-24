"use client";

import Link from "next/link";
import type { Service } from "@/lib/data";
import { getServiceName, getServiceShortDescription, getServiceCategoryLabel } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

interface Props {
  service: Service;
  variant?: "compact" | "default";
}

export default function ServiceCard({ service, variant = "default" }: Props) {
  const { t, lang } = useLanguage();
  const isExternal = !service.inScope && service.externalUrl;
  const href = isExternal ? service.externalUrl! : `/catalog/${service.slug}`;

  const localName = getServiceName(service.slug, service.name, lang);
  const localShort = getServiceShortDescription(service.slug, service.shortDescription, lang);
  const localCategory = getServiceCategoryLabel(service.slug, service.categoryLabel, lang);

  const tooltip = isExternal
    ? `${localName} — ${t("service.externalNotice")}`
    : `${localName} — ${t("services.details")}`;

  const Container = ({ children }: { children: React.ReactNode }) =>
    isExternal ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full shine rounded-3xl"
        aria-label={localName}
        data-tooltip={tooltip}
        data-tooltip-position="bottom"
      >
        {children}
      </a>
    ) : (
      <Link
        href={href}
        className="block h-full shine rounded-3xl"
        data-tooltip={tooltip}
        data-tooltip-position="bottom"
      >
        {children}
      </Link>
    );

  return (
    <Container>
      <article
        className={`group premium-card wow-tilt relative bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/50 hover:shadow-2xl hover:border-secondary/30 transition-all duration-500 h-full flex flex-col ${
          variant === "compact" ? "" : ""
        }`}
      >
        {isExternal && (
          <span
            className="absolute top-4 left-4 bg-alert-yellow/10 text-alert-yellow text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1"
            title={t("service.externalNotice")}
          >
            <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            <span>{t("service.govforms")}</span>
          </span>
        )}
        <div className="text-center flex flex-col items-center h-full">
          <div className="card-icon w-14 h-14 bg-secondary/5 text-secondary flex items-center justify-center rounded-2xl mb-6 transition-all duration-500">
            <span className="material-symbols-outlined text-[32px]">
              {service.icon}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-secondary/70 mb-2">
            {localCategory}
          </span>
          <h3 className="text-xl font-extrabold text-primary mb-3 leading-tight">
            {localName}
          </h3>
          <p className="text-sm text-on-surface-variant mb-6 flex-1 leading-relaxed">
            {localShort}
          </p>
          <div className="w-full flex items-center justify-between flex-row-reverse mt-auto">
            <div className="text-center">
              <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                {t("service.fromPrice")}
              </div>
              <span className="text-lg font-extrabold text-secondary">
                {service.priceUnit === "₪/חודש"
                  ? `${service.priceFrom.toLocaleString()} ${service.priceUnit}`
                  : `${service.priceUnit}${service.priceFrom.toLocaleString()}`}
              </span>
            </div>
            <span
              className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-[20px]">
                arrow_back
              </span>
            </span>
          </div>
        </div>
      </article>
    </Container>
  );
}

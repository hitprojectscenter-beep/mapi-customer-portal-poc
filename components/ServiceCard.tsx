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
  const isExternal = !service.inScope && !!service.externalUrl;
  const href = isExternal ? service.externalUrl! : `/catalog/${service.slug}`;

  const localName = getServiceName(service.slug, service.name, lang);
  const localShort = getServiceShortDescription(service.slug, service.shortDescription, lang);
  const localCategory = getServiceCategoryLabel(service.slug, service.categoryLabel, lang);

  const tooltip = isExternal
    ? `${localName} — ${t("service.externalNotice")}`
    : `${localName} — ${t("services.details")}`;

  // Fallback click handler in case the browser blocks <a target="_blank">
  // (helps mobile Safari and aggressive popup blockers)
  const handleExternalClick = (e: React.MouseEvent) => {
    if (!isExternal) return;
    e.preventDefault();
    // Open in a new tab. window.open returns null if blocked - in that case fall back to same-tab.
    const win = window.open(href, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = href;
  };

  const cardInner = (
    <article
      className={`group premium-card relative bg-white rounded-2xl p-5 md:p-6 border border-outline-variant/50 hover:shadow-2xl hover:border-secondary/30 transition-all duration-500 h-full flex flex-col ${
        variant === "compact" ? "" : ""
      }`}
    >
      {isExternal && (
        <span
          className="absolute top-3 left-3 bg-alert-yellow/15 text-alert-yellow text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 z-10"
          title={t("service.externalNotice")}
        >
          <span className="material-symbols-outlined text-[12px]">open_in_new</span>
          <span>{t("service.govforms")}</span>
        </span>
      )}
      <div className="text-center flex flex-col items-center h-full">
        <div className="card-icon w-14 h-14 bg-secondary/5 text-secondary flex items-center justify-center rounded-2xl mb-5 transition-all duration-500">
          <span className="material-symbols-outlined text-[30px]">
            {service.icon}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-widest font-semibold text-secondary/70 mb-2">
          {localCategory}
        </span>
        <h3 className="text-lg font-bold text-primary mb-2.5 leading-tight">
          {localName}
        </h3>
        <p className="text-sm text-on-surface-variant mb-5 flex-1 leading-relaxed font-light">
          {localShort}
        </p>
        <div className="w-full flex items-center justify-between flex-row-reverse mt-auto">
          <div className="text-center">
            <div className="text-[10px] text-on-surface-variant uppercase tracking-widest font-light">
              {t("service.fromPrice")}
            </div>
            <span className="text-base font-bold text-secondary">
              {service.priceUnit === "₪/חודש"
                ? `${service.priceFrom.toLocaleString()} ${service.priceUnit}`
                : `${service.priceUnit}${service.priceFrom.toLocaleString()}`}
            </span>
          </div>
          <span
            className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all"
            aria-hidden="true"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isExternal ? "open_in_new" : "arrow_back"}
            </span>
          </span>
        </div>
      </div>
    </article>
  );

  // Render <a> for external links, <Link> for internal — inline (no nested component definition).
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleExternalClick}
        className="block h-full shine rounded-2xl cursor-pointer"
        aria-label={`${localName} — ${t("service.externalNotice")}`}
        data-tooltip={tooltip}
        data-tooltip-position="bottom"
      >
        {cardInner}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="block h-full shine rounded-2xl cursor-pointer"
      data-tooltip={tooltip}
      data-tooltip-position="bottom"
    >
      {cardInner}
    </Link>
  );
}

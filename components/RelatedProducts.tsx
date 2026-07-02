"use client";

import { services, type Service } from "@/lib/data";
import ServiceCard from "./ServiceCard";
import { useLanguage } from "@/lib/LanguageContext";

interface Props {
  currentSlug: string;
  category?: Service["category"];
  title?: string;
  subtitle?: string;
  limit?: number;
}

export default function RelatedProducts({ currentSlug, category, title, subtitle, limit = 4 }: Props) {
  const { t } = useLanguage();
  const list = services
    .filter(s => s.slug !== currentSlug)
    .filter(s => !category || s.category === category)
    .slice(0, limit);

  if (list.length === 0) return null;

  return (
    <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
      <header className="mb-5 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-primary">
          {title || t("svc.relatedTitle")}
        </h2>
        {(subtitle || t("svc.relatedSub")) && (
          <p className="text-sm text-on-surface-variant mt-1 font-light">
            {subtitle || t("svc.relatedSub")}
          </p>
        )}
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map(s => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </section>
  );
}

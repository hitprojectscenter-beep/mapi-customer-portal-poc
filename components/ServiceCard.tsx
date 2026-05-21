import Link from "next/link";
import type { Service } from "@/lib/data";

interface Props {
  service: Service;
  variant?: "compact" | "default";
}

export default function ServiceCard({ service, variant = "default" }: Props) {
  const isExternal = !service.inScope && service.externalUrl;
  const href = isExternal ? service.externalUrl! : `/catalog/${service.slug}`;

  const tooltip = isExternal
    ? `${service.name} — פתיחת הטופס באתר gov.il (לא בתכולת הפורטל)`
    : `${service.name} — פרטים, מחירון והתחלת הזמנה`;

  const Container = ({ children }: { children: React.ReactNode }) =>
    isExternal ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full shine rounded-3xl"
        aria-label={`${service.name} - פתיחה בחלון חדש`}
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
        className={`group premium-card relative bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/50 hover:shadow-2xl hover:border-secondary/30 transition-all duration-500 h-full flex flex-col ${
          variant === "compact" ? "" : ""
        }`}
      >
        {isExternal && (
          <span
            className="absolute top-4 left-4 bg-alert-yellow/10 text-alert-yellow text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1"
            title='שירות זה נפתח בטופס gov.il - אינו בתכולת הפורטל הראשונית'
          >
            <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            <span>govforms</span>
          </span>
        )}
        <div className="text-right flex flex-col items-end h-full">
          <div className="card-icon w-14 h-14 bg-secondary/5 text-secondary flex items-center justify-center rounded-2xl mb-6 transition-all duration-500">
            <span className="material-symbols-outlined text-[32px]">
              {service.icon}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-secondary/70 mb-2">
            {service.categoryLabel}
          </span>
          <h3 className="text-xl font-extrabold text-primary mb-3 leading-tight">
            {service.name}
          </h3>
          <p className="text-sm text-on-surface-variant mb-6 flex-1 leading-relaxed">
            {service.shortDescription}
          </p>
          <div className="w-full flex items-center justify-between flex-row-reverse mt-auto">
            <div className="text-right">
              <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">החל מ-</div>
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

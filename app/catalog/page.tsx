"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ServiceCard from "@/components/ServiceCard";
import {
  services, categories, customerTypeLabels,
  getCategoryLabel, getCustomerTypeLabel,
  getServiceName, getServiceShortDescription, getServiceCategoryLabel,
  type Category, type Service
} from "@/lib/data";
import { getRatingSummary } from "@/lib/reviews";
import { useLanguage } from "@/lib/LanguageContext";
import { buildDocs, searchServices } from "@/lib/search";

type SortKey = "relevance" | "priceAsc" | "priceDesc" | "newest" | "rating";
type ViewMode = "grid" | "list";

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <CatalogContent />
    </Suspense>
  );
}

function CatalogContent() {
  const { t, lang } = useLanguage();
  const params = useSearchParams();
  const initialCategory = params.get("category") as Category | null;
  const initialQuery = params.get("q") || "";

  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    new Set(initialCategory ? [initialCategory] : [])
  );
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [minRating, setMinRating] = useState<number>(0);
  const [query, setQuery] = useState(initialQuery);
  const [showInScopeOnly, setShowInScopeOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("relevance");
  const [view, setView] = useState<ViewMode>("grid");

  // Set page title
  useEffect(() => {
    document.title = `${t("nav.catalog")} · מפ"י`;
  }, [t]);

  // Enrich services with ratings
  const enriched = useMemo(() => {
    return services.map(s => ({ ...s, rating: getRatingSummary(s.slug) }));
  }, []);

  const activeFiltersCount =
    selectedCategories.size +
    selectedTypes.size +
    (maxPrice < 15000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (query.trim() ? 1 : 0) +
    (showInScopeOnly ? 1 : 0);

  const filtered = useMemo(() => {
    let list = enriched.filter((s) => {
      if (selectedCategories.size > 0 && !selectedCategories.has(s.category)) return false;
      if (selectedTypes.size > 0 && !s.customerTypes.some((ct) => selectedTypes.has(ct))) return false;
      if (s.priceFrom > maxPrice) return false;
      if (minRating > 0 && s.rating.average < minRating) return false;
      if (showInScopeOnly && !s.inScope) return false;
      return true;
    });

    // Fuzzy free-text filter — same partial-match engine as the header search
    // (substring, token coverage with Hebrew prefixes, typo tolerance)
    if (query.trim()) {
      const docs = buildDocs(
        list,
        s => getServiceName(s.slug, s.name, lang),
        s => getServiceShortDescription(s.slug, s.shortDescription, lang),
        s => getServiceCategoryLabel(s.slug, s.categoryLabel, lang)
      );
      const ranked = searchServices(docs, query, list.length);
      const bySlug = new Map(list.map(s => [s.slug, s]));
      list = ranked.map(h => bySlug.get(h.service.slug)!).filter(Boolean);
    }

    // Sort
    switch (sortBy) {
      case "priceAsc":
        list = list.sort((a, b) => a.priceFrom - b.priceFrom); break;
      case "priceDesc":
        list = list.sort((a, b) => b.priceFrom - a.priceFrom); break;
      case "rating":
        list = list.sort((a, b) => b.rating.average - a.rating.average); break;
      case "newest":
        list = [...list].reverse(); break;
      default: break;
    }
    return list;
  }, [enriched, selectedCategories, selectedTypes, maxPrice, minRating, query, showInScopeOnly, sortBy, lang]);

  const toggleCategory = (id: Category) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const toggleType = (id: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const clearFilters = () => {
    setSelectedCategories(new Set());
    setSelectedTypes(new Set());
    setMaxPrice(15000);
    setMinRating(0);
    setQuery("");
    setShowInScopeOnly(false);
  };

  // Active-filter chips
  const chips: { label: string; onRemove: () => void }[] = [];
  selectedCategories.forEach(c => {
    const cat = categories.find(x => x.id === c);
    if (cat) chips.push({ label: getCategoryLabel(cat.id, cat.label, lang), onRemove: () => toggleCategory(c) });
  });
  selectedTypes.forEach(id => {
    chips.push({ label: getCustomerTypeLabel(id, customerTypeLabels[id as keyof typeof customerTypeLabels], lang), onRemove: () => toggleType(id) });
  });
  if (maxPrice < 15000) chips.push({ label: `≤ ₪${maxPrice.toLocaleString()}`, onRemove: () => setMaxPrice(15000) });
  if (minRating > 0) chips.push({ label: `${minRating}★+`, onRemove: () => setMinRating(0) });
  if (query.trim()) chips.push({ label: `"${query.trim()}"`, onRemove: () => setQuery("") });
  if (showInScopeOnly) chips.push({ label: t("plp.filter.available"), onRemove: () => setShowInScopeOnly(false) });

  return (
    <div className="bg-surface min-h-screen">
      {/* Slim breadcrumb + title band (SFCC-style, less hero-y for PLP) */}
      <div className="bg-white border-b border-outline-variant/50">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-5">
          <nav aria-label={t("nav.skipToContent")} className="text-xs text-on-surface-variant mb-2">
            <ol className="flex flex-row-reverse items-center gap-2">
              <li><Link href="/" className="hover:text-secondary">{t("nav.home")}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-primary font-semibold">{t("nav.catalog")}</li>
            </ol>
          </nav>
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">
                {t("catalog.title")}
              </h1>
              <p className="text-sm text-on-surface-variant mt-1 font-light">
                {t("plp.showing")} <span className="font-semibold text-primary">{filtered.length}</span> {t("plp.of")} {services.length} {t("plp.results")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://www.gov.il/he/departments/units/products_online_catalog_mapi/govil-landing-page"
                target="_blank"
                rel="noopener noreferrer"
                className="shine text-xs bg-surface-container hover:bg-secondary/10 text-primary px-3 py-2 rounded-full font-semibold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                <span>{t("catalog.officialBtn")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Active filter chips row */}
      {chips.length > 0 && (
        <div className="bg-surface-container/40 border-b border-outline-variant/40">
          <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-3 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              {t("plp.filtersActive")}:
            </span>
            {chips.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={c.onRemove}
                className="shine inline-flex items-center gap-1.5 bg-white border border-outline-variant hover:border-error-red hover:text-error-red text-primary text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
              >
                <span>{c.label}</span>
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            ))}
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-error-red hover:underline font-semibold ms-2"
            >
              {t("plp.filtersClear")}
            </button>
          </div>
        </div>
      )}

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-6 md:py-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="shine w-full bg-white border border-outline-variant rounded-full px-4 py-3 flex items-center justify-center gap-2 font-semibold text-primary hover:border-secondary transition-colors"
            aria-expanded={mobileFiltersOpen}
          >
            <span className="material-symbols-outlined text-secondary">tune</span>
            <span>{t("plp.filters")}</span>
            {activeFiltersCount > 0 && (
              <span className="bg-secondary text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
          {/* Faceted Sidebar (SFCC-style: title per group, dividers) */}
          <aside
            id="mobile-filters-panel"
            className={`${mobileFiltersOpen ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-xl border border-outline-variant/50 lg:sticky lg:top-44">
              <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/50">
                <h2 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">tune</span>
                  <span>{t("plp.filters")}</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-secondary text-white text-[10px] font-bold rounded-full px-2 py-0.5">
                      {activeFiltersCount}
                    </span>
                  )}
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs text-secondary font-semibold hover:underline"
                  >
                    {t("plp.filtersClear")}
                  </button>
                )}
              </div>

              {/* Search within filters */}
              <div className="px-5 py-4 border-b border-outline-variant/50">
                <label htmlFor="filter-search" className="text-xs font-semibold text-primary mb-2 block">
                  {t("catalog.searchFree")}
                </label>
                <div className="relative">
                  <input
                    id="filter-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("catalog.searchPlaceholder")}
                    className="w-full bg-surface-container border-0 rounded-lg px-3 py-2 text-sm ps-9 focus:ring-2 focus:ring-secondary focus:outline-none"
                  />
                  <span className="material-symbols-outlined absolute start-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                    search
                  </span>
                </div>
              </div>

              {/* Categories facet */}
              <FacetGroup title={t("catalog.cat")}>
                {categories.map((cat) => {
                  const count = enriched.filter(s => s.category === cat.id).length;
                  return (
                    <FacetCheckbox
                      key={cat.id}
                      label={getCategoryLabel(cat.id, cat.label, lang)}
                      count={count}
                      checked={selectedCategories.has(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                    />
                  );
                })}
              </FacetGroup>

              {/* Customer Type facet */}
              <FacetGroup title={t("catalog.custType")}>
                {Object.entries(customerTypeLabels).map(([id, label]) => {
                  const count = enriched.filter(s => s.customerTypes.includes(id as never)).length;
                  return (
                    <FacetCheckbox
                      key={id}
                      label={getCustomerTypeLabel(id, label, lang)}
                      count={count}
                      checked={selectedTypes.has(id)}
                      onChange={() => toggleType(id)}
                    />
                  );
                })}
              </FacetGroup>

              {/* Rating facet */}
              <FacetGroup title={t("plp.filter.rating")}>
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer group py-1 hover:bg-surface-container/40 rounded px-1">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                      className="w-4 h-4 text-secondary focus:ring-secondary"
                    />
                    <span className="flex" style={{ direction: "ltr" }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-[16px]"
                          style={{
                            color: i < rating ? "#F59E0B" : "#D1D5DB",
                            fontVariationSettings: i < rating ? "'FILL' 1" : "'FILL' 0"
                          }}
                        >star</span>
                      ))}
                    </span>
                    <span className="text-xs text-on-surface-variant group-hover:text-primary transition-colors">{t("review.of")} ↑</span>
                  </label>
                ))}
                {minRating > 0 && (
                  <button
                    type="button"
                    onClick={() => setMinRating(0)}
                    className="text-xs text-secondary hover:underline mt-1"
                  >
                    {t("review.filter.all")}
                  </button>
                )}
              </FacetGroup>

              {/* Price Range facet */}
              <FacetGroup title={t("catalog.priceRange.label")}>
                <div className="px-1">
                  <input
                    type="range"
                    min={100}
                    max={15000}
                    step={100}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full accent-secondary"
                    aria-label={t("catalog.priceRange.label")}
                  />
                  <div className="flex justify-between text-xs text-on-surface-variant mt-1" dir="ltr">
                    <span>₪100</span>
                    <span className="font-bold text-primary">₪{maxPrice.toLocaleString()}</span>
                    <span>₪15,000</span>
                  </div>
                </div>
              </FacetGroup>

              {/* In scope */}
              <div className="px-5 py-4">
                <label className="flex items-start gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showInScopeOnly}
                    onChange={(e) => setShowInScopeOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-secondary focus:ring-secondary mt-0.5"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                      {t("plp.filter.available")}
                    </span>
                    <p className="text-[11px] text-on-surface-variant mt-0.5 font-light">
                      {t("catalog.govformsNote")}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </aside>

          {/* Results column */}
          <div>
            {/* Toolbar: sort + view mode */}
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div className="text-xs text-on-surface-variant">
                <span className="font-semibold text-primary">{filtered.length}</span> {t("plp.results")}
              </div>
              <div className="flex items-center gap-2">
                {/* View toggle */}
                <div className="hidden md:inline-flex items-center bg-white border border-outline-variant rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setView("grid")}
                    className={`shine w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      view === "grid" ? "bg-primary text-white" : "text-primary hover:bg-surface-container"
                    }`}
                    aria-label={t("plp.viewGrid")}
                    aria-pressed={view === "grid"}
                    data-tooltip={t("plp.viewGrid")}
                    data-tooltip-position="bottom"
                  >
                    <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("list")}
                    className={`shine w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      view === "list" ? "bg-primary text-white" : "text-primary hover:bg-surface-container"
                    }`}
                    aria-label={t("plp.viewList")}
                    aria-pressed={view === "list"}
                    data-tooltip={t("plp.viewList")}
                    data-tooltip-position="bottom"
                  >
                    <span className="material-symbols-outlined text-[18px]">view_list</span>
                  </button>
                </div>

                {/* Sort dropdown */}
                <label className="inline-flex items-center gap-2 bg-white border border-outline-variant rounded-full px-3 py-2 text-sm hover:border-secondary transition-colors">
                  <span className="text-xs text-on-surface-variant font-semibold">{t("plp.sortBy")}:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortKey)}
                    className="bg-transparent border-0 focus:ring-0 focus:outline-none text-sm font-semibold text-primary cursor-pointer"
                  >
                    <option value="relevance">{t("plp.sort.relevance")}</option>
                    <option value="priceAsc">{t("plp.sort.priceAsc")}</option>
                    <option value="priceDesc">{t("plp.sort.priceDesc")}</option>
                    <option value="newest">{t("plp.sort.newest")}</option>
                    <option value="rating">{t("plp.sort.rating")}</option>
                  </select>
                </label>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-outline-variant/50">
                <span className="material-symbols-outlined text-[64px] text-on-surface-variant">
                  search_off
                </span>
                <h2 className="text-xl font-bold text-primary mt-3 mb-2">{t("plp.noResults")}</h2>
                <p className="text-on-surface-variant mb-6 font-light">
                  {t("plp.noResultsSub")}
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="shine shine-glow bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary transition-colors"
                >
                  {t("plp.filtersClear")}
                </button>
              </div>
            ) : view === "list" ? (
              <ul className="space-y-3" role="list">
                {filtered.map(s => <ListRow key={s.slug} service={s} />)}
              </ul>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------- FacetGroup with collapsible header ----------
function FacetGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-outline-variant/50">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-surface-container/30 transition-colors"
        aria-expanded={open}
      >
        <span className="text-xs font-bold text-primary uppercase tracking-wider">{title}</span>
        <span
          className="material-symbols-outlined text-[20px] text-on-surface-variant transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
        >
          expand_more
        </span>
      </button>
      {open && <div className="px-5 pb-4 space-y-1.5">{children}</div>}
    </div>
  );
}

function FacetCheckbox({ label, count, checked, onChange }: { label: string; count?: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group py-1 px-1 rounded hover:bg-surface-container/40 transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded text-secondary focus:ring-secondary"
      />
      <span className="text-sm text-primary group-hover:text-secondary transition-colors flex-1">{label}</span>
      {typeof count === "number" && (
        <span className="text-[11px] text-on-surface-variant font-light" dir="ltr">({count})</span>
      )}
    </label>
  );
}

// -------- List Row (alternate view) ----------
function ListRow({ service }: { service: Service & { rating: ReturnType<typeof getRatingSummary> } }) {
  const { t, lang } = useLanguage();
  const name = getServiceName(service.slug, service.name, lang);
  const desc = getServiceShortDescription(service.slug, service.shortDescription, lang);
  const cat = getServiceCategoryLabel(service.slug, service.categoryLabel, lang);
  const isExternal = !service.inScope && !!service.externalUrl;
  const href = isExternal ? service.externalUrl! : `/catalog/${service.slug}`;

  return (
    <li>
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="shine flex items-center gap-4 p-4 bg-white rounded-xl border border-outline-variant/40 hover:border-secondary/50 hover:shadow-md transition-all"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-secondary text-[28px]">{service.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-secondary/80">{cat}</p>
          <h3 className="font-bold text-primary truncate">{name}</h3>
          <p className="text-xs text-on-surface-variant truncate font-light mt-0.5">{desc}</p>
        </div>
        <div className="text-end flex-shrink-0">
          <p className="text-[10px] text-on-surface-variant">{t("service.fromPrice")}</p>
          <p className="text-lg font-bold text-primary" dir="ltr">
            {service.priceUnit}{service.priceFrom.toLocaleString()}
          </p>
        </div>
      </Link>
    </li>
  );
}

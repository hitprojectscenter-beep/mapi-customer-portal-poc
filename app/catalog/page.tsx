"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ServiceCard from "@/components/ServiceCard";
import { services, categories, customerTypeLabels, getCategoryLabel, getCustomerTypeLabel, getServiceName, getServiceShortDescription, getServiceCategoryLabel, type Category } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

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

  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    new Set(initialCategory ? [initialCategory] : [])
  );
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [query, setQuery] = useState("");
  const [showInScopeOnly, setShowInScopeOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Count active filters for mobile badge
  const activeFiltersCount =
    selectedCategories.size +
    selectedTypes.size +
    (maxPrice < 15000 ? 1 : 0) +
    (query.trim() ? 1 : 0) +
    (showInScopeOnly ? 1 : 0);

  const filtered = useMemo(() => {
    return services.filter((s) => {
      if (selectedCategories.size > 0 && !selectedCategories.has(s.category)) return false;
      if (
        selectedTypes.size > 0 &&
        !s.customerTypes.some((ct) => selectedTypes.has(ct))
      )
        return false;
      if (s.priceFrom > maxPrice) return false;
      if (showInScopeOnly && !s.inScope) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const localName = getServiceName(s.slug, s.name, lang).toLowerCase();
        const localShort = getServiceShortDescription(s.slug, s.shortDescription, lang).toLowerCase();
        const localCat = getServiceCategoryLabel(s.slug, s.categoryLabel, lang).toLowerCase();
        if (
          !s.name.toLowerCase().includes(q) &&
          !s.shortDescription.toLowerCase().includes(q) &&
          !s.categoryLabel.toLowerCase().includes(q) &&
          !localName.includes(q) &&
          !localShort.includes(q) &&
          !localCat.includes(q)
        )
          return false;
      }
      return true;
    });
  }, [selectedCategories, selectedTypes, maxPrice, query, showInScopeOnly, lang]);

  const toggleCategory = (id: Category) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleType = (id: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const clearFilters = () => {
    setSelectedCategories(new Set());
    setSelectedTypes(new Set());
    setMaxPrice(15000);
    setQuery("");
    setShowInScopeOnly(false);
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero band */}
      <div className="bg-gradient-to-l from-primary to-tertiary text-white">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70 mb-6">
            <ol className="flex flex-row-reverse items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">{t("nav.home")}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-bold">{t("nav.catalog")}</li>
            </ol>
          </nav>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 sm:mb-4">
            {t("catalog.title")}
          </h1>
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl">
            {t("catalog.subtitle")}
            <span className="font-bold text-secondary-container mr-2">
              {filtered.length} {t("catalog.shown")}
            </span>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://www.gov.il/he/departments/units/products_online_catalog_mapi/govil-landing-page"
              target="_blank"
              rel="noopener noreferrer"
              className="shine inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-white/20 transition-colors"
              data-tooltip={t("catalog.officialBtn")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              <span>{t("catalog.officialBtn")}</span>
            </a>
            <a
              href="https://www.gov.il/he/departments/survey_of_israel"
              target="_blank"
              rel="noopener noreferrer"
              className="shine inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-white/20 transition-colors"
              data-tooltip={t("catalog.mainSiteBtn")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-[18px]">public</span>
              <span>{t("catalog.mainSiteBtn")}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-6 md:py-10">
        {/* Mobile filter toggle button */}
        <div className="lg:hidden mb-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="shine flex-1 bg-white border border-outline-variant rounded-2xl px-4 py-3 flex items-center justify-center gap-2 font-bold text-primary hover:border-secondary transition-colors min-h-[48px]"
            aria-expanded={mobileFiltersOpen}
            aria-controls="mobile-filters-panel"
            data-tooltip={mobileFiltersOpen ? t("common.close") : t("catalog.filter")}
            data-tooltip-position="bottom"
          >
            <span className="material-symbols-outlined text-secondary">
              {mobileFiltersOpen ? "close" : "tune"}
            </span>
            <span>{mobileFiltersOpen ? t("common.close") : t("catalog.filter")}</span>
            {activeFiltersCount > 0 && (
              <span className="bg-secondary text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="shine bg-error-red/10 text-error-red px-4 py-3 rounded-2xl font-bold text-sm hover:bg-error-red hover:text-white transition-colors min-h-[48px] flex items-center gap-1"
              data-tooltip={t("catalog.clearAll")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-[18px]">clear_all</span>
              <span>{t("catalog.clearAll")}</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar Filters */}
          <aside
            id="mobile-filters-panel"
            className={`lg:col-span-1 order-1 lg:order-1 ${
              mobileFiltersOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/50 lg:sticky lg:top-32">
              <div className="flex items-center justify-between mb-6">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="shine text-secondary font-bold text-sm hover:underline px-2 py-1 rounded"
                  data-tooltip={t("catalog.clearAll")}
                  data-tooltip-position="bottom"
                >
                  {t("catalog.clearAll")}
                </button>
                <h2 className="text-lg font-extrabold text-primary flex items-center gap-2">
                  <span>{t("catalog.filter")}</span>
                  <span className="material-symbols-outlined text-secondary">tune</span>
                </h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label htmlFor="filter-search" className="text-sm font-bold text-primary mb-2 block text-center">
                  {t("catalog.searchFree")}
                </label>
                <div className="relative">
                  <input
                    id="filter-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("catalog.searchPlaceholder")}
                    className="w-full bg-surface-container border-0 rounded-xl px-4 py-2.5 text-center focus:ring-2 focus:ring-secondary focus:outline-none"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                    search
                  </span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-primary mb-3 text-center">{t("catalog.cat")}</h3>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center justify-center gap-2 cursor-pointer text-center group"
                    >
                      <span className="text-sm group-hover:text-secondary transition-colors">
                        {getCategoryLabel(cat.id, cat.label, lang)}
                      </span>
                      <input
                        type="checkbox"
                        checked={selectedCategories.has(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                        className="w-4 h-4 rounded text-secondary focus:ring-secondary"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Type */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-primary mb-3 text-center">{t("catalog.custType")}</h3>
                <div className="flex flex-col gap-2">
                  {Object.entries(customerTypeLabels).map(([id, label]) => (
                    <label
                      key={id}
                      className="flex items-center justify-center gap-2 cursor-pointer text-center group"
                    >
                      <span className="text-sm group-hover:text-secondary transition-colors">{getCustomerTypeLabel(id, label, lang)}</span>
                      <input
                        type="checkbox"
                        checked={selectedTypes.has(id)}
                        onChange={() => toggleType(id)}
                        className="w-4 h-4 rounded text-secondary focus:ring-secondary"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-primary mb-3 text-center">
                  {t("catalog.priceRange.label")}: ₪{maxPrice.toLocaleString()}
                </h3>
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
              </div>

              {/* In Scope */}
              <div className="border-t border-outline-variant pt-4">
                <label className="flex items-center justify-center gap-2 cursor-pointer text-center">
                  <span className="text-sm font-bold text-primary">{t("catalog.activeOnly.label")}</span>
                  <input
                    type="checkbox"
                    checked={showInScopeOnly}
                    onChange={(e) => setShowInScopeOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-secondary focus:ring-secondary"
                  />
                </label>
                <p className="text-xs text-on-surface-variant mt-2 text-center">
                  {t("catalog.govformsNote")}
                </p>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3 order-2 lg:order-2">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-outline-variant/50">
                <span className="material-symbols-outlined text-[64px] text-on-surface-variant mb-4">
                  search_off
                </span>
                <h2 className="text-2xl font-bold text-primary mb-2">{t("catalog.noResults")}</h2>
                <p className="text-on-surface-variant mb-6">
                  {t("catalog.tryAgain")}
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="shine shine-glow bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-secondary transition-colors"
                  data-tooltip={t("catalog.clearAll")}
                  data-tooltip-position="bottom"
                >
                  {t("catalog.clearAll")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

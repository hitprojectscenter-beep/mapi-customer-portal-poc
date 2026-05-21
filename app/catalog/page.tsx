"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ServiceCard from "@/components/ServiceCard";
import { services, categories, customerTypeLabels, type Category } from "@/lib/data";

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <CatalogContent />
    </Suspense>
  );
}

function CatalogContent() {
  const params = useSearchParams();
  const initialCategory = params.get("category") as Category | null;

  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    new Set(initialCategory ? [initialCategory] : [])
  );
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [query, setQuery] = useState("");
  const [showInScopeOnly, setShowInScopeOnly] = useState(false);

  const filtered = useMemo(() => {
    return services.filter((s) => {
      if (selectedCategories.size > 0 && !selectedCategories.has(s.category)) return false;
      if (
        selectedTypes.size > 0 &&
        !s.customerTypes.some((t) => selectedTypes.has(t))
      )
        return false;
      if (s.priceFrom > maxPrice) return false;
      if (showInScopeOnly && !s.inScope) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        if (
          !s.name.toLowerCase().includes(q) &&
          !s.shortDescription.toLowerCase().includes(q) &&
          !s.categoryLabel.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [selectedCategories, selectedTypes, maxPrice, query, showInScopeOnly]);

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
          <nav aria-label="ניווט נתיב" className="text-sm text-white/70 mb-6">
            <ol className="flex flex-row-reverse items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">דף הבית</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-bold">קטלוג שירותים</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            קטלוג כל שירותי המרכז למיפוי ישראל
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            14 שירותים מקצועיים - מפות, קדסטר, גיאודזיה, אורתופוטו, נתוני GIS ותעודות.
            <span className="font-bold text-secondary-container mr-2">
              {filtered.length} שירותים מוצגים
            </span>
          </p>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/50 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="shine text-secondary font-bold text-sm hover:underline px-2 py-1 rounded"
                  data-tooltip="ניקוי כל הסינונים והחזרה לתצוגה מלאה"
                  data-tooltip-position="bottom"
                >
                  נקה הכל
                </button>
                <h2 className="text-lg font-extrabold text-primary flex items-center gap-2">
                  <span>סינון</span>
                  <span className="material-symbols-outlined text-secondary">tune</span>
                </h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label htmlFor="filter-search" className="text-sm font-bold text-primary mb-2 block text-right">
                  חיפוש חופשי
                </label>
                <div className="relative">
                  <input
                    id="filter-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="הקלד..."
                    className="w-full bg-surface-container border-0 rounded-xl px-4 py-2.5 text-right focus:ring-2 focus:ring-secondary focus:outline-none"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                    search
                  </span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-primary mb-3 text-right">קטגוריה</h3>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center justify-end gap-2 cursor-pointer text-right group"
                    >
                      <span className="text-sm group-hover:text-secondary transition-colors">
                        {cat.label}
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
                <h3 className="text-sm font-bold text-primary mb-3 text-right">סוג לקוח</h3>
                <div className="flex flex-col gap-2">
                  {Object.entries(customerTypeLabels).map(([id, label]) => (
                    <label
                      key={id}
                      className="flex items-center justify-end gap-2 cursor-pointer text-right group"
                    >
                      <span className="text-sm group-hover:text-secondary transition-colors">{label}</span>
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
                <h3 className="text-sm font-bold text-primary mb-3 text-right">
                  מחיר מקסימלי: ₪{maxPrice.toLocaleString()}
                </h3>
                <input
                  type="range"
                  min={100}
                  max={15000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-secondary"
                  aria-label="מחיר מקסימלי"
                />
              </div>

              {/* In Scope */}
              <div className="border-t border-outline-variant pt-4">
                <label className="flex items-center justify-end gap-2 cursor-pointer text-right">
                  <span className="text-sm font-bold text-primary">רק שירותים פעילים בפורטל</span>
                  <input
                    type="checkbox"
                    checked={showInScopeOnly}
                    onChange={(e) => setShowInScopeOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-secondary focus:ring-secondary"
                  />
                </label>
                <p className="text-xs text-on-surface-variant mt-2 text-right">
                  שירותים שטרם בתכולה - יפתחו ב-govforms
                </p>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-outline-variant/50">
                <span className="material-symbols-outlined text-[64px] text-on-surface-variant mb-4">
                  search_off
                </span>
                <h2 className="text-2xl font-bold text-primary mb-2">לא נמצאו תוצאות</h2>
                <p className="text-on-surface-variant mb-6">
                  נסה לשנות את הסינונים או לחפש בצורה אחרת.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="shine shine-glow bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-secondary transition-colors"
                  data-tooltip="ניקוי הסינונים כדי לראות את כל השירותים"
                  data-tooltip-position="bottom"
                >
                  נקה סינונים
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

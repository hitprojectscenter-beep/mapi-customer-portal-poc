"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { services, getServiceName, getServiceShortDescription, getServiceCategoryLabel } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";
import { buildDocs, searchServices, highlightSegments, type SearchHit } from "@/lib/search";

/** Gold-tinted highlight of matched query parts */
function Highlight({ text, matched }: { text: string; matched: string[] }) {
  return (
    <>
      {highlightSegments(text, matched).map((seg, i) =>
        seg.hit ? (
          <mark key={i} className="bg-gold/25 text-primary rounded px-0.5">{seg.text}</mark>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const RECENT_KEY = "mapi_recent_searches_v1";

export default function SearchBar({ open, onClose }: Props) {
  const { t, lang } = useLanguage();
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw));
    } catch { /* ignore */ }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // Fuzzy engine: substring + token + typo-tolerant partial matching
  const docs = useMemo(
    () => buildDocs(
      services,
      s => getServiceName(s.slug, s.name, lang),
      s => getServiceShortDescription(s.slug, s.shortDescription, lang),
      s => getServiceCategoryLabel(s.slug, s.categoryLabel, lang)
    ),
    [lang]
  );

  const hits: SearchHit[] = useMemo(
    () => (q.trim() ? searchServices(docs, q, 8) : []),
    [docs, q]
  );

  const suggestions = useMemo(
    () =>
      hits.map(h => ({
        ...h.service,
        localName: getServiceName(h.service.slug, h.service.name, lang),
        localDesc: getServiceShortDescription(h.service.slug, h.service.shortDescription, lang),
        matched: h.matched
      })),
    [hits, lang]
  );

  // Never a dead end: closest partial matches even when nothing scores
  const nearMisses = useMemo(
    () =>
      q.trim() && suggestions.length === 0
        ? searchServices(docs, q.trim().slice(0, Math.max(3, q.trim().length - 2)), 3).map(h => ({
            ...h.service,
            localName: getServiceName(h.service.slug, h.service.name, lang)
          }))
        : [],
    [docs, q, suggestions.length, lang]
  );

  const trending = services.slice(0, 6);

  const saveRecent = (term: string) => {
    const next = [term, ...recent.filter(r => r !== term)].slice(0, 5);
    setRecent(next);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) saveRecent(q.trim());
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[300] animate-fade-in" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        style={{ paddingTop: "var(--safe-top)" }}
        className="absolute inset-x-0 top-0 bg-white shadow-2xl max-h-[90vh] max-h-[90dvh] overflow-y-auto animate-slide-down"
      >
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-6">
          <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b-2 border-primary pb-3 mb-4">
            <span className="material-symbols-outlined text-secondary text-[28px]">search</span>
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("header.search.placeholder")}
              className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-lg text-primary placeholder:text-on-surface-variant"
              aria-label={t("header.search.aria")}
            />
            <button
              type="button"
              onClick={onClose}
              className="shine w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center"
              aria-label={t("common.close")}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </form>

          {q.trim() ? (
            suggestions.length > 0 ? (
              <>
                <p className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-3">
                  {t("header.search.suggestions")} ({suggestions.length})
                </p>
                <ul className="divide-y divide-outline-variant/40" role="list">
                  {suggestions.map(s => (
                    <li key={s.slug}>
                      <Link
                        href={`/catalog/${s.slug}`}
                        onClick={() => { saveRecent(q.trim()); onClose(); }}
                        className="shine flex items-center gap-3 p-3 hover:bg-surface-container/50 rounded-xl transition-colors"
                      >
                        <div className="w-12 h-12 bg-secondary/5 text-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-[24px]">{s.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-primary text-sm">
                            <Highlight text={s.localName} matched={s.matched} />
                          </p>
                          <p className="text-xs text-on-surface-variant truncate">
                            <Highlight text={s.localDesc} matched={s.matched} />
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">arrow_forward</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/catalog?q=${encodeURIComponent(q)}`}
                  onClick={() => { saveRecent(q.trim()); onClose(); }}
                  className="block text-center mt-4 text-secondary font-semibold hover:underline"
                >
                  {t("header.search.viewAll")} →
                </Link>
              </>
            ) : (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-[48px] text-on-surface-variant" aria-hidden="true">search_off</span>
                <p className="mt-2 font-semibold text-primary">{t("plp.noResults")}</p>
                <p className="text-sm text-on-surface-variant">{t("plp.noResultsSub")}</p>
                {nearMisses.length > 0 && (
                  <div className="mt-5 text-start bg-gold-tint/60 border border-gold/25 rounded-2xl p-4">
                    <p className="text-xs font-semibold text-gold-dark mb-2">אולי התכוונת ל:</p>
                    <div className="flex flex-wrap gap-2">
                      {nearMisses.map(s => (
                        <Link
                          key={s.slug}
                          href={`/catalog/${s.slug}`}
                          onClick={onClose}
                          className="shine bg-white border border-gold/30 hover:border-gold text-primary px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[18px] text-gold-dark" aria-hidden="true">{s.icon}</span>
                          <span>{s.localName}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <Link
                  href="/catalog"
                  onClick={onClose}
                  className="inline-block mt-4 text-secondary font-semibold hover:underline text-sm"
                >
                  {t("nav.catalog")} →
                </Link>
              </div>
            )
          ) : (
            <div className="space-y-6">
              {recent.length > 0 && (
                <section>
                  <p className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-3">{t("header.search.recent")}</p>
                  <div className="flex flex-wrap gap-2">
                    {recent.map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setQ(r)}
                        className="shine bg-surface-container hover:bg-secondary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </section>
              )}
              <section>
                <p className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-3">{t("plp.trending")}</p>
                <div className="grid grid-cols-2 gap-2">
                  {trending.map(s => {
                    const nm = getServiceName(s.slug, s.name, lang);
                    return (
                      <Link
                        key={s.slug}
                        href={`/catalog/${s.slug}`}
                        onClick={onClose}
                        className="shine flex items-center gap-2 p-3 bg-surface-container/50 hover:bg-secondary/10 rounded-xl transition-colors"
                      >
                        <span className="material-symbols-outlined text-secondary text-[22px]">{s.icon}</span>
                        <span className="font-medium text-primary text-sm truncate">{nm}</span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

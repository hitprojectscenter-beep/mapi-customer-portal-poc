"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { getReviews, getRatingSummary } from "@/lib/reviews";
import StarRating from "./StarRating";

export default function ReviewsSection({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const summary = getRatingSummary(slug);
  const reviews = getReviews(slug);
  const [sort, setSort] = useState<"recent" | "helpful" | "high" | "low">("helpful");
  const [filter, setFilter] = useState<0 | 4 | 5>(0);
  const [visible, setVisible] = useState(3);

  if (summary.count === 0) {
    return (
      <div className="text-center py-12">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant">reviews</span>
        <p className="mt-3 font-semibold text-primary">{t("review.title")}</p>
        <button
          type="button"
          className="mt-4 shine shine-glow bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary transition-colors"
        >
          {t("review.write")}
        </button>
      </div>
    );
  }

  let list = [...reviews];
  if (filter > 0) list = list.filter(r => r.rating === filter);
  switch (sort) {
    case "recent": list.sort((a, b) => (a.date < b.date ? 1 : -1)); break;
    case "helpful": list.sort((a, b) => b.helpful - a.helpful); break;
    case "high": list.sort((a, b) => b.rating - a.rating); break;
    case "low": list.sort((a, b) => a.rating - b.rating); break;
  }
  const displayed = list.slice(0, visible);

  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-8">
      {/* Rating summary sidebar */}
      <aside className="md:sticky md:top-44 md:h-fit space-y-4">
        <div className="text-center bg-surface-container/50 rounded-2xl p-6">
          <p className="text-5xl font-bold text-primary" dir="ltr">{summary.average.toFixed(1)}</p>
          <div className="my-3 flex justify-center">
            <StarRating value={summary.average} size="lg" />
          </div>
          <p className="text-xs text-on-surface-variant font-light">
            {t("review.based")} <span className="font-semibold text-primary">{summary.count}</span> {t("review.title").toLowerCase()}
          </p>
        </div>

        {/* Distribution bars */}
        <div className="space-y-2">
          {summary.distribution.map(d => {
            const pct = summary.count > 0 ? (d.count / summary.count) * 100 : 0;
            return (
              <button
                key={d.stars}
                type="button"
                onClick={() => setFilter(filter === d.stars ? 0 : (d.stars as 5 | 4))}
                className={`w-full flex items-center gap-2 text-xs px-2 py-1 rounded hover:bg-surface-container/50 transition-colors ${
                  filter === d.stars ? "bg-secondary/10" : ""
                }`}
              >
                <span className="w-8 text-start font-semibold text-primary" dir="ltr">{d.stars} ★</span>
                <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-end text-on-surface-variant" dir="ltr">{d.count}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="shine shine-glow w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-secondary transition-colors"
        >
          {t("review.write")}
        </button>
      </aside>

      {/* Reviews list */}
      <div>
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={() => setFilter(0)}
              className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${
                filter === 0 ? "bg-primary text-white" : "bg-surface-container text-primary hover:bg-secondary/10"
              }`}
            >
              {t("review.filter.all")}
            </button>
            <button
              type="button"
              onClick={() => setFilter(filter === 5 ? 0 : 5)}
              className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${
                filter === 5 ? "bg-primary text-white" : "bg-surface-container text-primary hover:bg-secondary/10"
              }`}
            >
              {t("review.filter.5")}
            </button>
            <button
              type="button"
              onClick={() => setFilter(filter === 4 ? 0 : 4)}
              className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${
                filter === 4 ? "bg-primary text-white" : "bg-surface-container text-primary hover:bg-secondary/10"
              }`}
            >
              {t("review.filter.4")}
            </button>
          </div>
          <label className="text-xs flex items-center gap-2 bg-white border border-outline-variant rounded-full px-3 py-1.5">
            <span className="text-on-surface-variant">{t("plp.sortBy")}:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "recent" | "helpful" | "high" | "low")}
              className="bg-transparent border-0 focus:ring-0 focus:outline-none text-xs font-semibold text-primary cursor-pointer"
            >
              <option value="helpful">{t("review.sort.helpful")}</option>
              <option value="recent">{t("review.sort.recent")}</option>
              <option value="high">{t("review.sort.high")}</option>
              <option value="low">{t("review.sort.low")}</option>
            </select>
          </label>
        </div>

        <ul className="space-y-4" role="list">
          {displayed.map(r => (
            <li key={r.id} className="bg-white rounded-2xl p-5 border border-outline-variant/50">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary text-white flex items-center justify-center font-bold text-sm">
                    {r.authorInitial}
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm">{r.author}</p>
                    <p className="text-[11px] text-on-surface-variant font-light" dir="ltr">{r.date}</p>
                  </div>
                </div>
                {r.verified && (
                  <span className="flex items-center gap-1 text-[10px] text-positive-green font-semibold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span>{t("review.verified")}</span>
                  </span>
                )}
              </div>
              <div className="mb-2">
                <StarRating value={r.rating} size="sm" />
              </div>
              <h4 className="font-bold text-primary mb-1">{r.title}</h4>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed">{r.body}</p>
              <div className="mt-3 pt-3 border-t border-outline-variant/40 flex items-center gap-4">
                <button
                  type="button"
                  className="text-xs text-on-surface-variant hover:text-secondary flex items-center gap-1.5 font-medium"
                >
                  <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                  <span>{t("review.helpful")} ({r.helpful})</span>
                </button>
              </div>
            </li>
          ))}
        </ul>

        {list.length > visible && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setVisible(visible + 3)}
              className="shine bg-white border border-outline-variant hover:border-secondary text-primary px-6 py-3 rounded-full font-semibold transition-colors"
            >
              {t("review.showMore")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "mapi_recent_viewed_v1";
const MAX = 8;

export function useRecentlyViewed() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSlugs(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const track = useCallback((slug: string) => {
    setSlugs(prev => {
      if (prev[0] === slug) return prev; // already at top — no update
      const next = [slug, ...prev.filter(s => s !== slug)].slice(0, MAX);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  return { slugs, track };
}

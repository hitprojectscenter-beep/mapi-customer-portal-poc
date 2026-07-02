"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

interface WishlistState {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  count: number;
}

const WishCtx = createContext<WishlistState | undefined>(undefined);
const STORAGE_KEY = "mapi_wishlist_v1";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSlugs(JSON.parse(raw));
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch { /* ignore */ }
  }, [slugs, hydrated]);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);
  const toggle = useCallback((slug: string) => {
    setSlugs(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]);
  }, []);
  const remove = useCallback((slug: string) => setSlugs(prev => prev.filter(s => s !== slug)), []);
  const clear = useCallback(() => setSlugs([]), []);

  return (
    <WishCtx.Provider value={{ slugs, has, toggle, remove, clear, count: slugs.length }}>
      {children}
    </WishCtx.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishCtx);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

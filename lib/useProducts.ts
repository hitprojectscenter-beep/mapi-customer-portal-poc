"use client";

// Client access to the catalog. The DB (via /api/products) is the source of
// truth; the code list `services` is the instant fallback so the first paint is
// never empty and the catalog keeps working offline / in demo mode.

import { useEffect, useState } from "react";
import { services as seed, type Service } from "@/lib/data";

// Module-level cache — fetch once per page load, reuse across navigations.
let cache: Service[] | null = null;

export function useProducts(): { products: Service[]; loading: boolean } {
  const [products, setProducts] = useState<Service[]>(cache ?? seed);
  const [loading, setLoading] = useState<boolean>(!cache);

  useEffect(() => {
    if (cache) return;
    let alive = true;
    fetch("/api/products")
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (alive && Array.isArray(d?.products) && d.products.length) {
          cache = d.products as Service[];
          setProducts(cache);
        }
      })
      .catch(() => { /* keep the seed fallback */ })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  return { products, loading };
}

export function useProduct(slug: string | undefined): { product: Service | undefined; loading: boolean } {
  const { products, loading } = useProducts();
  return { product: slug ? products.find(p => p.slug === slug) : undefined, loading };
}

/** Let mutations (CMS save/delete) force the next useProducts() to refetch. */
export function invalidateProducts(): void {
  cache = null;
}

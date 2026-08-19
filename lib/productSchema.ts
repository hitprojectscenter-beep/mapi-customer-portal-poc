/* eslint-disable */
// Server-side validation/sanitization for product CRUD. Coerces every field to
// a safe shape, whitelists the category, and — importantly for security —
// only accepts http(s) external links (blocks javascript:/data: URIs).

import type { Service, Category } from "./data";

const CATEGORIES: Category[] = ["maps", "cadastre", "geodesy", "orthophoto", "gis", "certificates"];
const CTYPES = ["private", "business", "government", "surveyor"] as const;

const str = (v: any, max = 400): string => (typeof v === "string" ? v.slice(0, max) : "");
const num = (v: any): number => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
const arrStr = (v: any, max = 30): string[] =>
  Array.isArray(v) ? v.filter(x => typeof x === "string").map(x => x.slice(0, 240)).slice(0, max) : [];
const urlOrUndef = (v: any): string | undefined => {
  const s = str(v, 500).trim();
  return /^https?:\/\//i.test(s) ? s : undefined;
};

/** Normalize a free-text slug into a safe url segment. */
export function normalizeSlug(v: any): string {
  return str(v, 80).trim().toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

/** Validate + sanitize an incoming product body. Returns null if invalid. */
export function sanitizeProduct(body: any, slugOverride?: string): Service | null {
  const slug = normalizeSlug(slugOverride ?? body?.slug);
  const name = str(body?.name, 160).trim();
  if (!slug || !name) return null;

  const category = (CATEGORIES.includes(body?.category) ? body.category : "maps") as Category;
  const priceTo = body?.priceTo == null || body?.priceTo === "" ? undefined : Math.max(0, num(body.priceTo));
  const customerTypes = arrStr(body?.customerTypes)
    .filter(t => (CTYPES as readonly string[]).includes(t)) as Service["customerTypes"];

  return {
    slug,
    name,
    category,
    categoryLabel: str(body?.categoryLabel, 80),
    shortDescription: str(body?.shortDescription, 300),
    description: str(body?.description, 4000),
    icon: str(body?.icon, 40) || "map",
    priceFrom: Math.max(0, num(body?.priceFrom)),
    priceTo,
    priceUnit: str(body?.priceUnit, 20) || "₪",
    deliveryDays: str(body?.deliveryDays, 80),
    customerTypes: customerTypes.length ? customerTypes : ["private", "business", "government", "surveyor"],
    highlight: !!body?.highlight,
    inScope: body?.inScope !== false,
    externalHref: urlOrUndef(body?.externalHref),
    externalUrl: urlOrUndef(body?.externalUrl),
    govFormUrl: urlOrUndef(body?.govFormUrl),
    features: arrStr(body?.features, 20),
    priceTable: Array.isArray(body?.priceTable)
      ? body.priceTable.slice(0, 20).map((r: any) => ({
          label: str(r?.label, 120), without: num(r?.without),
          with: r?.with == null || r?.with === "" ? undefined : num(r.with)
        }))
      : [],
    faq: Array.isArray(body?.faq)
      ? body.faq.slice(0, 20).map((f: any) => ({ q: str(f?.q, 300), a: str(f?.a, 1200) }))
      : []
  };
}

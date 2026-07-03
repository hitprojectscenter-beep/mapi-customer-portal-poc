// Subscription plans, inspired by OS Data Hub 3-tier model
// (OpenData / Premium / Public Sector) — adapted for MAPI.

import type { TKey } from "./i18n";

export interface Plan {
  id: string;
  code: "OPEN" | "PREMIUM" | "PUBLIC";
  nameKey: TKey;
  taglineKey: TKey;
  price: {
    displayKey: TKey;
    numeric: number | null;
    unitKey: TKey;
  };
  featuresKeys: TKey[];
  ctaKey: TKey;
  highlight?: boolean;
  color: "gray" | "blue" | "gold";
  icon: string;
}

export const plans: Plan[] = [
  {
    id: "open",
    code: "OPEN",
    nameKey: "plan.open.name",
    taglineKey: "plan.open.tagline",
    price: { displayKey: "plan.open.price", numeric: 0, unitKey: "plan.open.unit" },
    featuresKeys: [
      "plan.open.f1",
      "plan.open.f2",
      "plan.open.f3",
      "plan.open.f4",
      "plan.open.f5"
    ],
    ctaKey: "plan.open.cta",
    color: "gray",
    icon: "public"
  },
  {
    id: "premium",
    code: "PREMIUM",
    nameKey: "plan.premium.name",
    taglineKey: "plan.premium.tagline",
    price: { displayKey: "plan.premium.price", numeric: 300, unitKey: "plan.premium.unit" },
    featuresKeys: [
      "plan.premium.f1",
      "plan.premium.f2",
      "plan.premium.f3",
      "plan.premium.f4",
      "plan.premium.f5",
      "plan.premium.f6",
      "plan.premium.f7"
    ],
    ctaKey: "plan.premium.cta",
    highlight: true,
    color: "blue",
    icon: "workspace_premium"
  },
  {
    id: "public",
    code: "PUBLIC",
    nameKey: "plan.public.name",
    taglineKey: "plan.public.tagline",
    price: { displayKey: "plan.public.price", numeric: null, unitKey: "plan.public.unit" },
    featuresKeys: [
      "plan.public.f1",
      "plan.public.f2",
      "plan.public.f3",
      "plan.public.f4",
      "plan.public.f5",
      "plan.public.f6"
    ],
    ctaKey: "plan.public.cta",
    color: "gold",
    icon: "shield_person"
  }
];

// Comparison matrix — rows are feature axes
export const comparisonRows: Array<{
  featureKey: TKey;
  open: string | boolean;
  premium: string | boolean;
  public: string | boolean;
}> = [
  { featureKey: "planCmp.mapsDownload",  open: "10/חודש", premium: "500/חודש", public: "ללא הגבלה" },
  { featureKey: "planCmp.resolution",    open: "50 ס\"מ", premium: "20 ס\"מ", public: "10 ס\"מ" },
  { featureKey: "planCmp.apiCalls",      open: "1,000/יום", premium: "50,000/יום", public: "ללא הגבלה" },
  { featureKey: "planCmp.historicMaps",  open: false, premium: true, public: true },
  { featureKey: "planCmp.corsRTK",       open: false, premium: true, public: true },
  { featureKey: "planCmp.dataFormats",   open: "PDF", premium: "GeoTIFF, Shapefile, DWG", public: "כל הפורמטים + WMS/WFS" },
  { featureKey: "planCmp.commercialUse", open: false, premium: true, public: true },
  { featureKey: "planCmp.support",       open: "מייל", premium: "מייל + טלפון", public: "SLA + Account Manager" },
  { featureKey: "planCmp.customMaps",    open: "1/חודש", premium: "50/חודש", public: "ללא הגבלה" },
  { featureKey: "planCmp.teamSeats",     open: "1", premium: "5", public: "ללא הגבלה" }
];

// Customer segment definitions: 6 personas with personalized journeys.
// Each segment maps to a pricing tier, relevant services, dedicated channel, and benefits.

import type { TKey } from "./i18n";

export type SegmentId =
  | "citizen"
  | "surveyor"
  | "municipality"
  | "government"
  | "professional"
  | "business";

export interface SegmentDef {
  id: SegmentId;
  icon: string;
  nameKey: TKey;
  shortKey: TKey;
  descKey: TKey;
  /** Tier label - used to color and prioritize */
  tier: "retail" | "pro" | "enterprise" | "government";
  tierKey: TKey;
  /** Sample services most relevant to this segment (slugs) */
  topServiceSlugs: string[];
  /** Discount applied automatically when this segment is detected */
  defaultDiscountPercent: number;
  /** Whether multi-year contracts are encouraged for this segment */
  multiYearContracts: boolean;
  /** Dedicated contact info */
  contact: {
    role: string;
    phone: string;
    email: string;
    /** Office hours */
    hours: string;
  };
  /** Brand color (Tailwind class names - kept static for purge safety) */
  colorClasses: {
    bg: string;
    text: string;
    border: string;
    gradient: string;
  };
  /** Sample use cases keys */
  useCases: TKey[];
  popular?: boolean;
}

export const SEGMENTS: SegmentDef[] = [
  {
    id: "citizen",
    icon: "person",
    nameKey: "seg.citizen.name",
    shortKey: "seg.citizen.short",
    descKey: "seg.citizen.desc",
    tier: "retail",
    tierKey: "seg.tierCitizen",
    topServiceSlugs: ["custom-map", "aerial-photos", "cadastre-extract", "land-certificate"],
    defaultDiscountPercent: 0,
    multiYearContracts: false,
    contact: {
      role: "מוקד שירות לקוחות",
      phone: "*6274",
      email: "service@mapi.gov.il",
      hours: "א'-ה' 08:00-17:00"
    },
    colorClasses: {
      bg: "bg-secondary/10",
      text: "text-secondary",
      border: "border-secondary/30",
      gradient: "from-secondary/20 to-secondary/5"
    },
    useCases: ["seg.useCase"],
    popular: true
  },
  {
    id: "surveyor",
    icon: "engineering",
    nameKey: "seg.surveyor.name",
    shortKey: "seg.surveyor.short",
    descKey: "seg.surveyor.desc",
    tier: "pro",
    tierKey: "seg.tierPro",
    topServiceSlugs: ["cors-subscription", "surveyor-inspector", "geodetic-points", "cadastre-extract"],
    defaultDiscountPercent: 10,
    multiYearContracts: true,
    contact: {
      role: "מנהל לקוחות מודדים",
      phone: "*6274 שלוחה 2",
      email: "surveyors@mapi.gov.il",
      hours: "א'-ה' 08:00-17:00"
    },
    colorClasses: {
      bg: "bg-positive-green/10",
      text: "text-positive-green",
      border: "border-positive-green/30",
      gradient: "from-positive-green/20 to-positive-green/5"
    },
    useCases: ["seg.useCase"],
    popular: true
  },
  {
    id: "municipality",
    icon: "location_city",
    nameKey: "seg.municipality.name",
    shortKey: "seg.municipality.short",
    descKey: "seg.municipality.desc",
    tier: "enterprise",
    tierKey: "seg.tierEnterprise",
    topServiceSlugs: ["gis-layers", "orthophoto-mosaic", "elevation-models", "custom-map"],
    defaultDiscountPercent: 15,
    multiYearContracts: true,
    contact: {
      role: "מנהל לקוחות רשויות מקומיות",
      phone: "*6274 שלוחה 3",
      email: "municipalities@mapi.gov.il",
      hours: "א'-ה' 08:00-17:00"
    },
    colorClasses: {
      bg: "bg-alert-yellow/10",
      text: "text-alert-yellow",
      border: "border-alert-yellow/30",
      gradient: "from-alert-yellow/20 to-alert-yellow/5"
    },
    useCases: ["seg.useCase"]
  },
  {
    id: "government",
    icon: "account_balance",
    nameKey: "seg.government.name",
    shortKey: "seg.government.short",
    descKey: "seg.government.desc",
    tier: "government",
    tierKey: "seg.tierGov",
    topServiceSlugs: ["gis-layers", "geodetic-points", "elevation-models", "orthophoto-mosaic"],
    defaultDiscountPercent: 25,
    multiYearContracts: true,
    contact: {
      role: "מנהל קשרי ממשלה",
      phone: "*6274 שלוחה 4",
      email: "gov@mapi.gov.il",
      hours: "א'-ה' 08:00-17:00"
    },
    colorClasses: {
      bg: "bg-primary/10",
      text: "text-primary",
      border: "border-primary/30",
      gradient: "from-primary/20 to-primary/5"
    },
    useCases: ["seg.useCase"]
  },
  {
    id: "professional",
    icon: "architecture",
    nameKey: "seg.professional.name",
    shortKey: "seg.professional.short",
    descKey: "seg.professional.desc",
    tier: "pro",
    tierKey: "seg.tierPro",
    topServiceSlugs: ["custom-map", "cadastre-extract", "orthophoto-mosaic", "elevation-models"],
    defaultDiscountPercent: 8,
    multiYearContracts: false,
    contact: {
      role: "מנהל לקוחות בעלי מקצוע",
      phone: "*6274 שלוחה 5",
      email: "pro@mapi.gov.il",
      hours: "א'-ה' 08:00-17:00"
    },
    colorClasses: {
      bg: "bg-tertiary/10",
      text: "text-tertiary",
      border: "border-tertiary/30",
      gradient: "from-tertiary/20 to-tertiary/5"
    },
    useCases: ["seg.useCase"]
  },
  {
    id: "business",
    icon: "business_center",
    nameKey: "seg.business.name",
    shortKey: "seg.business.short",
    descKey: "seg.business.desc",
    tier: "enterprise",
    tierKey: "seg.tierEnterprise",
    topServiceSlugs: ["gis-layers", "custom-map", "orthophoto-mosaic", "elevation-models"],
    defaultDiscountPercent: 20,
    multiYearContracts: true,
    contact: {
      role: "מנהל לקוחות עסקיים",
      phone: "*6274 שלוחה 6",
      email: "enterprise@mapi.gov.il",
      hours: "א'-ה' 08:00-17:00"
    },
    colorClasses: {
      bg: "bg-error-red/10",
      text: "text-error-red",
      border: "border-error-red/30",
      gradient: "from-error-red/20 to-error-red/5"
    },
    useCases: ["seg.useCase"]
  }
];

export function getSegment(id: string | undefined): SegmentDef | undefined {
  return SEGMENTS.find((s) => s.id === id);
}

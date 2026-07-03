// Regional map bundles — inspired by OS Shop bundles (Lake District, Snowdonia, Cornwall).
// Adapted to Israeli regions.

import type { TKey } from "./i18n";

export interface Bundle {
  id: string;
  slug: string;
  nameKey: TKey;
  descriptionKey: TKey;
  region: string;
  regionIcon: string;
  mapCount: number;
  services: string[];         // Service slugs included
  regularPrice: number;
  bundlePrice: number;
  savingsPct: number;
  colorFrom: string;          // Tailwind color for gradient
  colorTo: string;
  isFeatured: boolean;
}

export const bundles: Bundle[] = [
  {
    id: "galilee",
    slug: "galilee",
    nameKey: "bundle.galilee.name",
    descriptionKey: "bundle.galilee.desc",
    region: "צפון",
    regionIcon: "landscape",
    mapCount: 4,
    services: ["custom-map", "aerial-photos", "elevation-models", "gis-layers"],
    regularPrice: 720,
    bundlePrice: 500,
    savingsPct: 30,
    colorFrom: "#0B61A1",
    colorTo: "#2E7D32",
    isFeatured: true
  },
  {
    id: "coastal",
    slug: "coastal-plain",
    nameKey: "bundle.coastal.name",
    descriptionKey: "bundle.coastal.desc",
    region: "מרכז וחוף",
    regionIcon: "sailing",
    mapCount: 5,
    services: ["custom-map", "marine-maps", "aerial-photos", "city-maps", "gis-layers"],
    regularPrice: 950,
    bundlePrice: 690,
    savingsPct: 27,
    colorFrom: "#1D8DDA",
    colorTo: "#00B4D8",
    isFeatured: true
  },
  {
    id: "jerusalem",
    slug: "jerusalem-region",
    nameKey: "bundle.jerusalem.name",
    descriptionKey: "bundle.jerusalem.desc",
    region: "ירושלים והרים",
    regionIcon: "temple_buddhist",
    mapCount: 6,
    services: ["custom-map", "aerial-photos", "elevation-models", "historic-maps", "gis-layers", "city-maps"],
    regularPrice: 1180,
    bundlePrice: 820,
    savingsPct: 31,
    colorFrom: "#7C3AED",
    colorTo: "#0B61A1",
    isFeatured: false
  },
  {
    id: "negev",
    slug: "negev-desert",
    nameKey: "bundle.negev.name",
    descriptionKey: "bundle.negev.desc",
    region: "נגב ודרום",
    regionIcon: "wb_sunny",
    mapCount: 4,
    services: ["custom-map", "elevation-models", "aerial-photos", "gis-layers"],
    regularPrice: 780,
    bundlePrice: 550,
    savingsPct: 29,
    colorFrom: "#C77800",
    colorTo: "#DC2626",
    isFeatured: false
  },
  {
    id: "surveyor",
    slug: "surveyor-professional",
    nameKey: "bundle.surveyor.name",
    descriptionKey: "bundle.surveyor.desc",
    region: "מודדים",
    regionIcon: "engineering",
    mapCount: 4,
    services: ["cors-subscription", "surveyor-inspector", "geo-points", "boundary-cert"],
    regularPrice: 1450,
    bundlePrice: 990,
    savingsPct: 32,
    colorFrom: "#0B61A1",
    colorTo: "#1D8DDA",
    isFeatured: true
  },
  {
    id: "developer",
    slug: "developer-suite",
    nameKey: "bundle.developer.name",
    descriptionKey: "bundle.developer.desc",
    region: "מפתחי GIS",
    regionIcon: "code",
    mapCount: 3,
    services: ["gis-layers", "wms-sub", "geo-points"],
    regularPrice: 890,
    bundlePrice: 620,
    savingsPct: 30,
    colorFrom: "#2E7D32",
    colorTo: "#0B61A1",
    isFeatured: false
  }
];

export function getBundle(slug: string): Bundle | undefined {
  return bundles.find(b => b.slug === slug);
}

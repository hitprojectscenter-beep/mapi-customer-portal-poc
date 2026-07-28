// Pre-defined product packages ("חבילות מוצרים מוגדרות-מראש").
//
// These are NOT custom/personalized orders and do NOT involve polygon marking.
// Each package is a FIXED, curated set of real מפ"י catalog products (real
// service slugs from lib/data.ts) offered at a package price. This mirrors the
// spec's shelf-products model (מסלול 5 — "מוצרי מדף", multiple products in one
// order) and the way the official mapi.gov.il catalog groups products by type
// and audience — rather than the invented regional/tourism bundles that were
// here before (which wrongly routed into the custom-map polygon flow).
//
// Ordering a package goes through the standard quote / sales-request flow
// (see app/bundles/[slug]/page.tsx) — never the custom-map polygon picker.

export interface Bundle {
  id: string;
  slug: string;
  /** Package name (Hebrew) */
  name: string;
  nameEn: string;
  /** One-line description (Hebrew) */
  description: string;
  descriptionEn: string;
  /** Who it's for — replaces the old tourism "region" framing */
  audience: string;
  audienceEn: string;
  icon: string;
  /** Real service slugs from lib/data.ts included in the fixed package */
  services: string[];
  /** Sum of the members' catalog price (for the "regular price" strike-through) */
  regularPrice: number;
  /** The fixed package price */
  bundlePrice: number;
  savingsPct: number;
  colorFrom: string;
  colorTo: string;
  isFeatured: boolean;
}

export const bundles: Bundle[] = [
  {
    id: "paper-maps",
    slug: "paper-maps",
    name: "חבילת מפות מדף",
    nameEn: "Shelf Maps Package",
    description: 'סט מוצרי מדף מודפסים לפי מסלול המפות המודרניות: מפת עיר/יישוב, מפה ימית ומפה היסטורית — בהזמנה אחת ובמחיר חבילה.',
    descriptionEn: "Printed shelf products from the Modern Maps track: a city/settlement map, a marine map and a historical map — one order, one package price.",
    audience: "מטיילים, מוסדות חינוך ואספנים",
    audienceEn: "Hikers, schools & collectors",
    icon: "map",
    services: ["city-map", "marine-maps", "historic-maps"],
    regularPrice: 500,
    bundlePrice: 390,
    savingsPct: 22,
    colorFrom: "#0B61A1",
    colorTo: "#1D8DDA",
    isFeatured: true
  },
  {
    id: "ortho-elevation",
    slug: "ortho-elevation",
    name: "חבילת אורתופוטו ומודלי גבהים",
    nameEn: "Orthophoto & Elevation Package",
    description: 'מסלול אורתופוטו ומודלי גבהים: תצלומי אוויר מתוקנים גיאומטרית יחד עם מודל גובה ספרתי (DEM/DSM) — בסיס מדויק לתכנון הנדסי.',
    descriptionEn: "The Orthophoto & Elevation track: geometrically-corrected aerial imagery plus a digital elevation model (DEM/DSM) — an accurate base for engineering.",
    audience: "מהנדסים, אדריכלים ומתכננים",
    audienceEn: "Engineers, architects & planners",
    icon: "terrain",
    services: ["aerial-photos", "elevation-data"],
    regularPrice: 1035,
    bundlePrice: 790,
    savingsPct: 24,
    colorFrom: "#2E7D32",
    colorTo: "#0B61A1",
    isFeatured: true
  },
  {
    id: "surveyor-pro",
    slug: "surveyor-pro",
    name: "חבילת מודד מוסמך",
    nameEn: "Licensed Surveyor Package",
    description: 'כל מה שמודד מוסמך צריך: מנוי לתחנות הקבע (CORS) לתיקוני זמן אמת, נתוני נקודות בקרה גיאודזיות ושירות מודד מבקר לביקורת תצ"ר.',
    descriptionEn: "Everything a licensed surveyor needs: a CORS real-time-corrections subscription, geodetic control-point data and a surveyor-inspector (תצ\"ר audit) service.",
    audience: "מודדים מוסמכים",
    audienceEn: "Licensed surveyors",
    icon: "engineering",
    services: ["cors-subscription", "geodetic-points", "surveyor-inspector"],
    regularPrice: 1380,
    bundlePrice: 990,
    savingsPct: 28,
    colorFrom: "#0B61A1",
    colorTo: "#1D8DDA",
    isFeatured: true
  },
  {
    id: "gis-planner",
    slug: "gis-planner",
    name: "חבילת GIS למתכננים",
    nameEn: "GIS Planner Package",
    description: 'שכבות מידע וקטוריות מהמסד הגאוגרפי הלאומי, מנוי WMS/WFS לשכבות מפה חיות ב-API, ונקודות בקרה גיאודזיות — מוכן לאינטגרציה בכל מערכת GIS.',
    descriptionEn: "Vector layers from the national geographic database, a WMS/WFS live-map API subscription and geodetic control points — integration-ready for any GIS.",
    audience: "מחלקות GIS ומתכננים",
    audienceEn: "GIS departments & planners",
    icon: "dataset",
    services: ["gis-layers", "wms-subscription", "geodetic-points"],
    regularPrice: 1030,
    bundlePrice: 740,
    savingsPct: 28,
    colorFrom: "#7C3AED",
    colorTo: "#0B61A1",
    isFeatured: false
  },
  {
    id: "cadastre-certs",
    slug: "cadastre-certs",
    name: "חבילת קדסטר ותעודות",
    nameEn: "Cadastre & Certificates Package",
    description: 'מסמכי קדסטר רשמיים (תעודות גוש/חלקה), תעודת גבולות מנהליים חתומה דיגיטלית, ושירות מודד מבקר — לרישום במקרקעין ולצרכים משפטיים.',
    descriptionEn: "Official cadastre documents (block/parcel certificates), a digitally-signed administrative boundary certificate and a surveyor-inspector service — for land registration and legal use.",
    audience: "עורכי דין, רשויות ויזמים",
    audienceEn: "Lawyers, authorities & developers",
    icon: "layers",
    services: ["cadastral-info", "boundary-certificate", "surveyor-inspector"],
    regularPrice: 1250,
    bundlePrice: 940,
    savingsPct: 25,
    colorFrom: "#C77800",
    colorTo: "#0B61A1",
    isFeatured: false
  },
  {
    id: "heritage",
    slug: "heritage",
    name: "חבילת תיעוד היסטורי",
    nameEn: "Historical Documentation Package",
    description: 'מפות היסטוריות מארכיון מפ"י, תצלומי אוויר היסטוריים (מ-1945) ומפת עיר/יישוב עדכנית — לתיעוד, מחקר אקדמי וגנאלוגיה.',
    descriptionEn: "Historical maps from the מפ\"י archive, historical aerial imagery (from 1945) and a current city/settlement map — for documentation, academic research and genealogy.",
    audience: "חוקרים, מוסדות וארכיונים",
    audienceEn: "Researchers, institutions & archives",
    icon: "history_edu",
    services: ["historic-maps", "aerial-photos", "city-map"],
    regularPrice: 605,
    bundlePrice: 470,
    savingsPct: 22,
    colorFrom: "#7C3AED",
    colorTo: "#1D8DDA",
    isFeatured: false
  }
];

export function getBundle(slug: string): Bundle | undefined {
  return bundles.find(b => b.slug === slug);
}

/** Localized bundle text — Hebrew for he, English for every other language. */
export function bundleText(b: Bundle, lang: string) {
  const he = lang === "he";
  return {
    name: he ? b.name : b.nameEn,
    description: he ? b.description : b.descriptionEn,
    audience: he ? b.audience : b.audienceEn
  };
}

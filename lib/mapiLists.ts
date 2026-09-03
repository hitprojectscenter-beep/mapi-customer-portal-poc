// Single integration point for the MAPI list systems and the attachment policy.
//
// In production these values are served by the ministry's list services. The
// values here are representative DEMO data used by the POC — replacing this one
// module (or backing each export with an API call) is the only change required
// to move the forms onto real data. Nothing else imports the raw lists.
//
// Mapping to the official lists (per the GovForms specs):
//   SHIPPING_OPTIONS        -> PostalShippingCosts        (code / name / price)
//   CITIES + CITY_SCALES    -> City_MAPI                  (City_Code / City_Name_Heb / Scale1)
//   SHEETS_25 / SHEETS_50   -> ListOfMaps25 / ListOfMaps50 (mapnum / mapname)
//   DISTRIBUTORS            -> ListOfPaperMapDistributors  (Code / Name / CompanyNumber)

/** True while the lists below are demo values rather than ministry data. */
export const IS_DEMO_LIST_DATA = true;

export type ShippingCode = "pickup" | "registered" | "express";
export interface ShippingOption { code: ShippingCode; label: string; price: number; icon: string; }

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { code: "pickup", label: "איסוף עצמי", price: 0, icon: "storefront" },
  { code: "registered", label: "דואר רשום", price: 39, icon: "local_shipping" },
  { code: "express", label: "דואר מהיר", price: 80, icon: "bolt" }
];

export const shippingPrice = (code: ShippingCode): number =>
  SHIPPING_OPTIONS.find((o) => o.code === code)?.price ?? 0;

export const CITIES = ["תל אביב-יפו", "ירושלים", "חיפה", "באר שבע", "נצרת", "אילת"];

/** City_MAPI.Scale1 — the locked scale shown for a city map. */
export const CITY_SCALES: Record<string, string> = {
  "תל אביב-יפו": "1:12,500", "ירושלים": "1:12,500", "חיפה": "1:12,500",
  "באר שבע": "1:10,000", "נצרת": "1:10,000", "אילת": "1:10,000"
};
export const cityScale = (city: string): string => CITY_SCALES[city] || "1:12,500";

export const SHEETS_25 = ["04-ראש הנקרה", "11-צפת", "20-חיפה", "31-חדרה", "אחר / לפי בקשה"];
export const SHEETS_50 = ["1-הגליל העליון", "3-עמק יזרעאל", "7-מישור החוף", "9-ירושלים", "אחר / לפי בקשה"];

export const DISTRIBUTORS = [
  { name: 'מפות הגליל בע"מ', hp: "514991234" },
  { name: "מרכז המפות — רון הוצאה לאור", hp: "513882910" },
  { name: `ג'יאוגרף מפות בע"מ`, hp: "515773028" }
];

// ---------------------------------------------------------------------------
// Attachment policy
//
// SECURITY NOTE: the checks below are client-side gatekeeping only. Before any
// file is actually stored or forwarded in production, the server must run
// CDR/Sandbox sanitisation (see docs/SECURE_DEVELOPMENT.md, gap G-03). In the
// POC no file content is transmitted — only the chosen file name is recorded.
// ---------------------------------------------------------------------------

export const ATTACHMENT_MAX_MB = 20;

/** GISFile — per Boundaries@mapi.gov.il (plus KML/KMZ, which the spec adds). */
export const GIS_EXTENSIONS = [
  ".shp", ".dwg", ".tiff", ".tif", ".kml", ".kmz", ".zip", ".rar",
  ".cpg", ".dbf", ".sbn", ".sbx", ".prj"
];

/** MeasurementMap — per Boundaries@mapi.gov.il. */
export const MEASUREMENT_EXTENSIONS = [
  ".pdf", ".jpeg", ".jpg", ".png", ".tiff", ".tif", ".shp", ".zip", ".rar"
];

/** Returns a Hebrew error message, or null when the file is acceptable. */
export function validateAttachment(file: File, allowed: string[]): string | null {
  const name = file.name.toLowerCase();
  const ext = name.slice(name.lastIndexOf("."));
  if (!name.includes(".") || !allowed.includes(ext)) {
    return `סוג קובץ לא נתמך. מותר: ${allowed.join(" ")}`;
  }
  if (file.size > ATTACHMENT_MAX_MB * 1024 * 1024) {
    return `הקובץ גדול מ-${ATTACHMENT_MAX_MB}MB.`;
  }
  if (file.size === 0) return "הקובץ ריק.";
  return null;
}

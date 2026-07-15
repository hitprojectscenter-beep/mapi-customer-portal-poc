// Cross-sell / Upsell recommendation rules per Spec V7 section 4.5
// (Product_Recommendations__c in Salesforce; rule-based here for the POC).
// Trigger product → cross-sell suggestions + upsell suggestion.

export interface RecommendationRule {
  /** Trigger service slug */
  trigger: string;
  /** Cross-sell service slugs (shown as "לקוחות שרכשו X רכשו גם") */
  crossSell: string[];
  /** Upsell text (verbatim concept from spec 4.5) */
  upsell: string;
}

export const RECOMMENDATION_RULES: RecommendationRule[] = [
  {
    trigger: "aerial-photos", // אורתופוטו/תצלומי אוויר (מסלולים 5+7)
    crossSell: ["elevation-data", "gis-layers", "historic-maps"],
    upsell: "אורתופוטו ברזולוציה גבוהה יותר / תצ\"א נוספים מתקופות שונות"
  },
  {
    trigger: "gis-layers", // מסלול 6
    crossSell: ["wms-subscription", "aerial-photos", "elevation-data"],
    upsell: "Package שכבות מורחב"
  },
  {
    trigger: "custom-map", // מסלול 4
    crossSell: ["aerial-photos", "gis-layers", "city-map"],
    upsell: "מפה בגודל גדול יותר / רזולוציה גבוהה"
  },
  {
    trigger: "cors-subscription", // מסלול 1
    crossSell: ["geodetic-points", "surveyor-inspector", "wms-subscription"],
    upsell: "מנוי שנתי במקום חודשי — חיסכון של 600 ₪ בשנה"
  },
  {
    trigger: "cadastral-info", // מסלול 8/10
    crossSell: ["boundary-certificate", "surveyor-inspector", "custom-map"],
    upsell: "הרחבת מידע קדסטרי לאזורים נוספים"
  },
  {
    trigger: "surveyor-inspector",
    crossSell: ["cors-subscription", "geodetic-points", "boundary-certificate"],
    upsell: "מעבר ללקוח קבוע (הסכם שו\"פ) לאחר 10+ עסקאות"
  },
  {
    trigger: "historic-maps", // מסלול 3
    crossSell: ["aerial-photos", "city-map", "custom-map"],
    upsell: "אוסף מפות היסטוריות מתקופות נוספות"
  },
  {
    trigger: "wms-subscription", // מסלול 12
    crossSell: ["gis-layers", "aerial-photos", "elevation-data"],
    upsell: "Bundle מורחב של שירותי רקע"
  }
];

/** Cross-sell suggestions for a given service (up to `limit`, default 3 per spec). */
export function getCrossSell(slug: string, limit = 3): string[] {
  const rule = RECOMMENDATION_RULES.find(r => r.trigger === slug);
  return rule ? rule.crossSell.slice(0, limit) : [];
}

/** Upsell suggestion text for a given service, if defined. */
export function getUpsell(slug: string): string | null {
  return RECOMMENDATION_RULES.find(r => r.trigger === slug)?.upsell ?? null;
}

// CORS annual-vs-monthly upsell (spec scenario 4):
// "מנוי שנתי 3,000 ₪ במקום חודשי 300 ₪ × 12 = 3,600 ₪. חיסכון 600 ₪!"
export const CORS_ANNUAL_UPSELL = {
  monthlyPrice: 300,
  annualPrice: 3000,
  yearlyEquivalent: 3600,
  savings: 600
};

// Sales Pipeline per Spec V7 Chapter 4 (תפיסת ניהול המכירות, ההכנסות והלקוחות)
// 4.1 — 11 unified pipeline stages with probability, owner, transition condition
// 4.2 — SLA per stage transition + escalation actions
// 4.3 — Route types A/B/C/D with the v7 route assignments
// 4.7 — Price books, discount levels, quote approval thresholds
// 4.9 — Renewal timeline (T-90/60/30/7/0)

import type { TKey } from "./i18n";

export type RouteType = "A" | "B" | "C" | "D";

export interface RouteTypeDef {
  id: RouteType;
  labelKey: TKey;
  approvalRequired: boolean;
  description: string;
  /** Routes belonging to this type (verbatim from spec 4.3) */
  routes: string;
  color: string;
}

export const ROUTE_TYPES: RouteTypeDef[] = [
  {
    id: "A",
    labelKey: "route.type.A",
    approvalRequired: false,
    description: "שירות עצמי מלא — הלקוח מבצע את כל התהליך ללא מעורבות אנושית: טופס, תשלום, אספקה אוטומטית",
    routes: "מסלול 2 (מפות נייר), מסלול 3 (מפות היסטוריות), מסלול 14 (תשלום לקוחות קבועים), חלק ממסלול 13 (גזטיר חינמי)",
    color: "text-positive-green"
  },
  {
    id: "B",
    labelKey: "route.type.B",
    approvalRequired: false,
    description: "שירות עצמי + בדיקה מקצועית קצרה לפני אישור/דחייה — אימות זכאות, מחיר קבוע",
    routes: "מסלול 1 (CORS - אימות מודד), מסלול 8 (מודד מבקר), מסלול 11 (תע\"צ - בדיקת תצ\"א)",
    color: "text-secondary"
  },
  {
    id: "C",
    labelKey: "route.type.C",
    approvalRequired: true,
    description: "מחיר משתנה לפי הבקשה — איש מכירות מפיק הצעת מחיר ידנית; אישור לקוח לפני תשלום",
    routes: "מסלול 4 (מפה מותאמת), 5 (אורתופוטו), 6 (GIS), 7 (תצ\"א), 10 (קדסטר ירושלים), 12 (WS), חלק מ-13 (גזטיר בתשלום)",
    color: "text-alert-yellow"
  },
  {
    id: "D",
    labelKey: "route.type.D",
    approvalRequired: true,
    description: "לקוח אסטרטגי — חוזה רב-שנתי, Account Manager ייעודי, Cross-sell ו-Upsell",
    routes: "הסכמי שו\"פ (מסלול 14), לקוחות גדולים עם Bundle של שירותים מרובים",
    color: "text-tertiary"
  }
];

// ---------------------------------------------------------------------------
// 4.1 — Eleven unified pipeline stages
// "כל מסלול מכירה יעבור את כל השלבים, אך לא בהכרח את כולם.
//  שירות עצמי מלא (מסלולי A) יקפוץ ישירות משלב 1 לשלב 6."
// ---------------------------------------------------------------------------

export interface PipelineStage {
  id: string;
  labelKey: TKey;
  /** Win probability % per spec table 4.1 */
  probability: number;
  ownerRole: string;
  /** SLA for the transition out of this stage (verbatim spec 4.2) */
  slaTarget: string;
  /** Escalation / automatic action on SLA breach */
  breachAction: string;
  /** Transition condition to move forward */
  transition: string;
  /** Terminal stage (won/lost/cancelled) */
  terminal?: boolean;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "new-lead", labelKey: "pipe.st.newLead", probability: 5,
    ownerRole: "מערכת אוטומטית", slaTarget: "2 שעות עבודה",
    breachAction: "Re-assignment אוטומטי לאיש מכירות אחר",
    transition: "בדיקה ראשונית של פרטי הליד ושיוך לאיש מכירות"
  },
  {
    id: "under-review", labelKey: "pipe.st.review", probability: 15,
    ownerRole: "איש מכירות / כ\"א מקצועי", slaTarget: "2 ימי עבודה",
    breachAction: "Escalation למרכז בכיר",
    transition: "אישור התאמה לקריטריונים, סיווג סוג השירות"
  },
  {
    id: "needs-info", labelKey: "pipe.st.needsInfo", probability: 20,
    ownerRole: "איש מכירות", slaTarget: "7 ימים",
    breachAction: "תזכורת SMS + מייל ללקוח",
    transition: "הלקוח מגיב ומספק את המידע החסר"
  },
  {
    id: "quote-sent", labelKey: "pipe.st.quoteSent", probability: 40,
    ownerRole: "איש מכירות", slaTarget: "10 ימים (תוקף Quote)",
    breachAction: "תזכורת ללקוח בימים 7 ו-10; סגירת Quote ביום 11",
    transition: "הלקוח מאשר / דוחה את הצעת המחיר"
  },
  {
    id: "negotiation", labelKey: "pipe.st.negotiation", probability: 55,
    ownerRole: "איש מכירות / מנהל", slaTarget: "5 ימי עבודה",
    breachAction: "Escalation למנהל אגף",
    transition: "הסכמה על תנאים סופיים"
  },
  {
    id: "pending-payment", labelKey: "pipe.st.pendingPayment", probability: 75,
    ownerRole: "מערכת אוטומטית", slaTarget: "48 שעות",
    breachAction: "תזכורת תשלום (מייל + SMS); לאחר 14 יום — סגירת ההזדמנות",
    transition: "התשלום מבוצע בפועל"
  },
  {
    id: "paid", labelKey: "pipe.st.paid", probability: 85,
    ownerRole: "מערכת אוטומטית", slaTarget: "מיידי (אוטומטי)",
    breachAction: "Task אוטומטי לצוות מקצועי",
    transition: "התחלת תהליך אספקת השירות"
  },
  {
    id: "fulfillment", labelKey: "pipe.st.fulfillment", probability: 92,
    ownerRole: "כ\"א מקצועי / מערכת", slaTarget: "1 יום (דיגיטלי) עד 30 יום (פיזי)",
    breachAction: "Escalation למנהל חטיבה",
    transition: "השירות / המוצר נמסר ללקוח"
  },
  {
    id: "closed-won", labelKey: "pipe.st.won", probability: 100,
    ownerRole: "—", slaTarget: "—", breachAction: "—",
    transition: "ההזדמנות נסגרה בהצלחה", terminal: true
  },
  {
    id: "closed-lost", labelKey: "pipe.st.lost", probability: 0,
    ownerRole: "—", slaTarget: "—", breachAction: "—",
    transition: "הסיבה תתועד (Loss Reason)", terminal: true
  },
  {
    id: "cancelled", labelKey: "pipe.st.cancelled", probability: 0,
    ownerRole: "מערכת אוטומטית", slaTarget: "—",
    breachAction: "השלמת תהליך הזיכוי במרכבה",
    transition: "ביטול לאחר תשלום — תהליך זיכוי", terminal: true
  }
];

// ---------------------------------------------------------------------------
// 4.7 — Quote approval thresholds (5 tiers by amount)
// "נקבע לפי 3 פרמטרים: סוג מוצר, סכום הצעה וסוג לקוח"
// חריג: הצעת מחיר ללקוח אסטרטגי תמיד תדרוש אישור Account Manager.
// ---------------------------------------------------------------------------

export interface ApprovalThreshold {
  tier: number;
  range: string;
  minAmount: number;
  maxAmount: number | null;
  approver: string;
  slaHours: string;
}

export const QUOTE_APPROVAL_THRESHOLDS: ApprovalThreshold[] = [
  { tier: 1, range: "עד 10,000 ₪", minAmount: 0, maxAmount: 10000, approver: "אישור אוטומטי — ללא אישור נוסף", slaHours: "—" },
  { tier: 2, range: "10,000 - 50,000 ₪", minAmount: 10000, maxAmount: 50000, approver: "מרכז בכיר מכירות", slaHours: "24 שעות" },
  { tier: 3, range: "50,000 - 200,000 ₪", minAmount: 50000, maxAmount: 200000, approver: "אישור כפול: מרכז בכיר + מנהל אגף", slaHours: "48 שעות" },
  { tier: 4, range: "200,000 - 500,000 ₪", minAmount: 200000, maxAmount: 500000, approver: "מנהל אגף + סמנכ\"ל לקוחות", slaHours: "72 שעות" },
  { tier: 5, range: "מעל 500,000 ₪", minAmount: 500000, maxAmount: null, approver: "ועדת חריגים: סמנכ\"ל + מנכ\"ל + ראש חטיבה מקצועית", slaHours: "7 ימים" }
];

// 4.7 — Discount authority levels
export interface DiscountLevel {
  range: string;
  approver: string;
  documentation: string;
}

export const DISCOUNT_LEVELS: DiscountLevel[] = [
  { range: "הנחת מחירון אוטומטית (0-50% לפי Price Book)", approver: "מערכת — אוטומטי", documentation: "מסומן ב-Quote כ-Standard Discount" },
  { range: "עד 5%", approver: "איש מכירות", documentation: "תיעוד בשדה Discount_Reason__c" },
  { range: "5% - 10%", approver: "מרכז בכיר מכירות", documentation: "Approval Process" },
  { range: "10% - 20%", approver: "מנהל אגף מכירות", documentation: "Approval Process + תיעוד החלטה" },
  { range: "מעל 20%", approver: "סמנכ\"ל לקוחות", documentation: "Approval Process + פרוטוקול ועדה" }
];

// 4.7 — Price books
export interface PriceBookDef {
  name: string;
  discount: string;
  customerType: string;
  source: string;
}

export const PRICE_BOOKS: PriceBookDef[] = [
  { name: "מחירון סטנדרטי (Standard)", discount: "—", customerType: "כל לקוח שאינו זכאי להנחה", source: "פרסום שנתי של מפ\"י" },
  { name: "מחירון משרדי ממשלה", discount: "10-20%", customerType: "משרדי ממשלה", source: "החלטת הנהלה" },
  { name: "מחירון רשויות מקומיות", discount: "15-25%", customerType: "רשויות עם הסכם שו\"פ", source: "הסכמי שו\"פ" },
  { name: "מחירון אקדמי", discount: "50%", customerType: "אוניברסיטאות, מכוני מחקר", source: "החלטת הנהלה" },
  { name: "מחירון מודדים", discount: "מחיר מיוחד", customerType: "מודדים מוסמכים (CORS ועוד)", source: "פקודת המדידות" },
  { name: "מחירון Bundle", discount: "חבילות בהנחה", customerType: "מזמיני כמות מעל 50K ₪", source: "מדיניות מכירה" },
  { name: "מחירון ועדות תכנון", discount: "תעריף מיוחד", customerType: "ועדות תכנון מחוזיות ומקומיות", source: "הסכם משרד הפנים" }
];

// Pricing indexation rule (4.7)
export const PRICE_INDEXATION =
  "הצמדה למדד המחירים לצרכן (CPI) — עדכון אוטומטי שנתי בינואר; Flow מעדכן את כל ה-Pricebook Entries";

// ---------------------------------------------------------------------------
// 4.9 — Renewal timeline
// ---------------------------------------------------------------------------

export interface RenewalMilestone {
  offset: string;
  title: string;
  action: string;
}

export const RENEWAL_TIMELINE: RenewalMilestone[] = [
  { offset: "T-90", title: "התראה ראשונית", action: "Task אוטומטי ל-Account Manager + Email ללקוח. הצעת חידוש (Renewal Opportunity) נוצרת אוטומטית" },
  { offset: "T-60", title: "התראה שנייה", action: "אם לא הגיב — תזכורת ל-AM ולמנהל. בדיקת שביעות רצון" },
  { offset: "T-30", title: "התראה דחופה", action: "אם לא חודש — Escalation למנהל. שיחת טלפון יזומה ללקוח" },
  { offset: "T-7", title: "החלטה סופית", action: "חידוש / סיום החוזה / הארכה זמנית" },
  { offset: "T-0", title: "סיום החוזה", action: "באי-חידוש: סגירת המנוי, ביטול גישות, סקר \"Why Did We Lose?\"" }
];

// ---------------------------------------------------------------------------
// Mock pipeline entries (aligned to the 11-stage ids)
// ---------------------------------------------------------------------------

export interface PipelineEntry {
  routeId: string;
  routeName: string;
  routeType: RouteType;
  currentStage: string;
  enteredAt: string;
  daysInStage: number;
  slaStatus: "onTime" | "warning" | "breach";
  customerName: string;
  amount: number;
}

export const mockPipelineEntries: PipelineEntry[] = [
  { routeId: "OP-2026-301", routeName: "מנוי CORS - א.ל. מודדים", routeType: "B", currentStage: "paid", enteredAt: "05/07/2026", daysInStage: 0, slaStatus: "onTime", customerName: "א.ל. מודדים בע\"מ", amount: 18900 },
  { routeId: "OP-2026-302", routeName: "מפה בהתאמה אישית A2", routeType: "A", currentStage: "closed-won", enteredAt: "03/07/2026", daysInStage: 0, slaStatus: "onTime", customerName: "אורי כהן", amount: 284 },
  { routeId: "OP-2026-303", routeName: "מודד מבקר - 50 חלקות", routeType: "B", currentStage: "under-review", enteredAt: "01/07/2026", daysInStage: 4, slaStatus: "breach", customerName: "ל. מודדים", amount: 1700 },
  { routeId: "OP-2026-304", routeName: "שכבת GIS גושים - עיריית נתניה", routeType: "C", currentStage: "negotiation", enteredAt: "30/06/2026", daysInStage: 6, slaStatus: "warning", customerName: "עיריית נתניה", amount: 48500 },
  { routeId: "OP-2026-305", routeName: "אורתופוטו 25 קמ\"ר - חכ\"ל אשדוד", routeType: "C", currentStage: "quote-sent", enteredAt: "28/06/2026", daysInStage: 8, slaStatus: "warning", customerName: "חכ\"ל אשדוד", amount: 92000 },
  { routeId: "OP-2026-306", routeName: "הסכם שו\"פ 3 שנים - משרד התחבורה", routeType: "D", currentStage: "negotiation", enteredAt: "20/06/2026", daysInStage: 15, slaStatus: "breach", customerName: "משרד התחבורה", amount: 675000 },
  { routeId: "OP-2026-307", routeName: "WS שנתי - נתיבי ישראל", routeType: "C", currentStage: "pending-payment", enteredAt: "04/07/2026", daysInStage: 1, slaStatus: "onTime", customerName: "נתיבי ישראל", amount: 60000 },
  { routeId: "OP-2026-308", routeName: "מפות היסטוריות - חוקרת", routeType: "A", currentStage: "fulfillment", enteredAt: "05/07/2026", daysInStage: 0, slaStatus: "onTime", customerName: "ד\"ר רות אלון", amount: 220 },
  { routeId: "OP-2026-309", routeName: "תצ\"א ירושלים - שמאי", routeType: "C", currentStage: "needs-info", enteredAt: "27/06/2026", daysInStage: 8, slaStatus: "breach", customerName: "משרד שמאות גל", amount: 5400 },
  { routeId: "OP-2026-310", routeName: "גזטיר בתשלום - סטארטאפ", routeType: "C", currentStage: "new-lead", enteredAt: "05/07/2026", daysInStage: 0, slaStatus: "onTime", customerName: "GeoTech Ltd", amount: 12000 }
];

// Strategic Accounts data (Spec 4.4)
export type StrategicTier = 1 | 2 | 3;
export type AccountTrend = "up" | "flat" | "down";
export type AccountHealth = "healthy" | "watch" | "atRisk";

export interface StrategicAccount {
  id: string;
  name: string;
  tier: StrategicTier;
  accountManager: string;
  revenue12mNis: number;
  contractEnd: string;       // dd/mm/yyyy
  trend: AccountTrend;
  health: AccountHealth;
  crossSellOpportunities: number;
  segment: string;            // segment id
}

export const mockStrategicAccounts: StrategicAccount[] = [
  { id: "STR-001", name: "משרד החקלאות", tier: 1, accountManager: "אלעד אסרף", revenue12mNis: 1_240_000, contractEnd: "31/03/2027", trend: "up", health: "healthy", crossSellOpportunities: 3, segment: "government" },
  { id: "STR-002", name: "חברת חשמל לישראל", tier: 1, accountManager: "שרון לוי", revenue12mNis: 980_000, contractEnd: "30/04/2027", trend: "up", health: "healthy", crossSellOpportunities: 4, segment: "business" },
  { id: "STR-003", name: "משרד התחבורה", tier: 1, accountManager: "אלעד אסרף", revenue12mNis: 850_000, contractEnd: "31/12/2026", trend: "flat", health: "watch", crossSellOpportunities: 2, segment: "government" },
  { id: "STR-004", name: "עיריית תל אביב יפו", tier: 1, accountManager: "דנה מזרחי", revenue12mNis: 720_000, contractEnd: "31/12/2026", trend: "up", health: "healthy", crossSellOpportunities: 5, segment: "municipality" },
  { id: "STR-005", name: "סולל בונה תשתיות", tier: 2, accountManager: "יאיר אברמוב", revenue12mNis: 560_000, contractEnd: "31/01/2026", trend: "down", health: "atRisk", crossSellOpportunities: 1, segment: "business" },
  { id: "STR-006", name: "עיריית ירושלים", tier: 1, accountManager: "דנה מזרחי", revenue12mNis: 540_000, contractEnd: "30/06/2026", trend: "up", health: "healthy", crossSellOpportunities: 3, segment: "municipality" },
  { id: "STR-007", name: "משרד הביטחון", tier: 1, accountManager: "אלעד אסרף", revenue12mNis: 520_000, contractEnd: "31/12/2027", trend: "flat", health: "healthy", crossSellOpportunities: 2, segment: "government" },
  { id: "STR-008", name: "רכבת ישראל", tier: 2, accountManager: "שרון לוי", revenue12mNis: 410_000, contractEnd: "30/09/2026", trend: "up", health: "healthy", crossSellOpportunities: 4, segment: "business" },
  { id: "STR-009", name: "עיריית חיפה", tier: 2, accountManager: "דנה מזרחי", revenue12mNis: 380_000, contractEnd: "30/06/2026", trend: "down", health: "watch", crossSellOpportunities: 2, segment: "municipality" },
  { id: "STR-010", name: "רשות שדות התעופה", tier: 2, accountManager: "יאיר אברמוב", revenue12mNis: 320_000, contractEnd: "31/12/2026", trend: "flat", health: "healthy", crossSellOpportunities: 1, segment: "business" }
];

// Sales Pipeline per אפיון HLD V8 Chapter 4 (תפיסת ניהול המכירות)
// 4.1  — 11 unified pipeline stages (type-A routes jump stage 1 → 6)
// 4.3  — Route types A/B/C/D (D = Strategic Account) + per-route SLA in business days
// 4.6  — Single standard price book (no CPI), deterministic discounts only,
//        no special quote-approval processes
// 4.7  — Renewal timeline (T-90/60/30/7/0) — services only; CORS usage-triggered

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
    approvalRequired: false,
    description: "מחיר משתנה לפי הבקשה — איש מכירות מפיק הצעת מחיר ידנית; אישור לקוח לפני תשלום",
    routes: "מסלול 4 (מפה מותאמת), 5 (אורתופוטו), 6 (GIS), 7 (תצ\"א), 10 (קדסטר ירושלים), 12 (WS), חלק מ-13 (גזטיר בתשלום), מסלול 15 (גבולות בינלאומיים — חדש ב-V8)",
    color: "text-alert-yellow"
  },
  {
    id: "D",
    labelKey: "route.type.D",
    approvalRequired: false,
    description: "שירות אסטרטגי (Strategic Account) — ניהול שוטף של לקוחות שו\"פ וחבילות שירותים",
    routes: "הסכמי שו\"פ, לקוחות אסטרטגיים עם Bundle של שירותים מרובים",
    color: "text-tertiary"
  }
];

/** [HLD V8] 15 sales routes (מסלול 15 גבולות בינלאומיים נוסף באיחוד V8) */
export const ROUTES_COUNT = 15;

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
// 4.6 [HLD V8] — Pricing & discounts: the V7 approval/discount ladders were
// REMOVED in the merged spec. Verbatim policy lines:
// ---------------------------------------------------------------------------

/** [HLD 4.6.4 verbatim] */
export const QUOTE_APPROVAL_POLICY =
  "הוגדר כי לא נדרש תהליכי אישור מיוחדים בתהליכי המכירה";

/** [HLD 4.6.1 verbatim] single standard price book, no CPI indexation */
export const PRICE_BOOK_POLICY =
  "המערכת תנהל מחירון סטנדרטי שאינו תלוי במדד, ולכן לא יתבצעו עדכוני מחירים אוטומטיים במערכת. " +
  "שינויים עתידיים במחירונים יתבצעו באופן ידני. הרשאות לניהול המחירונים יינתנו למנהל המכירות ולמנהל המערכת (Admin) בלבד.";

/** [HLD 4.6.3] "לא יוגדרו כלל הנחות ידניות בתהליך" — deterministic discounts only */
export interface DeterministicDiscount {
  name: string;
  rule: string;
  management: string;
}

export const DETERMINISTIC_DISCOUNTS: DeterministicDiscount[] = [
  {
    name: "הנחת מפיץ",
    rule: "ברירת מחדל 20% — דינמית, ללא תחולה רטרואקטיבית",
    management: "מנוהלת על ידי מנהל המכירות ומנהל המערכת"
  },
  {
    name: "רישיון אקדמי",
    rule: "50% הנחה עד תקרת 5,000 ₪ הראשונים (דוגמה: עסקה של 10,000 ₪ → תשלום 7,500 ₪)",
    management: "מוחלת אוטומטית לפי סוג רישיון בתהליך אורתופוטו"
  },
  {
    name: "מדרגות מפיצים CORS",
    rule: "תעריף RTK לפי מספר מנויים: 300 / 260 / 220 / 180 ₪ לחודש; מעל 100 — טיפול ידני",
    management: "מחושבת אוטומטית לפי כמות מנויים פעילים"
  }
];

// ---------------------------------------------------------------------------
// 4.3.4 [HLD V8] — SLA per sales route, in business days (replaces the V7
// per-stage SLA table). Escalation runs as a background process.
// ---------------------------------------------------------------------------

export interface RouteSla {
  route: string;
  sla: string;
}

export const SLA_BY_ROUTE: RouteSla[] = [
  { route: "אורתופוטו ומודלי גבהים", sla: "4 ימי עסקים (טופס → הצעת מחיר) + 4 ימי עסקים (תשלום → אספקה)" },
  { route: "CORS — RTK", sla: "7 ימי עסקים (טופס → הודעת שליחת SIM)" },
  { route: "CORS — VRS", sla: "4 ימי עסקים (טופס → אישור תשלום)" },
  { route: "מפות מודרניות", sla: "3 + 3 ימי עסקים" },
  { route: "מפות היסטוריות", sla: "סרוק: 3 + 3 · מודפס: 3 + 3 + 3 ימי עסקים" },
  { route: "גבולות בינלאומיים (מסלול 15)", sla: "4 + 4 ימי עסקים" },
  { route: "מודד מבקר", sla: "לא קיים SLA (לפי האפיון)" },
  { route: "יתר המסלולים", sla: "יוגדר באפיון המפורט (טרם נקבע במסמך)" }
];

// ---------------------------------------------------------------------------
// 4.7 — Renewal timeline
// [HLD V8] "ניהול החידושים יתבצע רק על מוצרים אשר נמכרים כשירותים";
// CORS: חידוש מבוסס-שימוש — VRS בחציית 93% ניצול, RTK ביתרה של ≤2 חודשים.
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

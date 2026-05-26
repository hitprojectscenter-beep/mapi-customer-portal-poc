// Sales Pipeline definitions per Spec Chapter 4.1 & 4.2
// Each stage has: owner, SLA (days), auto actions

import type { TKey } from "./i18n";

export type RouteType = "A" | "B" | "C" | "D";

export interface RouteTypeDef {
  id: RouteType;
  labelKey: TKey;
  approvalRequired: boolean;
  description: string;
  /** Tailwind text color */
  color: string;
}

export const ROUTE_TYPES: RouteTypeDef[] = [
  { id: "A", labelKey: "route.type.A", approvalRequired: false, description: "מסלולים שמסתיימים בתשלום אוטומטי", color: "text-positive-green" },
  { id: "B", labelKey: "route.type.B", approvalRequired: false, description: "שירות עצמי + אישור פנימי טכני", color: "text-secondary" },
  { id: "C", labelKey: "route.type.C", approvalRequired: true, description: "דורש איש מכירות ליצירת הצעה", color: "text-alert-yellow" },
  { id: "D", labelKey: "route.type.D", approvalRequired: true, description: "לקוח אסטרטגי, חוזה רב-שנתי", color: "text-tertiary" }
];

export interface PipelineStage {
  id: string;
  labelKey: TKey;
  slaDays: number;
  ownerRole: string;     // who is responsible
  autoActions: string[]; // what happens automatically
}

export const PIPELINE_STAGES: PipelineStage[] = [
  { id: "lead", labelKey: "pipe.stage.lead", slaDays: 1, ownerRole: "Marketing Auto", autoActions: ["Lead score", "Auto routing", "Auto-response email"] },
  { id: "qualified", labelKey: "pipe.stage.qualified", slaDays: 2, ownerRole: "Sales Rep", autoActions: ["Assign to rep", "Discovery call task"] },
  { id: "needs", labelKey: "pipe.stage.needs", slaDays: 3, ownerRole: "Sales Rep + Division", autoActions: ["Internal feasibility check", "Solution proposal draft"] },
  { id: "quote", labelKey: "pipe.stage.quote", slaDays: 2, ownerRole: "Sales Rep", autoActions: ["DocGen Quote PDF", "Send via email + SMS", "Set 30-day validity"] },
  { id: "negotiation", labelKey: "pipe.stage.negotiation", slaDays: 7, ownerRole: "Sales Rep + Approver", autoActions: ["Trigger approval matrix", "Track follow-ups"] },
  { id: "won", labelKey: "pipe.stage.won", slaDays: 1, ownerRole: "Sales Rep", autoActions: ["Create Order", "Create Subscription (if applicable)", "CRM ROI registration"] },
  { id: "fulfillment", labelKey: "pipe.stage.fulfillment", slaDays: 14, ownerRole: "Professional Division", autoActions: ["Assign technical task", "Track delivery SLA"] },
  { id: "delivered", labelKey: "pipe.stage.delivered", slaDays: 1, ownerRole: "Sales Ops", autoActions: ["Send delivery confirmation", "CSAT survey", "Schedule follow-up cross-sell"] }
];

// Sample SLA data per route type x stage
export interface PipelineEntry {
  routeId: string;       // service slug
  routeName: string;
  routeType: RouteType;
  currentStage: string;  // stage id
  enteredAt: string;     // date
  daysInStage: number;
  slaStatus: "onTime" | "warning" | "breach";
  customerName: string;
  amount: number;
}

export const mockPipelineEntries: PipelineEntry[] = [
  { routeId: "OP-2026-301", routeName: "מנוי CORS - א.ל. מודדים", routeType: "A", currentStage: "won", enteredAt: "24/05/2026", daysInStage: 1, slaStatus: "onTime", customerName: "א.ל. מודדים בע\"מ", amount: 18900 },
  { routeId: "OP-2026-302", routeName: "מפה בהתאמה אישית A2", routeType: "A", currentStage: "delivered", enteredAt: "20/05/2026", daysInStage: 0, slaStatus: "onTime", customerName: "אורי כהן", amount: 284 },
  { routeId: "OP-2026-303", routeName: "מודד מבקר - 50 חלקות", routeType: "B", currentStage: "needs", enteredAt: "22/05/2026", daysInStage: 4, slaStatus: "warning", customerName: "ל. מודדים", amount: 1700 },
  { routeId: "OP-2026-304", routeName: "שכבת GIS גושים - עיריית נתניה", routeType: "C", currentStage: "negotiation", enteredAt: "20/05/2026", daysInStage: 6, slaStatus: "warning", customerName: "עיריית נתניה", amount: 48500 },
  { routeId: "OP-2026-305", routeName: "אורתופוטו 25 קמ\"ר", routeType: "C", currentStage: "quote", enteredAt: "23/05/2026", daysInStage: 3, slaStatus: "breach", customerName: "סולל בונה תשתיות", amount: 185000 },
  { routeId: "OP-2026-306", routeName: "DEM ארצי 0.5מ' - משרד התחבורה", routeType: "D", currentStage: "negotiation", enteredAt: "15/05/2026", daysInStage: 11, slaStatus: "breach", customerName: "משרד התחבורה", amount: 340000 },
  { routeId: "OP-2026-307", routeName: "API נתונים שנתי - חברת חשמל", routeType: "D", currentStage: "won", enteredAt: "25/05/2026", daysInStage: 1, slaStatus: "onTime", customerName: "חברת חשמל", amount: 420000 },
  { routeId: "OP-2026-308", routeName: "תצ\"א היסטוריים - ארכיון תל אביב", routeType: "B", currentStage: "fulfillment", enteredAt: "10/05/2026", daysInStage: 16, slaStatus: "warning", customerName: "ארכיון העירייה", amount: 2800 },
  { routeId: "OP-2026-309", routeName: "מנוי WS - מועצה אזורית עמק חפר", routeType: "C", currentStage: "qualified", enteredAt: "24/05/2026", daysInStage: 2, slaStatus: "onTime", customerName: "מועצה אזורית עמק חפר", amount: 2000 },
  { routeId: "OP-2026-310", routeName: "פוסטר סמלי המדינה (כמות)", routeType: "A", currentStage: "delivered", enteredAt: "18/05/2026", daysInStage: 0, slaStatus: "onTime", customerName: "בית ספר תיכון", amount: 1200 }
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

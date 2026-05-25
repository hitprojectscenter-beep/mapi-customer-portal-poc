// Internal admin/sales tool data models and mock data.
// These power the management console for MAPI sales / operations staff.

import type { SegmentId } from "./segments";

// ------------------------------------------------------------------
// Pricing
// ------------------------------------------------------------------

export type IndexationType = "cpi" | "fixed" | "none";

export interface PricingRule {
  id: string;
  serviceSlug: string;
  serviceName: string;
  segment: SegmentId;
  basePrice: number;
  discountPercent: number;
  indexation: IndexationType;
  /** Above this amount the rule needs CFO+CEO approval */
  exceptionCeiling: number;
  effectiveFrom: string;
}

export const mockPricingRules: PricingRule[] = [
  { id: "PR-001", serviceSlug: "custom-map", serviceName: "מפה בהתאמה אישית", segment: "citizen", basePrice: 284, discountPercent: 0, indexation: "cpi", exceptionCeiling: 10000, effectiveFrom: "01/01/2026" },
  { id: "PR-002", serviceSlug: "custom-map", serviceName: "מפה בהתאמה אישית", segment: "professional", basePrice: 284, discountPercent: 8, indexation: "cpi", exceptionCeiling: 25000, effectiveFrom: "01/01/2026" },
  { id: "PR-003", serviceSlug: "cors-subscription", serviceName: "מנוי CORS", segment: "surveyor", basePrice: 300, discountPercent: 10, indexation: "cpi", exceptionCeiling: 50000, effectiveFrom: "01/01/2026" },
  { id: "PR-004", serviceSlug: "gis-layers", serviceName: "שכבות GIS", segment: "municipality", basePrice: 1450, discountPercent: 15, indexation: "fixed", exceptionCeiling: 100000, effectiveFrom: "01/01/2026" },
  { id: "PR-005", serviceSlug: "gis-layers", serviceName: "שכבות GIS", segment: "government", basePrice: 1450, discountPercent: 25, indexation: "none", exceptionCeiling: 500000, effectiveFrom: "01/01/2026" },
  { id: "PR-006", serviceSlug: "orthophoto-mosaic", serviceName: "פסיפס אורתופוטו", segment: "business", basePrice: 12000, discountPercent: 20, indexation: "cpi", exceptionCeiling: 250000, effectiveFrom: "01/01/2026" },
  { id: "PR-007", serviceSlug: "aerial-photos", serviceName: "תצלומי אוויר", segment: "citizen", basePrice: 350, discountPercent: 0, indexation: "cpi", exceptionCeiling: 10000, effectiveFrom: "01/01/2026" },
  { id: "PR-008", serviceSlug: "surveyor-inspector", serviceName: "מודד מבקר", segment: "surveyor", basePrice: 2500, discountPercent: 10, indexation: "cpi", exceptionCeiling: 50000, effectiveFrom: "01/01/2026" },
];

// ------------------------------------------------------------------
// Quote Approvals
// ------------------------------------------------------------------

export type ApprovalLevel = "sales" | "division" | "cfo" | "ceo";
export type ApprovalStatus = "pending" | "approved" | "rejected" | "exception";

export interface QuoteApproval {
  id: string;
  quoteId: string;
  customerName: string;
  segment: SegmentId;
  serviceName: string;
  amount: number;
  discountPercent: number;
  level: ApprovalLevel;
  status: ApprovalStatus;
  agingDays: number;
  createdAt: string;
}

export const mockApprovals: QuoteApproval[] = [
  { id: "AP-1001", quoteId: "QT-2026-088", customerName: "עיריית נתניה", segment: "municipality", serviceName: "שכבת GIS גושים+חלקות", amount: 48500, discountPercent: 15, level: "division", status: "pending", agingDays: 2, createdAt: "23/05/2026" },
  { id: "AP-1002", quoteId: "QT-2026-091", customerName: "סולל בונה תשתיות", segment: "business", serviceName: "אורתופוטו 25 ק\"מ²", amount: 185000, discountPercent: 22, level: "cfo", status: "pending", agingDays: 5, createdAt: "20/05/2026" },
  { id: "AP-1003", quoteId: "QT-2026-095", customerName: "משרד התחבורה", segment: "government", serviceName: "DEM ארצי 0.5מ'", amount: 340000, discountPercent: 28, level: "ceo", status: "pending", agingDays: 1, createdAt: "24/05/2026" },
  { id: "AP-1004", quoteId: "QT-2026-097", customerName: "א.ל. מודדים בע\"מ", segment: "surveyor", serviceName: "מנוי CORS 3 שנים", amount: 18900, discountPercent: 12, level: "sales", status: "pending", agingDays: 0, createdAt: "25/05/2026" },
  { id: "AP-1005", quoteId: "QT-2026-082", customerName: "אדריכלים בקר ושות'", segment: "professional", serviceName: "חבילת מפות שנתית", amount: 7400, discountPercent: 8, level: "sales", status: "approved", agingDays: 8, createdAt: "17/05/2026" },
  { id: "AP-1006", quoteId: "QT-2026-078", customerName: "מועצה אזורית מטה יהודה", segment: "municipality", serviceName: "פסיפס אורתופוטו", amount: 65000, discountPercent: 18, level: "division", status: "approved", agingDays: 12, createdAt: "13/05/2026" },
  { id: "AP-1007", quoteId: "QT-2026-070", customerName: "חברת חשמל", segment: "business", serviceName: "API נתונים שנתי", amount: 420000, discountPercent: 30, level: "ceo", status: "exception", agingDays: 14, createdAt: "11/05/2026" },
];

// ------------------------------------------------------------------
// Subscriptions
// ------------------------------------------------------------------

export type RenewalStatus = "active" | "due60" | "due30" | "expired" | "renewed";

export interface Subscription {
  id: string;
  customerName: string;
  segment: SegmentId;
  serviceName: string;
  startDate: string;
  endDate: string;
  annualValue: number;
  renewalStatus: RenewalStatus;
  multiYear: boolean;
  contractYears: number;
}

export const mockSubscriptions: Subscription[] = [
  { id: "SUB-2024-012", customerName: "מודד יוסי לוי", segment: "surveyor", serviceName: "מנוי CORS - יחיד", startDate: "01/06/2024", endDate: "31/05/2026", annualValue: 3600, renewalStatus: "due30", multiYear: false, contractYears: 1 },
  { id: "SUB-2024-045", customerName: "א.ל. מודדים בע\"מ", segment: "surveyor", serviceName: "מנוי CORS - 5 משתמשים", startDate: "01/03/2024", endDate: "28/02/2026", annualValue: 18000, renewalStatus: "expired", multiYear: false, contractYears: 1 },
  { id: "SUB-2023-088", customerName: "עיריית רעננה", segment: "municipality", serviceName: "API שכבות GIS", startDate: "01/01/2024", endDate: "31/12/2026", annualValue: 78000, renewalStatus: "active", multiYear: true, contractYears: 3 },
  { id: "SUB-2024-101", customerName: "משרד החקלאות", segment: "government", serviceName: "DEM + אורתופוטו ארצי", startDate: "01/04/2024", endDate: "31/03/2027", annualValue: 320000, renewalStatus: "active", multiYear: true, contractYears: 3 },
  { id: "SUB-2025-055", customerName: "אדריכלים בקר ושות'", segment: "professional", serviceName: "חבילת מפות שנתית", startDate: "01/07/2025", endDate: "30/06/2026", annualValue: 7400, renewalStatus: "due60", multiYear: false, contractYears: 1 },
  { id: "SUB-2024-200", customerName: "חברת חשמל", segment: "business", serviceName: "API נתונים שנתי", startDate: "01/05/2024", endDate: "30/04/2027", annualValue: 420000, renewalStatus: "active", multiYear: true, contractYears: 3 },
  { id: "SUB-2023-150", customerName: "סולל בונה תשתיות", segment: "business", serviceName: "אורתופוטו מנוי", startDate: "01/02/2024", endDate: "31/01/2026", annualValue: 145000, renewalStatus: "renewed", multiYear: false, contractYears: 1 },
];

// ------------------------------------------------------------------
// Sales pipeline (for sales dashboard)
// ------------------------------------------------------------------

export type SalesStage = "lead" | "qualified" | "quote" | "negotiation" | "won";

export interface PipelineEntry {
  stage: SalesStage;
  count: number;
  value: number;
}

export const mockPipeline: PipelineEntry[] = [
  { stage: "lead", count: 248, value: 4_200_000 },
  { stage: "qualified", count: 92, value: 2_650_000 },
  { stage: "quote", count: 41, value: 1_840_000 },
  { stage: "negotiation", count: 19, value: 1_080_000 },
  { stage: "won", count: 12, value: 640_000 }
];

export interface RevenueBySegment {
  segment: SegmentId;
  revenue: number;
  target: number;
  percent: number;
}

export const mockRevenueBySegment: RevenueBySegment[] = [
  { segment: "citizen",       revenue: 1_240_000, target: 1_500_000, percent: 82.7 },
  { segment: "surveyor",      revenue: 2_180_000, target: 2_000_000, percent: 109.0 },
  { segment: "municipality",  revenue: 3_450_000, target: 3_200_000, percent: 107.8 },
  { segment: "government",    revenue: 6_780_000, target: 7_500_000, percent: 90.4 },
  { segment: "professional",  revenue:   980_000, target: 1_100_000, percent: 89.1 },
  { segment: "business",      revenue: 4_320_000, target: 4_000_000, percent: 108.0 }
];

// ------------------------------------------------------------------
// Responsibility Matrix - sales vs professional divisions
// ------------------------------------------------------------------

export type Role = "sales" | "division" | "both";

export interface ResponsibilityRow {
  stageKey: string;          // i18n key
  responsible: Role;
}

export const responsibilityMatrix: ResponsibilityRow[] = [
  { stageKey: "sales.stage.lead", responsible: "sales" },
  { stageKey: "sales.stage.qualified", responsible: "sales" },
  { stageKey: "sales.stage.quote", responsible: "both" },
  { stageKey: "sales.stage.negotiation", responsible: "sales" },
  { stageKey: "sales.stage.won", responsible: "both" }
];

// ------------------------------------------------------------------
// Content ownership
// ------------------------------------------------------------------

export type ContentOwner = "sales" | "geo" | "cadastre" | "it";
export type ContentStatus = "current" | "review" | "outdated";

export interface ContentItem {
  id: string;
  page: string;
  owner: ContentOwner;
  lastUpdated: string;
  nextReview: string;
  status: ContentStatus;
}

export const mockContentItems: ContentItem[] = [
  { id: "CN-01", page: "דף שירות: מפה בהתאמה אישית", owner: "cadastre", lastUpdated: "12/04/2026", nextReview: "12/07/2026", status: "current" },
  { id: "CN-02", page: "מחירון 2026", owner: "sales", lastUpdated: "01/01/2026", nextReview: "01/04/2026", status: "review" },
  { id: "CN-03", page: "דף שירות: CORS", owner: "geo", lastUpdated: "20/03/2026", nextReview: "20/06/2026", status: "current" },
  { id: "CN-04", page: "FAQ - הזמנות ותשלומים", owner: "sales", lastUpdated: "15/02/2026", nextReview: "15/05/2026", status: "review" },
  { id: "CN-05", page: "FAQ - שירותים מקצועיים", owner: "geo", lastUpdated: "10/03/2026", nextReview: "10/06/2026", status: "current" },
  { id: "CN-06", page: "זמני אספקה - כל השירותים", owner: "it", lastUpdated: "01/02/2026", nextReview: "01/05/2026", status: "outdated" },
  { id: "CN-07", page: "דף שירות: מודד מבקר", owner: "cadastre", lastUpdated: "05/05/2026", nextReview: "05/08/2026", status: "current" },
];

// ------------------------------------------------------------------
// Historical data migration scope
// ------------------------------------------------------------------

export type MigrationStatus = "planned" | "inProgress" | "done";

export interface MigrationEntity {
  entityKey: string;
  years: number;
  estimatedRecords: number;
  targetStructure: string;
  status: MigrationStatus;
}

export const migrationScope: MigrationEntity[] = [
  { entityKey: "mig.entity.customers", years: 10, estimatedRecords: 45000, targetStructure: "Account + Contact (Salesforce)", status: "inProgress" },
  { entityKey: "mig.entity.orders", years: 5, estimatedRecords: 128000, targetStructure: "Order + Order Item (PSS)", status: "planned" },
  { entityKey: "mig.entity.quotes", years: 5, estimatedRecords: 38000, targetStructure: "Quote (CPQ)", status: "planned" },
  { entityKey: "mig.entity.subs", years: 7, estimatedRecords: 9800, targetStructure: "Asset + Contract", status: "inProgress" },
  { entityKey: "mig.entity.invoices", years: 7, estimatedRecords: 142000, targetStructure: "Custom: Invoice__c", status: "planned" },
];

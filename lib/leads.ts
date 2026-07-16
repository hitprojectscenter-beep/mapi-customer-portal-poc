"use client";

// AI Lead Management — per אפיון HLD V8:
//   4.2  ניהול לידים: creation rules, PRODUCT FAMILY, dedup, conversion trigger
//   8.1  automations A1-A5 (auto-response, assignment, scoring, re-engagement, conversion)
//   14.5 leads dashboard KPIs incl. Lead Scoring Distribution (High/Med/Low)
//   15.6 R3 Mass Email Processing (RPA+AI: classify, extract, create lead)
//
// Spec-mandated facts are marked [HLD]. Where the spec leaves values open
// (scoring weights, full status list) the POC decision is marked [POC].

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------

// [HLD 4.2] statuses seen in the spec: New / Working / Qualified / Unqualified
// (+ "No Response" as the A4 re-engagement trigger). "converted" is the
// terminal state after A5. The spec's own status table was left TBD.
export type LeadStatus = "new" | "working" | "qualified" | "unqualified" | "noResponse" | "converted";

// [HLD 4.2] sources: form abandonment, manual, contact form, campaign
// + channels mentioned elsewhere: incoming email (R3), chatbot, referral.
export type LeadSource = "form" | "formAbandon" | "chatbot" | "email" | "campaign" | "referral" | "manual" | "website";

// [HLD] global PRODUCT FAMILY picklist — the 10 product families (ch.6 table);
// determines the sales process and Opportunity record type on conversion.
export type ProductFamily =
  | "maps" | "customMaps" | "elevation" | "gisLayers" | "aerial"
  | "cadastre" | "geodesy" | "certificates" | "technology" | "agreements";

export type ScoreBand = "high" | "med" | "low";

export interface LeadEvent {
  at: string; // ISO
  type: "created" | "autoEmail" | "assigned" | "scored" | "status" | "reEngaged" | "converted" | "touch" | "note";
  note: string;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  family: ProductFamily;
  /** Free-text service interest (slug or headline) */
  interest: string;
  source: LeadSource;
  /** Campaign name when source=campaign [HLD 4.2: dedicated campaign field] */
  campaign: string;
  status: LeadStatus;
  /** Estimated deal scope in ₪ (0 = unknown) — scoring criterion "היקף" */
  estimatedValue: number;
  score: number;
  band: ScoreBand;
  assignee: string;
  queue: string;
  createdAt: string;   // ISO
  firstTouchAt: string | null;
  lastActivityAt: string; // ISO
  convertedTo: { account: string; contact: string; opportunity: string } | null;
  events: LeadEvent[];
}

// ---------------------------------------------------------------------------
// PRODUCT FAMILY catalog [HLD ch.6 — 10 משפחות מוצרים]
// ---------------------------------------------------------------------------

export interface FamilyDef {
  id: ProductFamily;
  he: string;
  icon: string;
  /** [POC] service-type scoring weight (spec criterion "סוג שירות", weights open) */
  typeScore: number;
  /** Work queue + assignee. תצ"א and CORS names are per spec 4.3.5;
   *  the rest are POC assignments from the spec's ch.1.5 staff table. */
  queue: string;
  assignee: string;
}

export const FAMILIES: FamilyDef[] = [
  { id: "maps", he: "מפות", icon: "map", typeScore: 8, queue: "תור מפות", assignee: "דוד גלידאי" },
  { id: "customMaps", he: "מפות מותאמות אישית", icon: "design_services", typeScore: 20, queue: "תור מפות בהתאמה", assignee: "לימור דור" },
  { id: "elevation", he: "מוצרי גובה ואורתופוטו", icon: "terrain", typeScore: 25, queue: "תור פוטוגרמטריה", assignee: "נעם שורץ" },
  { id: "gisLayers", he: "שכבות מידע (GIS)", icon: "layers", typeScore: 22, queue: "תור GIS", assignee: "סרגיי זלצמן" },
  { id: "aerial", he: "תצלומי אוויר (תצ\"א)", icon: "flight", typeScore: 25, queue: "תור תצ\"א", assignee: "ניקולא ג'מאליה" },
  { id: "cadastre", he: "שירותי קדסטר", icon: "grid_on", typeScore: 15, queue: "תור קדסטר", assignee: "אתי כתריאל" },
  { id: "geodesy", he: "שירותי גיאודזיה (CORS)", icon: "satellite_alt", typeScore: 30, queue: "תור גיאודזיה", assignee: "עומר בר" },
  { id: "certificates", he: "תעודות עובד ציבור (תע\"צ)", icon: "verified", typeScore: 12, queue: "תור תע\"צ", assignee: "הייתם שאהין" },
  { id: "technology", he: "שירותי טכנולוגיה (WS)", icon: "api", typeScore: 20, queue: "תור טכנולוגיה", assignee: "דני גמזו" },
  { id: "agreements", he: "הסכמי שו\"פ", icon: "handshake", typeScore: 30, queue: "לקוחות אסטרטגיים", assignee: "אלעד אסרף" }
];

export function familyDef(id: ProductFamily): FamilyDef {
  return FAMILIES.find(f => f.id === id) || FAMILIES[0];
}

/** Map a catalog slug and/or category to a product family (capture hooks).
 *  Slug wins (more specific), category is the fallback. */
export function familyFromCategory(slugOrCategory: string, category?: string): ProductFamily {
  const map: Record<string, ProductFamily> = {
    // slugs
    "historic-maps": "maps", "custom-map": "customMaps", "aerial-photos": "aerial",
    "elevation-data": "elevation", "gis-layers": "gisLayers", "cadastral-info": "cadastre",
    "cors-subscription": "geodesy", "surveyor-inspector": "cadastre", "wms-subscription": "technology",
    // catalog categories
    maps: "maps", cadastre: "cadastre", geodesy: "geodesy",
    orthophoto: "elevation", gis: "gisLayers", certificates: "certificates",
    // extras
    custom: "customMaps", aerial: "aerial", elevation: "elevation", api: "technology"
  };
  return map[slugOrCategory] || (category ? map[category] : undefined) || "maps";
}

// ---------------------------------------------------------------------------
// Scoring — A3 [HLD 8.1]: "ניקוד הליד לפי קריטריונים (סוג שירות, היקף, מקור)"
// Formula field in Salesforce; here a deterministic weighted sum shown as the
// "AI score". Bands per 14.5: High / Med / Low.
// [POC] weights and band thresholds — the spec leaves them open.
// ---------------------------------------------------------------------------

const SOURCE_SCORE: Record<LeadSource, number> = {
  form: 30,        // completed inquiry form — highest intent
  referral: 26,
  chatbot: 20,
  email: 20,
  formAbandon: 14, // spec's primary auto-capture channel
  campaign: 14,
  manual: 12,
  website: 8
};

export const SOURCE_LABELS: Record<LeadSource, string> = {
  form: "טופס באתר",
  formAbandon: "נטישת טופס",
  chatbot: "צ'אטבוט",
  email: "מייל נכנס (AI)",
  campaign: "קמפיין",
  referral: "המלצה",
  manual: "יצירה ידנית",
  website: "אתר"
};

function scopeScore(valueNis: number): number {
  if (valueNis >= 50_000) return 40;
  if (valueNis >= 10_000) return 30;
  if (valueNis >= 2_000) return 18;
  if (valueNis > 0) return 8;
  return 12; // unknown scope — neutral
}

export interface ScoreBreakdown {
  serviceType: number; // 0-30
  scope: number;       // 0-40
  source: number;      // 0-30
  total: number;       // 0-100
  band: ScoreBand;
}

export function scoreLead(family: ProductFamily, estimatedValue: number, source: LeadSource): ScoreBreakdown {
  const serviceType = familyDef(family).typeScore;
  const scope = scopeScore(estimatedValue);
  const src = SOURCE_SCORE[source];
  const total = serviceType + scope + src;
  const band: ScoreBand = total >= 70 ? "high" : total >= 40 ? "med" : "low";
  return { serviceType, scope, source: src, total, band };
}

// ---------------------------------------------------------------------------
// Automations catalog [HLD 8.1 — verbatim triggers/actions]
// ---------------------------------------------------------------------------

export interface LeadAutomation {
  id: string;
  name: string;
  trigger: string;
  action: string;
}

export const LEAD_AUTOMATIONS: LeadAutomation[] = [
  { id: "A1", name: "Auto-Response Email", trigger: "Lead Created", action: "שליחת מייל אוטומטי לליד עם אישור הקבלה" },
  { id: "A2", name: "Lead Assignment", trigger: "Lead Created", action: "ניתוב הליד לאיש מכירות לפי Lead Assignment Rules (לפי מוצר / אזור / סוג לקוח)" },
  { id: "A3", name: "Lead Scoring", trigger: "Lead Updated", action: "ניקוד הליד לפי קריטריונים (סוג שירות, היקף, מקור). שדה Formula" },
  { id: "A4", name: "Re-engagement", trigger: "Lead Status = No Response (לאחר 14 יום)", action: "שליחת מייל / SMS תזכורת" },
  { id: "A5", name: "Lead to Customer Conversion", trigger: "Lead Status = Qualified", action: "המרה אוטומטית ל-Account + Contact + Opportunity" }
];

// SLA [HLD]: first response < 2 hours (17.3); untouched > 2 days = breach (14.5)
export const LEAD_SLA = { firstTouchHours: 2, untouchedBreachDays: 2, reEngageDays: 14 };

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------

const LEADS_KEY = "mapi_leads_v1";

function nowIso(): string { return new Date().toISOString(); }

function daysAgo(days: number, hourOffset = 0): string {
  const d = new Date(Date.now() - days * 86_400_000 - hourOffset * 3_600_000);
  return d.toISOString();
}

export function newLeadId(): string {
  return `LD-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`.toUpperCase();
}

function buildLead(input: {
  id?: string;
  firstName: string; lastName: string; email?: string; phone?: string; organization?: string;
  family: ProductFamily; interest?: string; source: LeadSource; campaign?: string;
  estimatedValue?: number; status?: LeadStatus; createdAt?: string;
  firstTouchAt?: string | null; convertedTo?: Lead["convertedTo"]; extraEvents?: LeadEvent[];
}): Lead {
  const created = input.createdAt || nowIso();
  const value = input.estimatedValue ?? 0;
  const s = scoreLead(input.family, value, input.source);
  const fam = familyDef(input.family);
  const events: LeadEvent[] = [
    { at: created, type: "created", note: `ליד נוצר (מקור: ${SOURCE_LABELS[input.source]})` },
    { at: created, type: "autoEmail", note: "A1: מייל אישור קבלה נשלח ללקוח" },
    { at: created, type: "assigned", note: `A2: נותב אל ${fam.assignee} (${fam.queue})` },
    { at: created, type: "scored", note: `A3: ניקוד ${s.total}/100 (${s.band === "high" ? "High" : s.band === "med" ? "Med" : "Low"})` },
    ...(input.extraEvents || [])
  ];
  return {
    id: input.id || newLeadId(),
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email || "",
    phone: input.phone || "",
    organization: input.organization || "",
    family: input.family,
    interest: input.interest || "",
    source: input.source,
    campaign: input.campaign || "",
    status: input.status || "new",
    estimatedValue: value,
    score: s.total,
    band: s.band,
    assignee: fam.assignee,
    queue: fam.queue,
    createdAt: created,
    firstTouchAt: input.firstTouchAt ?? null,
    lastActivityAt: events[events.length - 1].at,
    convertedTo: input.convertedTo || null,
    events
  };
}

// Seed inbox — realistic spread across statuses/sources/bands so the 14.5
// dashboard widgets have something to show on first load.
function seedLeads(): Lead[] {
  return [
    buildLead({ firstName: "יעל", lastName: "ברקוביץ", email: "yael.b@netivei.co.il", organization: "נתיבי ישראל", family: "agreements", interest: "הסכם שו\"פ רב-שנתי", source: "referral", estimatedValue: 320_000, createdAt: daysAgo(0, 1) }),
    buildLead({ firstName: "אמיר", lastName: "דהאן", email: "amir@ad-survey.co.il", phone: "052-8811234", organization: "א.ד. מדידות", family: "geodesy", interest: "מנוי CORS RTK שנתי", source: "form", estimatedValue: 18_900, createdAt: daysAgo(0, 3) }),
    buildLead({ firstName: "מיכל", lastName: "רוזן", email: "michal@haifa.muni.il", organization: "עיריית חיפה", family: "gisLayers", interest: "שכבות גושים וחלקות", source: "form", estimatedValue: 46_000, createdAt: daysAgo(1) }),
    buildLead({ firstName: "דוד", lastName: "פרץ", phone: "054-3312876", family: "aerial", interest: "תצלומי אוויר היסטוריים - אזור רחובות", source: "formAbandon", estimatedValue: 4_200, createdAt: daysAgo(1, 6) }),
    buildLead({ firstName: "רונית", lastName: "שגב", email: "ronit.segev@gmail.com", family: "maps", interest: "מפת ישראל מודרנית ממוסגרת", source: "chatbot", estimatedValue: 320, createdAt: daysAgo(2) }),
    buildLead({ firstName: "חיים", lastName: "אלבז", email: "haim@hakal-ashdod.co.il", phone: "053-7745210", organization: "חכ\"ל אשדוד", family: "elevation", interest: "אורתופוטו 25 קמ\"ר + DTM", source: "email", estimatedValue: 92_000, status: "working", createdAt: daysAgo(3), firstTouchAt: daysAgo(2, 20) }),
    buildLead({ firstName: "נועה", lastName: "קליין", email: "noa.k@tau.ac.il", organization: "אוניברסיטת תל אביב", family: "elevation", interest: "מודל גבהים למחקר - רישיון אקדמי", source: "campaign", campaign: "שנת לימודים - מחיר אקדמי", estimatedValue: 7_500, status: "working", createdAt: daysAgo(4), firstTouchAt: daysAgo(3, 12) }),
    buildLead({ firstName: "יוסי", lastName: "מרציאנו", phone: "050-998-7123", family: "cadastre", interest: "מידע קדסטרי - גוש 6158", source: "formAbandon", estimatedValue: 850, createdAt: daysAgo(3, 8) }),
    buildLead({ firstName: "שרה", lastName: "וייס", email: "sara@electra-infra.co.il", organization: "אלקטרה תשתיות", family: "certificates", interest: "תע\"צ לחיבור מבנים לרשת החשמל", source: "form", estimatedValue: 2_400, status: "qualified", createdAt: daysAgo(5), firstTouchAt: daysAgo(4, 18) }),
    buildLead({ firstName: "אבי", lastName: "גולן", email: "avi.golan@geo-tech.io", organization: "GeoTech Ltd", family: "technology", interest: "חיבור WMS/WMTS למערכת ניווט", source: "form", estimatedValue: 60_000, status: "converted", createdAt: daysAgo(9), firstTouchAt: daysAgo(8, 20), convertedTo: { account: "GeoTech Ltd", contact: "אבי גולן", opportunity: "OP-2026-311 · WS שנתי" }, extraEvents: [{ at: daysAgo(6), type: "status", note: "סטטוס עודכן ל-Qualified" }, { at: daysAgo(6), type: "converted", note: "A5: הומר אוטומטית ל-Account + Contact + Opportunity (OP-2026-311)" }] }),
    buildLead({ firstName: "תמר", lastName: "אשכנזי", email: "tamar.a@walla.co.il", family: "customMaps", interest: "מפה בהתאמה אישית לאירוע", source: "chatbot", estimatedValue: 450, status: "unqualified", createdAt: daysAgo(7), firstTouchAt: daysAgo(6, 12), extraEvents: [{ at: daysAgo(6), type: "status", note: "סווג כלא-רלוונטי: מחוץ לתחום השירות" }] }),
    buildLead({ firstName: "אלכס", lastName: "פדורוב", email: "alex.f@mapping-pro.ru", family: "geodesy", interest: "מנוי VRS - שאלות על כיסוי", source: "formAbandon", estimatedValue: 12_000, status: "noResponse", createdAt: daysAgo(16), firstTouchAt: daysAgo(15), extraEvents: [{ at: daysAgo(2), type: "reEngaged", note: "A4: נשלחה תזכורת Re-engagement (14 יום ללא מענה)" }] }),
    buildLead({ firstName: "עדי", lastName: "נחמיאס", phone: "058-6634412", family: "maps", interest: "מפות היסטוריות של יפו", source: "campaign", campaign: "מבצע קיץ", estimatedValue: 280, createdAt: daysAgo(2, 10) }),
    buildLead({ firstName: "גיל", lastName: "ברנר", email: "gil@survey-plus.co.il", phone: "052-4471900", organization: "סרווי פלוס", family: "geodesy", interest: "מעבר מ-3 מנויי RTK ל-5", source: "referral", estimatedValue: 54_000, status: "working", createdAt: daysAgo(1, 4), firstTouchAt: daysAgo(1, 2) })
  ];
}

export function loadLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    if (raw) return JSON.parse(raw) as Lead[];
  } catch { /* fall through */ }
  const seeded = seedLeads();
  saveLeads(seeded);
  return seeded;
}

export function saveLeads(leads: Lead[]): void {
  try { localStorage.setItem(LEADS_KEY, JSON.stringify(leads)); } catch { /* ignore */ }
}

export function resetLeads(): Lead[] {
  const seeded = seedLeads();
  saveLeads(seeded);
  return seeded;
}

// ---------------------------------------------------------------------------
// Capture API — called from public portal forms
// [HLD 4.2] minimum for auto-creation: first name + last name + phone-or-email.
// [HLD 4.2] dedup: an open lead with the same identifier + product family is
// updated (and converted when the customer completes a full order).
// ---------------------------------------------------------------------------

export interface CaptureInput {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  organization?: string;
  family: ProductFamily;
  interest?: string;
  source: LeadSource;
  campaign?: string;
  estimatedValue?: number;
}

export function meetsLeadMinimum(i: { firstName?: string; lastName?: string; email?: string; phone?: string }): boolean {
  return Boolean(i.firstName?.trim() && i.lastName?.trim() && (i.email?.trim() || i.phone?.trim()));
}

const OPEN_STATUSES: LeadStatus[] = ["new", "working", "qualified", "noResponse"];

export function captureLead(input: CaptureInput): { lead: Lead; isNew: boolean } | null {
  if (!meetsLeadMinimum(input)) return null; // [HLD] below minimum — no lead
  const leads = loadLeads();
  const key = (input.email || input.phone || "").trim().toLowerCase();
  const existing = leads.find(l =>
    OPEN_STATUSES.includes(l.status) &&
    l.family === input.family &&
    key.length > 0 &&
    ((l.email && l.email.toLowerCase() === key) || (l.phone && l.phone.replace(/\D/g, "") === key.replace(/\D/g, "")))
  );
  if (existing) {
    existing.events.push({ at: nowIso(), type: "touch", note: `פנייה חוזרת (${SOURCE_LABELS[input.source]}) — ${input.interest || "ללא פירוט"}` });
    if ((input.estimatedValue ?? 0) > existing.estimatedValue) {
      existing.estimatedValue = input.estimatedValue!;
      const s = scoreLead(existing.family, existing.estimatedValue, existing.source);
      existing.score = s.total;
      existing.band = s.band;
      existing.events.push({ at: nowIso(), type: "scored", note: `A3: ניקוד עודכן ל-${s.total}/100 (היקף עודכן)` });
    }
    existing.lastActivityAt = nowIso();
    saveLeads(leads);
    return { lead: existing, isNew: false };
  }
  const lead = buildLead(input);
  leads.unshift(lead);
  saveLeads(leads);
  return { lead, isNew: true };
}

// ---------------------------------------------------------------------------
// Lifecycle actions (admin UI)
// ---------------------------------------------------------------------------

export function setLeadStatus(id: string, status: LeadStatus): Lead[] {
  const leads = loadLeads();
  const lead = leads.find(l => l.id === id);
  if (!lead) return leads;
  const prev = lead.status;
  lead.status = status;
  if (!lead.firstTouchAt && status !== "new") lead.firstTouchAt = nowIso();
  lead.events.push({ at: nowIso(), type: "status", note: `סטטוס: ${prev} ← ${status}` });
  // A5 [HLD]: Qualified triggers automatic conversion
  if (status === "qualified") {
    lead.status = "converted";
    const opp = `OP-2026-${300 + Math.floor(Math.random() * 600)}`;
    lead.convertedTo = {
      account: lead.organization || `${lead.firstName} ${lead.lastName}`,
      contact: `${lead.firstName} ${lead.lastName}`,
      opportunity: `${opp} · ${lead.interest || familyDef(lead.family).he}`
    };
    lead.events.push({ at: nowIso(), type: "converted", note: `A5: הומר אוטומטית ל-Account + Contact + Opportunity (${opp})` });
  }
  lead.lastActivityAt = nowIso();
  saveLeads(leads);
  return leads;
}

export function touchLead(id: string): Lead[] {
  const leads = loadLeads();
  const lead = leads.find(l => l.id === id);
  if (!lead) return leads;
  if (!lead.firstTouchAt) lead.firstTouchAt = nowIso();
  if (lead.status === "new") lead.status = "working";
  lead.events.push({ at: nowIso(), type: "touch", note: "בוצע קשר ראשוני עם הלקוח" });
  lead.lastActivityAt = nowIso();
  saveLeads(leads);
  return leads;
}

export function reEngageLead(id: string): Lead[] {
  const leads = loadLeads();
  const lead = leads.find(l => l.id === id);
  if (!lead) return leads;
  lead.events.push({ at: nowIso(), type: "reEngaged", note: "A4: נשלחה תזכורת מייל/SMS ללקוח" });
  lead.lastActivityAt = nowIso();
  saveLeads(leads);
  return leads;
}

// ---------------------------------------------------------------------------
// SLA + stats (dashboard 14.5)
// ---------------------------------------------------------------------------

export function isSlaBreached(lead: Lead): boolean {
  if (lead.status !== "new") return false;
  const ageDays = (Date.now() - new Date(lead.createdAt).getTime()) / 86_400_000;
  return ageDays > LEAD_SLA.untouchedBreachDays;
}

export function leadAgeLabel(lead: Lead): string {
  const mins = Math.floor((Date.now() - new Date(lead.createdAt).getTime()) / 60_000);
  if (mins < 60) return `לפני ${mins} דק'`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `לפני ${hours} שע'`;
  return `לפני ${Math.floor(hours / 24)} ימים`;
}

export interface LeadStats {
  active: number;
  newThisWeek: number;
  inTreatment: number;
  slaBreaches: number;
  converted: number;
  conversionRate: number; // %
  distribution: Record<ScoreBand, number>;
  bySource: { source: LeadSource; count: number }[];
  byStatus: Record<LeadStatus, number>;
}

export function leadStats(leads: Lead[]): LeadStats {
  const active = leads.filter(l => OPEN_STATUSES.includes(l.status)).length;
  const weekAgo = Date.now() - 7 * 86_400_000;
  const newThisWeek = leads.filter(l => new Date(l.createdAt).getTime() > weekAgo).length;
  const inTreatment = leads.filter(l => l.status === "working" || l.status === "qualified").length;
  const slaBreaches = leads.filter(isSlaBreached).length;
  const converted = leads.filter(l => l.status === "converted").length;
  const closedOrConverted = leads.filter(l => l.status === "converted" || l.status === "unqualified").length;
  const conversionRate = closedOrConverted > 0 ? Math.round((converted / closedOrConverted) * 100) : 0;
  const distribution: Record<ScoreBand, number> = { high: 0, med: 0, low: 0 };
  leads.forEach(l => { distribution[l.band] += 1; });
  const srcCount = new Map<LeadSource, number>();
  leads.forEach(l => srcCount.set(l.source, (srcCount.get(l.source) || 0) + 1));
  const bySource = Array.from(srcCount.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
  const byStatus: Record<LeadStatus, number> = { new: 0, working: 0, qualified: 0, unqualified: 0, noResponse: 0, converted: 0 };
  leads.forEach(l => { byStatus[l.status] += 1; });
  return { active, newThisWeek, inTreatment, slaBreaches, converted, conversionRate, distribution, bySource, byStatus };
}

// ---------------------------------------------------------------------------
// R3 — Mass Email Processing (RPA + AI) [HLD 15.6]
// "עיבוד מיילים נכנסים: סיווג, חילוץ פרטים, יצירת Lead/Case"
// Deterministic keyword classification + regex entity extraction, presented
// in the UI as the AI intake step. Production swaps this for a real model.
// ---------------------------------------------------------------------------

export interface ParsedEmail {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  family: ProductFamily;
  familyConfidence: number; // 0-100
  matchedKeywords: string[];
  estimatedValue: number;
  intent: "sales" | "support";
}

const FAMILY_KEYWORDS: { family: ProductFamily; words: string[] }[] = [
  { family: "geodesy", words: ["cors", "rtk", "vrs", "תחנות קבע", "גיאודזיה", "gnss", "rinex"] },
  { family: "aerial", words: ["תצלום אוויר", "תצלומי אוויר", "תצ\"א", "טיסה", "תצלום"] },
  { family: "elevation", words: ["אורתופוטו", "dtm", "dsm", "מודל גבהים", "ענן נקודות", "גבהים"] },
  { family: "gisLayers", words: ["שכבת", "שכבות", "gis", "shapefile", "גושים", "geojson"] },
  { family: "cadastre", words: ["קדסטר", "גוש", "חלקה", "תצ\"ר", "מודד מבקר", "קדסטרי"] },
  { family: "certificates", words: ["תע\"צ", "תעודת עובד ציבור", "חיבור לחשמל", "רשת החשמל"] },
  { family: "technology", words: ["wms", "wmts", "api", "שירותי רקע", "web service", "מפתח api"] },
  { family: "customMaps", words: ["מפה בהתאמה", "מפה מותאמת", "עיצוב מפה", "מפה אישית"] },
  { family: "agreements", words: ["הסכם", "שו\"פ", "רב-שנתי", "מכרז", "התקשרות"] },
  { family: "maps", words: ["מפה", "מפות", "מפת ישראל", "מפות היסטוריות"] }
];

const SUPPORT_WORDS = ["תקלה", "לא עובד", "בעיה", "שגיאה", "החזר", "ביטול", "תלונה"];

export function parseIncomingEmail(raw: string): ParsedEmail {
  const text = raw.trim();
  const lower = text.toLowerCase();

  const emailMatch = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  const phoneMatch = text.match(/0\d{1,2}[- ]?\d{3}[- ]?\d{4}/);

  // Name heuristics: "שמי X Y" / "שם: X Y" / a short trailing signature line
  let firstName = "";
  let lastName = "";
  const nameDecl = text.match(/(?:שמי|קוראים לי|שם מלא[:\s]+|מאת[:\s]+)\s*([֐-׿A-Za-z]+)\s+([֐-׿A-Za-z]+)/);
  if (nameDecl) {
    firstName = nameDecl[1];
    lastName = nameDecl[2];
  } else {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    for (let i = lines.length - 1; i >= Math.max(0, lines.length - 4); i--) {
      const words = lines[i].split(/\s+/);
      if (words.length >= 2 && words.length <= 3 && !/[\d@]/.test(lines[i]) && lines[i].length <= 30) {
        [firstName, lastName] = [words[0].replace(/,$/, ""), words[1]];
        break;
      }
    }
  }

  // Organization: from email domain (not a free-mail provider)
  let organization = "";
  if (emailMatch) {
    const domain = emailMatch[0].split("@")[1].toLowerCase();
    if (!/gmail|walla|hotmail|outlook|yahoo|icloud/.test(domain)) {
      organization = domain.split(".")[0];
    }
  }

  // Classification
  let best: { family: ProductFamily; hits: string[] } = { family: "maps", hits: [] };
  for (const fk of FAMILY_KEYWORDS) {
    const hits = fk.words.filter(w => lower.includes(w));
    if (hits.length > best.hits.length) best = { family: fk.family, hits };
  }
  const familyConfidence = Math.min(95, 40 + best.hits.length * 18);

  // Scope estimation from explicit amounts / area units
  let estimatedValue = 0;
  const amountMatch = text.replace(/,/g, "").match(/(\d{3,7})\s*(?:₪|ש"ח|שח|nis)/i);
  if (amountMatch) estimatedValue = parseInt(amountMatch[1], 10);
  else if (/קמ"ר|דונם|כלל ארצי|ארצית/.test(text)) estimatedValue = 45_000;

  const intent: "sales" | "support" = SUPPORT_WORDS.some(w => lower.includes(w)) ? "support" : "sales";

  return {
    firstName, lastName,
    email: emailMatch?.[0] || "",
    phone: phoneMatch?.[0] || "",
    organization,
    family: best.family,
    familyConfidence,
    matchedKeywords: best.hits,
    estimatedValue,
    intent
  };
}

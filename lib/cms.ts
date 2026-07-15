"use client";

// Portal CMS — content-manager back-office (POC).
// Owner: ראש אגף שיווק ומכירות. Data persists in localStorage.
//
// SECURITY: authentication is verified server-side (/api/cms/*) against
// SHA-256 hashes from env vars; the session is an HMAC-signed httpOnly
// cookie that page JS cannot read. The sessionStorage copy below is a
// display-only cache (name/role for the header and audit log) — the actual
// gate is the cookie check in cmsVerifySession().

// ---------------------------------------------------------------------------
// Auth (client side of /api/cms/*)
// ---------------------------------------------------------------------------

const SESSION_KEY = "mapi_cms_session_v1";

export interface CmsSession {
  email: string;
  name: string;
  role: string;
  loginAt: number;
}

function cacheSession(session: CmsSession | null): void {
  try {
    if (session) sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else sessionStorage.removeItem(SESSION_KEY);
  } catch { /* ignore */ }
}

export async function cmsLogin(email: string, password: string): Promise<CmsSession | null> {
  try {
    const res = await fetch("/api/cms/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.ok || !data.session) return null;
    const session: CmsSession = { ...data.session, loginAt: Date.now() };
    cacheSession(session);
    return session;
  } catch {
    return null;
  }
}

/** Server-verified session check (validates the httpOnly cookie). */
export async function cmsVerifySession(): Promise<CmsSession | null> {
  try {
    const res = await fetch("/api/cms/session", { cache: "no-store" });
    if (!res.ok) {
      cacheSession(null);
      return null;
    }
    const data = await res.json();
    if (!data?.ok || !data.session) {
      cacheSession(null);
      return null;
    }
    const session: CmsSession = { ...data.session, loginAt: Date.now() };
    cacheSession(session);
    return session;
  } catch {
    // Network failure: fall back to the cached copy so the manager
    // isn't kicked out mid-edit by a transient error.
    return cmsGetSession();
  }
}

/** Fast display-only read (header strip, audit actor name). Not a security gate. */
export function cmsGetSession(): CmsSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as CmsSession) : null;
  } catch {
    return null;
  }
}

export function cmsLogout(): void {
  cacheSession(null);
  // Fire-and-forget: clear the httpOnly cookie server-side
  try { void fetch("/api/cms/logout", { method: "POST" }); } catch { /* ignore */ }
}

// ---------------------------------------------------------------------------
// Generic storage helper
// ---------------------------------------------------------------------------

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T): void {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}

export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

// ---------------------------------------------------------------------------
// News (feeds the public NewsTicker)
// ---------------------------------------------------------------------------

export type CmsNewsType = "new" | "update" | "promo" | "alert";

export interface CmsNewsItem {
  id: string;
  type: CmsNewsType;
  /** Plain Hebrew headline (max ~7 words per house style) */
  title: string;
  href: string;
  publishedAt: string; // ISO date
  active: boolean;
}

const NEWS_KEY = "mapi_cms_news_v1";

export const DEFAULT_CMS_NEWS: CmsNewsItem[] = [
  { id: "n-ortho", type: "new", title: "אורתופוטו חדש זמין באזור המרכז", href: "/catalog/aerial-photos", publishedAt: "2026-07-01", active: true },
  { id: "n-dem", type: "update", title: "מודלי הגובה DSM ו-DTM שודרגו לאחרונה", href: "/catalog/elevation-data", publishedAt: "2026-07-02", active: true },
  { id: "n-cors", type: "promo", title: "מנוי CORS שנתי במחיר מבצע מיוחד", href: "/catalog/cors-subscription", publishedAt: "2026-07-03", active: true },
  { id: "n-hours", type: "alert", title: "מוקד השירות פתוח בחגים ובחופשות", href: "/help", publishedAt: "2026-07-04", active: true }
];

export function loadCmsNews(): CmsNewsItem[] {
  return load(NEWS_KEY, DEFAULT_CMS_NEWS);
}

/** True only when the content manager actually saved news (localStorage key exists). */
export function hasCmsNews(): boolean {
  try { return localStorage.getItem(NEWS_KEY) !== null; } catch { return false; }
}

export function saveCmsNews(items: CmsNewsItem[]): void {
  save(NEWS_KEY, items);
}

export function resetCmsNews(): CmsNewsItem[] {
  save(NEWS_KEY, DEFAULT_CMS_NEWS);
  return DEFAULT_CMS_NEWS;
}

// ---------------------------------------------------------------------------
// Campaigns (spec 4.11 — marketing campaign pages owned by marketing dept)
// ---------------------------------------------------------------------------

export type CampaignStatus = "draft" | "active" | "ended";

export interface CmsCampaign {
  id: string;
  name: string;
  /** Target audience — segment id or "all" */
  audience: string;
  discountPct: number;
  bannerText: string;
  startDate: string; // ISO
  endDate: string;   // ISO
  status: CampaignStatus;
  createdAt: string; // ISO
}

const CAMPAIGNS_KEY = "mapi_cms_campaigns_v1";

export const DEFAULT_CMS_CAMPAIGNS: CmsCampaign[] = [
  {
    id: "c-summer",
    name: "מבצע קיץ למודדים",
    audience: "surveyor",
    discountPct: 10,
    bannerText: "10% הנחה על מנוי CORS שנתי — עד סוף אוגוסט",
    startDate: "2026-07-01",
    endDate: "2026-08-31",
    status: "active",
    createdAt: "2026-06-25"
  },
  {
    id: "c-academic",
    name: "שנת לימודים — מחיר אקדמי",
    audience: "researcher",
    discountPct: 50,
    bannerText: "50% הנחה לחוקרים וסטודנטים על כל המאגרים",
    startDate: "2026-09-01",
    endDate: "2026-10-31",
    status: "draft",
    createdAt: "2026-07-01"
  }
];

export function loadCmsCampaigns(): CmsCampaign[] {
  return load(CAMPAIGNS_KEY, DEFAULT_CMS_CAMPAIGNS);
}

export function saveCmsCampaigns(items: CmsCampaign[]): void {
  save(CAMPAIGNS_KEY, items);
}

// ---------------------------------------------------------------------------
// Portal users
// ---------------------------------------------------------------------------

export type CmsUserRole = "admin" | "editor" | "viewer";

export interface CmsUser {
  id: string;
  name: string;
  email: string;
  role: CmsUserRole;
  active: boolean;
  /** Primary account cannot be deleted/deactivated */
  primary?: boolean;
  lastLogin: string | null; // ISO
}

const USERS_KEY = "mapi_cms_users_v1";

export const DEFAULT_CMS_USERS: CmsUser[] = [
  { id: "u-elad", name: "אלעד אסרף", email: "mapicomportal@gmail.com", role: "admin", active: true, primary: true, lastLogin: "2026-07-05" },
  { id: "u-dana", name: "דנה מזרחי", email: "dana@mapi.gov.il", role: "editor", active: true, lastLogin: "2026-07-03" },
  { id: "u-yair", name: "יאיר אברמוב", email: "yair@mapi.gov.il", role: "editor", active: true, lastLogin: "2026-06-28" },
  { id: "u-noa", name: "נעה ברק", email: "noa@mapi.gov.il", role: "viewer", active: false, lastLogin: null }
];

export function loadCmsUsers(): CmsUser[] {
  return load(USERS_KEY, DEFAULT_CMS_USERS);
}

export function saveCmsUsers(items: CmsUser[]): void {
  save(USERS_KEY, items);
}

// ---------------------------------------------------------------------------
// Audit log (who changed what — spec 4.11 approval trail, POC-lite)
// ---------------------------------------------------------------------------

export interface CmsAuditEntry {
  id: string;
  at: string;    // ISO datetime
  actor: string;
  action: string;
}

const AUDIT_KEY = "mapi_cms_audit_v1";

export function loadCmsAudit(): CmsAuditEntry[] {
  return load(AUDIT_KEY, [] as CmsAuditEntry[]);
}

export function cmsAudit(action: string): void {
  const session = cmsGetSession();
  const entry: CmsAuditEntry = {
    id: newId("a"),
    at: new Date().toISOString(),
    actor: session?.name || "לא מזוהה",
    action
  };
  const log = loadCmsAudit();
  save(AUDIT_KEY, [entry, ...log].slice(0, 100));
}

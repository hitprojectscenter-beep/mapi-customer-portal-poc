// Google Workspace bridge (server-only, zero external deps).
//
// Turns the org's Workspace into the portal's live backend:
//   - Google Sheets  = lead database (append-only intake log the sales team
//     works in: filters, AppSheet, Apps Script automations)
//   - Google Chat    = real-time new-lead notifications (space webhook)
//   - Google Sign-In = CMS login (verified in /api/cms/google)
//
// Everything is env-gated: with no env vars set the portal keeps running in
// pure demo mode (localStorage only) — no request ever leaves the server.
//
// Env:
//   GOOGLE_SERVICE_ACCOUNT_EMAIL  e.g. mapi-portal@<project>.iam.gserviceaccount.com
//   GOOGLE_SERVICE_ACCOUNT_KEY    the service-account private key (PEM; raw or base64)
//   GOOGLE_SHEETS_ID              spreadsheet id (the sheet must be shared with the SA)
//   GOOGLE_CHAT_WEBHOOK_URL       incoming-webhook URL of a Google Chat space

import { createSign } from "crypto";

function env(name: string): string {
  return (process.env[name] || "").trim();
}

// Private key may arrive base64-encoded (survives CLI piping better) or raw PEM
function privateKey(): string {
  const raw = env("GOOGLE_SERVICE_ACCOUNT_KEY");
  if (!raw) return "";
  if (raw.includes("-----BEGIN")) return raw.replace(/\\n/g, "\n");
  try {
    const decoded = Buffer.from(raw, "base64").toString("utf8");
    return decoded.includes("-----BEGIN") ? decoded : "";
  } catch {
    return "";
  }
}

export function sheetsConfigured(): boolean {
  return Boolean(env("GOOGLE_SERVICE_ACCOUNT_EMAIL") && privateKey() && env("GOOGLE_SHEETS_ID"));
}

export function chatConfigured(): boolean {
  return env("GOOGLE_CHAT_WEBHOOK_URL").startsWith("https://chat.googleapis.com/");
}

export function sheetUrl(): string {
  const id = env("GOOGLE_SHEETS_ID");
  return id ? `https://docs.google.com/spreadsheets/d/${id}` : "";
}

// -- Service-account OAuth (JWT bearer) --------------------------------------

let cachedToken: { token: string; expiresAt: number } | null = null;

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function accessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.token;

  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(JSON.stringify({
    iss: env("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  }));
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = b64url(signer.sign(privateKey()));
  const assertion = `${header}.${claims}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });
  if (!res.ok) throw new Error(`google token exchange failed: ${res.status}`);
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { token: data.access_token, expiresAt: Date.now() + (data.expires_in - 120) * 1000 };
  return data.access_token;
}

// -- Sheets ------------------------------------------------------------------

const LEADS_TAB = "Leads";
export const LEADS_HEADER = [
  "נקלט בתאריך", "מזהה ליד", "שם פרטי", "שם משפחה", "מייל", "טלפון",
  "ארגון", "משפחת מוצר", "עניין", "מקור", "ניקוד AI", "רמה", "מטפל", "תור", "היקף משוער ₪", "קמפיין"
];

async function sheetsFetch(path: string, init: RequestInit): Promise<Response> {
  const token = await accessToken();
  return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${env("GOOGLE_SHEETS_ID")}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init.headers || {}) }
  });
}

async function ensureLeadsTab(): Promise<void> {
  // Create the tab + header row; ignore "already exists" errors
  const add = await sheetsFetch(":batchUpdate", {
    method: "POST",
    body: JSON.stringify({ requests: [{ addSheet: { properties: { title: LEADS_TAB } } }] })
  });
  if (add.ok) {
    await sheetsFetch(`/values/${LEADS_TAB}!A1:append?valueInputOption=USER_ENTERED`, {
      method: "POST",
      body: JSON.stringify({ values: [LEADS_HEADER] })
    });
  }
}

/** Append one lead row to the Leads tab. Throws on hard failure. */
export async function appendLeadRow(row: (string | number)[]): Promise<void> {
  const attempt = () =>
    sheetsFetch(`/values/${LEADS_TAB}!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
      method: "POST",
      body: JSON.stringify({ values: [row] })
    });

  let res = await attempt();
  if (res.status === 400) {
    // Most likely: the Leads tab doesn't exist yet — create it and retry once
    await ensureLeadsTab();
    res = await attempt();
  }
  if (!res.ok) throw new Error(`sheets append failed: ${res.status} ${await res.text()}`);
}

// -- Google Chat -------------------------------------------------------------

/** Post a new-lead card message to the sales team's Chat space. */
export async function chatNotify(text: string): Promise<void> {
  const res = await fetch(env("GOOGLE_CHAT_WEBHOOK_URL"), {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error(`chat webhook failed: ${res.status}`);
}

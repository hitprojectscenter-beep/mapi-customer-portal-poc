// Server-only transactional email — the piece the portal was missing.
//
// Until now nothing in the app ever sent email: leads/orders were written to
// Postgres/Sheets and (optionally) pinged to Google Chat, and the "auto-response
// email" was only a timeline label. This module actually sends mail, env-gated
// like the rest of the Workspace bridge. Two transports (first configured wins):
//
//   1) MAIL_WEBHOOK_URL  — a Google Apps Script Web App that calls
//      MailApp.sendEmail (mail goes out from the org's own Gmail, to any
//      recipient, no new SaaS). Deploy docs/mail-appsscript.gs and paste its
//      /exec URL here. Optional shared secret: MAIL_WEBHOOK_TOKEN.
//   2) RESEND_API_KEY    — Resend HTTP API (https://resend.com). MAIL_FROM sets
//      the sender; a verified domain is required to mail arbitrary recipients
//      (the default onboarding@resend.dev only reaches the Resend account owner).
//
// With neither set, emailConfigured() is false and every send is a no-op — the
// demo flow is unaffected.

function env(name: string): string {
  return (process.env[name] || "").trim();
}

export type MailTransport = "webhook" | "resend" | "none";

/** A usable webhook URL: https anywhere, or http only for a local dev relay. */
function validWebhookUrl(u: string): boolean {
  if (u.startsWith("https://")) return true;
  return /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(u);
}

export function mailTransport(): MailTransport {
  if (validWebhookUrl(env("MAIL_WEBHOOK_URL"))) return "webhook";
  if (env("RESEND_API_KEY")) return "resend";
  return "none";
}

export function emailConfigured(): boolean {
  return mailTransport() !== "none";
}

/** The sales inbox that lead/order notifications are sent to. */
export function salesEmail(): string {
  return env("SALES_EMAIL") || "MapiComPortal@gmail.com";
}

function mailFrom(): string {
  // Resend needs a From on a verified domain; onboarding@resend.dev works for
  // owner-only testing. The Apps Script transport ignores this (sends as the
  // authorizing Gmail user).
  return env("MAIL_FROM") || 'פורטל הלקוחות של מפ"י <onboarding@resend.dev>';
}

export function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export interface MailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

/** Send one email via the configured transport. Throws on hard failure. */
export async function sendEmail(m: MailInput): Promise<void> {
  const to = m.to.trim();
  if (!to) throw new Error("missing recipient");

  const webhook = env("MAIL_WEBHOOK_URL");
  if (validWebhookUrl(webhook)) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to,
        subject: m.subject,
        html: m.html,
        replyTo: m.replyTo || "",
        token: env("MAIL_WEBHOOK_TOKEN")
      })
    });
    const bodyText = await res.text();
    // Apps Script Web Apps answer 200 even for handled errors — treat an
    // {ok:false} JSON body as a failure too.
    if (!res.ok || /"ok"\s*:\s*false/.test(bodyText)) {
      throw new Error(`mail webhook failed: ${res.status} ${bodyText.slice(0, 200)}`);
    }
    return;
  }

  const key = env("RESEND_API_KEY");
  if (key) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: mailFrom(),
        to: [to],
        subject: m.subject,
        html: m.html,
        text: m.text,
        reply_to: m.replyTo || undefined
      })
    });
    if (!res.ok) throw new Error(`resend failed: ${res.status} ${(await res.text()).slice(0, 200)}`);
    return;
  }

  throw new Error("email not configured");
}

// -- Branded RTL HTML shell --------------------------------------------------

/** Wrap body HTML in a branded, RTL, inline-styled email shell. */
export function brandedEmail(opts: { title: string; bodyHtml: string; preheader?: string }): string {
  const { title, bodyHtml, preheader = "" } = opts;
  return `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;background:#f4f6f9;font-family:Arial,'Segoe UI',sans-serif;color:#001d35;">
${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>` : ""}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
<tr><td style="background:linear-gradient(135deg,#001d35,#0B61A1);padding:22px 28px;color:#ffffff;">
<div style="font-size:13px;letter-spacing:2px;opacity:.85;">המרכז למיפוי ישראל · מפ&quot;י</div>
<div style="font-size:20px;font-weight:bold;margin-top:4px;">${esc(title)}</div>
</td></tr>
<tr><td style="padding:26px 28px;font-size:15px;line-height:1.75;">${bodyHtml}</td></tr>
<tr><td style="padding:16px 28px;background:#faf6ec;border-top:1px solid #eee;font-size:12px;color:#5b6b7b;">
הודעה זו נשלחה על-ידי פורטל הלקוחות של מפ&quot;י. לשירות ולפניות: <a href="tel:*6274" style="color:#0B61A1;">*6274</a>.
</td></tr>
</table>
<div style="font-size:11px;color:#9aa7b4;margin-top:14px;">© המרכז למיפוי ישראל</div>
</td></tr></table></body></html>`;
}

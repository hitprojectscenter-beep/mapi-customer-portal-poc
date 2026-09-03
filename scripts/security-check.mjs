#!/usr/bin/env node
/**
 * Secure-development guardrail for the MAPI customer portal.
 *
 * Implements the checks required by the National Cyber Directorate advisory
 * "הקפדה על כללי הפיתוח המאובטח באתרי Web" (01/09/2026), whose reported incident
 * was caused by (a) an exposed .git directory and (b) API keys embedded so they
 * were reachable by attackers. Run it locally and in CI before every deploy:
 *
 *     npm run security:check              # repo-side checks
 *     npm run security:check -- <url>     # also probe a deployed origin
 *
 * Exits non-zero on any FAIL so it can gate a pipeline.
 */
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

let fails = 0, warns = 0;
const ok = (m) => console.log(`  \x1b[32mPASS\x1b[0m  ${m}`);
const bad = (m) => { fails++; console.log(`  \x1b[31mFAIL\x1b[0m  ${m}`); };
const warn = (m) => { warns++; console.log(`  \x1b[33mWARN\x1b[0m  ${m}`); };
const sh = (c) => { try { return execSync(c, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }); } catch { return ""; } };

console.log("\n== 1. Secrets & developer artefacts must never be committed ==");

// 1a. .env files must not be tracked (only the documented .env.example)
const tracked = sh("git ls-files").split("\n").filter(Boolean);
const envTracked = tracked.filter((f) => /(^|\/)\.env/.test(f) && !f.endsWith(".env.example"));
envTracked.length ? bad(`.env file(s) tracked in git: ${envTracked.join(", ")}`)
                  : ok("no .env files tracked (only .env.example)");

// 1b. .vercel / build dirs must not be tracked
const vercelTracked = tracked.filter((f) => f.startsWith(".vercel/"));
vercelTracked.length ? bad(`.vercel tracked: ${vercelTracked.join(", ")}`) : ok(".vercel not tracked");

// 1c. .gitignore must cover the sensitive paths
const gi = existsSync(".gitignore") ? readFileSync(".gitignore", "utf8") : "";
for (const need of [".env", ".vercel", "node_modules"]) {
  gi.includes(need) ? ok(`.gitignore covers ${need}`) : bad(`.gitignore missing ${need}`);
}

// 1d. no hardcoded secret-shaped values in tracked source
const SECRET_PATTERNS = [
  ["private key block", "-----BEGIN (RSA |EC )?PRIVATE KEY"],
  ["postgres URL with credentials", "postgres(ql)?://[^\"'` ]*:[^\"'` ]*@"],
  ["Google API key", "AIza[0-9A-Za-z_-]{30,}"],
  ["sk- style API key", "\\bsk-[A-Za-z0-9]{20,}"],
  ["Resend key", "\\bre_[A-Za-z0-9]{20,}"],
  ["Slack token", "xox[baprs]-[A-Za-z0-9-]{10,}"],
  ["AWS access key id", "AKIA[0-9A-Z]{16}"],
  ["GitHub PAT", "ghp_[A-Za-z0-9]{30,}"]
];
let secretHits = 0;
for (const [label, re] of SECRET_PATTERNS) {
  const hit = sh(`git grep -nIE "${re}" -- . ":(exclude).env.example" ":(exclude)scripts/security-check.mjs"`).trim();
  if (hit) { bad(`possible ${label} committed:\n${hit.split("\n").slice(0, 3).map((l) => "        " + l).join("\n")}`); secretHits++; }
}
if (!secretHits) ok("no hardcoded secret-shaped values in tracked source");

console.log("\n== 2. Security headers must be configured (defense in depth) ==");
const cfg = ["next.config.js", "next.config.mjs", "next.config.ts"].find(existsSync);
if (!cfg) bad("no next.config found");
else {
  const c = readFileSync(cfg, "utf8");
  for (const h of ["Content-Security-Policy", "Strict-Transport-Security", "X-Frame-Options",
                   "X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy"]) {
    c.includes(h) ? ok(`${cfg} sets ${h}`) : bad(`${cfg} missing ${h}`);
  }
}

console.log("\n== 3. Production build must not ship source maps ==");
const cfgTxt = cfg ? readFileSync(cfg, "utf8") : "";
/productionBrowserSourceMaps\s*:\s*true/.test(cfgTxt)
  ? bad("productionBrowserSourceMaps is enabled — client source maps would be public")
  : ok("client source maps not enabled for production");

// 4. Optional live probe of a deployed origin
const origin = process.argv[2];
if (origin) {
  console.log(`\n== 4. Live probe of ${origin} ==`);
  const probe = async (path, expectMissing = true) => {
    try {
      const r = await fetch(new URL(path, origin), { redirect: "manual" });
      if (expectMissing) (r.status === 404 || r.status === 403) ? ok(`${path} not served (${r.status})`)
                                                                : bad(`${path} reachable (${r.status})`);
      return r;
    } catch { warn(`${path} probe failed (network)`); return null; }
  };
  for (const p of ["/.git/config", "/.git/HEAD", "/.env", "/.env.local", "/.vercel/project.json"]) await probe(p);
  const root = await probe("/", false);
  if (root) {
    for (const h of ["content-security-policy", "strict-transport-security", "x-frame-options",
                     "x-content-type-options", "referrer-policy", "permissions-policy"]) {
      root.headers.get(h) ? ok(`header ${h} served`) : warn(`header ${h} not seen (may be a bot-challenge response)`);
    }
  }
}

console.log(`\n${fails ? "\x1b[31m" : "\x1b[32m"}Result: ${fails} failed, ${warns} warnings\x1b[0m\n`);
process.exit(fails ? 1 : 0);

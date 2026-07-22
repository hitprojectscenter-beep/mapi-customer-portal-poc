// Shared fuzzy-search engine for the portal (zero deps).
// Partial matching: substring, token-AND with Hebrew-prefix stripping,
// word-prefix bonus, and Levenshtein≤1-2 typo tolerance. Every consumer
// (header overlay, catalog filter) ranks with the same logic.

import type { Service } from "@/lib/data";

/** Lowercase, strip punctuation/quotes (incl. ׳ ״), collapse spaces */
export function normalizeText(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[֑-ׇ]/g, "") // niqqud
    .replace(/["'“”׳״\-_/.,:;!?()[\]{}]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Common single-letter Hebrew prefixes (ה, ו, ב, ל, מ, ש, כ)
const HE_PREFIX = /^[הובלמשכ]/;

function tokenVariants(tok: string): string[] {
  const v = [tok];
  if (tok.length >= 3 && HE_PREFIX.test(tok)) v.push(tok.slice(1));
  return v;
}

/** Levenshtein distance capped at `max` (early exit) */
function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const dp = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    let rowMin = dp[0];
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
      if (dp[j] < rowMin) rowMin = dp[j];
    }
    if (rowMin > max) return max + 1;
  }
  return dp[b.length];
}

/** Does token match anywhere in text? Returns match quality 0..1 */
function tokenMatch(token: string, text: string): number {
  if (!token) return 0;
  for (const t of tokenVariants(token)) {
    if (text.includes(t)) {
      // Word-start match ranks above mid-word
      const wordStart = new RegExp(`(^| )${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
      return wordStart.test(text) ? 1 : 0.85;
    }
  }
  // Typo tolerance vs. individual words
  const maxEd = token.length >= 6 ? 2 : token.length >= 4 ? 1 : 0;
  if (maxEd > 0) {
    for (const word of text.split(" ")) {
      if (word && editDistance(token, word, maxEd) <= maxEd) return 0.6;
      // Fuzzy prefix (e.g., "אורתופ" vs "אורתופוטו")
      if (word.length > token.length && editDistance(token, word.slice(0, token.length), 1) <= 1 && token.length >= 4) return 0.55;
    }
  }
  return 0;
}

export interface SearchHit {
  service: Service;
  score: number;
  /** Highest-quality matched token strings (for <mark> highlighting) */
  matched: string[];
}

interface Doc {
  service: Service;
  name: string;      // localized name
  desc: string;      // localized short description
  extra: string;     // category + english + features
}

export function buildDocs(
  services: Service[],
  getName: (s: Service) => string,
  getDesc: (s: Service) => string,
  getCategory: (s: Service) => string
): Doc[] {
  return services.map(s => ({
    service: s,
    name: normalizeText(getName(s)),
    desc: normalizeText(getDesc(s)),
    extra: normalizeText(`${getCategory(s)} ${s.name} ${s.slug.replace(/-/g, " ")} ${(s.features || []).join(" ")}`)
  }));
}

/**
 * Rank services for a query. Always returns the best partial matches —
 * callers show the top of the list even when nothing matches exactly.
 */
export function searchServices(docs: Doc[], rawQuery: string, limit = 8): SearchHit[] {
  const query = normalizeText(rawQuery);
  if (!query) return [];
  const tokens = query.split(" ").filter(Boolean);

  const hits: SearchHit[] = [];
  for (const d of docs) {
    let score = 0;
    const matched: string[] = [];

    // Whole-query substring = strongest signal
    if (d.name.includes(query)) { score += 6; matched.push(query); }
    else if (d.desc.includes(query) || d.extra.includes(query)) { score += 3.5; matched.push(query); }

    // Per-token partial matching (AND-leaning: reward coverage)
    let covered = 0;
    for (const tok of tokens) {
      const inName = tokenMatch(tok, d.name);
      const inDesc = tokenMatch(tok, d.desc);
      const inExtra = tokenMatch(tok, d.extra);
      const best = Math.max(inName * 2.2, inDesc * 1.2, inExtra * 0.9);
      if (best > 0) {
        covered++;
        score += best;
        if (inName >= 0.85 || inDesc >= 0.85) matched.push(tok);
      }
    }
    if (tokens.length > 1) score *= covered / tokens.length; // coverage penalty

    if (score > 0.5) hits.push({ service: d.service, score, matched });
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** Split text into segments for <mark> highlighting of matched tokens */
export function highlightSegments(text: string, matched: string[]): { text: string; hit: boolean }[] {
  if (!matched.length || !text) return [{ text, hit: false }];
  const tokens = Array.from(new Set(matched.flatMap(m => tokenVariants(normalizeText(m))))).filter(t => t.length >= 2);
  if (!tokens.length) return [{ text, hit: false }];
  const pattern = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  try {
    const re = new RegExp(`(${pattern})`, "gi");
    return text.split(re).filter(seg => seg !== "").map(seg => {
      const low = normalizeText(seg);
      return { text: seg, hit: tokens.some(t => low === t || low.includes(t)) };
    });
  } catch {
    return [{ text, hit: false }];
  }
}

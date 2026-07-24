"use client";

// Global tooltip coverage: every interactive control that has an accessible
// name (aria-label / title / trimmed text) but no explicit data-tooltip gets
// one automatically — including controls added later (MutationObserver).
// Rich hand-written data-tooltip attributes always win; this only fills gaps.

import { useEffect } from "react";

const SELECTOR = 'button, a[href], select, [role="button"], [role="tab"], summary';

// Controls whose visible text already says everything don't need a duplicate
// bubble — skip when the tooltip would just repeat the visible label verbatim.
function deriveTooltip(el: HTMLElement): string | null {
  const aria = el.getAttribute("aria-label")?.trim();
  const title = el.getAttribute("title")?.trim();
  const text = (el.textContent || "").replace(/\s+/g, " ").trim();

  // Prefer an aria-label that adds information beyond the visible text
  if (aria && aria !== text) return aria;
  if (title && title !== text) return title;
  // Icon-only control (no visible text) → use whatever label exists
  if (!text && (aria || title)) return (aria || title)!;
  return null;
}

function enhance(root: ParentNode) {
  const nodes = root.querySelectorAll<HTMLElement>(SELECTOR);
  nodes.forEach(el => {
    if (el.hasAttribute("data-tooltip")) return;
    if (el.getAttribute("aria-hidden") === "true") return;
    const tip = deriveTooltip(el);
    if (tip) {
      el.setAttribute("data-tooltip", tip);
      if (!el.hasAttribute("data-tooltip-position")) {
        el.setAttribute("data-tooltip-position", "bottom");
      }
    }
  });
}

export default function TooltipEnhancer() {
  useEffect(() => {
    enhance(document.body);
    const observer = new MutationObserver(muts => {
      for (const m of muts) {
        m.addedNodes.forEach(n => {
          if (n.nodeType === 1) enhance(n as ParentNode);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}

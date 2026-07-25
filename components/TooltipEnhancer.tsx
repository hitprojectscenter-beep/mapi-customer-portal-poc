"use client";

// Global tooltip system — TWO responsibilities:
//  1. Coverage: auto-add data-tooltip to every labeled control (now + future
//     via MutationObserver), so nothing is left without a hint.
//  2. Rendering: a single FLOATING tooltip element appended to <body>,
//     positioned with getBoundingClientRect on hover/focus. This replaces the
//     old CSS ::after tooltip, which was silently CLIPPED by any ancestor with
//     overflow:hidden (every rounded card/header) — the reason tooltips never
//     appeared. A fixed-position portal element is immune to clipping.

import { useEffect } from "react";

const SELECTOR = 'button, a[href], select, [role="button"], [role="tab"], summary, [data-tooltip]';

function deriveTooltip(el: HTMLElement): string | null {
  const explicit = el.getAttribute("data-tooltip");
  if (explicit) return explicit;
  const aria = el.getAttribute("aria-label")?.trim();
  const title = el.getAttribute("title")?.trim();
  const text = (el.textContent || "").replace(/\s+/g, " ").trim();
  if (aria && aria !== text) return aria;
  if (title && title !== text) return title;
  if (!text && (aria || title)) return (aria || title)!;
  return null;
}

function enhance(root: ParentNode) {
  const nodes = root.querySelectorAll<HTMLElement>(SELECTOR);
  nodes.forEach(el => {
    if (el.hasAttribute("data-tooltip")) return;
    if (el.getAttribute("aria-hidden") === "true") return;
    const tip = deriveTooltip(el);
    if (tip) el.setAttribute("data-tooltip", tip);
  });
}

export default function TooltipEnhancer() {
  useEffect(() => {
    // --- The single floating tooltip element ---------------------------------
    const tip = document.createElement("div");
    tip.setAttribute("role", "tooltip");
    tip.style.cssText = [
      "position:fixed", "z-index:2147483000", "pointer-events:none",
      // ~20% transparent background with a blur so text stays readable
      "background:rgba(255,255,255,0.8)", "backdrop-filter:blur(6px)",
      "-webkit-backdrop-filter:blur(6px)", "color:#1b2b45",
      "border:1px solid rgba(180,146,78,0.55)", "border-radius:12px",
      "padding:9px 14px", "font-size:12.5px", "line-height:1.5", "font-weight:400",
      "font-family:'Heebo','Assistant','Inter',sans-serif",
      "max-width:340px", "text-align:center", "white-space:normal",
      "box-shadow:0 12px 28px -8px rgba(27,43,69,0.28),0 2px 8px rgba(70,63,122,0.12)",
      "opacity:0", "transition:opacity .16s ease", "direction:rtl"
    ].join(";");
    document.body.appendChild(tip);

    let showTimer: number | undefined;
    let current: HTMLElement | null = null;

    const place = (el: HTMLElement) => {
      const label = el.getAttribute("data-tooltip");
      if (!label) return;
      tip.textContent = label;
      const r = el.getBoundingClientRect();
      // Measure after setting text
      tip.style.opacity = "0";
      const tr = tip.getBoundingClientRect();
      let top = r.bottom + 8;
      // Flip above if it would overflow the viewport bottom
      if (top + tr.height > window.innerHeight - 6) top = r.top - tr.height - 8;
      let left = r.left + r.width / 2 - tr.width / 2;
      left = Math.max(6, Math.min(left, window.innerWidth - tr.width - 6)); // clamp to viewport
      tip.style.top = `${Math.max(6, top)}px`;
      tip.style.left = `${left}px`;
      tip.style.opacity = "1";
    };

    const onEnter = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-tooltip]") as HTMLElement | null;
      if (!el || !el.getAttribute("data-tooltip")) return;
      current = el;
      window.clearTimeout(showTimer);
      showTimer = window.setTimeout(() => { if (current === el) place(el); }, 120);
    };
    const onLeave = () => {
      window.clearTimeout(showTimer);
      current = null;
      tip.style.opacity = "0";
    };

    document.addEventListener("mouseover", onEnter, true);
    document.addEventListener("mouseout", onLeave, true);
    document.addEventListener("focusin", onEnter, true);
    document.addEventListener("focusout", onLeave, true);
    document.addEventListener("scroll", onLeave, true);

    // --- Coverage: initial sweep + observe future nodes ----------------------
    enhance(document.body);
    const observer = new MutationObserver(muts => {
      for (const m of muts) {
        m.addedNodes.forEach(n => { if (n.nodeType === 1) enhance(n as ParentNode); });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("mouseover", onEnter, true);
      document.removeEventListener("mouseout", onLeave, true);
      document.removeEventListener("focusin", onEnter, true);
      document.removeEventListener("focusout", onLeave, true);
      document.removeEventListener("scroll", onLeave, true);
      tip.remove();
    };
  }, []);

  return null;
}

"use client";

// Accessibility toolbar — required by Israeli regulation (תקנות שוויון זכויות
// לאנשים עם מוגבלות, ת"י 5568 / WCAG 2.1 AA). A floating button opens a panel
// of adjustments that toggle classes on <html> and persist in localStorage:
// text size, contrast, readable font, link highlighting, reduced motion,
// bigger cursor, reading guide. All keyboard-accessible.

import { useEffect, useState } from "react";

const KEY = "mapi_a11y_v1";

interface A11yState {
  fontScale: number;     // 100 / 115 / 130 / 150 (%)
  contrast: boolean;     // high contrast
  readable: boolean;     // readable (heavier) font + spacing
  links: boolean;        // underline & highlight links
  stopMotion: boolean;   // pause animations
  bigCursor: boolean;    // enlarged cursor
}

const DEFAULT: A11yState = {
  fontScale: 100, contrast: false, readable: false, links: false, stopMotion: false, bigCursor: false
};

function apply(s: A11yState) {
  const html = document.documentElement;
  html.style.setProperty("--a11y-font-scale", String(s.fontScale / 100));
  html.classList.toggle("a11y-scale", s.fontScale !== 100);
  html.classList.toggle("a11y-contrast", s.contrast);
  html.classList.toggle("a11y-readable", s.readable);
  html.classList.toggle("a11y-links", s.links);
  html.classList.toggle("a11y-stopmotion", s.stopMotion);
  html.classList.toggle("a11y-bigcursor", s.bigCursor);
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULT);

  // Load saved prefs on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = { ...DEFAULT, ...JSON.parse(raw) };
        setState(s);
        apply(s);
      }
    } catch { /* ignore */ }
  }, []);

  const update = (patch: Partial<A11yState>) => {
    setState(prev => {
      const next = { ...prev, ...patch };
      apply(next);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const reset = () => {
    setState(DEFAULT);
    apply(DEFAULT);
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  };

  const Toggle = ({ on, label, icon, onClick, tip }: { on: boolean; label: string; icon: string; onClick: () => void; tip: string }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`shine flex flex-col items-center justify-center gap-1.5 rounded-xl p-3 border transition-colors min-h-[76px] ${
        on ? "bg-primary text-white border-primary" : "bg-white text-primary border-outline-variant hover:border-gold"
      }`}
      data-tooltip={tip}
    >
      <span className="material-symbols-outlined text-[24px]" aria-hidden="true">{icon}</span>
      <span className="text-[11px] font-semibold leading-tight text-center">{label}</span>
    </button>
  );

  return (
    <>
      {/* Launcher — the recognized accessibility person icon, bottom-right above nothing */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        style={{ bottom: "calc(6rem + var(--safe-bottom))" }}
        className="fixed left-4 sm:left-8 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-secondary text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white hover:scale-110 transition-transform"
        aria-label="תפריט נגישות"
        aria-expanded={open}
        data-tooltip="פתיחת תפריט הנגישות: הגדלת טקסט, ניגודיות גבוהה, הדגשת קישורים, עצירת אנימציות ועוד. ההגדרות נשמרות לביקורים הבאים. עומד בתקן הישראלי 5568 ו-WCAG 2.1 AA."
      >
        <span className="material-symbols-outlined text-[28px]" aria-hidden="true">accessibility_new</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 bg-primary/30 backdrop-blur-sm z-[70] animate-fade-in" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            className="fixed z-[71] bottom-4 left-4 right-4 sm:left-8 sm:right-auto sm:w-[360px] bg-white rounded-3xl shadow-2xl border border-gold/30 p-5 animate-scale-in max-h-[85vh] overflow-y-auto"
            role="dialog"
            aria-label="תפריט נגישות"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" aria-hidden="true">accessibility_new</span>
                תפריט נגישות
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shine w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
                aria-label="סגירת תפריט הנגישות"
                data-tooltip="סגירת תפריט הנגישות"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">close</span>
              </button>
            </div>

            {/* Text size */}
            <div className="mb-4">
              <p className="text-xs font-bold text-primary mb-2">גודל טקסט</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => update({ fontScale: Math.max(100, state.fontScale - 15) })}
                  className="shine w-10 h-10 rounded-xl border border-outline-variant hover:border-gold flex items-center justify-center text-lg font-bold"
                  aria-label="הקטנת גודל הטקסט"
                  data-tooltip="הקטנת גודל הטקסט בכל האתר בצעד אחד."
                >−</button>
                <div className="flex-1 text-center bg-surface-container rounded-xl py-2 text-sm font-bold text-primary">{state.fontScale}%</div>
                <button
                  type="button"
                  onClick={() => update({ fontScale: Math.min(150, state.fontScale + 15) })}
                  className="shine w-10 h-10 rounded-xl border border-outline-variant hover:border-gold flex items-center justify-center text-lg font-bold"
                  aria-label="הגדלת גודל הטקסט"
                  data-tooltip="הגדלת גודל הטקסט בכל האתר בצעד אחד (עד 150%)."
                >+</button>
              </div>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-3 gap-2">
              <Toggle on={state.contrast} label="ניגודיות גבוהה" icon="contrast" onClick={() => update({ contrast: !state.contrast })}
                tip="הגברת ניגודיות הצבעים לשחור-לבן חד, לקריאות טובה יותר עבור לקויי ראייה." />
              <Toggle on={state.readable} label="גופן קריא" icon="format_size" onClick={() => update({ readable: !state.readable })}
                tip="החלפה לגופן כבד יותר עם ריווח מוגדל, נוח יותר לקריאה ולמתקשי קריאה." />
              <Toggle on={state.links} label="הדגשת קישורים" icon="link" onClick={() => update({ links: !state.links })}
                tip="הדגשה וקו תחתון לכל הקישורים כדי לזהות אותם בקלות." />
              <Toggle on={state.stopMotion} label="עצירת אנימציות" icon="motion_photos_off" onClick={() => update({ stopMotion: !state.stopMotion })}
                tip="עצירת כל האנימציות והתנועות באתר, למניעת הסחה ולנוחות רגישי-תנועה." />
              <Toggle on={state.bigCursor} label="סמן גדול" icon="mouse" onClick={() => update({ bigCursor: !state.bigCursor })}
                tip="הגדלת סמן העכבר לזיהוי קל יותר של מיקומו על המסך." />
              <Toggle on={false} label="איפוס" icon="restart_alt" onClick={reset}
                tip="איפוס כל הגדרות הנגישות למצב ברירת המחדל." />
            </div>

            <div className="mt-4 pt-3 border-t border-outline-variant/50 text-center">
              <a href="/accessibility" className="text-xs text-secondary font-semibold underline" data-tooltip="מעבר להצהרת הנגישות המלאה של הפורטל ולפרטי רכז הנגישות.">
                הצהרת הנגישות המלאה →
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

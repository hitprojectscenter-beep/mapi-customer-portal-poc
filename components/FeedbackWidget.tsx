"use client";

// Feedback widget — a discreet side tab that opens a panel with two modes:
//  1. Satisfaction survey (1-5 stars + optional comment)
//  2. "מצאתם טעות?" error/inaccuracy report (auto-captures the page URL)
// Posts to /api/feedback (Postgres + Sheets + Chat when configured; demo no-op).
// Hidden on back-office routes so it never covers admin/CMS controls.

import { usePathname } from "next/navigation";
import { useState } from "react";

type Mode = "survey" | "error";

export default function FeedbackWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("survey");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (pathname.startsWith("/cms") || pathname.startsWith("/admin")) return null;

  const reset = () => { setRating(0); setHover(0); setMessage(""); setEmail(""); setErr(""); setSent(false); };

  const submit = async () => {
    setErr("");
    if (mode === "survey" && rating === 0) { setErr("אנא בחרו דירוג בכוכבים."); return; }
    if (mode === "error" && !message.trim()) { setErr("אנא תארו את הטעות שמצאתם."); return; }
    setBusy(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: mode, rating, message: message.trim(), email: email.trim(), pageUrl: typeof window !== "undefined" ? window.location.href : "" })
      });
      setSent(true);
      setTimeout(() => { setOpen(false); reset(); }, 2600);
    } catch {
      setErr("שגיאת רשת — נסו שוב.");
    } finally {
      setBusy(false);
    }
  };

  const STARS = [1, 2, 3, 4, 5];

  return (
    <>
      {/* Side tab launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => { reset(); setOpen(true); }}
          style={{ top: "50%" }}
          className="fixed -translate-y-1/2 right-0 z-40 bg-gradient-to-b from-primary to-tertiary text-white px-2 py-4 rounded-s-2xl shadow-lg border border-gold/40 border-e-0 hover:px-3 transition-all flex flex-col items-center gap-1.5"
          aria-label="שליחת משוב או דיווח על טעות"
          data-tooltip="נשמח לשמוע! דרגו את חוויית השימוש שלכם או דווחו לנו על טעות/אי-דיוק שמצאתם באתר. המשוב נשלח ישירות לצוות."
        >
          <span className="material-symbols-outlined text-[22px]" aria-hidden="true">rate_review</span>
          <span className="text-[11px] font-bold tracking-wide" style={{ writingMode: "vertical-rl" }}>משוב</span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <>
          <div className="fixed inset-0 bg-primary/30 backdrop-blur-sm z-[60] animate-fade-in" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            className="fixed z-[61] top-1/2 -translate-y-1/2 right-4 left-4 sm:left-auto sm:right-6 sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-gold/30 p-6 animate-scale-in max-h-[88vh] overflow-y-auto"
            role="dialog"
            aria-label="משוב וסקר שביעות רצון"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="shine absolute top-4 left-4 w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
              aria-label="סגירה"
              data-tooltip="סגירת חלון המשוב"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">close</span>
            </button>

            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-positive-green/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[40px] text-positive-green" aria-hidden="true">check_circle</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-1">תודה רבה!</h3>
                <p className="text-sm text-on-surface-variant">
                  {mode === "error" ? "הדיווח התקבל וייבדק על ידי הצוות." : "המשוב שלך התקבל ויעזור לנו להשתפר."}
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-primary mb-1 text-center">נשמח לשמוע ממך</h3>
                {/* Mode switch */}
                <div className="flex gap-2 my-4 bg-surface-container rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => { setMode("survey"); setErr(""); }}
                    className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${mode === "survey" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant"}`}
                    data-tooltip="דירוג חוויית השימוש שלכם בפורטל בסולם של 1 עד 5 כוכבים, עם אפשרות להוסיף הערה חופשית."
                  >
                    ⭐ סקר שביעות רצון
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode("error"); setErr(""); }}
                    className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${mode === "error" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant"}`}
                    data-tooltip="מצאתם טעות, אי-דיוק או מידע שגוי באתר? ספרו לנו והצוות יתקן. כתובת העמוד הנוכחי מצורפת אוטומטית."
                  >
                    ⚠️ מצאתי טעות
                  </button>
                </div>

                {mode === "survey" ? (
                  <div className="text-center mb-4">
                    <p className="text-sm text-on-surface-variant mb-3">עד כמה חווית השימוש בפורטל הייתה נוחה?</p>
                    <div className="flex justify-center gap-1.5" onMouseLeave={() => setHover(0)}>
                      {STARS.map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setRating(n)}
                          onMouseEnter={() => setHover(n)}
                          className="shine w-11 h-11 flex items-center justify-center transition-transform hover:scale-110"
                          aria-label={`${n} כוכבים`}
                          data-tooltip={`דירוג ${n} מתוך 5`}
                        >
                          <span
                            className="material-symbols-outlined text-[32px]"
                            style={{
                              color: (hover || rating) >= n ? "#b4924e" : "#c2c7d0",
                              fontVariationSettings: (hover || rating) >= n ? "'FILL' 1" : "'FILL' 0"
                            }}
                            aria-hidden="true"
                          >star</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-on-surface-variant mb-3 text-center">
                    תיאור הטעות או אי-הדיוק שמצאתם (כתובת העמוד הנוכחי תצורף אוטומטית):
                  </p>
                )}

                <label htmlFor="fb-msg" className="sr-only">הודעה</label>
                <textarea
                  id="fb-msg"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={mode === "error" ? 4 : 3}
                  placeholder={mode === "error" ? "לדוגמה: המחיר בעמוד תצלומי אוויר אינו מעודכן..." : "הערה חופשית (רשות)..."}
                  className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gold/50 focus:outline-none resize-none"
                  data-tooltip={mode === "error" ? "פירוט הטעות עוזר לצוות לאתר ולתקן במהירות. ציינו את המיקום המדויק והמידע הנכון אם ידוע." : "הערה חופשית על חוויית השימוש — מה עבד טוב ומה אפשר לשפר."}
                />
                <label htmlFor="fb-email" className="sr-only">מייל לחזרה</label>
                <input
                  id="fb-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="מייל לחזרה (רשות)"
                  dir="ltr"
                  className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gold/50 focus:outline-none mt-2"
                  data-tooltip="השאירו מייל אם תרצו שנחזור אליכם עם התייחסות. אופציונלי — ניתן לשלוח משוב גם בעילום שם."
                />

                {err && <p className="text-sm text-error-red text-center mt-2 font-semibold">{err}</p>}

                <button
                  type="button"
                  onClick={submit}
                  disabled={busy}
                  className="shine shine-glow btn-lux-primary w-full py-3 rounded-full mt-4 flex items-center justify-center gap-2 disabled:opacity-60"
                  data-tooltip="שליחת המשוב לצוות מפ״י. תודה שאתם עוזרים לנו להשתפר!"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">{busy ? "hourglass_top" : "send"}</span>
                  <span>{busy ? "שולח..." : "שליחה"}</span>
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

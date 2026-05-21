"use client";

import Link from "next/link";
import { useState } from "react";

export default function NewCasePage() {
  const [submitted, setSubmitted] = useState(false);
  const [urgency, setUrgency] = useState("regular");
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="bg-surface min-h-screen">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-20">
          <div className="bg-white rounded-3xl p-10 md:p-16 text-center border border-outline-variant/50 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-positive-green/10 rounded-full mx-auto mb-6 flex items-center justify-center animate-fade-in">
              <span className="material-symbols-outlined text-[64px] text-positive-green">
                task_alt
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-primary mb-4">הפנייה התקבלה!</h1>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              מספר הפנייה שלך: <span className="font-mono font-bold text-primary">CAS-2026-{Math.floor(Math.random() * 9000) + 1000}</span>
              <br />
              צוות השירות יחזור אליך תוך 1-2 ימי עסקים.
            </p>
            <div className="bg-surface-container rounded-2xl p-4 mb-8 text-center">
              <p className="text-sm font-bold text-primary mb-2">📌 מה הלאה?</p>
              <ul className="text-sm text-on-surface-variant space-y-1 list-disc pr-5">
                <li>קיבלת אישור במייל</li>
                <li>תוכל לעקוב אחר הפנייה ב'הפניות שלי'</li>
                <li>נציג יחזור אליך לפי סדר עדיפויות</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row-reverse gap-3 justify-center">
              <Link
                href="/dashboard"
                className="shine shine-glow bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-secondary transition-colors"
                data-tooltip='חזרה ללוח הבקרה האישי'
                data-tooltip-position="bottom"
              >
                חזור לאזור אישי
              </Link>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="shine text-primary font-bold hover:underline px-3 py-2 rounded"
                data-tooltip="פתיחת טופס Case חדש"
                data-tooltip-position="bottom"
              >
                פתח פנייה נוספת
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-primary text-white">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
          <nav aria-label="ניווט נתיב" className="text-sm text-white/70 mb-4">
            <ol className="flex flex-row-reverse items-center gap-2">
              <li>
                <Link href="/dashboard" className="hover:text-white">אזור אישי</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-bold">פנייה חדשה</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">פתיחת פנייה חדשה</h1>
          <p className="text-white/70">צריך עזרה? פתח פנייה לשירות הלקוחות.</p>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10 grid lg:grid-cols-3 gap-8">
        <aside className="bg-white rounded-3xl p-6 border border-outline-variant/50 lg:col-span-1 self-start">
          <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2 justify-center">
            <span>צריך עזרה?</span>
            <span className="material-symbols-outlined text-secondary">support_agent</span>
          </h2>
          <div className="space-y-4 text-center">
            <div>
              <p className="text-xs text-on-surface-variant mb-1">🕐 שעות פעילות:</p>
              <p className="text-sm font-medium">א'-ה': 08:00-17:00</p>
              <p className="text-sm font-medium">שישי: סגור</p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant mb-1">📞 טלפון מהיר:</p>
              <p className="text-sm font-bold text-secondary">*6274</p>
              <p className="text-sm text-on-surface-variant">או 03-9298853</p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant mb-1">📧 מייל:</p>
              <a
                href="mailto:service@mapi.gov.il"
                className="text-sm font-bold text-secondary hover:underline"
              >
                service@mapi.gov.il
              </a>
            </div>
            <div className="border-t border-outline-variant pt-4">
              <p className="text-xs text-on-surface-variant mb-2">⚡ מענה אוטומטי:</p>
              <button
                type="button"
                className="shine text-sm bg-secondary/10 text-secondary px-4 py-2 rounded-full font-bold hover:bg-secondary hover:text-white transition-colors flex items-center gap-2"
                data-tooltip="פתיחת חלונית הצ&apos;אט החכם מימין למטה"
                data-tooltip-position="bottom"
              >
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                <span>פתח צ&apos;אט תמיכה חכם</span>
              </button>
            </div>
          </div>
        </aside>

        <form
          onSubmit={onSubmit}
          className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/50"
        >
          <h2 className="text-xl font-extrabold text-primary mb-6 text-center">פרטי הפנייה</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="type" className="block text-sm font-bold text-primary mb-2 text-center">
                סוג פנייה <span className="text-error-red">*</span>
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none"
              >
                <option value="">בחר סוג...</option>
                <option value="technical">טכנית - תקלה בשירות</option>
                <option value="professional">מקצועית - שאלת תוכן</option>
                <option value="order">הזמנה - בעיה עם הזמנה</option>
                <option value="financial">חשבונאית - תשלום/חשבונית</option>
                <option value="suggestion">הצעה לשיפור</option>
              </select>
            </div>

            <div>
              <label htmlFor="related-order" className="block text-sm font-bold text-primary mb-2 text-center">
                קשור להזמנה (אופציונלי)
              </label>
              <select
                id="related-order"
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none"
              >
                <option value="">בחר הזמנה...</option>
                <option>ORD-2026-145 - מפה A2</option>
                <option>ORD-2026-098 - תחנות קבע</option>
                <option>ORD-2026-052 - תצלום אוויר</option>
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-bold text-primary mb-2 text-center">
                כותרת הפנייה <span className="text-error-red">*</span>
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                placeholder="תיאור קצר של הבעיה..."
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-primary mb-2 text-center">
                תיאור הפנייה <span className="text-error-red">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                placeholder="תאר את הבעיה בפירוט..."
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-2 text-center">
                צירוף קבצים (אופציונלי)
              </label>
              <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 text-center hover:border-secondary transition-colors">
                <span className="material-symbols-outlined text-[40px] text-on-surface-variant mb-2">
                  upload_file
                </span>
                <p className="text-sm text-on-surface-variant">
                  גרור קבצים לכאן או{" "}
                  <button type="button" className="text-secondary font-bold underline">
                    בחר קבצים
                  </button>
                </p>
                <p className="text-xs text-on-surface-variant mt-1">מקסימום 25MB</p>
              </div>
            </div>

            <fieldset>
              <legend className="block text-sm font-bold text-primary mb-2 text-center">
                דחיפות
              </legend>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: "regular", label: "רגילה", color: "text-positive-green" },
                  { id: "urgent", label: "דחופה", color: "text-alert-yellow" },
                  { id: "critical", label: "קריטית", color: "text-error-red" }
                ].map((u) => (
                  <label
                    key={u.id}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl cursor-pointer border transition-all ${
                      urgency === u.id
                        ? "border-secondary bg-secondary/5 ring-2 ring-secondary"
                        : "border-outline-variant hover:border-secondary"
                    }`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={u.id}
                      checked={urgency === u.id}
                      onChange={() => setUrgency(u.id)}
                      className="sr-only"
                    />
                    <span className={`font-bold ${u.color}`}>●</span>
                    <span>{u.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="flex flex-row-reverse items-center justify-between mt-8 pt-6 border-t border-outline-variant">
            <Link
              href="/dashboard"
              className="shine text-on-surface-variant font-bold hover:text-primary transition-colors px-3 py-2 rounded-lg"
              data-tooltip="ביטול הפנייה וחזרה לאזור האישי"
              data-tooltip-position="bottom"
            >
              ביטול
            </Link>
            <button
              type="submit"
              className="shine shine-glow bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary transition-colors flex items-center gap-2"
              data-tooltip="שליחת הפנייה - מספר Case יתקבל מיד"
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined">send</span>
              שלח פנייה
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

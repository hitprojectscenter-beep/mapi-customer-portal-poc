"use client";

import Link from "next/link";
import { useState } from "react";

export default function AISupportButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-8 left-8 w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 group shine shine-glow"
        aria-label={`פתח צ'אט תמיכה חכם`}
        data-tooltip='צ&apos;אט תמיכה חכם - מענה מיידי'
        data-tooltip-position="bottom"
      >
        <span className="material-symbols-outlined text-[32px]">smart_toy</span>
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-positive-green rounded-full border-2 border-white" aria-hidden="true" />
      </button>

      {open && (
        <div
          className="fixed bottom-28 left-8 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-outline-variant z-50 animate-fade-in"
          role="dialog"
          aria-label={`צ'אט תמיכה`}
        >
          <div className="bg-gradient-to-l from-primary to-secondary p-5 rounded-t-3xl flex items-center justify-between">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white shine rounded-full p-1"
              aria-label="סגור צ'אט"
              data-tooltip="סגור חלון הצ&apos;אט"
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="text-center">
              <h3 className="text-white font-bold">צ&apos;אט תמיכה חכם</h3>
              <p className="text-white/70 text-xs flex items-center justify-center gap-1.5">
                <span>מחובר</span>
                <span className="w-2 h-2 bg-positive-green rounded-full" aria-hidden="true" />
              </p>
            </div>
          </div>
          <div className="p-5 max-h-80 overflow-y-auto">
            <div className="bg-surface-container p-4 rounded-2xl rounded-tr-sm mb-4 text-center">
              <p className="text-sm text-on-surface">
                שלום! אני העוזר הדיגיטלי של מפ&quot;י. אני יכול לעזור לך באיתור גוש וחלקה,
                הזמנת מפה, או כל שאלה אחרת.
              </p>
            </div>
            <div className="bg-surface-container p-4 rounded-2xl rounded-tr-sm text-center">
              <p className="text-sm text-on-surface font-medium mb-2">פעולות מהירות:</p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/help"
                  className="shine text-center text-xs bg-white border border-outline-variant px-3 py-2 rounded-full hover:bg-secondary hover:text-white hover:border-secondary transition-colors"
                  data-tooltip="עבור למרכז העזרה - איך להזמין מפה"
                  data-tooltip-position="bottom"
                >
                  איך להזמין מפה?
                </Link>
                <Link
                  href="/cases/new"
                  className="shine text-center text-xs bg-white border border-outline-variant px-3 py-2 rounded-full hover:bg-secondary hover:text-white hover:border-secondary transition-colors"
                  data-tooltip="פתיחת פנייה חדשה לטיפול בבעיה"
                  data-tooltip-position="bottom"
                >
                  בעיה עם הזמנה קיימת
                </Link>
                <Link
                  href="/orders"
                  className="shine text-center text-xs bg-white border border-outline-variant px-3 py-2 rounded-full hover:bg-secondary hover:text-white hover:border-secondary transition-colors"
                  data-tooltip="צפייה בסטטוס מנויי CORS פעילים"
                  data-tooltip-position="bottom"
                >
                  מצב הזמנת CORS
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-outline-variant p-3 flex flex-row-reverse items-center gap-2">
            <label htmlFor="chat-input" className="sr-only">
              הקלד הודעה
            </label>
            <input
              id="chat-input"
              type="text"
              placeholder="הקלד הודעה..."
              className="flex-1 bg-surface-container border-0 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none text-center"
              aria-label="הקלד הודעה"
            />
            <button
              type="button"
              className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors shine"
              aria-label="שלח"
              data-tooltip="שלח הודעה לעוזר החכם"
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

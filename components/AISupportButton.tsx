"use client";

import { useState } from "react";

export default function AISupportButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-8 left-8 w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 group"
        aria-label={`פתח צ'אט תמיכה חכם`}
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
              className="text-white/80 hover:text-white"
              aria-label="סגור צ'אט"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="text-right">
              <h3 className="text-white font-bold">צ'אט תמיכה חכם</h3>
              <p className="text-white/70 text-xs flex items-center justify-end gap-1.5">
                <span>מחובר</span>
                <span className="w-2 h-2 bg-positive-green rounded-full" aria-hidden="true" />
              </p>
            </div>
          </div>
          <div className="p-5 max-h-80 overflow-y-auto">
            <div className="bg-surface-container p-4 rounded-2xl rounded-tr-sm mb-4 text-right">
              <p className="text-sm text-on-surface">
                שלום! אני העוזר הדיגיטלי של מפ"י. אני יכול לעזור לך באיתור גוש וחלקה,
                הזמנת מפה, או כל שאלה אחרת.
              </p>
            </div>
            <div className="bg-surface-container p-4 rounded-2xl rounded-tr-sm text-right">
              <p className="text-sm text-on-surface font-medium mb-2">פעולות מהירות:</p>
              <div className="flex flex-col gap-2">
                <button className="text-right text-xs bg-white border border-outline-variant px-3 py-2 rounded-full hover:bg-secondary hover:text-white hover:border-secondary transition-colors">
                  איך להזמין מפה?
                </button>
                <button className="text-right text-xs bg-white border border-outline-variant px-3 py-2 rounded-full hover:bg-secondary hover:text-white hover:border-secondary transition-colors">
                  בעיה עם הזמנה קיימת
                </button>
                <button className="text-right text-xs bg-white border border-outline-variant px-3 py-2 rounded-full hover:bg-secondary hover:text-white hover:border-secondary transition-colors">
                  מצב הזמנת CORS
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-outline-variant p-3 flex flex-row-reverse items-center gap-2">
            <input
              type="text"
              placeholder="הקלד הודעה..."
              className="flex-1 bg-surface-container border-0 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none text-right"
              aria-label="הקלד הודעה"
            />
            <button
              type="button"
              className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="שלח"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

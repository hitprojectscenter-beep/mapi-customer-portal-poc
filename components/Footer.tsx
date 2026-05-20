import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-5" aria-hidden="true" />
      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16">
          <div className="col-span-2 md:col-span-1 flex flex-col items-end gap-5">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end leading-tight">
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  MAPI
                </span>
                <span className="text-[10px] font-semibold text-secondary-container">
                  המרכז למיפוי ישראל
                </span>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <span className="material-symbols-outlined text-white text-[32px]">
                  public
                </span>
              </div>
            </div>
            <p className="text-right text-white/60 text-sm leading-relaxed">
              המרכז למיפוי ישראל הוא היחידה הממשלתית האחראית על כלל תחומי המיפוי,
              המדידה, הגיאודזיה והקדסטר במדינת ישראל.
            </p>
          </div>

          <div className="flex flex-col items-end gap-5">
            <h4 className="font-bold text-sm uppercase tracking-widest text-secondary-container">
              קישורים מהירים
            </h4>
            <nav className="flex flex-col items-end gap-3 text-white/70 text-sm" aria-label="קישורים בפוטר">
              <Link href="/catalog" className="hover:text-white transition-colors">
                קטלוג שירותים
              </Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">
                אזור אישי
              </Link>
              <Link href="/help" className="hover:text-white transition-colors">
                מרכז עזרה
              </Link>
              <Link href="/cases/new" className="hover:text-white transition-colors">
                פתיחת פנייה
              </Link>
            </nav>
          </div>

          <div className="flex flex-col items-end gap-5">
            <h4 className="font-bold text-sm uppercase tracking-widest text-secondary-container">
              מידע משפטי
            </h4>
            <nav className="flex flex-col items-end gap-3 text-white/70 text-sm" aria-label="קישורים משפטיים">
              <a href="#" className="hover:text-white transition-colors">תנאי שימוש</a>
              <a href="#" className="hover:text-white transition-colors">מדיניות פרטיות</a>
              <a href="#" className="hover:text-white transition-colors">הצהרת נגישות</a>
              <a href="#" className="hover:text-white transition-colors">מפת האתר</a>
            </nav>
          </div>

          <div className="flex flex-col items-end gap-5">
            <h4 className="font-bold text-sm uppercase tracking-widest text-secondary-container">
              צור קשר
            </h4>
            <div className="flex flex-col items-end gap-3 text-white/70 text-right text-sm">
              <p className="flex items-center gap-2">
                <span>לינקולן 1, תל אביב</span>
                <span className="material-symbols-outlined text-[18px]">location_on</span>
              </p>
              <p className="flex items-center gap-2">
                <span>מוקד תמיכה: *6274</span>
                <span className="material-symbols-outlined text-[18px]">phone</span>
              </p>
              <a
                href="mailto:service@mapi.gov.il"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <span>service@mapi.gov.il</span>
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row-reverse justify-between items-center gap-4">
          <p className="text-white/50 text-xs">
            © 2026 המרכז למיפוי ישראל (מפ"י). כל הזכויות שמורות.
          </p>
          <div className="flex gap-4" role="list">
            <a
              href="#"
              className="text-white/40 hover:text-white transition-colors w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
              aria-label="פייסבוק"
            >
              <span className="material-symbols-outlined text-[20px]">facebook</span>
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-white transition-colors w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
              aria-label="אתר ראשי"
            >
              <span className="material-symbols-outlined text-[20px]">language</span>
            </a>
            <a
              href="mailto:service@mapi.gov.il"
              className="text-white/40 hover:text-white transition-colors w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
              aria-label="אימייל"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

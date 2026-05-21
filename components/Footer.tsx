import Link from "next/link";
import Image from "next/image";

const MAPI_SITE = "https://www.gov.il/he/departments/survey_of_israel";
const GOV_ACCESSIBILITY = "https://www.gov.il/he/policies/accessibility";
const GOV_PRIVACY = "https://www.gov.il/he/policies/privacy_policy";
const GOV_TERMS = "https://www.gov.il/he/policies/terms_of_use";
const MAPI_CONTACT = "https://www.gov.il/he/departments/survey_of_israel/govil-landing-page";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-5" aria-hidden="true" />
      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16">
          <div className="col-span-2 md:col-span-1 flex flex-col items-end gap-5">
            <a
              href={MAPI_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 shine rounded-2xl p-2 -m-2 group"
              data-tooltip='לאתר הרשמי של המרכז למיפוי ישראל ב-gov.il'
              data-tooltip-position="bottom"
            >
              <div className="flex flex-col items-end leading-tight">
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  MAPI
                </span>
                <span className="text-[10px] font-semibold text-secondary-container">
                  המרכז למיפוי ישראל
                </span>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:bg-white/20 group-hover:scale-105 transition-all overflow-hidden p-1">
                <Image
                  src="/mapi-logo-white.svg"
                  alt='לוגו המרכז למיפוי ישראל'
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
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
              <Link
                href="/catalog"
                className="hover:text-white transition-colors shine px-2 py-0.5 rounded"
                data-tooltip='קטלוג כל 14 השירותים'
              >
                קטלוג שירותים
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-white transition-colors shine px-2 py-0.5 rounded"
                data-tooltip="לוח בקרה אישי"
              >
                אזור אישי
              </Link>
              <Link
                href="/help"
                className="hover:text-white transition-colors shine px-2 py-0.5 rounded"
                data-tooltip="שאלות נפוצות, מדריכים ויצירת קשר"
              >
                מרכז עזרה
              </Link>
              <Link
                href="/cases/new"
                className="hover:text-white transition-colors shine px-2 py-0.5 rounded"
                data-tooltip="טופס פנייה חדש לשירות הלקוחות"
              >
                פתיחת פנייה
              </Link>
            </nav>
          </div>

          <div className="flex flex-col items-end gap-5">
            <h4 className="font-bold text-sm uppercase tracking-widest text-secondary-container">
              מידע משפטי
            </h4>
            <nav className="flex flex-col items-end gap-3 text-white/70 text-sm" aria-label="קישורים משפטיים">
              <a
                href={GOV_TERMS}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors shine px-2 py-0.5 rounded"
                data-tooltip="תנאי שימוש - באתר gov.il"
              >
                תנאי שימוש
              </a>
              <a
                href={GOV_PRIVACY}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors shine px-2 py-0.5 rounded"
                data-tooltip="מדיניות פרטיות - באתר gov.il"
              >
                מדיניות פרטיות
              </a>
              <a
                href={GOV_ACCESSIBILITY}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors shine px-2 py-0.5 rounded"
                data-tooltip="הצהרת נגישות WCAG 2.1 AA"
              >
                הצהרת נגישות
              </a>
              <a
                href={MAPI_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors shine px-2 py-0.5 rounded"
                data-tooltip='אתר מפ"י המלא ב-gov.il'
              >
                אתר מפ"י המלא
              </a>
            </nav>
          </div>

          <div className="flex flex-col items-end gap-5">
            <h4 className="font-bold text-sm uppercase tracking-widest text-secondary-container">
              צור קשר
            </h4>
            <div className="flex flex-col items-end gap-3 text-white/70 text-right text-sm">
              <a
                href="https://maps.app.goo.gl/Q3w3VEr5K3y3Y3y39"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors shine px-2 py-0.5 rounded"
                data-tooltip="פתח במפות Google"
              >
                <span>לינקולן 1, תל אביב</span>
                <span className="material-symbols-outlined text-[18px]">location_on</span>
              </a>
              <a
                href="tel:*6274"
                className="flex items-center gap-2 hover:text-white transition-colors shine px-2 py-0.5 rounded"
                data-tooltip="חיוג ישיר למוקד מפ&quot;י"
              >
                <span>מוקד תמיכה: *6274</span>
                <span className="material-symbols-outlined text-[18px]">phone</span>
              </a>
              <a
                href="mailto:service@mapi.gov.il"
                className="hover:text-white transition-colors flex items-center gap-2 shine px-2 py-0.5 rounded"
                data-tooltip="שליחת מייל לשירות הלקוחות"
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
              href="https://www.facebook.com/MAPI.SURVEY/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center shine"
              aria-label="פייסבוק"
              data-tooltip='עמוד הפייסבוק של מפ"י'
            >
              <span className="material-symbols-outlined text-[20px]">facebook</span>
            </a>
            <a
              href={MAPI_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center shine"
              aria-label="אתר ראשי"
              data-tooltip='האתר הרשמי של מפ"י ב-gov.il'
            >
              <span className="material-symbols-outlined text-[20px]">language</span>
            </a>
            <a
              href="mailto:service@mapi.gov.il"
              className="text-white/40 hover:text-white transition-colors w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center shine"
              aria-label="אימייל"
              data-tooltip="שליחת מייל"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'הצהרת נגישות | מפ"י - פורטל לקוחות',
  description: "הצהרת הנגישות של פורטל הלקוחות של המרכז למיפוי ישראל"
};

// Accessibility statement — required by תקנות שוויון זכויות לאנשים עם
// מוגבלות (התאמות נגישות לשירות), תשע"ג-2013, and ת"י 5568 (WCAG 2.0 AA).
// The coordinator contact details are placeholders the org must fill in.
export default function AccessibilityPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">הצהרת נגישות</h1>
      <p className="text-sm text-on-surface-variant mb-8 font-light">
        עודכן לאחרונה: יולי 2026 · פורטל הלקוחות של המרכז למיפוי ישראל (מפ&quot;י)
      </p>

      <div className="space-y-8 text-on-surface leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-primary mb-2">מחויבות לנגישות</h2>
          <p>
            המרכז למיפוי ישראל רואה חשיבות עליונה במתן שירות שוויוני, מכבד ונגיש לכלל
            הלקוחות, לרבות אנשים עם מוגבלות. הפורטל תוכנן ופותח בהתאם לתקנות שוויון
            זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע&quot;ג-2013, ולתקן
            הישראלי ת&quot;י 5568 המבוסס על הנחיות WCAG 2.1 ברמה AA.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-primary mb-2">התאמות הנגישות באתר</h2>
          <ul className="list-disc pr-6 space-y-1.5">
            <li>ניווט מלא באמצעות מקלדת בלבד, כולל סימון פוקוס בולט (focus-visible)</li>
            <li>תמיכה בקוראי מסך: תגיות ARIA, כותרות היררכיות וטקסט חלופי לתמונות</li>
            <li>ניגודיות צבעים העומדת בדרישות AA ומעלה</li>
            <li>אזורי מגע בגודל 44 פיקסלים לפחות במכשירי מגע</li>
            <li>תמיכה בהגדלת טקסט עד 200% ללא אובדן תוכן או פונקציונליות</li>
            <li>כיבוד העדפת המשתמש להפחתת אנימציות (prefers-reduced-motion)</li>
            <li>מבנה עמודים עקבי עם דילוג ישיר לתוכן המרכזי</li>
            <li>הפורטל זמין בשש שפות: עברית, אנגלית, צרפתית, ספרדית, רוסית וערבית</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-primary mb-2">חריגות ומגבלות ידועות</h2>
          <p>
            מפת GovMap המוטמעת בפורטל מסופקת על ידי צד שלישי (govmap.gov.il) ונגישותה
            באחריות הספק. חלופה טקסטואלית למידע המוצג במפה זמינה דרך מוקד השירות.
            אנו פועלים באופן שוטף לאיתור ותיקון פערי נגישות נוספים.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-primary mb-2">רכז הנגישות</h2>
          <p>
            לשאלות, תקלות נגישות או בקשות להתאמה אישית ניתן לפנות לרכז הנגישות של
            המרכז למיפוי ישראל:
          </p>
          <ul className="list-none pr-0 mt-2 space-y-1">
            <li>טלפון: *6274</li>
            <li>
              דוא&quot;ל:{" "}
              <a href="mailto:service@mapi.gov.il" className="text-secondary underline">
                service@mapi.gov.il
              </a>
            </li>
            <li>כתובת: רחוב לינקולן 1, תל אביב-יפו</li>
          </ul>
          <p className="mt-2 text-sm text-on-surface-variant font-light">
            פניות יטופלו בתוך 14 ימי עבודה לכל היותר.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-primary mb-2">הסדרי נגישות בשירות הפרונטלי</h2>
          <p>
            מידע על הסדרי הנגישות במשרדי מפ&quot;י (חניות נכים, גישה לכיסאות גלגלים,
            עמדות שירות מונגשות) זמין באתר הרשמי:{" "}
            <a
              href="https://www.gov.il/he/departments/survey_of_israel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline"
            >
              המרכז למיפוי ישראל — gov.il
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

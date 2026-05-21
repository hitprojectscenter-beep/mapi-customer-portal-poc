import Link from "next/link";

const faqs = [
  {
    category: 'התחברות והזדהות',
    icon: "lock",
    items: [
      {
        q: "איך אני מתחבר לפורטל?",
        a: 'כניסה מתבצעת באמצעות מערכת ההזדהות הלאומית של ממשלת ישראל. בדף הכניסה לחץ על "הזדהות לאומית" וזה יפנה אותך למערכת הזדהות עם ת.ז. וסיסמה / כרטיס חכם.'
      },
      {
        q: "האם אני חייב להזדהות בשביל לעיין בקטלוג?",
        a: "לא! ניתן לעיין בקטלוג השירותים, לקרוא מידע ולהוריד מחירונים ללא הזדהות. הזדהות נדרשת רק עבור ביצוע הזמנה ושמירת היסטוריה."
      },
      {
        q: "שכחתי את הסיסמה - מה לעשות?",
        a: 'הסיסמה מנוהלת על ידי מערכת ההזדהות הלאומית, לא על ידי מפ"י. יש לפנות לאתר ההזדהות הלאומית https://my.gov.il להחזרת סיסמה.'
      }
    ]
  },
  {
    category: 'הזמנות ותשלומים',
    icon: "shopping_cart",
    items: [
      {
        q: "כמה זמן לוקח לקבל הזמנה?",
        a: "זמני האספקה משתנים לפי סוג השירות. לדוגמה: מפה דיגיטלית - 3-5 ימי עסקים, תצלום אוויר - 5-10 ימים, מודד מבקר - 10-21 ימים. הזמן המדויק מוצג בדף השירות."
      },
      {
        q: "אילו אמצעי תשלום מתקבלים?",
        a: "התשלום מתבצע באמצעות שרת התשלומים הממשלתי המאובטח. ניתן לשלם בכרטיס אשראי (ויזה, מאסטרקארד, אמריקן אקספרס) או בהעברה בנקאית להזמנות גדולות."
      },
      {
        q: "האם אקבל חשבונית מס?",
        a: "כן. חשבונית מס/קבלה תיווצר אוטומטית ותישלח למייל לאחר אישור התשלום. ניתן גם להוריד אותה מאזור 'ההזמנות שלי'."
      },
      {
        q: "האם ניתן לבטל הזמנה?",
        a: "ניתן לבטל הזמנה לפני התחלת הטיפול בה. לאחר תחילת הטיפול - יש לפנות לשירות הלקוחות. החזר כספי יבוצע לפי תקנות החזרים של מפ\"י."
      }
    ]
  },
  {
    category: 'שירותים מקצועיים',
    icon: "engineering",
    items: [
      {
        q: "אני מודד - איך מקבלים רישוי?",
        a: 'תהליך רישוי מודדים נעשה דרך טופס ייעודי. מומלץ לפנות לטופס "רישוי מודדים" בקטלוג. נדרשת הסמכה מקצועית והשתתפות בבחינות.'
      },
      {
        q: "מהו שירות CORS?",
        a: "CORS (Continuously Operating Reference Stations) - רשת תחנות קבע GNSS המספקות תיקוני מיקום בזמן אמת ברמת דיוק מילימטרית. מתאים למודדים, מהנדסים וחברות תכנון."
      },
      {
        q: 'איך אני מזמין מפת תצ"ר?',
        a: 'מפות תצ"ר (תכנית לצרכי רישום) מסופקות לאחר ביקורת של מודד מבקר. ניתן להזמין את השירות דרך הקטלוג, סעיף "מודד מבקר".'
      }
    ]
  },
  {
    category: "טכני",
    icon: "settings",
    items: [
      {
        q: "באילו דפדפנים תומך הפורטל?",
        a: "הפורטל תומך בדפדפנים מודרניים: Chrome, Firefox, Edge, Safari. מומלץ להשתמש בגרסה עדכנית. הפורטל מותאם גם למובייל וטאבלט."
      },
      {
        q: "האם הפורטל נגיש?",
        a: 'כן. הפורטל עומד בתקן WCAG 2.1 ברמה AA כנדרש לפי תקנות שוויון זכויות לאנשים עם מוגבלות. תומך בקוראי מסך, ניווט במקלדת והגדלת טקסט.'
      },
      {
        q: "אילו פורמטים של קבצים מסופקים?",
        a: "תלוי בשירות: PDF (מסמכים), GeoTIFF (תצלומי אוויר ואורתופוטו), Shapefile/GeoJSON/GPKG (נתוני GIS), DWG/DXF (תכניות מודדים)."
      }
    ]
  }
];

export default function HelpPage() {
  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-l from-primary to-tertiary text-white">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-12 md:py-16">
          <nav aria-label="ניווט נתיב" className="text-sm text-white/70 mb-4">
            <ol className="flex flex-row-reverse items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">דף הבית</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-bold">מרכז עזרה</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-right">מרכז העזרה</h1>
          <p className="text-white/80 text-lg max-w-2xl text-right mb-8">
            תשובות לשאלות הנפוצות ביותר אצל לקוחות מפ"י. אם לא מצאת תשובה - פנה לשירות הלקוחות.
          </p>

          <form
            role="search"
            action="/help"
            method="get"
            className="max-w-2xl"
          >
            <div className="glass-effect p-2 rounded-2xl flex flex-row-reverse items-center shadow-2xl">
              <label htmlFor="help-search" className="sr-only">חיפוש במרכז העזרה</label>
              <input
                id="help-search"
                name="q"
                type="search"
                placeholder='איך אני יכול לעזור?'
                className="bg-transparent border-none focus:ring-0 focus:outline-none text-white placeholder:text-white/50 text-right flex-grow px-4 py-3 text-base"
              />
              <button
                type="submit"
                className="shine bg-white text-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary-container transition-all"
                data-tooltip="חיפוש במאגר השאלות והמדריכים"
                data-tooltip-position="bottom"
              >
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Quick Contact */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: "phone",
              title: 'מוקד טלפוני',
              desc: "*6274 | 03-9298853",
              href: "tel:*6274",
              tip: 'חיוג ישיר למוקד מפ"י'
            },
            {
              icon: "mail",
              title: 'מייל',
              desc: "service@mapi.gov.il",
              href: "mailto:service@mapi.gov.il",
              tip: 'שליחת מייל לשירות הלקוחות'
            },
            {
              icon: "support_agent",
              title: 'פתח פנייה',
              desc: "מענה תוך 1-2 ימי עסקים",
              href: "/cases/new",
              tip: 'מעבר לטופס פתיחת Case חדש'
            }
          ].map((c, i) => {
            const isExternal = c.href.startsWith("tel:") || c.href.startsWith("mailto:");
            const cls =
              "shine bg-white rounded-3xl p-6 border border-outline-variant/50 hover:shadow-xl transition-all hover:-translate-y-0.5 flex flex-row-reverse items-center gap-4";
            const inner = (
              <>
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[28px]">{c.icon}</span>
                </div>
                <div className="flex-1 text-right">
                  <p className="font-bold text-primary">{c.title}</p>
                  <p className="text-sm text-on-surface-variant">{c.desc}</p>
                </div>
                <span className="text-sm font-bold text-secondary">←</span>
              </>
            );
            return isExternal ? (
              <a
                key={i}
                href={c.href}
                className={cls}
                data-tooltip={c.tip}
                data-tooltip-position="bottom"
              >
                {inner}
              </a>
            ) : (
              <Link
                key={i}
                href={c.href}
                className={cls}
                data-tooltip={c.tip}
                data-tooltip-position="bottom"
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop pb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-8 text-right">
          שאלות נפוצות לפי קטגוריה
        </h2>
        <div className="space-y-6">
          {faqs.map((cat, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/50">
              <div className="flex flex-row-reverse items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined">{cat.icon}</span>
                </div>
                <h3 className="text-xl font-extrabold text-primary">{cat.category}</h3>
              </div>
              <div className="space-y-3">
                {cat.items.map((item, j) => (
                  <details
                    key={j}
                    className="bg-surface rounded-2xl p-4 border border-outline-variant/50 group"
                  >
                    <summary className="font-bold text-primary cursor-pointer flex items-center justify-between flex-row-reverse">
                      <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                        expand_more
                      </span>
                      <span className="text-right">{item.q}</span>
                    </summary>
                    <p className="text-on-surface-variant mt-3 text-right leading-relaxed">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop pb-20">
        <div className="bg-gradient-to-l from-primary to-secondary rounded-3xl p-10 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-10" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">לא מצאת תשובה?</h2>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              צוות שירות הלקוחות שלנו ישמח לעזור לך עם כל שאלה.
            </p>
            <Link
              href="/cases/new"
              className="shine shine-glow inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-secondary-container transition-colors"
              data-tooltip="פתיחת Case חדש - מענה תוך 1-2 ימי עסקים"
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined">support_agent</span>
              <span>פתח פנייה חדשה</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

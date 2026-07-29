# הפעלת שליחת מיילים בפורטל

עד כה **הפורטל לא שלח מיילים כלל** — לידים והזמנות נשמרו במסד הנתונים (Postgres),
אבל שום מייל לא יצא ללקוח או לצוות המכירות. הקוד עכשיו שולח מיילים אמיתיים
(אישור ללקוח + התראה למכירות) — צריך רק לחבר **ערוץ שליחה אחד**.

בפרודקשן כרגע: `postgres: true`, `sheets: false`, `chat: false`, `email: false`.
אחרי ההגדרה למטה, `email` יהפוך ל-`true` (אפשר לבדוק ב-`/api/leads` ב-GET).

## מה נשלח
- **ללקוח** — מייל אישור "קיבלנו את פנייתך / אישור הזמנה" עם פרטי הבקשה והאומדן.
- **למכירות** (`SALES_EMAIL`, ברירת מחדל `MapiComPortal@gmail.com`) — התראת ליד/הזמנה חדשה עם כל הפרטים והניקוד.

---

## אפשרות א' (מומלצת) — Gmail דרך Google Apps Script
שולח מה-Gmail הקיים שלכם, לכל נמען, בחינם, בלי שירות חיצוני.

1. פתחו את [`docs/mail-appsscript.gs`](mail-appsscript.gs) ובצעו את 6 השלבים שבראש הקובץ.
2. משתני הסביבה שתגדירו ב-Vercel:
   - `MAIL_WEBHOOK_URL` — כתובת ה-`/exec` של ה-Web App
   - `MAIL_WEBHOOK_TOKEN` — הסוד המשותף (זהה ל-`MAIL_TOKEN` בסקריפט)
   - `SALES_EMAIL` — `MapiComPortal@gmail.com`
3. Redeploy לפרודקשן.

מגבלת שליחה: ~100 נמענים/יום ב-Gmail רגיל (מספיק ל-POC).

---

## אפשרות ב' — Resend (HTTP API)
דורג פרודקשן, אך מצריך אימות דומיין כדי לשלוח לכל נמען.

1. חשבון ב-https://resend.com → צרו API key.
2. משתני סביבה ב-Vercel:
   - `RESEND_API_KEY` — המפתח
   - `MAIL_FROM` — כתובת שולח על דומיין מאומת, למשל `פורטל מפ"י <noreply@yourdomain.gov.il>`
     (ללא אימות דומיין ניתן לשלוח רק לכתובת של בעל חשבון Resend, מהכתובת `onboarding@resend.dev`.)
   - `SALES_EMAIL` — `MapiComPortal@gmail.com`
3. Redeploy.

---

## בדיקה
1. GET ל-`https://mapi-customer-portal-poc.vercel.app/api/leads` → `"email": true`.
2. שלחו בקשת הצעת מחיר בפורטל עם כתובת אמיתית → אמורים להגיע שני מיילים
   (אישור ללקוח + התראה ל-`SALES_EMAIL`).
3. אם לא הגיע: בדקו ספאם, ואת לוגי הפונקציה ב-Vercel (`[leads intake] email(...)`).

> אבטחה: נקודת הקצה מוגבלת בקצב (30 בקשות ל-10 דק' לכל IP). ה-`MAIL_WEBHOOK_TOKEN`
> מונע שימוש לרעה בכתובת ה-Web App. אל תכניסו סודות לקוד — רק כמשתני סביבה.

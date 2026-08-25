# סביבות ומסדי נתונים — מבנה והקמה

מסמך זה מגדיר את שלוש הסביבות של פורטל מפ״י ואת דרך ההקמה של **מסד נתונים נפרד לכל סביבה** ב-Vercel + Neon Postgres. הפרדת מסדי הנתונים היא דרישת בסיס לעבודה מסודרת ולרמת גופי מ״ק — כדי שבדיקות/מבדקי חדירות בסביבת test לא ייגעו לעולם בנתוני הפרודקשן.

---

## 1. המבנה — ענף → סביבה → מסד נתונים

| ענף git | סביבת Vercel | כתובת | מסד נתונים (יעד) | גישה |
|---|---|---|---|---|
| `main` (=`prod`) | **Production** | `mapi-customer-portal-poc.vercel.app` | **DB פרודקשן** | ציבורי |
| `test` | Preview | branch-alias (`…-git-…`) | **DB בדיקות** | מוגן SSO |
| `dev` | Preview | branch-alias (`…-git-…`) | **DB פיתוח** | מוגן SSO |

תהליך העבודה: **dev → test → prod** (main). קוד עולה קודם ל-`dev`, נבדק ב-`test`, ורק לאחר אישור ממוזג ל-`main`.

> היום `VERCEL_ENV` הוא `production` ל-`main` ו-`preview` ל-`dev`/`test`. הפורטל מזהה את הסביבה לפי `VERCEL_ENV` + שם הענף (`VERCEL_GIT_COMMIT_REF`) ומציג תגית "סביבה: …" במסך ניהול המוצרים ב-CMS — כדי שלא תערוך פרודקשן בטעות.

---

## 2. איך היישום מתחבר ל-DB

- הקוד קורא את `DATABASE_URL` (ואם אין — `POSTGRES_URL`). ראו `lib/db.ts`.
- **אין צורך בהרצת מיגרציות ידנית:** בפנייה הראשונה ל-`/api/products` הטבלאות נוצרות אוטומטית, ואם טבלת המוצרים ריקה — היא **נזרעת אוטומטית** ב-23 מוצרי מפ״י (`seedProductsIfEmpty`). לכן **DB חדש וריק ימלא את עצמו** בכניסה הראשונה.
- אם אין `DATABASE_URL` כלל — היישום עובד ב"מצב דמו" (רשימת קוד מובנית, ללא כתיבה).

לכן כל מה שנדרש להפרדה הוא: **`DATABASE_URL` שונה לכל סביבה ב-Vercel.**

---

## 3. אפשרות מומלצת — אינטגרציית Neon עם Database Branching (אוטומטי)

זו הדרך הנקייה ביותר: Neon יוצר **ענף DB מבודד לכל Preview** אוטומטית, בעוד הפרודקשן משתמש בענף הראשי.

1. **Vercel → Project → Storage → Create Database → Postgres (Neon)** (או Marketplace → Neon → Add Integration).
2. חברו את ה-Database לפרויקט `mapi-customer-portal-poc`. Vercel/Neon יזריקו את משתני החיבור (`DATABASE_URL` / `POSTGRES_URL`) אוטומטית.
3. באינטגרציית Neon הפעילו **"Create a database branch for each preview deployment"** (Preview Branching). מעתה:
   - **Production** (`main`) → ענף Neon הראשי (`main`) = DB הפרודקשן.
   - **כל Preview** (`dev`/`test`) → ענף DB נפרד ומבודד, שמוזרק אליו `DATABASE_URL` משלו.
4. אין צורך בהגדרה ידנית של משתנים — Vercel מזריק את הכתובת הנכונה לכל פריסה.

**יתרון:** בידוד מלא ואוטומטי, ללא ניהול ידני של כתובות. **הערה:** ענפי ה-Preview יזרעו את 23 המוצרים אוטומטית בכניסה הראשונה.

---

## 4. אפשרות חלופית — שלושה מסדי נתונים ידניים

אם מעדיפים שליטה מלאה (או ספק אחר — Supabase / Postgres עצמאי):

1. צרו **שלושה מסדי נתונים** נפרדים: `mapi-prod`, `mapi-test`, `mapi-dev` (ב-Neon / Vercel Postgres / Supabase).
2. **Vercel → Project → Settings → Environment Variables → Add**, והגדירו את `DATABASE_URL` **שלוש פעמים, כל אחת ממודרת לסביבה אחרת**:

   | Key | Value | Environment |
   |---|---|---|
   | `DATABASE_URL` | connection string של **prod** | **Production** בלבד |
   | `DATABASE_URL` | connection string של **test** | **Preview** בלבד* |
   | `DATABASE_URL` | connection string של **dev** | **Development** בלבד |

   \* Vercel לא מפריד Preview לפי ענף במשתני סביבה. כדי ש-`test` ו-`dev` יקבלו DB שונה זה מזה, השתמשו ב**אפשרות 3 (Neon branching)**, או צרו לענף `dev` פרויקט Vercel נפרד. לרוב הצרכים: `main`=prod-DB, וכל שאר ה-Preview=test-DB (בידוד מהפרודקשן — המטרה המרכזית).

3. ודאו **Encrypt/Secret** על הערכים. אל תשמרו connection strings ב-git.
4. **Redeploy** לכל סביבה כדי שהמשתנים ייקלטו.

---

## 5. אימות ההפרדה

לאחר ההקמה, ודאו שכל סביבה מדברת עם ה-DB שלה:

```bash
# פרודקשן — ציבורי
curl -s https://mapi-customer-portal-poc.vercel.app/api/products | grep -o '"source":"[a-z-]*"'
# מצופה: "source":"db"
```

- **ב-CMS** (`/cms/products`): התגית ליד הכותרת תציג "סביבה: פרודקשן / בדיקות (test) / פיתוח (dev)". בפרודקשן התגית **אדומה** — אזהרה שאתה עורך נתונים חיים.
- בדיקת בידוד: הוסיפו מוצר בדיקה ב-`test` דרך ה-CMS, וודאו שהוא **אינו מופיע** בפרודקשן.

---

## 6. משתני סביבה — תזכורת

הרשימה המלאה ב-`.env.example`. הרלוונטיים להפרדה:

| משתנה | תפקיד |
|---|---|
| `DATABASE_URL` (או `POSTGRES_URL`) | חיבור ה-Postgres — **ממודר לכל סביבה** |
| `MAIL_WEBHOOK_URL` / `MAIL_WEBHOOK_TOKEN` | שליחת מייל (ניתן להשאיר משותף, או לנתק בסביבות בדיקה כדי לא לשלוח מיילים אמיתיים) |
| `CMS_*` | אימות ניהול — מומלץ סוד session נפרד לכל סביבה |

> **המלצת אבטחה (מ״ק):** בסביבות `dev`/`test` נתקו את מנוע המיילים (אל תגדירו `MAIL_WEBHOOK_URL`) כדי שבדיקות לא ישלחו מיילים אמיתיים ללקוחות.

---

## 7. סיכום — מה צריך לעשות

1. הקימו DB פרודקשן + הפעילו **Neon Preview Branching** (אפשרות 3) — הדרך המומלצת.
2. ודאו ש-`main` מצביע ל-DB הפרודקשן, וש-`test`/`dev` מקבלים DB מבודד.
3. נתקו מיילים אמיתיים בסביבות הבדיקה.
4. אמתו לפי סעיף 5 (כולל תגית הסביבה ב-CMS).

לאחר מכן: dev/test פועלים על נתונים מבודדים, ומבדקי חדירות/בדיקות לא נוגעים בפרודקשן — סגירת הממצא המרכזי מדו״ח אבטחת המידע.

---

## 8. שיתוף סביבת test + תהליך אישור ושחרור

**המצב:** כתובת הפרודקשן `mapi-customer-portal-poc.vercel.app` ציבורית; סביבות ה-Preview (test/dev) מוגנות ב-SSO — כלומר רק חברי צוות Vercel נכנסים. כדי לשתף את test עם גורמים חיצוניים (אלעד ומשתמשים) בלי חשבון Vercel, יש להפעיל "שער" חלופי.

### הכתובת היציבה של test
```
https://mapi-customer-porta-git-a0f7ea-hitprojectscenter-6566s-projects.vercel.app
```
(מצביעה תמיד על הגרסה האחרונה של ענף `test`; בניגוד לכתובות המשתנות לכל פריסה.)

### דרכי שיתוף

| דרך | מתאים ל־ | איך |
|---|---|---|
| **Password Protection** (מומלץ · Pro) | staging קבוע למספר בודקים | Settings → Deployment Protection → **Vercel Authentication: Disabled** → **Password Protection: Enable**, סיסמה, Scope: **Only Preview Deployments** → Save. שתף: הכתובת + הסיסמה |
| **Shareable Link** (כל תוכנית) | שיתוף גרסה ספציפית | Deployments → הפריסה של `test` → "..." / **Share** → Copy Link (קישור חדש בכל עדכון) |
| **חברי צוות** (הכי מאובטח) | זיהוי אישי | Settings → Members → הוסף מייל; הבודק נכנס ולוחץ Visit |

> ⚠️ **מ״ק:** סיסמה משותפת פחות מאובטחת מ-SSO; לגורמים רגישים עדיף חברי צוות או Trusted IPs. אימות: פתח את כתובת ה-test בגלישה בסתר — אמור לבקש סיסמה (לא מסך התחברות Vercel).

### תהליך אישור ושחרור (dev → test → prod)
1. פיתוח על `dev`.
2. מיזוג ל-`test` → כתובת ה-test מתעדכנת אוטומטית.
3. שיתוף לבודקים (קישור/סיסמה) → בדיקות והערות.
4. תיקונים על `dev` → מיזוג חוזר ל-`test` (חזרה ל-3).
5. **לאחר אישור** → מיזוג `test` → `main` → Vercel מפרסם לפרודקשן.

> **תנאי מקדים:** ודאו הפרדת מסדי נתונים (סעיף 3) לפני שיתוף — כדי שבדיקות ב-test לא ישנו נתוני פרודקשן.

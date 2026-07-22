# מדריך העלאה לפרודקשן — פורטל לקוחות מפ"י

> מסמך תפעולי (Runbook). מפריד בין מה שכבר **מיושם בקוד** לבין מה שנדרש
> **מהארגון** לפני עלייה לאוויר אמיתית תחת `mapi.gov.il`.

---

## 1. מה כבר מיושם בקוד (מוכן)

| תחום | מימוש | היכן |
|---|---|---|
| אימות CMS בצד שרת | SHA-256 מול env vars, עוגיית session חתומה HMAC, httpOnly + Secure + SameSite | `app/api/cms/*`, `lib/cmsServer.ts` |
| הגבלת ניסיונות התחברות | 5 ניסיונות / 15 דקות לכל IP | `lib/cmsServer.ts` |
| כותרות אבטחה | CSP, HSTS (שנתיים), X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy | `next.config.js` |
| הסתרת טכנולוגיה | `poweredByHeader: false` | `next.config.js` |
| SEO | `robots.txt` (חוסם /cms /admin /api), `sitemap.xml` דינמי, metadataBase | `app/robots.ts`, `app/sitemap.ts` |
| אנליטיקס | GA4 מותנה env — בלי מזהה לא נטען אף סקריפט צד-שלישי | `components/Analytics.tsx` |
| הצהרת נגישות | עמוד `/accessibility` לפי ת"י 5568 / תקנות תשע"ג-2013 | `app/accessibility/page.tsx` |
| Error Boundaries | error / global-error / not-found דו-לשוניים | `app/error.tsx` ועוד |
| ניטור שגיאות | ring buffer מקומי + עמוד `/admin/monitoring`; מוכן להחלפה ב-Sentry | `lib/monitoring.ts` |
| CI | typecheck + build + Playwright E2E (26 בדיקות, desktop+mobile) על main+staging | `.github/workflows/ci.yml` |
| התאמת מובייל/iOS | safe-area, dvh, מניעת זום באינפוטים, מטרות מגע 44px | `app/globals.css` |
| שש שפות + RTL | he/en/fr/es/ru/ar | `lib/i18n.ts` |

### משתני סביבה (להגדיר ב-Vercel → Settings → Environment Variables)

| משתנה | חובה? | הערה |
|---|---|---|
| `CMS_SESSION_SECRET` | **כן** | 32 בייט אקראיים. בלעדיו נשלף fallback לפיתוח (לא מאובטח) |
| `CMS_EMAIL_HASH` / `CMS_PASSWORD_HASH` | **כן** | SHA-256 hex. מאפשר רוטציית סיסמה בלי deploy קוד |
| `NEXT_PUBLIC_SITE_URL` | כן | הדומיין הקנוני (sitemap/OG) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | לא | ריק = אנליטיקס כבוי |
| `CMS_MANAGER_NAME` / `CMS_MANAGER_ROLE` | לא | ברירת מחדל: אלעד אסרף, ראש אגף שיווק ומכירות |

יצירת ערכים:

```bash
# hash לסיסמה/מייל
node -e "console.log(require('crypto').createHash('sha256').update('הערך').digest('hex'))"
# secret אקראי
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 2. פערים שנשארו POC בכוונה (דורשים החלטת ארגון)

| פער | מצב היום | פתרון פרודקשן | בעלים |
|---|---|---|---|
| נתוני תוכן (חדשות/קמפיינים/משתמשים) | localStorage בדפדפן של המנהל | Salesforce CMS / DB מנוהל (Postgres) + API | פיתוח + אגף שיווק |
| **לידים** | localStorage + **Google Sheets** (כשמוגדר — ראו "אינטגרציית Google Workspace") | Salesforce Lead object (אפיון 4.2) | אגף מכירות |
| סל קניות והזמנות | localStorage, ללא שרת | Salesforce Commerce / OMS | פיתוח |
| תשלום אמיתי | דמו בלבד, אין חיוב | שרת התשלומים הממשלתי (שירות התשלומים, האוצר) | גזברות + יה"ב |
| הזדהות לקוחות | טופס דמו | הזדהות לאומית (SAML/OIDC מול מערך ההזדהות הממשלתי) | יה"ב / רשות התקשוב |
| הרשאות CMS מרובות-משתמשים | משתמש יחיד + רשימת דמו | Salesforce SSO + פרופילים/Permission Sets | מנהל מערכת SF |
| GovMap | הטמעה ציבורית ללא token | SDK רשמי + API token ארגוני | מפ"י ↔ GovMap |
| ניטור | localStorage מקומי | Sentry / Datadog (החלפת גוף `capture()` אחת) | פיתוח |
| Rate limiting | בזיכרון per-instance | Vercel KV / Redis משותף | פיתוח |
| דומיין | vercel.app | `portal.mapi.gov.il` + אישור ממשל זמין | תקשוב מפ"י |
| אבטחת מידע רגולטורית | — | בדיקת חדירות (PT), אישור יה"ב 5.35, מינוי DPO, סקר סיכונים | קב"ט + יועמ"ש |
| רכז נגישות | פרטים כלליים בעמוד ההצהרה | עדכון שם/טלפון של הרכז בפועל | משאבי אנוש |
| אינטגרציית מרכבה | — | ממשק הזמנות/חיובים למרכבה | גזברות + יה"ב |

---

## 3. צ'קליסט עלייה לאוויר

1. [ ] להגדיר את כל משתני הסביבה ב-Vercel (סעיף 1)
2. [ ] לוודא שה-webhook GitHub↔Vercel מחובר (deploy אוטומטי על push ל-main)
3. [x] `npm audit`: 0 ממצאי critical (שודרג ל-next@14.2.35, יולי 2026). ראו "ממצאי audit שיוריים" למטה
4. [ ] `npm run build` + `npx playwright test` ירוקים
5. [ ] לעבור על `/accessibility` ולעדכן את פרטי רכז הנגישות האמיתיים
6. [ ] לחבר Sentry (או שו"ע) ולעדכן את `lib/monitoring.ts`
7. [ ] בדיקת עומסים בסיסית (k6/Artillery) על דפי הקטלוג
8. [ ] בדיקת חדירות + תיקון ממצאים
9. [ ] מיפוי דומיין ממשלתי + HSTS preload
10. [ ] גיבוי/DR: החלטה על מקור אמת לנתונים (סעיף 2 שורה 1)

### אינטגרציית Google Workspace (בסיס נתונים חי ללידים)

הפורטל יודע לעבוד מתוך סביבת Google Workspace של הארגון — שלושה רכיבים, כולם
מותנים במשתני סביבה (בלעדיהם: מצב דמו, localStorage בלבד):

| רכיב | מה הוא נותן | משתני סביבה |
|---|---|---|
| **Google Sheets = בסיס הנתונים** | כל ליד שנלכד בפורטל נכתב לגיליון `Leads` (כולל ניקוד AI וניתוב), וכל **הזמנה שהושלמה** נכתבת לגיליון `Orders` (שירות, מסלול, סה"כ, פרטי מסלול פרק-5, אספקה) — הפורטל מחליף את הפניות ה-govforms והנתונים נשמרים אצלנו | `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_KEY`, `GOOGLE_SHEETS_ID` |
| **Google Chat = התראות** | הודעה מיידית במרחב הצוות על כל ליד חדש (שם, משפחת מוצר, ניקוד, מטפל, קישור לגיליון) | `GOOGLE_CHAT_WEBHOOK_URL` |
| **Google Sign-In = כניסת CMS** | כפתור "כניסה עם Google" ב-`/cms/login`, מוגבל לרשימת חשבונות מורשים; מנפיק את אותה עוגיית session חתומה | `NEXT_PUBLIC_GOOGLE_CLIENT_ID`, `CMS_ALLOWED_GOOGLE_EMAILS` |

**צעדי הקמה (חד-פעמי, ~15 דקות):**

1. **Sheets**: ב-Google Cloud Console → IAM → Service Accounts → צרו חשבון שירות,
   הפעילו את Google Sheets API, צרו מפתח JSON. פתחו גיליון חדש ב-Drive הארגוני
   ו**שתפו אותו** (Editor) עם כתובת חשבון השירות. את ה-`client_email` וה-`private_key`
   מה-JSON הזינו ל-env (המפתח — כמו שהוא או ב-base64). לשונית `Leads` עם כותרות
   נוצרת אוטומטית בכתיבה הראשונה.
2. **Chat**: במרחב הצוות ב-Google Chat → ⚙ → Apps & integrations → Webhooks →
   Add webhook. העתיקו את ה-URL ל-`GOOGLE_CHAT_WEBHOOK_URL`.
3. **Sign-In**: Cloud Console → Credentials → OAuth client ID (Web application),
   Authorized JavaScript origins = כתובת הפורטל. את ה-Client ID הזינו ל-env.
4. הזינו הכל ב-Vercel (זכרו: דרך Git Bash `printf`, לא PowerShell pipe) ופרסו.

**שדרוג אימייל אוטומטי (ללא קוד):** בגיליון: Extensions → Apps Script → הדביקו
טריגר `onChange` ששולח Gmail לראש האגף על כל שורה חדשה — זה רץ בתוך Workspace,
בלי שום סוד נוסף בפורטל:

```javascript
function onNewLead(e) {
  const sh = e.source.getSheetByName("Leads");
  const row = sh.getRange(sh.getLastRow(), 1, 1, 16).getValues()[0];
  GmailApp.sendEmail("MapiComPortal@gmail.com",
    `ליד חדש: ${row[2]} ${row[3]} (${row[7]})`,
    `מקור: ${row[9]} | ניקוד: ${row[10]} | מטפל: ${row[12]}\n` +
    SpreadsheetApp.getActiveSpreadsheet().getUrl());
}
// Triggers → Add Trigger → onNewLead → From spreadsheet → On change
```

### ממצאי audit שיוריים (מוערכים — לא חוסמים)

לאחר העדכון ל-`next@14.2.35` נותרו ממצאים שתיקונם המלא דורש שדרוג-שובר ל-Next 16:

| ממצא | הערכה |
|---|---|
| Next Image Optimizer DoS (GHSA-9g9p) | רלוונטי ל-self-hosted בלבד; אצלנו האופטימיזציה רצה בתשתית Vercel, ו-remotePatterns מוגבל לשני דומיינים ספציפיים |
| postcss < 8.5.10 (פנימי של Next) | רץ בזמן build על CSS שלנו בלבד — אין קלט לא-מהימן |
| glob CLI injection | תלות dev טרנזיטיבית; החולשה ב-CLI עם `-c`, שאיננו מפעילים |

**החלטה נדרשת מהארגון:** תכנון שדרוג ל-Next 15/16 (שינויים שוברים ב-App Router) כפרויקט נפרד.

---

## 4. פקודות תפעול שוטף

```bash
npm run dev          # פיתוח מקומי
npm run build        # בילד פרודקשן (כולל הקצאת זיכרון מוגדלת)
npx playwright test  # E2E מלא (עם CMS_E2E_EMAIL/PASSWORD גם מסע ה-CMS)
vercel deploy --prod --yes   # פריסה ידנית אם ה-webhook לא זמין
```

---

*נוצר כחלק מהקשחת הפרודקשן, יולי 2026.*

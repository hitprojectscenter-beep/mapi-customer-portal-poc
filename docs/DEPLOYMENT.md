# תהליך פריסה — פורטל לקוחות מפ"י

## סביבות

| סביבה | ענף Git | כתובת | מטרה |
|-------|---------|--------|------|
| **Production** | `main` | https://mapi-customer-portal-poc.vercel.app | משתמשי קצה |
| **Staging** | `staging` | כתובת Preview ייחודית לכל פריסה (מודפסת בסיום הפקודה) | בדיקות קבלה לפני עלייה לייצור |
| **Preview** | כל ענף אחר / PR | כתובת ייחודית אוטומטית | בדיקת פיצ'ר בודד |

## זרימת עבודה מומלצת

```
פיתוח פיצ'ר ──► push ל-staging ──► בדיקת קבלה בכתובת ה-Preview ──► merge ל-main ──► Production
```

1. **פיתוח** — עובדים מקומית (`npm run dev`), בודקים ב-http://localhost:3000
2. **Staging** — דוחפים ל-`staging`:
   ```bash
   git checkout staging
   git merge main            # או cherry-pick של הפיצ'ר
   git push origin staging
   vercel deploy --yes       # פריסת Preview — הכתובת מודפסת בסיום
   ```
3. **בדיקת קבלה** — עוברים על הצ'ק-ליסט (למטה) בכתובת ה-Staging
4. **Production** — רק אחרי אישור:
   ```bash
   git checkout main
   git merge staging
   git push origin main      # ה-webhook מפעיל פריסה אוטומטית
   ```

## שכבות ההגנה מפני תקלות

| שכבה | מנגנון | מיקום |
|------|--------|-------|
| 1 | Type-check + Build בכל push (חובה ירוק) | GitHub Actions — `.github/workflows/ci.yml` |
| 2 | בדיקות E2E (Playwright) על build ייצור | אותו workflow, job `e2e` |
| 3 | Error Boundaries — דף התאוששות במקום מסך לבן | `app/error.tsx`, `app/global-error.tsx` |
| 4 | ניטור שגיאות בדפדפני המשתמשים | `lib/monitoring.ts` + `/admin/monitoring` |
| 5 | זיכרון build מוגדל (4GB) — מונע כשל שקט | `vercel.json` + `package.json` |

## הרצת הבדיקות מקומית

```bash
npm run build                      # build ייצור (חובה לפני E2E)
npx playwright test                # כל הבדיקות (desktop + mobile)
npx playwright test --project=desktop   # רק desktop
npx playwright show-report         # דוח אינטראקטיבי אחרי ריצה
```

## תקלות ידועות ופתרונן

- **Build נכשל על זיכרון** — ודאו ש-`NODE_OPTIONS=--max-old-space-size=4096` קיים (כבר מוגדר ב-`package.json` וב-`vercel.json`)
- **ה-webhook לא מפעיל פריסה** — `vercel git connect <repo-url>` מחבר מחדש; פריסה ידנית: `vercel deploy --prod --yes`
- **הפריסה "נתקעת" על גרסה ישנה** — בדקו `curl -sI <url>` ; `Age` גבוה = CDN מגיש deploy ישן כי ה-build האחרון נכשל. בדקו לוגים: `vercel inspect <deployment-url> --logs`

## שדרוג הניטור לייצור (Sentry)

נקודות החיבור מוכנות ב-`lib/monitoring.ts` (מסומנות בהערה `Production hook`).
לאחר פתיחת חשבון Sentry:

```bash
npx @sentry/wizard@latest -i nextjs   # אשף התקנה רשמי
```

ולהוסיף `SENTRY_DSN` ב-Vercel → Settings → Environment Variables.

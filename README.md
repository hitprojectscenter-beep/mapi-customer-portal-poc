# MAPI Customer Portal - POC

פורטל לקוחות של המרכז למיפוי ישראל (מפ"י) - Proof of Concept.

POC לפי אפיון פרק 12 - פורטל לקוחות מבוסס Salesforce Experience Cloud.

## טכנולוגיות

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** - עם Design System מבוסס עיצוב Stitch
- **Material Symbols Outlined** - אייקונים
- **Public Sans + Heebo** - פונטים
- **תמיכה מלאה ב-RTL** ועברית

## דפים שמומשו

| נתיב | תיאור |
|------|------|
| `/` | דף הבית - Hero, שירותים פופולריים, סטטיסטיקות, קטגוריות |
| `/catalog` | קטלוג שירותים מלא + סינון |
| `/catalog/[slug]` | דף שירות בודד - מחירון, FAQ, CTA |
| `/order/[slug]` | טופס הזמנה רב-שלבי (OmniScript) - 4 שלבים |
| `/dashboard` | אזור אישי - KPIs, הזמנות אחרונות, התראות |
| `/orders` | היסטוריית הזמנות + סינון |
| `/cases/new` | פתיחת פנייה לשירות |
| `/login` | הזדהות לאומית / SSO / מודד מוסמך |
| `/help` | מרכז עזרה ו-FAQ |

## פיתוח מקומי

```bash
npm install
npm run dev
```

הפורטל יופעל ב-`http://localhost:3000`.

## בניית production

```bash
npm run build
npm start
```

## פריסה

הפרויקט מוכן לפריסה אוטומטית ל-**Vercel**.

```bash
vercel deploy
```

## מבנה התיקיות

```
app/
├── layout.tsx          # Layout כללי - RTL, פונטים, Header, Footer
├── page.tsx            # דף הבית
├── globals.css         # סגנונות גלובליים
├── catalog/
│   ├── page.tsx        # קטלוג מלא
│   └── [slug]/page.tsx # דף שירות בודד
├── dashboard/          # אזור אישי
├── order/[slug]/       # טופס הזמנה רב-שלבי
├── orders/             # היסטוריית הזמנות
├── cases/new/          # פתיחת פנייה
├── login/              # התחברות
└── help/               # מרכז עזרה
components/
├── Header.tsx          # ניווט עליון + לוגו
├── Footer.tsx          # פוטר
├── AISupportButton.tsx # כפתור צ'אט תמיכה צף
└── ServiceCard.tsx     # כרטיס שירות
lib/
└── data.ts             # מוק דאטה (14 שירותים, הזמנות, התראות)
```

## Design System

מבוסס על העיצוב מ-Stitch + הנחיות פרק 12.

**צבעים עיקריים:**
- Primary: `#001d35` (כחול עמוק)
- Secondary: `#0b61a1` (כחול בינוני)
- Secondary Container: `#7cbaff` (כחול בהיר)
- Positive: `#548235` (ירוק חיובי)
- Alert: `#bf8f00` (צהוב התראה)
- Error: `#c00000` (אדום שגיאה)

**טיפוגרפיה:** Public Sans (לועזי) + Heebo (עברית)

## נגישות

- ✓ RTL מובנה
- ✓ Skip to main content
- ✓ ARIA labels בכל הרכיבים הדינמיים
- ✓ Focus visible מובהק
- ✓ Semantic HTML (header, main, nav, article, aside)
- ✓ קונטרסט WCAG 2.1 AA

## הערות POC

- 14 שירותים: 4 בתכולת הפורטל (פעילים), 10 מקושרים ל-govforms
- מערכת הזדהות מדומה (Mock) - לחיצה מובילה לדשבורד
- GovMap מוצג כסכמטי - בייצור יוטמע iframe + JS API
- ChatBot LWC עם UI מלא - חיבור ל-Salesforce Einstein בעתיד
- BRE (חישוב מחיר) ממומש מקומית - בייצור דרך PSS

## אפיון מקור

מבוסס על מסמך אפיון פרק 12 של פרויקט הטמעת Salesforce במפ"י,
כולל דיאגרמות זרימה, wireframes, ודרישות אבטחה.

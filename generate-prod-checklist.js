/**
 * צ'קליסט מעבר לפרודקשן מלא — פורטל שיווק ומכירות מפ"י
 * Generated from: אפיון HLD V8 (open items, licensing, integrations, security
 * gates, migration, environments) + PRODUCTION.md (POC hardening state).
 * RTL Hebrew with LTR runs for Latin tokens (bidi lesson from the SF guide).
 */
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageNumber, PageBreak
} = require("docx");

const FONT = "Arial";
const PRIMARY = "1F4E79";
const SECONDARY = "0B61A1";
const GREEN = "548235";
const RED = "C00000";
const LIGHT_BG = "DEEBF7";
const GREY_BG = "F2F2F2";

const border = { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" };
const allBorders = { top: border, bottom: border, left: border, right: border };

// --- bidi: split mixed Hebrew/Latin text into direction-correct runs --------
function isLatinWord(w) {
  return /[A-Za-z]/.test(w) && !/[֐-׿]/.test(w);
}
function bidiRuns(text, opts = {}) {
  const words = String(text).split(" ");
  const runs = [];
  let buf = [];
  let bufLatin = null;
  const flush = () => {
    if (!buf.length) return;
    runs.push(new TextRun({
      text: buf.join(" ") + " ",
      font: FONT,
      size: opts.size || 22,
      bold: opts.bold || false,
      color: opts.color || "1A1A1A",
      rightToLeft: !bufLatin
    }));
    buf = [];
  };
  for (const w of words) {
    const latin = isLatinWord(w);
    if (bufLatin === null) bufLatin = latin;
    if (latin !== bufLatin) { flush(); bufLatin = latin; }
    buf.push(w);
  }
  flush();
  return runs;
}

function rtlPara(text, opts = {}) {
  return new Paragraph({
    bidirectional: true,
    alignment: opts.alignment || AlignmentType.RIGHT,
    spacing: { after: 120, ...(opts.spacing || {}) },
    children: bidiRuns(text, opts)
  });
}

function heading(text, level) {
  const map = { 1: HeadingLevel.HEADING_1, 2: HeadingLevel.HEADING_2, 3: HeadingLevel.HEADING_3 };
  return new Paragraph({
    heading: map[level],
    bidirectional: true,
    alignment: AlignmentType.RIGHT,
    children: bidiRuns(text, { size: level === 1 ? 32 : 26, bold: true, color: level === 1 ? PRIMARY : SECONDARY })
  });
}

function cell(text, opts = {}) {
  return new TableCell({
    borders: allBorders,
    width: { size: opts.width, type: WidthType.DXA },
    shading: opts.shading ? { fill: opts.shading, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      bidirectional: true,
      alignment: opts.center ? AlignmentType.CENTER : AlignmentType.RIGHT,
      children: bidiRuns(text, { size: opts.size || 20, bold: opts.bold || false, color: opts.color || "1A1A1A" })
    })]
  });
}

// Checklist table: [☐ | פעולה | בעלים | מקור]
const W = { box: 560, action: 5100, owner: 1700, source: 2000 }; // = 9360
function checklistTable(items) {
  return new Table({
    visuallyRightToLeft: true,
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [W.box, W.action, W.owner, W.source],
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          cell("☐", { width: W.box, shading: LIGHT_BG, bold: true, center: true }),
          cell("הפעולה הנדרשת", { width: W.action, shading: LIGHT_BG, bold: true, color: PRIMARY }),
          cell("בעלים", { width: W.owner, shading: LIGHT_BG, bold: true, color: PRIMARY, center: true }),
          cell("מקור", { width: W.source, shading: LIGHT_BG, bold: true, color: PRIMARY, center: true })
        ]
      }),
      ...items.map(([action, owner, source, done]) =>
        new TableRow({
          children: [
            cell(done ? "✓" : "☐", { width: W.box, center: true, bold: true, color: done ? GREEN : "1A1A1A", size: 24 }),
            cell(action, { width: W.action, shading: done ? "EAF3EA" : undefined }),
            cell(owner, { width: W.owner, center: true, size: 18 }),
            cell(source, { width: W.source, center: true, size: 18, color: "666666" })
          ]
        })
      )
    ]
  });
}

function noteBox(text, color = LIGHT_BG) {
  return new Table({
    visuallyRightToLeft: true,
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: allBorders,
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: color, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        children: [new Paragraph({
          bidirectional: true,
          alignment: AlignmentType.RIGHT,
          children: bidiRuns(text, { size: 20 })
        })]
      })]
    })]
  });
}

const spacer = () => new Paragraph({ spacing: { after: 120 }, children: [] });

// ============================================================================
// Content
// ============================================================================

const children = [
  new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 120 },
    children: bidiRuns("צ'קליסט מעבר לפרודקשן מלא", { size: 48, bold: true, color: PRIMARY })
  }),
  new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
    children: bidiRuns("מערכת שיווק ומכירות מפ\"י — Salesforce + פורטל לקוחות", { size: 28, color: SECONDARY })
  }),
  rtlPara("מסמך זה מרכז את כל הפעולות שבאחריות מפ\"י (ולא באחריות ספק הפיתוח) כדי להפוך את המערכת לפרודקשן מלא. המסמך מבוסס על אפיון HLD גרסה V8 (המאוחד), על מצב ה-POC הקיים (הפורטל ב-Vercel), ועל מסמך PRODUCTION.md שבריפו.", { size: 22 }),
  rtlPara("מקרא: ☐ = פעולה לביצוע · ✓ = בוצע כבר ב-POC · עמודת \"מקור\" מפנה לפרק באפיון V8 או למסמך אחר.", { size: 20, color: "666666" }),
  spacer(),
  noteBox("💡 עיקרון מנחה: ה-POC הנוכחי הוא הדגמה (Frontend בלבד, נתונים ב-localStorage). הפרודקשן האמיתי הוא מערכת Salesforce (PSS) לפי האפיון — ולכן רוב הסעיפים כאן הם החלטות ארגוניות, רכש, אינטגרציות ואבטחה, לא קוד."),

  // ------------------------------------------------------------------
  heading("חלק 1 — הפעלת הפורטל הקיים (POC) כאתר חי", 1),
  rtlPara("הקשחת הפרודקשן של ה-POC בוצעה (auth בצד שרת, כותרות אבטחה, SEO, נגישות). נותרו פעולות שרק הארגון יכול לבצע:", { size: 22 }),
  checklistTable([
    ["הגדרת משתני סביבה ב-Vercel: סוד session, גיבוב מייל/סיסמה של מנהל התוכן, כתובת קנונית", "בוצע", "PRODUCTION.md", true],
    ["חיבור Sentry (או כלי ניטור ארגוני) — החלפת גוף capture() בקובץ lib/monitoring.ts והגדרת DSN", "פיתוח", "PRODUCTION.md"],
    ["פתיחת נכס GA4 והזנת NEXT_PUBLIC_GA_MEASUREMENT_ID (בלי זה — אין אנליטיקס, בכוונה)", "אגף שיווק", "אפיון 13.23"],
    ["חיבור מחדש של webhook בין GitHub ל-Vercel (כיום הפריסה ידנית דרך CLI)", "מפ\"י / פיתוח", "תפעול"],
    ["עדכון שם וטלפון של רכז הנגישות האמיתי בעמוד /accessibility", "משאבי אנוש", "חובה חוקית"],
    ["מיפוי דומיין ממשלתי portal.mapi.gov.il + אישור ממשל זמין + HSTS preload", "תקשוב מפ\"י", "אפיון 13.2"],
    ["החלטה על שדרוג Next.js 16 (סוגר 3 ממצאי audit שיוריים; שינוי שובר — פרויקט נפרד)", "פיתוח", "PRODUCTION.md"]
  ]),
  spacer(),

  // ------------------------------------------------------------------
  heading("חלק 2 — החלטות אפיון פתוחות (חוסמות פיתוח)", 1),
  rtlPara("סעיפים שהאפיון V8 השאיר ריקים או מסומנים \"להשלמה\". בלי סגירתם ספק הפיתוח לא יכול לממש:", { size: 22 }),
  checklistTable([
    ["הגדרת רשימת ערכי סטטוס מלאה לליד — בטבלת האפיון מולא רק \"חדש\"", "אנליסט (מיכאל)", "אפיון 4.2"],
    ["הגדרת שדות ולוגיקת תעדוף לידים + משקולות Scoring (סוג שירות, היקף, מקור)", "אלעד + אנליסט", "אפיון 4.2, 8.1"],
    ["קביעת חלון זמן ושדות חובה ליצירת ליד מנטישת טופס (סשן OmniScript)", "אנליסט", "אפיון 4.2"],
    ["בניית טבלת מיפוי משפחת מוצרים ← Sales Process ו-Record Type (RA+RAT) ווידוא בידול מהתשתית הקיימת באורג", "ארכיטקט (אופיר בר)", "אפיון 4.2"],
    ["השלמת טבלת SLA לכל 15 המסלולים — רוב השורות ריקות + הגדרת \"מה מודדים\" ושדות עזר", "אלעד", "אפיון 4.3.4"],
    ["מילוי סעיפים ריקים: סטטוסי הזדמנות (4.3.2) וניהול אי-הצלחה בהזמנות (4.3.3)", "אנליסט", "אפיון 4.3"],
    ["השלמת ~25 תבניות מייל/SMS במסלול CORS המסומנות \"להשלמה\" (נמענים, נושא, גוף)", "אלעד + חשבות", "אפיון 5.1"],
    ["מסלול גבולות בינלאומיים: אספקת תבניות מייל, תבנית PDF תשובה וטופס רישיון שימוש", "אלעד", "אפיון 5.3"],
    ["הגדרת ערכי \"מטרת השימוש\" לרישיון מסחרי באורתופוטו + לוגיקה עסקית לכל ערך", "חטיבה מקצועית", "אפיון 5.5"],
    ["הכרעה ארכיטקטונית: שימוש באובייקט Order או סגירת התהליך על Opportunity", "ארכיטקט", "אפיון 3.4"],
    ["השלמת מחירים חסרים: WS ללקוח עסקי (מחירי השקה), מפות מודרניות/היסטוריות, גבולות בינלאומיים", "אלעד", "אפיון 4.6.2"],
    ["וידוא שתעריף VRS ‏(0.7 ₪ לדקה) מוגדר כפרמטר הניתן לשינוי ללא פיתוח", "ספק", "אפיון 5.1"],
    ["יישור פרקים 6-9 לגרסה 8: הסרת שאריות V7 (שדות אישורי הצעה, הצמדת מדד, Auto-Quote)", "אנליסט", "אפיון 6-9"],
    ["השבת פרקים חסרים בגוף V8: פרק 21 (תוכנית עבודה) ופרק 23 (שאלות פתוחות) + רענון תוכן עניינים", "אנליסט (מיכאל)", "מבנה המסמך"]
  ]),
  spacer(),

  // ------------------------------------------------------------------
  heading("חלק 3 — רכש ורישוי Salesforce", 1),
  checklistTable([
    ["רישיונות PSS Foundation (Public Sector Advanced) ל-10-15 משתמשים פנימיים", "רכש", "אפיון 3.2"],
    ["רישיונות Customer Community for PSS לפורטל (~5,000 לקוחות פרטיים, ~258 רשויות, ~100 ממשלה)", "רכש", "אפיון 1.4, 3.2"],
    ["רכישת Shield (הצפנה + Field Audit Trail + Event Monitoring) — דרישת יה\"ב 5.35 לכלל הארגון", "רכש + קב\"ט", "אפיון 3.2"],
    ["רכישת Data Mask להסוואת נתונים בסביבות הפיתוח והבדיקה", "רכש", "אפיון 3.2"],
    ["רישיון Sales בודד עבור Einstein Activity Capture (סנכרון מיילים ויומן)", "רכש", "אפיון 3.2"],
    ["החלטות רכש אופציונליות: Digital Engagement (WhatsApp), Own (גיבוי), Comsign/Docusign (חתימה), Assessments", "הנהלה", "אפיון 3.2"],
    ["רכש OPSWAT לחיטוי קבצים עולים", "קב\"ט", "אפיון 3.2"],
    ["אספקת 5 רישיונות סביבות פיתוח/בדיקה/ייצור לפי תנאי המכרז", "מפ\"י", "אפיון פרק 20"],
    ["הסדרת שירות SMS מול שמיר מערכות (תשתית קיימת)", "תפעול", "אפיון 3.2"]
  ]),
  spacer(),

  // ------------------------------------------------------------------
  heading("חלק 4 — אינטגרציות ארגוניות", 1),
  rtlPara("כל הממשקים ייבנו כ-REST API דרך External Client App עם OAuth 2.0 (אפיון פרק 10). הפעולות שבאחריות מפ\"י:", { size: 22 }),
  checklistTable([
    ["שרת התשלומים הממשלתי: פתיחת חיבור, הגדרת Webhook לעדכון סטטוס, קבלת קבצי קבלה PDF", "יה\"ב + גזברות", "אפיון 10.1"],
    ["מרכבה: בחירת פרוטוקול (REST / SOAP / Web Service) ומילוי טבלת הממשק הריקה (טריגרים, תזמון, נתונים חוזרים)", "גזברות + יה\"ב", "אפיון 10.4"],
    ["GO++ (שרת CORS): בירור קיום ממשק ישיר מול Salesforce — לא ידוע כיום! + פתרון לתלות בייצוא Excel ידני חודשי (סומן סיכון גבוה)", "צוות GO++", "אפיון 10.6"],
    ["GO++: יישוב פער מודל הנתונים (לקוח GO++ = מספר תתי-לקוחות) + העשרת כל החשבונות הקיימים במזהי GO++ כחלק מהעלייה לאוויר", "צוות GO++ + אלעד", "אפיון 10.6"],
    ["הזדהות לאומית: החלטה אם חובה כבר בשלב א' (ייתכן שכן לפי הנחיות יה\"ב) + תיאום מול רשות התקשוב", "תקשוב מפ\"י", "אפיון 10.2"],
    ["GovMap: איסוף דרישות מפורטות + אפיון משותף לממשק יצירת מפות (לא בשלב א')", "אלעד", "אפיון 10.3"],
    ["טופוקד: ממשק מסלול מודד מבקר (מספר טופס ביקורת) + ממשק CMS לחישוב חלקות לפי אליפסה", "חטיבת קדסטר", "אפיון 5.8"],
    ["השלמת אפיון ממשק EAC וטבלת Error Handling לממשקים (סעיפים ריקים)", "אנליסט", "אפיון 10.8-10.9"]
  ]),
  spacer(),

  // ------------------------------------------------------------------
  heading("חלק 5 — אבטחה ורגולציה (שערי עלייה לאוויר)", 1),
  noteBox("⚠️ שימו לב: לפי פרק 22 באפיון, אישורי ועדת ענן ויה\"ב הם באחריות הלקוח בלבד — עיכוב בהם אינו נזקף לספק ואינו עוצר את לוח הזמנים החוזי.", "FDEBD0"),
  spacer(),
  checklistTable([
    ["קבלת אישור ועדת ענן לפרויקט", "מפ\"י (בלעדית)", "אפיון פרק 22"],
    ["עמידה בהנחיות יה\"ב 5.35: Shield מופעל, MFA לכל המשתמשים הפנימיים, רשימת IP מותרים לאדמינים", "קב\"ט + אדמין", "אפיון פרק 19"],
    ["Code Review לקוד Apex לפני עלייה", "ספק", "אפיון 19.2"],
    ["ביצוע בדיקת חדירות (PT) + תיקון כל הממצאים", "קב\"ט", "אפיון 19.2"],
    ["הגדרת Integration User ייעודי + Named Credentials לכל ממשק", "אדמין", "אפיון פרק 19"],
    ["בדיקות Sanity ב-PROD מיד אחרי העלייה + בדיקות אבטחה רבעוניות בשנת האחריות", "ספק + מפ\"י", "אפיון 19.2"],
    ["מינוי ממונה הגנת פרטיות (DPO) ועדכון מסמכי מדיניות פרטיות", "הנהלה + יועמ\"ש", "חובה חוקית"]
  ]),
  spacer(),

  // ------------------------------------------------------------------
  heading("חלק 6 — נתונים והסבה (Data Migration)", 1),
  checklistTable([
    ["הכרעת היקף: 3 שנות הזמנות אחורה (בגוף האפיון מופיע גם \"4 שנים\" — לסגור סתירה)", "אלעד", "אפיון פרק 18"],
    ["טיוב והעשרת הנתונים — באחריות אלעד אסרף; מסירה לספק מוכנה לטעינה בתבניות שסוכמו", "אלעד", "אפיון פרק 22"],
    ["אישור תבניות מיפוי שדות + שדה מקור (provenance) לכל רשומה מוסבת", "אלעד + ספק", "אפיון פרק 18"],
    ["פיילוט הסבה על 10-20 לקוחות + תוכנית rollback לפני הסבה מלאה", "ספק", "אפיון פרק 18"],
    ["תכנון לפי מגבלת עד 2 סבבי טעינה לכל חבילת עבודה", "אלעד + ספק", "אפיון פרק 18"],
    ["ביצוע בדיקות קבלה לנתונים המוסבים (באחריות הלקוח)", "מפ\"י", "אפיון פרק 18"]
  ]),
  spacer(),

  // ------------------------------------------------------------------
  heading("חלק 7 — סביבות, חבילות עבודה ושלבי עלייה לאוויר", 1),
  heading("7.1 צנרת הסביבות (פרק 20)", 2),
  rtlPara("DEV1-DEV3 (פיתוח מקבילי) ← TEST (בדיקות מסירה של הספק, Partial Copy) ← PREPROD (בדיקות קבלה/UAT של מפ\"י, Full Copy מרוענן מ-PROD) ← PROD. סביבת DRO לשרידות — אופציונלית. שימו לב: CI/CD אינו כלול בהצעת הספק — נדרשת החלטה אם לרכוש כלי DevOps.", { size: 22 }),
  heading("7.2 חבילות עבודה (3.7)", 2),
  checklistTable([
    ["WP1 — ניהול תהליכי מכירה: תשתית, לידים, הזדמנויות, מחירון, הצעות מחיר. CORS הוא המסלול הראשון שיפותח. פיילוט: ~10 משתמשי אגף המכירות", "מפ\"י + ספק", "אפיון 3.7"],
    ["WP2 — טפסים דיגיטליים: תשתית טפסים, משימות, התראות (מסלולי שלב ב')", "מפ\"י + ספק", "אפיון 3.7"],
    ["WP3 — פורטלים ותוספות: פורטל לקוחות, הזדהות לאומית, ערוצי תקשורת, דוחות ודשבורדים", "מפ\"י + ספק", "אפיון 3.7"],
    ["WP4 — ממשקים (רוחבי): הזדהות לאומית, שרת תשלומים, מרכבה, GovMap", "מפ\"י + ספק", "אפיון 3.7"]
  ]),
  spacer(),
  heading("7.3 שלבי עלייה (3.8 + נספח א')", 2),
  rtlPara("שלב א' (קריטי): מודד מבקר, CORS + תשלום, מפות נייר, מפות היסטוריות, גבולות בינלאומיים.", { size: 22 }),
  rtlPara("שלב ב': מפה בהתאמה אישית, אורתופוטו ומודלי גבהים, שכבות GIS, תצ\"א, תע\"צ חשמל.", { size: 22 }),
  rtlPara("שלב ג' (ייתכן מימוש חלקי או קישור חיצוני בלבד): הארכת תצ\"ר, קדסטר ירושלים, שירותי רקע WS, גזטיר, מערכת תשלום ללקוחות קבועים.", { size: 22 }),
  noteBox("כלל הרציפות (אפיון 3.8): מסלול שטרם עלה ל-Salesforce ייחשף בפורטל כקישור לטופס הממשלתי הקיים — כדי לשמור על חוויית לקוח אחידה. כך בדיוק מממש ה-POC הנוכחי את המסלולים שמחוץ לתחולה."),
  spacer(),

  // ------------------------------------------------------------------
  heading("חלק 8 — ממשל פרויקט", 1),
  checklistTable([
    ["חתימה על מסמך התכולות — המסמך המחייב היחיד (גובר גם על הבריף); כל תוספת = CR בעלות ובזמן", "מפ\"י + ספק", "אפיון פרק 22"],
    ["אישור מנדט מנהל פרויקט יחיד מטעם הלקוח עם סמכות הכרעה (מארק ישראל) מול ארכיטקט הספק (אופיר בר)", "הנהלה", "אפיון פרק 22"],
    ["ניהול מרשם סיכונים חי — הסיכונים הגבוהים באפיון: ממשקים חיצוניים (תשלומים/מרכבה/הזדהות/GovMap) ותאימות אבטחה", "PM", "אפיון פרק 22"]
  ]),
  spacer(),

  // ------------------------------------------------------------------
  heading("נספח — מה ה-POC כבר מדגים היום", 1),
  rtlPara("להשלמת התמונה, היכולות שכבר חיות בפורטל ההדגמה (וישמשו כמפרט חי לספק): קטלוג 6 שפות עם RTL, עגלה והצעות מחיר, מסלולי מנוי וחבילות אזוריות, API Hub, מפת GovMap עם רקעים ושכבות, ממשק ניהול תוכן מאובטח (cookie חתום בצד שרת), ניהול לידים AI לפי פרק 4.2 (ניקוד, ניתוב, SLA, המרה אוטומטית, עיבוד מייל נכנס RPA+AI, לכידת נטישת טפסים), Pipeline לפי 11 השלבים, מדיניות התמחור וההנחות של V8, דשבורד 14.5, הצהרת נגישות, ותשתית CI עם 32 בדיקות E2E אוטומטיות.", { size: 22 }),
  spacer(),
  rtlPara("נוצר אוטומטית מתוך אפיון HLD V8 ומצב הריפו — יולי 2026.", { size: 18, color: "888888", alignment: AlignmentType.CENTER })
];

const doc = new Document({
  creator: "MAPI Portal POC",
  title: "צ'קליסט מעבר לפרודקשן מלא — מערכת שיווק ומכירות מפ\"י",
  description: "פעולות באחריות הארגון להפיכת המערכת לפרודקשן מלא, לפי אפיון HLD V8",
  styles: {
    default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: FONT, color: PRIMARY },
        paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: FONT, color: SECONDARY },
        paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 23, bold: true, font: FONT, color: SECONDARY },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 2 } }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      },
      bidi: true
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          bidirectional: true,
          alignment: AlignmentType.CENTER,
          children: bidiRuns("מפ\"י — צ'קליסט מעבר לפרודקשן מלא", { size: 18, color: "888888" })
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "עמוד ", font: FONT, size: 18, color: "888888", rightToLeft: true }),
            new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 18, color: "888888" })
          ]
        })]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const out = "צ'קליסט מעבר לפרודקשן מלא - מערכת שיווק ומכירות מפי.docx";
  fs.writeFileSync(out, buffer);
  console.log("WRITTEN:", out, buffer.length, "bytes");
});

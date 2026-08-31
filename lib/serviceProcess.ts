// Faithful reflection of the real GovForms processes for specific services,
// per the official form specifications (Boundaries@mapi.gov.il V2,
// Maps@mapi.gov.il V7). Rendered on the product page as "שלבי התהליך והמידע".
// Code-driven (not in the DB) so it deploys through dev→test→prod without a
// data migration; ordering itself still goes to the official form ("מעבר להזמנה").
//
// Every condition below is grounded in the uploaded spec sheets — service
// types, place/selection methods, customer types, language matrix, lamination
// tiers, distributor pricing, coordinate validation ranges, delivery options,
// fees, deliverable formats, handling time and the notification flow. Nothing
// here is invented beyond what the forms define.

export interface ProcessStep { title: string; detail?: string; }
export interface OptionGroup { label: string; items: string[]; }
export interface PriceRow { label: string; amount: string; }
export interface ProcessLink { label: string; url: string; }

export interface ServiceProcess {
  formName: string;            // official GovForms form name + id
  intro: string;
  audience: string;            // customer types the form serves
  steps: ProcessStep[];        // the multi-step flow
  options?: OptionGroup[];     // choice sets the form offers
  pricing?: PriceRow[];        // fee schedule
  delivery?: string[];         // pickup / shipping options
  links?: ProcessLink[];       // official reference links (sheet indexes, govmap)
  rules?: string[];            // calculation / validation business rules
  notifications?: string[];    // the e-mail / status flow
  formats?: string;            // deliverable file formats
  deliveryDays: string;
}

const BOUNDARIES: ServiceProcess = {
  formName: 'פנייה לקבלת מידע מאגף גבולות בינלאומיים · Boundaries@mapi.gov.il',
  intro: 'פנייה לקבלת מידע מאגף הגבולות הבינלאומיים של מפ"י — בדיקת מיקום נקודה, מבנה, גוש/חלקה או תוצר מדידה ביחס לקו גבול בינלאומי או קו תחום אזור יהודה ושומרון. תהליך דו-שלבי בין הפונה למשרד.',
  audience: 'לקוח פרטי או לקוח עסקי.',
  steps: [
    { title: 'הגשת הפנייה', detail: 'בחירת סוג השירות (בדיקה מרחבית / בדיקת מדידה / אחר), ציון המקום (קובץ GIS / גוש וחלקה / גוש שומה / קואורדינטות ברשת ישראל התקפה), פירוט הפנייה וצירוף הקבצים הרלוונטיים.' },
    { title: 'בדיקת המשרד', detail: 'אגף הגבולות בודק את הפנייה ומחליט: אושר / נדחה / הוחזר לתיקון. בהחזרה לתיקון כל שדות הפנייה נפתחים להשלמה על ידי הפונה.' },
    { title: 'רישיון שימוש לחתימה', detail: 'אם אושר ונדרש רישיון — נשלח רישיון שימוש מותאם לחתימת הפונה, אותו יש להדפיס, לחתום ולצרף חזרה בטופס.' },
    { title: 'הצעת מחיר', detail: 'המשרד שולח הצעת מחיר לתשלום האגרה בהתאם לבקשה (טבלת אגרות מתוך קטלוג הגבולות).' },
    { title: 'תשלום', detail: 'תשלום מקוון מאובטח של האגרה דרך שרת התשלומים הממשלתי; מתקבל מספר אישור תשלום.' },
    { title: 'מסירת המידע', detail: 'לאחר התשלום נשלח קישור למידע המבוקש / חוות דעת / צרופה לכתובת הדוא"ל שהוזנה בבקשה.' }
  ],
  options: [
    { label: 'סוגי השירות', items: [
      'בדיקה מרחבית — מיקום נקודת ציון / מבנה / גוש וחלקה ביחס לקו גבול בינלאומי או קו תחום איו"ש',
      'בדיקת מדידה — תצ"ר / תת"ג / תוצר מדידה אחר ביחס לקו הגבול',
      'אחר'
    ] },
    { label: 'אופן ציון המקום', items: [
      'קובץ GIS (ממ"ג)', 'ציון גוש וחלקה', 'ציון גוש שומה', 'ציון קואורדינטות (רשת ישראל התקפה)'
    ] },
    { label: 'קבצים לצירוף', items: [
      'שכבת GIS: SHP · DWG · TIFF · KML · KMZ · ZIP · RAR', 'מפת מדידה: PDF · JPEG · PNG · TIFF · SHP'
    ] }
  ],
  rules: [
    'ציון קואורדינטות ברשת ישראל התקפה בלבד — Y בטווח 350,000–810,000, X בטווח 115,000–3,000,000.',
    'מספר זהות: 9 ספרות (כולל ספרת ביקורת); מספר ח.פ: 9 ספרות.',
    'בבחירת "בדיקת מדידה" — צירוף מפת מדידה הוא חובה.'
  ],
  pricing: [
    { label: 'הכנת תעודת עובד ציבור בתחום הגבולות', amount: '500 ₪' },
    { label: 'שעת מידע (כקבוע בתקנות המדידה — אגרות)', amount: '243 ₪' },
    { label: 'משלוח בדואר רשום', amount: '39 ₪' },
    { label: 'משלוח בדואר מהיר', amount: '80 ₪' }
  ],
  links: [
    { label: 'שרת המפות הממשלתי (govmap) — לאיתור קואורדינטות', url: 'https://www.govmap.gov.il' }
  ],
  formats: 'Shapefile / PDF / JPEG / PNG / TIFF (סוג הקובץ תלוי בסוג הבקשה).',
  notifications: [
    'הפונה מקבל דוא"ל בכל שלב: אישור שליחת הבקשה, רישיון לחתימה, הצעת מחיר, אישור תשלום ומסירת המידע.',
    'המשרד מתעדכן בדוא"ל: פנייה חדשה, רישיון חתום שהתקבל, ותשלום שבוצע.'
  ],
  deliveryDays: 'עד 4 ימי עסקים.'
};

const PAPER_MAPS: ServiceProcess = {
  formName: 'הזמנת מפות נייר בהוצאת המרכז למיפוי ישראל · Maps@mapi.gov.il',
  intro: 'הזמנה ורכישה של מפות נייר בהוצאת מפ"י — מפות טופוגרפיות (1:25,000 ו-1:50,000), מפות ערים ויישובים, מפות ימיות, מפות תיור ושבילים, מפת תלמיד ופוסטר סמלי המדינה. (מפות היסטוריות מוזמנות בטופס ייעודי נפרד.)',
  audience: 'לקוח פרטי, לקוח עסקי, או מפיץ מורשה — בחירה מרשימת המפיצים, מספר ח.פ נעול ומחירון מפיצים ייעודי.',
  steps: [
    { title: 'פרטי המבקש', detail: 'בחירת סוג לקוח (פרטי / עסקי / מפיץ מורשה) והזנת פרטי קשר. מפיץ מורשה נבחר מרשימת המפיצים, ומספר הח.פ מוזן אוטומטית ונעול.' },
    { title: 'בחירת מוצרים', detail: 'בחירת קטגוריה ומוצר מהקטלוג (עד 50 שורות): מפה טופוגרפית 1:25,000 / 1:50,000 (לפי מפתח גיליונות או שם יישוב), מפות ערים, ימיות, תיור ועוד — כולל כמות, שפת המפה ואופציית מנוילן.' },
    { title: 'פרטי משלוח', detail: 'איסוף עצמי מאחד הסניפים או משלוח בדואר רשום / מהיר. עלות המשלוח מתווספת לסכום לתשלום.' },
    { title: 'תשלום', detail: 'תשלום מקוון של סכום ההזמנה (מחיר × כמות + מנוילן + משלוח, לפי הבחירה).' }
  ],
  options: [
    { label: 'קטגוריות ומוצרים', items: [
      'מפה טופוגרפית 1:25,000', 'מפה טופוגרפית 1:50,000', 'מפות ערים ויישובים',
      'מפות ימיות', 'מפות תיור וטיול', 'מפות שבילים', 'מפת תלמיד', 'פוסטר סמלי המדינה'
    ] },
    { label: 'בחירת מפה טופוגרפית', items: ['לפי מפתח גיליונות', 'לפי שם היישוב'] },
    { label: 'שפת המפה', items: ['טופוגרפית 25K / 50K: עברית · אנגלית', 'מפות נבחרות: עברית · ערבית · אנגלית'] },
    { label: 'תוספות', items: ['מנוילן: תוספת 22 ₪', 'מנוילן (מפה נבחרת): תוספת 55 ₪'] }
  ],
  links: [
    { label: 'מפתח גיליונות 1:25,000', url: 'https://www.gov.il/BlobFolder/dynamiccollectorresultitem/digital25000/he/Index%2025%202022.pdf' },
    { label: 'מפתח גיליונות 1:50,000', url: 'https://www.gov.il/BlobFolder/dynamiccollectorresultitem/raster50000/he/Index%2050%202022.pdf' }
  ],
  rules: [
    'מחיר לפריט = מחיר יחידה × כמות + תוספת מנוילן (22 / 55 ₪) × כמות, אם נבחרה.',
    'מפיץ מורשה — המחיר נשלף אוטומטית ממחירון המפיצים (Distributor_price).',
    'ניתן להזמין עד 50 שורות מוצרים בהזמנה אחת.'
  ],
  delivery: [
    'איסוף עצמי — המשרד הראשי, לינקולן 1, תל אביב-יפו',
    'איסוף עצמי (בציון בהערות) — ירושלים (חשין 1), באר שבע (התקווה 4), חיפה (הפלי"ם 15), נצרת (המלאכה 16)',
    'משלוח בדואר רשום',
    'משלוח בדואר מהיר'
  ],
  notifications: [
    'בסיום ההזמנה נשלח אישור בדוא"ל ללקוח ולמשרד.',
    'איסוף עצמי — הבקשה מטופלת תוך 4 ימי עסקים; תישלח הודעה כשההזמנה מוכנה לאיסוף.',
    'משלוח — המפות מוכנות תוך 4 ימי עסקים ונמסרות לדואר ישראל.'
  ],
  deliveryDays: 'עד 4 ימי עסקים (זמן המשלוח בפועל תלוי בדואר ישראל).'
};

// Historic maps use a dedicated ordering channel (HistoricalMaps@mapi.gov.il),
// separate from the two modern spec sheets. The logic below is grounded only in
// the portal's own historic-maps service data (formats/price table, periods,
// handling time) — nothing beyond it is invented.
const HISTORIC: ServiceProcess = {
  formName: 'הזמנת מפות היסטוריות מארכיון מפ"י · HistoricalMaps@mapi.gov.il',
  intro: `הזמנת מפות היסטוריות מארכיון מפ"י — מהתקופה העות'מאנית, תקופת המנדט הבריטי, המדינה הצעירה ועד ימינו. שימושי למחקר אקדמי, היסטורי וגנאלוגי. הזמנה כעותק סרוק דיגיטלי או כהדפסת איכות.`,
  audience: 'לקוח פרטי, לקוח עסקי או גוף מוסדי / ממשלתי.',
  steps: [
    { title: 'המפה המבוקשת', detail: 'בחירת התקופה ההיסטורית, תיאור האזור / המפה, בחירת פורמט (סרוק דיגיטלי או הדפסת איכות A3/A2/A1) וכמות.' },
    { title: 'פרטי המבקש', detail: 'סוג לקוח (פרטי / עסקי / מוסדי) ופרטי קשר.' },
    { title: 'אספקה', detail: 'עותק סרוק נשלח בקישור מאובטח בדוא"ל; מפה מודפסת נמסרת באיסוף עצמי או במשלוח דואר רשום / מהיר.' },
    { title: 'תשלום', detail: 'תשלום מקוון (מחיר הפורמט × כמות + משלוח אם רלוונטי).' }
  ],
  options: [
    { label: 'תקופות', items: ["עות'מאני / טרום-1918", "המנדט הבריטי (1918–1948)", "המדינה הצעירה (1948–1967)", "מ-1967 ועד היום"] },
    { label: 'פורמט', items: ['סרוק (עותק דיגיטלי)', 'הדפסת איכות A3 / A2 / A1'] }
  ],
  pricing: [
    { label: 'סרוק (עותק דיגיטלי)', amount: '120 ₪' },
    { label: 'הדפסת איכות A3', amount: '160 ₪' },
    { label: 'הדפסת איכות A2', amount: '210 ₪' },
    { label: 'הדפסת איכות A1', amount: '280 ₪' }
  ],
  delivery: ['עותק דיגיטלי — קישור מאובטח בדוא"ל', 'איסוף עצמי מהמשרד', 'משלוח בדואר רשום / מהיר'],
  links: [{ label: 'דף השירות ב-gov.il', url: 'https://www.gov.il/he/service/historic_maps' }],
  notifications: ['בסיום ההזמנה נשלח אישור בדוא"ל.', 'הארכיון מאתר את המפה ומאמת זמינות; לאחר התשלום נמסר התוצר.'],
  formats: 'PDF / JPEG / TIFF (סרוק) · הדפסת איכות (מודפס).',
  deliveryDays: '7–14 ימי עסקים (סרוק מהיר יותר ממודפס).'
};

// Portal services covered by the paper-maps (Maps@mapi.gov.il) form.
const PAPER_MAP_SLUGS = new Set([
  "topographic-map", "touring-map", "trail-map", "student-map",
  "state-emblems-poster", "city-map", "marine-maps"
]);

/** The real GovForms process for a service, or null if none is documented. */
export function getServiceProcess(slug: string): ServiceProcess | null {
  if (slug === "international-boundaries") return BOUNDARIES;
  if (slug === "historic-maps") return HISTORIC;
  if (PAPER_MAP_SLUGS.has(slug)) return PAPER_MAPS;
  return null;
}

/** True when the service is ordered via an in-portal form (not a link-out). */
export function hasInPortalOrder(slug: string): boolean {
  return getServiceProcess(slug) !== null;
}

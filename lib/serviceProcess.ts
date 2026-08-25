// Faithful reflection of the real GovForms processes for specific services,
// per the official form specifications (Boundaries@mapi.gov.il V2,
// Maps@mapi.gov.il V7). Rendered on the product page as "שלבי התהליך והמידע".
// Code-driven (not in the DB) so it deploys through dev→test→prod without a
// data migration; ordering itself still goes to the official form ("מעבר להזמנה").

export interface ProcessStep { title: string; detail?: string; }
export interface OptionGroup { label: string; items: string[]; }
export interface PriceRow { label: string; amount: string; }

export interface ServiceProcess {
  formName: string;            // official GovForms form name + id
  intro: string;
  audience: string;            // customer types the form serves
  steps: ProcessStep[];        // the multi-step flow
  options?: OptionGroup[];
  pricing?: PriceRow[];
  delivery?: string[];
  formats?: string;            // deliverable file formats
  deliveryDays: string;
}

const BOUNDARIES: ServiceProcess = {
  formName: 'פנייה לקבלת מידע מאגף גבולות בינלאומיים · Boundaries@mapi.gov.il',
  intro: 'פנייה לקבלת מידע מאגף הגבולות הבינלאומיים של מפ"י — בדיקת מיקום נקודה, מבנה, גוש/חלקה או תוצר מדידה ביחס לקו גבול בינלאומי או קו תחום אזור יהודה ושומרון.',
  audience: 'לקוח פרטי או לקוח עסקי.',
  steps: [
    { title: 'הגשת הפנייה', detail: 'בחירת סוג השירות (בדיקה מרחבית / בדיקת מדידה / אחר), פרטי המקום (קובץ GIS / גוש וחלקה / קואורדינטות ברשת ישראל התקפה), וצירוף הקבצים הרלוונטיים.' },
    { title: 'בדיקת המשרד', detail: 'אגף הגבולות בודק את הפנייה. אם נדרשים תיקונים — הפנייה מוחזרת לפונה להשלמה.' },
    { title: 'רישיון שימוש לחתימה', detail: 'אם אושר ונדרש רישיון — נשלח רישיון שימוש לחתימת הפונה, אותו יש לצרף חזרה חתום.' },
    { title: 'הצעת מחיר', detail: 'המשרד שולח הצעת מחיר לתשלום האגרה בהתאם לבקשה.' },
    { title: 'תשלום', detail: 'תשלום מקוון מאובטח של האגרה (שרת התשלומים הממשלתי).' },
    { title: 'מסירת המידע', detail: 'קישור למידע המבוקש / חוות דעת / צרופה נשלח לכתובת הדוא"ל שהוזנה בבקשה.' }
  ],
  pricing: [
    { label: 'הכנת תעודת עובד ציבור בתחום הגבולות', amount: '500 ₪' },
    { label: 'שעת מידע (כקבוע בתקנות המדידה — אגרות)', amount: '243 ₪' },
    { label: 'משלוח בדואר רשום', amount: '39 ₪' },
    { label: 'משלוח בדואר מהיר', amount: '80 ₪' }
  ],
  formats: 'Shapefile / PDF / JPEG / PNG / TIFF (סוג הקובץ תלוי בסוג הבקשה).',
  deliveryDays: 'עד 4 ימי עסקים.'
};

const PAPER_MAPS: ServiceProcess = {
  formName: 'הזמנת מפות נייר בהוצאת המרכז למיפוי ישראל · Maps@mapi.gov.il',
  intro: 'הזמנה ורכישה של מפות נייר בהוצאת מפ"י — מפות טופוגרפיות, מפות ערים ויישובים, מפות ימיות ומפות תיור.',
  audience: 'לקוח פרטי, לקוח עסקי, או מפיץ מורשה (עם מחירון ייעודי).',
  steps: [
    { title: 'פרטי המבקש', detail: 'בחירת סוג לקוח (פרטי / עסקי / מפיץ מורשה) והזנת פרטי קשר.' },
    { title: 'בחירת מוצרים', detail: 'בחירת מפות מהקטלוג — טופוגרפית 1:25,000 / 1:50,000 (לפי מפתח גיליונות או שם יישוב), מפות ערים ועוד — כולל כמות, שפה ואופציית מנוילן.' },
    { title: 'פרטי משלוח', detail: 'איסוף עצמי מאחד הסניפים או משלוח בדואר רשום / מהיר.' },
    { title: 'תשלום', detail: 'תשלום מקוון של סכום ההזמנה (כולל עלות משלוח ומנוילן, אם נבחרו).' }
  ],
  options: [
    { label: 'קני מידה וסוגי מפות', items: ['טופוגרפית 1:25,000', 'טופוגרפית 1:50,000', 'מפות ערים ויישובים', 'מפות ימיות ותיור'] },
    { label: 'תוספות', items: ['מנוילן: תוספת 22 ₪ / 55 ₪', 'שפה: עברית / אנגלית / ערבית'] }
  ],
  delivery: [
    'איסוף עצמי — תל אביב-יפו (לינקולן 1), ירושלים, חיפה, נצרת או באר שבע',
    'משלוח בדואר רשום',
    'משלוח בדואר מהיר'
  ],
  deliveryDays: 'עד 4 ימי עסקים (זמן המשלוח בפועל תלוי בדואר ישראל).'
};

// Portal services covered by the paper-maps (Maps@mapi.gov.il) form.
const PAPER_MAP_SLUGS = new Set([
  "topographic-map", "touring-map", "trail-map", "student-map",
  "state-emblems-poster", "city-map", "marine-maps"
]);

/** The real GovForms process for a service, or null if none is documented. */
export function getServiceProcess(slug: string): ServiceProcess | null {
  if (slug === "international-boundaries") return BOUNDARIES;
  if (PAPER_MAP_SLUGS.has(slug)) return PAPER_MAPS;
  return null;
}

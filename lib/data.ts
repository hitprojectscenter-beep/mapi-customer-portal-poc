export type Category =
  | "maps"
  | "cadastre"
  | "geodesy"
  | "orthophoto"
  | "gis"
  | "certificates";

export interface Service {
  slug: string;
  name: string;
  category: Category;
  categoryLabel: string;
  shortDescription: string;
  description: string;
  icon: string;
  priceFrom: number;
  priceTo?: number;
  priceUnit: string;
  deliveryDays: string;
  customerTypes: ("private" | "business" | "government" | "surveyor")[];
  highlight?: boolean;
  inScope: boolean;
  externalUrl?: string;
  features: string[];
  priceTable?: { label: string; without: number; with?: number }[];
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "custom-map",
    name: 'מפה בהתאמה אישית',
    category: "maps",
    categoryLabel: "מפות והדפסות",
    shortDescription: "הזמנת מפה מודפסת לאזור גאוגרפי ספציפי בגדלים A4-A0",
    description:
      'השירות מאפשר ללקוח להזמין מפה מודפסת לאזור גאוגרפי ספציפי בגודל לבחירתו (A0-A4), עם או בלי אורתופוטו כשכבה. כולל סימון אזור על המפה ב-GovMap, בחירת גודל, תוספת אורתופוטו אופציונלית ואספקה דיגיטלית או פיזית.',
    icon: "map",
    priceFrom: 160,
    priceTo: 540,
    priceUnit: "₪",
    deliveryDays: "3-7 ימי עסקים",
    customerTypes: ["private", "business", "government", "surveyor"],
    highlight: true,
    inScope: true,
    features: [
      "סימון אזור על המפה ב-GovMap",
      'בחירת גודל מ-A4 ועד A0',
      "תוספת אורתופוטו אופציונלית",
      "אספקה דיגיטלית או פיזית"
    ],
    priceTable: [
      { label: 'A4 (21x30 ס"מ)', without: 160, with: 170 },
      { label: 'A3 (30x42 ס"מ)', without: 170, with: 200 },
      { label: 'A2 (42x59 ס"מ)', without: 200, with: 245 },
      { label: 'A1 (59x84 ס"מ)', without: 250, with: 340 },
      { label: 'A0 (84x119 ס"מ)', without: 350, with: 540 }
    ],
    faq: [
      {
        q: "כמה זמן לוקח לקבל את המפה?",
        a: "זמן האספקה הוא 3-7 ימי עסקים. אספקה דיגיטלית מהירה יותר ממשלוח פיזי."
      },
      {
        q: "מהי אורתופוטו?",
        a: "אורתופוטו הוא תצלום אוויר מתוקן גיאוגרפית המוצג כשכבה על המפה ומעניק תמונת מציאות מדויקת של האזור."
      },
      {
        q: "האם אפשר לקבל מפה בגודל מותאם אישית?",
        a: 'הגדלים הזמינים הם A4-A0 בלבד. לבקשות מיוחדות יש לפנות לשירות הלקוחות.'
      }
    ]
  },
  {
    slug: "cors-subscription",
    name: "מנוי לתחנות קבע (CORS)",
    category: "geodesy",
    categoryLabel: "גיאודזיה",
    shortDescription: "RTK/VRS - תיקוני זמן אמת ברמת דיוק מילימטרית",
    description:
      'מנוי חודשי לרשת תחנות הקבע (CORS) של מפ"י. מספק תיקוני זמן אמת ברמת דיוק מילימטרית למודדים מוסמכים, מהנדסים וחברות תכנון. שירות RTK/VRS באמצעות פרוטוקול NTRIP.',
    icon: "sensors",
    priceFrom: 300,
    priceUnit: "₪/חודש",
    deliveryDays: "הפעלה תוך 24 שעות",
    customerTypes: ["business", "surveyor", "government"],
    highlight: true,
    inScope: true,
    features: [
      "כיסוי ארצי מלא של ישראל",
      "תיקוני RTK/VRS בזמן אמת",
      "פרוטוקול NTRIP סטנדרטי",
      'דיוק של 2-3 ס"מ אופקי',
      "תמיכה טכנית מקצועית"
    ],
    priceTable: [
      { label: "מנוי חודשי - משתמש בודד", without: 300 },
      { label: "מנוי שנתי - משתמש בודד", without: 3000 },
      { label: "מנוי עסקי - עד 5 משתמשים", without: 1200 },
      { label: "מנוי ארגוני - בלתי מוגבל", without: 4500 }
    ],
    faq: [
      {
        q: "מה ההבדל בין RTK ל-VRS?",
        a: "RTK מתבסס על תחנת קבע יחידה, VRS משתמש במספר תחנות כדי ליצור תחנה וירטואלית קרובה למשתמש - דיוק טוב יותר."
      },
      {
        q: "האם אני צריך ציוד מיוחד?",
        a: "כן, נדרש מקלט GNSS תומך RTK/NTRIP. ניתן לקבל המלצות מהתמיכה הטכנית."
      }
    ]
  },
  {
    slug: "aerial-photos",
    name: "תצלומי אוויר",
    category: "orthophoto",
    categoryLabel: "אורתופוטו וגבהים",
    shortDescription: "תצלומי אוויר היסטוריים וצבעוניים מ-1945 עד היום",
    description:
      'אוסף תצלומי האוויר הלאומי של ישראל - תיעוד היסטורי ועדכני של פני המדינה. כולל תצלומים מ-1945 ועד היום, בשחור-לבן ובצבע, ברזולוציות שונות.',
    icon: "flight",
    priceFrom: 235,
    priceTo: 850,
    priceUnit: "₪",
    deliveryDays: "5-10 ימי עסקים",
    customerTypes: ["private", "business", "government", "surveyor"],
    highlight: true,
    inScope: true,
    features: [
      "ארכיון היסטורי מ-1945",
      "תצלומים צבעוניים עדכניים",
      "רזולוציות שונות",
      "פורמטים דיגיטליים TIFF/JPG"
    ],
    faq: [
      {
        q: "האם יש תצלומים מתקופות מסוימות?",
        a: "כן - יש סיקור נרחב מ-1945, 1956, 1965 ואילך. רוב השנים מ-1980 ואילך זמינות באיכות גבוהה."
      }
    ]
  },
  {
    slug: "surveyor-inspector",
    name: "מודד מבקר",
    category: "certificates",
    categoryLabel: "תעודות עובד ציבור",
    shortDescription: 'ביקורת תצ"ר לרישום במקרקעין וטאבו',
    description:
      'שירות מודד מבקר של מפ"י - ביקורת תכניות לצרכי רישום (תצ"ר) על ידי מודד מוסמך לטובת רישום בטאבו ובמקרקעין. השירות כולל בדיקת קואורדינטות, גבולות, וטופוגרפיה.',
    icon: "verified",
    priceFrom: 1000,
    priceTo: 5000,
    priceUnit: "₪",
    deliveryDays: "10-21 ימי עסקים",
    customerTypes: ["surveyor", "business", "government"],
    highlight: true,
    inScope: true,
    features: [
      "מודד מוסמך של מפ\"י",
      'ביקורת תצ"ר מלאה',
      "אישור לרישום בטאבו",
      "דוח מפורט"
    ],
    faq: [
      {
        q: 'מהי תצ"ר?',
        a: 'תצ"ר = תכנית לצרכי רישום - תכנית מודדים המכינה את הקרקע לרישום במרשם המקרקעין (טאבו).'
      }
    ]
  },
  {
    slug: "gis-layers",
    name: "שכבות מידע GIS",
    category: "gis",
    categoryLabel: 'נתוני GIS',
    shortDescription: "שכבות וקטוריות ונתוני עתק למתכננים ומהנדסים",
    description:
      "רכישת שכבות מידע גיאוגרפי וקטוריות מתוך מסד הנתונים הגיאוגרפי הלאומי. כולל גושים, חלקות, רחובות, נחלים, כבישים ועוד.",
    icon: "dataset",
    priceFrom: 450,
    priceTo: 12000,
    priceUnit: "₪",
    deliveryDays: "2-5 ימי עסקים",
    customerTypes: ["business", "government", "surveyor"],
    inScope: true,
    features: [
      "פורמטים: Shapefile, GeoJSON, GPKG",
      "עדכון יומי",
      "כיסוי ארצי",
      "מפרט מטא-דאטה מלא"
    ],
    faq: []
  },
  {
    slug: "cadastral-info",
    name: "מידע קדסטרי",
    category: "cadastre",
    categoryLabel: 'קדסטר',
    shortDescription: "תעודות גוש וחלקה, מפות מדידה, ותכניות לצרכי רישום",
    description:
      "הפקת מסמכי קדסטר רשמיים: תעודות גוש וחלקה, מפות מדידה היסטוריות, ותכניות לצרכי רישום (תצ\"ר). השירות מנפיק תעודות חתומות דיגיטלית.",
    icon: "layers",
    priceFrom: 50,
    priceTo: 350,
    priceUnit: "₪",
    deliveryDays: "1-3 ימי עסקים",
    customerTypes: ["private", "business", "surveyor"],
    inScope: true,
    features: [
      "חתימה דיגיטלית מאושרת",
      "תוקף משפטי מלא",
      "אספקה דיגיטלית מיידית",
      "ארכיון היסטורי"
    ],
    faq: []
  },
  {
    slug: "marine-maps",
    name: "מפות ים",
    category: "maps",
    categoryLabel: "מפות והדפסות",
    shortDescription: "מפות ניווט ימיות רשמיות של חופי ישראל",
    description:
      "מפות ניווט ימיות רשמיות של חופי ישראל הים התיכון ומפרץ אילת. כולל נתונים הידרוגרפיים עדכניים, סימוני בטיחות, ותעלות שיט.",
    icon: "sailing",
    priceFrom: 130,
    priceTo: 280,
    priceUnit: "₪",
    deliveryDays: "5-7 ימי עסקים",
    customerTypes: ["private", "business", "government"],
    inScope: false,
    externalUrl: "https://www.gov.il/he/service/marine_maps",
    features: ["מפות רשמיות לניווט ימי", "סימוני בטיחות", 'הוצאה עדכנית של חיל הים'],
    faq: []
  },
  {
    slug: "elevation-data",
    name: "מודלי גובה ספרתיים (DEM/DSM)",
    category: "orthophoto",
    categoryLabel: "אורתופוטו וגבהים",
    shortDescription: "מודלי גובה לאזורים נבחרים ברזולוציות שונות",
    description:
      "מודלים ספרתיים של פני השטח (DSM) ושל הקרקע (DEM) המופקים מתצלומי אוויר וסריקות לידאר. שימושיים לתכנון הנדסי, ניקוז, וגיאומטריה.",
    icon: "terrain",
    priceFrom: 800,
    priceTo: 9500,
    priceUnit: "₪",
    deliveryDays: "5-10 ימי עסקים",
    customerTypes: ["business", "government", "surveyor"],
    inScope: false,
    externalUrl: "https://www.gov.il/he/service/elevation_models",
    features: ["רזולוציה גבוהה", "פורמט GeoTIFF", "אספקה לפי גזרה"],
    faq: []
  },
  {
    slug: "geodetic-points",
    name: "נקודות בקרה גיאודזיות",
    category: "geodesy",
    categoryLabel: "גיאודזיה",
    shortDescription: "נתוני נקודות בקרה ברשת הגיאודזית הלאומית",
    description:
      "פרטי נקודות בקרה גיאודזיות מהרשת הלאומית: קואורדינטות, גובה, סוג הנקודה ותיאור פיזי. נדרש למודדים ולמהנדסי קרקע.",
    icon: "pin_drop",
    priceFrom: 80,
    priceTo: 500,
    priceUnit: "₪",
    deliveryDays: "1-2 ימי עסקים",
    customerTypes: ["surveyor", "business"],
    inScope: false,
    externalUrl: "https://www.gov.il/he/service/geodetic_points",
    features: ["דיוק לאומי", "תיאור פיזי מפורט", 'עדכון תקופתי'],
    faq: []
  },
  {
    slug: "wms-subscription",
    name: "מנוי WMS / WFS",
    category: "gis",
    categoryLabel: 'נתוני GIS',
    shortDescription: "שירות שכבות מפה חיות ב-API",
    description:
      "מנוי לשירותי OGC סטנדרטיים: WMS לתצוגת מפה ו-WFS לחילוץ נתונים וקטוריים. מתאים לאינטגרציה במערכות GIS, אפליקציות מובייל ופלטפורמות BI.",
    icon: "cloud_sync",
    priceFrom: 500,
    priceUnit: "₪/חודש",
    deliveryDays: "הפעלה תוך 48 שעות",
    customerTypes: ["business", "government"],
    inScope: false,
    externalUrl: "https://www.gov.il/he/service/wms_subscription",
    features: ["סטנדרט OGC", 'API מתועד', "תמיכה ב-RESTful"],
    faq: []
  },
  {
    slug: "boundary-certificate",
    name: "תעודת גבולות",
    category: "certificates",
    categoryLabel: "תעודות עובד ציבור",
    shortDescription: 'תעודה רשמית של גבולות מנהליים',
    description:
      "הפקת תעודה רשמית של גבולות מנהליים (יישובים, רשויות מקומיות, מועצות אזוריות). התעודה חתומה דיגיטלית ובעלת תוקף משפטי.",
    icon: "badge",
    priceFrom: 200,
    priceTo: 800,
    priceUnit: "₪",
    deliveryDays: "3-5 ימי עסקים",
    customerTypes: ["government", "business", "private"],
    inScope: false,
    externalUrl: "https://www.gov.il/he/service/boundary_certificate",
    features: ["תוקף משפטי", "חתימה דיגיטלית", "אספקה דיגיטלית"],
    faq: []
  },
  {
    slug: "city-map",
    name: "מפת עיר / יישוב",
    category: "maps",
    categoryLabel: "מפות והדפסות",
    shortDescription: "מפה מודפסת של עיר או יישוב שלם",
    description:
      "מפה טופוגרפית-עירונית של עיר או יישוב שלם, כולל שמות רחובות, מבנים ציבוריים, פארקים ושירותים.",
    icon: "location_city",
    priceFrom: 250,
    priceTo: 650,
    priceUnit: "₪",
    deliveryDays: "5-7 ימי עסקים",
    customerTypes: ["private", "business", "government"],
    inScope: false,
    externalUrl: "https://www.gov.il/he/service/city_maps",
    features: ['מפה מעודכנת', 'שמות רחובות', 'מבנים ציבוריים'],
    faq: []
  },
  {
    slug: "historic-maps",
    name: "מפות היסטוריות",
    category: "maps",
    categoryLabel: "מפות והדפסות",
    shortDescription: "מפות היסטוריות מארכיון מפ\"י",
    description:
      "מאגר מפות היסטוריות של ארץ ישראל - תקופת המנדט, תקופת המדינה הצעירה ועד היום. שימושיות למחקר אקדמי, היסטורי וגנאלוגי.",
    icon: "history_edu",
    priceFrom: 120,
    priceTo: 450,
    priceUnit: "₪",
    deliveryDays: "7-14 ימי עסקים",
    customerTypes: ["private", "business", "government"],
    inScope: false,
    externalUrl: "https://www.gov.il/he/service/historic_maps",
    features: ["ארכיון נרחב", "סריקה דיגיטלית", "מפות מקוריות"],
    faq: []
  },
  {
    slug: "surveyor-license",
    name: "רישוי מודדים",
    category: "certificates",
    categoryLabel: "תעודות עובד ציבור",
    shortDescription: "רישום ורישוי מודדים מוסמכים",
    description:
      "תהליך רישום וחידוש רישוי מודדים מוסמכים מטעם מפ\"י, כולל בדיקת הסמכה, בחינות מקצועיות וחידוש שנתי.",
    icon: "engineering",
    priceFrom: 850,
    priceTo: 2500,
    priceUnit: "₪",
    deliveryDays: "30-60 ימי עסקים",
    customerTypes: ["surveyor"],
    inScope: false,
    externalUrl: "https://www.gov.il/he/service/surveyor_license",
    features: ["רישוי רשמי", "חידוש שנתי", "תיק מקצועי"],
    faq: []
  }
];

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: "maps", label: "מפות נייר", icon: "description" },
  { id: "cadastre", label: 'קדסטר', icon: "layers" },
  { id: "geodesy", label: 'גיאודזיה', icon: "architecture" },
  { id: "orthophoto", label: "אורתופוטו וגבהים", icon: "camera" },
  { id: "gis", label: 'נתוני GIS', icon: "dataset" },
  { id: "certificates", label: "תעודות", icon: "badge" }
];

export const customerTypeLabels: Record<string, string> = {
  private: "אזרח פרטי",
  business: "חברה עסקית",
  government: "ממשלה / רשות",
  surveyor: "מודד מוסמך"
};

export interface Order {
  id: string;
  serviceName: string;
  serviceIcon: string;
  date: string;
  status: "completed" | "active" | "in-progress" | "cancelled";
  statusLabel: string;
  amount: number;
  deliverable: string;
}

export const mockOrders: Order[] = [
  {
    id: "ORD-2026-145",
    serviceName: 'מפה בהתאמה אישית A2',
    serviceIcon: "map",
    date: "15/05/2026",
    status: "completed",
    statusLabel: "הושלמה",
    amount: 284,
    deliverable: "PDF זמין להורדה"
  },
  {
    id: "ORD-2026-098",
    serviceName: "תחנות קבע - RTK",
    serviceIcon: "sensors",
    date: "01/05/2026",
    status: "active",
    statusLabel: "פעיל (מנוי)",
    amount: 300,
    deliverable: "הוראות חיבור"
  },
  {
    id: "ORD-2026-052",
    serviceName: "תצלום אוויר 1973",
    serviceIcon: "flight",
    date: "22/04/2026",
    status: "in-progress",
    statusLabel: "בטיפול",
    amount: 350,
    deliverable: "ממתין"
  },
  {
    id: "ORD-2026-021",
    serviceName: 'מפת ים תיכון',
    serviceIcon: "sailing",
    date: "10/04/2026",
    status: "completed",
    statusLabel: "הושלמה",
    amount: 130,
    deliverable: "קבלת דואר"
  },
  {
    id: "ORD-2025-892",
    serviceName: "שכבת GIS - גושים וחלקות",
    serviceIcon: "dataset",
    date: "28/12/2025",
    status: "completed",
    statusLabel: "הושלמה",
    amount: 1450,
    deliverable: "GeoJSON"
  }
];

export const mockNotifications = [
  {
    id: "1",
    icon: "schedule",
    title: 'מנוי CORS שלך פג בעוד 14 ימים',
    cta: "חדש מנוי",
    href: "/catalog/cors-subscription",
    type: "warning" as const
  },
  {
    id: "2",
    icon: "request_quote",
    title: 'הצעת מחיר QT-2026-088 ממתינה לאישורך',
    cta: "צפה",
    href: "/dashboard",
    type: "info" as const
  },
  {
    id: "3",
    icon: "check_circle",
    title: "הזמנה ORD-2026-145 הושלמה",
    cta: "הורד תוצר",
    href: "/orders",
    type: "success" as const
  }
];

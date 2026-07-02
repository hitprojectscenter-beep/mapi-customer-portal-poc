// Mock reviews per service slug — SFCC-style ratings.

export interface Review {
  id: string;
  author: string;
  authorInitial: string;
  rating: number;   // 1-5
  title: string;
  body: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export interface RatingSummary {
  average: number;
  count: number;
  distribution: { stars: number; count: number }[];
}

const REVIEWS: Record<string, Review[]> = {
  "custom-map": [
    { id: "r1", author: "יוסי כ.", authorInitial: "יכ", rating: 5, title: "איכות ברמה גבוהה", body: "הזמנתי מפת A2 של אזור פרויקט הבנייה שלי. הגיעה תוך 4 ימי עסקים במעטפה מהודקת. איכות ההדפסה מעולה.", date: "2026-04-12", verified: true, helpful: 24 },
    { id: "r2", author: "מיכל ר.", authorInitial: "מר", rating: 5, title: "שירות מקצועי", body: "התהליך היה פשוט וברור. המפה מדויקת ומפורטת, בדיוק מה שהייתי צריכה למחקר האקדמי.", date: "2026-03-28", verified: true, helpful: 18 },
    { id: "r3", author: "דוד ל.", authorInitial: "דל", rating: 4, title: "מפה מעולה, אספקה איטית", body: "הרזולוציה מרשימה והדפסה בהחלט מקצועית. לקח יומיים יותר מהצפוי אבל שווה את ההמתנה.", date: "2026-03-15", verified: true, helpful: 12 },
    { id: "r4", author: "רבקה ש.", authorInitial: "רש", rating: 5, title: "בדיוק מה שרציתי", body: "יכולתי לסמן את האזור המדויק ולקבל מפה מותאמת אישית. הצוות היה זמין לכל שאלה.", date: "2026-02-20", verified: true, helpful: 9 }
  ],
  "cors-subscription": [
    { id: "r5", author: "שי אבן, מהנדס אזרחי", authorInitial: "שא", rating: 5, title: "מדויק ואמין", body: "מנוי RTK של תחנות הקבע. דיוק מילימטרי בשטח, יציבות מעולה ותמיכה טכנית מהירה.", date: "2026-05-01", verified: true, helpful: 41 },
    { id: "r6", author: "אביב לוי", authorInitial: "אל", rating: 5, title: "הכי טוב שיש", body: "עובד עם המנוי כבר שנה. אין מה להשוות לשירותים מתחרים בישראל. שווה כל שקל.", date: "2026-04-18", verified: true, helpful: 28 },
    { id: "r7", author: "משרד הנדסה", authorInitial: "מה", rating: 4, title: "פתרון מקצועי", body: "המנוי משרת את הצוות כולו. יש שיפור מאז שדרגו את התשתית - חיבור יציב יותר.", date: "2026-03-30", verified: true, helpful: 15 }
  ],
  "aerial-photos": [
    { id: "r8", author: "ד\"ר תמר גיאולוגית", authorInitial: "תג", rating: 5, title: "מקור מידע היסטורי מדהים", body: "השתמשתי בתצלומים מ-1948 למחקר שינויים גיאולוגיים. איכות הדיגיטציה מרשימה.", date: "2026-05-10", verified: true, helpful: 33 },
    { id: "r9", author: "אורי ב.", authorInitial: "אב", rating: 4, title: "אוצר לחוקרים", body: "מאגר מרשים של תצלומי אוויר צבעוניים והיסטוריים. הממשק פשוט לחיפוש לפי אזור ותאריך.", date: "2026-04-22", verified: true, helpful: 19 }
  ],
  "surveyor-inspector": [
    { id: "r10", author: "יובל מודד", authorInitial: "ים", rating: 5, title: "מקצועי מהשורה הראשונה", body: "הביקורת בוצעה בקפידה. תעודות מסודרות תוך 14 יום. ממליץ בחום לכל מודד שצריך אישור תצ\"ר.", date: "2026-05-05", verified: true, helpful: 22 }
  ],
  "gis-layers": [
    { id: "r11", author: "עיריית הרצליה", authorInitial: "עה", rating: 5, title: "נתוני GIS מדויקים", body: "משתמשים בשכבות ה-GIS לתכנון עירוני. הפורמט GeoJSON קל לעיבוד ומתעדכן בקביעות.", date: "2026-04-30", verified: true, helpful: 17 }
  ]
};

export function getReviews(slug: string): Review[] {
  return REVIEWS[slug] || [];
}

export function getRatingSummary(slug: string): RatingSummary {
  const reviews = getReviews(slug);
  if (reviews.length === 0) {
    return { average: 0, count: 0, distribution: [5,4,3,2,1].map(s => ({ stars: s, count: 0 })) };
  }
  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  const dist = [5,4,3,2,1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length
  }));
  return {
    average: Math.round((sum / reviews.length) * 10) / 10,
    count: reviews.length,
    distribution: dist
  };
}

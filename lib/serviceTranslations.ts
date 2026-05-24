// Service name + short-description translations per language.
// Keyed by service slug.
// Hebrew is the canonical source (already in data.ts); other languages
// translate the same content. If a translation is missing for a given
// language we fall back to Hebrew.

import type { Lang } from "./i18n";

type ServiceText = Partial<Record<Lang, string>>;

interface ServiceTranslationEntry {
  name: ServiceText;
  short: ServiceText;
  category: ServiceText;
  deliveryDays: ServiceText;
}

const SERVICE_TRANSLATIONS: Record<string, ServiceTranslationEntry> = {
  "custom-map": {
    name: {
      he: 'מפה בהתאמה אישית',
      en: 'Custom Map',
      fr: 'Carte personnalisée',
      es: 'Mapa personalizado',
      ru: 'Персональная карта',
      ar: 'خريطة مخصصة'
    },
    short: {
      he: 'הזמנת מפה מודפסת לאזור גאוגרפי ספציפי בגדלים A4-A0',
      en: 'Printed map for a specific geographic area, sizes A4 to A0',
      fr: 'Carte imprimée pour une zone géographique spécifique, tailles A4 à A0',
      es: 'Mapa impreso para un área geográfica específica, tamaños A4 a A0',
      ru: 'Печатная карта конкретной территории, размеры A4–A0',
      ar: 'خريطة مطبوعة لمنطقة جغرافية محددة بأحجام A4 إلى A0'
    },
    category: {
      he: 'מפות והדפסות', en: 'Maps & Prints', fr: 'Cartes & Impressions',
      es: 'Mapas e Impresiones', ru: 'Карты и печать', ar: 'الخرائط والطباعة'
    },
    deliveryDays: {
      he: '3-7 ימי עסקים', en: '3–7 business days', fr: '3 à 7 jours ouvrés',
      es: '3 a 7 días hábiles', ru: '3–7 рабочих дней', ar: '3-7 أيام عمل'
    }
  },
  "cors-subscription": {
    name: {
      he: 'מנוי לתחנות קבע (CORS)', en: 'CORS Subscription',
      fr: 'Abonnement CORS', es: 'Suscripción CORS',
      ru: 'Подписка CORS', ar: 'اشتراك CORS'
    },
    short: {
      he: 'RTK/VRS - תיקוני זמן אמת ברמת דיוק מילימטרית',
      en: 'RTK/VRS — real-time corrections at millimeter accuracy',
      fr: 'RTK/VRS — corrections en temps réel à précision millimétrique',
      es: 'RTK/VRS — correcciones en tiempo real con precisión milimétrica',
      ru: 'RTK/VRS — поправки в реальном времени с миллиметровой точностью',
      ar: 'RTK/VRS — تصحيحات لحظية بدقة ملليمترية'
    },
    category: {
      he: 'גיאודזיה', en: 'Geodesy', fr: 'Géodésie',
      es: 'Geodesia', ru: 'Геодезия', ar: 'الجيوديسيا'
    },
    deliveryDays: {
      he: 'הפעלה תוך 24 שעות', en: 'Activated within 24 hours',
      fr: 'Activé sous 24 heures', es: 'Activación en 24 horas',
      ru: 'Активация в течение 24 часов', ar: 'تفعيل خلال 24 ساعة'
    }
  },
  "aerial-photos": {
    name: {
      he: 'תצלומי אוויר', en: 'Aerial Photos', fr: 'Photos aériennes',
      es: 'Fotos aéreas', ru: 'Аэрофотоснимки', ar: 'صور جوية'
    },
    short: {
      he: 'תצלומי אוויר היסטוריים וצבעוניים מ-1945 עד היום',
      en: 'Historical and color aerial photos from 1945 to today',
      fr: 'Photos aériennes historiques et couleur de 1945 à aujourd\'hui',
      es: 'Fotos aéreas históricas y a color desde 1945 hasta hoy',
      ru: 'Исторические и цветные аэрофото с 1945 года до наших дней',
      ar: 'صور جوية تاريخية وملونة من 1945 حتى اليوم'
    },
    category: {
      he: 'אורתופוטו וגבהים', en: 'Orthophoto & Elevation',
      fr: 'Orthophoto et Élévation', es: 'Ortofoto y Elevación',
      ru: 'Ортофото и высоты', ar: 'الصور الجوية والارتفاعات'
    },
    deliveryDays: {
      he: '5-10 ימי עסקים', en: '5–10 business days', fr: '5 à 10 jours ouvrés',
      es: '5 a 10 días hábiles', ru: '5–10 рабочих дней', ar: '5-10 أيام عمل'
    }
  },
  "surveyor-inspector": {
    name: {
      he: 'מודד מבקר', en: 'Surveyor Inspector',
      fr: 'Géomètre Inspecteur', es: 'Topógrafo Inspector',
      ru: 'Геодезист-инспектор', ar: 'مساح مفتش'
    },
    short: {
      he: 'ביקורת תצ"ר לרישום במקרקעין וטאבו',
      en: 'Land registration plan inspection for cadastre',
      fr: 'Inspection de plan d\'enregistrement foncier pour cadastre',
      es: 'Inspección de planos para registro de catastro',
      ru: 'Проверка плана регистрации для кадастра',
      ar: 'تفتيش خطة تسجيل الأراضي للسجل العقاري'
    },
    category: {
      he: 'תעודות עובד ציבור', en: 'Public Officer Certificates',
      fr: 'Certificats d\'agent public', es: 'Certificados de Funcionario',
      ru: 'Сертификаты госслужащего', ar: 'شهادات الموظف العام'
    },
    deliveryDays: {
      he: '10-21 ימי עסקים', en: '10–21 business days', fr: '10 à 21 jours ouvrés',
      es: '10 a 21 días hábiles', ru: '10–21 рабочий день', ar: '10-21 يوم عمل'
    }
  },
  "gis-layers": {
    name: {
      he: 'שכבות מידע GIS', en: 'GIS Data Layers',
      fr: 'Couches de données GIS', es: 'Capas de datos GIS',
      ru: 'Слои GIS', ar: 'طبقات بيانات GIS'
    },
    short: {
      he: 'שכבות וקטוריות ונתוני עתק למתכננים ומהנדסים',
      en: 'Vector layers and big data for planners and engineers',
      fr: 'Couches vectorielles et big data pour urbanistes et ingénieurs',
      es: 'Capas vectoriales y big data para planificadores e ingenieros',
      ru: 'Векторные слои и большие данные для планировщиков',
      ar: 'طبقات متجهية وبيانات ضخمة للمخططين والمهندسين'
    },
    category: {
      he: 'נתוני GIS', en: 'GIS Data', fr: 'Données GIS',
      es: 'Datos GIS', ru: 'Данные GIS', ar: 'بيانات GIS'
    },
    deliveryDays: {
      he: '2-5 ימי עסקים', en: '2–5 business days', fr: '2 à 5 jours ouvrés',
      es: '2 a 5 días hábiles', ru: '2–5 рабочих дней', ar: '2-5 أيام عمل'
    }
  },
  "cadastral-info": {
    name: {
      he: 'מידע קדסטרי', en: 'Cadastral Information',
      fr: 'Informations cadastrales', es: 'Información catastral',
      ru: 'Кадастровая информация', ar: 'معلومات كاداسترية'
    },
    short: {
      he: 'תעודות גוש וחלקה, מפות מדידה, ותכניות לצרכי רישום',
      en: 'Block & parcel certificates, survey maps, registration plans',
      fr: 'Certificats de blocs et parcelles, plans de mesure, enregistrement',
      es: 'Certificados de bloque y parcela, planos topográficos',
      ru: 'Свидетельства блоков и участков, карты съёмки, регистрация',
      ar: 'شهادات قطعة وبلوك، خرائط مسح، خطط تسجيل'
    },
    category: {
      he: 'קדסטר', en: 'Cadastre', fr: 'Cadastre',
      es: 'Catastro', ru: 'Кадастр', ar: 'الكاداستر'
    },
    deliveryDays: {
      he: '1-3 ימי עסקים', en: '1–3 business days', fr: '1 à 3 jours ouvrés',
      es: '1 a 3 días hábiles', ru: '1–3 рабочих дня', ar: '1-3 أيام عمل'
    }
  },
  "marine-maps": {
    name: {
      he: 'מפות ים', en: 'Marine Maps', fr: 'Cartes marines',
      es: 'Mapas marinos', ru: 'Морские карты', ar: 'الخرائط البحرية'
    },
    short: {
      he: 'מפות ניווט ימיות רשמיות של חופי ישראל',
      en: 'Official marine navigation maps of Israel coastline',
      fr: 'Cartes officielles de navigation marine du littoral israélien',
      es: 'Mapas oficiales de navegación marina de la costa de Israel',
      ru: 'Официальные морские навигационные карты побережья Израиля',
      ar: 'خرائط ملاحة بحرية رسمية لساحل إسرائيل'
    },
    category: {
      he: 'מפות והדפסות', en: 'Maps & Prints', fr: 'Cartes & Impressions',
      es: 'Mapas e Impresiones', ru: 'Карты и печать', ar: 'الخرائط والطباعة'
    },
    deliveryDays: {
      he: '5-7 ימי עסקים', en: '5–7 business days', fr: '5 à 7 jours ouvrés',
      es: '5 a 7 días hábiles', ru: '5–7 рабочих дней', ar: '5-7 أيام عمل'
    }
  },
  "elevation-data": {
    name: {
      he: 'מודלי גובה ספרתיים (DEM/DSM)', en: 'Digital Elevation Models (DEM/DSM)',
      fr: 'Modèles numériques de terrain (DEM/DSM)', es: 'Modelos digitales de elevación',
      ru: 'Цифровые модели рельефа (DEM/DSM)', ar: 'نماذج الارتفاع الرقمية (DEM/DSM)'
    },
    short: {
      he: 'מודלי גובה לאזורים נבחרים ברזולוציות שונות',
      en: 'Elevation models for selected areas at various resolutions',
      fr: 'Modèles d\'élévation pour des zones sélectionnées',
      es: 'Modelos de elevación para áreas seleccionadas',
      ru: 'Модели высот для выбранных территорий',
      ar: 'نماذج ارتفاع لمناطق مختارة بدقات مختلفة'
    },
    category: {
      he: 'אורתופוטו וגבהים', en: 'Orthophoto & Elevation',
      fr: 'Orthophoto et Élévation', es: 'Ortofoto y Elevación',
      ru: 'Ортофото и высоты', ar: 'الصور الجوية والارتفاعات'
    },
    deliveryDays: {
      he: '5-10 ימי עסקים', en: '5–10 business days', fr: '5 à 10 jours ouvrés',
      es: '5 a 10 días hábiles', ru: '5–10 рабочих дней', ar: '5-10 أيام عمل'
    }
  },
  "geodetic-points": {
    name: {
      he: 'נקודות בקרה גיאודזיות', en: 'Geodetic Control Points',
      fr: 'Points de contrôle géodésique', es: 'Puntos de control geodésico',
      ru: 'Геодезические контрольные точки', ar: 'نقاط التحكم الجيوديسية'
    },
    short: {
      he: 'נתוני נקודות בקרה ברשת הגיאודזית הלאומית',
      en: 'Control point data from the national geodetic network',
      fr: 'Données de points de contrôle du réseau géodésique national',
      es: 'Datos de puntos de control de la red geodésica nacional',
      ru: 'Данные контрольных точек национальной геодезической сети',
      ar: 'بيانات نقاط التحكم من الشبكة الجيوديسية الوطنية'
    },
    category: {
      he: 'גיאודזיה', en: 'Geodesy', fr: 'Géodésie',
      es: 'Geodesia', ru: 'Геодезия', ar: 'الجيوديسيا'
    },
    deliveryDays: {
      he: '1-2 ימי עסקים', en: '1–2 business days', fr: '1 à 2 jours ouvrés',
      es: '1 a 2 días hábiles', ru: '1–2 рабочих дня', ar: '1-2 يوم عمل'
    }
  },
  "wms-subscription": {
    name: {
      he: 'מנוי WMS / WFS', en: 'WMS / WFS Subscription',
      fr: 'Abonnement WMS / WFS', es: 'Suscripción WMS / WFS',
      ru: 'Подписка WMS / WFS', ar: 'اشتراك WMS / WFS'
    },
    short: {
      he: 'שירות שכבות מפה חיות ב-API',
      en: 'Live map-layer service via API',
      fr: 'Service de couches cartographiques en direct via API',
      es: 'Servicio de capas de mapa en vivo vía API',
      ru: 'Сервис живых слоёв карты через API',
      ar: 'خدمة طبقات الخريطة المباشرة عبر API'
    },
    category: {
      he: 'נתוני GIS', en: 'GIS Data', fr: 'Données GIS',
      es: 'Datos GIS', ru: 'Данные GIS', ar: 'بيانات GIS'
    },
    deliveryDays: {
      he: 'הפעלה תוך 48 שעות', en: 'Activated within 48 hours',
      fr: 'Activé sous 48 heures', es: 'Activación en 48 horas',
      ru: 'Активация в течение 48 часов', ar: 'تفعيل خلال 48 ساعة'
    }
  },
  "boundary-certificate": {
    name: {
      he: 'תעודת גבולות', en: 'Boundary Certificate',
      fr: 'Certificat de limites', es: 'Certificado de límites',
      ru: 'Сертификат границ', ar: 'شهادة الحدود'
    },
    short: {
      he: 'תעודה רשמית של גבולות מנהליים',
      en: 'Official certificate of administrative boundaries',
      fr: 'Certificat officiel des limites administratives',
      es: 'Certificado oficial de límites administrativos',
      ru: 'Официальный сертификат административных границ',
      ar: 'شهادة رسمية للحدود الإدارية'
    },
    category: {
      he: 'תעודות עובד ציבור', en: 'Public Officer Certificates',
      fr: 'Certificats d\'agent public', es: 'Certificados de Funcionario',
      ru: 'Сертификаты госслужащего', ar: 'شهادات الموظف العام'
    },
    deliveryDays: {
      he: '3-5 ימי עסקים', en: '3–5 business days', fr: '3 à 5 jours ouvrés',
      es: '3 a 5 días hábiles', ru: '3–5 рабочих дней', ar: '3-5 أيام عمل'
    }
  },
  "city-map": {
    name: {
      he: 'מפת עיר / יישוב', en: 'City / Town Map',
      fr: 'Carte de ville / village', es: 'Mapa de ciudad / pueblo',
      ru: 'Карта города / посёлка', ar: 'خريطة المدينة / البلدة'
    },
    short: {
      he: 'מפה מודפסת של עיר או יישוב שלם',
      en: 'Printed map of an entire city or town',
      fr: 'Carte imprimée d\'une ville entière',
      es: 'Mapa impreso de una ciudad o pueblo entero',
      ru: 'Печатная карта целого города или посёлка',
      ar: 'خريطة مطبوعة لمدينة أو بلدة كاملة'
    },
    category: {
      he: 'מפות והדפסות', en: 'Maps & Prints', fr: 'Cartes & Impressions',
      es: 'Mapas e Impresiones', ru: 'Карты и печать', ar: 'الخرائط والطباعة'
    },
    deliveryDays: {
      he: '5-7 ימי עסקים', en: '5–7 business days', fr: '5 à 7 jours ouvrés',
      es: '5 a 7 días hábiles', ru: '5–7 рабочих дней', ar: '5-7 أيام عمل'
    }
  },
  "historic-maps": {
    name: {
      he: 'מפות היסטוריות', en: 'Historical Maps',
      fr: 'Cartes historiques', es: 'Mapas históricos',
      ru: 'Исторические карты', ar: 'الخرائط التاريخية'
    },
    short: {
      he: 'מפות היסטוריות מארכיון מפ"י',
      en: 'Historical maps from the MAPI archive',
      fr: 'Cartes historiques des archives MAPI',
      es: 'Mapas históricos del archivo MAPI',
      ru: 'Исторические карты из архива MAPI',
      ar: 'خرائط تاريخية من أرشيف MAPI'
    },
    category: {
      he: 'מפות והדפסות', en: 'Maps & Prints', fr: 'Cartes & Impressions',
      es: 'Mapas e Impresiones', ru: 'Карты и печать', ar: 'الخرائط والطباعة'
    },
    deliveryDays: {
      he: '7-14 ימי עסקים', en: '7–14 business days', fr: '7 à 14 jours ouvrés',
      es: '7 a 14 días hábiles', ru: '7–14 рабочих дней', ar: '7-14 يوم عمل'
    }
  },
  "surveyor-license": {
    name: {
      he: 'רישוי מודדים', en: 'Surveyor Licensing',
      fr: 'Licence de géomètre', es: 'Licencia de topógrafo',
      ru: 'Лицензирование геодезистов', ar: 'ترخيص المساحين'
    },
    short: {
      he: 'רישום ורישוי מודדים מוסמכים',
      en: 'Registration and licensing for certified surveyors',
      fr: 'Inscription et licence pour géomètres certifiés',
      es: 'Registro y licencia para topógrafos certificados',
      ru: 'Регистрация и лицензирование сертифицированных геодезистов',
      ar: 'تسجيل وترخيص المساحين المعتمدين'
    },
    category: {
      he: 'תעודות עובד ציבור', en: 'Public Officer Certificates',
      fr: 'Certificats d\'agent public', es: 'Certificados de Funcionario',
      ru: 'Сертификаты госслужащего', ar: 'شهادات الموظف العام'
    },
    deliveryDays: {
      he: '30-60 ימי עסקים', en: '30–60 business days', fr: '30 à 60 jours ouvrés',
      es: '30 a 60 días hábiles', ru: '30–60 рабочих дней', ar: '30-60 يوم عمل'
    }
  }
};

const CATEGORY_TRANSLATIONS: Record<string, ServiceText> = {
  maps: { he: 'מפות נייר', en: 'Paper Maps', fr: 'Cartes papier', es: 'Mapas en papel', ru: 'Бумажные карты', ar: 'الخرائط الورقية' },
  cadastre: { he: 'קדסטר', en: 'Cadastre', fr: 'Cadastre', es: 'Catastro', ru: 'Кадастр', ar: 'الكاداستر' },
  geodesy: { he: 'גיאודזיה', en: 'Geodesy', fr: 'Géodésie', es: 'Geodesia', ru: 'Геодезия', ar: 'الجيوديسيا' },
  orthophoto: { he: 'אורתופוטו וגבהים', en: 'Orthophoto & Elevation', fr: 'Orthophoto & Élévation', es: 'Ortofoto y Elevación', ru: 'Ортофото и высоты', ar: 'الصور الجوية والارتفاعات' },
  gis: { he: 'נתוני GIS', en: 'GIS Data', fr: 'Données GIS', es: 'Datos GIS', ru: 'Данные GIS', ar: 'بيانات GIS' },
  certificates: { he: 'תעודות', en: 'Certificates', fr: 'Certificats', es: 'Certificados', ru: 'Сертификаты', ar: 'الشهادات' }
};

const CUSTOMER_TYPE_TRANSLATIONS: Record<string, ServiceText> = {
  private: { he: 'אזרח פרטי', en: 'Private citizen', fr: 'Particulier', es: 'Ciudadano particular', ru: 'Частное лицо', ar: 'مواطن خاص' },
  business: { he: 'חברה עסקית', en: 'Business', fr: 'Entreprise', es: 'Empresa', ru: 'Бизнес', ar: 'شركة' },
  government: { he: 'ממשלה / רשות', en: 'Government / Authority', fr: 'Gouvernement / Autorité', es: 'Gobierno / Autoridad', ru: 'Правительство', ar: 'حكومة / سلطة' },
  surveyor: { he: 'מודד מוסמך', en: 'Licensed Surveyor', fr: 'Géomètre licencié', es: 'Topógrafo licenciado', ru: 'Лицензированный геодезист', ar: 'مساح معتمد' }
};

function pickTranslation(text: ServiceText | undefined, lang: Lang): string {
  if (!text) return '';
  return text[lang] || text.he || text.en || '';
}

export function getServiceName(slug: string, fallback: string, lang: Lang): string {
  const entry = SERVICE_TRANSLATIONS[slug];
  return pickTranslation(entry?.name, lang) || fallback;
}

export function getServiceShortDescription(slug: string, fallback: string, lang: Lang): string {
  const entry = SERVICE_TRANSLATIONS[slug];
  return pickTranslation(entry?.short, lang) || fallback;
}

export function getServiceCategoryLabel(slug: string, fallback: string, lang: Lang): string {
  const entry = SERVICE_TRANSLATIONS[slug];
  return pickTranslation(entry?.category, lang) || fallback;
}

export function getServiceDeliveryDays(slug: string, fallback: string, lang: Lang): string {
  const entry = SERVICE_TRANSLATIONS[slug];
  return pickTranslation(entry?.deliveryDays, lang) || fallback;
}

export function getCategoryLabel(category: string, fallback: string, lang: Lang): string {
  return pickTranslation(CATEGORY_TRANSLATIONS[category], lang) || fallback;
}

export function getCustomerTypeLabel(type: string, fallback: string, lang: Lang): string {
  return pickTranslation(CUSTOMER_TYPE_TRANSLATIONS[type], lang) || fallback;
}

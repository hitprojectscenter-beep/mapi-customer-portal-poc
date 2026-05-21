export type Lang = "he" | "en" | "fr" | "es" | "ru" | "ar";

export const LANGUAGES: { code: Lang; label: string; nativeLabel: string; dir: "rtl" | "ltr"; flag: string }[] = [
  { code: "he", label: "Hebrew", nativeLabel: "עברית", dir: "rtl", flag: "🇮🇱" },
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr", flag: "🇬🇧" },
  { code: "fr", label: "French", nativeLabel: "Français", dir: "ltr", flag: "🇫🇷" },
  { code: "es", label: "Spanish", nativeLabel: "Español", dir: "ltr", flag: "🇪🇸" },
  { code: "ru", label: "Russian", nativeLabel: "Русский", dir: "ltr", flag: "🇷🇺" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl", flag: "🇸🇦" }
];

export const RTL_LANGUAGES: Lang[] = ["he", "ar"];

type TranslationKeys =
  // Navigation
  | "nav.home" | "nav.catalog" | "nav.dashboard" | "nav.help" | "nav.login" | "nav.support" | "nav.skipToContent"
  // Header
  | "header.country" | "header.ministry" | "header.brandSub" | "header.openMenu" | "header.closeMenu"
  // Hero
  | "hero.badge" | "hero.titleLine1" | "hero.titleLine2" | "hero.searchPlaceholder" | "hero.searchBtn"
  | "hero.startOrder" | "hero.freeMap"
  // Sections
  | "services.eyebrow" | "services.title" | "services.subtitle" | "services.fromPrice" | "services.recommended"
  | "services.sendQuote" | "services.details" | "services.officialCatalog"
  | "stats.title" | "stats.subtitle" | "stats.queries" | "stats.professionals" | "stats.satisfaction" | "stats.uptime"
  | "categories.title"
  | "cta.ready" | "cta.subtitle" | "cta.loginNational" | "cta.browseFree"
  // News ticker
  | "news.label" | "news.hide" | "news.cta" | "news.badge.new" | "news.badge.promo" | "news.badge.update" | "news.badge.alert"
  // Footer
  | "footer.about" | "footer.quickLinks" | "footer.legal" | "footer.contact"
  | "footer.terms" | "footer.privacy" | "footer.accessibility" | "footer.mainSite"
  | "footer.address" | "footer.phone" | "footer.email" | "footer.copyright"
  // Login
  | "login.title" | "login.titleSub" | "login.intro" | "login.chooseMethod"
  | "login.national" | "login.nationalSub" | "login.sso" | "login.ssoSub" | "login.surveyor" | "login.surveyorSub"
  | "login.newToPortal" | "login.learnMore" | "login.problem" | "login.helpCenter"
  // Dashboard
  | "dash.welcome" | "dash.welcomeSub" | "dash.newOrder" | "dash.history"
  | "dash.kpi.active" | "dash.kpi.quotes" | "dash.kpi.subs" | "dash.kpi.done"
  | "dash.recentOrders" | "dash.allOrders" | "dash.notifications" | "dash.quickActions"
  // Orders
  | "orders.title" | "orders.newOrder" | "orders.filter.status" | "orders.filter.type"
  | "orders.filter.dateRange" | "orders.filter.search" | "orders.exportXls"
  | "orders.col.actions" | "orders.col.product" | "orders.col.amount" | "orders.col.status"
  | "orders.col.date" | "orders.col.service" | "orders.col.id"
  | "orders.action.view" | "orders.action.reorder" | "orders.action.invoice"
  | "orders.found" | "orders.prev" | "orders.next" | "orders.page"
  // Catalog
  | "catalog.title" | "catalog.subtitle" | "catalog.shown" | "catalog.officialBtn" | "catalog.mainSiteBtn"
  | "catalog.filter" | "catalog.clearAll" | "catalog.searchFree" | "catalog.cat" | "catalog.custType"
  | "catalog.maxPrice" | "catalog.onlyActive" | "catalog.activeNote"
  | "catalog.noResults" | "catalog.tryAgain"
  // Order form
  | "order.step.identification" | "order.step1" | "order.step2" | "order.step3" | "order.step4"
  | "order.next" | "order.back" | "order.cancel" | "order.continue"
  | "order.step1Title" | "order.step1Intro" | "order.size" | "order.includeOrtho"
  | "order.delivery" | "order.digital" | "order.physical" | "order.both" | "order.purpose"
  // Help
  | "help.title" | "help.subtitle" | "help.searchPlaceholder" | "help.callCenter" | "help.email" | "help.openCase"
  | "help.faqByCategory" | "help.notFound" | "help.notFoundSub" | "help.openCaseBtn"
  // Cases
  | "case.new" | "case.intro" | "case.hours" | "case.phone" | "case.emailLabel" | "case.autoReply"
  | "case.type" | "case.relatedOrder" | "case.subject" | "case.description" | "case.attach"
  | "case.urgency" | "case.regular" | "case.urgent" | "case.critical" | "case.submit"
  | "case.success" | "case.successSub" | "case.nextSteps"
  // AI Assistant
  | "ai.title" | "ai.online" | "ai.intro" | "ai.placeholder" | "ai.send" | "ai.suggested"
  | "ai.q1" | "ai.q2" | "ai.q3" | "ai.q4" | "ai.q5"
  | "ai.r.greeting" | "ai.r.maps" | "ai.r.cors" | "ai.r.surveyor" | "ai.r.order" | "ai.r.payment"
  | "ai.r.fallback" | "ai.r.delivery" | "ai.r.cancel" | "ai.r.refund"
  | "ai.typing" | "ai.you" | "ai.bot"
  // Quote Modal
  | "quote.title" | "quote.estimate" | "quote.delivery" | "quote.included"
  | "quote.requesterDetails" | "quote.firstName" | "quote.lastName" | "quote.email"
  | "quote.organization" | "quote.businessId" | "quote.notes" | "quote.notesPlaceholder"
  | "quote.privacyConsent" | "quote.privacyLink" | "quote.send" | "quote.cancel"
  | "quote.success" | "quote.successSub" | "quote.nextSteps" | "quote.done"
  // Support Modal
  | "support.title" | "support.subtitle" | "support.fullName" | "support.nationalId"
  | "support.phone" | "support.inquiryType" | "support.orderNum" | "support.subject"
  | "support.message" | "support.send" | "support.cancel" | "support.success"
  // Common
  | "common.required" | "common.optional" | "common.close" | "common.search" | "common.cancel" | "common.confirm";

const dict: Record<TranslationKeys, Record<Lang, string>> = {
  // Navigation
  "nav.home": { he: "בית", en: "Home", fr: "Accueil", es: "Inicio", ru: "Главная", ar: "الرئيسية" },
  "nav.catalog": { he: "קטלוג שירותים", en: "Service Catalog", fr: "Catalogue de Services", es: "Catálogo", ru: "Каталог услуг", ar: "كتالوج الخدمات" },
  "nav.dashboard": { he: "אזור אישי", en: "My Account", fr: "Espace personnel", es: "Mi cuenta", ru: "Личный кабинет", ar: "حسابي" },
  "nav.help": { he: "מרכז עזרה", en: "Help Center", fr: "Centre d'aide", es: "Centro de ayuda", ru: "Центр помощи", ar: "مركز المساعدة" },
  "nav.login": { he: "התחברות", en: "Sign In", fr: "Connexion", es: "Iniciar sesión", ru: "Войти", ar: "تسجيل الدخول" },
  "nav.support": { he: "פנייה למוקד", en: "Contact Support", fr: "Support", es: "Soporte", ru: "Поддержка", ar: "الدعم" },
  "nav.skipToContent": { he: "דלג לתוכן הראשי", en: "Skip to main content", fr: "Aller au contenu", es: "Saltar al contenido", ru: "Перейти к содержанию", ar: "تخطي إلى المحتوى" },

  // Header brand
  "header.country": { he: "מדינת ישראל", en: "State of Israel", fr: "État d'Israël", es: "Estado de Israel", ru: "Государство Израиль", ar: "دولة إسرائيل" },
  "header.ministry": { he: 'משרד הבינוי והשיכון', en: "Ministry of Construction", fr: "Min. de la Construction", es: "Min. de Construcción", ru: "Мин. строительства", ar: "وزارة البناء" },
  "header.brandSub": { he: 'המרכז למיפוי ישראל', en: "Survey of Israel", fr: "Cadastre d'Israël", es: "Cartografía de Israel", ru: "Картография Израиля", ar: "مركز رسم خرائط إسرائيل" },
  "header.openMenu": { he: 'פתח תפריט', en: "Open menu", fr: "Ouvrir le menu", es: "Abrir menú", ru: "Открыть меню", ar: "افتح القائمة" },
  "header.closeMenu": { he: 'סגור תפריט', en: "Close menu", fr: "Fermer le menu", es: "Cerrar menú", ru: "Закрыть меню", ar: "أغلق القائمة" },

  // Hero
  "hero.badge": { he: 'הפורטל הלאומי הרשמי למידע גיאוגרפי', en: "Israel's Official Geographic Portal", fr: "Portail Géographique Officiel", es: "Portal Geográfico Oficial", ru: "Официальный геопортал Израиля", ar: "البوابة الجغرافية الرسمية" },
  "hero.titleLine1": { he: 'העתיד של המידע', en: "The future of geographic", fr: "L'avenir des données", es: "El futuro de la información", ru: "Будущее географических", ar: "مستقبل المعلومات" },
  "hero.titleLine2": { he: 'הגיאוגרפי בידיים שלך', en: "data in your hands", fr: "géographiques entre vos mains", es: "geográfica en tus manos", ru: "данных в ваших руках", ar: "الجغرافية بين يديك" },
  "hero.searchPlaceholder": { he: 'חיפוש מפה, תצלום, קדסטר...', en: "Search maps, photos, cadastre...", fr: "Recherche cartes, photos...", es: "Buscar mapas, fotos...", ru: "Поиск карт, фото...", ar: "ابحث عن خرائط، صور..." },
  "hero.searchBtn": { he: 'חיפוש', en: "Search", fr: "Rechercher", es: "Buscar", ru: "Поиск", ar: "بحث" },
  "hero.startOrder": { he: 'התחל הזמנה', en: "Start Order", fr: "Commander", es: "Empezar", ru: "Заказать", ar: "ابدأ الطلب" },
  "hero.freeMap": { he: 'למפה החופשית', en: "Free Map (GovMap)", fr: "Carte gratuite", es: "Mapa libre", ru: "Бесплатная карта", ar: "خريطة مجانية" },

  // Services
  "services.eyebrow": { he: 'השירותים שלנו', en: "Our Services", fr: "Nos Services", es: "Nuestros Servicios", ru: "Наши услуги", ar: "خدماتنا" },
  "services.title": { he: 'דיוק ללא פשרות, בכל קנה מידה.', en: "Uncompromising precision, at any scale.", fr: "Précision sans compromis.", es: "Precisión absoluta a cualquier escala.", ru: "Бескомпромиссная точность.", ar: "دقة لا تتزحزح، على أي مقياس." },
  "services.subtitle": { he: 'גישה ישירה למאגרי המידע הממשלתיים המעודכנים ביותר עבור אנשי מקצוע ומוסדות.', en: "Direct access to the most up-to-date government data for professionals and institutions.", fr: "Accès direct aux données gouvernementales pour les professionnels.", es: "Acceso directo a los datos gubernamentales más actualizados.", ru: "Прямой доступ к актуальным государственным данным.", ar: "وصول مباشر إلى أحدث البيانات الحكومية للمهنيين والمؤسسات." },
  "services.fromPrice": { he: 'החל מ-', en: "From", fr: "À partir de", es: "Desde", ru: "От", ar: "ابتداء من" },
  "services.recommended": { he: 'מומלץ', en: "Recommended", fr: "Recommandé", es: "Recomendado", ru: "Рекомендуем", ar: "موصى به" },
  "services.sendQuote": { he: 'שלח הצעת מחיר', en: "Request Quote", fr: "Demander un devis", es: "Pedir presupuesto", ru: "Запросить цену", ar: "طلب عرض سعر" },
  "services.details": { he: 'פרטים', en: "Details", fr: "Détails", es: "Detalles", ru: "Подробнее", ar: "تفاصيل" },
  "services.officialCatalog": { he: 'לקטלוג המלא ב-gov.il', en: "Full catalog on gov.il", fr: "Catalogue complet sur gov.il", es: "Catálogo completo en gov.il", ru: "Полный каталог на gov.il", ar: "الكتالوج الكامل على gov.il" },

  // Stats
  "stats.title": { he: 'הסטנדרט הלאומי למצוינות גיאוגרפית', en: "The National Standard for Geographic Excellence", fr: "Le standard national d'excellence géographique", es: "El estándar nacional", ru: "Национальный стандарт", ar: "المعيار الوطني للتميز الجغرافي" },
  "stats.subtitle": { he: 'מערכות מפ"י משרתות את המשק הישראלי בדיוק חסר תקדים, תוך שימוש בטכנולוגיות המתקדמות בעולם.', en: "MAPI systems serve Israel's economy with unprecedented accuracy, using the world's most advanced technologies.", fr: "Les systèmes MAPI au service de l'économie israélienne.", es: "Sistemas MAPI al servicio de Israel con precisión sin precedentes.", ru: "Системы MAPI обслуживают экономику Израиля с беспрецедентной точностью.", ar: "أنظمة MAPI تخدم الاقتصاد الإسرائيلي بدقة لا مثيل لها." },
  "stats.queries": { he: 'שאילתות מידע בשנה', en: "Annual data queries", fr: "Requêtes annuelles", es: "Consultas anuales", ru: "Запросов в год", ar: "استعلام بيانات سنوياً" },
  "stats.professionals": { he: 'אנשי מקצוע רשומים', en: "Registered professionals", fr: "Professionnels inscrits", es: "Profesionales registrados", ru: "Зарегистрированных специалистов", ar: "محترف مسجل" },
  "stats.satisfaction": { he: 'שביעות רצון לקוחות', en: "Customer satisfaction", fr: "Satisfaction client", es: "Satisfacción del cliente", ru: "Удовлетворённости клиентов", ar: "رضا العملاء" },
  "stats.uptime": { he: 'זמינות הפורטל', en: "Portal uptime", fr: "Disponibilité du portail", es: "Disponibilidad", ru: "Доступность портала", ar: "توافر البوابة" },

  // Categories
  "categories.title": { he: 'קטלוג הקטגוריות', en: "Browse by Category", fr: "Parcourir par catégorie", es: "Buscar por categoría", ru: "По категориям", ar: "تصفح حسب الفئة" },

  // CTA
  "cta.ready": { he: 'מוכן להתחיל?', en: "Ready to start?", fr: "Prêt à commencer ?", es: "¿Listo para empezar?", ru: "Готовы начать?", ar: "هل أنت مستعد للبدء؟" },
  "cta.subtitle": { he: 'הצטרף לאלפי המודדים, המהנדסים ואנשי המקצוע שכבר עובדים עם הפורטל.', en: "Join thousands of surveyors, engineers and professionals already using the portal.", fr: "Rejoignez des milliers de professionnels.", es: "Únete a miles de profesionales.", ru: "Присоединяйтесь к тысячам профессионалов.", ar: "انضم إلى آلاف المهنيين." },
  "cta.loginNational": { he: 'התחבר עם הזדהות לאומית', en: "Sign in with National Identity", fr: "Connexion par identité nationale", es: "Iniciar con identidad nacional", ru: "Войти через National ID", ar: "تسجيل دخول بالهوية الوطنية" },
  "cta.browseFree": { he: 'עיין בקטלוג ללא הזדהות', en: "Browse without sign-in", fr: "Parcourir sans connexion", es: "Explorar sin iniciar sesión", ru: "Просмотр без входа", ar: "تصفح بدون تسجيل" },

  // News
  "news.label": { he: 'חדשות', en: "News", fr: "Actualités", es: "Noticias", ru: "Новости", ar: "أخبار" },
  "news.hide": { he: 'הסתר שורת חדשות', en: "Hide news bar", fr: "Masquer", es: "Ocultar", ru: "Скрыть", ar: "إخفاء شريط الأخبار" },
  "news.cta": { he: 'פרטים', en: "Details", fr: "Détails", es: "Detalles", ru: "Подробнее", ar: "تفاصيل" },
  "news.badge.new": { he: 'חדש', en: "New", fr: "Nouveau", es: "Nuevo", ru: "Новое", ar: "جديد" },
  "news.badge.promo": { he: 'מבצע', en: "Sale", fr: "Promo", es: "Oferta", ru: "Акция", ar: "عرض" },
  "news.badge.update": { he: 'עדכון', en: "Update", fr: "MAJ", es: "Actualizado", ru: "Обновление", ar: "تحديث" },
  "news.badge.alert": { he: 'התראה', en: "Alert", fr: "Alerte", es: "Alerta", ru: "Тревога", ar: "تنبيه" },

  // Footer
  "footer.about": { he: 'המרכז למיפוי ישראל הוא היחידה הממשלתית האחראית על תחומי המיפוי, המדידה, הגיאודזיה והקדסטר.', en: "The Survey of Israel is the government unit responsible for mapping, surveying, geodesy and cadastre.", fr: "Survey of Israel : l'unité gouvernementale pour la cartographie et le cadastre.", es: "Survey of Israel: unidad gubernamental de cartografía y catastro.", ru: "Картография Израиля - государственная служба картографии и кадастра.", ar: "مركز رسم خرائط إسرائيل - الوحدة الحكومية المسؤولة عن رسم الخرائط والمساحة." },
  "footer.quickLinks": { he: 'קישורים מהירים', en: "Quick Links", fr: "Liens rapides", es: "Enlaces rápidos", ru: "Быстрые ссылки", ar: "روابط سريعة" },
  "footer.legal": { he: 'מידע משפטי', en: "Legal", fr: "Mentions légales", es: "Legal", ru: "Юридическая", ar: "قانوني" },
  "footer.contact": { he: 'צור קשר', en: "Contact Us", fr: "Contactez-nous", es: "Contacto", ru: "Контакты", ar: "اتصل بنا" },
  "footer.terms": { he: 'תנאי שימוש', en: "Terms of Use", fr: "Conditions d'utilisation", es: "Términos", ru: "Условия", ar: "شروط الاستخدام" },
  "footer.privacy": { he: 'מדיניות פרטיות', en: "Privacy Policy", fr: "Confidentialité", es: "Privacidad", ru: "Конфиденциальность", ar: "الخصوصية" },
  "footer.accessibility": { he: 'הצהרת נגישות', en: "Accessibility", fr: "Accessibilité", es: "Accesibilidad", ru: "Доступность", ar: "إمكانية الوصول" },
  "footer.mainSite": { he: 'אתר מפ"י המלא', en: "Main MAPI website", fr: "Site principal MAPI", es: "Sitio principal", ru: "Главный сайт MAPI", ar: "الموقع الرئيسي" },
  "footer.address": { he: 'לינקולן 1, תל אביב', en: "1 Lincoln St., Tel Aviv", fr: "1 rue Lincoln, Tel Aviv", es: "Lincoln 1, Tel Aviv", ru: "Линкольн 1, Тель-Авив", ar: "لينكولن 1، تل أبيب" },
  "footer.phone": { he: 'מוקד תמיכה: *6274', en: "Support: *6274", fr: "Support : *6274", es: "Soporte: *6274", ru: "Поддержка: *6274", ar: "الدعم: *6274" },
  "footer.email": { he: 'service@mapi.gov.il', en: "service@mapi.gov.il", fr: "service@mapi.gov.il", es: "service@mapi.gov.il", ru: "service@mapi.gov.il", ar: "service@mapi.gov.il" },
  "footer.copyright": { he: '© 2026 המרכז למיפוי ישראל. כל הזכויות שמורות.', en: "© 2026 Survey of Israel. All rights reserved.", fr: "© 2026 Survey of Israel.", es: "© 2026 Survey of Israel.", ru: "© 2026 Survey of Israel.", ar: "© 2026 مركز رسم خرائط إسرائيل." },

  // Login
  "login.title": { he: 'כניסה לפורטל', en: "Sign in to portal", fr: "Connexion au portail", es: "Acceder al portal", ru: "Вход в портал", ar: "تسجيل الدخول إلى البوابة" },
  "login.titleSub": { he: 'המרכז למיפוי ישראל', en: "Survey of Israel", fr: "Survey of Israel", es: "Survey of Israel", ru: "Survey of Israel", ar: "مركز رسم خرائط إسرائيل" },
  "login.intro": { he: 'הזדהה באמצעות מערכת ההזדהות הלאומית כדי לגשת לאזור האישי שלך.', en: "Authenticate via National Identity to access your personal area.", fr: "Authentifiez-vous via l'identité nationale.", es: "Autentíquese mediante identidad nacional.", ru: "Войдите через национальную идентификацию.", ar: "سجل الدخول عبر الهوية الوطنية." },
  "login.chooseMethod": { he: 'בחר אופן הזדהות', en: "Choose sign-in method", fr: "Choisir une méthode", es: "Elija un método", ru: "Выберите способ", ar: "اختر طريقة" },
  "login.national": { he: 'הזדהות לאומית', en: "National Identity", fr: "Identité nationale", es: "Identidad nacional", ru: "National ID", ar: "الهوية الوطنية" },
  "login.nationalSub": { he: 'לכל אזרח ישראלי', en: "For all Israeli citizens", fr: "Pour citoyens israéliens", es: "Para ciudadanos israelíes", ru: "Для граждан Израиля", ar: "لجميع المواطنين الإسرائيليين" },
  "login.sso": { he: 'SSO ארגוני', en: "Organization SSO", fr: "SSO organisation", es: "SSO organizacional", ru: "Корпоративный SSO", ar: "تسجيل الدخول الموحد" },
  "login.ssoSub": { he: 'משרדי ממשלה ורשויות', en: "Government & municipalities", fr: "Ministères et autorités", es: "Ministerios", ru: "Министерства и власти", ar: "الوزارات والسلطات" },
  "login.surveyor": { he: 'מודד מוסמך', en: "Licensed Surveyor", fr: "Géomètre licencié", es: "Topógrafo licenciado", ru: "Лиц. геодезист", ar: "مساح معتمد" },
  "login.surveyorSub": { he: 'כניסה לאזור המקצועי', en: "Professional access", fr: "Accès professionnel", es: "Acceso profesional", ru: "Профессиональный доступ", ar: "وصول مهني" },
  "login.newToPortal": { he: 'חדש בפורטל?', en: "New to the portal?", fr: "Nouveau utilisateur ?", es: "¿Eres nuevo?", ru: "Новый пользователь?", ar: "جديد في البوابة؟" },
  "login.learnMore": { he: 'למד עוד על ההזדהות', en: "Learn about identity", fr: "En savoir plus", es: "Más información", ru: "Узнать больше", ar: "تعرف على الهوية" },
  "login.problem": { he: 'בעיה בהזדהות?', en: "Login problem?", fr: "Problème ?", es: "¿Problemas?", ru: "Проблема со входом?", ar: "مشكلة في تسجيل الدخول؟" },
  "login.helpCenter": { he: 'מרכז עזרה', en: "Help center", fr: "Centre d'aide", es: "Centro de ayuda", ru: "Центр помощи", ar: "مركز المساعدة" },

  // Dashboard
  "dash.welcome": { he: 'שלום, יוסי כהן', en: "Hello, John Doe", fr: "Bonjour, John Doe", es: "Hola, Juan Pérez", ru: "Здравствуйте, Иван", ar: "مرحبا، خالد" },
  "dash.welcomeSub": { he: 'לוח בקרה אישי - סיכום הפעילות שלך', en: "Personal dashboard - your activity summary", fr: "Tableau de bord personnel", es: "Tablero personal", ru: "Личная панель", ar: "لوحة التحكم الشخصية" },
  "dash.newOrder": { he: 'הזמן שירות חדש', en: "New Order", fr: "Nouvelle commande", es: "Nuevo pedido", ru: "Новый заказ", ar: "طلب جديد" },
  "dash.history": { he: 'היסטוריה', en: "History", fr: "Historique", es: "Historial", ru: "История", ar: "السجل" },
  "dash.kpi.active": { he: 'הזמנות פעילות', en: "Active orders", fr: "Commandes actives", es: "Pedidos activos", ru: "Активных заказов", ar: "طلبات نشطة" },
  "dash.kpi.quotes": { he: 'הצעות ממתינות', en: "Pending quotes", fr: "Devis en attente", es: "Cotizaciones", ru: "Ожидающих предложений", ar: "عروض معلقة" },
  "dash.kpi.subs": { he: 'מנויים פעילים', en: "Active subs", fr: "Abonnements", es: "Suscripciones", ru: "Подписок", ar: "الاشتراكات" },
  "dash.kpi.done": { he: 'הושלמו השנה', en: "Completed this year", fr: "Achevés cette année", es: "Completados", ru: "Завершено в году", ar: "مكتمل هذا العام" },
  "dash.recentOrders": { he: 'הזמנות אחרונות', en: "Recent orders", fr: "Commandes récentes", es: "Pedidos recientes", ru: "Последние заказы", ar: "الطلبات الأخيرة" },
  "dash.allOrders": { he: 'לכל ההזמנות', en: "All orders", fr: "Toutes les commandes", es: "Todos los pedidos", ru: "Все заказы", ar: "كل الطلبات" },
  "dash.notifications": { he: 'התראות', en: "Notifications", fr: "Notifications", es: "Notificaciones", ru: "Уведомления", ar: "التنبيهات" },
  "dash.quickActions": { he: 'פעולות מהירות', en: "Quick actions", fr: "Actions rapides", es: "Acciones", ru: "Быстрые действия", ar: "إجراءات سريعة" },

  // Orders
  "orders.title": { he: 'ההזמנות שלי', en: "My Orders", fr: "Mes commandes", es: "Mis pedidos", ru: "Мои заказы", ar: "طلباتي" },
  "orders.newOrder": { he: 'הזמנה חדשה', en: "New Order", fr: "Nouvelle commande", es: "Nuevo pedido", ru: "Новый заказ", ar: "طلب جديد" },
  "orders.filter.status": { he: 'סטטוס', en: "Status", fr: "Statut", es: "Estado", ru: "Статус", ar: "الحالة" },
  "orders.filter.type": { he: 'סוג מוצר', en: "Product type", fr: "Type", es: "Tipo", ru: "Тип", ar: "النوع" },
  "orders.filter.dateRange": { he: 'טווח תאריכים', en: "Date range", fr: "Plage de dates", es: "Rango", ru: "Период", ar: "نطاق التاريخ" },
  "orders.filter.search": { he: 'חיפוש חופשי', en: "Search", fr: "Recherche", es: "Buscar", ru: "Поиск", ar: "بحث" },
  "orders.exportXls": { he: 'ייצא Excel', en: "Export XLSX", fr: "Exporter Excel", es: "Exportar Excel", ru: "Экспорт", ar: "تصدير Excel" },
  "orders.col.actions": { he: 'פעולות', en: "Actions", fr: "Actions", es: "Acciones", ru: "Действия", ar: "الإجراءات" },
  "orders.col.product": { he: 'תוצר', en: "Deliverable", fr: "Livrable", es: "Entregable", ru: "Результат", ar: "المنتج" },
  "orders.col.amount": { he: 'סכום', en: "Amount", fr: "Montant", es: "Importe", ru: "Сумма", ar: "المبلغ" },
  "orders.col.status": { he: 'סטטוס', en: "Status", fr: "Statut", es: "Estado", ru: "Статус", ar: "الحالة" },
  "orders.col.date": { he: 'תאריך', en: "Date", fr: "Date", es: "Fecha", ru: "Дата", ar: "التاريخ" },
  "orders.col.service": { he: 'שירות', en: "Service", fr: "Service", es: "Servicio", ru: "Услуга", ar: "الخدمة" },
  "orders.col.id": { he: 'מס׳ הזמנה', en: "Order #", fr: "N° commande", es: "Nº pedido", ru: "№ заказа", ar: "رقم الطلب" },
  "orders.action.view": { he: 'צפה', en: "View", fr: "Voir", es: "Ver", ru: "Просмотр", ar: "عرض" },
  "orders.action.reorder": { he: 'הזמן שוב', en: "Reorder", fr: "Recommander", es: "Re-pedir", ru: "Повторить", ar: "أعد الطلب" },
  "orders.action.invoice": { he: 'חשבונית', en: "Invoice", fr: "Facture", es: "Factura", ru: "Счёт", ar: "فاتورة" },
  "orders.found": { he: 'הזמנות נמצאו', en: "orders found", fr: "commandes trouvées", es: "pedidos encontrados", ru: "заказов найдено", ar: "طلبات وجدت" },
  "orders.prev": { he: 'הקודם', en: "Previous", fr: "Précédent", es: "Anterior", ru: "Назад", ar: "السابق" },
  "orders.next": { he: 'הבא', en: "Next", fr: "Suivant", es: "Siguiente", ru: "Вперёд", ar: "التالي" },
  "orders.page": { he: 'עמוד', en: "Page", fr: "Page", es: "Página", ru: "Страница", ar: "صفحة" },

  // Catalog
  "catalog.title": { he: 'קטלוג כל שירותי המרכז למיפוי ישראל', en: "Survey of Israel Service Catalog", fr: "Catalogue des services MAPI", es: "Catálogo de servicios MAPI", ru: "Каталог услуг MAPI", ar: "كتالوج خدمات MAPI" },
  "catalog.subtitle": { he: '14 שירותים מקצועיים - מפות, קדסטר, גיאודזיה, אורתופוטו, GIS ותעודות.', en: "14 professional services - maps, cadastre, geodesy, orthophoto, GIS and certificates.", fr: "14 services professionnels.", es: "14 servicios profesionales.", ru: "14 профессиональных услуг.", ar: "14 خدمة احترافية." },
  "catalog.shown": { he: 'שירותים מוצגים', en: "services shown", fr: "services affichés", es: "servicios mostrados", ru: "услуг показано", ar: "خدمات معروضة" },
  "catalog.officialBtn": { he: 'לקטלוג הרשמי ב-gov.il', en: "Official catalog on gov.il", fr: "Catalogue officiel", es: "Catálogo oficial", ru: "Офиц. каталог", ar: "الكتالوج الرسمي" },
  "catalog.mainSiteBtn": { he: 'אתר מפ"י הרשמי', en: "Official MAPI site", fr: "Site officiel MAPI", es: "Sitio oficial MAPI", ru: "Офиц. сайт MAPI", ar: "موقع MAPI الرسمي" },
  "catalog.filter": { he: 'סינון', en: "Filter", fr: "Filtrer", es: "Filtrar", ru: "Фильтр", ar: "تصفية" },
  "catalog.clearAll": { he: 'נקה הכל', en: "Clear all", fr: "Tout effacer", es: "Limpiar", ru: "Очистить", ar: "مسح الكل" },
  "catalog.searchFree": { he: 'חיפוש חופשי', en: "Free search", fr: "Recherche libre", es: "Búsqueda libre", ru: "Поиск", ar: "بحث حر" },
  "catalog.cat": { he: 'קטגוריה', en: "Category", fr: "Catégorie", es: "Categoría", ru: "Категория", ar: "الفئة" },
  "catalog.custType": { he: 'סוג לקוח', en: "Customer type", fr: "Type de client", es: "Tipo cliente", ru: "Тип клиента", ar: "نوع العميل" },
  "catalog.maxPrice": { he: 'מחיר מקסימלי', en: "Max price", fr: "Prix max", es: "Precio máx.", ru: "Макс. цена", ar: "أقصى سعر" },
  "catalog.onlyActive": { he: 'רק שירותים פעילים בפורטל', en: "Only portal-active services", fr: "Services actifs", es: "Solo activos", ru: "Только активные", ar: "خدمات نشطة فقط" },
  "catalog.activeNote": { he: 'שירותים שטרם בתכולה - יפתחו ב-govforms', en: "Out-of-scope services open in govforms", fr: "Services hors-cadre dans govforms", es: "Otros se abren en govforms", ru: "Иначе - govforms", ar: "خدمات أخرى تُفتح في govforms" },
  "catalog.noResults": { he: 'לא נמצאו תוצאות', en: "No results found", fr: "Aucun résultat", es: "Sin resultados", ru: "Нет результатов", ar: "لا توجد نتائج" },
  "catalog.tryAgain": { he: 'נסה לשנות את הסינונים', en: "Try changing the filters", fr: "Modifier les filtres", es: "Cambia los filtros", ru: "Измените фильтры", ar: "غيّر المرشحات" },

  // Order form
  "order.step.identification": { he: 'הזדהות', en: "Sign-in", fr: "Connexion", es: "Acceso", ru: "Вход", ar: "تسجيل" },
  "order.step1": { he: 'פרטי הבקשה', en: "Order details", fr: "Détails", es: "Detalles", ru: "Детали заказа", ar: "تفاصيل الطلب" },
  "order.step2": { he: 'סימון אזור', en: "Mark area", fr: "Marquer la zone", es: "Marcar zona", ru: "Отметить район", ar: "تحديد المنطقة" },
  "order.step3": { he: 'אישור והצעת מחיר', en: "Confirm & Quote", fr: "Confirmation", es: "Confirmar", ru: "Подтверждение", ar: "تأكيد وعرض" },
  "order.step4": { he: 'תשלום', en: "Payment", fr: "Paiement", es: "Pago", ru: "Оплата", ar: "الدفع" },
  "order.next": { he: 'המשך', en: "Continue", fr: "Continuer", es: "Continuar", ru: "Далее", ar: "متابعة" },
  "order.back": { he: 'חזור', en: "Back", fr: "Retour", es: "Atrás", ru: "Назад", ar: "رجوع" },
  "order.cancel": { he: 'ביטול', en: "Cancel", fr: "Annuler", es: "Cancelar", ru: "Отмена", ar: "إلغاء" },
  "order.continue": { he: 'המשך', en: "Continue", fr: "Continuer", es: "Continuar", ru: "Далее", ar: "متابعة" },
  "order.step1Title": { he: 'פרטי הבקשה הבסיסיים', en: "Basic order details", fr: "Détails de base", es: "Detalles básicos", ru: "Основные данные", ar: "تفاصيل الطلب الأساسية" },
  "order.step1Intro": { he: 'בשלב זה תזין את הפרטים הבסיסיים של ההזמנה.', en: "Enter the basic order details.", fr: "Saisissez les détails de base.", es: "Ingresa los detalles básicos.", ru: "Введите основные данные.", ar: "أدخل التفاصيل الأساسية للطلب." },
  "order.size": { he: 'גודל מפה', en: "Map size", fr: "Taille de carte", es: "Tamaño", ru: "Размер карты", ar: "حجم الخريطة" },
  "order.includeOrtho": { he: 'כלול אורתופוטו?', en: "Include orthophoto?", fr: "Inclure orthophoto ?", es: "¿Incluir ortofoto?", ru: "Включить ортофото?", ar: "تضمين الصور الجوية؟" },
  "order.delivery": { he: 'אופן אספקה', en: "Delivery method", fr: "Mode de livraison", es: "Entrega", ru: "Доставка", ar: "طريقة التسليم" },
  "order.digital": { he: 'קובץ דיגיטלי', en: "Digital file", fr: "Fichier numérique", es: "Archivo digital", ru: "Цифровой файл", ar: "ملف رقمي" },
  "order.physical": { he: 'משלוח בדואר', en: "Postal delivery", fr: "Envoi postal", es: "Correo", ru: "Почта", ar: "بريد" },
  "order.both": { he: 'שניהם', en: "Both", fr: "Les deux", es: "Ambos", ru: "Оба", ar: "كلاهما" },
  "order.purpose": { he: 'מטרת השימוש', en: "Purpose of use", fr: "But d'usage", es: "Propósito", ru: "Цель", ar: "الغرض" },

  // Help
  "help.title": { he: 'מרכז העזרה', en: "Help Center", fr: "Centre d'aide", es: "Centro de ayuda", ru: "Центр помощи", ar: "مركز المساعدة" },
  "help.subtitle": { he: 'תשובות לשאלות הנפוצות אצל לקוחות מפ"י.', en: "Answers to MAPI customers' frequently asked questions.", fr: "Questions fréquentes des clients MAPI.", es: "Preguntas frecuentes.", ru: "Часто задаваемые вопросы.", ar: "أسئلة شائعة." },
  "help.searchPlaceholder": { he: 'איך אני יכול לעזור?', en: "How can I help?", fr: "Comment puis-je aider ?", es: "¿Cómo puedo ayudar?", ru: "Чем могу помочь?", ar: "كيف يمكنني المساعدة؟" },
  "help.callCenter": { he: 'מוקד טלפוני', en: "Call center", fr: "Centre d'appels", es: "Centro de llamadas", ru: "Колл-центр", ar: "مركز الاتصال" },
  "help.email": { he: 'מייל', en: "Email", fr: "Email", es: "Correo", ru: "Эл. почта", ar: "بريد" },
  "help.openCase": { he: 'פתח פנייה', en: "Open case", fr: "Nouveau ticket", es: "Abrir caso", ru: "Открыть обращение", ar: "افتح طلباً" },
  "help.faqByCategory": { he: 'שאלות נפוצות לפי קטגוריה', en: "FAQ by category", fr: "FAQ par catégorie", es: "FAQ por categoría", ru: "Часто задаваемые", ar: "أسئلة حسب الفئة" },
  "help.notFound": { he: 'לא מצאת תשובה?', en: "Didn't find your answer?", fr: "Pas de réponse ?", es: "¿No encontró?", ru: "Не нашли?", ar: "لم تجد الإجابة؟" },
  "help.notFoundSub": { he: 'צוות שירות הלקוחות שלנו ישמח לעזור.', en: "Our customer service team is happy to help.", fr: "Notre équipe vous aidera.", es: "Nuestro equipo le ayudará.", ru: "Наша команда поможет.", ar: "فريقنا سعيد بمساعدتك." },
  "help.openCaseBtn": { he: 'פתח פנייה חדשה', en: "Open new case", fr: "Nouveau ticket", es: "Nuevo caso", ru: "Создать обращение", ar: "افتح طلباً جديداً" },

  // Cases
  "case.new": { he: 'פתיחת פנייה חדשה', en: "Open new case", fr: "Nouveau ticket", es: "Nuevo caso", ru: "Новое обращение", ar: "طلب جديد" },
  "case.intro": { he: 'צריך עזרה? פתח פנייה לשירות הלקוחות.', en: "Need help? Open a case with customer service.", fr: "Besoin d'aide ?", es: "¿Necesita ayuda?", ru: "Нужна помощь?", ar: "هل تحتاج مساعدة؟" },
  "case.hours": { he: 'שעות פעילות', en: "Hours", fr: "Horaires", es: "Horario", ru: "Часы работы", ar: "ساعات العمل" },
  "case.phone": { he: 'טלפון מהיר', en: "Quick phone", fr: "Téléphone", es: "Teléfono", ru: "Телефон", ar: "هاتف" },
  "case.emailLabel": { he: 'מייל', en: "Email", fr: "Email", es: "Correo", ru: "Эл. почта", ar: "بريد" },
  "case.autoReply": { he: 'מענה אוטומטי', en: "Automatic answer", fr: "Réponse auto", es: "Respuesta auto", ru: "Авто-ответ", ar: "رد آلي" },
  "case.type": { he: 'סוג פנייה', en: "Inquiry type", fr: "Type", es: "Tipo", ru: "Тип", ar: "نوع" },
  "case.relatedOrder": { he: 'קשור להזמנה', en: "Related order", fr: "Commande liée", es: "Pedido relacionado", ru: "Связанный заказ", ar: "طلب مرتبط" },
  "case.subject": { he: 'כותרת הפנייה', en: "Case subject", fr: "Objet", es: "Asunto", ru: "Тема", ar: "الموضوع" },
  "case.description": { he: 'תיאור הפנייה', en: "Description", fr: "Description", es: "Descripción", ru: "Описание", ar: "الوصف" },
  "case.attach": { he: 'צירוף קבצים', en: "Attach files", fr: "Pièces jointes", es: "Adjuntar", ru: "Прикрепить", ar: "إرفاق ملفات" },
  "case.urgency": { he: 'דחיפות', en: "Urgency", fr: "Urgence", es: "Urgencia", ru: "Срочность", ar: "الأولوية" },
  "case.regular": { he: 'רגילה', en: "Normal", fr: "Normale", es: "Normal", ru: "Обычная", ar: "عادية" },
  "case.urgent": { he: 'דחופה', en: "Urgent", fr: "Urgent", es: "Urgente", ru: "Срочная", ar: "عاجلة" },
  "case.critical": { he: 'קריטית', en: "Critical", fr: "Critique", es: "Crítica", ru: "Критическая", ar: "حرجة" },
  "case.submit": { he: 'שלח פנייה', en: "Submit case", fr: "Envoyer", es: "Enviar", ru: "Отправить", ar: "إرسال" },
  "case.success": { he: 'הפנייה התקבלה!', en: "Case received!", fr: "Reçu !", es: "¡Recibido!", ru: "Получено!", ar: "تم الاستلام!" },
  "case.successSub": { he: 'צוות השירות יחזור אליך תוך 1-2 ימי עסקים.', en: "Customer service will respond within 1-2 business days.", fr: "Réponse sous 1-2 jours.", es: "Respuesta en 1-2 días.", ru: "Ответ в течение 1-2 дней.", ar: "الرد خلال 1-2 يوم." },
  "case.nextSteps": { he: 'מה הלאה?', en: "What's next?", fr: "Et après ?", es: "¿Próximos pasos?", ru: "Что дальше?", ar: "ما التالي؟" },

  // AI Assistant
  "ai.title": { he: 'מסייע AI חכם', en: "Smart AI Assistant", fr: "Assistant IA", es: "Asistente IA", ru: "ИИ помощник", ar: "مساعد ذكي" },
  "ai.online": { he: 'מחובר', en: "Online", fr: "En ligne", es: "En línea", ru: "В сети", ar: "متصل" },
  "ai.intro": { he: 'שלום! אני המסייע הדיגיטלי של מפ"י. אני יכול לעזור לך באיתור גוש וחלקה, הזמנת מפה, מצב הזמנות או כל שאלה אחרת.', en: "Hi! I'm MAPI's digital assistant. I can help you find parcels, order maps, check order status, and more.", fr: "Bonjour ! Je peux vous aider.", es: "¡Hola! Soy el asistente.", ru: "Здравствуйте! Я цифровой помощник MAPI.", ar: "مرحبا! أنا المساعد الرقمي." },
  "ai.placeholder": { he: 'הקלד שאלה...', en: "Type a question...", fr: "Tapez une question...", es: "Escribe...", ru: "Введите вопрос...", ar: "اكتب سؤالاً..." },
  "ai.send": { he: 'שלח', en: "Send", fr: "Envoyer", es: "Enviar", ru: "Отправить", ar: "إرسال" },
  "ai.suggested": { he: 'שאלות מוצעות', en: "Suggested questions", fr: "Questions suggérées", es: "Sugerencias", ru: "Предлагаемые вопросы", ar: "أسئلة مقترحة" },
  "ai.q1": { he: 'איך להזמין מפה?', en: "How do I order a map?", fr: "Comment commander ?", es: "¿Cómo pedir?", ru: "Как заказать?", ar: "كيف أطلب خريطة؟" },
  "ai.q2": { he: 'מה זה CORS?', en: "What is CORS?", fr: "Qu'est-ce que CORS ?", es: "¿Qué es CORS?", ru: "Что такое CORS?", ar: "ما هو CORS؟" },
  "ai.q3": { he: 'איפה הצעת המחיר שלי?', en: "Where's my quote?", fr: "Où est mon devis ?", es: "¿Mi cotización?", ru: "Где моё предложение?", ar: "أين عرض السعر؟" },
  "ai.q4": { he: 'איך מבטלים הזמנה?', en: "How to cancel an order?", fr: "Annuler ?", es: "¿Cancelar?", ru: "Как отменить?", ar: "كيف ألغي طلباً؟" },
  "ai.q5": { he: 'מהו זמן האספקה?', en: "What's the delivery time?", fr: "Délai de livraison ?", es: "¿Tiempo de entrega?", ru: "Сроки доставки?", ar: "وقت التسليم؟" },
  "ai.r.greeting": { he: 'שלום! במה אוכל לעזור היום?', en: "Hi! How can I help today?", fr: "Bonjour ! Comment puis-je aider ?", es: "¡Hola! ¿En qué puedo ayudar?", ru: "Здравствуйте! Чем помочь?", ar: "مرحبا! كيف أساعدك؟" },
  "ai.r.maps": { he: 'להזמנת מפה: גש לקטלוג, בחר את השירות, מלא את הטופס בן 4 השלבים. במידה ויש שאלות - אני כאן!', en: "To order a map: go to catalog, select the service, fill the 4-step form. Let me know if questions arise!", fr: "Pour commander une carte : allez au catalogue.", es: "Para pedir un mapa: vaya al catálogo.", ru: "Для заказа карты: перейдите в каталог.", ar: "لطلب خريطة: انتقل إلى الكتالوج." },
  "ai.r.cors": { he: 'CORS = רשת תחנות קבע ברמת דיוק מילימטרית. המנוי החודשי החל מ-₪300. מתאים למודדים, מהנדסים ופרויקטים תכנוניים.', en: "CORS = continuously operating reference stations, millimeter accuracy. Subscription from ₪300/month. Ideal for surveyors and engineers.", fr: "CORS : stations de référence, précision millimétrique. À partir de ₪300/mois.", es: "CORS: estaciones de referencia, precisión milimétrica.", ru: "CORS - сеть базовых станций, миллиметровая точность.", ar: "CORS: محطات مرجعية بدقة ميليمترية." },
  "ai.r.surveyor": { he: 'תהליך מודד מבקר אורך 10-21 ימי עסקים. תוכל להזמין דרך הקטלוג. הצעת המחיר תכלול את כל הפרטים.', en: "Surveyor inspector process: 10-21 business days. Order via the catalog and you'll get a detailed quote.", fr: "Géomètre inspecteur : 10-21 jours ouvrés.", es: "Topógrafo inspector: 10-21 días.", ru: "Геодезист-инспектор: 10-21 рабочий день.", ar: "المساح المفتش: 10-21 يوم عمل." },
  "ai.r.order": { he: 'תוכל לעקוב אחר ההזמנות שלך ב-"אזור אישי" → "ההזמנות שלי". כל שינוי סטטוס יתעדכן אוטומטית במייל ו-SMS.', en: "Track your orders in 'My Account' → 'My Orders'. You'll get email + SMS updates on status changes.", fr: "Suivez vos commandes dans 'Mon espace' → 'Mes commandes'.", es: "Siga sus pedidos en 'Mi cuenta' → 'Mis pedidos'.", ru: "Отслеживайте заказы в личном кабинете.", ar: "تتبع طلباتك في 'حسابي' → 'طلباتي'." },
  "ai.r.payment": { he: 'התשלום מתבצע דרך שרת התשלומים הממשלתי המאובטח. נתמכים: ויזה, מאסטרקארד, אמריקן אקספרס. חשבונית תישלח אוטומטית במייל.', en: "Payment goes through the government's secure server. Supports: Visa, Mastercard, Amex. Invoice arrives by email.", fr: "Paiement via le serveur sécurisé gouvernemental.", es: "Pago vía servidor seguro gubernamental.", ru: "Оплата через защищённый правительственный сервер.", ar: "الدفع عبر الخادم الحكومي الآمن." },
  "ai.r.fallback": { he: 'לא הבנתי את השאלה. נסה לנסח אחרת או פתח פנייה ב"מרכז העזרה".', en: "I didn't understand. Try rephrasing or open a case in the Help Center.", fr: "Je n'ai pas compris.", es: "No entiendo.", ru: "Не понял.", ar: "لم أفهم." },
  "ai.r.delivery": { he: 'זמני אספקה משתנים: מפה דיגיטלית 3-5 ימים, תצלום אוויר 5-10, מודד מבקר 10-21 ימים. הזמן המדויק מופיע בדף השירות.', en: "Delivery: digital map 3-5d, aerial photo 5-10d, surveyor 10-21d. Exact time on each service page.", fr: "Délais : carte numérique 3-5j.", es: "Entrega: mapa digital 3-5 días.", ru: "Сроки: цифровая карта 3-5 дней.", ar: "التسليم: خريطة رقمية 3-5 أيام." },
  "ai.r.cancel": { he: 'לביטול הזמנה לפני התחלת הטיפול - פתח פנייה ב"מרכז העזרה". לאחר תחילת הטיפול - פנה לשירות הלקוחות.', en: "To cancel before processing - open a case. After processing started - contact customer service.", fr: "Annulation avant traitement : ouvrez un ticket.", es: "Cancelar antes del proceso: abra un caso.", ru: "Отмена до обработки: создайте обращение.", ar: "للإلغاء قبل المعالجة: افتح طلباً." },
  "ai.r.refund": { he: 'החזרים: לפי תקנות החזרים של מפ"י. במידה ויש בעיה עם תוצר - פתח פנייה ונחזיר לך מענה תוך 1-2 ימים.', en: "Refunds: per MAPI policy. If there's an issue with delivery, open a case - we'll respond in 1-2 days.", fr: "Remboursements selon politique MAPI.", es: "Reembolsos: según política.", ru: "Возвраты: по политике MAPI.", ar: "الاسترداد حسب السياسة." },
  "ai.typing": { he: 'מקליד', en: "Typing", fr: "Écrit", es: "Escribiendo", ru: "Печатает", ar: "يكتب" },
  "ai.you": { he: 'אתה', en: "You", fr: "Vous", es: "Tú", ru: "Вы", ar: "أنت" },
  "ai.bot": { he: 'הבוט', en: "Assistant", fr: "Assistant", es: "Asistente", ru: "Ассистент", ar: "المساعد" },

  // Quote Modal
  "quote.title": { he: 'בקשת הצעת מחיר', en: "Quote Request", fr: "Demande de devis", es: "Solicitar presupuesto", ru: "Запрос предложения", ar: "طلب عرض سعر" },
  "quote.estimate": { he: 'מחיר משוער', en: "Estimated price", fr: "Prix estimé", es: "Precio estimado", ru: "Расчётная цена", ar: "السعر التقديري" },
  "quote.delivery": { he: 'זמן אספקה', en: "Delivery time", fr: "Délai", es: "Plazo", ru: "Сроки", ar: "وقت التسليم" },
  "quote.included": { he: 'מה כלול', en: "What's included", fr: "Inclus", es: "Incluido", ru: "Что включено", ar: "ما هو مدرج" },
  "quote.requesterDetails": { he: 'פרטי המבקש', en: "Requester details", fr: "Détails", es: "Datos", ru: "Данные заявителя", ar: "بيانات المتقدم" },
  "quote.firstName": { he: 'שם פרטי', en: "First name", fr: "Prénom", es: "Nombre", ru: "Имя", ar: "الاسم الأول" },
  "quote.lastName": { he: 'שם משפחה', en: "Last name", fr: "Nom", es: "Apellido", ru: "Фамилия", ar: "اسم العائلة" },
  "quote.email": { he: 'כתובת מייל', en: "Email", fr: "Email", es: "Correo", ru: "Эл. почта", ar: "البريد" },
  "quote.organization": { he: 'ארגון / חברה', en: "Organization", fr: "Organisation", es: "Organización", ru: "Организация", ar: "المنظمة" },
  "quote.businessId": { he: 'ח.פ. / ת.ז.', en: "Business / ID #", fr: "SIRET / ID", es: "ID empresa", ru: "ИНН/ID", ar: "رقم تجاري" },
  "quote.notes": { he: 'הערות נוספות', en: "Additional notes", fr: "Notes", es: "Notas", ru: "Примечания", ar: "ملاحظات" },
  "quote.notesPlaceholder": { he: 'למשל: גודל מסוים, אזור גיאוגרפי, פורמט מבוקש...', en: "e.g.: specific size, area, format...", fr: "ex. taille, zone, format...", es: "tamaño, zona, formato...", ru: "размер, область, формат...", ar: "الحجم، المنطقة..." },
  "quote.privacyConsent": { he: 'בלחיצה אני מאשר/ת את', en: "By clicking I agree to the", fr: "En cliquant j'accepte la", es: "Al hacer clic acepto la", ru: "Нажимая, я принимаю", ar: "بالنقر أوافق على" },
  "quote.privacyLink": { he: 'מדיניות הפרטיות', en: "Privacy Policy", fr: "Politique de confidentialité", es: "Política de privacidad", ru: "Политику конфиденциальности", ar: "سياسة الخصوصية" },
  "quote.send": { he: 'שלח בקשת הצעת מחיר', en: "Send quote request", fr: "Envoyer", es: "Enviar", ru: "Отправить запрос", ar: "إرسال الطلب" },
  "quote.cancel": { he: 'ביטול', en: "Cancel", fr: "Annuler", es: "Cancelar", ru: "Отмена", ar: "إلغاء" },
  "quote.success": { he: 'הבקשה נשלחה!', en: "Request sent!", fr: "Envoyé !", es: "¡Enviado!", ru: "Отправлено!", ar: "تم الإرسال!" },
  "quote.successSub": { he: 'נציג יחזור אליך עם הצעת מחיר מפורטת.', en: "A representative will reply with a detailed quote.", fr: "Un agent vous répondra.", es: "Un agente responderá.", ru: "Представитель свяжется с вами.", ar: "سيرد عليك مندوب." },
  "quote.nextSteps": { he: 'מה הלאה?', en: "What's next?", fr: "Et après ?", es: "¿Próximos pasos?", ru: "Что дальше?", ar: "ما التالي؟" },
  "quote.done": { he: 'סיום', en: "Done", fr: "Terminer", es: "Listo", ru: "Готово", ar: "تم" },

  // Support Modal
  "support.title": { he: 'פנייה למוקד מפ"י', en: "Contact MAPI Support", fr: "Contacter MAPI", es: "Contactar soporte", ru: "Связаться с MAPI", ar: "اتصل بدعم MAPI" },
  "support.subtitle": { he: 'הפנייה תועבר לעיבוד במערכת המוקד הארצית', en: "Your case will be processed by the national support system", fr: "Traité par le centre national", es: "Procesado por el centro nacional", ru: "Обработка в национальном центре", ar: "تتم المعالجة عبر المركز الوطني" },
  "support.fullName": { he: 'שם מלא', en: "Full name", fr: "Nom complet", es: "Nombre completo", ru: "Полное имя", ar: "الاسم الكامل" },
  "support.nationalId": { he: 'ת.ז.', en: "National ID", fr: "ID national", es: "ID nacional", ru: "Нац. ID", ar: "الهوية الوطنية" },
  "support.phone": { he: 'טלפון', en: "Phone", fr: "Téléphone", es: "Teléfono", ru: "Телефон", ar: "هاتف" },
  "support.inquiryType": { he: 'נושא הפנייה', en: "Inquiry type", fr: "Type", es: "Tipo", ru: "Тип", ar: "نوع" },
  "support.orderNum": { he: 'מספר הזמנה', en: "Order number", fr: "N° commande", es: "Nº pedido", ru: "№ заказа", ar: "رقم الطلب" },
  "support.subject": { he: 'נושא קצר', en: "Subject", fr: "Objet", es: "Asunto", ru: "Тема", ar: "الموضوع" },
  "support.message": { he: 'תיאור מפורט', en: "Detailed description", fr: "Description", es: "Descripción", ru: "Описание", ar: "وصف" },
  "support.send": { he: 'שלח פנייה למוקד', en: "Send to support", fr: "Envoyer au support", es: "Enviar al soporte", ru: "Отправить в поддержку", ar: "إرسال للدعم" },
  "support.cancel": { he: 'ביטול', en: "Cancel", fr: "Annuler", es: "Cancelar", ru: "Отмена", ar: "إلغاء" },
  "support.success": { he: 'הפנייה הועברה למוקד', en: "Case forwarded to support", fr: "Transmis", es: "Reenviado", ru: "Передано в поддержку", ar: "تم الإحالة للدعم" },

  // Common
  "common.required": { he: 'חובה', en: "Required", fr: "Requis", es: "Obligatorio", ru: "Обязательно", ar: "مطلوب" },
  "common.optional": { he: 'אופציונלי', en: "Optional", fr: "Facultatif", es: "Opcional", ru: "Опционально", ar: "اختياري" },
  "common.close": { he: 'סגור', en: "Close", fr: "Fermer", es: "Cerrar", ru: "Закрыть", ar: "إغلاق" },
  "common.search": { he: 'חיפוש', en: "Search", fr: "Recherche", es: "Buscar", ru: "Поиск", ar: "بحث" },
  "common.cancel": { he: 'ביטול', en: "Cancel", fr: "Annuler", es: "Cancelar", ru: "Отмена", ar: "إلغاء" },
  "common.confirm": { he: 'אישור', en: "Confirm", fr: "Confirmer", es: "Confirmar", ru: "Подтвердить", ar: "تأكيد" }
};

export type TKey = keyof typeof dict;

export function translate(key: TKey, lang: Lang): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[lang] || entry.he || key;
}

export const translations = dict;

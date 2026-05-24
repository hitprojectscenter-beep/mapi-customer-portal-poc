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
  // Service Card (added)
  | "service.fromPrice" | "service.govforms" | "service.externalNotice"
  // Order form steps (added)
  | "order.delivery.digital" | "order.delivery.physical" | "order.delivery.both"
  | "order.purposePlaceholder" | "order.markedArea" | "order.signNotice"
  | "order.howToMark" | "order.howToMarkSteps"
  | "order.size.label" | "order.includeOrtho.q"
  | "order.summary" | "order.editDetails" | "order.editArea"
  | "order.quote.title" | "order.quote.subtotal" | "order.quote.shipping"
  | "order.quote.vat" | "order.quote.total" | "order.quote.validity"
  | "order.quote.downloadPdf" | "order.quote.sendEmail"
  | "order.terms.terms" | "order.terms.quote"
  | "order.confirm.title" | "order.confirm.intro"
  | "order.confirm.nextSteps" | "order.confirm.proceedToPayment"
  // Dashboard (added)
  | "dash.kpi.trend.up" | "dash.allOrdersArrow" | "dash.col.id" | "dash.col.service"
  | "dash.col.date" | "dash.col.status" | "dash.col.amount" | "dash.col.actions"
  // Catalog filters
  | "catalog.priceRange.label" | "catalog.activeOnly.label" | "catalog.govformsNote"
  | "catalog.searchPlaceholder"
  // Help (added)
  | "help.search" | "help.callNumber" | "help.openCaseSub" | "help.faqCategoryAuth"
  | "help.faqCategoryOrders" | "help.faqCategoryProfessional" | "help.faqCategoryTechnical"
  // Cases (added)
  | "case.titleHero" | "case.intro2" | "case.type.tech" | "case.type.pro"
  | "case.type.order" | "case.type.finance" | "case.type.suggestion"
  | "case.relatedPlaceholder" | "case.titlePlaceholder" | "case.descPlaceholder"
  | "case.attachMax" | "case.successMore" | "case.successNext"
  // Common
  | "common.required" | "common.optional" | "common.close" | "common.search" | "common.cancel" | "common.confirm"
  | "common.back" | "common.delivery" | "common.yes" | "common.no" | "common.home" | "common.all"
  // Aria-hidden / hero data-vis
  | "hero.coord"
  // Dashboard extras
  | "dash.viewOrder" | "dash.downloadOrder" | "dash.viewOrderAria" | "dash.downloadOrderAria"
  | "dash.amount" | "dash.date"
  | "dash.quick.cors" | "dash.quick.corsTip"
  | "dash.quick.map" | "dash.quick.mapTip"
  | "dash.quick.case" | "dash.quick.caseTip"
  | "dash.quick.settings" | "dash.quick.settingsTip"
  // Notifications
  | "notif.corsExpiring" | "notif.corsCta"
  | "notif.quotePending" | "notif.quoteCta"
  | "notif.orderDone" | "notif.orderDoneCta"
  // Orders extras
  | "orders.crumb" | "orders.newOrderTip" | "orders.exportTip"
  | "orders.filterAll" | "orders.filterCompleted" | "orders.filterInProgress" | "orders.filterActive"
  | "orders.filterMaps" | "orders.filterGis"
  | "orders.dateRangePlaceholder" | "orders.searchPlaceholder"
  | "orders.viewTip" | "orders.reorderTip" | "orders.invoiceTip"
  | "orders.pageOf" | "orders.prevTip" | "orders.nextTip" | "orders.amountLabel" | "orders.dateLabel"
  // Order data labels
  | "order.status.completed" | "order.status.active" | "order.status.inProgress" | "order.status.cancelled"
  | "order.deliverable.pdf" | "order.deliverable.cors" | "order.deliverable.pending"
  | "order.deliverable.postal" | "order.deliverable.geojson"
  | "order.svc.customMapA2" | "order.svc.corsRtk" | "order.svc.aerial1973"
  | "order.svc.medMap" | "order.svc.gisParcels"
  // Service page extras
  | "svc.deliveryTime" | "svc.startOrder" | "svc.startOrderTip"
  | "svc.openGovforms" | "svc.openGovformsTip"
  | "svc.securityNote" | "svc.paymentNote"
  | "svc.exploreMap" | "svc.exploreMapSub" | "svc.exploreEyebrow"
  | "svc.pricesEyebrow" | "svc.pricesTitle" | "svc.path" | "svc.mapSize" | "svc.without" | "svc.with" | "svc.price"
  | "svc.faqEyebrow" | "svc.faqTitle"
  | "svc.ctaReady" | "svc.ctaSub" | "svc.startNow" | "svc.startNowTip"
  | "svc.catalogCrumb" | "svc.notFound" | "svc.notFoundBack"
  | "svc.notInScope" | "svc.notInScopeSub" | "svc.openForm" | "svc.bookingHint"
  // Order form extras
  | "of.stepOf" | "of.title" | "of.step1Hint" | "of.requiredHint"
  | "of.step2Heading" | "of.areaHint" | "of.selDetails" | "of.areaOk" | "of.areaArea" | "of.areaCenter"
  | "of.selPrompt" | "of.mapTitle" | "of.govmapTitle"
  | "of.sumTitle" | "of.svcType" | "of.svcSize" | "of.svcOrtho"
  | "of.svcDelivery" | "of.svcArea" | "of.svcArea1" | "of.requester" | "of.requesterName"
  | "of.acceptPayTip" | "of.acceptPaymentBtn" | "of.gotoGovPay"
  | "of.includesVat" | "of.includingOrtho"
  | "of.payTitle" | "of.payIntro" | "of.payAmount"
  | "of.nextSteps" | "of.next1" | "of.next2" | "of.next3" | "of.next4"
  | "of.simulatePay" | "of.simulateTip"
  // Help FAQ
  | "help.callTip" | "help.emailTip" | "help.caseTip" | "help.searchTip" | "help.openCaseTipBtn"
  | "faq.auth.q1" | "faq.auth.a1" | "faq.auth.q2" | "faq.auth.a2" | "faq.auth.q3" | "faq.auth.a3"
  | "faq.ord.q1" | "faq.ord.a1" | "faq.ord.q2" | "faq.ord.a2" | "faq.ord.q3" | "faq.ord.a3" | "faq.ord.q4" | "faq.ord.a4"
  | "faq.pro.q1" | "faq.pro.a1" | "faq.pro.q2" | "faq.pro.a2" | "faq.pro.q3" | "faq.pro.a3"
  | "faq.tech.q1" | "faq.tech.a1" | "faq.tech.q2" | "faq.tech.a2" | "faq.tech.q3" | "faq.tech.a3"
  // Cases extras
  | "case.receivedTitle" | "case.caseNum" | "case.respondTime"
  | "case.whatNextEmoji" | "case.next1" | "case.next2" | "case.next3"
  | "case.backToDash" | "case.openAnother"
  | "case.crumb" | "case.intro3" | "case.needHelpQ"
  | "case.hoursEmoji" | "case.hoursWeek" | "case.hoursFri"
  | "case.phoneEmoji" | "case.emailEmoji" | "case.autoEmoji"
  | "case.openSmartChat" | "case.openSmartChatTip"
  | "case.details" | "case.typePlaceholder"
  | "case.relatedLabel" | "case.relatedPlaceholder2"
  | "case.attachLabel" | "case.dropFiles" | "case.chooseFiles"
  | "case.urgencyLabel" | "case.cancelLabel" | "case.cancelTip" | "case.submitTip" | "case.submitBtn"
  | "case.mockOrder1" | "case.mockOrder2" | "case.mockOrder3"
  // Quote modal & service hover
  | "quote.cta"
  // Login features list (was per-language object)
  | "login.feat.security" | "login.feat.idCard" | "login.feat.history" | "login.feat.itStandard";

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

  // Service card extras
  "service.fromPrice": { he: 'החל מ-', en: 'From', fr: 'À partir de', es: 'Desde', ru: 'От', ar: 'ابتداء من' },
  "service.govforms": { he: 'govforms', en: 'govforms', fr: 'govforms', es: 'govforms', ru: 'govforms', ar: 'govforms' },
  "service.externalNotice": { he: 'שירות זה נפתח בטופס gov.il - אינו בתכולת הפורטל הראשונית', en: 'This service opens on gov.il (not yet in portal scope)', fr: 'Ce service ouvre sur gov.il', es: 'Este servicio abre en gov.il', ru: 'Эта услуга открывается на gov.il', ar: 'تفتح هذه الخدمة على gov.il' },

  // Order form
  "order.delivery.digital": { he: 'קובץ דיגיטלי', en: 'Digital file', fr: 'Fichier numérique', es: 'Archivo digital', ru: 'Цифровой файл', ar: 'ملف رقمي' },
  "order.delivery.physical": { he: 'משלוח בדואר', en: 'Postal delivery', fr: 'Envoi postal', es: 'Correo postal', ru: 'Почта', ar: 'بريد' },
  "order.delivery.both": { he: 'שניהם', en: 'Both', fr: 'Les deux', es: 'Ambos', ru: 'Оба', ar: 'كلاهما' },
  "order.purposePlaceholder": { he: 'לדוגמה: תכנון פרויקט בניה, מחקר אקדמי...', en: 'e.g.: planning a construction project, research...', fr: 'ex. planification de construction, recherche...', es: 'ej.: planificación de construcción, investigación...', ru: 'например: строительный проект, исследование...', ar: 'مثلاً: تخطيط مشروع بناء، بحث أكاديمي...' },
  "order.markedArea": { he: 'פרטי הסימון:', en: 'Selection details:', fr: 'Détails de la sélection:', es: 'Detalles de la selección:', ru: 'Детали выбора:', ar: 'تفاصيل التحديد:' },
  "order.signNotice": { he: 'יש לסמן אזור על המפה', en: 'Mark an area on the map', fr: 'Sélectionnez une zone sur la carte', es: 'Marca un área en el mapa', ru: 'Отметьте область на карте', ar: 'حدد منطقة على الخريطة' },
  "order.howToMark": { he: 'איך לסמן את האזור?', en: 'How to mark the area?', fr: 'Comment marquer la zone ?', es: '¿Cómo marcar el área?', ru: 'Как отметить область?', ar: 'كيف أحدد المنطقة؟' },
  "order.howToMarkSteps": { he: '1. נווט במפת GovMap למיקום הרצוי\n2. השתמש בכלי הסימון של GovMap לציור פוליגון\n3. לחץ "אשר אזור מסומן" למטה כשסיימת', en: '1. Navigate on GovMap to the desired location\n2. Use GovMap polygon-draw tool\n3. Click "Confirm area" below when done', fr: '1. Naviguez sur GovMap\n2. Utilisez l\'outil polygone\n3. Cliquez sur "Confirmer la zone"', es: '1. Navega en GovMap\n2. Usa la herramienta polígono\n3. Pulsa "Confirmar área"', ru: '1. Навигация на GovMap\n2. Инструмент полигона\n3. Подтвердите область', ar: '1. تنقل على GovMap\n2. استخدم أداة الرسم\n3. اضغط "تأكيد المنطقة"' },
  "order.size.label": { he: 'גודל מפה', en: 'Map size', fr: 'Taille de la carte', es: 'Tamaño del mapa', ru: 'Размер карты', ar: 'حجم الخريطة' },
  "order.includeOrtho.q": { he: 'כלול אורתופוטו?', en: 'Include orthophoto?', fr: 'Inclure orthophoto ?', es: '¿Incluir ortofoto?', ru: 'Включить ортофото?', ar: 'تضمين الصور الجوية؟' },
  "order.summary": { he: 'סיכום ההזמנה שלך', en: 'Your order summary', fr: 'Résumé de votre commande', es: 'Resumen del pedido', ru: 'Сводка заказа', ar: 'ملخص الطلب' },
  "order.editDetails": { he: 'ערוך פרטים', en: 'Edit details', fr: 'Modifier détails', es: 'Editar detalles', ru: 'Редактировать', ar: 'تعديل التفاصيل' },
  "order.editArea": { he: 'ערוך אזור', en: 'Edit area', fr: 'Modifier zone', es: 'Editar área', ru: 'Изменить область', ar: 'تعديل المنطقة' },
  "order.quote.title": { he: 'הצעת מחיר', en: 'Quote', fr: 'Devis', es: 'Cotización', ru: 'Предложение', ar: 'عرض سعر' },
  "order.quote.subtotal": { he: 'סכום ביניים', en: 'Subtotal', fr: 'Sous-total', es: 'Subtotal', ru: 'Промежуточный итог', ar: 'المجموع الفرعي' },
  "order.quote.shipping": { he: 'משלוח (דואר רשום)', en: 'Shipping (registered)', fr: 'Livraison (recommandée)', es: 'Envío (certificado)', ru: 'Доставка (заказное)', ar: 'الشحن (مسجل)' },
  "order.quote.vat": { he: 'מע"מ', en: 'VAT', fr: 'TVA', es: 'IVA', ru: 'НДС', ar: 'ضريبة القيمة المضافة' },
  "order.quote.total": { he: 'סה"כ לתשלום', en: 'Total to pay', fr: 'Total à payer', es: 'Total a pagar', ru: 'Итого к оплате', ar: 'الإجمالي' },
  "order.quote.validity": { he: 'תוקף הצעה: 30 ימים', en: 'Quote validity: 30 days', fr: 'Validité du devis : 30 jours', es: 'Validez: 30 días', ru: 'Срок действия: 30 дней', ar: 'مدة العرض: 30 يوماً' },
  "order.quote.downloadPdf": { he: 'הורד הצעת מחיר PDF', en: 'Download quote PDF', fr: 'Télécharger PDF', es: 'Descargar PDF', ru: 'Скачать PDF', ar: 'تنزيل PDF' },
  "order.quote.sendEmail": { he: 'שלח לעצמי במייל', en: 'Email it to me', fr: 'Envoyez-moi par email', es: 'Enviármelo por correo', ru: 'Отправить на почту', ar: 'أرسل إلى بريدي' },
  "order.terms.terms": { he: 'אני מאשר/ת את תנאי השימוש', en: 'I accept the terms of use', fr: 'J\'accepte les conditions', es: 'Acepto los términos', ru: 'Принимаю условия', ar: 'أوافق على الشروط' },
  "order.terms.quote": { he: 'אני מאשר/ת את הצעת המחיר', en: 'I accept the quote', fr: 'J\'accepte le devis', es: 'Acepto la cotización', ru: 'Принимаю предложение', ar: 'أوافق على العرض' },
  "order.confirm.title": { he: 'מעבר לתשלום', en: 'Proceed to payment', fr: 'Passer au paiement', es: 'Ir al pago', ru: 'Перейти к оплате', ar: 'الانتقال إلى الدفع' },
  "order.confirm.intro": { he: 'בלחיצה על הכפתור הבא תועבר/י לשרת התשלומים הממשלתי המאובטח.', en: 'You will be redirected to the government secure payment server.', fr: 'Vous serez redirigé vers le serveur de paiement sécurisé.', es: 'Serás redirigido al servidor de pago seguro.', ru: 'Вы будете перенаправлены на защищённый сервер оплаты.', ar: 'سيتم تحويلك إلى خادم الدفع الآمن.' },
  "order.confirm.nextSteps": { he: 'מה יקרה אחרי?', en: 'What happens next?', fr: 'Et après ?', es: '¿Qué pasa después?', ru: 'Что дальше?', ar: 'ما الذي يحدث بعد ذلك؟' },
  "order.confirm.proceedToPayment": { he: 'המשך לתשלום (סימולציה)', en: 'Continue to payment (simulation)', fr: 'Continuer (simulation)', es: 'Continuar al pago', ru: 'Продолжить (симуляция)', ar: 'متابعة الدفع (محاكاة)' },

  // Dashboard
  "dash.kpi.trend.up": { he: 'עליה', en: 'Up', fr: 'Hausse', es: 'Subida', ru: 'Рост', ar: 'صعود' },
  "dash.allOrdersArrow": { he: 'לכל ההזמנות ←', en: 'All orders →', fr: 'Toutes les commandes →', es: 'Todos los pedidos →', ru: 'Все заказы →', ar: 'كل الطلبات ←' },
  "dash.col.id": { he: 'מס\' הזמנה', en: 'Order #', fr: 'N° commande', es: 'Nº pedido', ru: '№ заказа', ar: 'رقم الطلب' },
  "dash.col.service": { he: 'שירות', en: 'Service', fr: 'Service', es: 'Servicio', ru: 'Услуга', ar: 'الخدمة' },
  "dash.col.date": { he: 'תאריך', en: 'Date', fr: 'Date', es: 'Fecha', ru: 'Дата', ar: 'التاريخ' },
  "dash.col.status": { he: 'סטטוס', en: 'Status', fr: 'Statut', es: 'Estado', ru: 'Статус', ar: 'الحالة' },
  "dash.col.amount": { he: 'סכום', en: 'Amount', fr: 'Montant', es: 'Importe', ru: 'Сумма', ar: 'المبلغ' },
  "dash.col.actions": { he: 'פעולות', en: 'Actions', fr: 'Actions', es: 'Acciones', ru: 'Действия', ar: 'الإجراءات' },

  // Catalog
  "catalog.priceRange.label": { he: 'מחיר מקסימלי', en: 'Max price', fr: 'Prix max', es: 'Precio máx.', ru: 'Макс. цена', ar: 'أقصى سعر' },
  "catalog.activeOnly.label": { he: 'רק שירותים פעילים בפורטל', en: 'Active services only', fr: 'Services actifs uniquement', es: 'Solo activos', ru: 'Только активные', ar: 'الخدمات النشطة فقط' },
  "catalog.govformsNote": { he: 'שירותים שטרם בתכולה - יפתחו ב-govforms', en: 'Out-of-scope services open in govforms', fr: 'Services hors cadre dans govforms', es: 'Otros se abren en govforms', ru: 'Иначе — в govforms', ar: 'الباقي يفتح في govforms' },
  "catalog.searchPlaceholder": { he: 'הקלד...', en: 'Type...', fr: 'Tapez...', es: 'Escribe...', ru: 'Введите...', ar: 'اكتب...' },

  // Help page
  "help.search": { he: 'חיפוש', en: 'Search', fr: 'Recherche', es: 'Buscar', ru: 'Поиск', ar: 'بحث' },
  "help.callNumber": { he: '*6274 | 03-9298853', en: '*6274 | +972-3-9298853', fr: '*6274 | +972-3-9298853', es: '*6274 | +972-3-9298853', ru: '*6274 | +972-3-9298853', ar: '*6274 | +972-3-9298853' },
  "help.openCaseSub": { he: 'מענה תוך 1-2 ימי עסקים', en: 'Response within 1-2 business days', fr: 'Réponse sous 1-2 jours', es: 'Respuesta en 1-2 días', ru: 'Ответ за 1-2 дня', ar: 'الرد خلال 1-2 يوم' },
  "help.faqCategoryAuth": { he: 'התחברות והזדהות', en: 'Login & Identity', fr: 'Connexion et identité', es: 'Inicio de sesión', ru: 'Вход и идентификация', ar: 'تسجيل الدخول والهوية' },
  "help.faqCategoryOrders": { he: 'הזמנות ותשלומים', en: 'Orders & Payments', fr: 'Commandes et paiements', es: 'Pedidos y pagos', ru: 'Заказы и оплата', ar: 'الطلبات والمدفوعات' },
  "help.faqCategoryProfessional": { he: 'שירותים מקצועיים', en: 'Professional Services', fr: 'Services professionnels', es: 'Servicios profesionales', ru: 'Профессиональные услуги', ar: 'الخدمات المهنية' },
  "help.faqCategoryTechnical": { he: 'טכני', en: 'Technical', fr: 'Technique', es: 'Técnico', ru: 'Технические', ar: 'تقني' },

  // Cases / Support form
  "case.titleHero": { he: 'פתיחת פנייה חדשה', en: 'Open new case', fr: 'Nouveau ticket', es: 'Abrir caso', ru: 'Создать обращение', ar: 'فتح طلب جديد' },
  "case.intro2": { he: 'צריך עזרה? פתח פנייה לשירות הלקוחות.', en: 'Need help? Open a case with customer service.', fr: 'Besoin d\'aide ? Ouvrez un ticket.', es: '¿Necesitas ayuda? Abre un caso.', ru: 'Нужна помощь? Создайте обращение.', ar: 'هل تحتاج مساعدة؟ افتح طلباً.' },
  "case.type.tech": { he: 'טכנית - תקלה בשירות', en: 'Technical - Service issue', fr: 'Technique - Problème', es: 'Técnico - Problema', ru: 'Технический - Проблема', ar: 'تقني - مشكلة' },
  "case.type.pro": { he: 'מקצועית - שאלת תוכן', en: 'Professional - Content question', fr: 'Professionnelle - Contenu', es: 'Profesional - Contenido', ru: 'Профессиональный - Контент', ar: 'مهني - سؤال محتوى' },
  "case.type.order": { he: 'הזמנה - בעיה עם הזמנה', en: 'Order - Issue with order', fr: 'Commande - Problème', es: 'Pedido - Problema', ru: 'Заказ - Проблема', ar: 'طلب - مشكلة' },
  "case.type.finance": { he: 'חשבונאית - תשלום/חשבונית', en: 'Finance - Payment/invoice', fr: 'Finance - Paiement/facture', es: 'Finanzas - Pago/factura', ru: 'Финансы - Платёж/счёт', ar: 'مالي - دفع/فاتورة' },
  "case.type.suggestion": { he: 'הצעה לשיפור', en: 'Suggestion', fr: 'Suggestion', es: 'Sugerencia', ru: 'Предложение', ar: 'اقتراح' },
  "case.relatedPlaceholder": { he: 'בחר הזמנה...', en: 'Select order...', fr: 'Choisir commande...', es: 'Elegir pedido...', ru: 'Выбрать заказ...', ar: 'اختر الطلب...' },
  "case.titlePlaceholder": { he: 'תיאור קצר של הבעיה...', en: 'Short description of the issue...', fr: 'Description courte du problème...', es: 'Descripción breve...', ru: 'Краткое описание...', ar: 'وصف موجز للمشكلة...' },
  "case.descPlaceholder": { he: 'תאר את הבעיה בפירוט...', en: 'Describe the issue in detail...', fr: 'Décrivez le problème en détail...', es: 'Describe el problema con detalle...', ru: 'Опишите проблему подробно...', ar: 'وصف المشكلة بالتفصيل...' },
  "case.attachMax": { he: 'מקסימום 25MB', en: 'Maximum 25MB', fr: 'Maximum 25 Mo', es: 'Máximo 25MB', ru: 'Максимум 25 МБ', ar: 'الحد الأقصى 25MB' },
  "case.successMore": { he: 'פתח פנייה נוספת', en: 'Open another case', fr: 'Ouvrir un autre ticket', es: 'Abrir otro caso', ru: 'Открыть ещё', ar: 'افتح طلباً آخر' },
  "case.successNext": { he: 'חזור לאזור אישי', en: 'Back to dashboard', fr: 'Retour au tableau de bord', es: 'Volver al panel', ru: 'Назад в кабинет', ar: 'العودة للوحة التحكم' },

  // Hero data-vis label
  "hero.coord": { he: 'קואורדינטות', en: 'COORDS', fr: 'COORDS', es: 'COORDS', ru: 'COORDS', ar: 'إحداثيات' },

  // Common
  "common.required": { he: 'חובה', en: "Required", fr: "Requis", es: "Obligatorio", ru: "Обязательно", ar: "مطلوب" },
  "common.optional": { he: 'אופציונלי', en: "Optional", fr: "Facultatif", es: "Opcional", ru: "Опционально", ar: "اختياري" },
  "common.close": { he: 'סגור', en: "Close", fr: "Fermer", es: "Cerrar", ru: "Закрыть", ar: "إغלاق" },
  "common.search": { he: 'חיפוש', en: "Search", fr: "Recherche", es: "Buscar", ru: "Поиск", ar: "بحث" },
  "common.cancel": { he: 'ביטול', en: "Cancel", fr: "Annuler", es: "Cancelar", ru: "Отмена", ar: "إلغاء" },
  "common.confirm": { he: 'אישור', en: "Confirm", fr: "Confirmer", es: "Confirmar", ru: "Подтвердить", ar: "تأكيد" },
  "common.back": { he: 'חזור', en: 'Back', fr: 'Retour', es: 'Atrás', ru: 'Назад', ar: 'رجوع' },
  "common.delivery": { he: 'אופן אספקה', en: 'Delivery method', fr: 'Mode de livraison', es: 'Método de entrega', ru: 'Способ доставки', ar: 'طريقة التسليم' },
  "common.yes": { he: 'כן', en: 'Yes', fr: 'Oui', es: 'Sí', ru: 'Да', ar: 'نعم' },
  "common.no": { he: 'לא', en: 'No', fr: 'Non', es: 'No', ru: 'Нет', ar: 'لا' },
  "common.home": { he: 'דף הבית', en: 'Home', fr: 'Accueil', es: 'Inicio', ru: 'Главная', ar: 'الرئيسية' },
  "common.all": { he: 'הכל', en: 'All', fr: 'Tout', es: 'Todos', ru: 'Все', ar: 'الكل' },

  // Dashboard extras
  "dash.viewOrder": { he: 'צפייה בפרטי ההזמנה', en: 'View order details', fr: 'Voir les détails', es: 'Ver detalles', ru: 'Просмотр деталей', ar: 'عرض تفاصيل الطلب' },
  "dash.downloadOrder": { he: 'הורדת תוצר/חשבונית להזמנה', en: 'Download deliverable / invoice', fr: 'Télécharger livrable / facture', es: 'Descargar entregable / factura', ru: 'Скачать результат / счёт', ar: 'تنزيل المنتج / الفاتورة' },
  "dash.viewOrderAria": { he: 'צפה בהזמנה', en: 'View order', fr: 'Voir la commande', es: 'Ver pedido', ru: 'Просмотр заказа', ar: 'عرض الطلب' },
  "dash.downloadOrderAria": { he: 'הורד הזמנה', en: 'Download order', fr: 'Télécharger commande', es: 'Descargar pedido', ru: 'Скачать заказ', ar: 'تنزيل الطلب' },
  "dash.amount": { he: 'סכום', en: 'Amount', fr: 'Montant', es: 'Importe', ru: 'Сумма', ar: 'المبلغ' },
  "dash.date": { he: 'תאריך', en: 'Date', fr: 'Date', es: 'Fecha', ru: 'Дата', ar: 'التاريخ' },
  "dash.quick.cors": { he: 'מנוי CORS חדש', en: 'New CORS subscription', fr: 'Abonnement CORS', es: 'Suscripción CORS', ru: 'Новая подписка CORS', ar: 'اشتراك CORS جديد' },
  "dash.quick.corsTip": { he: 'פתיחת מנוי לתחנות קבע - תיקוני RTK/VRS', en: 'Open CORS subscription - RTK/VRS corrections', fr: 'Ouvrir un abonnement CORS - corrections RTK/VRS', es: 'Abrir suscripción CORS - correcciones RTK/VRS', ru: 'Открыть подписку CORS - поправки RTK/VRS', ar: 'فتح اشتراك CORS - تصحيحات RTK/VRS' },
  "dash.quick.map": { he: 'הזמן מפה', en: 'Order map', fr: 'Commander une carte', es: 'Pedir mapa', ru: 'Заказать карту', ar: 'اطلب خريطة' },
  "dash.quick.mapTip": { he: 'הזמנת מפה בהתאמה אישית A4-A0', en: 'Custom map order A4-A0', fr: 'Commande de carte personnalisée A4-A0', es: 'Pedido de mapa personalizado A4-A0', ru: 'Заказ карты A4-A0', ar: 'طلب خريطة مخصصة A4-A0' },
  "dash.quick.case": { he: 'פתח פנייה', en: 'Open case', fr: 'Nouveau ticket', es: 'Abrir caso', ru: 'Открыть обращение', ar: 'افتح طلباً' },
  "dash.quick.caseTip": { he: 'פתיחת Case חדש לשירות הלקוחות', en: 'Open a new case with customer service', fr: 'Ouvrir un nouveau ticket', es: 'Abrir caso al servicio al cliente', ru: 'Создать обращение в сервис', ar: 'فتح طلب جديد لخدمة العملاء' },
  "dash.quick.settings": { he: 'הגדרות', en: 'Settings', fr: 'Paramètres', es: 'Ajustes', ru: 'Настройки', ar: 'الإعدادات' },
  "dash.quick.settingsTip": { he: 'ניהול פרופיל באתר gov.il', en: 'Manage profile on gov.il', fr: 'Gérer le profil sur gov.il', es: 'Gestionar perfil en gov.il', ru: 'Управление профилем на gov.il', ar: 'إدارة الملف الشخصي على gov.il' },

  // Notifications
  "notif.corsExpiring": { he: 'מנוי CORS שלך פג בעוד 14 ימים', en: 'Your CORS subscription expires in 14 days', fr: 'Votre abonnement CORS expire dans 14 jours', es: 'Tu suscripción CORS vence en 14 días', ru: 'Ваша подписка CORS истекает через 14 дней', ar: 'اشتراك CORS الخاص بك ينتهي خلال 14 يوماً' },
  "notif.corsCta": { he: 'חדש מנוי', en: 'Renew', fr: 'Renouveler', es: 'Renovar', ru: 'Продлить', ar: 'تجديد' },
  "notif.quotePending": { he: 'הצעת מחיר QT-2026-088 ממתינה לאישורך', en: 'Quote QT-2026-088 awaiting your approval', fr: 'Devis QT-2026-088 en attente de validation', es: 'Cotización QT-2026-088 pendiente de aprobación', ru: 'Предложение QT-2026-088 ожидает вашего одобрения', ar: 'عرض الأسعار QT-2026-088 بانتظار موافقتك' },
  "notif.quoteCta": { he: 'צפה', en: 'View', fr: 'Voir', es: 'Ver', ru: 'Смотреть', ar: 'عرض' },
  "notif.orderDone": { he: 'הזמנה ORD-2026-145 הושלמה', en: 'Order ORD-2026-145 completed', fr: 'Commande ORD-2026-145 terminée', es: 'Pedido ORD-2026-145 completado', ru: 'Заказ ORD-2026-145 завершён', ar: 'تم إكمال الطلب ORD-2026-145' },
  "notif.orderDoneCta": { he: 'הורד תוצר', en: 'Download', fr: 'Télécharger', es: 'Descargar', ru: 'Скачать', ar: 'تنزيل' },

  // Orders extras
  "orders.crumb": { he: 'ההזמנות שלי', en: 'My Orders', fr: 'Mes commandes', es: 'Mis pedidos', ru: 'Мои заказы', ar: 'طلباتي' },
  "orders.newOrderTip": { he: 'פתיחת קטלוג לבחירת שירות חדש', en: 'Open catalog to choose new service', fr: 'Ouvrir le catalogue', es: 'Abrir catálogo', ru: 'Открыть каталог', ar: 'افتح الكتالوج' },
  "orders.exportTip": { he: 'הורדת הטבלה כקובץ XLSX', en: 'Download table as XLSX', fr: 'Télécharger en XLSX', es: 'Descargar XLSX', ru: 'Скачать XLSX', ar: 'تنزيل XLSX' },
  "orders.filterAll": { he: 'הכל', en: 'All', fr: 'Tout', es: 'Todos', ru: 'Все', ar: 'الكل' },
  "orders.filterCompleted": { he: 'הושלמה', en: 'Completed', fr: 'Terminée', es: 'Completado', ru: 'Завершено', ar: 'مكتمل' },
  "orders.filterInProgress": { he: 'בטיפול', en: 'In progress', fr: 'En cours', es: 'En proceso', ru: 'В обработке', ar: 'قيد المعالجة' },
  "orders.filterActive": { he: 'פעיל', en: 'Active', fr: 'Actif', es: 'Activo', ru: 'Активный', ar: 'نشط' },
  "orders.filterMaps": { he: 'מפות', en: 'Maps', fr: 'Cartes', es: 'Mapas', ru: 'Карты', ar: 'الخرائط' },
  "orders.filterGis": { he: 'GIS', en: 'GIS', fr: 'GIS', es: 'GIS', ru: 'GIS', ar: 'GIS' },
  "orders.dateRangePlaceholder": { he: 'dd/mm/yyyy - dd/mm/yyyy', en: 'dd/mm/yyyy - dd/mm/yyyy', fr: 'jj/mm/aaaa - jj/mm/aaaa', es: 'dd/mm/aaaa - dd/mm/aaaa', ru: 'дд/мм/гггг - дд/мм/гггг', ar: 'يي/شش/سسسس' },
  "orders.searchPlaceholder": { he: 'לדוגמה: ORD-2026-145', en: 'e.g.: ORD-2026-145', fr: 'ex.: ORD-2026-145', es: 'ej.: ORD-2026-145', ru: 'напр.: ORD-2026-145', ar: 'مثال: ORD-2026-145' },
  "orders.viewTip": { he: 'צפייה בפרטי ההזמנה', en: 'View order details', fr: 'Voir les détails', es: 'Ver detalles', ru: 'Просмотр деталей', ar: 'عرض التفاصيل' },
  "orders.reorderTip": { he: 'הזמנה חוזרת של אותו שירות', en: 'Reorder the same service', fr: 'Recommander le même service', es: 'Volver a pedir', ru: 'Повторить заказ', ar: 'إعادة الطلب' },
  "orders.invoiceTip": { he: 'הורדת חשבונית/קבלה', en: 'Download invoice/receipt', fr: 'Télécharger facture/reçu', es: 'Descargar factura', ru: 'Скачать счёт/квитанцию', ar: 'تنزيل الفاتورة' },
  "orders.pageOf": { he: 'עמוד 1 מתוך 3', en: 'Page 1 of 3', fr: 'Page 1 sur 3', es: 'Página 1 de 3', ru: 'Страница 1 из 3', ar: 'صفحة 1 من 3' },
  "orders.prevTip": { he: 'עמוד קודם בהזמנות', en: 'Previous page', fr: 'Page précédente', es: 'Página anterior', ru: 'Предыдущая страница', ar: 'الصفحة السابقة' },
  "orders.nextTip": { he: 'עמוד הבא בהזמנות', en: 'Next page', fr: 'Page suivante', es: 'Página siguiente', ru: 'Следующая страница', ar: 'الصفحة التالية' },
  "orders.amountLabel": { he: 'סכום:', en: 'Amount:', fr: 'Montant :', es: 'Importe:', ru: 'Сумма:', ar: 'المبلغ:' },
  "orders.dateLabel": { he: 'תאריך:', en: 'Date:', fr: 'Date :', es: 'Fecha:', ru: 'Дата:', ar: 'التاريخ:' },

  // Order data status labels
  "order.status.completed": { he: 'הושלמה', en: 'Completed', fr: 'Terminée', es: 'Completado', ru: 'Завершено', ar: 'مكتمل' },
  "order.status.active": { he: 'פעיל (מנוי)', en: 'Active (subscription)', fr: 'Actif (abonnement)', es: 'Activo (suscripción)', ru: 'Активный (подписка)', ar: 'نشط (اشتراك)' },
  "order.status.inProgress": { he: 'בטיפול', en: 'In progress', fr: 'En cours', es: 'En proceso', ru: 'В обработке', ar: 'قيد المعالجة' },
  "order.status.cancelled": { he: 'בוטלה', en: 'Cancelled', fr: 'Annulée', es: 'Cancelado', ru: 'Отменён', ar: 'ملغى' },
  "order.deliverable.pdf": { he: 'PDF זמין להורדה', en: 'PDF available', fr: 'PDF disponible', es: 'PDF disponible', ru: 'PDF доступен', ar: 'PDF متاح' },
  "order.deliverable.cors": { he: 'הוראות חיבור', en: 'Connection instructions', fr: 'Instructions de connexion', es: 'Instrucciones de conexión', ru: 'Инструкции подключения', ar: 'تعليمات الاتصال' },
  "order.deliverable.pending": { he: 'ממתין', en: 'Pending', fr: 'En attente', es: 'Pendiente', ru: 'Ожидание', ar: 'بانتظار' },
  "order.deliverable.postal": { he: 'קבלת דואר', en: 'Postal delivery', fr: 'Livraison postale', es: 'Entrega postal', ru: 'Почтовая доставка', ar: 'تسليم بالبريد' },
  "order.deliverable.geojson": { he: 'GeoJSON', en: 'GeoJSON', fr: 'GeoJSON', es: 'GeoJSON', ru: 'GeoJSON', ar: 'GeoJSON' },
  "order.svc.customMapA2": { he: 'מפה בהתאמה אישית A2', en: 'Custom map A2', fr: 'Carte personnalisée A2', es: 'Mapa personalizado A2', ru: 'Карта A2 на заказ', ar: 'خريطة مخصصة A2' },
  "order.svc.corsRtk": { he: 'תחנות קבע - RTK', en: 'CORS - RTK', fr: 'CORS - RTK', es: 'CORS - RTK', ru: 'CORS - RTK', ar: 'CORS - RTK' },
  "order.svc.aerial1973": { he: 'תצלום אוויר 1973', en: 'Aerial photo 1973', fr: 'Photo aérienne 1973', es: 'Foto aérea 1973', ru: 'Аэрофото 1973', ar: 'صورة جوية 1973' },
  "order.svc.medMap": { he: 'מפת ים תיכון', en: 'Mediterranean map', fr: 'Carte méditerranéenne', es: 'Mapa Mediterráneo', ru: 'Карта Средиземноморья', ar: 'خريطة البحر المتوسط' },
  "order.svc.gisParcels": { he: 'שכבת GIS - גושים וחלקות', en: 'GIS layer - parcels', fr: 'Couche GIS - parcelles', es: 'Capa GIS - parcelas', ru: 'GIS слой - участки', ar: 'طبقة GIS - قطع الأراضي' },

  // Service page extras
  "svc.deliveryTime": { he: '⏱️ זמן אספקה', en: '⏱️ Delivery time', fr: '⏱️ Délai', es: '⏱️ Plazo', ru: '⏱️ Срок', ar: '⏱️ مدة التسليم' },
  "svc.startOrder": { he: 'התחל הזמנה', en: 'Start order', fr: 'Commander', es: 'Iniciar pedido', ru: 'Заказать', ar: 'ابدأ الطلب' },
  "svc.startOrderTip": { he: 'פתיחת טופס OmniScript - 4 שלבים: פרטים, מפה, הצעת מחיר, תשלום', en: 'OmniScript form - 4 steps: details, map, quote, payment', fr: 'OmniScript - 4 étapes', es: 'OmniScript - 4 pasos', ru: 'OmniScript - 4 шага', ar: 'OmniScript - 4 خطوات' },
  "svc.openGovforms": { he: 'פתח טופס ב-govforms', en: 'Open govforms', fr: 'Ouvrir govforms', es: 'Abrir govforms', ru: 'Открыть govforms', ar: 'افتح govforms' },
  "svc.openGovformsTip": { he: 'שירות זה לא בתכולה ראשונית של הפורטל - יפתח באתר gov.il', en: 'Out-of-scope service - opens on gov.il', fr: 'Service hors cadre - ouvre sur gov.il', es: 'Servicio fuera de alcance - se abre en gov.il', ru: 'Услуга вне рамок - открывается на gov.il', ar: 'خدمة خارج النطاق - تُفتح على gov.il' },
  "svc.securityNote": { he: '✓ אבטחת מידע ברמה הלאומית', en: '✓ National-grade security', fr: '✓ Sécurité nationale', es: '✓ Seguridad nacional', ru: '✓ Гос. безопасность', ar: '✓ أمن على مستوى الدولة' },
  "svc.paymentNote": { he: '✓ תשלום מאובטח', en: '✓ Secure payment', fr: '✓ Paiement sécurisé', es: '✓ Pago seguro', ru: '✓ Безопасная оплата', ar: '✓ دفع آمن' },
  "svc.exploreMap": { he: 'חקור את המפה', en: 'Explore the map', fr: 'Explorer la carte', es: 'Explorar el mapa', ru: 'Изучить карту', ar: 'استكشف الخريطة' },
  "svc.exploreMapSub": { he: 'עיין בשכבות הרלוונטיות לשירות זה דרך מערכת המפות הציבורית של ממשלת ישראל.', en: 'Browse layers relevant to this service via the government public map.', fr: 'Parcourez les couches via la carte publique gouvernementale.', es: 'Explora las capas mediante el mapa público gubernamental.', ru: 'Просмотрите слои через государственную публичную карту.', ar: 'تصفح الطبقات عبر خريطة الحكومة العامة.' },
  "svc.exploreEyebrow": { he: 'GovMap', en: 'GovMap', fr: 'GovMap', es: 'GovMap', ru: 'GovMap', ar: 'GovMap' },
  "svc.pricesEyebrow": { he: 'מחירון', en: 'Pricing', fr: 'Tarifs', es: 'Precios', ru: 'Прайс-лист', ar: 'قائمة الأسعار' },
  "svc.pricesTitle": { he: 'טבלת מחירים מפורטת', en: 'Detailed price table', fr: 'Tableau de prix détaillé', es: 'Tabla de precios detallada', ru: 'Подробная таблица цен', ar: 'جدول الأسعار التفصيلي' },
  "svc.path": { he: 'מסלול', en: 'Plan', fr: 'Plan', es: 'Plan', ru: 'Тариф', ar: 'الخطة' },
  "svc.mapSize": { he: 'גודל המפה', en: 'Map size', fr: 'Taille', es: 'Tamaño', ru: 'Размер', ar: 'الحجم' },
  "svc.without": { he: 'ללא אורתופוטו', en: 'Without orthophoto', fr: 'Sans orthophoto', es: 'Sin ortofoto', ru: 'Без ортофото', ar: 'بدون صور جوية' },
  "svc.with": { he: 'עם אורתופוטו', en: 'With orthophoto', fr: 'Avec orthophoto', es: 'Con ortofoto', ru: 'С ортофото', ar: 'مع صور جوية' },
  "svc.price": { he: 'מחיר', en: 'Price', fr: 'Prix', es: 'Precio', ru: 'Цена', ar: 'السعر' },
  "svc.faqEyebrow": { he: 'שאלות נפוצות', en: 'FAQ', fr: 'FAQ', es: 'FAQ', ru: 'FAQ', ar: 'الأسئلة الشائعة' },
  "svc.faqTitle": { he: 'FAQ', en: 'FAQ', fr: 'FAQ', es: 'FAQ', ru: 'FAQ', ar: 'FAQ' },
  "svc.ctaReady": { he: 'מוכן להתחיל את ההזמנה?', en: 'Ready to start your order?', fr: 'Prêt à commander ?', es: '¿Listo para pedir?', ru: 'Готовы заказать?', ar: 'مستعد للطلب؟' },
  "svc.ctaSub": { he: 'התהליך אורך פחות מ-10 דקות. הצעת המחיר תופק אוטומטית.', en: 'The process takes less than 10 minutes. The quote is auto-generated.', fr: 'Moins de 10 minutes. Devis automatique.', es: 'Menos de 10 min. Cotización automática.', ru: 'Менее 10 минут. Авто-предложение.', ar: 'أقل من 10 دقائق. عرض تلقائي.' },
  "svc.startNow": { he: 'התחל עכשיו', en: 'Start now', fr: 'Commencer', es: 'Comenzar', ru: 'Начать', ar: 'ابدأ الآن' },
  "svc.startNowTip": { he: 'פתיחת תהליך ההזמנה הדינמי', en: 'Open the dynamic order process', fr: 'Ouvrir le processus', es: 'Abrir el proceso', ru: 'Открыть процесс', ar: 'فتح عملية الطلب' },
  "svc.catalogCrumb": { he: 'קטלוג', en: 'Catalog', fr: 'Catalogue', es: 'Catálogo', ru: 'Каталог', ar: 'الكتالوج' },
  "svc.notFound": { he: 'שירות לא נמצא', en: 'Service not found', fr: 'Service introuvable', es: 'Servicio no encontrado', ru: 'Услуга не найдена', ar: 'الخدمة غير موجودة' },
  "svc.notFoundBack": { he: 'חזרה לקטלוג', en: 'Back to catalog', fr: 'Retour au catalogue', es: 'Volver al catálogo', ru: 'Назад в каталог', ar: 'العودة للكتالوج' },
  "svc.notInScope": { he: 'שירות זה אינו בתכולת הפורטל', en: 'Service not in portal scope', fr: 'Service hors cadre', es: 'Fuera de alcance', ru: 'Услуга вне рамок', ar: 'خدمة خارج النطاق' },
  "svc.notInScopeSub": { he: 'הזמנת השירות מתבצעת באמצעות מערכת govforms.', en: 'Order via govforms.', fr: 'Commande via govforms.', es: 'Pedido vía govforms.', ru: 'Заказ через govforms.', ar: 'الطلب عبر govforms.' },
  "svc.openForm": { he: 'פתח טופס', en: 'Open form', fr: 'Ouvrir le formulaire', es: 'Abrir formulario', ru: 'Открыть форму', ar: 'افتح النموذج' },
  "svc.bookingHint": { he: 'מוכן להתחיל את ההזמנה?', en: 'Ready to start the order?', fr: 'Prêt à commencer ?', es: '¿Listo?', ru: 'Готовы?', ar: 'مستعد؟' },

  // Order form extras
  "of.stepOf": { he: 'שלב {step} מתוך 4', en: 'Step {step} of 4', fr: 'Étape {step} sur 4', es: 'Paso {step} de 4', ru: 'Шаг {step} из 4', ar: 'الخطوة {step} من 4' },
  "of.title": { he: 'הזמנה', en: 'Order', fr: 'Commande', es: 'Pedido', ru: 'Заказ', ar: 'طلب' },
  "of.step1Hint": { he: 'בשלב זה תזין את הפרטים הבסיסיים של ההזמנה - גודל המפה, אם תרצה לכלול אורתופוטו, ואופן האספקה.', en: 'Enter the basic order details - map size, whether to include orthophoto, and delivery method.', fr: 'Détails de base : taille, orthophoto, livraison.', es: 'Detalles básicos: tamaño, ortofoto, entrega.', ru: 'Основные детали: размер, ортофото, доставка.', ar: 'التفاصيل الأساسية: الحجم، الصور الجوية، التسليم.' },
  "of.requiredHint": { he: 'כל השדות המסומנים בכוכבית (*) הם חובה.', en: 'All fields marked with (*) are required.', fr: 'Tous les champs marqués (*) sont requis.', es: 'Todos los campos marcados (*) son obligatorios.', ru: 'Все поля со (*) обязательны.', ar: 'جميع الحقول المُعلَّمة (*) مطلوبة.' },
  "of.step2Heading": { he: 'שלב 2: סימון אזור', en: 'Step 2: Mark area', fr: 'Étape 2 : zone', es: 'Paso 2: marcar área', ru: 'Шаг 2: отметить район', ar: 'الخطوة 2: تحديد المنطقة' },
  "of.areaHint": { he: 'סמן את האזור הגיאוגרפי על המפה. השטח המסומן יחושב אוטומטית בקמ"ר.', en: 'Mark the geographic area on the map. The area will be calculated automatically in sq km.', fr: 'Marquez la zone. Surface calculée auto.', es: 'Marca el área. Superficie auto.', ru: 'Отметьте область. Площадь авто.', ar: 'حدد المنطقة. تُحسب المساحة تلقائياً.' },
  "of.selDetails": { he: 'פרטי הסימון:', en: 'Marking details:', fr: 'Détails :', es: 'Detalles:', ru: 'Детали:', ar: 'التفاصيل:' },
  "of.areaOk": { he: '✓ הסימון תקין', en: '✓ Marking valid', fr: '✓ Marquage valide', es: '✓ Marca válida', ru: '✓ Метка верна', ar: '✓ التحديد صحيح' },
  "of.areaArea": { he: 'שטח: 1.2 קמ"ר', en: 'Area: 1.2 sq km', fr: 'Surface : 1,2 km²', es: 'Área: 1,2 km²', ru: 'Площадь: 1.2 км²', ar: 'المساحة: 1.2 كم²' },
  "of.areaCenter": { he: 'קואורדינטות מרכז: 32.0853, 34.7818', en: 'Center: 32.0853, 34.7818', fr: 'Centre : 32.0853, 34.7818', es: 'Centro: 32.0853, 34.7818', ru: 'Центр: 32.0853, 34.7818', ar: 'المركز: 32.0853, 34.7818' },
  "of.selPrompt": { he: 'יש לסמן אזור על המפה', en: 'Please mark an area on the map', fr: 'Veuillez marquer une zone', es: 'Marca un área', ru: 'Отметьте область', ar: 'حدد منطقة' },
  "of.mapTitle": { he: 'סימון האזור על המפה (GovMap)', en: 'Mark the area on the map (GovMap)', fr: 'Marquer la zone (GovMap)', es: 'Marca el área (GovMap)', ru: 'Отметить область (GovMap)', ar: 'تحديد المنطقة (GovMap)' },
  "of.govmapTitle": { he: 'GovMap - סימון אזור עבור', en: 'GovMap - mark area for', fr: 'GovMap - zone pour', es: 'GovMap - área para', ru: 'GovMap - область для', ar: 'GovMap - منطقة لـ' },
  "of.sumTitle": { he: 'סיכום ההזמנה שלך', en: 'Your order summary', fr: 'Résumé de la commande', es: 'Resumen del pedido', ru: 'Сводка заказа', ar: 'ملخص الطلب' },
  "of.svcType": { he: 'סוג שירות', en: 'Service type', fr: 'Type', es: 'Tipo', ru: 'Тип услуги', ar: 'نوع الخدمة' },
  "of.svcSize": { he: 'גודל מפה', en: 'Map size', fr: 'Taille', es: 'Tamaño', ru: 'Размер', ar: 'الحجم' },
  "of.svcOrtho": { he: 'אורתופוטו', en: 'Orthophoto', fr: 'Orthophoto', es: 'Ortofoto', ru: 'Ортофото', ar: 'صور جوية' },
  "of.svcDelivery": { he: 'אופן אספקה', en: 'Delivery', fr: 'Livraison', es: 'Entrega', ru: 'Доставка', ar: 'التسليم' },
  "of.svcArea": { he: 'אזור', en: 'Area', fr: 'Zone', es: 'Área', ru: 'Область', ar: 'المنطقة' },
  "of.svcArea1": { he: '1.2 קמ"ר במרכז תל אביב', en: '1.2 sq km in central Tel Aviv', fr: '1,2 km² centre Tel Aviv', es: '1,2 km² centro Tel Aviv', ru: '1.2 км² центр Тель-Авив', ar: '1.2 كم² وسط تل أبيب' },
  "of.requester": { he: 'מזמין', en: 'Requester', fr: 'Demandeur', es: 'Solicitante', ru: 'Заявитель', ar: 'مقدم الطلب' },
  "of.requesterName": { he: 'יוסי כהן | 012345678', en: 'John Doe | 012345678', fr: 'John Doe | 012345678', es: 'Juan Pérez | 012345678', ru: 'Иван Иванов | 012345678', ar: 'خالد أحمد | 012345678' },
  "of.acceptPayTip": { he: 'אשר את התנאים והצעת המחיר לפני התשלום', en: 'Accept terms and quote before payment', fr: 'Acceptez avant paiement', es: 'Acepta antes del pago', ru: 'Примите условия', ar: 'وافق قبل الدفع' },
  "of.acceptPaymentBtn": { he: '✓ אשר ועבור לתשלום', en: '✓ Confirm & pay', fr: '✓ Confirmer & payer', es: '✓ Confirmar y pagar', ru: '✓ Подтвердить и оплатить', ar: '✓ تأكيد والدفع' },
  "of.gotoGovPay": { he: 'מעבר לשרת התשלומים הממשלתי המאובטח', en: 'Go to secure government payment server', fr: 'Vers serveur gouvernemental', es: 'Al servidor gubernamental', ru: 'К государственному серверу', ar: 'إلى الخادم الحكومي' },
  "of.includesVat": { he: '(כולל מע"מ)', en: '(VAT included)', fr: '(TVA incluse)', es: '(IVA incluido)', ru: '(включая НДС)', ar: '(شامل الضريبة)' },
  "of.includingOrtho": { he: ' + אורתופוטו', en: ' + orthophoto', fr: ' + orthophoto', es: ' + ortofoto', ru: ' + ортофото', ar: ' + صور جوية' },
  "of.payTitle": { he: 'מעבר לתשלום', en: 'Proceed to payment', fr: 'Vers paiement', es: 'Ir al pago', ru: 'К оплате', ar: 'إلى الدفع' },
  "of.payIntro": { he: 'בלחיצה על הכפתור הבא תועבר/י לשרת התשלומים הממשלתי המאובטח.', en: 'Click the button to be redirected to the secure government payment server.', fr: 'Cliquez pour aller au paiement.', es: 'Haz clic para ir al pago.', ru: 'Нажмите для перехода к оплате.', ar: 'انقر للانتقال إلى الدفع.' },
  "of.payAmount": { he: 'סכום:', en: 'Amount:', fr: 'Montant :', es: 'Importe:', ru: 'Сумма:', ar: 'المبلغ:' },
  "of.nextSteps": { he: '📌 מה יקרה אחרי?', en: '📌 What happens next?', fr: '📌 Et après ?', es: '📌 ¿Qué sigue?', ru: '📌 Что дальше?', ar: '📌 ما التالي؟' },
  "of.next1": { he: 'תועבר/י לשרת התשלומים הממשלתי', en: 'You\'ll be redirected to gov payment server', fr: 'Redirection vers paiement', es: 'Te redirigirán', ru: 'Перенаправление на оплату', ar: 'سيتم تحويلك للدفع' },
  "of.next2": { he: 'בסיום התשלום - תוחזר/י לפורטל', en: 'After payment - back to portal', fr: 'Retour au portail', es: 'Vuelves al portal', ru: 'Возврат в портал', ar: 'العودة للبوابة' },
  "of.next3": { he: 'הזמנה תיווצר אוטומטית במערכת', en: 'Order created automatically', fr: 'Commande créée', es: 'Pedido creado', ru: 'Заказ создан', ar: 'يتم إنشاء الطلب' },
  "of.next4": { he: 'תקבל/י אישור במייל ובסמס', en: 'You\'ll get email + SMS confirmation', fr: 'Confirmation par e-mail & SMS', es: 'Confirmación e-mail + SMS', ru: 'Подтверждение e-mail + SMS', ar: 'تأكيد بالبريد + SMS' },
  "of.simulatePay": { he: 'המשך לתשלום (סימולציה)', en: 'Continue to payment (simulation)', fr: 'Continuer (simulation)', es: 'Continuar (simulación)', ru: 'Продолжить (симуляция)', ar: 'متابعة (محاكاة)' },
  "of.simulateTip": { he: 'ב-POC מדמה תשלום מוצלח וחוזר ללוח הבקרה', en: 'In POC simulates successful payment', fr: 'POC simule paiement', es: 'POC simula pago', ru: 'В POC моделирует оплату', ar: 'POC يحاكي الدفع' },

  // Help tips & FAQ content
  "help.callTip": { he: 'חיוג ישיר למוקד מפ"י', en: 'Direct call to MAPI support', fr: 'Appel direct au support MAPI', es: 'Llamada directa al soporte', ru: 'Прямой звонок в поддержку', ar: 'اتصال مباشر بدعم MAPI' },
  "help.emailTip": { he: 'שליחת מייל לשירות הלקוחות', en: 'Email customer service', fr: 'Envoyer e-mail au service', es: 'Enviar correo', ru: 'Отправить e-mail', ar: 'إرسال بريد للدعم' },
  "help.caseTip": { he: 'מעבר לטופס פתיחת Case חדש', en: 'Open a new case form', fr: 'Nouveau ticket', es: 'Nuevo caso', ru: 'Создать обращение', ar: 'فتح طلب جديد' },
  "help.searchTip": { he: 'חיפוש במאגר השאלות והמדריכים', en: 'Search FAQs and guides', fr: 'Rechercher FAQ et guides', es: 'Buscar FAQs y guías', ru: 'Поиск в базе', ar: 'بحث في الأسئلة والأدلة' },
  "help.openCaseTipBtn": { he: 'פתיחת Case חדש - מענה תוך 1-2 ימי עסקים', en: 'Open new case - reply in 1-2 business days', fr: 'Nouveau ticket - réponse 1-2 jours', es: 'Nuevo caso - respuesta 1-2 días', ru: 'Новое обращение - ответ 1-2 дня', ar: 'طلب جديد - رد خلال 1-2 يوم' },
  // Auth FAQ
  "faq.auth.q1": { he: 'איך אני מתחבר לפורטל?', en: 'How do I sign in to the portal?', fr: 'Comment me connecter ?', es: '¿Cómo iniciar sesión?', ru: 'Как войти в портал?', ar: 'كيف أسجل الدخول؟' },
  "faq.auth.a1": { he: 'כניסה מתבצעת באמצעות מערכת ההזדהות הלאומית של ממשלת ישראל. בדף הכניסה לחץ על "הזדהות לאומית" וזה יפנה אותך למערכת הזדהות עם ת.ז. וסיסמה / כרטיס חכם.', en: 'Sign in via Israel National Identity. Click "National Identity" on the login page and you\'ll be redirected to authenticate with ID + password / smart card.', fr: 'Authentification via l\'identité nationale d\'Israël.', es: 'Inicio mediante identidad nacional de Israel.', ru: 'Вход через национальную идентификацию Израиля.', ar: 'تسجيل الدخول عبر الهوية الوطنية.' },
  "faq.auth.q2": { he: 'האם אני חייב להזדהות בשביל לעיין בקטלוג?', en: 'Do I need to sign in to browse the catalog?', fr: 'Connexion obligatoire pour le catalogue ?', es: '¿Es necesario iniciar sesión para ver el catálogo?', ru: 'Нужен ли вход для просмотра каталога?', ar: 'هل التسجيل مطلوب لتصفح الكتالوج؟' },
  "faq.auth.a2": { he: 'לא! ניתן לעיין בקטלוג השירותים, לקרוא מידע ולהוריד מחירונים ללא הזדהות. הזדהות נדרשת רק עבור ביצוע הזמנה ושמירת היסטוריה.', en: 'No! You can browse the catalog, read info and download price lists without signing in. Authentication is only required for placing orders and saving history.', fr: 'Non ! Vous pouvez parcourir sans connexion.', es: '¡No! Puedes navegar sin sesión.', ru: 'Нет! Просмотр доступен без входа.', ar: 'لا! يمكنك التصفح بدون تسجيل.' },
  "faq.auth.q3": { he: 'שכחתי את הסיסמה - מה לעשות?', en: 'Forgot password - what now?', fr: 'Mot de passe oublié ?', es: '¿Olvidaste tu contraseña?', ru: 'Забыли пароль?', ar: 'نسيت كلمة المرور؟' },
  "faq.auth.a3": { he: 'הסיסמה מנוהלת על ידי מערכת ההזדהות הלאומית, לא על ידי מפ"י. יש לפנות לאתר ההזדהות הלאומית https://my.gov.il להחזרת סיסמה.', en: 'Password is managed by National Identity, not MAPI. Visit https://my.gov.il to recover it.', fr: 'Mot de passe géré par l\'identité nationale. Visitez https://my.gov.il', es: 'Contraseña gestionada por identidad nacional.', ru: 'Пароль управляется National Identity. См. https://my.gov.il', ar: 'كلمة المرور تُدار عبر الهوية الوطنية. زر https://my.gov.il' },
  // Orders FAQ
  "faq.ord.q1": { he: 'כמה זמן לוקח לקבל הזמנה?', en: 'How long does an order take?', fr: 'Délai de livraison ?', es: '¿Cuánto tarda un pedido?', ru: 'Сколько идёт заказ?', ar: 'كم يستغرق الطلب؟' },
  "faq.ord.a1": { he: 'זמני האספקה משתנים לפי סוג השירות. לדוגמה: מפה דיגיטלית - 3-5 ימי עסקים, תצלום אוויר - 5-10 ימים, מודד מבקר - 10-21 ימים. הזמן המדויק מוצג בדף השירות.', en: 'Delivery times vary by service. E.g.: digital map 3-5 days, aerial photo 5-10 days, surveyor inspector 10-21 days. Exact time on each service page.', fr: 'Délais variables : carte numérique 3-5 j, photo aérienne 5-10 j, géomètre 10-21 j.', es: 'Plazos: mapa digital 3-5d, foto aérea 5-10d, topógrafo 10-21d.', ru: 'Сроки разные: цифровая карта 3-5 дней, аэрофото 5-10, геодезист 10-21.', ar: 'الأوقات تختلف: خريطة رقمية 3-5، صور جوية 5-10، مساح 10-21 يوماً.' },
  "faq.ord.q2": { he: 'אילו אמצעי תשלום מתקבלים?', en: 'Which payment methods are accepted?', fr: 'Quels moyens de paiement ?', es: '¿Métodos de pago?', ru: 'Способы оплаты?', ar: 'طرق الدفع؟' },
  "faq.ord.a2": { he: 'התשלום מתבצע באמצעות שרת התשלומים הממשלתי המאובטח. ניתן לשלם בכרטיס אשראי (ויזה, מאסטרקארד, אמריקן אקספרס) או בהעברה בנקאית להזמנות גדולות.', en: 'Payment via secure gov server. Credit card (Visa, MC, Amex) or bank transfer for large orders.', fr: 'Paiement via serveur gouvernemental. CB ou virement.', es: 'Pago vía servidor gob. Tarjeta o transferencia.', ru: 'Оплата через гос. сервер. Карта или перевод.', ar: 'الدفع عبر الخادم الحكومي. بطاقة أو تحويل.' },
  "faq.ord.q3": { he: 'האם אקבל חשבונית מס?', en: 'Will I get a tax invoice?', fr: 'Recevrai-je une facture ?', es: '¿Recibiré factura?', ru: 'Получу ли я счёт?', ar: 'هل سأحصل على فاتورة؟' },
  "faq.ord.a3": { he: 'כן. חשבונית מס/קבלה תיווצר אוטומטית ותישלח למייל לאחר אישור התשלום. ניתן גם להוריד אותה מאזור "ההזמנות שלי".', en: 'Yes. Tax invoice/receipt is auto-generated and sent by email after payment. Also available in "My Orders".', fr: 'Oui, facture auto par e-mail.', es: 'Sí, factura automática por correo.', ru: 'Да, авто-счёт по e-mail.', ar: 'نعم، فاتورة تلقائية بالبريد.' },
  "faq.ord.q4": { he: 'האם ניתן לבטל הזמנה?', en: 'Can I cancel an order?', fr: 'Puis-je annuler ?', es: '¿Puedo cancelar?', ru: 'Можно ли отменить?', ar: 'هل يمكن الإلغاء؟' },
  "faq.ord.a4": { he: 'ניתן לבטל הזמנה לפני התחלת הטיפול בה. לאחר תחילת הטיפול - יש לפנות לשירות הלקוחות. החזר כספי יבוצע לפי תקנות החזרים של מפ"י.', en: 'Cancel before processing starts. After - contact customer service. Refund per MAPI policy.', fr: 'Annulation avant traitement.', es: 'Cancela antes del proceso.', ru: 'Отмена до начала обработки.', ar: 'الإلغاء قبل بدء المعالجة.' },
  // Professional FAQ
  "faq.pro.q1": { he: 'אני מודד - איך מקבלים רישוי?', en: 'I\'m a surveyor - how do I get licensed?', fr: 'Géomètre : comment se licencier ?', es: 'Topógrafo: ¿cómo obtener licencia?', ru: 'Геодезист: как получить лицензию?', ar: 'مساح: كيف أحصل على ترخيص؟' },
  "faq.pro.a1": { he: 'תהליך רישוי מודדים נעשה דרך טופס ייעודי. מומלץ לפנות לטופס "רישוי מודדים" בקטלוג. נדרשת הסמכה מקצועית והשתתפות בבחינות.', en: 'Licensing is done via a dedicated form in the catalog. Professional certification and exams required.', fr: 'Licence via formulaire dédié.', es: 'Licencia mediante formulario.', ru: 'Лицензия через спец. форму.', ar: 'الترخيص عبر نموذج مخصص.' },
  "faq.pro.q2": { he: 'מהו שירות CORS?', en: 'What is CORS?', fr: 'Qu\'est-ce que CORS ?', es: '¿Qué es CORS?', ru: 'Что такое CORS?', ar: 'ما هو CORS؟' },
  "faq.pro.a2": { he: 'CORS (Continuously Operating Reference Stations) - רשת תחנות קבע GNSS המספקות תיקוני מיקום בזמן אמת ברמת דיוק מילימטרית. מתאים למודדים, מהנדסים וחברות תכנון.', en: 'CORS = Continuously Operating Reference Stations. GNSS network providing real-time millimeter-accuracy corrections. For surveyors, engineers, planning firms.', fr: 'CORS : réseau GNSS de stations de référence.', es: 'CORS: red GNSS de estaciones.', ru: 'CORS - сеть GNSS станций.', ar: 'CORS: شبكة محطات GNSS مرجعية.' },
  "faq.pro.q3": { he: 'איך אני מזמין מפת תצ"ר?', en: 'How do I order a cadastre plan?', fr: 'Comment commander un plan cadastral ?', es: '¿Cómo pedir plano catastral?', ru: 'Как заказать план?', ar: 'كيف أطلب مخطط مساحي؟' },
  "faq.pro.a3": { he: 'מפות תצ"ר (תכנית לצרכי רישום) מסופקות לאחר ביקורת של מודד מבקר. ניתן להזמין את השירות דרך הקטלוג, סעיף "מודד מבקר".', en: 'Cadastre plans are delivered after surveyor-inspector review. Order via catalog under "Surveyor Inspector".', fr: 'Plans après revue géomètre.', es: 'Planes tras revisión.', ru: 'Планы после проверки.', ar: 'المخططات بعد المراجعة.' },
  // Technical FAQ
  "faq.tech.q1": { he: 'באילו דפדפנים תומך הפורטל?', en: 'Which browsers are supported?', fr: 'Quels navigateurs ?', es: '¿Navegadores compatibles?', ru: 'Какие браузеры?', ar: 'أي متصفحات؟' },
  "faq.tech.a1": { he: 'הפורטל תומך בדפדפנים מודרניים: Chrome, Firefox, Edge, Safari. מומלץ להשתמש בגרסה עדכנית. הפורטל מותאם גם למובייל וטאבלט.', en: 'Modern browsers: Chrome, Firefox, Edge, Safari. Latest version recommended. Mobile + tablet ready.', fr: 'Chrome, Firefox, Edge, Safari.', es: 'Chrome, Firefox, Edge, Safari.', ru: 'Chrome, Firefox, Edge, Safari.', ar: 'Chrome, Firefox, Edge, Safari.' },
  "faq.tech.q2": { he: 'האם הפורטל נגיש?', en: 'Is the portal accessible?', fr: 'Le portail est-il accessible ?', es: '¿Es accesible?', ru: 'Доступен ли портал?', ar: 'هل البوابة متاحة لذوي الإعاقة؟' },
  "faq.tech.a2": { he: 'כן. הפורטל עומד בתקן WCAG 2.1 ברמה AA כנדרש לפי תקנות שוויון זכויות לאנשים עם מוגבלות. תומך בקוראי מסך, ניווט במקלדת והגדלת טקסט.', en: 'Yes. WCAG 2.1 AA compliant. Screen readers, keyboard nav, text zoom supported.', fr: 'Oui, WCAG 2.1 AA.', es: 'Sí, WCAG 2.1 AA.', ru: 'Да, WCAG 2.1 AA.', ar: 'نعم، يلبي WCAG 2.1 AA.' },
  "faq.tech.q3": { he: 'אילו פורמטים של קבצים מסופקים?', en: 'Which file formats are delivered?', fr: 'Quels formats de fichiers ?', es: '¿Qué formatos?', ru: 'Какие форматы файлов?', ar: 'أي صيغ ملفات؟' },
  "faq.tech.a3": { he: 'תלוי בשירות: PDF (מסמכים), GeoTIFF (תצלומי אוויר ואורתופוטו), Shapefile/GeoJSON/GPKG (נתוני GIS), DWG/DXF (תכניות מודדים).', en: 'Depends on service: PDF (docs), GeoTIFF (aerial + ortho), Shapefile/GeoJSON/GPKG (GIS), DWG/DXF (surveyor plans).', fr: 'Selon service : PDF, GeoTIFF, Shapefile, DWG.', es: 'Según servicio: PDF, GeoTIFF, Shapefile, DWG.', ru: 'PDF, GeoTIFF, Shapefile, DWG.', ar: 'PDF، GeoTIFF، Shapefile، DWG.' },

  // Cases extras
  "case.receivedTitle": { he: 'הפנייה התקבלה!', en: 'Case received!', fr: 'Ticket reçu !', es: '¡Caso recibido!', ru: 'Обращение получено!', ar: 'تم استلام الطلب!' },
  "case.caseNum": { he: 'מספר הפנייה שלך:', en: 'Your case number:', fr: 'Votre n° de ticket :', es: 'Tu número de caso:', ru: 'Ваш номер обращения:', ar: 'رقم طلبك:' },
  "case.respondTime": { he: 'צוות השירות יחזור אליך תוך 1-2 ימי עסקים.', en: 'The team will reply within 1-2 business days.', fr: 'Réponse sous 1-2 jours.', es: 'Respuesta en 1-2 días.', ru: 'Ответ за 1-2 дня.', ar: 'الرد خلال 1-2 يوم.' },
  "case.whatNextEmoji": { he: '📌 מה הלאה?', en: '📌 What\'s next?', fr: '📌 Et après ?', es: '📌 ¿Qué sigue?', ru: '📌 Что дальше?', ar: '📌 ما التالي؟' },
  "case.next1": { he: 'קיבלת אישור במייל', en: 'You\'ll get an email confirmation', fr: 'Confirmation par e-mail', es: 'Recibirás confirmación por correo', ru: 'Вы получите подтверждение по e-mail', ar: 'ستتلقى تأكيداً بالبريد' },
  "case.next2": { he: 'תוכל לעקוב אחר הפנייה ב"הפניות שלי"', en: 'Track your case in "My Cases"', fr: 'Suivez dans "Mes tickets"', es: 'Sigue en "Mis casos"', ru: 'Отслеживайте в "Мои обращения"', ar: 'تابع في "طلباتي"' },
  "case.next3": { he: 'נציג יחזור אליך לפי סדר עדיפויות', en: 'A representative will reply by priority order', fr: 'Un agent répondra par priorité', es: 'Un agente responderá', ru: 'Ответят по приоритету', ar: 'سيرد المندوب حسب الأولوية' },
  "case.backToDash": { he: 'חזור לאזור אישי', en: 'Back to dashboard', fr: 'Retour au tableau de bord', es: 'Volver al panel', ru: 'Назад в кабинет', ar: 'العودة للوحة التحكم' },
  "case.openAnother": { he: 'פתח פנייה נוספת', en: 'Open another case', fr: 'Ouvrir un autre', es: 'Abrir otro caso', ru: 'Открыть ещё', ar: 'فتح طلب آخر' },
  "case.crumb": { he: 'פנייה חדשה', en: 'New case', fr: 'Nouveau ticket', es: 'Nuevo caso', ru: 'Новое обращение', ar: 'طلب جديد' },
  "case.intro3": { he: 'צריך עזרה? פתח פנייה לשירות הלקוחות.', en: 'Need help? Open a case with customer service.', fr: 'Besoin d\'aide ?', es: '¿Necesitas ayuda?', ru: 'Нужна помощь?', ar: 'هل تحتاج مساعدة؟' },
  "case.needHelpQ": { he: 'צריך עזרה?', en: 'Need help?', fr: 'Besoin d\'aide ?', es: '¿Necesitas ayuda?', ru: 'Нужна помощь?', ar: 'هل تحتاج مساعدة؟' },
  "case.hoursEmoji": { he: '🕐 שעות פעילות:', en: '🕐 Hours:', fr: '🕐 Horaires :', es: '🕐 Horario:', ru: '🕐 Часы:', ar: '🕐 ساعات العمل:' },
  "case.hoursWeek": { he: 'א\'-ה\': 08:00-17:00', en: 'Sun-Thu: 08:00-17:00', fr: 'Dim-Jeu : 08h00-17h00', es: 'Dom-Jue: 08:00-17:00', ru: 'Вс-Чт: 08:00-17:00', ar: 'الأحد-الخميس: 08:00-17:00' },
  "case.hoursFri": { he: 'שישי: סגור', en: 'Friday: closed', fr: 'Vendredi : fermé', es: 'Viernes: cerrado', ru: 'Пятница: закрыто', ar: 'الجمعة: مغلق' },
  "case.phoneEmoji": { he: '📞 טלפון מהיר:', en: '📞 Quick phone:', fr: '📞 Téléphone :', es: '📞 Teléfono:', ru: '📞 Телефон:', ar: '📞 الهاتف:' },
  "case.emailEmoji": { he: '📧 מייל:', en: '📧 Email:', fr: '📧 E-mail :', es: '📧 Correo:', ru: '📧 E-mail:', ar: '📧 البريد:' },
  "case.autoEmoji": { he: '⚡ מענה אוטומטי:', en: '⚡ Automatic answer:', fr: '⚡ Réponse auto :', es: '⚡ Respuesta auto:', ru: '⚡ Авто-ответ:', ar: '⚡ رد آلي:' },
  "case.openSmartChat": { he: 'פתח צ\'אט תמיכה חכם', en: 'Open smart support chat', fr: 'Ouvrir chat intelligent', es: 'Abrir chat inteligente', ru: 'Открыть умный чат', ar: 'افتح المحادثة الذكية' },
  "case.openSmartChatTip": { he: 'פתיחת חלונית הצ\'אט החכם מימין למטה', en: 'Open the smart chat (bottom-right)', fr: 'Ouvrir le chat', es: 'Abrir el chat', ru: 'Открыть чат', ar: 'افتح المحادثة' },
  "case.details": { he: 'פרטי הפנייה', en: 'Case details', fr: 'Détails du ticket', es: 'Detalles del caso', ru: 'Детали обращения', ar: 'تفاصيل الطلب' },
  "case.typePlaceholder": { he: 'בחר סוג...', en: 'Select type...', fr: 'Choisir...', es: 'Seleccionar tipo...', ru: 'Выбрать тип...', ar: 'اختر النوع...' },
  "case.relatedLabel": { he: 'קשור להזמנה (אופציונלי)', en: 'Related order (optional)', fr: 'Commande liée (facult.)', es: 'Pedido relacionado (opc.)', ru: 'Связанный заказ (опц.)', ar: 'طلب مرتبط (اختياري)' },
  "case.relatedPlaceholder2": { he: 'בחר הזמנה...', en: 'Select order...', fr: 'Choisir commande...', es: 'Seleccionar pedido...', ru: 'Выбрать заказ...', ar: 'اختر الطلب...' },
  "case.attachLabel": { he: 'צירוף קבצים (אופציונלי)', en: 'Attach files (optional)', fr: 'Pièces jointes (facult.)', es: 'Adjuntar archivos (opc.)', ru: 'Прикрепить файлы (опц.)', ar: 'إرفاق ملفات (اختياري)' },
  "case.dropFiles": { he: 'גרור קבצים לכאן או', en: 'Drag files here or', fr: 'Glisser-déposer ou', es: 'Arrastra archivos o', ru: 'Перетащите файлы или', ar: 'اسحب الملفات أو' },
  "case.chooseFiles": { he: 'בחר קבצים', en: 'choose files', fr: 'choisir', es: 'elegir', ru: 'выберите', ar: 'اختر' },
  "case.urgencyLabel": { he: 'דחיפות', en: 'Urgency', fr: 'Urgence', es: 'Urgencia', ru: 'Срочность', ar: 'الأولوية' },
  "case.cancelLabel": { he: 'ביטול', en: 'Cancel', fr: 'Annuler', es: 'Cancelar', ru: 'Отмена', ar: 'إلغاء' },
  "case.cancelTip": { he: 'ביטול הפנייה וחזרה לאזור האישי', en: 'Cancel and back to dashboard', fr: 'Annuler', es: 'Cancelar', ru: 'Отмена', ar: 'إلغاء' },
  "case.submitTip": { he: 'שליחת הפנייה - מספר Case יתקבל מיד', en: 'Submit case - number issued immediately', fr: 'Envoyer le ticket', es: 'Enviar caso', ru: 'Отправить обращение', ar: 'إرسال الطلب' },
  "case.submitBtn": { he: 'שלח פנייה', en: 'Submit case', fr: 'Envoyer', es: 'Enviar', ru: 'Отправить', ar: 'إرسال' },
  "case.mockOrder1": { he: 'ORD-2026-145 - מפה A2', en: 'ORD-2026-145 - A2 map', fr: 'ORD-2026-145 - carte A2', es: 'ORD-2026-145 - mapa A2', ru: 'ORD-2026-145 - карта A2', ar: 'ORD-2026-145 - خريطة A2' },
  "case.mockOrder2": { he: 'ORD-2026-098 - תחנות קבע', en: 'ORD-2026-098 - CORS stations', fr: 'ORD-2026-098 - CORS', es: 'ORD-2026-098 - CORS', ru: 'ORD-2026-098 - CORS', ar: 'ORD-2026-098 - CORS' },
  "case.mockOrder3": { he: 'ORD-2026-052 - תצלום אוויר', en: 'ORD-2026-052 - aerial photo', fr: 'ORD-2026-052 - photo aérienne', es: 'ORD-2026-052 - foto aérea', ru: 'ORD-2026-052 - аэрофото', ar: 'ORD-2026-052 - صور جوية' },

  // Quote modal extra
  "quote.cta": { he: 'שלח הצעת מחיר', en: 'Send quote', fr: 'Envoyer devis', es: 'Enviar cotización', ru: 'Отправить', ar: 'إرسال' },

  // Login features
  "login.feat.security": { he: 'אבטחה ברמת המדינה (SAML 2.0)', en: 'State-level security (SAML 2.0)', fr: 'Sécurité d\'État (SAML 2.0)', es: 'Seguridad de Estado (SAML 2.0)', ru: 'Гос. безопасность (SAML 2.0)', ar: 'أمان على مستوى الدولة (SAML 2.0)' },
  "login.feat.idCard": { he: 'התחברות עם ת.ז. + סיסמה / כרטיס חכם', en: 'Login with national ID + password / smart card', fr: 'Connexion par ID national + mot de passe', es: 'Acceso con ID nacional + contraseña', ru: 'Вход по нац. ID + пароль / смарт-карта', ar: 'دخول بالهوية + كلمة مرور' },
  "login.feat.history": { he: 'שמירה אוטומטית של ההזמנות שלך', en: 'Automatic order history sync', fr: 'Synchro automatique des commandes', es: 'Sincronización automática', ru: 'Авто-синхронизация заказов', ar: 'مزامنة الطلبات تلقائياً' },
  "login.feat.itStandard": { he: 'תקני יה"ב 5.35', en: 'Compliant with IT-Security 5.35', fr: 'Conforme IT-Security 5.35', es: 'Conforme IT-Security 5.35', ru: 'Стандарт IT-Security 5.35', ar: 'متوافق مع IT-Security 5.35' }
};

export type TKey = keyof typeof dict;

export function translate(key: TKey, lang: Lang): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[lang] || entry.he || key;
}

export const translations = dict;

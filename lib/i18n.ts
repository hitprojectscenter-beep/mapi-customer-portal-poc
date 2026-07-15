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
  | "login.feat.security" | "login.feat.idCard" | "login.feat.history" | "login.feat.itStandard"
  // Customer Segments (new sales-driven navigation)
  | "nav.segments" | "nav.admin"
  | "seg.title" | "seg.subtitle" | "seg.eyebrow" | "seg.choose"
  | "seg.citizen.name" | "seg.citizen.short" | "seg.citizen.desc"
  | "seg.surveyor.name" | "seg.surveyor.short" | "seg.surveyor.desc"
  | "seg.municipality.name" | "seg.municipality.short" | "seg.municipality.desc"
  | "seg.government.name" | "seg.government.short" | "seg.government.desc"
  | "seg.professional.name" | "seg.professional.short" | "seg.professional.desc"
  | "seg.business.name" | "seg.business.short" | "seg.business.desc"
  | "seg.popular" | "seg.entry" | "seg.tier" | "seg.tierCitizen" | "seg.tierPro" | "seg.tierEnterprise" | "seg.tierGov"
  | "seg.relevantServices" | "seg.specialPricing" | "seg.dedicatedContact" | "seg.contracts" | "seg.benefits"
  | "seg.startHere" | "seg.talkToSales" | "seg.exampleSavings" | "seg.discount"
  | "seg.contractsMulti" | "seg.contractsMultiSub" | "seg.subscriptionBenefit" | "seg.priorityChannel"
  | "seg.includedKpis" | "seg.customSla" | "seg.dedicatedAccountMgr"
  | "seg.useCase" | "seg.useCases" | "seg.salesContact" | "seg.requestProposal" | "seg.bookMeeting"
  // Admin / Internal Sales Tool
  | "admin.title" | "admin.subtitle" | "admin.welcomeBack"
  | "admin.module.pricing" | "admin.module.approvals" | "admin.module.subscriptions"
  | "admin.module.sales" | "admin.module.content" | "admin.module.dashboard"
  | "admin.module.pricingSub" | "admin.module.approvalsSub" | "admin.module.subscriptionsSub"
  | "admin.module.salesSub" | "admin.module.contentSub"
  | "admin.kpi.revenueYtd" | "admin.kpi.pipeline" | "admin.kpi.winRate" | "admin.kpi.pendingApprovals"
  | "admin.kpi.activeSubs" | "admin.kpi.renewalsDue" | "admin.kpi.avgDealSize" | "admin.kpi.salesCycle"
  // Pricing module
  | "price.title" | "price.subtitle" | "price.search" | "price.newRule" | "price.import" | "price.export"
  | "price.col.service" | "price.col.segment" | "price.col.basePrice" | "price.col.discount"
  | "price.col.indexation" | "price.col.exceptionLimit" | "price.col.effective" | "price.col.actions"
  | "price.indexation.cpi" | "price.indexation.fixed" | "price.indexation.none"
  | "price.formula" | "price.formulaHint" | "price.activeRules" | "price.exceptions" | "price.history"
  | "price.bulkDiscount" | "price.bulkDiscountSub" | "price.tier.standard" | "price.tier.gold" | "price.tier.platinum"
  // Approval workflows
  | "appr.title" | "appr.subtitle" | "appr.queue" | "appr.history" | "appr.metrics"
  | "appr.col.quoteId" | "appr.col.customer" | "appr.col.segment" | "appr.col.service" | "appr.col.amount"
  | "appr.col.discount" | "appr.col.level" | "appr.col.aging" | "appr.col.action"
  | "appr.level.sales" | "appr.level.division" | "appr.level.cfo" | "appr.level.ceo"
  | "appr.status.pending" | "appr.status.approved" | "appr.status.rejected" | "appr.status.exception"
  | "appr.btn.approve" | "appr.btn.reject" | "appr.btn.escalate" | "appr.btn.requestInfo"
  | "appr.policy" | "appr.policyTitle" | "appr.policyRule1" | "appr.policyRule2"
  | "appr.policyRule3" | "appr.policyRule4" | "appr.responsibilities" | "appr.respSales" | "appr.respDivision"
  | "appr.flowTitle" | "appr.flow.step1" | "appr.flow.step2" | "appr.flow.step3" | "appr.flow.step4"
  | "appr.flowStep1Sub" | "appr.flowStep2Sub" | "appr.flowStep3Sub" | "appr.flowStep4Sub"
  // Subscriptions
  | "sub.title" | "sub.subtitle" | "sub.active" | "sub.renewalsDue" | "sub.expired" | "sub.multiYear"
  | "sub.col.customer" | "sub.col.service" | "sub.col.startDate" | "sub.col.endDate"
  | "sub.col.value" | "sub.col.renewalStatus" | "sub.col.actions"
  | "sub.renewal.active" | "sub.renewal.due60" | "sub.renewal.due30" | "sub.renewal.expired" | "sub.renewal.renewed"
  | "sub.btn.renew" | "sub.btn.contact" | "sub.btn.viewContract"
  | "sub.totalArr" | "sub.churnRate" | "sub.expansion" | "sub.netRetention"
  // Sales dashboard
  | "sales.title" | "sales.subtitle" | "sales.thisMonth" | "sales.lastMonth" | "sales.thisQuarter" | "sales.thisYear"
  | "sales.revenueByChannel" | "sales.revenueByProduct" | "sales.revenueBySegment" | "sales.targetVsActual"
  | "sales.topProducts" | "sales.topCustomers" | "sales.pipelineByStage" | "sales.conversionFunnel"
  | "sales.formula.revenue" | "sales.formula.arr" | "sales.formula.winRate" | "sales.formula.cac"
  | "sales.respMatrix" | "sales.respMatrixTitle" | "sales.respMatrixSub"
  | "sales.role.sales" | "sales.role.division" | "sales.role.both"
  | "sales.stage.lead" | "sales.stage.qualified" | "sales.stage.quote" | "sales.stage.negotiation" | "sales.stage.won"
  | "sales.target" | "sales.actual" | "sales.gap" | "sales.attainment"
  // Content management
  | "cnt.title" | "cnt.subtitle" | "cnt.servicePages" | "cnt.faqs" | "cnt.priceLists" | "cnt.deliveryTimes"
  | "cnt.col.page" | "cnt.col.owner" | "cnt.col.lastUpdated" | "cnt.col.nextReview" | "cnt.col.status"
  | "cnt.status.current" | "cnt.status.review" | "cnt.status.outdated"
  | "cnt.owner.sales" | "cnt.owner.geo" | "cnt.owner.cadastre" | "cnt.owner.it"
  | "cnt.policies" | "cnt.policyTitle" | "cnt.policyText"
  // Data migration (historical)
  | "mig.title" | "mig.subtitle" | "mig.scope" | "mig.years"
  | "mig.entity.orders" | "mig.entity.quotes" | "mig.entity.subs" | "mig.entity.customers" | "mig.entity.invoices"
  | "mig.col.entity" | "mig.col.years" | "mig.col.records" | "mig.col.structure" | "mig.col.status"
  | "mig.status.planned" | "mig.status.inProgress" | "mig.status.done"
  // Home/page additions
  | "home.shopByNeed" | "home.shopByNeedSub" | "home.salesTeam"
  // Sales Routes (Spec Chapter 5)
  | "route.type.A" | "route.type.B" | "route.type.C" | "route.type.D"
  | "route.phase" | "route.division"
  | "route.div.cadastre" | "route.div.mapping" | "route.div.geodesy" | "route.div.technology" | "route.div.general"
  // Pipeline
  | "pipe.title" | "pipe.subtitle"
  | "pipe.st.newLead" | "pipe.st.review" | "pipe.st.needsInfo"
  | "pipe.st.quoteSent" | "pipe.st.negotiation" | "pipe.st.pendingPayment"
  | "pipe.st.paid" | "pipe.st.fulfillment" | "pipe.st.won"
  | "pipe.st.lost" | "pipe.st.cancelled"
  | "pipe.probability" | "pipe.slaTarget" | "pipe.breachAction" | "pipe.transition"
  | "pipe.approvalThresholds" | "pipe.discountLevels" | "pipe.priceBooks"
  | "pipe.renewalTimeline" | "pipe.col.tier" | "pipe.col.range" | "pipe.col.approver"
  | "pipe.col.slaApproval" | "pipe.col.docs" | "pipe.col.priceBook" | "pipe.col.discount"
  | "pipe.col.custType" | "pipe.col.source" | "pipe.indexation"
  | "cors.upsell.title" | "cors.upsell.body" | "cors.upsell.savings"
  | "pipe.sla.days" | "pipe.sla.owner" | "pipe.sla.actions"
  | "pipe.sla.onTime" | "pipe.sla.warning" | "pipe.sla.breach"
  // Strategic Accounts
  | "strat.title" | "strat.subtitle"
  | "strat.tier1" | "strat.tier2" | "strat.tier3"
  | "strat.top20" | "strat.atRisk" | "strat.growing" | "strat.crossSell"
  | "strat.col.customer" | "strat.col.tier" | "strat.col.am"
  | "strat.col.revenue12m" | "strat.col.contractEnd" | "strat.col.trend" | "strat.col.health"
  // Use Cases
  | "uc.title" | "uc.subtitle" | "uc.persona" | "uc.steps"
  | "uc.uc1.title" | "uc.uc1.persona" | "uc.uc1.step1" | "uc.uc1.step2" | "uc.uc1.step3" | "uc.uc1.step4" | "uc.uc1.step5"
  | "uc.uc2.title" | "uc.uc2.persona" | "uc.uc2.step1" | "uc.uc2.step2" | "uc.uc2.step3" | "uc.uc2.step4"
  | "uc.uc3.title" | "uc.uc3.persona" | "uc.uc3.step1" | "uc.uc3.step2" | "uc.uc3.step3" | "uc.uc3.step4" | "uc.uc3.step5"
  | "uc.uc4.title" | "uc.uc4.persona" | "uc.uc4.step1" | "uc.uc4.step2" | "uc.uc4.step3" | "uc.uc4.step4"
  | "uc.uc5.title" | "uc.uc5.persona" | "uc.uc5.step1" | "uc.uc5.step2" | "uc.uc5.step3" | "uc.uc5.step4" | "uc.uc5.step5"
  // Success Goals
  | "goals.title" | "goals.subtitle"
  | "goals.kpi.revenue" | "goals.kpi.revenueTarget"
  | "goals.kpi.cycle" | "goals.kpi.cycleTarget"
  | "goals.kpi.satisfaction" | "goals.kpi.satisfactionTarget"
  | "goals.kpi.adoption" | "goals.kpi.adoptionTarget"
  | "goals.kpi.renewal" | "goals.kpi.renewalTarget"
  | "goals.kpi.upsell" | "goals.kpi.upsellTarget"
  | "goals.measurement" | "goals.dashboardRT" | "goals.monthlyMeeting" | "goals.qbr" | "goals.executiveReport"
  // Nav additions
  | "nav.pipeline" | "nav.strategic" | "nav.useCases" | "nav.goals"
  // SFCC-style commerce
  | "utility.support" | "utility.storeLocator" | "utility.help" | "utility.trackOrder"
  | "cart.mini.title" | "cart.empty.title" | "cart.empty.sub" | "cart.empty.browse"
  | "cart.close" | "cart.decrease" | "cart.increase" | "cart.remove"
  | "cart.subtotal" | "cart.tax" | "cart.total" | "cart.checkout" | "cart.continue"
  | "cart.page.title" | "cart.page.subtitle" | "cart.page.qty" | "cart.page.unitPrice"
  | "cart.page.lineTotal" | "cart.page.promoCode" | "cart.page.applyPromo"
  | "cart.page.orderSummary" | "cart.page.shipping" | "cart.page.free"
  | "cart.page.proceedCheckout" | "cart.page.secure" | "cart.page.emptyAction"
  | "wish.title" | "wish.empty" | "wish.emptySub" | "wish.aria.add" | "wish.aria.remove"
  | "wish.moveToCart" | "wish.removeAll" | "wish.share"
  | "review.title" | "review.based" | "review.write" | "review.helpful"
  | "review.verified" | "review.filter.all" | "review.filter.5" | "review.filter.4"
  | "review.sort.recent" | "review.sort.helpful" | "review.sort.high" | "review.sort.low"
  | "review.showMore" | "review.of" | "review.stars"
  | "svc.addToCart" | "svc.addingToCart" | "svc.addedToCart" | "svc.quantity"
  | "svc.wishlistAdd" | "svc.wishlistRemove" | "svc.share" | "svc.sku"
  | "svc.inStock" | "svc.deliveryFast" | "svc.securePayment" | "svc.satisfaction"
  | "svc.tabs.desc" | "svc.tabs.specs" | "svc.tabs.delivery" | "svc.tabs.reviews"
  | "svc.gallery.thumbnail" | "svc.relatedTitle" | "svc.relatedSub"
  | "svc.recentTitle" | "svc.recommended"
  | "plp.showing" | "plp.of" | "plp.results" | "plp.sortBy"
  | "plp.sort.relevance" | "plp.sort.priceAsc" | "plp.sort.priceDesc"
  | "plp.sort.newest" | "plp.sort.rating"
  | "plp.filters" | "plp.filtersActive" | "plp.filtersClear"
  | "plp.filter.price" | "plp.filter.delivery" | "plp.filter.rating"
  | "plp.filter.customer" | "plp.filter.available"
  | "plp.viewGrid" | "plp.viewList" | "plp.quickView"
  | "plp.noResults" | "plp.noResultsSub" | "plp.trending"
  | "newsletter.title" | "newsletter.sub" | "newsletter.placeholder"
  | "newsletter.subscribe" | "newsletter.success" | "newsletter.privacy"
  | "footer.newsletter" | "footer.follow" | "footer.trust" | "footer.certified"
  | "trust.security" | "trust.national" | "trust.gdpr" | "trust.support"
  | "header.search.placeholder" | "header.search.recent" | "header.search.suggestions"
  | "header.search.viewAll" | "header.search.aria"
  | "header.account" | "header.wishlist" | "header.cart" | "header.cartCount"
  // Nav for new pages
  | "nav.plans" | "nav.bundles" | "nav.apiHub" | "nav.trial"
  // Plans page (3-tier: Open/Premium/Public)
  | "plans.title" | "plans.subtitle" | "plans.compare" | "plans.faq"
  | "plans.mostPopular" | "plans.perMonth" | "plans.perYear" | "plans.custom"
  | "plans.tryFree" | "plans.startNow" | "plans.contactSales"
  | "plan.open.name" | "plan.open.tagline" | "plan.open.price" | "plan.open.unit" | "plan.open.cta"
  | "plan.open.f1" | "plan.open.f2" | "plan.open.f3" | "plan.open.f4" | "plan.open.f5"
  | "plan.premium.name" | "plan.premium.tagline" | "plan.premium.price" | "plan.premium.unit" | "plan.premium.cta"
  | "plan.premium.f1" | "plan.premium.f2" | "plan.premium.f3" | "plan.premium.f4" | "plan.premium.f5"
  | "plan.premium.f6" | "plan.premium.f7"
  | "plan.public.name" | "plan.public.tagline" | "plan.public.price" | "plan.public.unit" | "plan.public.cta"
  | "plan.public.f1" | "plan.public.f2" | "plan.public.f3" | "plan.public.f4" | "plan.public.f5" | "plan.public.f6"
  | "planCmp.title" | "planCmp.feature"
  | "planCmp.mapsDownload" | "planCmp.resolution" | "planCmp.apiCalls"
  | "planCmp.historicMaps" | "planCmp.corsRTK" | "planCmp.dataFormats"
  | "planCmp.commercialUse" | "planCmp.support" | "planCmp.customMaps" | "planCmp.teamSeats"
  | "planFaq.q1" | "planFaq.a1" | "planFaq.q2" | "planFaq.a2"
  | "planFaq.q3" | "planFaq.a3" | "planFaq.q4" | "planFaq.a4"
  // Bundles page
  | "bundles.title" | "bundles.subtitle" | "bundles.savings" | "bundles.included"
  | "bundles.regularPrice" | "bundles.bundlePrice" | "bundles.buyBundle"
  | "bundles.featured" | "bundles.allBundles" | "bundles.filterBy"
  | "bundle.galilee.name" | "bundle.galilee.desc"
  | "bundle.coastal.name" | "bundle.coastal.desc"
  | "bundle.jerusalem.name" | "bundle.jerusalem.desc"
  | "bundle.negev.name" | "bundle.negev.desc"
  | "bundle.surveyor.name" | "bundle.surveyor.desc"
  | "bundle.developer.name" | "bundle.developer.desc"
  // API Hub
  | "api.hub.title" | "api.hub.subtitle" | "api.hub.newProject"
  | "api.hub.summary" | "api.hub.projects" | "api.hub.usage" | "api.hub.docs"
  | "api.hub.kpi.projects" | "api.hub.kpi.keys" | "api.hub.kpi.calls" | "api.hub.kpi.maps"
  | "api.hub.kpi.data" | "api.hub.kpi.cost"
  | "api.hub.usage30d" | "api.hub.calls" | "api.hub.mapsLabel"
  | "api.hub.est" | "api.hub.vs" | "api.hub.lastMonth"
  | "api.hub.projName" | "api.hub.projDesc" | "api.hub.plan" | "api.hub.env"
  | "api.hub.created" | "api.hub.lastUsed" | "api.hub.keys"
  | "api.hub.viewProject" | "api.hub.env.prod" | "api.hub.env.staging" | "api.hub.env.dev"
  | "api.hub.docsTitle" | "api.hub.docsSub" | "api.hub.docs.gettingStarted"
  | "api.hub.docs.mapsAPI" | "api.hub.docs.gisAPI" | "api.hub.docs.corsAPI"
  | "api.hub.docs.errors" | "api.hub.docs.rateLimits"
  | "api.hub.reportError" | "api.hub.reportErrorSub"
  // Trial & error report & sample
  | "svc.trial.title" | "svc.trial.days" | "svc.trial.start" | "svc.trial.terms"
  | "svc.sample.title" | "svc.sample.download"
  | "svc.error.report" | "svc.error.reportSub" | "svc.error.submit"
  // Scroll hint bubble
  | "scrollHint.label" | "scrollHint.aria"
  // Error monitoring admin page
  | "monitor.title" | "monitor.subtitle" | "monitor.testError" | "monitor.clear"
  | "monitor.kpi.total" | "monitor.kpi.today" | "monitor.kpi.healthy" | "monitor.kpi.attention"
  | "monitor.empty" | "monitor.emptySub" | "monitor.prodNote"
  // GovMap embed controls
  | "govmap.mapSettings" | "govmap.basemap" | "govmap.layers"
  | "govmap.basemap.standard" | "govmap.basemap.ortho" | "govmap.basemap.topo" | "govmap.basemap.hybrid"
  | "govmap.layer.parcels" | "govmap.layer.buildings" | "govmap.layer.gnss"
  | "govmap.layer.contours" | "govmap.layer.nature" | "govmap.layer.trails"
  | "govmap.openSite" | "govmap.refreshing"
  // Nav: hide behind more menu
  | "nav.more"
  // Support Modal - extended
  | "support.closeAria" | "support.closeTip" | "support.headerEyebrow"
  | "support.altRoutes" | "support.directDial" | "support.govFormLabel"
  | "support.done" | "support.refNum"
  | "support.quickPhone" | "support.quickEmail" | "support.quickGov" | "support.quickGovDesc"
  | "support.phoneTip" | "support.emailTip" | "support.govTip"
  | "support.idHint" | "support.typeSelect"
  | "support.type.tech" | "support.type.order" | "support.type.content"
  | "support.type.payment" | "support.type.quote" | "support.type.other"
  | "support.orderOptional" | "support.orderPlaceholder"
  | "support.subjectPlaceholder" | "support.descPlaceholder"
  | "support.privacyNote" | "support.privacyLink"
  | "support.cancelTip" | "support.submitTip"
  // Quote modal - extended
  | "quote.priceRange" | "quote.priceUnit" | "quote.closeAria" | "quote.closeTip"
  | "quote.included.short" | "quote.send.tip"
  | "quote.notes.placeholder" | "quote.privacy"
  // News Ticker
  | "ticker.headline.aerial" | "ticker.headline.dem" | "ticker.headline.maps"
  | "ticker.headline.cors" | "ticker.headline.holiday"
  // AI Assistant
  | "ai.greet.fallback" | "ai.btn.aria" | "ai.btn.tip" | "ai.btn.label"
  | "ai.close" | "ai.minimize"
  // Strategic health
  | "strat.health.healthy" | "strat.health.watch" | "strat.health.atRisk"
  | "strat.customersLabel" | "strat.revenueShare"
  // Admin layout groups
  | "admin.group.overview" | "admin.group.sales" | "admin.group.ops" | "admin.group.content"
  // Login tooltips
  | "login.tip.national"
  // Pipeline page extras
  | "pipe.routeTypes" | "pipe.stageFunnel" | "pipe.slaActionsTitle" | "pipe.activeOpps"
  | "pipe.col.routeId" | "pipe.col.opportunity" | "pipe.col.customer"
  | "pipe.col.type" | "pipe.col.stage" | "pipe.col.daysInStage"
  | "pipe.col.amount" | "pipe.kpi.activeOpps" | "pipe.kpi.totalValue"
  // Catalog/[slug] subscription
  | "svc.priceUnitMonth" | "svc.perMonth";

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
  "login.feat.itStandard": { he: 'תקני יה"ב 5.35', en: 'Compliant with IT-Security 5.35', fr: 'Conforme IT-Security 5.35', es: 'Conforme IT-Security 5.35', ru: 'Стандарт IT-Security 5.35', ar: 'متوافق مع IT-Security 5.35' },

  // Customer Segments
  "nav.segments": { he: 'לפי סוג לקוח', en: 'By Customer Type', fr: 'Par type de client', es: 'Por tipo de cliente', ru: 'По типу клиента', ar: 'حسب نوع العميل' },
  "nav.admin": { he: 'אזור ניהול', en: 'Admin', fr: 'Administration', es: 'Administración', ru: 'Администрирование', ar: 'الإدارة' },
  "seg.title": { he: 'בחר את סוג הלקוח שלך', en: 'Choose your customer type', fr: 'Choisissez votre type de client', es: 'Elige tu tipo de cliente', ru: 'Выберите тип клиента', ar: 'اختر نوع العميل' },
  "seg.subtitle": { he: 'התאמנו עבורך מסלול ייעודי לפי סוג הפעילות שלך - שירותים רלוונטיים, מחירונים מותאמים, ערוצי שירות ייעודיים והסכמי מסגרת.', en: 'We tailored a dedicated journey per customer type - relevant services, custom pricing, dedicated channels and framework agreements.', fr: 'Parcours dédié par type : services pertinents, tarifs adaptés, canaux dédiés et accords-cadres.', es: 'Recorrido dedicado por tipo: servicios relevantes, precios personalizados, canales dedicados y acuerdos marco.', ru: 'Персональный путь по типу: релевантные услуги, индивидуальные цены, выделенные каналы и рамочные договоры.', ar: 'مسار مخصص حسب النوع: خدمات ذات صلة، أسعار مخصصة، قنوات مخصصة، واتفاقيات إطارية.' },
  "seg.eyebrow": { he: 'מסלולים מותאמים', en: 'Tailored Journeys', fr: 'Parcours sur mesure', es: 'Recorridos personalizados', ru: 'Персональные пути', ar: 'مسارات مخصصة' },
  "seg.choose": { he: 'בחר את הסגמנט שמתאר אותך הכי טוב כדי לקבל חוויה ממוקדת ומחירים מותאמים', en: 'Pick the segment that fits you to get a focused experience and matched pricing', fr: 'Choisissez le segment qui vous correspond', es: 'Elige el segmento que te describe', ru: 'Выберите подходящий сегмент', ar: 'اختر القطاع الأنسب' },

  "seg.citizen.name": { he: 'אזרח פרטי', en: 'Private Citizen', fr: 'Citoyen privé', es: 'Ciudadano particular', ru: 'Частное лицо', ar: 'مواطن خاص' },
  "seg.citizen.short": { he: 'אזרח פרטי המבקש מפה, תצלום אוויר או תעודה', en: 'Need a map, aerial photo or certificate', fr: 'Pour une carte, photo aérienne ou certificat', es: 'Mapa, foto aérea o certificado', ru: 'Карта, аэрофото или сертификат', ar: 'خريطة، صورة جوية أو شهادة' },
  "seg.citizen.desc": { he: 'הזמנת מפות, תצלומי אוויר, גושים וחלקות, תעודות מקרקעין - תוך דקות, בתשלום מאובטח ובמחירי קמעונאות.', en: 'Order maps, aerial photos, parcels and land certificates - in minutes, secure payment, retail prices.', fr: 'Commandez cartes, photos aériennes, parcelles et certificats fonciers - en quelques minutes.', es: 'Pide mapas, fotos aéreas, parcelas y certificados de tierras - en minutos.', ru: 'Заказ карт, аэрофото, участков и сертификатов - за минуты.', ar: 'اطلب الخرائط والصور الجوية وقطع الأراضي والشهادات - خلال دقائق.' },

  "seg.surveyor.name": { he: 'מודד מוסמך', en: 'Licensed Surveyor', fr: 'Géomètre licencié', es: 'Topógrafo licenciado', ru: 'Лицензированный геодезист', ar: 'مساح معتمد' },
  "seg.surveyor.short": { he: 'מודד / משרד מדידות עם פעילות שוטפת', en: 'Surveyor / measurement office with ongoing activity', fr: 'Géomètre / bureau de mesure', es: 'Topógrafo / oficina de mediciones', ru: 'Геодезист / землемерное бюро', ar: 'مساح / مكتب قياسات' },
  "seg.surveyor.desc": { he: 'מנויי CORS, תצ"ר, גישה ל-API נתונים, מחירונים מוזלים והסכם שירות מקצועי. כולל סנכרון אוטומטי לתוכנות המדידה (AutoCAD, Civil 3D).', en: 'CORS subscriptions, cadastre plans, data API access, discounted pricing and professional SLA. Includes auto-sync to survey software (AutoCAD, Civil 3D).', fr: 'Abonnements CORS, plans cadastraux, API, tarifs préférentiels et SLA professionnel.', es: 'Suscripciones CORS, planes catastrales, API, precios reducidos y SLA profesional.', ru: 'Подписки CORS, кадастровые планы, API, льготные цены и профессиональный SLA.', ar: 'اشتراكات CORS، مخططات مساحية، واجهات API، أسعار مخفضة، ومستوى خدمة احترافي.' },

  "seg.municipality.name": { he: 'רשות מקומית', en: 'Local Authority', fr: 'Collectivité locale', es: 'Autoridad local', ru: 'Местная власть', ar: 'سلطة محلية' },
  "seg.municipality.short": { he: 'עירייה, מועצה אזורית או רשות מקומית', en: 'Municipality, regional council or local authority', fr: 'Municipalité, conseil régional', es: 'Municipio, consejo regional', ru: 'Муниципалитет, региональный совет', ar: 'بلدية، مجلس إقليمي' },
  "seg.municipality.desc": { he: 'הסכמי מסגרת רב-שנתיים, מחירונים מיוחדים, גישה לכל שכבות ה-GIS, ערוץ שירות ייעודי ומענה מהיר. כולל הדרכות לעובדים ותמיכה בפרויקטים גדולים.', en: 'Multi-year framework agreements, special pricing, full GIS access, dedicated channel and rapid response. Includes staff training and large-project support.', fr: 'Accords-cadres pluriannuels, tarifs spéciaux, accès GIS complet, canal dédié et réponse rapide.', es: 'Acuerdos marco plurianuales, precios especiales, acceso GIS, canal dedicado y respuesta rápida.', ru: 'Многолетние рамочные договоры, спецтарифы, полный доступ к GIS, выделенный канал и быстрый отклик.', ar: 'اتفاقيات إطارية متعددة السنوات، أسعار خاصة، وصول كامل لـ GIS، قناة مخصصة، واستجابة سريعة.' },

  "seg.government.name": { he: 'משרד ממשלתי', en: 'Government Ministry', fr: 'Ministère', es: 'Ministerio', ru: 'Министерство', ar: 'وزارة حكومية' },
  "seg.government.short": { he: 'משרד ממשלתי, יחידת סמך או חברה ממשלתית', en: 'Government ministry, agency or state-owned company', fr: 'Ministère, agence ou société publique', es: 'Ministerio, agencia o empresa pública', ru: 'Министерство, агентство или госкомпания', ar: 'وزارة، هيئة، أو شركة حكومية' },
  "seg.government.desc": { he: 'אינטגרציה מובנית עם מערכות ממשלתיות, שיתופי פעולה רגולטוריים, ניהול נכסים, סטטיסטיקה ותכנון לאומי. כפוף לחוק רכש ממשלתי - מסלול ייעודי ב-Mtuna.', en: 'Built-in integration with government systems, regulatory cooperation, asset management, statistics and national planning. Subject to gov procurement - dedicated Mtuna track.', fr: 'Intégration avec les systèmes gouvernementaux, coopération réglementaire et planification nationale.', es: 'Integración con sistemas gubernamentales, cooperación regulatoria y planificación nacional.', ru: 'Интеграция с государственными системами, регуляторное сотрудничество, нац. планирование.', ar: 'تكامل مع الأنظمة الحكومية، تعاون تنظيمي، وتخطيط وطني.' },

  "seg.professional.name": { he: 'שמאי / מהנדס / אדריכל', en: 'Appraiser / Engineer / Architect', fr: 'Évaluateur / Ingénieur / Architecte', es: 'Tasador / Ingeniero / Arquitecto', ru: 'Оценщик / Инженер / Архитектор', ar: 'مثمن / مهندس / معماري' },
  "seg.professional.short": { he: 'בעלי מקצוע שצורכים מידע גיאוגרפי תכוף', en: 'Professionals who consume geo data frequently', fr: 'Professionnels consommateurs réguliers de géo-données', es: 'Profesionales que consumen geo-datos', ru: 'Профессионалы-потребители геоданных', ar: 'متخصصون يستهلكون البيانات الجغرافية' },
  "seg.professional.desc": { he: 'חבילות מנוי לצריכת מפות וקדסטר, תעריפים מוזלים על נפחים, יצוא ל-CAD ו-GIS, חשבונית מס למשרד. כולל גישה מהירה לשכבות תכנוניות (תב"ע, רישוי).', en: 'Subscription packages for maps & cadastre, volume discounts, CAD/GIS export, business invoicing. Includes fast access to planning layers.', fr: 'Forfaits abonnement, remises de volume, export CAD/GIS et facturation pro.', es: 'Paquetes de suscripción, descuentos por volumen, exportación CAD/GIS y facturación profesional.', ru: 'Пакеты подписки, скидки на объёмы, экспорт CAD/GIS и счёт юр. лицу.', ar: 'باقات اشتراك، خصومات حجم، تصدير CAD/GIS، وفواتير للأعمال.' },

  "seg.business.name": { he: 'לקוח עסקי', en: 'Business Customer', fr: 'Client professionnel', es: 'Cliente empresarial', ru: 'Бизнес-клиент', ar: 'عميل تجاري' },
  "seg.business.short": { he: 'חברה פרטית או ציבורית', en: 'Private or public company', fr: 'Société privée ou publique', es: 'Empresa privada o pública', ru: 'Частная или публичная компания', ar: 'شركة خاصة أو عامة' },
  "seg.business.desc": { he: 'הסכמי שירות מותאמים, מחירונים נפחיים, מודל הזמנה דרך API, חשבונאות מרוכזת ומנהל לקוח ייעודי. מתאים לחברות נדל"ן, אנרגיה, תשתיות, היי-טק ופיננסים.', en: 'Custom service agreements, volume pricing, API ordering, central billing and dedicated account manager. Real-estate, energy, infrastructure, hi-tech, finance.', fr: 'Accords sur mesure, prix volume, API, facturation centralisée et gestionnaire de compte.', es: 'Acuerdos a medida, precios por volumen, API, facturación central y gerente de cuenta.', ru: 'Индивид. договоры, оптовые цены, API, центральный биллинг и менеджер.', ar: 'اتفاقيات مخصصة، أسعار حجمية، واجهات API، فوترة مركزية، ومدير حساب.' },

  "seg.popular": { he: 'הכי פופולרי', en: 'Most popular', fr: 'Le plus populaire', es: 'Más popular', ru: 'Самый популярный', ar: 'الأكثر شيوعاً' },
  "seg.entry": { he: 'נקודת כניסה', en: 'Entry point', fr: 'Point d\'entrée', es: 'Punto de entrada', ru: 'Точка входа', ar: 'نقطة الدخول' },
  "seg.tier": { he: 'רמה', en: 'Tier', fr: 'Niveau', es: 'Nivel', ru: 'Уровень', ar: 'المستوى' },
  "seg.tierCitizen": { he: 'אזרחי', en: 'Retail', fr: 'Retail', es: 'Retail', ru: 'Розничный', ar: 'فردي' },
  "seg.tierPro": { he: 'מקצועי', en: 'Professional', fr: 'Professionnel', es: 'Profesional', ru: 'Профессиональный', ar: 'مهني' },
  "seg.tierEnterprise": { he: 'אנטרפרייז', en: 'Enterprise', fr: 'Entreprise', es: 'Empresarial', ru: 'Корпоративный', ar: 'مؤسسي' },
  "seg.tierGov": { he: 'ממשלתי', en: 'Government', fr: 'Gouvernement', es: 'Gobierno', ru: 'Правительственный', ar: 'حكومي' },
  "seg.relevantServices": { he: 'השירותים הרלוונטיים עבורך', en: 'Services relevant for you', fr: 'Services pertinents', es: 'Servicios relevantes', ru: 'Релевантные услуги', ar: 'الخدمات ذات الصلة' },
  "seg.specialPricing": { he: 'מחירונים מיוחדים', en: 'Special pricing', fr: 'Tarifs spéciaux', es: 'Precios especiales', ru: 'Спецтарифы', ar: 'أسعار خاصة' },
  "seg.dedicatedContact": { he: 'איש קשר ייעודי', en: 'Dedicated contact', fr: 'Contact dédié', es: 'Contacto dedicado', ru: 'Выделенный контакт', ar: 'جهة اتصال مخصصة' },
  "seg.contracts": { he: 'הסכמי מסגרת', en: 'Framework agreements', fr: 'Accords-cadres', es: 'Acuerdos marco', ru: 'Рамочные договоры', ar: 'اتفاقيات إطارية' },
  "seg.benefits": { he: 'הטבות בסגמנט', en: 'Segment benefits', fr: 'Avantages du segment', es: 'Beneficios del segmento', ru: 'Преимущества сегмента', ar: 'مزايا القطاع' },
  "seg.startHere": { he: 'התחל כאן', en: 'Start here', fr: 'Commencez ici', es: 'Empieza aquí', ru: 'Начать здесь', ar: 'ابدأ هنا' },
  "seg.talkToSales": { he: 'דבר עם איש מכירות', en: 'Talk to sales', fr: 'Parler aux ventes', es: 'Hablar con ventas', ru: 'Связаться с продажами', ar: 'تحدث مع المبيعات' },
  "seg.exampleSavings": { he: 'חיסכון לדוגמה', en: 'Example savings', fr: 'Économies exemple', es: 'Ahorros ejemplo', ru: 'Пример экономии', ar: 'مثال على التوفير' },
  "seg.discount": { he: 'הנחה', en: 'Discount', fr: 'Remise', es: 'Descuento', ru: 'Скидка', ar: 'خصم' },
  "seg.contractsMulti": { he: 'הסכמים רב-שנתיים', en: 'Multi-year agreements', fr: 'Accords pluriannuels', es: 'Acuerdos plurianuales', ru: 'Многолетние договоры', ar: 'اتفاقيات متعددة السنوات' },
  "seg.contractsMultiSub": { he: 'נעילת מחיר ל-3 שנים + עדכוני שירות חינם', en: 'Price lock for 3 years + free service updates', fr: 'Prix bloqué 3 ans + MAJ gratuites', es: 'Precio fijo 3 años + actualizaciones gratis', ru: 'Фиксация цены на 3 года + бесплатные обновления', ar: 'تثبيت السعر لمدة 3 سنوات + تحديثات مجانية' },
  "seg.subscriptionBenefit": { he: 'תשלום חודשי קבוע - ללא הפתעות', en: 'Fixed monthly fee - no surprises', fr: 'Forfait mensuel fixe', es: 'Tarifa mensual fija', ru: 'Фиксированная ежемесячная плата', ar: 'رسوم شهرية ثابتة' },
  "seg.priorityChannel": { he: 'ערוץ עדיפות לתמיכה', en: 'Priority support channel', fr: 'Canal prioritaire', es: 'Canal prioritario', ru: 'Приоритетный канал', ar: 'قناة دعم ذات أولوية' },
  "seg.includedKpis": { he: 'דוחות KPI חודשיים', en: 'Monthly KPI reports', fr: 'Rapports KPI mensuels', es: 'Informes KPI mensuales', ru: 'Ежемесячные отчёты KPI', ar: 'تقارير KPI شهرية' },
  "seg.customSla": { he: 'SLA מותאם אישית', en: 'Custom SLA', fr: 'SLA personnalisé', es: 'SLA personalizado', ru: 'Индивидуальный SLA', ar: 'اتفاقية مستوى خدمة مخصصة' },
  "seg.dedicatedAccountMgr": { he: 'מנהל לקוח אישי', en: 'Dedicated account manager', fr: 'Gestionnaire de compte dédié', es: 'Gerente de cuenta dedicado', ru: 'Персональный менеджер', ar: 'مدير حساب مخصص' },
  "seg.useCase": { he: 'תרחיש שימוש', en: 'Use case', fr: 'Cas d\'usage', es: 'Caso de uso', ru: 'Сценарий использования', ar: 'حالة استخدام' },
  "seg.useCases": { he: 'תרחישי שימוש פופולריים', en: 'Popular use cases', fr: 'Cas d\'usage populaires', es: 'Casos populares', ru: 'Популярные сценарии', ar: 'حالات الاستخدام الشائعة' },
  "seg.salesContact": { he: 'צור קשר עם מנהל מכירות', en: 'Contact sales manager', fr: 'Contacter un commercial', es: 'Contactar al gerente de ventas', ru: 'Связаться с менеджером', ar: 'تواصل مع مدير المبيعات' },
  "seg.requestProposal": { he: 'בקש הצעה מותאמת', en: 'Request tailored proposal', fr: 'Demander une proposition', es: 'Solicitar propuesta', ru: 'Запросить предложение', ar: 'طلب عرض مخصص' },
  "seg.bookMeeting": { he: 'קבע פגישה', en: 'Book a meeting', fr: 'Réserver une réunion', es: 'Reservar reunión', ru: 'Назначить встречу', ar: 'حجز اجتماع' },

  // Admin
  "admin.title": { he: 'אזור ניהול - מערכת המכירות של מפ"י', en: 'Admin - MAPI sales system', fr: 'Administration - système commercial MAPI', es: 'Administración - sistema de ventas MAPI', ru: 'Администрирование - продажи MAPI', ar: 'الإدارة - نظام مبيعات MAPI' },
  "admin.subtitle": { he: 'מודולים פנימיים לעובדי מפ"י: מחירונים, אישורים, מנויים, דשבורד מכירות וניהול תוכן.', en: 'Internal modules for MAPI staff: pricing, approvals, subscriptions, sales dashboard, content.', fr: 'Modules internes MAPI : tarification, approbations, abonnements, tableau de bord, contenu.', es: 'Módulos internos MAPI: precios, aprobaciones, suscripciones, panel, contenido.', ru: 'Внутренние модули MAPI: цены, утверждения, подписки, дашборд, контент.', ar: 'وحدات داخلية لـ MAPI: التسعير، الموافقات، الاشتراكات، لوحة المبيعات، المحتوى.' },
  "admin.welcomeBack": { he: 'שלום שרון, מנהלת מכירות', en: 'Hi Sharon, Sales Manager', fr: 'Bonjour Sharon, directrice commerciale', es: 'Hola Sharon, gerente de ventas', ru: 'Здравствуйте, Шарон', ar: 'مرحباً شارون، مديرة المبيعات' },
  "admin.module.pricing": { he: 'ניהול מחירונים', en: 'Pricing Management', fr: 'Gestion des prix', es: 'Gestión de precios', ru: 'Управление ценами', ar: 'إدارة الأسعار' },
  "admin.module.pricingSub": { he: 'מחירונים, הצמדות, הנחות ואישורי חריגה', en: 'Price lists, indexation, discounts and exception approvals', fr: 'Tarifs, indexation, remises, dérogations', es: 'Listas de precios, indexación, descuentos, excepciones', ru: 'Прайс-листы, индексация, скидки, исключения', ar: 'قوائم الأسعار، الفهرسة، الخصومات، الاستثناءات' },
  "admin.module.approvals": { he: 'אישורי הצעות מחיר', en: 'Quote Approvals', fr: 'Approbations devis', es: 'Aprobaciones de cotización', ru: 'Утверждение предложений', ar: 'موافقات عروض الأسعار' },
  "admin.module.approvalsSub": { he: 'תהליך אישור לפי סוג מוצר, סכום וסוג לקוח', en: 'Workflow by product, amount and customer type', fr: 'Workflow par produit, montant, type de client', es: 'Flujo por producto, monto y cliente', ru: 'Маршрут по продукту, сумме, клиенту', ar: 'سير عمل حسب المنتج والمبلغ والعميل' },
  "admin.module.subscriptions": { he: 'מנויים והסכמים', en: 'Subscriptions & Agreements', fr: 'Abonnements & accords', es: 'Suscripciones y acuerdos', ru: 'Подписки и договоры', ar: 'الاشتراكات والاتفاقيات' },
  "admin.module.subscriptionsSub": { he: 'חידושים, לקוחות קבועים והסכמים רב-שנתיים', en: 'Renewals, recurring customers, multi-year agreements', fr: 'Renouvellements, clients réguliers, accords pluriannuels', es: 'Renovaciones, clientes recurrentes, acuerdos plurianuales', ru: 'Продления, постоянные клиенты, многолетние', ar: 'التجديدات، العملاء المتكررون، الاتفاقيات الممتدة' },
  "admin.module.sales": { he: 'דשבורד מכירות', en: 'Sales Dashboard', fr: 'Tableau de bord commercial', es: 'Panel de ventas', ru: 'Дашборд продаж', ar: 'لوحة المبيعات' },
  "admin.module.salesSub": { he: 'KPI, נוסחאות, חיבור להכנסות בפועל', en: 'KPIs, formulas, link to actual revenue', fr: 'KPI, formules, lien aux revenus réels', es: 'KPI, fórmulas, vínculo a ingresos reales', ru: 'KPI, формулы, связь с фактической выручкой', ar: 'مؤشرات الأداء، الصيغ، ربط الإيرادات الفعلية' },
  "admin.module.content": { he: 'ניהול תוכן', en: 'Content Management', fr: 'Gestion de contenu', es: 'Gestión de contenido', ru: 'Управление контентом', ar: 'إدارة المحتوى' },
  "admin.module.contentSub": { he: 'בעלות על דפי שירות, מחירים, FAQ וזמני אספקה', en: 'Ownership of service pages, prices, FAQs, delivery times', fr: 'Propriété des pages, prix, FAQ, délais', es: 'Propiedad de páginas, precios, FAQ, plazos', ru: 'Владение страницами, ценами, FAQ, сроками', ar: 'ملكية الصفحات والأسعار والأسئلة وأوقات التسليم' },
  "admin.module.dashboard": { he: 'דף בית - ניהול', en: 'Admin Home', fr: 'Accueil admin', es: 'Inicio admin', ru: 'Главная админа', ar: 'الرئيسية - الإدارة' },
  "admin.kpi.revenueYtd": { he: 'הכנסות מתחילת השנה', en: 'Revenue YTD', fr: 'CA cumulé', es: 'Ingresos YTD', ru: 'Выручка YTD', ar: 'الإيرادات منذ بداية السنة' },
  "admin.kpi.pipeline": { he: 'פייפליין פתוח', en: 'Open pipeline', fr: 'Pipeline ouvert', es: 'Pipeline abierto', ru: 'Открытый pipeline', ar: 'خط الأنابيب المفتوح' },
  "admin.kpi.winRate": { he: 'שיעור סגירה', en: 'Win rate', fr: 'Taux de gain', es: 'Tasa de éxito', ru: 'Win rate', ar: 'معدل الفوز' },
  "admin.kpi.pendingApprovals": { he: 'אישורים ממתינים', en: 'Pending approvals', fr: 'Approbations en attente', es: 'Aprobaciones pendientes', ru: 'Ожидают утверждения', ar: 'موافقات معلقة' },
  "admin.kpi.activeSubs": { he: 'מנויים פעילים', en: 'Active subscriptions', fr: 'Abonnements actifs', es: 'Suscripciones activas', ru: 'Активные подписки', ar: 'الاشتراكات النشطة' },
  "admin.kpi.renewalsDue": { he: 'חידושים ב-60 יום', en: 'Renewals due in 60 days', fr: 'Renouvellements 60j', es: 'Renovaciones 60d', ru: 'Продления 60 дней', ar: 'تجديدات خلال 60 يوماً' },
  "admin.kpi.avgDealSize": { he: 'שווי עסקה ממוצע', en: 'Average deal size', fr: 'Taille moyenne de deal', es: 'Tamaño promedio', ru: 'Средний размер сделки', ar: 'متوسط حجم الصفقة' },
  "admin.kpi.salesCycle": { he: 'מחזור מכירה (ימים)', en: 'Sales cycle (days)', fr: 'Cycle de vente (j)', es: 'Ciclo de venta (d)', ru: 'Цикл продаж (дни)', ar: 'دورة المبيعات (أيام)' },

  // Pricing module
  "price.title": { he: 'ניהול מחירונים', en: 'Pricing Management', fr: 'Gestion des prix', es: 'Gestión de precios', ru: 'Управление ценами', ar: 'إدارة الأسعار' },
  "price.subtitle": { he: 'מחירונים פעילים, הצמדות, הנחות לפי סגמנט וגבולות לאישורי חריגה', en: 'Active price lists, indexation, segment discounts and exception limits', fr: 'Tarifs actifs, indexation, remises et limites', es: 'Precios activos, indexación, descuentos y límites', ru: 'Активные цены, индексация, скидки и лимиты', ar: 'الأسعار النشطة، الفهرسة، الخصومات والحدود' },
  "price.search": { he: 'חפש שירות / סגמנט...', en: 'Search service / segment...', fr: 'Rechercher...', es: 'Buscar...', ru: 'Поиск...', ar: 'ابحث...' },
  "price.newRule": { he: 'הוסף כלל מחיר', en: 'Add pricing rule', fr: 'Ajouter règle', es: 'Añadir regla', ru: 'Добавить правило', ar: 'إضافة قاعدة' },
  "price.import": { he: 'ייבא Excel', en: 'Import Excel', fr: 'Importer Excel', es: 'Importar Excel', ru: 'Импорт Excel', ar: 'استيراد Excel' },
  "price.export": { he: 'ייצא Excel', en: 'Export Excel', fr: 'Exporter Excel', es: 'Exportar Excel', ru: 'Экспорт Excel', ar: 'تصدير Excel' },
  "price.col.service": { he: 'שירות', en: 'Service', fr: 'Service', es: 'Servicio', ru: 'Услуга', ar: 'الخدمة' },
  "price.col.segment": { he: 'סגמנט', en: 'Segment', fr: 'Segment', es: 'Segmento', ru: 'Сегмент', ar: 'القطاع' },
  "price.col.basePrice": { he: 'מחיר בסיס', en: 'Base price', fr: 'Prix de base', es: 'Precio base', ru: 'Базовая цена', ar: 'السعر الأساس' },
  "price.col.discount": { he: 'הנחה %', en: 'Discount %', fr: 'Remise %', es: 'Descuento %', ru: 'Скидка %', ar: 'خصم %' },
  "price.col.indexation": { he: 'הצמדה', en: 'Indexation', fr: 'Indexation', es: 'Indexación', ru: 'Индексация', ar: 'الفهرسة' },
  "price.col.exceptionLimit": { he: 'תקרת חריגה', en: 'Exception ceiling', fr: 'Plafond dérogation', es: 'Techo excepción', ru: 'Лимит исключения', ar: 'حد الاستثناء' },
  "price.col.effective": { he: 'תקף מ-', en: 'Effective from', fr: 'Effectif depuis', es: 'Efectivo desde', ru: 'Действует с', ar: 'سارٍ من' },
  "price.col.actions": { he: 'פעולות', en: 'Actions', fr: 'Actions', es: 'Acciones', ru: 'Действия', ar: 'الإجراءات' },
  "price.indexation.cpi": { he: 'מדד מחירים לצרכן (CPI)', en: 'CPI', fr: 'IPC', es: 'IPC', ru: 'ИПЦ', ar: 'مؤشر أسعار المستهلك' },
  "price.indexation.fixed": { he: 'קבוע (5%/שנה)', en: 'Fixed (5%/year)', fr: 'Fixe (5%/an)', es: 'Fijo (5%/año)', ru: 'Фикс. (5%/год)', ar: 'ثابت (5%/سنة)' },
  "price.indexation.none": { he: 'ללא הצמדה', en: 'No indexation', fr: 'Aucune', es: 'Sin indexación', ru: 'Без индексации', ar: 'بدون فهرسة' },
  "price.formula": { he: 'נוסחת מחיר', en: 'Pricing formula', fr: 'Formule de prix', es: 'Fórmula', ru: 'Формула цены', ar: 'صيغة السعر' },
  "price.formulaHint": { he: 'מחיר סופי = מחיר בסיס × (1 - הנחה) × גורם הצמדה', en: 'Final price = base × (1 - discount) × indexation factor', fr: 'Prix final = base × (1 - remise) × facteur indexation', es: 'Precio final = base × (1 - desc.) × factor', ru: 'Итоговая = база × (1 - скидка) × индексация', ar: 'السعر النهائي = الأساسي × (1 - الخصم) × معامل الفهرسة' },
  "price.activeRules": { he: 'כללים פעילים', en: 'Active rules', fr: 'Règles actives', es: 'Reglas activas', ru: 'Активные правила', ar: 'القواعد النشطة' },
  "price.exceptions": { he: 'חריגות פתוחות', en: 'Open exceptions', fr: 'Dérogations ouvertes', es: 'Excepciones abiertas', ru: 'Открытые исключения', ar: 'الاستثناءات المفتوحة' },
  "price.history": { he: 'היסטוריית שינויים', en: 'Change history', fr: 'Historique', es: 'Historial', ru: 'История изменений', ar: 'سجل التغييرات' },
  "price.bulkDiscount": { he: 'הנחות נפח', en: 'Volume discounts', fr: 'Remises volume', es: 'Descuentos volumen', ru: 'Скидки на объём', ar: 'خصومات الحجم' },
  "price.bulkDiscountSub": { he: 'מעל 50K שח/שנה - 10%, מעל 200K - 15%, מעל 1M - 25%', en: '>50K NIS/yr 10%, >200K 15%, >1M 25%', fr: '>50K NIS/an 10%, >200K 15%, >1M 25%', es: '>50K NIS/año 10%, >200K 15%, >1M 25%', ru: '>50K NIS/год 10%, >200K 15%, >1M 25%', ar: '>50K شيكل/سنة 10%، >200K 15%، >1M 25%' },
  "price.tier.standard": { he: 'סטנדרט', en: 'Standard', fr: 'Standard', es: 'Estándar', ru: 'Стандарт', ar: 'قياسي' },
  "price.tier.gold": { he: 'זהב', en: 'Gold', fr: 'Or', es: 'Oro', ru: 'Золото', ar: 'ذهبي' },
  "price.tier.platinum": { he: 'פלטינום', en: 'Platinum', fr: 'Platine', es: 'Platino', ru: 'Платина', ar: 'بلاتيني' },

  // Approvals
  "appr.title": { he: 'אישורי הצעות מחיר', en: 'Quote Approvals', fr: 'Approbations devis', es: 'Aprobaciones', ru: 'Утверждения', ar: 'موافقات العروض' },
  "appr.subtitle": { he: 'תור אישורים פתוח, היסטוריה ומדדי תהליך', en: 'Open queue, history and process metrics', fr: 'File ouverte, historique, métriques', es: 'Cola abierta, historial, métricas', ru: 'Открытая очередь, история, метрики', ar: 'الطابور المفتوح، السجل، المقاييس' },
  "appr.queue": { he: 'תור פתוח', en: 'Open queue', fr: 'File d\'attente', es: 'Cola', ru: 'Очередь', ar: 'الطابور' },
  "appr.history": { he: 'היסטוריה', en: 'History', fr: 'Historique', es: 'Historial', ru: 'История', ar: 'السجل' },
  "appr.metrics": { he: 'מדדים', en: 'Metrics', fr: 'Métriques', es: 'Métricas', ru: 'Метрики', ar: 'المقاييس' },
  "appr.col.quoteId": { he: 'מס\' הצעה', en: 'Quote #', fr: 'N° devis', es: 'Nº cotización', ru: '№ предложения', ar: 'رقم العرض' },
  "appr.col.customer": { he: 'לקוח', en: 'Customer', fr: 'Client', es: 'Cliente', ru: 'Клиент', ar: 'العميل' },
  "appr.col.segment": { he: 'סגמנט', en: 'Segment', fr: 'Segment', es: 'Segmento', ru: 'Сегмент', ar: 'القطاع' },
  "appr.col.service": { he: 'שירות', en: 'Service', fr: 'Service', es: 'Servicio', ru: 'Услуга', ar: 'الخدمة' },
  "appr.col.amount": { he: 'סכום', en: 'Amount', fr: 'Montant', es: 'Importe', ru: 'Сумма', ar: 'المبلغ' },
  "appr.col.discount": { he: 'הנחה', en: 'Discount', fr: 'Remise', es: 'Descuento', ru: 'Скидка', ar: 'الخصم' },
  "appr.col.level": { he: 'דרג מאשר', en: 'Approver level', fr: 'Niveau', es: 'Nivel', ru: 'Уровень', ar: 'مستوى الموافق' },
  "appr.col.aging": { he: 'גיל (ימים)', en: 'Aging (days)', fr: 'Ancienneté', es: 'Antigüedad', ru: 'Срок (дн)', ar: 'العمر (أيام)' },
  "appr.col.action": { he: 'פעולה', en: 'Action', fr: 'Action', es: 'Acción', ru: 'Действие', ar: 'الإجراء' },
  "appr.level.sales": { he: 'איש מכירות', en: 'Sales rep', fr: 'Commercial', es: 'Vendedor', ru: 'Менеджер', ar: 'مندوب' },
  "appr.level.division": { he: 'מנהל חטיבה', en: 'Division head', fr: 'Chef de division', es: 'Jefe de división', ru: 'Глава дивизиона', ar: 'رئيس القسم' },
  "appr.level.cfo": { he: 'סמנכ"ל כספים', en: 'CFO', fr: 'DAF', es: 'CFO', ru: 'CFO', ar: 'المدير المالي' },
  "appr.level.ceo": { he: 'מנכ"ל', en: 'CEO', fr: 'DG', es: 'CEO', ru: 'CEO', ar: 'المدير العام' },
  "appr.status.pending": { he: 'ממתין', en: 'Pending', fr: 'En attente', es: 'Pendiente', ru: 'Ожидает', ar: 'معلق' },
  "appr.status.approved": { he: 'אושר', en: 'Approved', fr: 'Approuvé', es: 'Aprobado', ru: 'Утверждено', ar: 'مُوافق' },
  "appr.status.rejected": { he: 'נדחה', en: 'Rejected', fr: 'Rejeté', es: 'Rechazado', ru: 'Отклонено', ar: 'مرفوض' },
  "appr.status.exception": { he: 'חריגה', en: 'Exception', fr: 'Dérogation', es: 'Excepción', ru: 'Исключение', ar: 'استثناء' },
  "appr.btn.approve": { he: 'אשר', en: 'Approve', fr: 'Approuver', es: 'Aprobar', ru: 'Утвердить', ar: 'موافقة' },
  "appr.btn.reject": { he: 'דחה', en: 'Reject', fr: 'Rejeter', es: 'Rechazar', ru: 'Отклонить', ar: 'رفض' },
  "appr.btn.escalate": { he: 'הסלם', en: 'Escalate', fr: 'Escalader', es: 'Escalar', ru: 'Эскалировать', ar: 'تصعيد' },
  "appr.btn.requestInfo": { he: 'בקש מידע נוסף', en: 'Request more info', fr: 'Demander des infos', es: 'Pedir más info', ru: 'Запросить инфо', ar: 'طلب معلومات' },
  "appr.policy": { he: 'מדיניות אישורים', en: 'Approval policy', fr: 'Politique', es: 'Política', ru: 'Политика', ar: 'سياسة الموافقة' },
  "appr.policyTitle": { he: 'תהליך אישור הצעת מחיר', en: 'Quote approval process', fr: 'Processus d\'approbation', es: 'Proceso de aprobación', ru: 'Процесс утверждения', ar: 'عملية الموافقة' },
  "appr.policyRule1": { he: 'עד ₪10,000 והנחה עד 10% - אישור אוטומטי', en: 'Up to ₪10,000 + discount ≤10% - auto-approve', fr: 'Jusqu\'à ₪10K + remise ≤10% - auto', es: 'Hasta ₪10K + desc. ≤10% - auto', ru: 'До ₪10K + скидка ≤10% - авто', ar: 'حتى ₪10K + خصم ≤10% - تلقائي' },
  "appr.policyRule2": { he: '₪10K-50K או הנחה 10-20% - אישור מנהל מכירות', en: '₪10K-50K or 10-20% discount - sales manager', fr: '₪10K-50K ou remise 10-20% - manager', es: '₪10K-50K o 10-20% - gerente', ru: '₪10K-50K или 10-20% - менеджер продаж', ar: '₪10K-50K أو خصم 10-20% - مدير المبيعات' },
  "appr.policyRule3": { he: '₪50K-250K או הנחה 20-30% - מנהל חטיבה + CFO', en: '₪50K-250K or 20-30% - division head + CFO', fr: '₪50K-250K ou 20-30% - division + DAF', es: '₪50K-250K o 20-30% - división + CFO', ru: '₪50K-250K или 20-30% - дивизион + CFO', ar: '₪50K-250K أو 20-30% - رئيس القسم + المدير المالي' },
  "appr.policyRule4": { he: 'מעל ₪250K או הנחה מעל 30% - אישור מנכ"ל', en: '>₪250K or >30% discount - CEO', fr: '>₪250K ou >30% - DG', es: '>₪250K o >30% - CEO', ru: '>₪250K или >30% - CEO', ar: '>₪250K أو >30% - المدير العام' },
  "appr.responsibilities": { he: 'חלוקת אחריות', en: 'Responsibility split', fr: 'Répartition responsabilités', es: 'División de responsabilidad', ru: 'Разделение ответственности', ar: 'تقسيم المسؤولية' },
  "appr.respSales": { he: 'אגף המכירות אחראי: יצירת קשר, התאמת הצעה, ניהול מו"מ, סגירת עסקה', en: 'Sales owns: lead, proposal, negotiation, closing', fr: 'Ventes : prospect, proposition, négo, closing', es: 'Ventas: lead, propuesta, negociación, cierre', ru: 'Продажи: лид, предложение, переговоры, закрытие', ar: 'المبيعات: العميل، العرض، التفاوض، الإغلاق' },
  "appr.respDivision": { he: 'חטיבות מקצועיות אחראיות: היתכנות טכנית, תמחור מורכב, ביצוע, מסירת תוצר', en: 'Professional divisions own: technical feasibility, complex pricing, delivery', fr: 'Divisions pro : faisabilité, prix complexes, livraison', es: 'Divisiones: viabilidad, precios complejos, entrega', ru: 'Дивизионы: техническая возможность, цены, поставка', ar: 'الأقسام المهنية: الجدوى التقنية، التسعير المعقد، التسليم' },
  "appr.flowTitle": { he: 'תהליך מקצה לקצה', en: 'End-to-end flow', fr: 'Flux complet', es: 'Flujo completo', ru: 'Полный процесс', ar: 'التدفق الكامل' },
  "appr.flow.step1": { he: 'בקשה מהפורטל', en: 'Portal request', fr: 'Demande portail', es: 'Solicitud portal', ru: 'Запрос с портала', ar: 'طلب من البوابة' },
  "appr.flowStep1Sub": { he: 'לקוח שולח בקשת הצעת מחיר', en: 'Customer submits quote request', fr: 'Client soumet demande', es: 'Cliente envía', ru: 'Клиент отправляет', ar: 'العميل يقدم الطلب' },
  "appr.flow.step2": { he: 'מכירות', en: 'Sales', fr: 'Ventes', es: 'Ventas', ru: 'Продажи', ar: 'المبيعات' },
  "appr.flowStep2Sub": { he: 'בודק תקציב, סגמנט והנחה', en: 'Validates budget, segment, discount', fr: 'Valide budget, segment, remise', es: 'Valida presupuesto', ru: 'Проверяет бюджет', ar: 'يتحقق من الميزانية' },
  "appr.flow.step3": { he: 'חטיבה מקצועית', en: 'Professional division', fr: 'Division pro', es: 'División', ru: 'Дивизион', ar: 'القسم المهني' },
  "appr.flowStep3Sub": { he: 'תמחור טכני וזמן אספקה', en: 'Technical pricing & lead time', fr: 'Prix technique & délai', es: 'Precio técnico', ru: 'Тех. цена и срок', ar: 'السعر الفني والوقت' },
  "appr.flow.step4": { he: 'אישור והפצה', en: 'Approve & send', fr: 'Approuver & envoyer', es: 'Aprobar y enviar', ru: 'Утвердить и отправить', ar: 'موافقة وإرسال' },
  "appr.flowStep4Sub": { he: 'הצעה מאושרת נשלחת ללקוח', en: 'Approved quote sent to customer', fr: 'Devis approuvé envoyé', es: 'Cotización aprobada enviada', ru: 'Утверждённое предложение отправлено', ar: 'يُرسل العرض المعتمد' },

  // Subscriptions
  "sub.title": { he: 'מנויים, חידושים והסכמים רב-שנתיים', en: 'Subscriptions, Renewals & Multi-year', fr: 'Abonnements, renouvellements, pluriannuels', es: 'Suscripciones, renovaciones, plurianuales', ru: 'Подписки, продления, многолетние', ar: 'الاشتراكات، التجديدات، متعددة السنوات' },
  "sub.subtitle": { he: 'מנויי CORS, חוזי שירות שנתיים והסכמי מסגרת 3 שנים', en: 'CORS subscriptions, annual contracts and 3-year frameworks', fr: 'Abonnements CORS, contrats annuels, accords 3 ans', es: 'CORS, contratos anuales, marcos 3 años', ru: 'CORS, годовые, 3-летние', ar: 'CORS، عقود سنوية، اتفاقيات 3 سنوات' },
  "sub.active": { he: 'פעילים', en: 'Active', fr: 'Actifs', es: 'Activos', ru: 'Активные', ar: 'النشطة' },
  "sub.renewalsDue": { he: 'חידושים קרובים', en: 'Renewals due', fr: 'Renouvellements', es: 'Renovaciones', ru: 'Продления', ar: 'التجديدات' },
  "sub.expired": { he: 'פגי תוקף', en: 'Expired', fr: 'Expirés', es: 'Vencidos', ru: 'Истекшие', ar: 'المنتهية' },
  "sub.multiYear": { he: 'רב-שנתיים', en: 'Multi-year', fr: 'Pluriannuels', es: 'Plurianuales', ru: 'Многолетние', ar: 'متعددة السنوات' },
  "sub.col.customer": { he: 'לקוח', en: 'Customer', fr: 'Client', es: 'Cliente', ru: 'Клиент', ar: 'العميل' },
  "sub.col.service": { he: 'שירות', en: 'Service', fr: 'Service', es: 'Servicio', ru: 'Услуга', ar: 'الخدمة' },
  "sub.col.startDate": { he: 'תחילה', en: 'Start', fr: 'Début', es: 'Inicio', ru: 'Начало', ar: 'البداية' },
  "sub.col.endDate": { he: 'סיום', en: 'End', fr: 'Fin', es: 'Fin', ru: 'Конец', ar: 'النهاية' },
  "sub.col.value": { he: 'ערך שנתי', en: 'Annual value', fr: 'Valeur annuelle', es: 'Valor anual', ru: 'Годовая стоимость', ar: 'القيمة السنوية' },
  "sub.col.renewalStatus": { he: 'מצב חידוש', en: 'Renewal status', fr: 'Statut', es: 'Estado', ru: 'Статус', ar: 'حالة التجديد' },
  "sub.col.actions": { he: 'פעולות', en: 'Actions', fr: 'Actions', es: 'Acciones', ru: 'Действия', ar: 'الإجراءات' },
  "sub.renewal.active": { he: 'פעיל', en: 'Active', fr: 'Actif', es: 'Activo', ru: 'Активный', ar: 'نشط' },
  "sub.renewal.due60": { he: 'חידוש ב-60 יום', en: 'Renewal in 60 days', fr: 'Renouv. 60j', es: 'Renov. 60d', ru: 'Через 60 дней', ar: 'تجديد خلال 60 يوماً' },
  "sub.renewal.due30": { he: 'חידוש ב-30 יום', en: 'Renewal in 30 days', fr: 'Renouv. 30j', es: 'Renov. 30d', ru: 'Через 30 дней', ar: 'تجديد خلال 30 يوماً' },
  "sub.renewal.expired": { he: 'פג תוקף', en: 'Expired', fr: 'Expiré', es: 'Vencido', ru: 'Истёк', ar: 'منتهي' },
  "sub.renewal.renewed": { he: 'חודש', en: 'Renewed', fr: 'Renouvelé', es: 'Renovado', ru: 'Продлён', ar: 'مُجدد' },
  "sub.btn.renew": { he: 'התחל חידוש', en: 'Start renewal', fr: 'Démarrer renouv.', es: 'Iniciar renov.', ru: 'Начать продление', ar: 'بدء التجديد' },
  "sub.btn.contact": { he: 'צור קשר', en: 'Contact', fr: 'Contacter', es: 'Contactar', ru: 'Связаться', ar: 'اتصل' },
  "sub.btn.viewContract": { he: 'הצג חוזה', en: 'View contract', fr: 'Voir contrat', es: 'Ver contrato', ru: 'Просмотр договора', ar: 'عرض العقد' },
  "sub.totalArr": { he: 'ARR (הכנסה שנתית חוזרת)', en: 'ARR (Annual Recurring Revenue)', fr: 'ARR', es: 'ARR', ru: 'ARR', ar: 'الإيراد السنوي المتكرر' },
  "sub.churnRate": { he: 'אחוז נטישה', en: 'Churn rate', fr: 'Taux d\'attrition', es: 'Tasa de pérdida', ru: 'Отток', ar: 'معدل التسرب' },
  "sub.expansion": { he: 'הרחבה', en: 'Expansion', fr: 'Expansion', es: 'Expansión', ru: 'Расширение', ar: 'التوسع' },
  "sub.netRetention": { he: 'שימור נטו', en: 'Net retention', fr: 'Rétention nette', es: 'Retención neta', ru: 'Чистая retention', ar: 'الاحتفاظ الصافي' },

  // Sales dashboard
  "sales.title": { he: 'דשבורד מכירות והכנסות', en: 'Sales & Revenue Dashboard', fr: 'Tableau ventes & revenus', es: 'Panel ventas e ingresos', ru: 'Дашборд продаж', ar: 'لوحة المبيعات والإيرادات' },
  "sales.subtitle": { he: 'KPI חי, מטרות מול ביצוע, חיבור להכנסות בפועל ומדדי המרה לכל סגמנט', en: 'Live KPIs, target vs actual, revenue link, conversion metrics per segment', fr: 'KPI temps réel, cible vs réel, conversion par segment', es: 'KPI vivos, objetivo vs real, conversión por segmento', ru: 'Живые KPI, цель vs факт, конверсия по сегменту', ar: 'مؤشرات حية، الهدف مقابل الفعلي، تحويل لكل قطاع' },
  "sales.thisMonth": { he: 'החודש', en: 'This month', fr: 'Ce mois', es: 'Este mes', ru: 'Этот месяц', ar: 'هذا الشهر' },
  "sales.lastMonth": { he: 'חודש שעבר', en: 'Last month', fr: 'Mois dernier', es: 'Mes pasado', ru: 'Прошлый месяц', ar: 'الشهر الماضي' },
  "sales.thisQuarter": { he: 'הרבעון', en: 'This quarter', fr: 'Ce trimestre', es: 'Este trimestre', ru: 'Этот квартал', ar: 'هذا الربع' },
  "sales.thisYear": { he: 'השנה', en: 'This year', fr: 'Cette année', es: 'Este año', ru: 'Этот год', ar: 'هذا العام' },
  "sales.revenueByChannel": { he: 'הכנסות לפי ערוץ', en: 'Revenue by channel', fr: 'CA par canal', es: 'Ingresos por canal', ru: 'Выручка по каналам', ar: 'الإيرادات حسب القناة' },
  "sales.revenueByProduct": { he: 'הכנסות לפי מוצר', en: 'Revenue by product', fr: 'CA par produit', es: 'Ingresos por producto', ru: 'Выручка по продукту', ar: 'الإيرادات حسب المنتج' },
  "sales.revenueBySegment": { he: 'הכנסות לפי סגמנט', en: 'Revenue by segment', fr: 'CA par segment', es: 'Ingresos por segmento', ru: 'Выручка по сегменту', ar: 'الإيرادات حسب القطاع' },
  "sales.targetVsActual": { he: 'מטרה מול ביצוע', en: 'Target vs actual', fr: 'Cible vs réel', es: 'Objetivo vs real', ru: 'Цель vs факт', ar: 'الهدف مقابل الفعلي' },
  "sales.topProducts": { he: 'מוצרים מובילים', en: 'Top products', fr: 'Top produits', es: 'Mejores productos', ru: 'Топ продукты', ar: 'أفضل المنتجات' },
  "sales.topCustomers": { he: 'לקוחות מובילים', en: 'Top customers', fr: 'Top clients', es: 'Mejores clientes', ru: 'Топ клиенты', ar: 'أفضل العملاء' },
  "sales.pipelineByStage": { he: 'פייפליין לפי שלב', en: 'Pipeline by stage', fr: 'Pipeline par étape', es: 'Pipeline por etapa', ru: 'Pipeline по этапам', ar: 'الأنبوب حسب المرحلة' },
  "sales.conversionFunnel": { he: 'משפך המרות', en: 'Conversion funnel', fr: 'Entonnoir de conversion', es: 'Embudo de conversión', ru: 'Воронка конверсии', ar: 'قمع التحويل' },
  "sales.formula.revenue": { he: 'הכנסה = Σ (כמות × מחיר יחידה) - הנחות + מע"מ', en: 'Revenue = Σ(qty × unit price) - discounts + VAT', fr: 'CA = Σ(qté × prix) - remises + TVA', es: 'Ingreso = Σ(cant × precio) - desc + IVA', ru: 'Выручка = Σ(кол × цена) - скидки + НДС', ar: 'الإيراد = Σ(الكمية × سعر الوحدة) - الخصومات + الضريبة' },
  "sales.formula.arr": { he: 'ARR = Σ (ערך שנתי של כל מנוי פעיל)', en: 'ARR = Σ(annual value of active subs)', fr: 'ARR = Σ(valeur annuelle abonnements)', es: 'ARR = Σ(valor anual)', ru: 'ARR = Σ(годовая стоимость)', ar: 'ARR = Σ(القيمة السنوية للاشتراكات)' },
  "sales.formula.winRate": { he: 'Win Rate = הצעות שזכינו ÷ הצעות שנשלחו × 100', en: 'Win Rate = Won quotes ÷ Sent quotes × 100', fr: 'Win Rate = Devis gagnés ÷ envoyés', es: 'Win Rate = Ganadas ÷ enviadas', ru: 'Win Rate = выиграны ÷ отправлены', ar: 'معدل الفوز = الفائزة ÷ المرسلة × 100' },
  "sales.formula.cac": { he: 'CAC = הוצאות מכירה ושיווק ÷ לקוחות חדשים', en: 'CAC = Sales & marketing spend ÷ new customers', fr: 'CAC = Dépenses S&M ÷ nouveaux clients', es: 'CAC = Gastos S&M ÷ clientes nuevos', ru: 'CAC = Расходы S&M ÷ новые клиенты', ar: 'CAC = نفقات المبيعات والتسويق ÷ العملاء الجدد' },
  "sales.respMatrix": { he: 'מטריצת אחריות', en: 'Responsibility matrix', fr: 'Matrice responsabilités', es: 'Matriz de responsabilidad', ru: 'Матрица ответственности', ar: 'مصفوفة المسؤوليات' },
  "sales.respMatrixTitle": { he: 'מי אחראי על מה - מכירות מול חטיבות מקצועיות', en: 'Who owns what - Sales vs Professional divisions', fr: 'Qui possède quoi - Ventes vs Divisions', es: 'Quién posee qué - Ventas vs Divisiones', ru: 'Кто за что отвечает - продажи vs дивизионы', ar: 'من المسؤول - المبيعات مقابل الأقسام' },
  "sales.respMatrixSub": { he: 'חלוקת אחריות ברורה לפי שלב בתהליך - לפי דרישת בעל היישום', en: 'Clear ownership by process stage - per business owner requirement', fr: 'Propriété claire par étape', es: 'Propiedad clara por etapa', ru: 'Чёткое владение по этапам', ar: 'ملكية واضحة حسب المرحلة' },
  "sales.role.sales": { he: 'מכירות', en: 'Sales', fr: 'Ventes', es: 'Ventas', ru: 'Продажи', ar: 'المبيعات' },
  "sales.role.division": { he: 'חטיבה מקצועית', en: 'Division', fr: 'Division', es: 'División', ru: 'Дивизион', ar: 'القسم' },
  "sales.role.both": { he: 'משותף', en: 'Joint', fr: 'Conjoint', es: 'Conjunto', ru: 'Совместно', ar: 'مشترك' },
  "sales.stage.lead": { he: 'ליד', en: 'Lead', fr: 'Lead', es: 'Lead', ru: 'Лид', ar: 'عميل محتمل' },
  "sales.stage.qualified": { he: 'מוסמך', en: 'Qualified', fr: 'Qualifié', es: 'Calificado', ru: 'Квалифицирован', ar: 'مؤهل' },
  "sales.stage.quote": { he: 'הצעת מחיר', en: 'Quote', fr: 'Devis', es: 'Cotización', ru: 'Предложение', ar: 'عرض السعر' },
  "sales.stage.negotiation": { he: 'מו"מ', en: 'Negotiation', fr: 'Négociation', es: 'Negociación', ru: 'Переговоры', ar: 'تفاوض' },
  "sales.stage.won": { he: 'נסגר', en: 'Won', fr: 'Gagné', es: 'Ganado', ru: 'Выиграно', ar: 'فائز' },
  "sales.target": { he: 'יעד', en: 'Target', fr: 'Cible', es: 'Objetivo', ru: 'Цель', ar: 'الهدف' },
  "sales.actual": { he: 'ביצוע', en: 'Actual', fr: 'Réel', es: 'Real', ru: 'Факт', ar: 'الفعلي' },
  "sales.gap": { he: 'פער', en: 'Gap', fr: 'Écart', es: 'Brecha', ru: 'Разрыв', ar: 'الفجوة' },
  "sales.attainment": { he: 'אחוז עמידה ביעד', en: 'Attainment', fr: 'Atteinte', es: 'Cumplimiento', ru: 'Достижение', ar: 'تحقيق الهدف' },

  // Content
  "cnt.title": { he: 'ניהול תוכן ובעלות', en: 'Content Management & Ownership', fr: 'Gestion contenu & propriété', es: 'Gestión y propiedad', ru: 'Управление контентом', ar: 'إدارة المحتوى والملكية' },
  "cnt.subtitle": { he: 'מי הבעלים של כל דף בפורטל, מתי עודכן לאחרונה ומתי הביקורת הבאה', en: 'Owner per page, last update, next review date', fr: 'Propriétaire, MAJ, prochaine revue', es: 'Propietario, actualización, próxima revisión', ru: 'Владелец, обновление, ревью', ar: 'المالك، آخر تحديث، المراجعة التالية' },
  "cnt.servicePages": { he: 'דפי שירות', en: 'Service pages', fr: 'Pages service', es: 'Páginas servicio', ru: 'Страницы услуг', ar: 'صفحات الخدمة' },
  "cnt.faqs": { he: 'שאלות נפוצות', en: 'FAQs', fr: 'FAQ', es: 'FAQs', ru: 'FAQ', ar: 'الأسئلة الشائعة' },
  "cnt.priceLists": { he: 'מחירונים', en: 'Price lists', fr: 'Tarifs', es: 'Listas precios', ru: 'Прайс-листы', ar: 'قوائم الأسعار' },
  "cnt.deliveryTimes": { he: 'זמני אספקה', en: 'Delivery times', fr: 'Délais', es: 'Plazos', ru: 'Сроки', ar: 'أوقات التسليم' },
  "cnt.col.page": { he: 'דף / סעיף', en: 'Page / section', fr: 'Page / section', es: 'Página', ru: 'Страница', ar: 'الصفحة' },
  "cnt.col.owner": { he: 'בעלים', en: 'Owner', fr: 'Propriétaire', es: 'Propietario', ru: 'Владелец', ar: 'المالك' },
  "cnt.col.lastUpdated": { he: 'עודכן', en: 'Updated', fr: 'Mis à jour', es: 'Actualizado', ru: 'Обновлён', ar: 'تم تحديث' },
  "cnt.col.nextReview": { he: 'ביקורת הבאה', en: 'Next review', fr: 'Prochaine revue', es: 'Próxima revisión', ru: 'След. ревью', ar: 'المراجعة التالية' },
  "cnt.col.status": { he: 'סטטוס', en: 'Status', fr: 'Statut', es: 'Estado', ru: 'Статус', ar: 'الحالة' },
  "cnt.status.current": { he: 'מעודכן', en: 'Current', fr: 'À jour', es: 'Vigente', ru: 'Актуально', ar: 'محدّث' },
  "cnt.status.review": { he: 'דורש ביקורת', en: 'Review needed', fr: 'À revoir', es: 'Revisar', ru: 'Требует ревью', ar: 'يحتاج مراجعة' },
  "cnt.status.outdated": { he: 'לא עדכני', en: 'Outdated', fr: 'Obsolète', es: 'Obsoleto', ru: 'Устарел', ar: 'قديم' },
  "cnt.owner.sales": { he: 'אגף המכירות', en: 'Sales department', fr: 'Direction ventes', es: 'Dpto ventas', ru: 'Отдел продаж', ar: 'قسم المبيعات' },
  "cnt.owner.geo": { he: 'חטיבת גיאודזיה', en: 'Geodesy division', fr: 'Division géodésie', es: 'División geodesia', ru: 'Дивизион геодезии', ar: 'قسم الجيوديسيا' },
  "cnt.owner.cadastre": { he: 'חטיבת קדסטר', en: 'Cadastre division', fr: 'Division cadastre', es: 'División catastro', ru: 'Дивизион кадастра', ar: 'قسم المساحة' },
  "cnt.owner.it": { he: 'אגף מערכות מידע', en: 'IT department', fr: 'DSI', es: 'TI', ru: 'IT отдел', ar: 'تقنية المعلومات' },
  "cnt.policies": { he: 'מדיניות ניהול תוכן', en: 'Content policy', fr: 'Politique contenu', es: 'Política', ru: 'Политика контента', ar: 'سياسة المحتوى' },
  "cnt.policyTitle": { he: 'מי אחראי לעדכן את הפורטל', en: 'Who is responsible to update the portal', fr: 'Qui met à jour', es: 'Quién actualiza', ru: 'Кто обновляет', ar: 'من يحدّث' },
  "cnt.policyText": { he: 'כל בעלי תוכן יעדכנו את הדפים תחת תחום אחריותם פעם ברבעון לפחות. אגף המכירות אחראי על מחירונים והנחות; החטיבות המקצועיות אחראיות על תוכן טכני ו-FAQ.', en: 'Each content owner must update assigned pages at least quarterly. Sales owns pricing and discounts; professional divisions own technical content and FAQs.', fr: 'Chaque propriétaire met à jour au moins par trimestre.', es: 'Cada propietario actualiza trimestralmente.', ru: 'Каждый владелец обновляет ежеквартально.', ar: 'يقوم كل مالك بالتحديث ربع سنوياً على الأقل.' },

  // Migration
  "mig.title": { he: 'הסבת נתוני עבר', en: 'Historical data migration', fr: 'Migration données', es: 'Migración datos', ru: 'Миграция данных', ar: 'هجرة البيانات التاريخية' },
  "mig.subtitle": { he: 'איזה נתונים יוסבו ל-Salesforce, כמה שנים אחורה ובאיזה מבנה', en: 'What migrates to Salesforce, how many years back, in what structure', fr: 'Quoi migrer vers Salesforce', es: 'Qué migrar a Salesforce', ru: 'Что мигрирует в Salesforce', ar: 'ماذا يُهاجر إلى Salesforce' },
  "mig.scope": { he: 'תכולה', en: 'Scope', fr: 'Périmètre', es: 'Alcance', ru: 'Объём', ar: 'النطاق' },
  "mig.years": { he: 'שנים אחורה', en: 'Years back', fr: 'Années passées', es: 'Años atrás', ru: 'Лет назад', ar: 'سنوات سابقة' },
  "mig.entity.orders": { he: 'הזמנות', en: 'Orders', fr: 'Commandes', es: 'Pedidos', ru: 'Заказы', ar: 'الطلبات' },
  "mig.entity.quotes": { he: 'הצעות מחיר', en: 'Quotes', fr: 'Devis', es: 'Cotizaciones', ru: 'Предложения', ar: 'العروض' },
  "mig.entity.subs": { he: 'מנויים', en: 'Subscriptions', fr: 'Abonnements', es: 'Suscripciones', ru: 'Подписки', ar: 'الاشتراكات' },
  "mig.entity.customers": { he: 'לקוחות', en: 'Customers', fr: 'Clients', es: 'Clientes', ru: 'Клиенты', ar: 'العملاء' },
  "mig.entity.invoices": { he: 'חשבוניות', en: 'Invoices', fr: 'Factures', es: 'Facturas', ru: 'Счета', ar: 'الفواتير' },
  "mig.col.entity": { he: 'ישות', en: 'Entity', fr: 'Entité', es: 'Entidad', ru: 'Сущность', ar: 'الكيان' },
  "mig.col.years": { he: 'טווח שנים', en: 'Years', fr: 'Plage', es: 'Años', ru: 'Годы', ar: 'السنوات' },
  "mig.col.records": { he: 'רשומות (אומדן)', en: 'Records (est.)', fr: 'Enreg. (est.)', es: 'Registros', ru: 'Записи', ar: 'السجلات' },
  "mig.col.structure": { he: 'מבנה יעד', en: 'Target structure', fr: 'Structure cible', es: 'Estructura', ru: 'Структура', ar: 'الهيكل' },
  "mig.col.status": { he: 'סטטוס', en: 'Status', fr: 'Statut', es: 'Estado', ru: 'Статус', ar: 'الحالة' },
  "mig.status.planned": { he: 'מתוכנן', en: 'Planned', fr: 'Planifié', es: 'Planificado', ru: 'Запланировано', ar: 'مخطط' },
  "mig.status.inProgress": { he: 'בביצוע', en: 'In progress', fr: 'En cours', es: 'En curso', ru: 'В работе', ar: 'قيد التنفيذ' },
  "mig.status.done": { he: 'הסתיים', en: 'Done', fr: 'Terminé', es: 'Terminado', ru: 'Завершено', ar: 'منجز' },

  // Home additions
  "home.shopByNeed": { he: 'מצא את עצמך - לפי סוג לקוח', en: 'Find yourself - by customer type', fr: 'Trouvez-vous par type', es: 'Encuéntrate por tipo', ru: 'Найдите себя по типу клиента', ar: 'اعثر على نفسك حسب نوع العميل' },
  "home.shopByNeedSub": { he: 'אנחנו ערוכים לכל סוג של לקוח - אזרח, מודד, רשות, ממשלה, בעל מקצוע ולקוח עסקי. בחר את המסלול שלך ותקבל חוויה מותאמת.', en: 'We serve every customer type - citizen, surveyor, authority, gov, professional, business. Pick your journey.', fr: 'Nous servons chaque type de client - citoyen, géomètre, autorité, gouvernement, professionnel, business.', es: 'Servimos a cada tipo: ciudadano, topógrafo, autoridad, gobierno, profesional, business.', ru: 'Мы обслуживаем все типы клиентов - частных лиц, геодезистов, власти, госорганы, профессионалов, бизнес.', ar: 'نخدم كل نوع - مواطن، مساح، سلطة، حكومة، محترف، أعمال.' },
  "home.salesTeam": { he: 'הצוות שלנו עומד לרשותך', en: 'Our team is here for you', fr: 'Notre équipe à votre service', es: 'Nuestro equipo a tu servicio', ru: 'Наша команда к вашим услугам', ar: 'فريقنا في خدمتك' },

  // 14 Sales Routes (Spec Chapter 5) - extra route metadata
  "route.type.A": { he: 'A - שירות עצמי מלא', en: 'A - Full self-service', fr: 'A - Auto libre-service', es: 'A - Autoservicio', ru: 'A - Самообслуживание', ar: 'A - خدمة ذاتية كاملة' },
  "route.type.B": { he: 'B - שירות עצמי + אישור', en: 'B - Self-service + approval', fr: 'B - Libre + approbation', es: 'B - Auto + aprobación', ru: 'B - Самооб. + утверждение', ar: 'B - ذاتية + موافقة' },
  "route.type.C": { he: 'C - הצעת מחיר', en: 'C - Quote required', fr: 'C - Devis requis', es: 'C - Cotización', ru: 'C - Предложение', ar: 'C - عرض سعر' },
  "route.type.D": { he: 'D - ניהול אסטרטגי', en: 'D - Strategic management', fr: 'D - Stratégique', es: 'D - Estratégico', ru: 'D - Стратегический', ar: 'D - استراتيجي' },
  "route.phase": { he: 'שלב יישום', en: 'Implementation phase', fr: 'Phase', es: 'Fase', ru: 'Этап', ar: 'مرحلة' },
  "route.division": { he: 'חטיבה אחראית', en: 'Owning division', fr: 'Division', es: 'División', ru: 'Дивизион', ar: 'القسم' },
  "route.div.cadastre": { he: 'קדסטר', en: 'Cadastre', fr: 'Cadastre', es: 'Catastro', ru: 'Кадастр', ar: 'المساحة' },
  "route.div.mapping": { he: 'מיפוי וממ"ג', en: 'Mapping & GIS', fr: 'Cartographie & GIS', es: 'Cartografía y GIS', ru: 'Картография и GIS', ar: 'الخرائط و GIS' },
  "route.div.geodesy": { he: 'גיאודזיה', en: 'Geodesy', fr: 'Géodésie', es: 'Geodesia', ru: 'Геодезия', ar: 'الجيوديسيا' },
  "route.div.technology": { he: 'טכנולוגיות', en: 'Technology', fr: 'Technologie', es: 'Tecnología', ru: 'Технологии', ar: 'التقنيات' },
  "route.div.general": { he: 'כללי', en: 'General', fr: 'Général', es: 'General', ru: 'Общее', ar: 'عام' },

  // Pipeline (Sales Stages) - Spec 4.1
  "pipe.title": { he: 'שלבי Pipeline אחידים', en: 'Unified Sales Pipeline', fr: 'Pipeline de ventes', es: 'Pipeline de ventas', ru: 'Воронка продаж', ar: 'مسار المبيعات الموحد' },
  "pipe.subtitle": { he: 'כל מסלולי המכירה מנוהלים במערכת אחידה של שלבים. כל שלב כולל גורם אחראי, SLA ופעולות אוטומטיות.', en: 'All sales routes use one unified stage system. Each stage has an owner, SLA and auto actions.', fr: 'Tous les parcours utilisent un système unifié.', es: 'Todas las rutas usan un sistema unificado.', ru: 'Все каналы используют единую систему.', ar: 'كل المسارات تستخدم نظاماً موحداً.' },
  "pipe.st.newLead": { he: '1. ליד חדש', en: '1. New Lead', fr: '1. Nouveau lead', es: '1. Lead nuevo', ru: '1. Новый лид', ar: '1. عميل محتمل جديد' },
  "pipe.st.review": { he: '2. בבדיקה', en: '2. Under Review', fr: '2. En examen', es: '2. En revisión', ru: '2. На проверке', ar: '2. قيد المراجعة' },
  "pipe.st.needsInfo": { he: '3. נדרש מידע נוסף', en: '3. Needs Info', fr: '3. Infos requises', es: '3. Falta info', ru: '3. Нужна информация', ar: '3. معلومات مطلوبة' },
  "pipe.st.quoteSent": { he: '4. הצעת מחיר נשלחה', en: '4. Quote Sent', fr: '4. Devis envoyé', es: '4. Cotización enviada', ru: '4. Предложение отправлено', ar: '4. أُرسل عرض السعر' },
  "pipe.st.negotiation": { he: '5. במשא ומתן', en: '5. Negotiation', fr: '5. Négociation', es: '5. Negociación', ru: '5. Переговоры', ar: '5. تفاوض' },
  "pipe.st.pendingPayment": { he: '6. ממתין לתשלום', en: '6. Pending Payment', fr: '6. Attente paiement', es: '6. Pago pendiente', ru: '6. Ожидание оплаты', ar: '6. بانتظار الدفع' },
  "pipe.st.paid": { he: '7. שולם', en: '7. Paid', fr: '7. Payé', es: '7. Pagado', ru: '7. Оплачено', ar: '7. مدفوع' },
  "pipe.st.fulfillment": { he: '8. באספקה', en: '8. In Fulfillment', fr: '8. En exécution', es: '8. En entrega', ru: '8. Исполнение', ar: '8. قيد التنفيذ' },
  "pipe.st.won": { he: '9. הושלם (Won)', en: '9. Closed Won', fr: '9. Gagné', es: '9. Ganado', ru: '9. Выиграно', ar: '9. فوز' },
  "pipe.st.lost": { he: '10. נסגר ללא רכישה', en: '10. Closed Lost', fr: '10. Perdu', es: '10. Perdido', ru: '10. Проиграно', ar: '10. خسارة' },
  "pipe.st.cancelled": { he: '11. מבוטל / זיכוי', en: '11. Cancelled / Refund', fr: '11. Annulé', es: '11. Cancelado', ru: '11. Отменено', ar: '11. ملغى / استرداد' },
  "pipe.probability": { he: '% סיכוי', en: 'Probability %', fr: '% probabilité', es: '% probabilidad', ru: '% вероятности', ar: '% الاحتمال' },
  "pipe.slaTarget": { he: 'יעד SLA', en: 'SLA Target', fr: 'Objectif SLA', es: 'Objetivo SLA', ru: 'Цель SLA', ar: 'هدف SLA' },
  "pipe.breachAction": { he: 'פעולה בחריגה', en: 'Breach Action', fr: 'Action en dépassement', es: 'Acción por incumplimiento', ru: 'Действие при нарушении', ar: 'إجراء التجاوز' },
  "pipe.transition": { he: 'תנאי מעבר', en: 'Transition Condition', fr: 'Condition de passage', es: 'Condición de avance', ru: 'Условие перехода', ar: 'شرط الانتقال' },
  "pipe.approvalThresholds": { he: 'ספי אישור הצעת מחיר (5 רמות)', en: 'Quote Approval Thresholds (5 tiers)', fr: 'Seuils d\'approbation (5)', es: 'Umbrales de aprobación (5)', ru: 'Пороги утверждения (5)', ar: 'حدود الموافقة (5)' },
  "pipe.discountLevels": { he: 'מדיניות הנחות — סמכויות אישור', en: 'Discount Policy — Approval Authority', fr: 'Politique de remise', es: 'Política de descuentos', ru: 'Политика скидок', ar: 'سياسة الخصومات' },
  "pipe.priceBooks": { he: 'מבנה המחירונים (7 מחירונים)', en: 'Price Books (7)', fr: 'Grilles tarifaires (7)', es: 'Listas de precios (7)', ru: 'Прайс-листы (7)', ar: 'قوائم الأسعار (7)' },
  "pipe.renewalTimeline": { he: 'ציר חידושים T-90 → T-0', en: 'Renewal Timeline T-90 → T-0', fr: 'Chronologie renouvellement', es: 'Cronología de renovación', ru: 'График продлений', ar: 'جدول التجديد' },
  "pipe.col.tier": { he: 'סף', en: 'Tier', fr: 'Palier', es: 'Nivel', ru: 'Уровень', ar: 'المستوى' },
  "pipe.col.range": { he: 'טווח', en: 'Range', fr: 'Plage', es: 'Rango', ru: 'Диапазон', ar: 'النطاق' },
  "pipe.col.approver": { he: 'מאשר', en: 'Approver', fr: 'Approbateur', es: 'Aprobador', ru: 'Утверждающий', ar: 'الموافق' },
  "pipe.col.slaApproval": { he: 'SLA אישור', en: 'Approval SLA', fr: 'SLA approbation', es: 'SLA aprobación', ru: 'SLA утверждения', ar: 'SLA الموافقة' },
  "pipe.col.docs": { he: 'תיעוד', en: 'Documentation', fr: 'Documentation', es: 'Documentación', ru: 'Документация', ar: 'التوثيق' },
  "pipe.col.priceBook": { he: 'מחירון', en: 'Price Book', fr: 'Grille', es: 'Lista', ru: 'Прайс', ar: 'قائمة الأسعار' },
  "pipe.col.discount": { he: 'הנחה', en: 'Discount', fr: 'Remise', es: 'Descuento', ru: 'Скидка', ar: 'الخصم' },
  "pipe.col.custType": { he: 'סוג לקוח', en: 'Customer Type', fr: 'Type client', es: 'Tipo cliente', ru: 'Тип клиента', ar: 'نوع العميل' },
  "pipe.col.source": { he: 'מקור', en: 'Source', fr: 'Source', es: 'Fuente', ru: 'Источник', ar: 'المصدر' },
  "pipe.indexation": { he: 'הצמדה למדד', en: 'CPI Indexation', fr: 'Indexation CPI', es: 'Indexación CPI', ru: 'Индексация CPI', ar: 'ربط بالمؤشر' },
  "cors.upsell.title": { he: '💡 שדרג למנוי שנתי וחסוך', en: '💡 Upgrade to annual & save', fr: '💡 Passez à l\'annuel et économisez', es: '💡 Cambia a anual y ahorra', ru: '💡 Годовая подписка — выгоднее', ar: '💡 قم بالترقية إلى سنوي ووفر' },
  "cors.upsell.body": { he: 'מנוי שנתי ₪{annual} במקום חודשי ₪{monthly} × 12 = ₪{yearly}', en: 'Annual ₪{annual} instead of monthly ₪{monthly} × 12 = ₪{yearly}', fr: 'Annuel ₪{annual} au lieu de ₪{monthly} × 12 = ₪{yearly}', es: 'Anual ₪{annual} en vez de ₪{monthly} × 12 = ₪{yearly}', ru: 'Годовая ₪{annual} вместо ₪{monthly} × 12 = ₪{yearly}', ar: 'سنوي ₪{annual} بدلاً من ₪{monthly} × 12 = ₪{yearly}' },
  "cors.upsell.savings": { he: 'חיסכון שנתי', en: 'yearly savings', fr: 'économie annuelle', es: 'ahorro anual', ru: 'экономия в год', ar: 'توفير سنوي' },
  "pipe.sla.days": { he: 'SLA (ימים)', en: 'SLA (days)', fr: 'SLA (jours)', es: 'SLA (días)', ru: 'SLA (дней)', ar: 'مستوى الخدمة (أيام)' },
  "pipe.sla.owner": { he: 'גורם אחראי', en: 'Owner', fr: 'Responsable', es: 'Responsable', ru: 'Ответственный', ar: 'المسؤول' },
  "pipe.sla.actions": { he: 'פעולות אוטומטיות', en: 'Auto actions', fr: 'Actions auto', es: 'Acciones auto', ru: 'Авто-действия', ar: 'إجراءات تلقائية' },
  "pipe.sla.onTime": { he: 'בזמן', en: 'On time', fr: 'À temps', es: 'A tiempo', ru: 'Вовремя', ar: 'في الوقت' },
  "pipe.sla.warning": { he: 'סמוך לחריגה', en: 'At risk', fr: 'À risque', es: 'En riesgo', ru: 'Под угрозой', ar: 'قريب من التجاوز' },
  "pipe.sla.breach": { he: 'חרג מ-SLA', en: 'SLA breach', fr: 'SLA dépassé', es: 'SLA superado', ru: 'Нарушение SLA', ar: 'تجاوز SLA' },

  // Strategic Accounts (Spec 4.4)
  "strat.title": { he: 'לקוחות אסטרטגיים', en: 'Strategic Accounts', fr: 'Comptes stratégiques', es: 'Cuentas estratégicas', ru: 'Стратегические клиенты', ar: 'الحسابات الاستراتيجية' },
  "strat.subtitle": { he: 'לקוחות מהותיים - הכנסה גדולה, פוטנציאל גבוה או חשיבות עסקית מיוחדת', en: 'High-revenue or high-potential customers requiring ongoing management', fr: 'Clients à fort revenu ou potentiel élevé', es: 'Clientes de alto ingreso o potencial', ru: 'Клиенты с высоким доходом или потенциалом', ar: 'عملاء عالي الإيرادات أو الإمكانات' },
  "strat.tier1": { he: 'Tier 1 - חיוני', en: 'Tier 1 - Critical', fr: 'Niveau 1 - Critique', es: 'Nivel 1 - Crítico', ru: 'Уровень 1 - Критический', ar: 'الفئة 1 - حرج' },
  "strat.tier2": { he: 'Tier 2 - חשוב', en: 'Tier 2 - Important', fr: 'Niveau 2 - Important', es: 'Nivel 2 - Importante', ru: 'Уровень 2 - Важный', ar: 'الفئة 2 - مهم' },
  "strat.tier3": { he: 'Tier 3 - סטנדרטי', en: 'Tier 3 - Standard', fr: 'Niveau 3 - Standard', es: 'Nivel 3 - Estándar', ru: 'Уровень 3 - Стандарт', ar: 'الفئة 3 - قياسي' },
  "strat.top20": { he: 'Top 20 לפי הכנסה (12 חודשים)', en: 'Top 20 by revenue (12 months)', fr: 'Top 20 par revenu', es: 'Top 20 por ingresos', ru: 'Топ 20 по выручке', ar: 'أفضل 20 حسب الإيرادات' },
  "strat.atRisk": { he: 'לקוחות בסיכון', en: 'At-risk customers', fr: 'Clients à risque', es: 'Clientes en riesgo', ru: 'Клиенты в группе риска', ar: 'العملاء المعرضون للخطر' },
  "strat.growing": { he: 'לקוחות בצמיחה', en: 'Growing customers', fr: 'Clients en croissance', es: 'Clientes en crecimiento', ru: 'Растущие клиенты', ar: 'العملاء النامون' },
  "strat.crossSell": { he: 'הזדמנויות Cross-sell', en: 'Cross-sell opportunities', fr: 'Opportunités Cross-sell', es: 'Cross-sell', ru: 'Возможности Cross-sell', ar: 'فرص البيع المتقاطع' },
  "strat.col.customer": { he: 'לקוח', en: 'Customer', fr: 'Client', es: 'Cliente', ru: 'Клиент', ar: 'العميل' },
  "strat.col.tier": { he: 'דרגה', en: 'Tier', fr: 'Niveau', es: 'Nivel', ru: 'Уровень', ar: 'المستوى' },
  "strat.col.am": { he: 'מנהל לקוח', en: 'Account Manager', fr: 'Gestionnaire', es: 'Gerente', ru: 'Менеджер', ar: 'مدير الحساب' },
  "strat.col.revenue12m": { he: 'הכנסה 12 חודשים', en: 'Revenue (12m)', fr: 'CA (12m)', es: 'Ingresos (12m)', ru: 'Выручка (12 мес)', ar: 'الإيرادات (12 شهر)' },
  "strat.col.contractEnd": { he: 'סיום חוזה', en: 'Contract end', fr: 'Fin contrat', es: 'Fin contrato', ru: 'Окончание', ar: 'نهاية العقد' },
  "strat.col.trend": { he: 'מגמה', en: 'Trend', fr: 'Tendance', es: 'Tendencia', ru: 'Тренд', ar: 'الاتجاه' },
  "strat.col.health": { he: 'בריאות לקוח', en: 'Health', fr: 'Santé', es: 'Salud', ru: 'Здоровье', ar: 'الصحة' },

  // Use Cases (Spec 4.13)
  "uc.title": { he: 'תרחישי שימוש יומיומיים', en: 'Daily Use Cases', fr: 'Cas d\'usage', es: 'Casos de uso', ru: 'Сценарии использования', ar: 'حالات الاستخدام اليومية' },
  "uc.subtitle": { he: '5 תרחישים מתארים אינטראקציה טיפוסית של פרסונה עם המערכת', en: '5 scenarios describing typical persona interactions', fr: '5 scénarios d\'interaction', es: '5 escenarios típicos', ru: '5 типовых сценариев', ar: '5 سيناريوهات نموذجية' },
  "uc.persona": { he: 'פרסונה', en: 'Persona', fr: 'Persona', es: 'Persona', ru: 'Персона', ar: 'الشخصية' },
  "uc.steps": { he: 'שלבים', en: 'Steps', fr: 'Étapes', es: 'Pasos', ru: 'Шаги', ar: 'الخطوات' },
  "uc.uc1.title": { he: 'מנהל אגף המכירות - יום עבודה', en: 'Sales Manager - typical day', fr: 'Manager - jour type', es: 'Gerente de ventas - día típico', ru: 'Менеджер по продажам - день', ar: 'مدير المبيعات - يوم نموذجي' },
  "uc.uc1.persona": { he: 'אלעד אסרף - ראש אגף מכירות', en: 'Sales Department Head', fr: 'Chef ventes', es: 'Jefe de ventas', ru: 'Глава отдела продаж', ar: 'رئيس قسم المبيعات' },
  "uc.uc1.step1": { he: 'בוקר: סקירת דשבורד Pipeline ו-SLA', en: 'Morning: Review pipeline + SLA dashboards', fr: 'Matin: revue pipeline', es: 'Mañana: revisar pipeline', ru: 'Утро: проверка pipeline', ar: 'الصباح: مراجعة المسار' },
  "uc.uc1.step2": { he: 'אישור 4 הצעות מחיר ממתינות (Approval Process)', en: 'Approve 4 pending quotes', fr: 'Approuver 4 devis', es: 'Aprobar 4 cotizaciones', ru: 'Утвердить 4 предложения', ar: 'الموافقة على 4 عروض' },
  "uc.uc1.step3": { he: 'פגישת סטטוס עם מנהלי חטיבות (Chatter)', en: 'Status meeting with division heads', fr: 'Réunion divisions', es: 'Reunión de estado', ru: 'Встреча с руководителями', ar: 'اجتماع رؤساء الأقسام' },
  "uc.uc1.step4": { he: 'סקירת לקוחות אסטרטגיים בסיכון - יצירת תוכניות פעולה', en: 'Review at-risk strategic accounts', fr: 'Revue comptes stratégiques', es: 'Revisar cuentas estratégicas', ru: 'Анализ риск-клиентов', ar: 'مراجعة الحسابات المعرضة للخطر' },
  "uc.uc1.step5": { he: 'בקרת חידושי מנוי (90/60/30 יום קדימה)', en: 'Subscription renewal review (90/60/30 days)', fr: 'Revue renouvellements', es: 'Revisión renovaciones', ru: 'Проверка продлений', ar: 'مراجعة التجديدات' },

  "uc.uc2.title": { he: 'איש מכירות - עיבוד ליד חדש', en: 'Sales Rep - new lead processing', fr: 'Commercial - nouveau lead', es: 'Vendedor - lead nuevo', ru: 'Менеджер - новый лид', ar: 'مندوب - عميل محتمل جديد' },
  "uc.uc2.persona": { he: 'איש מכירות - תיק עסקים פרטיים', en: 'Sales Rep - business accounts', fr: 'Commercial B2B', es: 'Vendedor B2B', ru: 'B2B менеджер', ar: 'مندوب B2B' },
  "uc.uc2.step1": { he: 'קבלת התראה על ליד חדש שהוקצה (Round Robin)', en: 'Receive new-lead alert (assignment)', fr: 'Notification nouveau lead', es: 'Notificación lead nuevo', ru: 'Уведомление о новом лиде', ar: 'تنبيه عميل جديد' },
  "uc.uc2.step2": { he: 'בדיקת פרטי הליד וניקוד אוטומטי (Lead Score)', en: 'Review lead details & auto-score', fr: 'Vérifier lead', es: 'Revisar lead', ru: 'Проверка лида', ar: 'مراجعة العميل' },
  "uc.uc2.step3": { he: 'יצירת קשר ראשוני (Call/Email) ותיעוד במערכת', en: 'Initial contact & log activity', fr: 'Premier contact', es: 'Primer contacto', ru: 'Первичный контакт', ar: 'الاتصال الأولي' },
  "uc.uc2.step4": { he: 'המרת ליד ל-Opportunity + יצירת Quote', en: 'Convert lead → Opportunity + Quote', fr: 'Convertir lead', es: 'Convertir lead', ru: 'Конвертация в сделку', ar: 'تحويل العميل المحتمل' },

  "uc.uc3.title": { he: 'אזרח פרטי - רכישת מפה ראשונה', en: 'Private Citizen - first map purchase', fr: 'Citoyen - première carte', es: 'Ciudadano - primer mapa', ru: 'Гражданин - первая карта', ar: 'مواطن - أول خريطة' },
  "uc.uc3.persona": { he: 'אזרח שזקוק למפת תיור', en: 'Citizen needing a tourist map', fr: 'Citoyen', es: 'Ciudadano', ru: 'Гражданин', ar: 'مواطن' },
  "uc.uc3.step1": { he: 'כניסה לפורטל בלי הזדהות, עיון בקטלוג', en: 'Browse catalog without sign-in', fr: 'Parcourir sans connexion', es: 'Navegar sin sesión', ru: 'Просмотр без входа', ar: 'تصفح بدون تسجيل' },
  "uc.uc3.step2": { he: 'בחירת מפה - הוספה לעגלה', en: 'Pick map - add to cart', fr: 'Choisir carte', es: 'Elegir mapa', ru: 'Выбрать карту', ar: 'اختر الخريطة' },
  "uc.uc3.step3": { he: 'הזדהות לאומית + מילוי כתובת משלוח', en: 'National identity sign-in + delivery info', fr: 'Connexion + adresse', es: 'Identidad + dirección', ru: 'Вход + адрес', ar: 'تسجيل + عنوان' },
  "uc.uc3.step4": { he: 'תשלום ב-shrut התשלומים הממשלתי', en: 'Pay via government payment server', fr: 'Paiement gouvernemental', es: 'Pago gubernamental', ru: 'Госуд. оплата', ar: 'دفع حكومي' },
  "uc.uc3.step5": { he: 'קבלת אישור במייל + SMS, מעקב משלוח באזור אישי', en: 'Email+SMS confirmation, track shipment', fr: 'Confirmation + suivi', es: 'Confirmación + seguimiento', ru: 'Подтверждение + отслеживание', ar: 'تأكيد ومتابعة' },

  "uc.uc4.title": { he: 'מודד מוסמך - חידוש מנוי CORS', en: 'Licensed Surveyor - CORS renewal', fr: 'Géomètre - renouv. CORS', es: 'Topógrafo - renovación CORS', ru: 'Геодезист - продление CORS', ar: 'مساح - تجديد CORS' },
  "uc.uc4.persona": { he: 'מודד פעיל עם מנוי שמסתיים', en: 'Active surveyor with expiring subscription', fr: 'Géomètre actif', es: 'Topógrafo activo', ru: 'Активный геодезист', ar: 'مساح نشط' },
  "uc.uc4.step1": { he: 'קבלת SMS 14 ימים לפני תום מנוי', en: 'Receive SMS 14 days before expiry', fr: 'SMS 14 jours avant', es: 'SMS 14 días antes', ru: 'SMS за 14 дней', ar: 'SMS قبل 14 يوماً' },
  "uc.uc4.step2": { he: 'כניסה לפורטל - אזור אישי', en: 'Login to portal - dashboard', fr: 'Espace personnel', es: 'Panel personal', ru: 'Личный кабинет', ar: 'حساب شخصي' },
  "uc.uc4.step3": { he: 'לחיצה על "חדש מנוי" - הצגת המלצות', en: 'Click "Renew" - see recommendations', fr: 'Cliquer Renouv.', es: 'Renovar - recomendaciones', ru: 'Продлить - рекомендации', ar: 'تجديد - توصيات' },
  "uc.uc4.step4": { he: 'תשלום + הפעלה אוטומטית של geo++', en: 'Pay + auto-activate geo++', fr: 'Paiement + activation', es: 'Pagar + activar', ru: 'Оплата + активация', ar: 'الدفع والتفعيل' },

  "uc.uc5.title": { he: 'לקוח אסטרטגי - הסכם רב-שנתי', en: 'Strategic Account - multi-year contract', fr: 'Compte stratégique', es: 'Cuenta estratégica', ru: 'Стратег. клиент - договор', ar: 'حساب استراتيجي - اتفاقية' },
  "uc.uc5.persona": { he: 'משרד ממשלתי - מנכ"ל ראש פרויקט', en: 'Government ministry CTO', fr: 'CTO ministère', es: 'CTO ministerio', ru: 'CTO министерства', ar: 'مدير تقني وزاري' },
  "uc.uc5.step1": { he: 'פגישת היכרות עם מנהל אגף המכירות', en: 'Intro meeting with sales head', fr: 'Réunion intro', es: 'Reunión inicial', ru: 'Встреча', ar: 'اجتماع تعارف' },
  "uc.uc5.step2": { he: 'יצירת Account Plan + הזדמנות', en: 'Build Account Plan + Opportunity', fr: 'Plan compte', es: 'Plan de cuenta', ru: 'Account plan', ar: 'خطة حساب' },
  "uc.uc5.step3": { he: 'הצעת מחיר מורכבת - אישור CFO + CEO', en: 'Complex quote - CFO+CEO approval', fr: 'Devis complexe', es: 'Cotización compleja', ru: 'Сложное предложение', ar: 'عرض معقد' },
  "uc.uc5.step4": { he: 'חתימה דיגיטלית, יצירת Contract + Subscription', en: 'Digital sign, create Contract + Subscription', fr: 'Signature digitale', es: 'Firma digital', ru: 'Цифровая подпись', ar: 'توقيع رقمي' },
  "uc.uc5.step5": { he: 'מעקב ביצוע + פגישות סטטוס רבעוניות', en: 'Track delivery + quarterly QBRs', fr: 'Suivi + QBR', es: 'Seguimiento + QBR', ru: 'Контроль + QBR', ar: 'متابعة + اجتماعات ربعية' },

  // Success Goals (Spec 4.14)
  "goals.title": { he: 'יעדי הצלחה לשנה ראשונה', en: 'Year-1 Success Goals', fr: 'Objectifs an 1', es: 'Objetivos año 1', ru: 'Цели на 1-й год', ar: 'أهداف السنة الأولى' },
  "goals.subtitle": { he: '12 חודשים מ-Go-Live - מדדים עסקיים, ניהוליים וטכניים', en: '12 months from Go-Live - business, ops & tech KPIs', fr: '12 mois Go-Live', es: '12 meses Go-Live', ru: '12 месяцев с запуска', ar: '12 شهراً من الإطلاق' },
  "goals.kpi.revenue": { he: 'גידול הכנסות', en: 'Revenue growth', fr: 'Croissance CA', es: 'Crecimiento ingresos', ru: 'Рост выручки', ar: 'نمو الإيرادات' },
  "goals.kpi.revenueTarget": { he: '+15% מול שנה קודמת', en: '+15% YoY', fr: '+15% A/A', es: '+15% interanual', ru: '+15% YoY', ar: '+15% سنوياً' },
  "goals.kpi.cycle": { he: 'קיצור זמן מחזור מכירה', en: 'Sales cycle reduction', fr: 'Réduction cycle', es: 'Reducción ciclo', ru: 'Сокращение цикла', ar: 'تقليص الدورة' },
  "goals.kpi.cycleTarget": { he: '-30% (מ-60 ל-42 ימים)', en: '-30% (60 → 42 days)', fr: '-30% (60 → 42j)', es: '-30% (60 → 42d)', ru: '-30% (60 → 42 дн)', ar: '-30% (60 → 42 يوم)' },
  "goals.kpi.satisfaction": { he: 'שביעות רצון לקוחות', en: 'Customer satisfaction', fr: 'Satisfaction', es: 'Satisfacción', ru: 'Удовлетворённость', ar: 'رضا العملاء' },
  "goals.kpi.satisfactionTarget": { he: 'CSAT ≥ 4.2/5', en: 'CSAT ≥ 4.2/5', fr: 'CSAT ≥ 4.2/5', es: 'CSAT ≥ 4.2/5', ru: 'CSAT ≥ 4.2/5', ar: 'رضا ≥ 4.2/5' },
  "goals.kpi.adoption": { he: 'אימוץ הפורטל', en: 'Portal adoption', fr: 'Adoption portail', es: 'Adopción portal', ru: 'Адопция портала', ar: 'تبني البوابة' },
  "goals.kpi.adoptionTarget": { he: '60% מההזמנות דרך הפורטל', en: '60% of orders via portal', fr: '60% via portail', es: '60% por portal', ru: '60% через портал', ar: '60% عبر البوابة' },
  "goals.kpi.renewal": { he: 'שיעור חידוש מנויים', en: 'Renewal rate', fr: 'Taux renouv.', es: 'Tasa renovación', ru: 'Renewal Rate', ar: 'معدل التجديد' },
  "goals.kpi.renewalTarget": { he: '≥ 85%', en: '≥ 85%', fr: '≥ 85%', es: '≥ 85%', ru: '≥ 85%', ar: '≥ 85%' },
  "goals.kpi.upsell": { he: 'הזדמנויות Upsell/Cross-sell', en: 'Upsell/Cross-sell opps', fr: 'Opps Cross-sell', es: 'Opps Cross-sell', ru: 'Доп. возможности', ar: 'فرص البيع' },
  "goals.kpi.upsellTarget": { he: '+25% מסך ההכנסה', en: '+25% of total revenue', fr: '+25% du CA', es: '+25% ingresos', ru: '+25% выручки', ar: '+25% الإيرادات' },
  "goals.measurement": { he: 'מנגנון מדידה', en: 'Measurement', fr: 'Mesure', es: 'Medición', ru: 'Измерение', ar: 'القياس' },
  "goals.dashboardRT": { he: 'דשבורד "יעדי הצלחה" - בזמן אמת', en: '"Success goals" dashboard - real time', fr: 'Tableau objectifs - temps réel', es: 'Panel objetivos - tiempo real', ru: 'Дашборд целей - в реальном времени', ar: 'لوحة أهداف - فورية' },
  "goals.monthlyMeeting": { he: 'פגישת סטטוס חודשית עם מנכ"ל', en: 'Monthly status with CEO', fr: 'Statut mensuel DG', es: 'Estado mensual CEO', ru: 'Ежемес. статус с CEO', ar: 'حالة شهرية مع المدير' },
  "goals.qbr": { he: 'QBR רבעוני עם הספק', en: 'Quarterly Business Review', fr: 'QBR trimestriel', es: 'QBR trimestral', ru: 'QBR ежекв.', ar: 'مراجعة ربعية' },
  "goals.executiveReport": { he: 'דוח רבעוני להנהלה הבכירה', en: 'Quarterly executive report', fr: 'Rapport exécutif', es: 'Informe ejecutivo', ru: 'Отчёт руководству', ar: 'تقرير تنفيذي ربعي' },

  // Nav additions
  "nav.pipeline": { he: 'Pipeline', en: 'Pipeline', fr: 'Pipeline', es: 'Pipeline', ru: 'Pipeline', ar: 'مسار البيع' },
  "nav.strategic": { he: 'לקוחות אסטרטגיים', en: 'Strategic Accounts', fr: 'Comptes stratégiques', es: 'Cuentas estratégicas', ru: 'Стратег. клиенты', ar: 'الحسابات الاستراتيجية' },
  "nav.useCases": { he: 'תרחישי שימוש', en: 'Use Cases', fr: 'Cas d\'usage', es: 'Casos de uso', ru: 'Сценарии', ar: 'حالات الاستخدام' },
  "nav.goals": { he: 'יעדי הצלחה', en: 'Success Goals', fr: 'Objectifs', es: 'Objetivos', ru: 'Цели', ar: 'الأهداف' },

  // Support Modal - extended
  "support.closeAria": { he: 'סגור חלון', en: 'Close window', fr: 'Fermer', es: 'Cerrar', ru: 'Закрыть', ar: 'إغلاق' },
  "support.closeTip": { he: 'סגור טופס פנייה', en: 'Close support form', fr: 'Fermer le formulaire', es: 'Cerrar formulario', ru: 'Закрыть форму', ar: 'إغلاق النموذج' },
  "support.headerEyebrow": { he: 'שירות לקוחות', en: 'Customer Service', fr: 'Service Client', es: 'Atención al Cliente', ru: 'Служба поддержки', ar: 'خدمة العملاء' },
  "support.altRoutes": { he: '📌 מסלולי מענה נוספים:', en: '📌 Additional contact routes:', fr: '📌 Autres canaux:', es: '📌 Otras vías:', ru: '📌 Другие каналы:', ar: '📌 قنوات تواصل إضافية:' },
  "support.directDial": { he: 'חיוג ישיר', en: 'Direct dial', fr: 'Appel direct', es: 'Llamada directa', ru: 'Прямой звонок', ar: 'اتصال مباشر' },
  "support.govFormLabel": { he: 'טופס gov.il המלא', en: 'Full gov.il form', fr: 'Formulaire gov.il', es: 'Formulario gov.il', ru: 'Полная форма gov.il', ar: 'نموذج gov.il الكامل' },
  "support.done": { he: 'סיום', en: 'Done', fr: 'Terminer', es: 'Listo', ru: 'Готово', ar: 'تم' },
  "support.refNum": { he: 'מספר אסמכתא:', en: 'Reference number:', fr: 'N° de référence:', es: 'Nº de referencia:', ru: 'Номер обращения:', ar: 'رقم المرجع:' },
  "support.quickPhone": { he: 'טלפון', en: 'Phone', fr: 'Téléphone', es: 'Teléfono', ru: 'Телефон', ar: 'هاتف' },
  "support.quickEmail": { he: 'מייל', en: 'Email', fr: 'E-mail', es: 'Correo', ru: 'E-mail', ar: 'بريد' },
  "support.quickGov": { he: 'gov.il', en: 'gov.il', fr: 'gov.il', es: 'gov.il', ru: 'gov.il', ar: 'gov.il' },
  "support.quickGovDesc": { he: 'טופס מלא', en: 'Full form', fr: 'Formulaire', es: 'Formulario', ru: 'Полная форма', ar: 'نموذج كامل' },
  "support.phoneTip": { he: 'חיוג ישיר למוקד', en: 'Direct call to support', fr: 'Appel direct', es: 'Llamada directa', ru: 'Прямой звонок', ar: 'اتصال مباشر' },
  "support.emailTip": { he: 'פתח מייל בתוכנת המייל שלך', en: 'Open in your mail app', fr: 'Ouvrir dans votre messagerie', es: 'Abrir en tu correo', ru: 'Открыть в почте', ar: 'افتح في تطبيق البريد' },
  "support.govTip": { he: 'פתיחת טופס gov.il המלא', en: 'Open the full gov.il form', fr: 'Ouvrir le formulaire gov.il', es: 'Abrir formulario gov.il', ru: 'Открыть форму gov.il', ar: 'افتح نموذج gov.il' },
  "support.idHint": { he: '9 ספרות', en: '9 digits', fr: '9 chiffres', es: '9 dígitos', ru: '9 цифр', ar: '9 أرقام' },
  "support.typeSelect": { he: 'בחר...', en: 'Select...', fr: 'Choisir...', es: 'Seleccionar...', ru: 'Выбрать...', ar: 'اختر...' },
  "support.type.tech": { he: 'תקלה טכנית בפורטל', en: 'Technical issue in portal', fr: 'Problème technique', es: 'Problema técnico', ru: 'Техническая проблема', ar: 'مشكلة تقنية' },
  "support.type.order": { he: 'בעיה עם הזמנה', en: 'Order issue', fr: 'Problème de commande', es: 'Problema con pedido', ru: 'Проблема с заказом', ar: 'مشكلة في الطلب' },
  "support.type.content": { he: 'שאלת תוכן מקצועית', en: 'Professional content query', fr: 'Question contenu', es: 'Consulta de contenido', ru: 'Содержательный вопрос', ar: 'استفسار محتوى' },
  "support.type.payment": { he: 'חשבונית / תשלום', en: 'Invoice / payment', fr: 'Facture / paiement', es: 'Factura / pago', ru: 'Счёт / платёж', ar: 'فاتورة / دفع' },
  "support.type.quote": { he: 'הצעת מחיר', en: 'Quote', fr: 'Devis', es: 'Cotización', ru: 'Предложение', ar: 'عرض سعر' },
  "support.type.other": { he: 'אחר', en: 'Other', fr: 'Autre', es: 'Otro', ru: 'Другое', ar: 'أخرى' },
  "support.orderOptional": { he: 'מספר הזמנה (אופציונלי)', en: 'Order number (optional)', fr: 'N° commande (facult.)', es: 'Nº pedido (opc.)', ru: '№ заказа (опц.)', ar: 'رقم الطلب (اختياري)' },
  "support.orderPlaceholder": { he: 'למשל: ORD-2026-145', en: 'e.g.: ORD-2026-145', fr: 'ex.: ORD-2026-145', es: 'ej.: ORD-2026-145', ru: 'напр.: ORD-2026-145', ar: 'مثال: ORD-2026-145' },
  "support.subjectPlaceholder": { he: 'למשל: לא קיבלתי את המפה שהזמנתי', en: 'e.g.: I did not receive my map', fr: 'ex.: je n\'ai pas reçu ma carte', es: 'ej.: no recibí mi mapa', ru: 'напр.: не получил карту', ar: 'مثال: لم أستلم الخريطة' },
  "support.descPlaceholder": { he: 'תאר/י את הבעיה...', en: 'Describe the issue...', fr: 'Décrivez le problème...', es: 'Describe el problema...', ru: 'Опишите проблему...', ar: 'صف المشكلة...' },
  "support.privacyNote": { he: 'הפנייה תועבר לעיבוד במערכת המוקד הארצית של מפ"י תוך כפיפות ל-', en: 'Your case will be processed by MAPI national support, subject to ', fr: 'Votre demande sera traitée par le centre national MAPI selon ', es: 'Tu caso será procesado por el centro nacional, sujeto a ', ru: 'Обработка в национальном центре MAPI согласно ', ar: 'تتم المعالجة في المركز الوطني MAPI وفق ' },
  "support.privacyLink": { he: 'מדיניות הפרטיות', en: 'Privacy Policy', fr: 'Politique de confidentialité', es: 'Política de privacidad', ru: 'Политике конфиденциальности', ar: 'سياسة الخصوصية' },
  "support.cancelTip": { he: 'ביטול הפנייה', en: 'Cancel case', fr: 'Annuler', es: 'Cancelar', ru: 'Отмена', ar: 'إلغاء' },
  "support.submitTip": { he: 'שליחת הפנייה למוקד הארצי של מפ"י', en: 'Send case to MAPI national support', fr: 'Envoyer au centre national MAPI', es: 'Enviar al centro nacional MAPI', ru: 'Отправить в национальный центр', ar: 'إرسال للمركز الوطني' },

  // Quote Modal extended
  "quote.priceRange": { he: 'החל מ-', en: 'From', fr: 'À partir de', es: 'Desde', ru: 'От', ar: 'ابتداء من' },
  "quote.priceUnit": { he: 'עד', en: 'to', fr: 'à', es: 'hasta', ru: 'до', ar: 'إلى' },
  "quote.closeAria": { he: 'סגור חלון', en: 'Close', fr: 'Fermer', es: 'Cerrar', ru: 'Закрыть', ar: 'إغلاق' },
  "quote.closeTip": { he: 'סגור טופס הצעת מחיר', en: 'Close quote form', fr: 'Fermer le devis', es: 'Cerrar cotización', ru: 'Закрыть форму', ar: 'إغلاق العرض' },
  "quote.included.short": { he: 'מה כלול בהצעה', en: 'What\'s in this quote', fr: 'Inclus dans le devis', es: 'Incluido', ru: 'Включено', ar: 'متضمن' },
  "quote.send.tip": { he: 'נציג יצור איתך קשר תוך 1 ימי עסקים עם הצעת מחיר מפורטת', en: 'A rep will contact you within 1 business day', fr: 'Un agent vous contactera sous 1 jour', es: 'Un agente te contactará en 1 día', ru: 'С вами свяжутся в течение 1 дня', ar: 'سيتواصل معك مندوب خلال يوم عمل' },
  "quote.notes.placeholder": { he: 'למשל: גודל מסוים, אזור גיאוגרפי, פורמט מבוקש...', en: 'e.g.: specific size, area, format...', fr: 'ex. taille, zone, format...', es: 'tamaño, zona, formato...', ru: 'размер, область, формат...', ar: 'الحجم، المنطقة، الصيغة...' },
  "quote.privacy": { he: 'בלחיצה אני מאשר/ת את מדיניות הפרטיות של מפ"י', en: 'By clicking I accept MAPI\'s privacy policy', fr: 'En cliquant j\'accepte la politique', es: 'Al hacer clic acepto la política', ru: 'Нажимая, я принимаю политику', ar: 'بالنقر أوافق على السياسة' },

  // News Ticker headlines (sentence form, max ~7 words)
  "ticker.headline.aerial": { he: 'אורתופוטו חדש זמין באזור המרכז', en: 'New orthophoto live in central region', fr: 'Nouveau orthophoto centre disponible', es: 'Nuevo ortofoto centro disponible', ru: 'Новое ортофото центрального региона', ar: 'صور جوية جديدة متاحة في المركز' },
  "ticker.headline.dem": { he: 'מודלי גובה DSM ו-DTM עודכנו ברזולוציה גבוהה', en: 'DSM and DTM elevation models updated', fr: 'DSM et DTM mis à jour', es: 'DSM y DTM actualizados', ru: 'DSM и DTM обновлены', ar: 'تحديث نماذج الارتفاع DSM و DTM' },
  "ticker.headline.maps": { he: 'מחירוני המפות עודכנו לקראת השנה החדשה', en: 'Map prices updated for the new year', fr: 'Prix cartes mis à jour 2026', es: 'Precios mapas actualizados 2026', ru: 'Цены карт обновлены 2026', ar: 'تحديث أسعار الخرائط 2026' },
  "ticker.headline.cors": { he: 'מנוי CORS שנתי במחיר מבצע מיוחד', en: 'Annual CORS subscription at special price', fr: 'CORS annuel prix spécial', es: 'CORS anual precio especial', ru: 'Годовая подписка CORS со скидкой', ar: 'اشتراك CORS سنوي بسعر مميز' },
  "ticker.headline.holiday": { he: 'מוקד השירות פתוח בחגים ובחופשות', en: 'Customer support open during holidays', fr: 'Support ouvert pendant fêtes', es: 'Soporte abierto en festivos', ru: 'Поддержка в праздники', ar: 'الدعم متاح خلال الأعياد' },

  // AI Assistant
  "ai.greet.fallback": { he: 'אני המסייע החכם של מפ"י. במה אוכל לעזור?', en: 'I am MAPI\'s smart assistant. How can I help?', fr: 'Je suis l\'assistant MAPI. Comment puis-je aider ?', es: 'Soy el asistente MAPI. ¿Cómo ayudo?', ru: 'Я ИИ-помощник MAPI. Чем помочь?', ar: 'أنا مساعد MAPI الذكي. كيف أساعدك؟' },
  "ai.btn.aria": { he: 'פתח צ\'אט תמיכה חכם', en: 'Open smart support chat', fr: 'Ouvrir le chat', es: 'Abrir chat de soporte', ru: 'Открыть чат поддержки', ar: 'افتح محادثة الدعم الذكية' },
  "ai.btn.tip": { he: 'צ\'אט תמיכה חכם - מענה מיידי', en: 'Smart support - instant answers', fr: 'Support intelligent', es: 'Soporte inteligente', ru: 'Умная поддержка - мгновенно', ar: 'دعم ذكي - رد فوري' },
  "ai.btn.label": { he: 'עזרה?', en: 'Help?', fr: 'Aide ?', es: '¿Ayuda?', ru: 'Помощь?', ar: 'مساعدة؟' },
  "ai.close": { he: 'סגור צ\'אט', en: 'Close chat', fr: 'Fermer chat', es: 'Cerrar chat', ru: 'Закрыть чат', ar: 'إغلاق المحادثة' },
  "ai.minimize": { he: 'מזער', en: 'Minimize', fr: 'Réduire', es: 'Minimizar', ru: 'Свернуть', ar: 'تصغير' },

  // Strategic health
  "strat.health.healthy": { he: 'תקין', en: 'Healthy', fr: 'Sain', es: 'Saludable', ru: 'Здоровый', ar: 'سليم' },
  "strat.health.watch": { he: 'מעקב', en: 'Watch', fr: 'Surveiller', es: 'Vigilar', ru: 'Наблюдение', ar: 'متابعة' },
  "strat.health.atRisk": { he: 'בסיכון', en: 'At risk', fr: 'À risque', es: 'En riesgo', ru: 'В зоне риска', ar: 'في خطر' },
  "strat.customersLabel": { he: 'לקוחות', en: 'customers', fr: 'clients', es: 'clientes', ru: 'клиентов', ar: 'عملاء' },
  "strat.revenueShare": { he: 'מההכנסה', en: 'of revenue', fr: 'du CA', es: 'del ingreso', ru: 'выручки', ar: 'من الإيرادات' },

  // Admin layout groups
  "admin.group.overview": { he: 'סקירה כללית', en: 'Overview', fr: 'Vue d\'ensemble', es: 'Resumen', ru: 'Обзор', ar: 'نظرة عامة' },
  "admin.group.sales": { he: 'מכירות', en: 'Sales', fr: 'Ventes', es: 'Ventas', ru: 'Продажи', ar: 'المبيعات' },
  "admin.group.ops": { he: 'תפעול', en: 'Operations', fr: 'Opérations', es: 'Operaciones', ru: 'Операции', ar: 'العمليات' },
  "admin.group.content": { he: 'תוכן', en: 'Content', fr: 'Contenu', es: 'Contenido', ru: 'Контент', ar: 'المحتوى' },

  // Login tooltip
  "login.tip.national": { he: 'התחברות לאזרחים פרטיים בעזרת מערכת ההזדהות הלאומית של ממשלת ישראל', en: 'Sign-in for citizens via Israel National Identity', fr: 'Connexion citoyens via Identité Nationale', es: 'Acceso ciudadanos via Identidad Nacional', ru: 'Вход граждан через нац. идентификацию', ar: 'دخول للمواطنين عبر الهوية الوطنية' },

  // Pipeline page extras
  "pipe.routeTypes": { he: 'סוגי מסלולים', en: 'Route types', fr: 'Types de parcours', es: 'Tipos de ruta', ru: 'Типы маршрутов', ar: 'أنواع المسارات' },
  "pipe.stageFunnel": { he: 'משפך שלבים', en: 'Stage funnel', fr: 'Entonnoir', es: 'Embudo', ru: 'Воронка этапов', ar: 'قمع المراحل' },
  "pipe.slaActionsTitle": { he: 'SLA + פעולות אוטומטיות לכל שלב', en: 'SLA + automated actions per stage', fr: 'SLA + actions auto par étape', es: 'SLA + acciones por etapa', ru: 'SLA + действия по этапам', ar: 'SLA + إجراءات لكل مرحلة' },
  "pipe.activeOpps": { he: 'הזדמנויות פעילות + SLA', en: 'Active opportunities + SLA', fr: 'Opportunités actives', es: 'Oportunidades activas', ru: 'Активные возможности', ar: 'الفرص النشطة' },
  "pipe.col.routeId": { he: 'מזהה', en: 'ID', fr: 'ID', es: 'ID', ru: 'ID', ar: 'المعرف' },
  "pipe.col.opportunity": { he: 'הזדמנות', en: 'Opportunity', fr: 'Opportunité', es: 'Oportunidad', ru: 'Возможность', ar: 'الفرصة' },
  "pipe.col.customer": { he: 'לקוח', en: 'Customer', fr: 'Client', es: 'Cliente', ru: 'Клиент', ar: 'العميل' },
  "pipe.col.type": { he: 'סוג', en: 'Type', fr: 'Type', es: 'Tipo', ru: 'Тип', ar: 'النوع' },
  "pipe.col.stage": { he: 'שלב', en: 'Stage', fr: 'Étape', es: 'Etapa', ru: 'Этап', ar: 'المرحلة' },
  "pipe.col.daysInStage": { he: 'ימים בשלב', en: 'Days in stage', fr: 'Jours en étape', es: 'Días en etapa', ru: 'Дней в этапе', ar: 'أيام في المرحلة' },
  "pipe.col.amount": { he: 'סכום', en: 'Amount', fr: 'Montant', es: 'Importe', ru: 'Сумма', ar: 'المبلغ' },
  "pipe.kpi.activeOpps": { he: 'הזדמנויות פעילות', en: 'Active opportunities', fr: 'Opportunités actives', es: 'Oportunidades activas', ru: 'Активных возможностей', ar: 'الفرص النشطة' },
  "pipe.kpi.totalValue": { he: 'שווי כולל בפייפליין', en: 'Total pipeline value', fr: 'Valeur pipeline totale', es: 'Valor total pipeline', ru: 'Общая стоимость', ar: 'القيمة الإجمالية' },

  // Catalog/[slug] subscription
  "svc.priceUnitMonth": { he: '₪/חודש', en: 'ILS/month', fr: '₪/mois', es: '₪/mes', ru: '₪/мес', ar: '₪/شهر' },
  "svc.perMonth": { he: '/חודש', en: '/month', fr: '/mois', es: '/mes', ru: '/мес', ar: '/شهر' },

  // SFCC-style commerce
  "utility.support": { he: 'מוקד תמיכה', en: 'Support', fr: 'Support', es: 'Soporte', ru: 'Поддержка', ar: 'الدعم' },
  "utility.storeLocator": { he: 'מרכזי שירות', en: 'Service Locations', fr: 'Centres', es: 'Centros', ru: 'Центры', ar: 'المراكز' },
  "utility.help": { he: 'עזרה', en: 'Help', fr: 'Aide', es: 'Ayuda', ru: 'Помощь', ar: 'مساعدة' },
  "utility.trackOrder": { he: 'עקוב אחר הזמנה', en: 'Track Order', fr: 'Suivi', es: 'Seguimiento', ru: 'Отслеживать', ar: 'تتبع الطلب' },

  "cart.mini.title": { he: 'עגלת ההזמנות', en: 'Your Cart', fr: 'Votre panier', es: 'Tu carrito', ru: 'Ваша корзина', ar: 'سلة التسوق' },
  "cart.empty.title": { he: 'העגלה שלך ריקה', en: 'Your cart is empty', fr: 'Panier vide', es: 'Carrito vacío', ru: 'Корзина пуста', ar: 'السلة فارغة' },
  "cart.empty.sub": { he: 'הוסף שירותים כדי להתחיל', en: 'Add services to get started', fr: 'Ajoutez des services', es: 'Añade servicios', ru: 'Добавьте услуги', ar: 'أضف خدمات' },
  "cart.empty.browse": { he: 'עיין בקטלוג', en: 'Browse catalog', fr: 'Parcourir', es: 'Explorar', ru: 'Каталог', ar: 'استعرض الكتالوج' },
  "cart.close": { he: 'סגור עגלה', en: 'Close cart', fr: 'Fermer', es: 'Cerrar', ru: 'Закрыть', ar: 'إغلاق' },
  "cart.decrease": { he: 'הפחת כמות', en: 'Decrease', fr: 'Diminuer', es: 'Disminuir', ru: 'Уменьшить', ar: 'تقليل' },
  "cart.increase": { he: 'הוסף כמות', en: 'Increase', fr: 'Augmenter', es: 'Aumentar', ru: 'Увеличить', ar: 'زيادة' },
  "cart.remove": { he: 'הסר פריט', en: 'Remove item', fr: 'Retirer', es: 'Eliminar', ru: 'Удалить', ar: 'إزالة' },
  "cart.subtotal": { he: 'ביניים', en: 'Subtotal', fr: 'Sous-total', es: 'Subtotal', ru: 'Промежуточный', ar: 'المجموع الفرعي' },
  "cart.tax": { he: 'מע"מ (17%)', en: 'VAT (17%)', fr: 'TVA (17%)', es: 'IVA (17%)', ru: 'НДС (17%)', ar: 'ضريبة (17%)' },
  "cart.total": { he: 'סה"כ לתשלום', en: 'Total', fr: 'Total', es: 'Total', ru: 'Итого', ar: 'الإجمالي' },
  "cart.checkout": { he: 'המשך לתשלום', en: 'Checkout', fr: 'Payer', es: 'Pagar', ru: 'Оформить', ar: 'الدفع' },
  "cart.continue": { he: 'המשך קנייה', en: 'Continue shopping', fr: 'Continuer', es: 'Seguir', ru: 'Продолжить', ar: 'استمرار' },
  "cart.page.title": { he: 'סל ההזמנות שלי', en: 'My Cart', fr: 'Mon panier', es: 'Mi carrito', ru: 'Моя корзина', ar: 'سلتي' },
  "cart.page.subtitle": { he: 'בדוק את הפריטים לפני מעבר לתשלום', en: 'Review items before checkout', fr: 'Vérifiez avant paiement', es: 'Revisa antes del pago', ru: 'Проверьте перед оплатой', ar: 'راجع قبل الدفع' },
  "cart.page.qty": { he: 'כמות', en: 'Quantity', fr: 'Quantité', es: 'Cantidad', ru: 'Кол-во', ar: 'الكمية' },
  "cart.page.unitPrice": { he: 'מחיר יחידה', en: 'Unit Price', fr: 'Prix unitaire', es: 'Precio unitario', ru: 'Цена', ar: 'السعر' },
  "cart.page.lineTotal": { he: 'סה"כ שורה', en: 'Total', fr: 'Total', es: 'Total', ru: 'Итого', ar: 'المجموع' },
  "cart.page.promoCode": { he: 'קוד קופון / הנחה', en: 'Promo code', fr: 'Code promo', es: 'Código promo', ru: 'Промокод', ar: 'كود الخصم' },
  "cart.page.applyPromo": { he: 'הפעל', en: 'Apply', fr: 'Appliquer', es: 'Aplicar', ru: 'Применить', ar: 'تطبيق' },
  "cart.page.orderSummary": { he: 'סיכום הזמנה', en: 'Order Summary', fr: 'Résumé', es: 'Resumen', ru: 'Итог заказа', ar: 'ملخص الطلب' },
  "cart.page.shipping": { he: 'משלוח', en: 'Shipping', fr: 'Livraison', es: 'Envío', ru: 'Доставка', ar: 'الشحن' },
  "cart.page.free": { he: 'חינם', en: 'Free', fr: 'Gratuit', es: 'Gratis', ru: 'Бесплатно', ar: 'مجاني' },
  "cart.page.proceedCheckout": { he: 'המשך לתשלום מאובטח', en: 'Secure Checkout', fr: 'Paiement sécurisé', es: 'Pago seguro', ru: 'Оформить заказ', ar: 'دفع آمن' },
  "cart.page.secure": { he: 'תשלום מאובטח על שרת ממשלתי', en: 'Secure payment via GovIL', fr: 'Paiement gouv.', es: 'Pago gubernamental', ru: 'Гос. оплата', ar: 'دفع حكومي آمن' },
  "cart.page.emptyAction": { he: 'התחל לעיין בקטלוג השירותים', en: 'Start browsing the catalog', fr: 'Parcourir', es: 'Explorar', ru: 'Каталог', ar: 'استعرض' },

  "wish.title": { he: 'רשימת המשאלות שלי', en: 'My Wishlist', fr: 'Ma liste de souhaits', es: 'Mi lista', ru: 'Избранное', ar: 'قائمة الأمنيات' },
  "wish.empty": { he: 'הרשימה שלך ריקה', en: 'Your wishlist is empty', fr: 'Liste vide', es: 'Lista vacía', ru: 'Список пуст', ar: 'قائمة فارغة' },
  "wish.emptySub": { he: 'שמור שירותים מעניינים לקנייה מאוחרת', en: 'Save services for later', fr: 'Enregistrez pour plus tard', es: 'Guarda para después', ru: 'Сохранить на потом', ar: 'احفظ لوقت لاحق' },
  "wish.aria.add": { he: 'הוסף לרשימת משאלות', en: 'Add to wishlist', fr: 'Ajouter à la liste', es: 'Añadir a lista', ru: 'В избранное', ar: 'أضف للأمنيات' },
  "wish.aria.remove": { he: 'הסר מרשימת משאלות', en: 'Remove from wishlist', fr: 'Retirer', es: 'Eliminar', ru: 'Убрать', ar: 'إزالة' },
  "wish.moveToCart": { he: 'הוסף לעגלה', en: 'Move to cart', fr: 'Ajouter au panier', es: 'Al carrito', ru: 'В корзину', ar: 'إلى السلة' },
  "wish.removeAll": { he: 'נקה הכל', en: 'Clear all', fr: 'Tout effacer', es: 'Vaciar', ru: 'Очистить', ar: 'مسح الكل' },
  "wish.share": { he: 'שתף רשימה', en: 'Share list', fr: 'Partager', es: 'Compartir', ru: 'Поделиться', ar: 'مشاركة' },

  "review.title": { he: 'ביקורות לקוחות', en: 'Customer Reviews', fr: 'Avis clients', es: 'Opiniones', ru: 'Отзывы', ar: 'المراجعات' },
  "review.based": { he: 'מבוסס על', en: 'Based on', fr: 'Basé sur', es: 'Basado en', ru: 'На основе', ar: 'استناداً إلى' },
  "review.write": { he: 'כתוב ביקורת', en: 'Write a review', fr: 'Écrire un avis', es: 'Escribir opinión', ru: 'Написать отзыв', ar: 'اكتب مراجعة' },
  "review.helpful": { he: 'שימושי', en: 'Helpful', fr: 'Utile', es: 'Útil', ru: 'Полезно', ar: 'مفيد' },
  "review.verified": { he: 'רכישה מאומתת', en: 'Verified purchase', fr: 'Achat vérifié', es: 'Compra verificada', ru: 'Подтвержд. покупка', ar: 'شراء موثق' },
  "review.filter.all": { he: 'הכל', en: 'All', fr: 'Tout', es: 'Todos', ru: 'Все', ar: 'الكل' },
  "review.filter.5": { he: '5 כוכבים', en: '5 stars', fr: '5 étoiles', es: '5 estrellas', ru: '5 звёзд', ar: '5 نجوم' },
  "review.filter.4": { he: '4 כוכבים', en: '4 stars', fr: '4 étoiles', es: '4 estrellas', ru: '4 звезды', ar: '4 نجوم' },
  "review.sort.recent": { he: 'החדשים ביותר', en: 'Most recent', fr: 'Plus récent', es: 'Más recientes', ru: 'Новые', ar: 'الأحدث' },
  "review.sort.helpful": { he: 'הכי שימושיות', en: 'Most helpful', fr: 'Plus utiles', es: 'Más útiles', ru: 'Полезные', ar: 'الأكثر فائدة' },
  "review.sort.high": { he: 'דירוג גבוה', en: 'Highest rated', fr: 'Meilleures notes', es: 'Mejor valoradas', ru: 'Высокий рейтинг', ar: 'الأعلى تقييماً' },
  "review.sort.low": { he: 'דירוג נמוך', en: 'Lowest rated', fr: 'Notes basses', es: 'Peor valoradas', ru: 'Низкий рейтинг', ar: 'الأقل تقييماً' },
  "review.showMore": { he: 'הצג עוד ביקורות', en: 'Show more reviews', fr: 'Voir plus', es: 'Ver más', ru: 'Показать ещё', ar: 'عرض المزيد' },
  "review.of": { he: 'מתוך 5', en: 'out of 5', fr: 'sur 5', es: 'de 5', ru: 'из 5', ar: 'من 5' },
  "review.stars": { he: 'כוכבים', en: 'stars', fr: 'étoiles', es: 'estrellas', ru: 'звёзд', ar: 'نجوم' },

  "svc.addToCart": { he: 'הוסף לעגלה', en: 'Add to Cart', fr: 'Ajouter au panier', es: 'Añadir al carrito', ru: 'В корзину', ar: 'أضف للسلة' },
  "svc.addingToCart": { he: 'מוסיף...', en: 'Adding...', fr: 'Ajout...', es: 'Añadiendo...', ru: 'Добавление...', ar: 'يُضاف...' },
  "svc.addedToCart": { he: '✓ נוסף לעגלה', en: '✓ Added', fr: '✓ Ajouté', es: '✓ Añadido', ru: '✓ Добавлено', ar: '✓ أُضيف' },
  "svc.quantity": { he: 'כמות', en: 'Quantity', fr: 'Quantité', es: 'Cantidad', ru: 'Количество', ar: 'الكمية' },
  "svc.wishlistAdd": { he: 'הוסף לרשימת משאלות', en: 'Add to Wishlist', fr: 'Liste souhaits', es: 'A lista', ru: 'В избранное', ar: 'قائمة الأمنيات' },
  "svc.wishlistRemove": { he: 'הסר מרשימת משאלות', en: 'Remove from Wishlist', fr: 'Retirer', es: 'Quitar', ru: 'Убрать', ar: 'إزالة' },
  "svc.share": { he: 'שתף', en: 'Share', fr: 'Partager', es: 'Compartir', ru: 'Поделиться', ar: 'مشاركة' },
  "svc.sku": { he: 'מק"ט', en: 'SKU', fr: 'SKU', es: 'SKU', ru: 'Артикул', ar: 'الرمز' },
  "svc.inStock": { he: 'זמין להזמנה', en: 'In Stock', fr: 'En stock', es: 'En stock', ru: 'В наличии', ar: 'متوفر' },
  "svc.deliveryFast": { he: 'משלוח מהיר', en: 'Fast delivery', fr: 'Livraison rapide', es: 'Envío rápido', ru: 'Быстрая доставка', ar: 'شحن سريع' },
  "svc.securePayment": { he: 'תשלום מאובטח', en: 'Secure payment', fr: 'Paiement sécurisé', es: 'Pago seguro', ru: 'Безопасная оплата', ar: 'دفع آمن' },
  "svc.satisfaction": { he: 'שביעות רצון מובטחת', en: 'Satisfaction guaranteed', fr: 'Satisfaction garantie', es: 'Satisfacción', ru: 'Гарантия', ar: 'الرضا مضمون' },
  "svc.tabs.desc": { he: 'תיאור', en: 'Description', fr: 'Description', es: 'Descripción', ru: 'Описание', ar: 'الوصف' },
  "svc.tabs.specs": { he: 'מפרט', en: 'Specifications', fr: 'Spécifications', es: 'Especificaciones', ru: 'Характеристики', ar: 'المواصفات' },
  "svc.tabs.delivery": { he: 'משלוח והחזרות', en: 'Delivery & Returns', fr: 'Livraison', es: 'Envío', ru: 'Доставка', ar: 'الشحن والإرجاع' },
  "svc.tabs.reviews": { he: 'ביקורות', en: 'Reviews', fr: 'Avis', es: 'Opiniones', ru: 'Отзывы', ar: 'المراجعات' },
  "svc.gallery.thumbnail": { he: 'תמונה ממוזערת', en: 'Thumbnail', fr: 'Miniature', es: 'Miniatura', ru: 'Миниатюра', ar: 'مصغرة' },
  "svc.relatedTitle": { he: 'ייתכן שיעניין אותך גם', en: 'You May Also Like', fr: 'Vous aimerez aussi', es: 'También te puede gustar', ru: 'Вам может понравиться', ar: 'قد يعجبك أيضاً' },
  "svc.relatedSub": { he: 'שירותים משלימים המומלצים לרכישה משותפת', en: 'Complementary services', fr: 'Services complémentaires', es: 'Complementarios', ru: 'Дополнительные', ar: 'خدمات مكملة' },
  "svc.recentTitle": { he: 'נצפו לאחרונה', en: 'Recently Viewed', fr: 'Récemment vus', es: 'Vistos recientemente', ru: 'Недавно просмотренные', ar: 'شوهدت مؤخراً' },
  "svc.recommended": { he: 'מומלץ בהתאמה אישית', en: 'Recommended for You', fr: 'Recommandé pour vous', es: 'Recomendado para ti', ru: 'Для вас', ar: 'موصى به لك' },

  "plp.showing": { he: 'מציג', en: 'Showing', fr: 'Affichage', es: 'Mostrando', ru: 'Показано', ar: 'يعرض' },
  "plp.of": { he: 'מתוך', en: 'of', fr: 'sur', es: 'de', ru: 'из', ar: 'من' },
  "plp.results": { he: 'תוצאות', en: 'results', fr: 'résultats', es: 'resultados', ru: 'результатов', ar: 'نتائج' },
  "plp.sortBy": { he: 'מיין לפי', en: 'Sort by', fr: 'Trier par', es: 'Ordenar', ru: 'Сортировать', ar: 'رتب حسب' },
  "plp.sort.relevance": { he: 'רלוונטיות', en: 'Relevance', fr: 'Pertinence', es: 'Relevancia', ru: 'Актуальность', ar: 'الصلة' },
  "plp.sort.priceAsc": { he: 'מחיר: נמוך לגבוה', en: 'Price: Low to High', fr: 'Prix croissant', es: 'Precio: bajo a alto', ru: 'Цена: возр.', ar: 'السعر: منخفض إلى مرتفع' },
  "plp.sort.priceDesc": { he: 'מחיר: גבוה לנמוך', en: 'Price: High to Low', fr: 'Prix décroissant', es: 'Precio: alto a bajo', ru: 'Цена: убыв.', ar: 'السعر: مرتفع إلى منخفض' },
  "plp.sort.newest": { he: 'החדשים ביותר', en: 'Newest', fr: 'Nouveautés', es: 'Más nuevos', ru: 'Новинки', ar: 'الأحدث' },
  "plp.sort.rating": { he: 'הכי מדורגים', en: 'Highest Rated', fr: 'Mieux notés', es: 'Mejor valorados', ru: 'По рейтингу', ar: 'الأعلى تقييماً' },
  "plp.filters": { he: 'מסננים', en: 'Filters', fr: 'Filtres', es: 'Filtros', ru: 'Фильтры', ar: 'المرشحات' },
  "plp.filtersActive": { he: 'מסננים פעילים', en: 'Active filters', fr: 'Filtres actifs', es: 'Filtros activos', ru: 'Активные фильтры', ar: 'مرشحات نشطة' },
  "plp.filtersClear": { he: 'נקה מסננים', en: 'Clear filters', fr: 'Effacer', es: 'Limpiar', ru: 'Очистить', ar: 'مسح المرشحات' },
  "plp.filter.price": { he: 'טווח מחירים', en: 'Price Range', fr: 'Prix', es: 'Precio', ru: 'Цена', ar: 'السعر' },
  "plp.filter.delivery": { he: 'זמן אספקה', en: 'Delivery Time', fr: 'Délai', es: 'Entrega', ru: 'Доставка', ar: 'وقت التسليم' },
  "plp.filter.rating": { he: 'דירוג', en: 'Rating', fr: 'Note', es: 'Valoración', ru: 'Рейтинг', ar: 'التقييم' },
  "plp.filter.customer": { he: 'סוג לקוח', en: 'Customer Type', fr: 'Type client', es: 'Cliente', ru: 'Тип клиента', ar: 'نوع العميل' },
  "plp.filter.available": { he: 'זמין בפורטל', en: 'Available in portal', fr: 'Dans le portail', es: 'En portal', ru: 'В портале', ar: 'في البوابة' },
  "plp.viewGrid": { he: 'תצוגת רשת', en: 'Grid view', fr: 'Grille', es: 'Cuadrícula', ru: 'Сетка', ar: 'شبكة' },
  "plp.viewList": { he: 'תצוגת רשימה', en: 'List view', fr: 'Liste', es: 'Lista', ru: 'Список', ar: 'قائمة' },
  "plp.quickView": { he: 'תצוגה מהירה', en: 'Quick View', fr: 'Aperçu', es: 'Vista rápida', ru: 'Быстрый просмотр', ar: 'عرض سريع' },
  "plp.noResults": { he: 'לא נמצאו תוצאות', en: 'No results found', fr: 'Aucun résultat', es: 'Sin resultados', ru: 'Ничего не найдено', ar: 'لا توجد نتائج' },
  "plp.noResultsSub": { he: 'נסה לשנות את המסננים או לחפש מונחים אחרים', en: 'Try adjusting filters or searching different terms', fr: 'Ajustez les filtres', es: 'Prueba otros filtros', ru: 'Измените фильтры', ar: 'جرب مرشحات أخرى' },
  "plp.trending": { he: 'טרנדים', en: 'Trending', fr: 'Tendances', es: 'Tendencias', ru: 'В тренде', ar: 'الرائج' },

  "newsletter.title": { he: 'עדכונים אישיים על שירותי מפ"י', en: 'MAPI Insider Updates', fr: 'Actualités MAPI', es: 'Novedades MAPI', ru: 'Новости MAPI', ar: 'أخبار MAPI' },
  "newsletter.sub": { he: 'הצטרף לניוזלטר וקבל ראשון עדכוני מוצרים, מבצעים ותוכן מקצועי', en: 'Get first access to product updates, promotions, and expert content', fr: 'Recevez les nouveautés en premier', es: 'Recibe novedades primero', ru: 'Первым узнавайте о новинках', ar: 'كن أول من يعرف' },
  "newsletter.placeholder": { he: 'כתובת המייל שלך', en: 'Your email address', fr: 'Votre e-mail', es: 'Tu correo', ru: 'Ваш e-mail', ar: 'بريدك الإلكتروني' },
  "newsletter.subscribe": { he: 'הצטרפות לניוזלטר', en: 'Subscribe', fr: 'S\'abonner', es: 'Suscribirse', ru: 'Подписаться', ar: 'اشتراك' },
  "newsletter.success": { he: '✓ נרשמת בהצלחה!', en: '✓ Successfully subscribed!', fr: '✓ Inscrit !', es: '✓ ¡Suscrito!', ru: '✓ Подписаны!', ar: '✓ تم!' },
  "newsletter.privacy": { he: 'לחיצה על הצטרפות מהווה אישור למדיניות הפרטיות', en: 'By subscribing you accept our privacy policy', fr: 'Politique de confidentialité', es: 'Política de privacidad', ru: 'Согласны с политикой', ar: 'سياسة الخصوصية' },

  "footer.newsletter": { he: 'ניוזלטר', en: 'Newsletter', fr: 'Newsletter', es: 'Newsletter', ru: 'Рассылка', ar: 'النشرة' },
  "footer.follow": { he: 'עקוב אחרינו', en: 'Follow Us', fr: 'Suivez-nous', es: 'Síguenos', ru: 'Мы в соцсетях', ar: 'تابعنا' },
  "footer.trust": { he: 'תעודות ואישורים', en: 'Trust & Certifications', fr: 'Certifications', es: 'Certificaciones', ru: 'Сертификаты', ar: 'الشهادات' },
  "footer.certified": { he: 'מוסמך על ידי ממשלת ישראל', en: 'Certified by Israel Government', fr: 'Certifié par le gouvernement', es: 'Certificado por el gobierno', ru: 'Сертифицирован', ar: 'معتمد حكومياً' },

  "trust.security": { he: 'אבטחת מידע לאומית', en: 'National-grade Security', fr: 'Sécurité nationale', es: 'Seguridad nacional', ru: 'Гос. безопасность', ar: 'أمن وطني' },
  "trust.national": { he: 'שירות ממשלתי רשמי', en: 'Official Government Service', fr: 'Service gouvernemental', es: 'Servicio oficial', ru: 'Гос. служба', ar: 'خدمة رسمية' },
  "trust.gdpr": { he: 'הגנת פרטיות מלאה', en: 'Privacy Protected', fr: 'Confidentialité', es: 'Privacidad', ru: 'Конфиденциальность', ar: 'حماية الخصوصية' },
  "trust.support": { he: 'תמיכה בעברית', en: 'Hebrew Support', fr: 'Support hébreu', es: 'Soporte hebreo', ru: 'Поддержка на иврите', ar: 'دعم بالعبرية' },

  "header.search.placeholder": { he: 'חפש שירות, מוצר או קטגוריה...', en: 'Search services, products, categories...', fr: 'Rechercher...', es: 'Buscar...', ru: 'Поиск...', ar: 'ابحث عن خدمة، منتج، فئة...' },
  "header.search.recent": { he: 'חיפושים אחרונים', en: 'Recent searches', fr: 'Recherches récentes', es: 'Búsquedas recientes', ru: 'Недавние', ar: 'الأخيرة' },
  "header.search.suggestions": { he: 'הצעות חיפוש', en: 'Suggestions', fr: 'Suggestions', es: 'Sugerencias', ru: 'Предложения', ar: 'اقتراحات' },
  "header.search.viewAll": { he: 'הצג את כל התוצאות', en: 'View all results', fr: 'Voir tous', es: 'Ver todos', ru: 'Все результаты', ar: 'كل النتائج' },
  "header.search.aria": { he: 'חפש באתר', en: 'Search site', fr: 'Recherche', es: 'Buscar', ru: 'Поиск', ar: 'بحث' },
  "header.account": { he: 'החשבון שלי', en: 'My Account', fr: 'Mon compte', es: 'Mi cuenta', ru: 'Аккаунт', ar: 'حسابي' },
  "header.wishlist": { he: 'רשימת משאלות', en: 'Wishlist', fr: 'Souhaits', es: 'Lista', ru: 'Избранное', ar: 'الأمنيات' },
  "header.cart": { he: 'עגלת הזמנות', en: 'Cart', fr: 'Panier', es: 'Carrito', ru: 'Корзина', ar: 'السلة' },
  "header.cartCount": { he: 'פריטים בעגלה', en: 'items in cart', fr: 'articles', es: 'artículos', ru: 'товаров', ar: 'عناصر' },

  // Nav (new pages)
  "nav.plans": { he: 'מסלולים', en: 'Plans', fr: 'Forfaits', es: 'Planes', ru: 'Планы', ar: 'الخطط' },
  "nav.bundles": { he: 'חבילות אזוריות', en: 'Regional Bundles', fr: 'Packs Régionaux', es: 'Paquetes Regionales', ru: 'Регион. пакеты', ar: 'حزم إقليمية' },
  "nav.apiHub": { he: 'API Hub', en: 'API Hub', fr: 'API Hub', es: 'API Hub', ru: 'API-хаб', ar: 'مركز API' },
  "nav.trial": { he: '14 יום ניסיון חינם', en: '14-day Free Trial', fr: 'Essai 14 jours', es: 'Prueba 14 días', ru: '14 дней бесплатно', ar: 'تجربة 14 يوماً' },
  "nav.more": { he: 'עוד', en: 'More', fr: 'Plus', es: 'Más', ru: 'Ещё', ar: 'المزيد' },

  // Plans page
  "plans.title": { he: 'בחר את המסלול המתאים לך', en: 'Choose Your Plan', fr: 'Choisissez votre forfait', es: 'Elige tu plan', ru: 'Выберите план', ar: 'اختر خطتك' },
  "plans.subtitle": { he: 'מסלולי גישה למפ"י — לפי צרכי השימוש שלך. שדרג, שנה או בטל בכל עת.', en: 'MAPI access plans — matched to how you use them. Upgrade, downgrade, or cancel anytime.', fr: 'Plans d\'accès MAPI — modifiables à tout moment.', es: 'Planes de acceso MAPI — modificables en cualquier momento.', ru: 'Планы доступа MAPI — меняйте в любое время.', ar: 'خطط الوصول MAPI — قابلة للتغيير في أي وقت.' },
  "plans.compare": { he: 'השוואת יכולות', en: 'Compare Features', fr: 'Comparer', es: 'Comparar', ru: 'Сравнить', ar: 'قارن الميزات' },
  "plans.faq": { he: 'שאלות נפוצות על מסלולים', en: 'Plan FAQ', fr: 'FAQ Forfaits', es: 'FAQ Planes', ru: 'FAQ по планам', ar: 'أسئلة الخطط' },
  "plans.mostPopular": { he: 'הכי פופולרי', en: 'Most Popular', fr: 'Le plus populaire', es: 'Más popular', ru: 'Популярный', ar: 'الأكثر شعبية' },
  "plans.perMonth": { he: '/חודש', en: '/month', fr: '/mois', es: '/mes', ru: '/мес.', ar: '/شهر' },
  "plans.perYear": { he: '/שנה', en: '/year', fr: '/an', es: '/año', ru: '/год', ar: '/سنة' },
  "plans.custom": { he: 'מותאם', en: 'Custom', fr: 'Personnalisé', es: 'Personalizado', ru: 'Индивид.', ar: 'مخصص' },
  "plans.tryFree": { he: 'התחל בחינם', en: 'Start free', fr: 'Commencer gratuitement', es: 'Empezar gratis', ru: 'Начать бесплатно', ar: 'ابدأ مجاناً' },
  "plans.startNow": { he: 'התחל עכשיו', en: 'Start now', fr: 'Commencer', es: 'Empezar', ru: 'Начать', ar: 'ابدأ الآن' },
  "plans.contactSales": { he: 'צור קשר עם המכירות', en: 'Contact Sales', fr: 'Contactez les ventes', es: 'Contactar ventas', ru: 'Связаться с продажами', ar: 'اتصل بالمبيعات' },

  // Plan: Open
  "plan.open.name": { he: 'פתוח לציבור', en: 'Open Data', fr: 'Données Ouvertes', es: 'Datos Abiertos', ru: 'Открытые данные', ar: 'بيانات مفتوحة' },
  "plan.open.tagline": { he: 'לגישה חופשית לתוכן בסיסי — ללא עלות', en: 'Free access to core content', fr: 'Accès gratuit', es: 'Acceso gratuito', ru: 'Бесплатный доступ', ar: 'وصول مجاني' },
  "plan.open.price": { he: 'חינם', en: 'Free', fr: 'Gratuit', es: 'Gratis', ru: 'Бесплатно', ar: 'مجاني' },
  "plan.open.unit": { he: 'לעולם', en: 'forever', fr: 'à vie', es: 'para siempre', ru: 'навсегда', ar: 'إلى الأبد' },
  "plan.open.cta": { he: 'הצטרף חינם', en: 'Sign up free', fr: 'Inscription gratuite', es: 'Registrarse gratis', ru: 'Регистр. беспл.', ar: 'سجل مجاناً' },
  "plan.open.f1": { he: '10 הורדות מפה בחודש', en: '10 map downloads/month', fr: '10 téléchargements/mois', es: '10 descargas/mes', ru: '10 карт/мес.', ar: '10 تنزيلات/شهر' },
  "plan.open.f2": { he: 'רזולוציה בסיסית (50 ס"מ)', en: 'Basic resolution (50 cm)', fr: 'Résolution 50 cm', es: 'Resolución 50 cm', ru: 'Разрешение 50 см', ar: 'دقة 50 سم' },
  "plan.open.f3": { he: '1,000 קריאות API ליום', en: '1,000 API calls/day', fr: '1 000 appels API/jour', es: '1.000 llamadas API/día', ru: '1000 API-вызовов/день', ar: '1,000 استدعاء/يوم' },
  "plan.open.f4": { he: 'פורמט PDF בלבד', en: 'PDF format only', fr: 'PDF uniquement', es: 'Solo PDF', ru: 'Только PDF', ar: 'PDF فقط' },
  "plan.open.f5": { he: 'תמיכה במייל', en: 'Email support', fr: 'Support e-mail', es: 'Soporte por correo', ru: 'Поддержка по e-mail', ar: 'دعم بريد إلكتروني' },

  // Plan: Premium
  "plan.premium.name": { he: 'פרימיום', en: 'Premium', fr: 'Premium', es: 'Premium', ru: 'Премиум', ar: 'المميز' },
  "plan.premium.tagline": { he: 'לאנשי מקצוע, מודדים ומהנדסים — עם מדדי דיוק גבוהים', en: 'For professionals — high precision access', fr: 'Pour professionnels', es: 'Para profesionales', ru: 'Для профи', ar: 'للمحترفين' },
  "plan.premium.price": { he: '₪300', en: '₪300', fr: '₪300', es: '₪300', ru: '₪300', ar: '₪300' },
  "plan.premium.unit": { he: '/חודש', en: '/month', fr: '/mois', es: '/mes', ru: '/мес.', ar: '/شهر' },
  "plan.premium.cta": { he: 'התחל 14 יום חינם', en: 'Start 14-day trial', fr: '14 jours gratuits', es: '14 días gratis', ru: '14 дней беспл.', ar: '14 يوماً مجاناً' },
  "plan.premium.f1": { he: '500 הורדות מפה בחודש', en: '500 map downloads/month', fr: '500 téléchargements/mois', es: '500 descargas/mes', ru: '500 карт/мес.', ar: '500 تنزيل/شهر' },
  "plan.premium.f2": { he: 'רזולוציה גבוהה (20 ס"מ)', en: 'High resolution (20 cm)', fr: 'Résolution 20 cm', es: 'Resolución 20 cm', ru: 'Разрешение 20 см', ar: 'دقة 20 سم' },
  "plan.premium.f3": { he: '50,000 קריאות API ליום', en: '50,000 API calls/day', fr: '50 000 appels/jour', es: '50.000 llamadas/día', ru: '50000 API/день', ar: '50,000 استدعاء/يوم' },
  "plan.premium.f4": { he: 'CORS + RTK מלא', en: 'Full CORS + RTK access', fr: 'CORS + RTK complet', es: 'CORS + RTK completo', ru: 'Полный CORS + RTK', ar: 'CORS + RTK كامل' },
  "plan.premium.f5": { he: 'כל הפורמטים (GeoTIFF, DWG, Shapefile)', en: 'All formats (GeoTIFF, DWG, Shapefile)', fr: 'Tous formats', es: 'Todos los formatos', ru: 'Все форматы', ar: 'كل التنسيقات' },
  "plan.premium.f6": { he: 'שימוש מסחרי מותר', en: 'Commercial use allowed', fr: 'Usage commercial autorisé', es: 'Uso comercial', ru: 'Коммерч. использ.', ar: 'استخدام تجاري' },
  "plan.premium.f7": { he: 'תמיכה במייל וטלפון', en: 'Email + phone support', fr: 'Support e-mail + téléphone', es: 'Soporte e-mail + teléfono', ru: 'E-mail + телефон', ar: 'دعم بريد + هاتف' },

  // Plan: Public Sector
  "plan.public.name": { he: 'מגזר ציבורי', en: 'Public Sector', fr: 'Secteur Public', es: 'Sector Público', ru: 'Гос. сектор', ar: 'القطاع العام' },
  "plan.public.tagline": { he: 'לרשויות מקומיות, משרדי ממשלה וגופים ציבוריים — גישה ללא הגבלה', en: 'For public authorities — unlimited access', fr: 'Pour autorités publiques', es: 'Para autoridades públicas', ru: 'Для гос. организаций', ar: 'للجهات العامة' },
  "plan.public.price": { he: 'חינם', en: 'Free', fr: 'Gratuit', es: 'Gratis', ru: 'Бесплатно', ar: 'مجاني' },
  "plan.public.unit": { he: 'לרשויות', en: 'for authorities', fr: 'aux autorités', es: 'para autoridades', ru: 'для властей', ar: 'للسلطات' },
  "plan.public.cta": { he: 'בקש גישה', en: 'Request access', fr: 'Demander accès', es: 'Solicitar acceso', ru: 'Запросить доступ', ar: 'اطلب الوصول' },
  "plan.public.f1": { he: 'הורדות ללא הגבלה', en: 'Unlimited downloads', fr: 'Téléchargements illimités', es: 'Descargas ilimitadas', ru: 'Без ограничений', ar: 'تنزيلات غير محدودة' },
  "plan.public.f2": { he: 'רזולוציה אולטרה (10 ס"מ)', en: 'Ultra-high resolution (10 cm)', fr: 'Résolution 10 cm', es: 'Resolución 10 cm', ru: 'Разрешение 10 см', ar: 'دقة 10 سم' },
  "plan.public.f3": { he: 'API ללא הגבלה', en: 'Unlimited API access', fr: 'API illimitée', es: 'API ilimitada', ru: 'API без огранич.', ar: 'API غير محدود' },
  "plan.public.f4": { he: 'WMS/WFS Live Services', en: 'WMS/WFS live services', fr: 'Services WMS/WFS', es: 'Servicios WMS/WFS', ru: 'WMS/WFS сервисы', ar: 'خدمات WMS/WFS' },
  "plan.public.f5": { he: 'Account Manager ייעודי + SLA', en: 'Dedicated Account Manager + SLA', fr: 'Chargé de compte + SLA', es: 'Gerente + SLA', ru: 'Персон. менеджер + SLA', ar: 'مدير حساب + SLA' },
  "plan.public.f6": { he: 'מספר משתמשים ללא הגבלה', en: 'Unlimited team seats', fr: 'Utilisateurs illimités', es: 'Usuarios ilimitados', ru: 'Пользователей неогр.', ar: 'مستخدمون غير محدودون' },

  // Comparison
  "planCmp.title": { he: 'השוואת המסלולים במלואם', en: 'Full Feature Comparison', fr: 'Comparaison complète', es: 'Comparación completa', ru: 'Полное сравнение', ar: 'مقارنة شاملة' },
  "planCmp.feature": { he: 'תכונה', en: 'Feature', fr: 'Fonctionnalité', es: 'Característica', ru: 'Функция', ar: 'الميزة' },
  "planCmp.mapsDownload": { he: 'הורדות מפה בחודש', en: 'Map downloads/month', fr: 'Cartes/mois', es: 'Mapas/mes', ru: 'Карт/мес.', ar: 'تنزيلات/شهر' },
  "planCmp.resolution": { he: 'רזולוציה מקסימלית', en: 'Max resolution', fr: 'Résolution max', es: 'Resolución máx.', ru: 'Макс. разрешение', ar: 'أعلى دقة' },
  "planCmp.apiCalls": { he: 'קריאות API ליום', en: 'API calls/day', fr: 'Appels API/jour', es: 'Llamadas/día', ru: 'API/день', ar: 'استدعاءات/يوم' },
  "planCmp.historicMaps": { he: 'מפות היסטוריות', en: 'Historic maps', fr: 'Cartes historiques', es: 'Mapas históricos', ru: 'Историч. карты', ar: 'خرائط تاريخية' },
  "planCmp.corsRTK": { he: 'CORS / RTK', en: 'CORS / RTK', fr: 'CORS / RTK', es: 'CORS / RTK', ru: 'CORS / RTK', ar: 'CORS / RTK' },
  "planCmp.dataFormats": { he: 'פורמטים נתמכים', en: 'Supported formats', fr: 'Formats', es: 'Formatos', ru: 'Форматы', ar: 'التنسيقات' },
  "planCmp.commercialUse": { he: 'שימוש מסחרי', en: 'Commercial use', fr: 'Usage commercial', es: 'Uso comercial', ru: 'Коммерч. использ.', ar: 'استخدام تجاري' },
  "planCmp.support": { he: 'תמיכה', en: 'Support', fr: 'Support', es: 'Soporte', ru: 'Поддержка', ar: 'الدعم' },
  "planCmp.customMaps": { he: 'מפות מותאמות בחודש', en: 'Custom maps/month', fr: 'Cartes perso./mois', es: 'Mapas person./mes', ru: 'Персон. карт/мес.', ar: 'خرائط مخصصة/شهر' },
  "planCmp.teamSeats": { he: 'משתמשים בצוות', en: 'Team seats', fr: 'Sièges', es: 'Usuarios', ru: 'Пользователей', ar: 'مستخدمون' },

  // Plan FAQ
  "planFaq.q1": { he: 'מה ההבדל בין Open ל-Premium?', en: 'What\'s the difference between Open and Premium?', fr: 'Quelle différence ?', es: '¿Cuál es la diferencia?', ru: 'В чём разница?', ar: 'ما الفرق؟' },
  "planFaq.a1": { he: 'Open נותן גישה חינמית לתוכן בסיסי (50 ס"מ, PDF, 1,000 API/יום). Premium מאפשר רזולוציה של 20 ס"מ, כל הפורמטים, שימוש מסחרי ו-50 אלף API/יום.', en: 'Open gives free access to basic content. Premium unlocks high-resolution data, all formats, commercial use, and 50x more API calls.', fr: 'Open est gratuit. Premium débloque haute résolution.', es: 'Open es gratis. Premium desbloquea alta resolución.', ru: 'Open бесплатен. Premium разблокирует высокое разрешение.', ar: 'Open مجاني. Premium يفتح دقة أعلى.' },
  "planFaq.q2": { he: 'האם ניתן לבטל בכל עת?', en: 'Can I cancel anytime?', fr: 'Puis-je annuler à tout moment ?', es: '¿Puedo cancelar?', ru: 'Можно отменить?', ar: 'هل يمكن الإلغاء؟' },
  "planFaq.a2": { he: 'כן. Premium ניתן לביטול בכל עת דרך אזור החשבון, ללא קנסות. הגישה תישאר עד סוף תקופת החיוב.', en: 'Yes. Premium can be cancelled anytime via account settings — no fees. Access continues to end of billing period.', fr: 'Oui, annulation à tout moment.', es: 'Sí, cancela cuando quieras.', ru: 'Да, отмена в любое время.', ar: 'نعم، إلغاء متى شئت.' },
  "planFaq.q3": { he: 'איך יודעים אם אנחנו זכאים ל-Public Sector?', en: 'How do I qualify for Public Sector?', fr: 'Comment se qualifier ?', es: '¿Cómo calificar?', ru: 'Как претендовать?', ar: 'كيف نتأهل؟' },
  "planFaq.a3": { he: 'רשויות מקומיות, משרדי ממשלה, גופי חירום וסוכנויות ציבוריות אחרות זכאים אוטומטית. יש להשלים הרשמה עם מספר זיהוי ארגוני.', en: 'Local authorities, government ministries, and public agencies qualify automatically. Register with your organizational ID.', fr: 'Autorités locales/ministères éligibles.', es: 'Autoridades locales calificados.', ru: 'Гос. органы допущены.', ar: 'الجهات الحكومية مؤهلة.' },
  "planFaq.q4": { he: 'האם המחירים כוללים מע"מ?', en: 'Do prices include VAT?', fr: 'TVA incluse ?', es: '¿IVA incluido?', ru: 'НДС включён?', ar: 'هل تشمل الأسعار الضريبة؟' },
  "planFaq.a4": { he: 'כל המחירים כוללים מע"מ 17%. חשבונית מס נשלחת אוטומטית בכל תשלום.', en: 'All prices include 17% VAT. Tax invoice is auto-generated for every payment.', fr: 'TVA 17% incluse.', es: 'IVA 17% incluido.', ru: 'НДС 17% включён.', ar: 'شامل ضريبة 17%.' },

  // Bundles page
  "bundles.title": { he: 'חבילות אזוריות מיוחדות', en: 'Regional Map Bundles', fr: 'Packs Régionaux', es: 'Paquetes Regionales', ru: 'Регион. пакеты', ar: 'حزم إقليمية' },
  "bundles.subtitle": { he: 'שילוב של מפות, נתוני GIS ותצלומי אוויר לאזור שלם — במחיר משתלם משמעותית מרכישה נפרדת.', en: 'Curated bundles of maps, GIS data & aerial imagery — significantly cheaper than buying individually.', fr: 'Cartes + GIS + aérien à prix réduit.', es: 'Mapas + GIS + aéreo con descuento.', ru: 'Карты + GIS + аэро со скидкой.', ar: 'خرائط + GIS + جوية بخصم.' },
  "bundles.savings": { he: 'חיסכון', en: 'Savings', fr: 'Économie', es: 'Ahorro', ru: 'Экономия', ar: 'التوفير' },
  "bundles.included": { he: 'כלול בחבילה', en: 'Included', fr: 'Inclus', es: 'Incluido', ru: 'Включено', ar: 'مشمول' },
  "bundles.regularPrice": { he: 'מחיר רגיל', en: 'Regular price', fr: 'Prix normal', es: 'Precio normal', ru: 'Обычная цена', ar: 'السعر الاعتيادي' },
  "bundles.bundlePrice": { he: 'מחיר חבילה', en: 'Bundle price', fr: 'Prix pack', es: 'Precio paquete', ru: 'Цена пакета', ar: 'سعر الحزمة' },
  "bundles.buyBundle": { he: 'רכוש חבילה', en: 'Buy bundle', fr: 'Acheter le pack', es: 'Comprar paquete', ru: 'Купить пакет', ar: 'اشترِ الحزمة' },
  "bundles.featured": { he: 'מומלץ', en: 'Featured', fr: 'En vedette', es: 'Destacado', ru: 'Рекомендуем', ar: 'مميز' },
  "bundles.allBundles": { he: 'כל החבילות', en: 'All bundles', fr: 'Tous', es: 'Todos', ru: 'Все', ar: 'الكل' },
  "bundles.filterBy": { he: 'סנן לפי אזור', en: 'Filter by region', fr: 'Par région', es: 'Por región', ru: 'По региону', ar: 'حسب المنطقة' },
  "bundle.galilee.name": { he: 'חבילת גליל', en: 'Galilee Bundle', fr: 'Pack Galilée', es: 'Paquete Galilea', ru: 'Пакет Галилея', ar: 'حزمة الجليل' },
  "bundle.galilee.desc": { he: 'כל הצפון — 4 שירותי מיפוי גיאוגרפיים לכל הגליל, הגולן והכינרת. מפות, אורתופוטו וGIS.', en: 'Complete North — 4 mapping services for Galilee, Golan and Kinneret region.', fr: 'Nord complet.', es: 'Norte completo.', ru: 'Полный север.', ar: 'الشمال كاملاً.' },
  "bundle.coastal.name": { he: 'מרכז וחוף הים', en: 'Central & Coastal Plain', fr: 'Plaine Côtière', es: 'Llanura Costera', ru: 'Прибрежная равнина', ar: 'السهل الساحلي' },
  "bundle.coastal.desc": { he: 'תל אביב עד חדרה — 5 מוצרים כולל מפות עירוניות, נתוני חוף ותצלומי אוויר.', en: 'Tel Aviv to Hadera — 5 products incl. urban maps, coastal data & aerial imagery.', fr: 'Tel Aviv à Hadera.', es: 'Tel Aviv a Hadera.', ru: 'Тель-Авив – Хадера.', ar: 'تل أبيب إلى حديرة.' },
  "bundle.jerusalem.name": { he: 'ירושלים והרים', en: 'Jerusalem & Judean Hills', fr: 'Jérusalem', es: 'Jerusalén', ru: 'Иерусалим и горы', ar: 'القدس والجبال' },
  "bundle.jerusalem.desc": { he: 'ירושלים, בית שמש והרי יהודה — 6 מוצרים כולל מפות היסטוריות ומודלי גובה.', en: 'Jerusalem, Beit Shemesh & Judean Hills — 6 products incl. historic maps + DEM.', fr: 'Jérusalem & Judée.', es: 'Jerusalén y Judea.', ru: 'Иерусалим и Иудея.', ar: 'القدس ويهودا.' },
  "bundle.negev.name": { he: 'נגב ודרום', en: 'Negev & Southern Desert', fr: 'Néguev', es: 'Néguev', ru: 'Негев', ar: 'النقب' },
  "bundle.negev.desc": { he: 'מפות מפורטות של הנגב מבאר שבע עד אילת. אידיאלי לתיירות, חקלאות ובנייה.', en: 'Detailed Negev maps from Beer Sheva to Eilat. Ideal for tourism, agriculture, construction.', fr: 'Néguev complet.', es: 'Néguev completo.', ru: 'Полный Негев.', ar: 'النقب كاملاً.' },
  "bundle.surveyor.name": { he: 'חבילת מודדים מקצועית', en: 'Professional Surveyor Bundle', fr: 'Pack Géomètre', es: 'Pack Topógrafo', ru: 'Пакет геодезиста', ar: 'حزمة المساح' },
  "bundle.surveyor.desc": { he: 'CORS + מודד מבקר + נקודות גיאודטיות + תעודות גבולות — כל מה שמודד צריך במקום אחד.', en: 'CORS + surveyor inspector + geodetic points + boundary certs — all surveyor essentials.', fr: 'Essentiels géomètre.', es: 'Esenciales topógrafo.', ru: 'Всё для геодезиста.', ar: 'أساسيات المساح.' },
  "bundle.developer.name": { he: 'חבילת מפתחי GIS', en: 'GIS Developer Suite', fr: 'Suite Développeur GIS', es: 'Suite Desarrollador GIS', ru: 'Набор GIS-разраб.', ar: 'حزمة مطور GIS' },
  "bundle.developer.desc": { he: 'שכבות GIS + WMS/WFS + נקודות גיאודטיות — פורמטים סטנדרטיים לאינטגרציה בכל מערכת.', en: 'GIS layers + WMS/WFS + geodetic points — standards-ready for integration.', fr: 'Prêt à intégrer.', es: 'Listo para integrar.', ru: 'Готово к интеграции.', ar: 'جاهز للتكامل.' },

  // API Hub
  "api.hub.title": { he: 'API Hub — מרכז הפיתוח שלך', en: 'API Hub — Your Developer Center', fr: 'API Hub', es: 'API Hub', ru: 'API-хаб', ar: 'مركز API' },
  "api.hub.subtitle": { he: 'ניהול מפתחות API, פרויקטים ומדדי שימוש בזמן אמת', en: 'Manage API keys, projects and real-time usage', fr: 'Gestion des clés et projets', es: 'Gestión de claves', ru: 'Ключи и проекты', ar: 'إدارة المفاتيح والمشاريع' },
  "api.hub.newProject": { he: '+ פרויקט חדש', en: '+ New Project', fr: '+ Nouveau projet', es: '+ Nuevo proyecto', ru: '+ Новый проект', ar: '+ مشروع جديد' },
  "api.hub.summary": { he: 'סיכום', en: 'Summary', fr: 'Résumé', es: 'Resumen', ru: 'Сводка', ar: 'ملخص' },
  "api.hub.projects": { he: 'פרויקטים', en: 'Projects', fr: 'Projets', es: 'Proyectos', ru: 'Проекты', ar: 'المشاريع' },
  "api.hub.usage": { he: 'שימוש', en: 'Usage', fr: 'Utilisation', es: 'Uso', ru: 'Использование', ar: 'الاستخدام' },
  "api.hub.docs": { he: 'תיעוד', en: 'Docs', fr: 'Docs', es: 'Docs', ru: 'Документация', ar: 'التوثيق' },
  "api.hub.kpi.projects": { he: 'פרויקטים פעילים', en: 'Active projects', fr: 'Projets actifs', es: 'Proyectos activos', ru: 'Активные проекты', ar: 'مشاريع نشطة' },
  "api.hub.kpi.keys": { he: 'מפתחות API', en: 'API keys', fr: 'Clés API', es: 'Claves API', ru: 'API-ключи', ar: 'مفاتيح API' },
  "api.hub.kpi.calls": { he: 'קריאות בחודש', en: 'Calls this month', fr: 'Appels/mois', es: 'Llamadas/mes', ru: 'Вызовов/мес.', ar: 'استدعاءات/شهر' },
  "api.hub.kpi.maps": { he: 'מפות שהורדו', en: 'Maps downloaded', fr: 'Cartes tél.', es: 'Mapas descargados', ru: 'Карт скачано', ar: 'خرائط منزلة' },
  "api.hub.kpi.data": { he: 'נפח נתונים (GB)', en: 'Data volume (GB)', fr: 'Volume (Go)', es: 'Volumen (GB)', ru: 'Объём (ГБ)', ar: 'الحجم (GB)' },
  "api.hub.kpi.cost": { he: 'עלות מוערכת', en: 'Estimated cost', fr: 'Coût estimé', es: 'Coste estimado', ru: 'Оценка стоим.', ar: 'التكلفة المقدرة' },
  "api.hub.usage30d": { he: 'שימוש 30 ימים אחרונים', en: 'Usage — last 30 days', fr: 'Utilisation 30 jours', es: 'Uso 30 días', ru: 'Использ. 30 дней', ar: 'استخدام 30 يوماً' },
  "api.hub.calls": { he: 'קריאות', en: 'Calls', fr: 'Appels', es: 'Llamadas', ru: 'Вызовы', ar: 'استدعاءات' },
  "api.hub.mapsLabel": { he: 'מפות', en: 'Maps', fr: 'Cartes', es: 'Mapas', ru: 'Карты', ar: 'الخرائط' },
  "api.hub.est": { he: 'הערכה חודש נוכחי:', en: 'Current month est.:', fr: 'Est. mois en cours :', es: 'Est. mes actual:', ru: 'Оценка текущ. мес.:', ar: 'تقدير الشهر:' },
  "api.hub.vs": { he: 'לעומת', en: 'vs', fr: 'vs', es: 'vs', ru: 'против', ar: 'مقابل' },
  "api.hub.lastMonth": { he: 'החודש שעבר', en: 'last month', fr: 'mois dernier', es: 'mes anterior', ru: 'прошл. мес.', ar: 'الشهر الماضي' },
  "api.hub.projName": { he: 'שם', en: 'Name', fr: 'Nom', es: 'Nombre', ru: 'Название', ar: 'الاسم' },
  "api.hub.projDesc": { he: 'תיאור', en: 'Description', fr: 'Description', es: 'Descripción', ru: 'Описание', ar: 'الوصف' },
  "api.hub.plan": { he: 'מסלול', en: 'Plan', fr: 'Forfait', es: 'Plan', ru: 'План', ar: 'الخطة' },
  "api.hub.env": { he: 'סביבה', en: 'Environment', fr: 'Env.', es: 'Entorno', ru: 'Среда', ar: 'البيئة' },
  "api.hub.created": { he: 'נוצר', en: 'Created', fr: 'Créé', es: 'Creado', ru: 'Создан', ar: 'أُنشئ' },
  "api.hub.lastUsed": { he: 'שימוש אחרון', en: 'Last used', fr: 'Dern. utilisation', es: 'Último uso', ru: 'Посл. использ.', ar: 'آخر استخدام' },
  "api.hub.keys": { he: 'מפתחות', en: 'Keys', fr: 'Clés', es: 'Claves', ru: 'Ключи', ar: 'المفاتيح' },
  "api.hub.viewProject": { he: 'צפה בפרויקט', en: 'View project', fr: 'Voir', es: 'Ver', ru: 'Смотреть', ar: 'عرض' },
  "api.hub.env.prod": { he: 'ייצור', en: 'Production', fr: 'Production', es: 'Producción', ru: 'Продакшн', ar: 'إنتاج' },
  "api.hub.env.staging": { he: 'הרצה', en: 'Staging', fr: 'Staging', es: 'Staging', ru: 'Стейджинг', ar: 'اختبار' },
  "api.hub.env.dev": { he: 'פיתוח', en: 'Development', fr: 'Dev', es: 'Desarrollo', ru: 'Разработка', ar: 'تطوير' },
  "api.hub.docsTitle": { he: 'תיעוד וקוד לדוגמה', en: 'Docs & Code Samples', fr: 'Docs & exemples', es: 'Docs & ejemplos', ru: 'Документация', ar: 'التوثيق' },
  "api.hub.docsSub": { he: 'העתק-הדבק את המפתח שלך והתחל תוך דקות', en: 'Copy-paste your key and get started in minutes', fr: 'Démarrez en quelques minutes', es: 'Empieza en minutos', ru: 'Начните за минуты', ar: 'ابدأ في دقائق' },
  "api.hub.docs.gettingStarted": { he: 'צעדים ראשונים', en: 'Getting Started', fr: 'Premiers pas', es: 'Primeros pasos', ru: 'Начало работы', ar: 'البدء' },
  "api.hub.docs.mapsAPI": { he: 'Maps API', en: 'Maps API', fr: 'Maps API', es: 'Maps API', ru: 'Maps API', ar: 'Maps API' },
  "api.hub.docs.gisAPI": { he: 'GIS API', en: 'GIS API', fr: 'GIS API', es: 'GIS API', ru: 'GIS API', ar: 'GIS API' },
  "api.hub.docs.corsAPI": { he: 'CORS API', en: 'CORS API', fr: 'CORS API', es: 'CORS API', ru: 'CORS API', ar: 'CORS API' },
  "api.hub.docs.errors": { he: 'טיפול בשגיאות', en: 'Error handling', fr: 'Gestion erreurs', es: 'Errores', ru: 'Обработка ошибок', ar: 'معالجة الأخطاء' },
  "api.hub.docs.rateLimits": { he: 'מגבלות שימוש', en: 'Rate limits', fr: 'Limites', es: 'Límites', ru: 'Лимиты', ar: 'الحدود' },
  "api.hub.reportError": { he: 'דיווח על שגיאה בנתונים', en: 'Report Data Error', fr: 'Signaler une erreur', es: 'Reportar error', ru: 'Сообщить об ошибке', ar: 'الإبلاغ عن خطأ' },
  "api.hub.reportErrorSub": { he: 'זיהית שגיאה במפה או נתון? עזור לנו לשפר', en: 'Spotted an error? Help us improve', fr: 'Aidez-nous à améliorer', es: 'Ayúdanos a mejorar', ru: 'Помогите улучшить', ar: 'ساعدنا على التحسين' },

  // Trial / Sample / Error report
  "svc.trial.title": { he: '🎁 נסה 14 יום חינם', en: '🎁 Try 14 days free', fr: '🎁 14 jours gratuits', es: '🎁 14 días gratis', ru: '🎁 14 дней бесплатно', ar: '🎁 14 يوماً مجاناً' },
  "svc.trial.days": { he: '14 יום', en: '14 days', fr: '14 jours', es: '14 días', ru: '14 дней', ar: '14 يوماً' },
  "svc.trial.start": { he: 'התחל תקופת ניסיון', en: 'Start trial', fr: 'Commencer', es: 'Iniciar', ru: 'Начать', ar: 'ابدأ' },
  "svc.trial.terms": { he: 'ניתן לביטול בכל עת. לא נדרש אשראי לפתיחת ניסיון.', en: 'Cancel anytime. No credit card required.', fr: 'Annulation à tout moment.', es: 'Cancela cuando quieras.', ru: 'Отмена в любое время.', ar: 'إلغاء في أي وقت.' },
  "svc.sample.title": { he: '📥 הורד דגימה חינם', en: '📥 Download free sample', fr: '📥 Échantillon gratuit', es: '📥 Muestra gratis', ru: '📥 Скачать образец', ar: '📥 عينة مجانية' },
  "svc.sample.download": { he: 'הורד דגימה', en: 'Download sample', fr: 'Télécharger', es: 'Descargar', ru: 'Скачать', ar: 'تنزيل' },
  "svc.error.report": { he: 'דיווח על שגיאה', en: 'Report an error', fr: 'Signaler', es: 'Reportar', ru: 'Сообщить', ar: 'الإبلاغ' },
  "svc.error.reportSub": { he: 'זיהית טעות במפה או בנתון? עזור לנו לשפר', en: 'Spotted an error? Help us improve', fr: 'Aidez-nous', es: 'Ayúdanos', ru: 'Помогите', ar: 'ساعدنا' },
  "svc.error.submit": { he: 'שלח דיווח', en: 'Submit report', fr: 'Envoyer', es: 'Enviar', ru: 'Отправить', ar: 'إرسال' },

  // Scroll hint bubble
  "scrollHint.label": { he: 'גלול למטה כדי לגלות אפשרויות נוספות', en: 'Scroll down to discover more options', fr: 'Défilez pour découvrir plus d\'options', es: 'Desplázate para descubrir más opciones', ru: 'Прокрутите вниз для доп. опций', ar: 'مرر للأسفل لاكتشاف المزيد' },
  "scrollHint.aria": { he: 'לחץ לגלילה למטה', en: 'Click to scroll down', fr: 'Cliquez pour défiler', es: 'Haz clic para desplazar', ru: 'Прокрутить вниз', ar: 'انقر للتمرير' },

  // Error monitoring admin page
  "monitor.title": { he: 'ניטור שגיאות', en: 'Error Monitoring', fr: 'Surveillance des erreurs', es: 'Monitoreo de errores', ru: 'Мониторинг ошибок', ar: 'مراقبة الأخطاء' },
  "monitor.subtitle": { he: 'שגיאות שנתפסו בדפדפני המשתמשים (50 אחרונות)', en: 'Errors captured in user browsers (last 50)', fr: 'Erreurs capturées (50 dernières)', es: 'Errores capturados (últimos 50)', ru: 'Ошибки браузеров (последние 50)', ar: 'أخطاء المتصفح (آخر 50)' },
  "monitor.testError": { he: 'צור שגיאת בדיקה', en: 'Trigger test error', fr: 'Erreur de test', es: 'Error de prueba', ru: 'Тестовая ошибка', ar: 'خطأ اختباري' },
  "monitor.clear": { he: 'נקה יומן', en: 'Clear log', fr: 'Vider le journal', es: 'Limpiar registro', ru: 'Очистить журнал', ar: 'مسح السجل' },
  "monitor.kpi.total": { he: 'סה"כ שגיאות ביומן', en: 'Total errors in log', fr: 'Total des erreurs', es: 'Total de errores', ru: 'Всего ошибок', ar: 'إجمالي الأخطاء' },
  "monitor.kpi.today": { he: 'שגיאות היום', en: 'Errors today', fr: 'Erreurs aujourd\'hui', es: 'Errores hoy', ru: 'Ошибок сегодня', ar: 'أخطاء اليوم' },
  "monitor.kpi.healthy": { he: 'המערכת תקינה', en: 'System healthy', fr: 'Système sain', es: 'Sistema saludable', ru: 'Система в норме', ar: 'النظام سليم' },
  "monitor.kpi.attention": { he: 'דורש בדיקה', en: 'Needs attention', fr: 'Attention requise', es: 'Requiere atención', ru: 'Требует внимания', ar: 'يتطلب انتباهاً' },
  "monitor.empty": { he: 'אין שגיאות ביומן', en: 'No errors logged', fr: 'Aucune erreur', es: 'Sin errores', ru: 'Ошибок нет', ar: 'لا توجد أخطاء' },
  "monitor.emptySub": { he: 'כל השגיאות בדפדפן ייתפסו ויוצגו כאן אוטומטית', en: 'Browser errors will be captured and shown here automatically', fr: 'Les erreurs seront capturées automatiquement', es: 'Los errores se capturarán automáticamente', ru: 'Ошибки будут фиксироваться автоматически', ar: 'سيتم التقاط الأخطاء تلقائياً' },
  "monitor.prodNote": { he: 'ב-POC היומן נשמר מקומית בדפדפן (localStorage). בסביבת ייצור המנגנון מתחבר ל-Sentry או Salesforce Event Monitoring — נקודות החיבור מוכנות בקוד (lib/monitoring.ts).', en: 'In this POC the log is stored locally (localStorage). In production this connects to Sentry or Salesforce Event Monitoring — hook points are ready in lib/monitoring.ts.', fr: 'En production : Sentry ou Salesforce Event Monitoring.', es: 'En producción: Sentry o Salesforce Event Monitoring.', ru: 'В продакшне: Sentry или Salesforce Event Monitoring.', ar: 'في الإنتاج: Sentry أو مراقبة أحداث Salesforce.' },

  // GovMap embed controls
  "govmap.mapSettings": { he: 'רקעים ושכבות', en: 'Basemaps & Layers', fr: 'Fonds & Couches', es: 'Fondos y Capas', ru: 'Фоны и слои', ar: 'الخلفيات والطبقات' },
  "govmap.basemap": { he: 'מפת רקע', en: 'Basemap', fr: 'Fond de carte', es: 'Mapa base', ru: 'Базовая карта', ar: 'خريطة الأساس' },
  "govmap.layers": { he: 'שכבות מידע', en: 'Info Layers', fr: 'Couches d\'info', es: 'Capas de info', ru: 'Инфо-слои', ar: 'طبقات المعلومات' },
  "govmap.basemap.standard": { he: 'מפה רגילה', en: 'Standard', fr: 'Standard', es: 'Estándar', ru: 'Обычная', ar: 'قياسية' },
  "govmap.basemap.ortho": { he: 'תצלום אוויר', en: 'Aerial', fr: 'Aérien', es: 'Aérea', ru: 'Аэрофото', ar: 'جوية' },
  "govmap.basemap.topo": { he: 'טופוגרפי', en: 'Topographic', fr: 'Topographique', es: 'Topográfico', ru: 'Топография', ar: 'طبوغرافية' },
  "govmap.basemap.hybrid": { he: 'משולב', en: 'Hybrid', fr: 'Hybride', es: 'Híbrido', ru: 'Гибрид', ar: 'مختلطة' },
  "govmap.layer.parcels": { he: 'גושים וחלקות', en: 'Parcels & Blocks', fr: 'Parcelles', es: 'Parcelas', ru: 'Участки', ar: 'القطع والأحواض' },
  "govmap.layer.buildings": { he: 'מבנים', en: 'Buildings', fr: 'Bâtiments', es: 'Edificios', ru: 'Здания', ar: 'المباني' },
  "govmap.layer.gnss": { he: 'תחנות קבע GNSS', en: 'GNSS Stations', fr: 'Stations GNSS', es: 'Estaciones GNSS', ru: 'Станции GNSS', ar: 'محطات GNSS' },
  "govmap.layer.contours": { he: 'קווי גובה', en: 'Contour Lines', fr: 'Courbes de niveau', es: 'Curvas de nivel', ru: 'Изолинии', ar: 'خطوط الارتفاع' },
  "govmap.layer.nature": { he: 'שמורות טבע', en: 'Nature Reserves', fr: 'Réserves naturelles', es: 'Reservas naturales', ru: 'Заповедники', ar: 'محميات طبيعية' },
  "govmap.layer.trails": { he: 'שבילים מסומנים', en: 'Marked Trails', fr: 'Sentiers balisés', es: 'Senderos', ru: 'Тропы', ar: 'مسارات معلمة' },
  "govmap.openSite": { he: 'מעבר לאתר GovMap', en: 'Open GovMap website', fr: 'Ouvrir le site GovMap', es: 'Abrir sitio GovMap', ru: 'Открыть сайт GovMap', ar: 'فتح موقع GovMap' },
  "govmap.refreshing": { he: 'מעדכן מפה...', en: 'Updating map...', fr: 'Mise à jour...', es: 'Actualizando...', ru: 'Обновление...', ar: 'تحديث الخريطة...' }
};

export type TKey = keyof typeof dict;

export function translate(key: TKey, lang: Lang): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[lang] || entry.he || key;
}

export const translations = dict;

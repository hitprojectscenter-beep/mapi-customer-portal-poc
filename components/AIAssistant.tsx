"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { TKey } from "@/lib/i18n";
import { captureLead, meetsLeadMinimum } from "@/lib/leads";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: number;
  link?: { href: string; label: string };
  guide?: Guide;
}

interface IntentRule {
  keywords: Record<string, string[]>;
  responseKey: TKey;
  link?: { href: string; labelKey: TKey };
}

// --- קואורדינטה: guided step-by-step flows -------------------------------
// Each guide walks the user through a portal task in order, with a link per
// step so they can act immediately. Matched by keyword or picked from a menu.
interface Guide {
  id: string;
  icon: string;
  title: string;
  keywords: string[];
  steps: { text: string; href?: string; linkLabel?: string }[];
}

const GUIDES: Guide[] = [
  {
    id: "order-map",
    icon: "map",
    title: "איך מזמינים מפה?",
    keywords: ["להזמין", "הזמנה", "מפה", "לקנות", "רכישה", "מודפסת"],
    steps: [
      { text: "1. היכנסו לקטלוג השירותים ובחרו את סוג המפה הרצוי (בהתאמה אישית, עירונית, היסטורית ועוד).", href: "/catalog", linkLabel: "לקטלוג השירותים" },
      { text: "2. בעמוד המוצר לחצו \"התחל הזמנה\" ובחרו גודל ומאפיינים — המחיר מתעדכן בזמן אמת." },
      { text: "3. בשלב המפה סמנו את טווח הגזרה: לחצו \"התחל סימון פוליגון\", הוסיפו קודקודים ולחצו \"סיים ואשר אזור\"." },
      { text: "4. אשרו את הצעת המחיר, השלימו את פרטי הזיהוי והתשלום — וההזמנה נשמרת ותישלח לטיפול." }
    ]
  },
  {
    id: "cors",
    icon: "satellite_alt",
    title: "איך נרשמים למנוי CORS?",
    keywords: ["cors", "מנוי", "תחנה", "rtk", "vrs", "gnss"],
    steps: [
      { text: "1. עברו לעמוד מנוי CORS בקטלוג.", href: "/catalog/cors-subscription", linkLabel: "למנוי CORS" },
      { text: "2. לחצו \"התחל הזמנה\" ובחרו מוצר: RTK (₪300 לחודש) או VRS (₪0.7 לדקה) — מודל תשלום מראש (בנק שימוש)." },
      { text: "3. הזינו סכום טעינה ובחרו אמצעי תשלום (כרטיס אשראי / הוראת קבע / התחייבות). שימו לב: VRS אינו זמין בכרטיס אשראי." },
      { text: "4. השלימו את התשלום — פרטי החיבור (שם משתמש, סיסמה, IP) יישלחו למייל." }
    ]
  },
  {
    id: "personal-area",
    icon: "person",
    title: "איך נכנסים / נרשמים לאזור האישי?",
    keywords: ["הרשמה", "להירשם", "כניסה", "אזור אישי", "sign", "התחבר", "חשבון"],
    steps: [
      { text: "1. לחצו על אייקון המשתמש בפינת הכותרת, או על \"כניסה / הרשמה\".", href: "/login", linkLabel: "לכניסה / הרשמה" },
      { text: "2. בחרו את סוג המשתמש שלכם (אזרח, מודד, רשות, עסק) — הפורטל יתאים את התוכן והמחירים." },
      { text: "3. התחברו באמצעות ההזדהות הלאומית (Login.gov.il) לגישה מאובטחת; לקוחות חדשים נרשמים באותו מסך." },
      { text: "4. באזור האישי תמצאו את ההזמנות, המנויים, הצעות המחיר וההורדות שלכם." }
    ]
  },
  {
    id: "download-pdf",
    icon: "download",
    title: "איך מורידים הצעת מחיר / קבלה כ-PDF?",
    keywords: ["pdf", "להוריד", "הורדה", "קבלה", "הצעת מחיר", "מסמך"],
    steps: [
      { text: "1. בסיום אשף ההזמנה, בסיכום הצעת המחיר לחצו \"הורד PDF\"." },
      { text: "2. לחלופין, באזור האישי לחצו על אייקון ההורדה שליד ההזמנה הרצויה.", href: "/dashboard", linkLabel: "לאזור האישי" },
      { text: "3. חלון הדפסה ייפתח — בחרו \"שמור כ-PDF\" ביעד ההדפסה, והמסמך יישמר במחשב." }
    ]
  },
  {
    id: "track",
    icon: "local_shipping",
    title: "איך עוקבים אחר הזמנה?",
    keywords: ["מעקב", "סטטוס", "היכן", "הזמנה שלי", "משלוח"],
    steps: [
      { text: "1. היכנסו לעמוד ההזמנות שלכם.", href: "/orders", linkLabel: "להזמנות שלי" },
      { text: "2. כל הזמנה מציגה סטטוס עדכני (התקבלה / בטיפול / הושלמה) ומספר מעקב אם נשלחה בדואר." },
      { text: "3. לפרטים נוספים לחצו על אייקון הצפייה, או פנו למוקד השירות *6274." }
    ]
  }
];

function findGuide(text: string): Guide | null {
  const t = text.toLowerCase();
  let best: { g: Guide; score: number } | null = null;
  for (const g of GUIDES) {
    const score = g.keywords.filter(k => t.includes(k.toLowerCase())).length;
    if (score > 0 && (!best || score > best.score)) best = { g, score };
  }
  return best?.g || null;
}

// Intent matching rules - keywords per language
const INTENTS: IntentRule[] = [
  {
    keywords: {
      he: ["מפה", "להזמין", "הזמנה", "מודפסת", "דיגיטלית", "מפת", "תצא", "אישית"],
      en: ["map", "order", "print", "digital", "custom"],
      fr: ["carte", "commander", "imprimer"],
      es: ["mapa", "pedir", "imprimir"],
      ru: ["карта", "заказать"],
      ar: ["خريطة", "طلب"]
    },
    responseKey: "ai.r.maps",
    link: { href: "/catalog", labelKey: "nav.catalog" }
  },
  {
    keywords: {
      he: ["cors", "תחנה", "תחנות", "rtk", "vrs", "מנוי", "ntrip", "gnss"],
      en: ["cors", "station", "rtk", "vrs", "subscription", "ntrip", "gnss"],
      fr: ["cors", "station", "abonnement"],
      es: ["cors", "estación"],
      ru: ["cors", "станция", "подписка"],
      ar: ["cors", "محطة", "اشتراك"]
    },
    responseKey: "ai.r.cors",
    link: { href: "/catalog/cors-subscription", labelKey: "services.details" }
  },
  {
    keywords: {
      he: ["מודד", "מבקר", "תצר", "טאבו", "רישום", "מקרקעין"],
      en: ["surveyor", "inspector", "cadastre", "registration"],
      fr: ["géomètre", "cadastre"],
      es: ["topógrafo", "catastro"],
      ru: ["геодезист", "кадастр"],
      ar: ["مساح", "كاداستر"]
    },
    responseKey: "ai.r.surveyor",
    link: { href: "/catalog/surveyor-inspector", labelKey: "services.details" }
  },
  {
    keywords: {
      he: ["הזמנה", "סטטוס", "מצב", "איפה", "מתי", "מעקב", "היסטוריה"],
      en: ["order", "status", "where", "tracking", "history"],
      fr: ["commande", "statut"],
      es: ["pedido", "estado"],
      ru: ["заказ", "статус"],
      ar: ["طلب", "حالة"]
    },
    responseKey: "ai.r.order",
    link: { href: "/orders", labelKey: "orders.title" }
  },
  {
    keywords: {
      he: ["תשלום", "אשראי", "חשבונית", "מעמ", "מחיר", "כסף", "תמורה"],
      en: ["payment", "credit", "invoice", "vat", "price"],
      fr: ["paiement", "facture"],
      es: ["pago", "factura"],
      ru: ["оплата", "счёт"],
      ar: ["دفع", "فاتورة"]
    },
    responseKey: "ai.r.payment"
  },
  {
    keywords: {
      he: ["אספקה", "זמן", "כמה ימים", "מתי אקבל", "משלוח", "תוצר"],
      en: ["delivery", "time", "how long", "shipping"],
      fr: ["livraison", "délai"],
      es: ["entrega", "tiempo"],
      ru: ["доставка", "срок"],
      ar: ["تسليم", "وقت"]
    },
    responseKey: "ai.r.delivery"
  },
  {
    keywords: {
      he: ["ביטול", "לבטל", "לעצור", "להפסיק"],
      en: ["cancel", "stop"],
      fr: ["annuler"],
      es: ["cancelar"],
      ru: ["отменить"],
      ar: ["إلغاء"]
    },
    responseKey: "ai.r.cancel",
    link: { href: "/help", labelKey: "help.title" }
  },
  {
    keywords: {
      he: ["החזר", "החזרים", "כסף בחזרה", "החזרת תשלום"],
      en: ["refund", "money back"],
      fr: ["remboursement"],
      es: ["reembolso"],
      ru: ["возврат"],
      ar: ["استرداد"]
    },
    responseKey: "ai.r.refund"
  },
  {
    keywords: {
      he: ["שלום", "היי", "אהלן", "בוקר טוב", "ערב טוב"],
      en: ["hi", "hello", "hey", "good morning"],
      fr: ["bonjour", "salut"],
      es: ["hola", "buenos días"],
      ru: ["привет", "здравствуйте"],
      ar: ["مرحبا", "السلام"]
    },
    responseKey: "ai.r.greeting"
  }
];

function findIntent(text: string, lang: string): IntentRule | null {
  const lowered = text.toLowerCase().trim();
  if (!lowered) return null;
  let bestMatch: { rule: IntentRule; score: number } | null = null;
  for (const rule of INTENTS) {
    const keywords = rule.keywords[lang] || rule.keywords["en"] || [];
    let score = 0;
    for (const kw of keywords) {
      if (lowered.includes(kw.toLowerCase())) score += kw.length;
    }
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { rule, score };
    }
  }
  return bestMatch?.rule || null;
}

export default function AIAssistant() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  // Lead capture mini-form (source: chatbot — HLD 4.2 capture channel)
  const [leadMode, setLeadMode] = useState(false);
  const [leadForm, setLeadForm] = useState({ first: "", last: "", contact: "" });
  const [leadError, setLeadError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial greeting when first opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setTyping(true);
      const timer = setTimeout(() => {
        setMessages([
          {
            id: "init",
            role: "bot",
            text: t("ai.intro"),
            timestamp: Date.now()
          }
        ]);
        setTyping(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [open, messages.length, t]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const sendMessage = (text: string) => {
    const userText = text.trim();
    if (!userText) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: userText,
      timestamp: Date.now()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      // Guided flows take priority — "how do I..." questions get ordered steps
      const guide = findGuide(userText);
      if (guide) {
        setMessages((prev) => [...prev, {
          id: `g-${Date.now()}`, role: "bot",
          text: `בשמחה! הנה השלבים ל${guide.title.replace(/^איך |\?$/g, "")}:`,
          timestamp: Date.now(), guide
        }]);
        setTyping(false);
        return;
      }
      const intent = findIntent(userText, lang);
      const responseKey = intent?.responseKey || ("ai.r.fallback" as TKey);
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: "bot",
        text: t(responseKey),
        timestamp: Date.now(),
        link: intent?.link
          ? { href: intent.link.href, label: t(intent.link.labelKey) }
          : undefined
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  };

  const showGuide = (guide: Guide) => {
    setMessages((prev) => [...prev, {
      id: `g-${Date.now()}`, role: "bot",
      text: `הנה השלבים ל${guide.title.replace(/^איך |\?$/g, "")}:`,
      timestamp: Date.now(), guide
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contact = leadForm.contact.trim();
    const isEmail = contact.includes("@");
    const candidate = {
      firstName: leadForm.first,
      lastName: leadForm.last,
      email: isEmail ? contact : "",
      phone: isEmail ? "" : contact
    };
    if (!meetsLeadMinimum(candidate)) {
      setLeadError(true);
      return;
    }
    const lastUserMsg = [...messages].reverse().find(m => m.role === "user")?.text || "";
    const res = captureLead({
      ...candidate,
      family: "maps",
      interest: lastUserMsg.slice(0, 80) || "פנייה מהצ'אטבוט",
      source: "chatbot"
    });
    setLeadMode(false);
    setLeadError(false);
    setLeadForm({ first: "", last: "", contact: "" });
    setMessages(prev => [...prev, {
      id: `b-lead-${Date.now()}`,
      role: "bot",
      text: `${t("ai.lead.done")}${res?.lead.id || ""}`,
      timestamp: Date.now()
    }]);
  };

  const suggestedKeys: TKey[] = ["ai.q1", "ai.q2", "ai.q3", "ai.q4", "ai.q5"];

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{ bottom: "calc(1.5rem + var(--safe-bottom))" }}
        className={`fixed left-4 sm:left-8 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary via-[#2c2a5e] to-tertiary border border-gold/40 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 group shine shine-glow ${
          open ? "scale-0 opacity-0 pointer-events-none" : ""
        }`}
        aria-label={t("ai.title")}
        data-tooltip={t("ai.title")}
        data-tooltip-position="bottom"
      >
        <span className="material-symbols-outlined text-[30px]" aria-hidden="true">explore</span>
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-positive-green rounded-full border-2 border-white wow-pulse" aria-hidden="true" />
      </button>

      {/* Backdrop on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-40 sm:hidden animate-fade-in"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Chat panel */}
      {open && (
        <div
          style={{ paddingBottom: "var(--safe-bottom)" }}
          className="fixed bottom-0 left-0 right-0 sm:bottom-8 sm:left-8 sm:right-auto sm:w-[420px] sm:max-w-[calc(100vw-4rem)] h-[90vh] h-[90dvh] sm:h-[640px] sm:max-h-[calc(100vh-6rem)] sm:max-h-[calc(100dvh-6rem)] bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl border border-outline-variant z-50 animate-fade-in flex flex-col overflow-hidden"
          role="dialog"
          aria-label={t("ai.title")}
          aria-modal="false"
        >
          {/* Header */}
          <div className="bg-gradient-to-l from-primary to-secondary p-4 sm:p-5 flex items-center justify-between flex-shrink-0">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="shine text-white/80 hover:text-white rounded-full p-1.5 hover:bg-white/10 transition-colors"
              aria-label={t("common.close")}
              data-tooltip={t("common.close")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-3 text-center">
              <div className="text-center">
                <h3 className="text-white font-extrabold text-base leading-tight">{t("ai.title")}</h3>
                <p className="text-white/80 text-[11px] flex items-center justify-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 bg-positive-green rounded-full wow-pulse inline-block" aria-hidden="true" />
                  <span>{t("ai.online")}</span>
                </p>
              </div>
              <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center border border-gold/40">
                <span className="material-symbols-outlined text-white text-[22px]" aria-hidden="true">explore</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 sm:p-5 bg-surface-container/50 space-y-3"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-center" : "justify-center"} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-secondary text-white rounded-br-md"
                      : "bg-white border border-outline-variant text-on-surface rounded-bl-md"
                  }`}
                >
                  <p className="text-center">{msg.text}</p>
                  {msg.guide && (
                    <ol className="mt-3 space-y-2.5 text-start">
                      {msg.guide.steps.map((s, i) => (
                        <li key={i} className="text-[13px] leading-relaxed text-on-surface">
                          <span>{s.text}</span>
                          {s.href && (
                            <Link
                              href={s.href}
                              onClick={() => setOpen(false)}
                              className="shine inline-flex items-center gap-1 mt-1 text-xs font-bold text-gold-dark hover:text-primary transition-colors"
                            >
                              <span>{s.linkLabel || "מעבר"}</span>
                              <span className="material-symbols-outlined text-[14px]" aria-hidden="true">arrow_back</span>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ol>
                  )}
                  {msg.link && (
                    <Link
                      href={msg.link.href}
                      className="shine inline-flex items-center gap-1 mt-2 text-xs font-bold text-secondary hover:text-primary transition-colors"
                      data-tooltip={msg.link.label}
                      data-tooltip-position="bottom"
                    >
                      <span>{msg.link.label}</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-center animate-fade-in">
                <div className="bg-white border border-outline-variant rounded-2xl rounded-bl-md px-4 py-3 inline-flex items-center gap-2">
                  <span className="text-xs text-on-surface-variant">{t("ai.typing")}</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Guided flows menu — shown after greeting */}
            {messages.length === 1 && !typing && (
              <div className="space-y-3 mt-4">
                <p className="text-[11px] uppercase tracking-widest text-gold-dark font-bold text-center">
                  מדריכים מהירים — איך עושים?
                </p>
                <div className="flex flex-col gap-2">
                  {GUIDES.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => showGuide(g)}
                      className="shine bg-white border border-gold/30 hover:border-gold hover:bg-gold-tint px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2.5 text-start"
                      data-tooltip={`מדריך שלב-אחר-שלב: ${g.title}`}
                    >
                      <span className="material-symbols-outlined text-gold-dark text-[22px] flex-shrink-0" aria-hidden="true">{g.icon}</span>
                      <span className="flex-1 text-primary">{g.title}</span>
                      <span className="material-symbols-outlined text-on-surface-variant text-[18px]" aria-hidden="true">arrow_back</span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-on-surface-variant text-center font-light">או פשוט כתבו לי שאלה חופשית 👇</p>
              </div>
            )}
          </div>

          {/* Lead-capture CTA (chatbot → lead, HLD 4.2) */}
          <div className="border-t border-outline-variant bg-white px-3 pt-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => { setLeadMode(v => !v); setLeadError(false); }}
              aria-expanded={leadMode}
              className="shine w-full text-xs font-bold text-secondary hover:text-primary bg-secondary/5 hover:bg-secondary/10 rounded-full px-3 py-2 transition-colors"
            >
              {t("ai.lead.cta")}
            </button>
          </div>

          {leadMode ? (
            <form onSubmit={handleLeadSubmit} className="p-3 flex-shrink-0 bg-white space-y-2">
              <p className="text-[11px] text-on-surface-variant text-center font-light">{t("ai.lead.title")}</p>
              <div className="grid grid-cols-2 gap-2">
                <label htmlFor="ai-lead-first" className="sr-only">{t("ai.lead.first")}</label>
                <input
                  id="ai-lead-first"
                  type="text"
                  value={leadForm.first}
                  onChange={e => setLeadForm({ ...leadForm, first: e.target.value })}
                  placeholder={t("ai.lead.first")}
                  className="bg-surface-container border-0 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                />
                <label htmlFor="ai-lead-last" className="sr-only">{t("ai.lead.last")}</label>
                <input
                  id="ai-lead-last"
                  type="text"
                  value={leadForm.last}
                  onChange={e => setLeadForm({ ...leadForm, last: e.target.value })}
                  placeholder={t("ai.lead.last")}
                  className="bg-surface-container border-0 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="ai-lead-contact" className="sr-only">{t("ai.lead.contact")}</label>
                <input
                  id="ai-lead-contact"
                  type="text"
                  value={leadForm.contact}
                  onChange={e => setLeadForm({ ...leadForm, contact: e.target.value })}
                  placeholder={t("ai.lead.contact")}
                  dir="ltr"
                  className="flex-1 bg-surface-container border-0 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                />
                <button
                  type="submit"
                  className="shine shine-glow bg-primary text-white rounded-full px-4 min-h-[44px] text-xs font-bold hover:bg-secondary transition-colors whitespace-nowrap"
                >
                  {t("ai.lead.submit")}
                </button>
              </div>
              {leadError && (
                <p className="text-[11px] text-error-red text-center font-semibold">{t("ai.lead.invalid")}</p>
              )}
            </form>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-3 flex items-center gap-2 flex-shrink-0 bg-white"
            >
              <label htmlFor="ai-chat-input" className="sr-only">
                {t("ai.placeholder")}
              </label>
              <input
                ref={inputRef}
                id="ai-chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("ai.placeholder")}
                className="flex-1 bg-surface-container border-0 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-secondary focus:outline-none min-h-[44px]"
                aria-label={t("ai.placeholder")}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="shine shine-glow w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors disabled:bg-outline-variant disabled:cursor-not-allowed flex-shrink-0"
                aria-label={t("ai.send")}
                data-tooltip={t("ai.send")}
                data-tooltip-position="bottom"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}

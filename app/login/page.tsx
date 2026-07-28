"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

type Mode = "select" | "national" | "sso" | "surveyor" | "surveyorProfile";

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("select");
  const [svEmail, setSvEmail] = useState("");
  const [svNumber, setSvNumber] = useState("");
  const [svErr, setSvErr] = useState("");

  const features = [t("login.feat.security"), t("login.feat.idCard"), t("login.feat.history"), t("login.feat.itStandard")];

  const submitSurveyor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!svEmail.trim() || !svNumber.trim()) { setSvErr("יש להזין אימייל ומספר מודד."); return; }
    if (!/^\d{3,7}$/.test(svNumber.trim())) { setSvErr("מספר מודד אינו תקין (3-7 ספרות)."); return; }
    setSvErr("");
    setMode("surveyorProfile");
  };

  // ---- National identity / Org SSO — simulated handoff screens (POC) ----
  if (mode === "national" || mode === "sso") {
    const isNat = mode === "national";
    return (
      <div className="bg-primary min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl max-w-md w-full text-center">
          <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center ${isNat ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
            <span className="material-symbols-outlined text-[36px]" aria-hidden="true">{isNat ? "badge" : "business"}</span>
          </div>
          <h2 className="text-xl font-extrabold text-primary mb-2">{isNat ? "מעבר להזדהות לאומית" : "מעבר ל-SSO ארגוני"}</h2>
          <p className="text-sm text-on-surface-variant mb-1">
            {isNat
              ? "בפרודקשן מתבצעת הפניה מאובטחת למערכת ההזדהות הלאומית של ממשלת ישראל (SAML/OIDC), ולאחר האימות חוזרים לפורטל."
              : "בפרודקשן מתבצעת הפניה ל-SSO של הארגון שלכם (SAML), ולאחר האימות חוזרים לפורטל."}
          </p>
          <div className="bg-alert-yellow/10 border border-alert-yellow/40 rounded-xl px-4 py-2.5 my-5 text-xs text-primary">
            ⚠️ סביבת הדגמה — ההזדהות האמיתית תחובר בפרודקשן (מערך ההזדהות הלאומית / IdP ארגוני).
          </div>
          <div className="flex gap-2 justify-center">
            <button type="button" onClick={() => router.push("/dashboard")}
              className="shine btn-lux-primary px-6 py-3 rounded-full text-sm"
              data-tooltip="המשך לאזור האישי (הדמיה של חזרה מוצלחת מההזדהות).">
              המשך לאזור האישי (הדמיה)
            </button>
            <button type="button" onClick={() => setMode("select")}
              className="shine btn-lux-ghost px-5 py-3 rounded-full text-sm" data-tooltip="חזרה למסך בחירת סוג ההתחברות.">חזרה</button>
          </div>
        </div>
      </div>
    );
  }

  // ---- Surveyor profile (after email + license number) ----
  if (mode === "surveyorProfile") {
    const services = [
      { name: "מנוי CORS RTK", status: "פעיל", date: "עד 05/2027", icon: "wifi_tethering" },
      { name: "שכבות GIS — גוש/חלקה", status: "פעיל", date: "מנוי שנתי", icon: "layers" },
      { name: "תעודות עובד ציבור", status: "3 הופקו", date: "השנה", icon: "verified" },
      { name: "מפות קדסטר", status: "12 הזמנות", date: "היסטוריה", icon: "map" }
    ];
    return (
      <div className="bg-surface min-h-[calc(100vh-5rem)] py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-l from-primary to-tertiary text-white rounded-3xl p-6 md:p-8 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/15 border border-gold/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[36px] text-gold-light" aria-hidden="true">engineering</span>
              </div>
              <div>
                <p className="text-white/70 text-xs">אזור מודד מוסמך</p>
                <h1 className="text-2xl font-extrabold">מודד מס' {svNumber}</h1>
                <p className="text-white/80 text-sm">{svEmail}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="bg-white/10 rounded-xl p-3 text-center"><p className="text-xl font-black">4</p><p className="text-[11px] text-white/70">שירותים פעילים</p></div>
              <div className="bg-white/10 rounded-xl p-3 text-center"><p className="text-xl font-black text-positive-green">מאושר</p><p className="text-[11px] text-white/70">סטטוס רישיון</p></div>
              <div className="bg-white/10 rounded-xl p-3 text-center"><p className="text-xl font-black">15</p><p className="text-[11px] text-white/70">הזמנות סה"כ</p></div>
            </div>
          </div>

          <h2 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-gold-dark" aria-hidden="true">list_alt</span>השירותים שקיבלתי
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {services.map(s => (
              <div key={s.name} className="bg-white rounded-2xl border border-outline-variant/50 p-4 flex items-center gap-3">
                <div className="w-11 h-11 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined" aria-hidden="true">{s.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-primary text-sm">{s.name}</p>
                  <p className="text-xs text-on-surface-variant">{s.status} · {s.date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link href="/catalog" className="shine btn-lux-primary px-6 py-3 rounded-full text-sm" data-tooltip="מעבר לקטלוג להזמנת שירות חדש.">הזמנת שירות חדש</Link>
            <Link href="/dashboard" className="shine btn-lux-ghost px-6 py-3 rounded-full text-sm" data-tooltip="מעבר ללוח הבקרה האישי המלא.">לוח הבקרה האישי</Link>
            <button type="button" onClick={() => setMode("select")} className="shine text-on-surface-variant px-4 py-3 rounded-full text-sm" data-tooltip="יציאה וחזרה למסך הכניסה.">יציאה</button>
          </div>
        </div>
      </div>
    );
  }

  // ---- Surveyor login form ----
  if (mode === "surveyor") {
    return (
      <div className="bg-primary min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl max-w-md w-full">
          <div className="w-14 h-14 mx-auto mb-4 bg-positive-green/10 text-positive-green rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-[30px]" aria-hidden="true">engineering</span>
          </div>
          <h2 className="text-xl font-extrabold text-primary mb-1 text-center">כניסת מודד מוסמך</h2>
          <p className="text-sm text-on-surface-variant mb-6 text-center">הזדהות באמצעות דוא"ל ומספר רישיון המודד</p>
          <form onSubmit={submitSurveyor} className="space-y-4">
            <div>
              <label htmlFor="sv-email" className="block text-xs font-semibold text-primary mb-1.5">דוא"ל</label>
              <input id="sv-email" type="email" required value={svEmail} onChange={e => setSvEmail(e.target.value)} dir="ltr"
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary focus:outline-none min-h-[48px]"
                data-tooltip="כתובת האימייל הרשומה על שם המודד במרשם המודדים." />
            </div>
            <div>
              <label htmlFor="sv-num" className="block text-xs font-semibold text-primary mb-1.5">מספר מודד</label>
              <input id="sv-num" inputMode="numeric" required value={svNumber} onChange={e => setSvNumber(e.target.value)} dir="ltr" placeholder="לדוגמה: 12345"
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary focus:outline-none min-h-[48px]"
                data-tooltip="מספר רישיון המודד המוסמך כפי שמופיע בתעודת הרישיון." />
            </div>
            {svErr && <p className="text-sm text-error-red text-center">{svErr}</p>}
            <button type="submit" className="shine shine-glow btn-lux-primary w-full py-3.5 rounded-full min-h-[52px]"
              data-tooltip="כניסה לאזור המודד: פרטי הרישיון והשירותים שקיבלתם.">כניסה</button>
            <button type="button" onClick={() => setMode("select")} className="shine w-full text-on-surface-variant py-2 text-sm" data-tooltip="חזרה למסך בחירת סוג ההתחברות.">חזרה</button>
          </form>
        </div>
      </div>
    );
  }

  // ---- Selection screen ----
  return (
    <div className="bg-primary min-h-[calc(100vh-5rem)] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-10" aria-hidden="true" />
      <div className="absolute inset-0 topo-pattern opacity-20" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" aria-hidden="true" />

      <div className="relative max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-12 w-full grid lg:grid-cols-2 gap-8 items-center">
        <div className="text-white text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 text-white/90 border border-white/10">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">verified_user</span>
            <span className="text-xs font-bold tracking-wide">{t("login.national")}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            {t("login.title")}<br /><span className="text-secondary-container">{t("login.titleSub")}</span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-lg">{t("login.intro")}</p>
          <div className="space-y-3">
            {features.map((feat, i) => (
              <div key={i} className="flex items-center justify-center gap-3 text-sm">
                <span>{feat}</span>
                <span className="material-symbols-outlined text-secondary-container" aria-hidden="true">check_circle</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
          <h2 className="text-2xl font-extrabold text-primary mb-2 text-center">כניסה או הרשמה לאזור האישי</h2>
          <div className="bg-gold-tint/60 border border-gold/25 rounded-xl px-4 py-2.5 mb-6 text-center">
            <p className="text-xs text-primary font-medium">לקוח חדש? אין צורך בהרשמה נפרדת — בחרו סוג משתמש והתחברו. החשבון נוצר אוטומטית בכניסה הראשונה.</p>
          </div>

          <button type="button" onClick={() => setMode("national")}
            className="shine shine-glow block w-full bg-gradient-to-l from-primary to-secondary text-white p-5 rounded-2xl font-bold hover:shadow-xl transition-all mb-3 text-right"
            data-tooltip="התחברות לאזרחים פרטיים דרך מערכת ההזדהות הלאומית של ממשלת ישראל.">
            <div className="flex flex-row-reverse items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined text-[28px]" aria-hidden="true">badge</span></div>
              <div className="text-center flex-1"><p className="text-lg font-extrabold">{t("login.national")}</p><p className="text-xs font-normal text-white/80">{t("login.nationalSub")}</p></div>
              <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
            </div>
          </button>

          <button type="button" onClick={() => setMode("sso")}
            className="shine block w-full bg-white border-2 border-outline-variant hover:border-secondary text-primary p-5 rounded-2xl font-bold transition-all mb-3 text-right"
            data-tooltip="התחברות לעובדי ארגונים ורשויות דרך מערכת ה-SSO של הארגון שלכם.">
            <div className="flex flex-row-reverse items-center gap-4">
              <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined text-[28px]" aria-hidden="true">business</span></div>
              <div className="text-center flex-1"><p className="text-lg font-extrabold">{t("login.sso")}</p><p className="text-xs font-normal text-on-surface-variant">{t("login.ssoSub")}</p></div>
              <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
            </div>
          </button>

          <button type="button" onClick={() => setMode("surveyor")}
            className="shine block w-full bg-white border-2 border-outline-variant hover:border-secondary text-primary p-5 rounded-2xl font-bold transition-all text-right"
            data-tooltip="כניסת מודדים מוסמכים באמצעות אימייל ומספר רישיון המודד.">
            <div className="flex flex-row-reverse items-center gap-4">
              <div className="w-14 h-14 bg-positive-green/10 text-positive-green rounded-2xl flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined text-[28px]" aria-hidden="true">engineering</span></div>
              <div className="text-center flex-1"><p className="text-lg font-extrabold">{t("login.surveyor")}</p><p className="text-xs font-normal text-on-surface-variant">{t("login.surveyorSub")}</p></div>
              <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
            </div>
          </button>

          <div className="mt-8 pt-6 border-t border-outline-variant text-center">
            <p className="text-xs text-on-surface-variant">{t("login.problem")}{" "}
              <Link href="/help" className="shine text-secondary font-bold hover:underline px-1 rounded">{t("login.helpCenter")}</Link>
            </p>
            <p className="text-xs text-on-surface-variant mt-3 bg-gold-tint/60 border border-gold/25 rounded-xl px-3 py-2 inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-gold-dark" aria-hidden="true">edit_note</span>
              <span>מנהל מערכת?</span>
              <Link href="/cms/login" className="shine text-gold-dark font-bold hover:underline px-1 rounded" data-tooltip="מסך הכניסה לממשק ניהול התוכן.">לממשק הניהול ←</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

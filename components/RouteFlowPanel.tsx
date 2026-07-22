"use client";

// Chapter-5 route-specific order steps (אפיון HLD V8, פרק 5).
// Each sales route gets its spec'd UX inside the shared order wizard:
//  5.1 CORS   — PRE-PAID bank (VRS 0.7₪/min, RTK 300₪/mo), payment matrix
//  5.2 Paper  — delivery: registered mail / express / self-pickup (no OTP)
//  5.3 Historic — archive availability check (full / partial / scan-only)
//  5.5 Ortho  — vector upload or map, censorship consent, 4 license types
//  5.8 Surveyor — parcels fee ladder, opportunity only after payment
import { useEffect, useState } from "react";
import type { Service } from "@/lib/data";

export interface RouteFlowResult {
  /** ₪ delta added to (or subtracted from) the base price */
  priceDelta: number;
  /** Short lines for the order summary */
  summaryLines: string[];
  /** Step may not proceed until the route flow is valid */
  valid: boolean;
}

interface Props {
  service: Service;
  onChange: (r: RouteFlowResult) => void;
}

const VECTOR_EXTS = [".zip", ".dwg", ".kml", ".kmz"];

// 5.8 — updated fee ladder (spec 4.6.2)
const SURVEYOR_FEES = [
  { maxParcels: 0, label: "רישום ראשוני", fee: 1000 },
  { maxParcels: 10, label: "עד 10 חלקות", fee: 1150 },
  { maxParcels: 50, label: "עד 50 חלקות", fee: 1700 },
  { maxParcels: 100, label: "עד 100 חלקות", fee: 2200 }
];

const PICKUP_POINTS = ["תל אביב — לינקולן 1", "מודיעין — מרכז מיפוי", "חיפה — קריית הממשלה", "באר שבע — קריית הממשלה"];

export default function RouteFlowPanel({ service, onChange }: Props) {
  // 5.5 ortho / aerial
  const [areaMethod, setAreaMethod] = useState<"map" | "file">("map");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [censorState, setCensorState] = useState<"idle" | "checking" | "clear" | "flagged">("idle");
  const [censorConsent, setCensorConsent] = useState(false);
  const [license, setLicense] = useState<"private" | "org" | "commercial" | "academic">("private");
  const [commercialPurpose, setCommercialPurpose] = useState("");
  // 5.2 paper
  const [delivery, setDelivery] = useState<"registered" | "express" | "pickup">("registered");
  const [pickupPoint, setPickupPoint] = useState(PICKUP_POINTS[0]);
  // 5.3 historic
  const [availState, setAvailState] = useState<"idle" | "checking" | "full" | "partial" | "scanOnly">("idle");
  // 5.1 cors
  const [corsProduct, setCorsProduct] = useState<"rtk" | "vrs">("rtk");
  const [payMethod, setPayMethod] = useState<"credit" | "directDebit" | "commitment">("credit");
  const [bankAmount, setBankAmount] = useState(3600);
  // 5.8 surveyor
  const [parcels, setParcels] = useState(1);
  const [ellipses, setEllipses] = useState(1);
  // 5.12 WS background services
  const [wsTier, setWsTier] = useState<"public" | "business">("public");
  const [wsOrgId, setWsOrgId] = useState("");
  // 5.11 public-servant certificate (תע"צ)
  const [certBlock, setCertBlock] = useState("");
  const [certParcel, setCertParcel] = useState("");
  const [certAddress, setCertAddress] = useState("");

  const family: "ortho" | "paper" | "historic" | "cors" | "surveyor" | "ws" | "certificate" | "generic" =
    service.slug === "elevation-data" || service.slug === "aerial-photos" ? "ortho" :
    service.slug === "city-map" || service.slug === "marine-maps" ? "paper" :
    service.slug === "historic-maps" ? "historic" :
    service.slug === "cors-subscription" ? "cors" :
    service.slug === "surveyor-inspector" ? "surveyor" :
    service.slug === "wms-subscription" ? "ws" :
    service.slug === "boundary-certificate" ? "certificate" : "generic";

  // VRS must not use credit card (spec 5.1 payment matrix)
  useEffect(() => {
    if (family === "cors" && corsProduct === "vrs" && payMethod === "credit") {
      setPayMethod("directDebit");
    }
  }, [family, corsProduct, payMethod]);

  // Report state up to the wizard
  useEffect(() => {
    let priceDelta = 0;
    const summaryLines: string[] = [];
    let valid = true;

    if (family === "ortho") {
      if (areaMethod === "file") {
        summaryLines.push(`קובץ אזור: ${fileName || "—"}`);
        if (!fileName) valid = false;
      } else {
        summaryLines.push("אזור: סימון במפת GovMap");
      }
      if (censorState === "flagged" && !censorConsent) valid = false;
      if (censorState === "flagged" && censorConsent) summaryLines.push("אישור חיתוך שכבת צנזורה ✓");
      if (license === "academic") {
        // 50% off, discount capped at ₪5,000 (worked example in 5.5)
        const discount = Math.min(service.priceFrom * 0.5, 5000);
        priceDelta -= discount;
        summaryLines.push(`רישיון אקדמי: הנחה ₪${discount.toLocaleString()} (50% עד ₪5,000)`);
      } else {
        summaryLines.push(
          license === "private" ? "רישיון: פרטי" :
          license === "org" ? "רישיון: ארגוני" : `רישיון מסחרי: ${commercialPurpose || "—"}`
        );
        if (license === "commercial" && !commercialPurpose) valid = false;
      }
    }

    if (family === "paper") {
      if (delivery === "express") { priceDelta += 39; summaryLines.push("משלוח מהיר: ₪39"); }
      else if (delivery === "registered") summaryLines.push("דואר רשום: ללא עלות");
      else summaryLines.push(`איסוף עצמי: ${pickupPoint}`);
    }

    if (family === "historic") {
      if (availState === "idle" || availState === "checking") valid = false;
      if (availState === "full") summaryLines.push("זמינות בארכיון: מלאה ✓");
      if (availState === "partial") summaryLines.push("זמינות חלקית — פריטים חסרים יסופקו בעותק סרוק (₪0)");
      if (availState === "scanOnly") { priceDelta -= Math.round(service.priceFrom * 0.3); summaryLines.push("עותק סרוק בלבד — הפחתת ₪" + Math.round(service.priceFrom * 0.3).toLocaleString()); }
    }

    if (family === "cors") {
      if (corsProduct === "rtk") {
        const months = Math.floor(bankAmount / 300);
        priceDelta = bankAmount - service.priceFrom;
        summaryLines.push(`RTK — בנק ${months} חודשי מנוי (₪300/חודש למנוי פעיל)`);
      } else {
        const minutes = Math.floor(bankAmount / 0.7);
        priceDelta = bankAmount - service.priceFrom;
        summaryLines.push(`VRS — בנק ${minutes.toLocaleString()} דקות שימוש (₪0.7/דקה)`);
      }
      summaryLines.push(
        payMethod === "credit" ? "תשלום: כרטיס אשראי" :
        payMethod === "directDebit" ? "תשלום: הוראת קבע (חיוב חודשי T+1 לפי שימוש)" :
        "תשלום: התחייבות כספית (מרכבה)"
      );
      summaryLines.push("חידוש אוטומטי: הזדמנות חידוש נפתחת ב-93% ניצול");
      if (bankAmount < 300) valid = false;
    }

    if (family === "surveyor") {
      const tier = SURVEYOR_FEES.find(f => parcels <= f.maxParcels) || SURVEYOR_FEES[SURVEYOR_FEES.length - 1];
      priceDelta = tier.fee - service.priceFrom;
      summaryLines.push(`${tier.label}: ₪${tier.fee.toLocaleString()} · ${ellipses} אליפסות (ללא הגבלה)`);
      summaryLines.push("ההזמנה נקלטת במערכת רק לאחר אישור התשלום (טופוקד)");
    }

    if (family === "ws") {
      if (wsTier === "public") {
        priceDelta = -service.priceFrom; // free public tier
        summaryLines.push("מסלול ציבורי — ללא עלות (שירותי רקע XYZ)");
      } else {
        summaryLines.push("מסלול עסקי — מחירי השקה לתקופה מוגבלת; הצעת מחיר תישלח");
        if (!wsOrgId.trim()) valid = false;
        else summaryLines.push(`ח"פ/מזהה ארגון: ${wsOrgId}`);
      }
      summaryLines.push("השירות ייפתח תחילה בסביבת TEST לבדיקות הלקוח, ולאחר אישור — ב-PROD");
    }

    if (family === "certificate") {
      if (!certBlock.trim() || !certParcel.trim()) valid = false;
      else summaryLines.push(`מבנה: גוש ${certBlock}, חלקה ${certParcel}${certAddress ? ` · ${certAddress}` : ""}`);
      summaryLines.push("תעודת עובד ציבור חתומה דיגיטלית תונפק לאחר הבדיקה והתשלום");
    }

    onChange({ priceDelta, summaryLines, valid });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [family, areaMethod, fileName, censorState, censorConsent, license, commercialPurpose, delivery, pickupPoint, availState, corsProduct, payMethod, bankAmount, parcels, ellipses, wsTier, wsOrgId, certBlock, certParcel, certAddress]);

  const handleFile = (f: File | null) => {
    if (!f) return;
    const ok = VECTOR_EXTS.some(ext => f.name.toLowerCase().endsWith(ext));
    if (!ok) { setFileError("פורמט לא נתמך — יש להעלות ZIP (רכיבי SHP), DWG, KML או KMZ"); setFileName(""); return; }
    setFileError("");
    setFileName(f.name);
    runCensorCheck();
  };

  // Simulated censorship-layer GIS check (production: real layer intersect)
  const runCensorCheck = () => {
    setCensorState("checking");
    setCensorConsent(false);
    setTimeout(() => {
      setCensorState(Math.random() < 0.35 ? "flagged" : "clear");
    }, 900);
  };

  const checkAvailability = () => {
    setAvailState("checking");
    setTimeout(() => {
      const r = Math.random();
      setAvailState(r < 0.55 ? "full" : r < 0.85 ? "partial" : "scanOnly");
    }, 900);
  };

  if (family === "generic") return null;

  const box = "bg-white rounded-2xl border border-gold/25 p-5 space-y-4";
  const label = "block text-xs font-semibold text-primary mb-1.5";
  const chip = (active: boolean) =>
    `shine px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${
      active ? "bg-primary text-white border-primary" : "bg-white text-primary border-outline-variant hover:border-gold"
    }`;

  return (
    <section className={box} aria-label="שלבי המסלול לפי האפיון">
      <p className="lux-label">שלבי המסלול — לפי האפיון המפורט (פרק 5)</p>

      {family === "ortho" && (
        <>
          <div>
            <span className={label}>הגדרת אזור העניין</span>
            <div className="flex gap-2 flex-wrap">
              <button type="button" className={chip(areaMethod === "map")} onClick={() => { setAreaMethod("map"); runCensorCheck(); }}
                data-tooltip="סימון פוליגון ישירות על מפת GovMap למעלה">סימון במפה</button>
              <button type="button" className={chip(areaMethod === "file")} onClick={() => setAreaMethod("file")}
                data-tooltip="העלאת קובץ וקטורי: ZIP עם רכיבי SHP‏ (SBX/SBN/PRJ/DBF/CPG), DWG, KML/KMZ">העלאת קובץ וקטורי</button>
            </div>
            {areaMethod === "file" && (
              <div className="mt-3">
                <input
                  type="file"
                  accept={VECTOR_EXTS.join(",")}
                  onChange={e => handleFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-on-surface-variant file:me-3 file:px-4 file:py-2 file:rounded-full file:border file:border-gold/40 file:bg-gold-tint file:text-gold-dark file:font-semibold file:cursor-pointer"
                  aria-label="העלאת קובץ אזור וקטורי"
                />
                {fileName && <p className="text-positive-green text-xs mt-1.5 font-semibold">✓ {fileName}</p>}
                {fileError && <p className="text-error-red text-xs mt-1.5">{fileError}</p>}
              </div>
            )}
          </div>

          {censorState !== "idle" && (
            <div className={`rounded-xl p-3 text-sm border ${
              censorState === "flagged" ? "bg-alert-yellow/10 border-alert-yellow/40" :
              censorState === "clear" ? "bg-positive-green/10 border-positive-green/30" : "bg-surface-container border-outline-variant"
            }`} aria-live="polite">
              {censorState === "checking" && <span>בודק חיתוך מול שכבת הצנזורה...</span>}
              {censorState === "clear" && <span className="text-positive-green font-semibold">✓ האזור אינו חוצה שכבת צנזורה</span>}
              {censorState === "flagged" && (
                <div className="space-y-2">
                  <p className="font-semibold text-primary">האזור חוצה שכבת צנזורה — אזורים מוצנזרים יסופקו מטושטשים/חתוכים.</p>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" checked={censorConsent} onChange={e => setCensorConsent(e.target.checked)} className="mt-0.5 w-4 h-4 rounded" />
                    <span className="text-xs">אני מאשר/ת את אספקת המוצר בכפוף לחיתוך שכבת הצנזורה</span>
                  </label>
                </div>
              )}
            </div>
          )}

          <div>
            <span className={label}>סוג רישיון שימוש</span>
            <div className="flex gap-2 flex-wrap">
              {([["private", "פרטי"], ["org", "ארגוני"], ["commercial", "מסחרי"], ["academic", "אקדמי (50%-)"]] as const).map(([id, lbl]) => (
                <button key={id} type="button" className={chip(license === id)} onClick={() => setLicense(id)}>{lbl}</button>
              ))}
            </div>
            {license === "commercial" && (
              <select value={commercialPurpose} onChange={e => setCommercialPurpose(e.target.value)}
                className="mt-2 w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-sm" aria-label="מטרת השימוש המסחרי">
                <option value="">בחר/י מטרת שימוש...</option>
                <option>פרסום ושיווק</option>
                <option>תכנון והנדסה</option>
                <option>מכירה משולבת במוצר</option>
                <option>אחר (יפורט בהערות)</option>
              </select>
            )}
            {license === "academic" && (
              <p className="text-xs text-gold-dark mt-1.5">ההנחה מחושבת אוטומטית: 50% עד תקרת הנחה של ₪5,000 (יידרש אימות מוסד אקדמי)</p>
            )}
          </div>
        </>
      )}

      {family === "paper" && (
        <div>
          <span className={label}>אופן אספקה</span>
          <div className="flex gap-2 flex-wrap">
            <button type="button" className={chip(delivery === "registered")} onClick={() => setDelivery("registered")}
              data-tooltip="דואר רשום — ללא עלות, 5-10 ימי עסקים">דואר רשום</button>
            <button type="button" className={chip(delivery === "express")} onClick={() => setDelivery("express")}
              data-tooltip="שליח עד הבית — ₪39, 2-4 ימי עסקים; מספר מעקב יישלח במייל וב-SMS">משלוח מהיר ₪39</button>
            <button type="button" className={chip(delivery === "pickup")} onClick={() => setDelivery("pickup")}
              data-tooltip="איסוף עצמי מנקודת שירות — ללא עלות; ללא צורך בקוד אימות">איסוף עצמי</button>
          </div>
          {delivery === "pickup" && (
            <select value={pickupPoint} onChange={e => setPickupPoint(e.target.value)}
              className="mt-2 w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-sm" aria-label="נקודת איסוף">
              {PICKUP_POINTS.map(p => <option key={p}>{p}</option>)}
            </select>
          )}
        </div>
      )}

      {family === "historic" && (
        <div aria-live="polite">
          <span className={label}>בדיקת זמינות בארכיון ההיסטורי</span>
          {availState === "idle" && (
            <button type="button" onClick={checkAvailability} className="shine btn-lux-primary px-5 py-2.5 rounded-full text-sm">
              בדוק זמינות
            </button>
          )}
          {availState === "checking" && <p className="text-sm text-on-surface-variant">בודק מול קטלוג הארכיון...</p>}
          {availState === "full" && <p className="text-positive-green font-semibold text-sm">✓ כל הפריטים זמינים בארכיון — הדפסה איכותית</p>}
          {availState === "partial" && <p className="text-alert-yellow font-semibold text-sm">◐ זמינות חלקית — פריטים חסרים יסופקו כעותק סרוק ללא חיוב (₪0 בשורה)</p>}
          {availState === "scanOnly" && <p className="text-secondary font-semibold text-sm">עותק סרוק בלבד זמין — המחיר הופחת בהתאם</p>}
          {availState !== "idle" && availState !== "checking" && (
            <button type="button" onClick={checkAvailability} className="text-xs text-secondary underline mt-2">בדיקה חוזרת</button>
          )}
        </div>
      )}

      {family === "cors" && (
        <>
          <div>
            <span className={label}>מוצר מנוי (מודל PRE-PAID — בנק שימוש מראש)</span>
            <div className="flex gap-2 flex-wrap">
              <button type="button" className={chip(corsProduct === "rtk")} onClick={() => setCorsProduct("rtk")}
                data-tooltip="₪300 לחודש למנוי פעיל (מנוי שביצע שימוש בחודש); ההתחייבות נהפכת לבנק חודשים">RTK — ₪300/חודש</button>
              <button type="button" className={chip(corsProduct === "vrs")} onClick={() => setCorsProduct("vrs")}
                data-tooltip="₪0.7 לדקת שימוש בפועל; ההתחייבות נהפכת לבנק דקות">VRS — ₪0.7/דקה</button>
            </div>
          </div>
          <div>
            <span className={label}>סכום טעינת הבנק (₪)</span>
            <input type="number" min={300} step={100} value={bankAmount}
              onChange={e => setBankAmount(Number(e.target.value) || 0)}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-sm" aria-label="סכום טעינה" />
            <p className="text-xs text-gold-dark mt-1.5">
              {corsProduct === "rtk"
                ? `= בנק של ${Math.floor(bankAmount / 300)} חודשי מנוי · חידוש כשנותרו ≤2 חודשים`
                : `= בנק של ${Math.floor(bankAmount / 0.7).toLocaleString()} דקות · הזדמנות חידוש נפתחת אוטומטית ב-93% ניצול`}
            </p>
          </div>
          <div>
            <span className={label}>אמצעי תשלום</span>
            <div className="flex gap-2 flex-wrap">
              <button type="button" disabled={corsProduct === "vrs"} className={`${chip(payMethod === "credit")} ${corsProduct === "vrs" ? "opacity-40 cursor-not-allowed" : ""}`}
                onClick={() => setPayMethod("credit")}
                data-tooltip={corsProduct === "vrs" ? "לפי האפיון: VRS אינו נמכר בכרטיס אשראי — הוראת קבע או התחייבות בלבד" : "תשלום מיידי בשרת התשלומים הממשלתי"}>
                כרטיס אשראי
              </button>
              <button type="button" className={chip(payMethod === "directDebit")} onClick={() => setPayMethod("directDebit")}
                data-tooltip="חיוב חודשי אוטומטי לפי שימוש בפועל (T+1)">הוראת קבע</button>
              <button type="button" className={chip(payMethod === "commitment")} onClick={() => setPayMethod("commitment")}
                data-tooltip="התחייבות כספית דרך מרכבה — ללקוחות ממשלתיים ומוסדיים">התחייבות כספית</button>
            </div>
          </div>
        </>
      )}

      {family === "ws" && (
        <>
          <div>
            <span className={label}>מסלול שירותי הרקע (WS)</span>
            <div className="flex gap-2 flex-wrap">
              <button type="button" className={chip(wsTier === "public")} onClick={() => setWsTier("public")}
                data-tooltip="גישה ציבורית חופשית לאריחי הרקע (XYZ Tiles) — ללא עלות">ציבורי — חינם</button>
              <button type="button" className={chip(wsTier === "business")} onClick={() => setWsTier("business")}
                data-tooltip="שימוש עסקי/מסחרי בשירותי הרקע — מחירי השקה לתקופה מוגבלת">עסקי — בתשלום</button>
            </div>
            {wsTier === "business" && (
              <input value={wsOrgId} onChange={e => setWsOrgId(e.target.value)} placeholder='ח"פ / מזהה ארגון *'
                className="mt-2 w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-sm" aria-label="מזהה ארגון" />
            )}
          </div>
          <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-3 text-xs text-on-surface-variant">
            לפי האפיון: לאחר אישור הבקשה השירות נפתח תחילה לבדיקות בצד הלקוח בסביבת <b>TEST</b>, ורק לאחר אישורכם — בסביבת <b>PROD</b>.
          </div>
        </>
      )}

      {family === "certificate" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className={label}>גוש *</span>
              <input value={certBlock} onChange={e => setCertBlock(e.target.value)} inputMode="numeric"
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-sm" aria-label="מספר גוש" />
            </div>
            <div>
              <span className={label}>חלקה *</span>
              <input value={certParcel} onChange={e => setCertParcel(e.target.value)} inputMode="numeric"
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-sm" aria-label="מספר חלקה" />
            </div>
          </div>
          <div>
            <span className={label}>כתובת המבנה (רשות)</span>
            <input value={certAddress} onChange={e => setCertAddress(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-sm" aria-label="כתובת המבנה" />
          </div>
          <div className="bg-gold-tint/60 border border-gold/25 rounded-xl p-3 text-xs text-on-surface-variant">
            תעודת עובד ציבור לחיבור מבנה ישן לרשת החשמל — התעודה החתומה דיגיטלית תישלח למייל לאחר בדיקת הזכאות והתשלום.
          </div>
        </>
      )}

      {family === "surveyor" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className={label}>מספר חלקות</span>
              <input type="number" min={0} max={100} value={parcels} onChange={e => setParcels(Number(e.target.value) || 0)}
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-sm" aria-label="מספר חלקות" />
            </div>
            <div>
              <span className={label}>מספר אליפסות</span>
              <input type="number" min={1} value={ellipses} onChange={e => setEllipses(Number(e.target.value) || 1)}
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-sm" aria-label="מספר אליפסות" />
            </div>
          </div>
          <div className="bg-gold-tint/60 border border-gold/25 rounded-xl p-3 text-sm">
            <p className="font-semibold text-primary mb-1">מדרגות אגרה (מעודכן):</p>
            <ul className="text-xs text-on-surface-variant space-y-0.5">
              {SURVEYOR_FEES.map(f => (
                <li key={f.label} className={parcels <= f.maxParcels && (SURVEYOR_FEES.find(x => parcels <= x.maxParcels) === f) ? "text-gold-dark font-bold" : ""}>
                  {f.label} — ₪{f.fee.toLocaleString()}
                </li>
              ))}
              <li>מעל 100 חלקות — תמחור פרטני מול האגף</li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
}

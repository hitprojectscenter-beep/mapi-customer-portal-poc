"use client";

// In-portal inquiry UI for the international-boundaries service, implementing the
// citizen-facing conditional logic of the official form Boundaries@mapi.gov.il (V2):
// service type → place-specification method → coordinate/block/file fields, the
// coordinate-grid validation ranges, customer-type fields, and the two-stage
// (citizen → office) submission. The office review / license / quote / payment
// tabs are handled by the office and are represented here as the "what happens
// next" flow after submission.

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Service } from "@/lib/data";
import { GIS_EXTENSIONS, MEASUREMENT_EXTENSIONS, validateAttachment, ATTACHMENT_MAX_MB } from "@/lib/mapiLists";

type ServiceType = "1" | "2" | "3";      // מרחבית / מדידה / אחר
type PlaceMethod = "1" | "2" | "3" | "4"; // GIS / גוש+חלקה / גוש שומה / קואורדינטות
type CustomerType = "1" | "2";            // פרטי / עסקי

const FEES = [
  { label: "הכנת תעודת עובד ציבור בתחום הגבולות", amount: "500 ₪" },
  { label: "שעת מידע (תקנות המדידה — אגרות)", amount: "243 ₪" },
  { label: "משלוח בדואר רשום", amount: "39 ₪" },
  { label: "משלוח בדואר מהיר", amount: "80 ₪" }
];

// Coordinate validity ranges — Israeli grid (רשת ישראל התקפה), per the spec.
const Y_MIN = 350000, Y_MAX = 810000, X_MIN = 115000, X_MAX = 3000000;

const digits9 = (v: string) => /^\d{9}$/.test(v.trim());
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function BoundariesInquiryForm({ service }: { service: Service }) {
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [placeMethod, setPlaceMethod] = useState<PlaceMethod | "">("");
  const [y, setY] = useState("");
  const [x, setX] = useState("");
  const [block, setBlock] = useState("");
  const [parcel, setParcel] = useState("");
  const [gisFile, setGisFile] = useState("");
  const [measureFile, setMeasureFile] = useState("");
  const [detail, setDetail] = useState("");

  const [customerType, setCustomerType] = useState<CustomerType | "">("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNum, setIdNum] = useState("");
  const [company, setCompany] = useState("");
  const [companyNum, setCompanyNum] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [ref, setRef] = useState("");

  // Conditional visibility (mirrors the spec's show/hide conditions).
  const showPlace = serviceType === "1";
  const showCoords = showPlace && placeMethod === "4";
  const showBlock = showPlace && (placeMethod === "2" || placeMethod === "3");
  const showGisAttach = (showPlace && placeMethod === "1") || serviceType === "2" || serviceType === "3";
  const showMeasure = serviceType === "2";

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!serviceType) e.serviceType = "יש לבחור את השירות המבוקש.";
    if (showPlace && !placeMethod) e.placeMethod = "יש לבחור את אופן ציון המקום.";
    if (showCoords) {
      const yn = Number(y), xn = Number(x);
      if (!y) e.y = "יש להזין קואורדינטת Y.";
      else if (!/^\d{1,16}$/.test(y.trim())) e.y = "Y — ספרות בלבד.";
      else if (!Number.isFinite(yn) || yn < Y_MIN || yn > Y_MAX) e.y = `Y מחוץ לטווח התקף (${Y_MIN.toLocaleString()}–${Y_MAX.toLocaleString()}).`;
      if (!x) e.x = "יש להזין קואורדינטת X.";
      // Spec: decimal number, up to 2 digits after the point.
      else if (!/^\d{1,16}(\.\d{1,2})?$/.test(x.trim())) e.x = "X — ספרות, עד שתי ספרות אחרי הנקודה.";
      else if (!Number.isFinite(xn) || xn < X_MIN || xn > X_MAX) e.x = `X מחוץ לטווח התקף (${X_MIN.toLocaleString()}–${X_MAX.toLocaleString()}).`;
    }
    if (showBlock) {
      if (!block.trim()) e.block = "יש להזין מספר גוש.";
      else if (!/^[\d/]{1,12}$/.test(block.trim())) e.block = "מספר גוש — ספרות (וסלש) בלבד, עד 12 תווים.";
      if (!parcel.trim()) e.parcel = "יש להזין מספר חלקה.";
      else if (!/^\d{1,16}$/.test(parcel.trim())) e.parcel = "מספר חלקה — ספרות בלבד.";
    }
    // GISFile is required when place method = GIS (service 1), and also for a
    // measurement check (service 2), per the spec; optional for "other" (3).
    if (((showPlace && placeMethod === "1") || serviceType === "2") && !gisFile) e.gisFile = "יש לצרף קובץ GIS (ממ\"ג).";
    if (serviceType === "2" && !measureFile) e.measureFile = "יש לצרף מפת מדידה.";
    if (detail.trim().length < 20) e.detail = "יש לפרט את הפנייה (לפחות 20 תווים).";

    if (!customerType) e.customerType = "יש לבחור את סוג הלקוח.";
    // Field lengths follow the spec (names 2-25, company up to 50, phone 9-11).
    if (customerType === "1") {
      if (firstName.trim().length < 2) e.firstName = "שם פרטי — 2 תווים לפחות.";
      if (lastName.trim().length < 2) e.lastName = "שם משפחה — 2 תווים לפחות.";
      if (!digits9(idNum)) e.idNum = "מספר זהות בן 9 ספרות.";
    }
    if (customerType === "2") {
      if (!company.trim()) e.company = "שדה חובה.";
      if (!digits9(companyNum)) e.companyNum = "מספר ח.פ בן 9 ספרות.";
    }
    if (!emailOk(email)) e.email = "כתובת דוא\"ל לא תקינה.";
    if (!phone.trim()) e.phone = "שדה חובה.";
    else if (!/^[\d\-+() ]{9,11}$/.test(phone.trim())) e.phone = "מספר טלפון בן 9 עד 11 תווים.";
    if (detail.trim().length > 2000) e.detail = "פירוט הפנייה מוגבל ל-2000 תווים.";
    return e;
  }, [serviceType, placeMethod, showPlace, showCoords, showBlock, y, x, block, parcel, gisFile, measureFile, detail, customerType, firstName, lastName, idNum, company, companyNum, email, phone]);

  const isValid = Object.keys(errors).length === 0;

  const submit = async () => {
    if (!isValid) { setShowErrors(true); return; }
    const reference = `BND-${Date.now().toString(36).toUpperCase()}`;
    setRef(reference);
    const serviceLabel = { "1": "בדיקה מרחבית", "2": "בדיקת מדידה", "3": "אחר" }[serviceType as ServiceType];
    // Best-effort persistence as a lead (never blocks the confirmation).
    try {
      await fetch("/api/leads", {
        method: "POST", headers: { "Content-Type": "application/json" }, keepalive: true,
        body: JSON.stringify({
          leadId: reference,
          firstName: customerType === "1" ? firstName : company,
          lastName: customerType === "1" ? lastName : "",
          email, phone,
          organization: customerType === "2" ? company : "",
          interest: `גבולות בינלאומיים — ${serviceLabel}`,
          source_label: "portal-boundaries-form",
          family_label: "boundaries"
        })
      }).catch(() => {});
    } catch { /* demo/offline */ }
    setSubmitted(true);
  };

  const err = (k: string) => showErrors && errors[k]
    ? <p className="text-[11px] text-error-red mt-1">{errors[k]}</p> : null;

  const inputCls = "w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 min-h-[48px] focus:ring-2 focus:ring-secondary focus:outline-none";
  const labelCls = "block text-sm font-semibold text-primary mb-1.5";

  if (submitted) {
    return (
      <div dir="rtl" className="max-w-2xl mx-auto bg-white rounded-3xl border border-outline-variant/50 p-8 md:p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-positive-green/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-[52px] text-positive-green" aria-hidden="true">task_alt</span>
        </div>
        <h2 className="text-2xl font-extrabold text-primary mb-2">הפנייה נשלחה בהצלחה</h2>
        <p className="text-on-surface-variant mb-1">מספר סימוכין: <span className="font-mono font-bold text-primary" dir="ltr">{ref}</span></p>
        <p className="text-sm text-on-surface-variant mb-6">אישור נשלח לכתובת <span className="font-semibold">{email}</span>.</p>
        <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-5 text-right mb-6">
          <p className="text-sm font-bold text-primary mb-2">מה קורה עכשיו?</p>
          <ol className="text-sm text-on-surface-variant space-y-1.5 list-decimal pr-5">
            <li>אגף הגבולות בודק את הפנייה (אישור / דחייה / החזרה לתיקון).</li>
            <li>אם אושר ונדרש — יישלח רישיון שימוש לחתימה.</li>
            <li>תישלח הצעת מחיר לתשלום האגרה.</li>
            <li>לאחר התשלום — המידע יימסר בקישור מאובטח לדוא"ל.</li>
          </ol>
          <p className="text-[11px] text-on-surface-variant/80 mt-3">זמן טיפול: עד 4 ימי עסקים. פורמט תוצר: Shapefile / PDF / JPEG / PNG / TIFF.</p>
        </div>
        <Link href={`/catalog/${service.slug}`} className="text-secondary hover:text-primary underline text-sm">חזרה לעמוד השירות</Link>
      </div>
    );
  }

  return (
    <div dir="rtl" className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Section A — service type */}
        <section className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-7">
          <h3 className="text-lg font-extrabold text-primary mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-secondary text-white text-sm font-bold flex items-center justify-center">1</span>
            השירות המבוקש
          </h3>
          <fieldset className="space-y-2">
            {([
              ["1", "בדיקה מרחבית", 'מיקום נקודת ציון / מבנה / גוש וחלקה ביחס לקו גבול בינלאומי או קו תחום איו"ש'],
              ["2", "בדיקת מדידה", 'תצ"ר / תת"ג / תוצר מדידה אחר ביחס לקו הגבול'],
              ["3", "אחר", "פנייה אחרת בנושא גבולות בינלאומיים"]
            ] as [ServiceType, string, string][]).map(([val, title, sub]) => (
              <label key={val} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${serviceType === val ? "border-secondary bg-secondary/5 ring-1 ring-secondary" : "border-outline-variant hover:border-secondary"}`}>
                <input type="radio" name="serviceType" className="mt-1" checked={serviceType === val} onChange={() => { setServiceType(val); setPlaceMethod(""); }} />
                <span><span className="block font-semibold text-primary text-sm">{title}</span><span className="block text-xs text-on-surface-variant mt-0.5">{sub}</span></span>
              </label>
            ))}
          </fieldset>
          {err("serviceType")}
        </section>

        {/* Section B — inquiry details (conditional) */}
        {serviceType && (
          <section className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-7">
            <h3 className="text-lg font-extrabold text-primary mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-secondary text-white text-sm font-bold flex items-center justify-center">2</span>
              פירוט הפנייה
            </h3>

            {showPlace && (
              <div className="mb-5">
                <label className={labelCls}>פרטי המקום עבורו נדרש השירות <span className="text-error-red">*</span></label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {([
                    ["1", 'קובץ GIS (ממ"ג)'], ["2", "ציון גוש וחלקה"], ["3", "ציון גוש שומה"], ["4", "ציון קואורדינטות"]
                  ] as [PlaceMethod, string][]).map(([val, label]) => (
                    <label key={val} className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-sm transition-all ${placeMethod === val ? "border-secondary bg-secondary/5 ring-1 ring-secondary" : "border-outline-variant hover:border-secondary"}`}>
                      <input type="radio" name="placeMethod" checked={placeMethod === val} onChange={() => setPlaceMethod(val)} />
                      {label}
                    </label>
                  ))}
                </div>
                {err("placeMethod")}
              </div>
            )}

            {showCoords && (
              <div className="mb-5 bg-surface-container/40 rounded-2xl p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls} htmlFor="coordY">Y <span className="text-error-red">*</span></label>
                    <input id="coordY" dir="ltr" inputMode="numeric" value={y} onChange={(e) => setY(e.target.value)} className={inputCls} placeholder="350000–810000" />
                    {err("y")}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="coordX">X <span className="text-error-red">*</span></label>
                    <input id="coordX" dir="ltr" inputMode="numeric" value={x} onChange={(e) => setX(e.target.value)} className={inputCls} placeholder="115000–3000000" />
                    {err("x")}
                  </div>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-2">קואורדינטות ברשת ישראל התקפה בלבד. ניתן להיעזר ב־
                  <a href="https://www.govmap.gov.il" target="_blank" rel="noopener noreferrer" className="text-secondary underline">שרת המפות הממשלתי (govmap)</a>.
                </p>
              </div>
            )}

            {showBlock && (
              <div className="mb-5 grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls} htmlFor="block">מספר גוש <span className="text-error-red">*</span></label>
                  <input id="block" dir="ltr" maxLength={12} value={block} onChange={(e) => setBlock(e.target.value)} className={inputCls} />
                  {err("block")}
                </div>
                <div>
                  <label className={labelCls} htmlFor="parcel">מספר חלקה <span className="text-error-red">*</span></label>
                  <input id="parcel" dir="ltr" inputMode="numeric" maxLength={16} value={parcel} onChange={(e) => setParcel(e.target.value)} className={inputCls} />
                  {err("parcel")}
                </div>
              </div>
            )}

            {showGisAttach && (
              <div className="mb-5">
                <label className={labelCls}>
                  צירוף קובץ GIS {serviceType === "3" ? "(לא חובה אך רצוי)" : <span className="text-error-red">*</span>}
                </label>
                <FilePick value={gisFile} onPick={setGisFile} allowed={GIS_EXTENSIONS} hint="SHP · DWG · TIFF · KML · KMZ · ZIP · RAR" />
                {err("gisFile")}
              </div>
            )}

            {showMeasure && (
              <div className="mb-5">
                <label className={labelCls}>מפת מדידה <span className="text-error-red">*</span></label>
                <FilePick value={measureFile} onPick={setMeasureFile} allowed={MEASUREMENT_EXTENSIONS} hint="PDF · JPEG · PNG · TIFF · SHP" />
                {err("measureFile")}
              </div>
            )}

            <div>
              <label className={labelCls} htmlFor="detail">פירוט הפנייה <span className="text-error-red">*</span></label>
              <textarea id="detail" rows={5} maxLength={2000} value={detail} onChange={(e) => setDetail(e.target.value)} className={`${inputCls} resize-none`} placeholder="נא לפרט את הבקשה (לפחות 20 תווים)…" />
              <div className="flex justify-between"><span>{err("detail")}</span><span className="text-[11px] text-on-surface-variant mt-1">{detail.trim().length}/2000</span></div>
            </div>
          </section>
        )}

        {/* Section C — applicant */}
        {serviceType && (
          <section className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-7">
            <h3 className="text-lg font-extrabold text-primary mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-secondary text-white text-sm font-bold flex items-center justify-center">3</span>
              פרטי הפונה
            </h3>
            <div className="mb-4">
              <label className={labelCls}>סוג הלקוח <span className="text-error-red">*</span></label>
              <div className="grid grid-cols-2 gap-2">
                {([["1", "לקוח פרטי"], ["2", "לקוח עסקי"]] as [CustomerType, string][]).map(([val, label]) => (
                  <label key={val} className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer text-sm transition-all ${customerType === val ? "border-secondary bg-secondary/5 ring-1 ring-secondary" : "border-outline-variant hover:border-secondary"}`}>
                    <input type="radio" name="customerType" checked={customerType === val} onChange={() => setCustomerType(val)} />
                    {label}
                  </label>
                ))}
              </div>
              {err("customerType")}
            </div>

            {customerType === "1" && (
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div><label className={labelCls} htmlFor="fn">שם פרטי <span className="text-error-red">*</span></label><input id="fn" minLength={2} maxLength={25} value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} />{err("firstName")}</div>
                <div><label className={labelCls} htmlFor="ln">שם משפחה <span className="text-error-red">*</span></label><input id="ln" minLength={2} maxLength={25} value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} />{err("lastName")}</div>
                <div className="sm:col-span-2"><label className={labelCls} htmlFor="id">מספר זהות (כולל ספרת ביקורת) <span className="text-error-red">*</span></label><input id="id" dir="ltr" inputMode="numeric" maxLength={9} value={idNum} onChange={(e) => setIdNum(e.target.value)} className={inputCls} />{err("idNum")}</div>
              </div>
            )}
            {customerType === "2" && (
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div><label className={labelCls} htmlFor="co">שם החברה <span className="text-error-red">*</span></label><input id="co" maxLength={50} value={company} onChange={(e) => setCompany(e.target.value)} className={inputCls} />{err("company")}</div>
                <div><label className={labelCls} htmlFor="con">מספר ח.פ <span className="text-error-red">*</span></label><input id="con" dir="ltr" inputMode="numeric" maxLength={9} value={companyNum} onChange={(e) => setCompanyNum(e.target.value)} className={inputCls} />{err("companyNum")}</div>
              </div>
            )}

            {customerType && (
              <div className="grid sm:grid-cols-2 gap-3">
                <div><label className={labelCls} htmlFor="em">דואר אלקטרוני <span className="text-error-red">*</span></label><input id="em" dir="ltr" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />{err("email")}</div>
                <div><label className={labelCls} htmlFor="ph">טלפון <span className="text-error-red">*</span></label><input id="ph" dir="ltr" inputMode="tel" maxLength={11} value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />{err("phone")}</div>
              </div>
            )}
          </section>
        )}
      </div>

      {/* Summary / fees / submit */}
      <aside className="lg:col-span-1">
        <div className="bg-gradient-to-br from-primary to-tertiary text-white rounded-3xl p-6 sticky top-44">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined">receipt_long</span>מחירון האגרות</h3>
          <dl className="space-y-2 mb-4">
            {FEES.map((f) => (
              <div key={f.label} className="flex justify-between gap-3 text-sm border-b border-white/15 pb-1.5">
                <dt className="text-white/75">{f.label}</dt><dd className="font-bold whitespace-nowrap">{f.amount}</dd>
              </div>
            ))}
          </dl>
          <p className="text-[11px] text-white/70 mb-5 leading-relaxed">הסכום הסופי נקבע בהצעת מחיר שישלח אגף הגבולות לאחר בדיקת הפנייה. התשלום מתבצע בשלב מאוחר יותר בתהליך.</p>
          {showErrors && !isValid && <p className="text-xs bg-white/15 rounded-lg px-3 py-2 mb-3">יש להשלים את שדות החובה המסומנים.</p>}
          <button type="button" onClick={submit} className="shine shine-glow w-full bg-secondary hover:bg-secondary/90 text-white px-5 py-3.5 rounded-full font-bold flex items-center justify-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-[20px]">send</span>שליחת הפנייה
          </button>
          <p className="text-[11px] text-white/60 text-center mt-3">תהליך דו-שלבי בין הפונה למשרד · עד 4 ימי עסקים</p>
        </div>
      </aside>
    </div>
  );
}

// File picker with client-side gatekeeping on type and size.
// The POC does NOT transmit file content — only the chosen name is recorded.
// Production must additionally run CDR/Sandbox sanitisation server-side before
// storing or forwarding any file (see docs/SECURE_DEVELOPMENT.md, gap G-03).
function FilePick({ value, onPick, allowed, hint }: { value: string; onPick: (name: string) => void; allowed: string[]; hint: string }) {
  const [fileErr, setFileErr] = useState("");
  const handle = (f: File | undefined) => {
    if (!f) { onPick(""); setFileErr(""); return; }
    const problem = validateAttachment(f, allowed);
    if (problem) { setFileErr(problem); onPick(""); return; }
    setFileErr(""); onPick(f.name);
  };
  return (
    <div>
      <label className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-outline-variant hover:border-secondary cursor-pointer transition-colors bg-surface-container/40">
        <span className="material-symbols-outlined text-secondary" aria-hidden="true">attach_file</span>
        <span className="text-sm text-on-surface-variant flex-1">{value || "בחירת קובץ לצירוף…"}</span>
        <input type="file" accept={allowed.join(",")} className="sr-only" onChange={(e) => handle(e.target.files?.[0])} />
      </label>
      <p className="text-[11px] text-on-surface-variant mt-1">סוגי קבצים: {hint} · עד {ATTACHMENT_MAX_MB}MB</p>
      {fileErr && <p className="text-[11px] text-error-red mt-1">{fileErr}</p>}
      <p className="text-[11px] text-on-surface-variant/80 mt-1">
        בשלב ה-POC הקובץ אינו נשלח — נשמר שם הקובץ בלבד. בייצור תתבצע סריקה והלבנה (CDR) בצד השרת.
      </p>
    </div>
  );
}

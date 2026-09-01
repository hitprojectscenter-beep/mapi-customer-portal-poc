"use client";

// In-portal order UI for the historic-maps service. Historic maps are ordered via
// a dedicated channel (HistoricalMaps@mapi.gov.il) that is NOT covered by the two
// modern spec sheets, so this form keeps the historic-specific logic (period,
// scanned/printed format, GovMap area marking) but is brought to full parity with
// the paper-maps order flow: a multi-row product table (several maps in one
// order) and the full delivery block (apartment / PO box / required zip). All
// values are grounded in the portal's own historic-maps service data.

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Service } from "@/lib/data";
import GovMapEmbed from "@/components/GovMapEmbed";

type CustomerType = "1" | "2" | "3"; // private / business / government

const FORMATS = [
  { code: "scan", label: "סרוק (עותק דיגיטלי)", price: 120, digital: true },
  { code: "a3", label: "הדפסת איכות A3", price: 160, digital: false },
  { code: "a2", label: "הדפסת איכות A2", price: 210, digital: false },
  { code: "a1", label: "הדפסת איכות A1", price: 280, digital: false }
];
const PERIODS = [
  "עות'מאני / טרום-1918", "המנדט הבריטי (1918–1948)",
  "המדינה הצעירה (1948–1967)", "מ-1967 ועד היום"
];

const fmtOf = (code: string) => FORMATS.find((f) => f.code === code);
const digits9 = (v: string) => /^\d{9}$/.test(v.trim());
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

interface Item { id: number; period: string; desc: string; format: string; quantity: number; }
let nextId = 1;
const blankItem = (): Item => ({ id: nextId++, period: "", desc: "", format: "", quantity: 1 });

export default function HistoricMapsOrderForm({ service }: { service: Service }) {
  const [customerType, setCustomerType] = useState<CustomerType | "">("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNum, setIdNum] = useState("");
  const [company, setCompany] = useState("");
  const [companyNum, setCompanyNum] = useState("");
  const [govOffice, setGovOffice] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [items, setItems] = useState<Item[]>([blankItem()]);
  const [area, setArea] = useState<{ itmX: number; itmY: number; vertices: number; sqkm: number } | null>(null);

  const [shipping, setShipping] = useState<"pickup" | "registered" | "express">("pickup");
  const [dCity, setDCity] = useState("");
  const [dStreet, setDStreet] = useState("");
  const [dHouse, setDHouse] = useState("");
  const [dApt, setDApt] = useState("");
  const [dZip, setDZip] = useState("");
  const [dPobox, setDPobox] = useState("");
  const [remarks, setRemarks] = useState("");

  const [showErrors, setShowErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ref, setRef] = useState("");

  const patchItem = (id: number, patch: Partial<Item>) =>
    setItems((arr) => arr.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  const lineTotal = (it: Item) => (fmtOf(it.format)?.price || 0) * Math.max(0, it.quantity || 0);
  const subtotal = items.reduce((s, it) => s + lineTotal(it), 0);
  // Any printed item requires physical delivery; an all-scanned order is digital.
  const hasPhysical = items.some((it) => { const f = fmtOf(it.format); return f && !f.digital; });
  const shippingCost = hasPhysical && shipping !== "pickup" ? (shipping === "registered" ? 39 : 80) : 0;
  const total = subtotal + shippingCost;

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!customerType) e.customerType = "יש לבחור סוג לקוח.";
    if (customerType === "1") {
      if (!firstName.trim()) e.firstName = "שדה חובה.";
      if (!lastName.trim()) e.lastName = "שדה חובה.";
      if (!digits9(idNum)) e.idNum = "מספר זהות בן 9 ספרות.";
    }
    if (customerType === "2") {
      if (!company.trim()) e.company = "שדה חובה.";
      if (!digits9(companyNum)) e.companyNum = "מספר ח.פ בן 9 ספרות.";
    }
    if (customerType === "3" && !govOffice.trim()) e.govOffice = "שדה חובה.";
    if (!emailOk(email)) e.email = "כתובת דוא\"ל לא תקינה.";
    if (!phone.trim()) e.phone = "שדה חובה.";

    items.forEach((it) => {
      if (!it.period) e[`item_${it.id}`] = "יש לבחור תקופה.";
      else if (!it.format) e[`item_${it.id}`] = "יש לבחור פורמט.";
      else if (!it.quantity || it.quantity < 1) e[`item_${it.id}`] = "כמות חייבת להיות לפחות 1.";
      else if (it.desc.trim().length < 5 && !area) e[`item_${it.id}`] = "יש לתאר את המפה, או לסמן אזור על המפה.";
    });

    if (hasPhysical && shipping !== "pickup") {
      if (!dCity.trim()) e.dCity = "שדה חובה.";
      if (!dStreet.trim()) e.dStreet = "שדה חובה.";
      if (!dHouse.trim()) e.dHouse = "שדה חובה.";
      if (!/^\d{7}$/.test(dZip.trim())) e.dZip = "מיקוד בן 7 ספרות.";
    }
    return e;
  }, [customerType, firstName, lastName, idNum, company, companyNum, govOffice, email, phone, items, area, hasPhysical, shipping, dCity, dStreet, dHouse, dZip]);

  const isValid = Object.keys(errors).length === 0;

  const submit = async () => {
    if (!isValid) { setShowErrors(true); return; }
    const reference = `HMAP-${Date.now().toString(36).toUpperCase()}`;
    setRef(reference);
    try {
      await fetch("/api/orders", {
        method: "POST", headers: { "Content-Type": "application/json" }, keepalive: true,
        body: JSON.stringify({
          orderId: reference, serviceName: "הזמנת מפות היסטוריות", slug: service.slug, total,
          routeDetails: items.map((it) => `${it.period} · ${fmtOf(it.format)?.label} ×${it.quantity}${it.desc ? ` · ${it.desc}` : ""}`).join(" | ") + (area ? ` · אזור מסומן ITM ${area.itmX},${area.itmY}` : ""),
          delivery: !hasPhysical ? "עותק דיגיטלי" : shipping === "pickup" ? "איסוף עצמי" : shipping === "registered" ? "דואר רשום" : "דואר מהיר"
        })
      }).catch(() => {});
    } catch { /* demo/offline */ }
    setSubmitted(true);
  };

  const err = (k: string) => showErrors && errors[k] ? <p className="text-[11px] text-error-red mt-1">{errors[k]}</p> : null;
  const inputCls = "w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 min-h-[48px] focus:ring-2 focus:ring-secondary focus:outline-none";
  const labelCls = "block text-sm font-semibold text-primary mb-1.5";

  if (submitted) {
    return (
      <div dir="rtl" className="max-w-2xl mx-auto bg-white rounded-3xl border border-outline-variant/50 p-8 md:p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-positive-green/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-[52px] text-positive-green" aria-hidden="true">history_edu</span>
        </div>
        <h2 className="text-2xl font-extrabold text-primary mb-2">בקשת המפות ההיסטוריות התקבלה</h2>
        <p className="text-on-surface-variant mb-1">מספר סימוכין: <span className="font-mono font-bold text-primary" dir="ltr">{ref}</span></p>
        <p className="text-2xl font-black text-primary my-3">סה"כ לתשלום: ₪{total.toLocaleString()}</p>
        <p className="text-sm text-on-surface-variant mb-6">אישור נשלח לכתובת <span className="font-semibold">{email}</span>.</p>
        <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-5 text-right mb-6">
          <p className="text-sm font-bold text-primary mb-2">מה קורה עכשיו?</p>
          <ol className="text-sm text-on-surface-variant space-y-1.5 list-decimal pr-5">
            <li>הארכיון מאתר את המפות ומאמת זמינות.</li>
            {hasPhysical
              ? <li>לאחר התשלום — הפריטים המודפסים נשלחים/נמסרים לאיסוף; פריטים סרוקים נשלחים בקישור מאובטח לדוא"ל.</li>
              : <li>לאחר התשלום — העותקים הסרוקים נשלחים בקישור מאובטח לדוא"ל.</li>}
            <li>זמן טיפול: 7–14 ימי עסקים (סרוק מהיר יותר ממודפס).</li>
          </ol>
        </div>
        <Link href={`/catalog/${service.slug}`} className="text-secondary hover:text-primary underline text-sm">חזרה לעמוד השירות</Link>
      </div>
    );
  }

  return (
    <div dir="rtl" className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Section 1 — applicant */}
        <section className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-7">
          <h3 className="text-lg font-extrabold text-primary mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-secondary text-white text-sm font-bold flex items-center justify-center">1</span>
            פרטי המבקש
          </h3>
          <div className="mb-4">
            <label className={labelCls}>סוג הלקוח <span className="text-error-red">*</span></label>
            <div className="grid grid-cols-3 gap-2">
              {([["1", "פרטי"], ["2", "עסקי"], ["3", "מוסדי / ממשלתי"]] as [CustomerType, string][]).map(([val, label]) => (
                <label key={val} className={`flex items-center justify-center text-center gap-1.5 p-2.5 rounded-xl border cursor-pointer text-sm transition-all ${customerType === val ? "border-secondary bg-secondary/5 ring-1 ring-secondary" : "border-outline-variant hover:border-secondary"}`}>
                  <input type="radio" name="ct" checked={customerType === val} onChange={() => setCustomerType(val)} />{label}
                </label>
              ))}
            </div>
            {err("customerType")}
          </div>
          {customerType === "1" && (
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div><label className={labelCls} htmlFor="fn">שם פרטי <span className="text-error-red">*</span></label><input id="fn" maxLength={25} value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} />{err("firstName")}</div>
              <div><label className={labelCls} htmlFor="ln">שם משפחה <span className="text-error-red">*</span></label><input id="ln" maxLength={25} value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} />{err("lastName")}</div>
              <div className="sm:col-span-2"><label className={labelCls} htmlFor="id">מספר זהות <span className="text-error-red">*</span></label><input id="id" dir="ltr" inputMode="numeric" maxLength={9} value={idNum} onChange={(e) => setIdNum(e.target.value)} className={inputCls} />{err("idNum")}</div>
            </div>
          )}
          {customerType === "2" && (
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div><label className={labelCls} htmlFor="co">שם החברה <span className="text-error-red">*</span></label><input id="co" maxLength={50} value={company} onChange={(e) => setCompany(e.target.value)} className={inputCls} />{err("company")}</div>
              <div><label className={labelCls} htmlFor="con">מספר ח.פ <span className="text-error-red">*</span></label><input id="con" dir="ltr" inputMode="numeric" maxLength={9} value={companyNum} onChange={(e) => setCompanyNum(e.target.value)} className={inputCls} />{err("companyNum")}</div>
            </div>
          )}
          {customerType === "3" && (
            <div className="mb-4">
              <label className={labelCls} htmlFor="gov">שם המוסד / הרשות <span className="text-error-red">*</span></label>
              <input id="gov" maxLength={50} value={govOffice} onChange={(e) => setGovOffice(e.target.value)} className={inputCls} />{err("govOffice")}
            </div>
          )}
          {customerType && (
            <div className="grid sm:grid-cols-2 gap-3">
              <div><label className={labelCls} htmlFor="em">דואר אלקטרוני <span className="text-error-red">*</span></label><input id="em" dir="ltr" type="email" maxLength={50} value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />{err("email")}</div>
              <div><label className={labelCls} htmlFor="ph">טלפון <span className="text-error-red">*</span></label><input id="ph" dir="ltr" inputMode="tel" maxLength={11} value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />{err("phone")}</div>
            </div>
          )}
        </section>

        {/* Section 2 — requested maps (product table) */}
        <section className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-7">
          <h3 className="text-lg font-extrabold text-primary mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-secondary text-white text-sm font-bold flex items-center justify-center">2</span>
            המפות המבוקשות
          </h3>
          <div className="space-y-4">
            {items.map((it, idx) => (
              <div key={it.id} className="rounded-2xl border border-outline-variant/70 p-4 bg-surface-container/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-secondary">מפה {idx + 1}</span>
                  {items.length > 1 && (
                    <button type="button" onClick={() => setItems((a) => a.filter((x) => x.id !== it.id))} className="text-error-red text-xs flex items-center gap-1 hover:underline">
                      <span className="material-symbols-outlined text-[16px]">delete</span>הסרה
                    </button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>תקופה היסטורית <span className="text-error-red">*</span></label>
                    <select value={it.period} onChange={(e) => patchItem(it.id, { period: e.target.value })} className={inputCls}>
                      <option value="">בחירה…</option>
                      {PERIODS.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="w-28">
                    <label className={labelCls}>כמות <span className="text-error-red">*</span></label>
                    <input type="number" min={1} value={it.quantity} onChange={(e) => patchItem(it.id, { quantity: Math.max(1, Number(e.target.value) || 1) })} className={inputCls} />
                  </div>
                </div>
                <div className="mt-3">
                  <label className={labelCls}>אזור / תיאור המפה המבוקשת</label>
                  <textarea rows={2} value={it.desc} onChange={(e) => patchItem(it.id, { desc: e.target.value })} className={`${inputCls} resize-none`} placeholder="לדוגמה: יפו והמושבה הגרמנית, גיליון מנדטורי; או ניתן לסמן אזור על המפה למטה." />
                </div>
                <div className="mt-3">
                  <label className={labelCls}>פורמט <span className="text-error-red">*</span></label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {FORMATS.map((f) => (
                      <label key={f.code} className={`flex items-center justify-between gap-2 p-2.5 rounded-xl border cursor-pointer text-sm transition-all ${it.format === f.code ? "border-secondary bg-secondary/5 ring-1 ring-secondary" : "border-outline-variant hover:border-secondary"}`}>
                        <span className="flex items-center gap-2">
                          <input type="radio" name={`fmt_${it.id}`} checked={it.format === f.code} onChange={() => patchItem(it.id, { format: f.code })} />
                          {f.label}
                        </span>
                        <span className="font-bold text-primary whitespace-nowrap">₪{f.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mt-3 text-left text-sm font-bold text-primary">₪{lineTotal(it).toLocaleString()}</div>
                {err(`item_${it.id}`)}
              </div>
            ))}
          </div>
          {items.length < 50 && (
            <button type="button" onClick={() => setItems((a) => [...a, blankItem()])} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>הוספת מפה
            </button>
          )}

          <div className="mt-5">
            <label className={labelCls}>סימון אזור על המפה (GovMap) — אופציונלי, לכלל ההזמנה</label>
            <GovMapEmbed
              mode="topo"
              allowDraw
              height="360px"
              onAreaSelected={(a) => setArea({ itmX: a.itmX, itmY: a.itmY, vertices: a.vertices, sqkm: a.sqkm })}
            />
            {area && (
              <p className="text-xs text-positive-green font-semibold mt-2">
                ✓ אזור סומן — מרכז (רשת ישראל ITM): <span dir="ltr" className="font-mono">{area.itmX.toLocaleString()}, {area.itmY.toLocaleString()}</span> · {area.vertices} קודקודים
              </p>
            )}
          </div>
        </section>

        {/* Section 3 — delivery */}
        <section className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-7">
          <h3 className="text-lg font-extrabold text-primary mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-secondary text-white text-sm font-bold flex items-center justify-center">3</span>
            אספקה
          </h3>
          {!hasPhysical ? (
            <p className="text-sm text-on-surface-variant bg-surface-container/50 rounded-xl px-3 py-3 leading-relaxed flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">cloud_download</span>
              ההזמנה כולה בפורמט סרוק — תישלח בקישור מאובטח לדוא"ל שהוזן, ללא עלות משלוח. (בחירת פורמט הדפסה באחת המפות תפתח אפשרויות משלוח.)
            </p>
          ) : (
            <>
              <div className="grid sm:grid-cols-3 gap-2 mb-3">
                {([["pickup", "איסוף עצמי", "0 ₪", "storefront"], ["registered", "דואר רשום", "39 ₪", "local_shipping"], ["express", "דואר מהיר", "80 ₪", "bolt"]] as [typeof shipping, string, string, string][]).map(([val, label, cost, icon]) => (
                  <label key={val} className={`flex flex-col items-center text-center gap-0.5 p-3 rounded-xl border cursor-pointer transition-all ${shipping === val ? "border-secondary bg-secondary/5 ring-1 ring-secondary" : "border-outline-variant hover:border-secondary"}`}>
                    <input type="radio" name="ship" className="sr-only" checked={shipping === val} onChange={() => setShipping(val)} />
                    <span className="material-symbols-outlined text-secondary">{icon}</span>
                    <span className="text-sm font-semibold">{label}</span>
                    <span className="text-[11px] text-on-surface-variant">{cost}</span>
                  </label>
                ))}
              </div>
              {shipping !== "pickup" && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><label className={labelCls} htmlFor="dc">יישוב <span className="text-error-red">*</span></label><input id="dc" value={dCity} onChange={(e) => setDCity(e.target.value)} className={inputCls} />{err("dCity")}</div>
                  <div><label className={labelCls} htmlFor="ds">רחוב <span className="text-error-red">*</span></label><input id="ds" value={dStreet} onChange={(e) => setDStreet(e.target.value)} className={inputCls} />{err("dStreet")}</div>
                  <div><label className={labelCls} htmlFor="dh">מספר בית <span className="text-error-red">*</span></label><input id="dh" dir="ltr" maxLength={4} value={dHouse} onChange={(e) => setDHouse(e.target.value)} className={inputCls} />{err("dHouse")}</div>
                  <div><label className={labelCls} htmlFor="dapt">מספר דירה</label><input id="dapt" dir="ltr" maxLength={4} value={dApt} onChange={(e) => setDApt(e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls} htmlFor="dz">מיקוד <span className="text-error-red">*</span></label><input id="dz" dir="ltr" inputMode="numeric" maxLength={7} value={dZip} onChange={(e) => setDZip(e.target.value)} className={inputCls} />{err("dZip")}</div>
                  <div><label className={labelCls} htmlFor="dpo">תא דואר</label><input id="dpo" dir="ltr" inputMode="numeric" maxLength={5} value={dPobox} onChange={(e) => setDPobox(e.target.value)} className={inputCls} /></div>
                </div>
              )}
            </>
          )}
          <div className="mt-3">
            <label className={labelCls} htmlFor="rem">הערות ובקשות נוספות</label>
            <textarea id="rem" rows={2} maxLength={2000} value={remarks} onChange={(e) => setRemarks(e.target.value)} className={`${inputCls} resize-none`} />
          </div>
        </section>
      </div>

      {/* Running total / submit */}
      <aside className="lg:col-span-1">
        <div className="bg-gradient-to-br from-primary to-tertiary text-white rounded-3xl p-6 sticky top-44">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined">history_edu</span>סיכום ההזמנה</h3>
          <div className="space-y-2 mb-3">
            {items.filter((it) => fmtOf(it.format)).map((it, i) => (
              <div key={it.id} className="flex justify-between gap-2 text-sm border-b border-white/15 pb-1.5">
                <span className="text-white/80">מפה {i + 1}: {fmtOf(it.format)!.label} ×{it.quantity}</span>
                <span className="font-bold whitespace-nowrap">₪{lineTotal(it).toLocaleString()}</span>
              </div>
            ))}
            {subtotal === 0 && <p className="text-sm text-white/60">טרם נבחר פורמט למפות.</p>}
          </div>
          <div className="flex justify-between text-sm text-white/80 mb-1"><span>משלוח</span><span>₪{shippingCost}</span></div>
          <div className="flex justify-between items-baseline border-t border-white/20 pt-3 mb-5">
            <span className="text-sm font-bold">סה"כ לתשלום</span>
            <span className="text-3xl font-black text-secondary-container">₪{total.toLocaleString()}</span>
          </div>
          {showErrors && !isValid && <p className="text-xs bg-white/15 rounded-lg px-3 py-2 mb-3">יש להשלים את שדות החובה המסומנים.</p>}
          <button type="button" onClick={submit} className="shine shine-glow w-full bg-secondary hover:bg-secondary/90 text-white px-5 py-3.5 rounded-full font-bold flex items-center justify-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-[20px]">payments</span>מעבר לתשלום
          </button>
          <p className="text-[11px] text-white/60 text-center mt-3">כולל מע"מ · טיפול 7–14 ימי עסקים</p>
        </div>
      </aside>
    </div>
  );
}

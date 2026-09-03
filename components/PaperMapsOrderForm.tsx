"use client";

// In-portal order UI for the paper-maps route, implementing the citizen-facing
// conditional logic of the official form Maps@mapi.gov.il (V7): customer type
// (private / business / authorized distributor with distributor pricing), a
// multi-row product table with category→product filtering, topographic-map
// selection by sheet-index or city name, the language matrix, lamination tiers
// (+22/+55), per-item price = (unit + lamination) × quantity, and delivery
// (self-pickup / registered / express post) with the running total.
//
// The catalog/price/sheet/city/distributor values below are representative demo
// data — in production they come from the MAPI list systems (PriceListOfPaperMaps,
// ListOfMaps25/50, City_MAPI, ListOfPaperMapDistributors).

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Service } from "@/lib/data";
import {
  SHEETS_25, SHEETS_50, CITIES, cityScale, DISTRIBUTORS,
  SHIPPING_OPTIONS, shippingPrice, type ShippingCode
} from "@/lib/mapiLists";

type CustomerType = "1" | "2" | "3"; // private / business / distributor
type MapKind = "topo25" | "topo50" | "city" | "plain";

interface Product {
  code: string; name: string; price: number; distributorPrice: number;
  kind: MapKind; lamination: number | null; languages: string[];
}
interface CategoryDef { code: string; name: string; products: Product[]; }

const CATALOG: CategoryDef[] = [
  { code: "topo", name: "מפות טופוגרפיות", products: [
    { code: "t25", name: "מפה טופוגרפית 1:25,000", price: 130, distributorPrice: 95, kind: "topo25", lamination: 22, languages: ["עברית", "אנגלית"] },
    { code: "t50", name: "מפה טופוגרפית 1:50,000", price: 90, distributorPrice: 66, kind: "topo50", lamination: 22, languages: ["עברית", "אנגלית"] }
  ] },
  { code: "city", name: "מפות ערים ויישובים", products: [
    { code: "cty", name: "מפת עיר / יישוב", price: 75, distributorPrice: 55, kind: "city", lamination: 22, languages: ["עברית", "ערבית", "אנגלית"] }
  ] },
  { code: "tour", name: "מפות תיור וטיול", products: [
    { code: "t250", name: "מפת תיור 1:250,000", price: 70, distributorPrice: 52, kind: "plain", lamination: 22, languages: ["עברית", "אנגלית"] },
    { code: "t450", name: "מפת תיור 1:450,000", price: 90, distributorPrice: 66, kind: "plain", lamination: 22, languages: ["עברית", "אנגלית"] },
    { code: "trail", name: "מפת שבילים", price: 120, distributorPrice: 88, kind: "plain", lamination: 22, languages: ["עברית"] }
  ] },
  { code: "marine", name: "מפות ימיות", products: [
    { code: "mar", name: "מפה ימית", price: 140, distributorPrice: 105, kind: "plain", lamination: 55, languages: ["עברית", "אנגלית"] }
  ] },
  { code: "edu", name: "חינוך ופוסטרים", products: [
    { code: "stud", name: "מפת ארץ ישראל לתלמיד", price: 30, distributorPrice: 22, kind: "plain", lamination: null, languages: ["עברית"] },
    { code: "emb", name: "פוסטר סמלי המדינה", price: 25, distributorPrice: 18, kind: "plain", lamination: null, languages: ["עברית"] }
  ] }
];

const OFFICES = 'תל אביב-יפו (לינקולן 1) · ירושלים (חשין 1) · באר שבע (התקווה 4) · חיפה (הפלי"ם 15) · נצרת (המלאכה 16)';

interface Item {
  id: number; category: string; product: string;
  by: "sheet" | "city"; sheet: string; city: string; language: string;
  lamination: boolean; quantity: number;
}
let nextId = 1;
const blankItem = (): Item => ({ id: nextId++, category: "", product: "", by: "sheet", sheet: "", city: "", language: "", lamination: false, quantity: 1 });

const digits9 = (v: string) => /^\d{9}$/.test(v.trim());
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function findProduct(cat: string, prod: string): Product | undefined {
  return CATALOG.find((c) => c.code === cat)?.products.find((p) => p.code === prod);
}

export default function PaperMapsOrderForm({ service }: { service: Service }) {
  const [customerType, setCustomerType] = useState<CustomerType | "">("");
  const [distributor, setDistributor] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNum, setIdNum] = useState("");
  const [company, setCompany] = useState("");
  const [companyNum, setCompanyNum] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [items, setItems] = useState<Item[]>([blankItem()]);
  const [shipping, setShipping] = useState<ShippingCode>("pickup");
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

  const isDistributor = customerType === "3";
  const distributorHp = DISTRIBUTORS.find((d) => d.name === distributor)?.hp || "";

  const patchItem = (id: number, patch: Partial<Item>) =>
    setItems((arr) => arr.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  const lineTotal = (it: Item): number => {
    const p = findProduct(it.category, it.product);
    if (!p) return 0;
    const unit = isDistributor ? p.distributorPrice : p.price;
    const lam = it.lamination && p.lamination ? p.lamination : 0;
    return (unit + lam) * Math.max(0, it.quantity || 0);
  };

  const subtotal = items.reduce((s, it) => s + lineTotal(it), 0);
  const shippingCost = shipping === "pickup" ? 0 : shippingPrice(shipping);
  const total = subtotal + shippingCost;

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!customerType) e.customerType = "יש לבחור סוג לקוח.";
    if (isDistributor && !distributor) e.distributor = "יש לבחור מפיץ מהרשימה.";
    if (customerType === "1") {
      if (!firstName.trim()) e.firstName = "שדה חובה.";
      if (!lastName.trim()) e.lastName = "שדה חובה.";
      if (!digits9(idNum)) e.idNum = "מספר זהות בן 9 ספרות.";
    }
    if (customerType === "2") {
      if (!company.trim()) e.company = "שדה חובה.";
      if (!digits9(companyNum)) e.companyNum = "מספר ח.פ בן 9 ספרות.";
    }
    if (!emailOk(email)) e.email = "כתובת דוא\"ל לא תקינה.";
    if (!phone.trim()) e.phone = "שדה חובה.";

    items.forEach((it) => {
      const p = findProduct(it.category, it.product);
      if (!it.category || !it.product) e[`item_${it.id}`] = "יש לבחור קטגוריה ומוצר.";
      else {
        if ((p?.kind === "topo25" || p?.kind === "topo50")) {
          if (it.by === "sheet" && !it.sheet) e[`item_${it.id}`] = "יש לבחור גיליון (מפתח גיליונות).";
          if (it.by === "city" && !it.city) e[`item_${it.id}`] = "יש לבחור יישוב.";
        }
        if (p?.kind === "city" && !it.city) e[`item_${it.id}`] = "יש לבחור יישוב.";
        if ((p?.languages.length || 0) > 1 && !it.language) e[`item_${it.id}`] = "יש לבחור שפת מפה.";
        if (!it.quantity || it.quantity < 1) e[`item_${it.id}`] = "כמות חייבת להיות לפחות 1.";
      }
    });

    if (shipping !== "pickup") {
      if (!dCity.trim()) e.dCity = "שדה חובה.";
      if (!dStreet.trim()) e.dStreet = "שדה חובה.";
      if (!dHouse.trim()) e.dHouse = "שדה חובה.";
      if (!/^\d{7}$/.test(dZip.trim())) e.dZip = "מיקוד בן 7 ספרות.";
    }
    return e;
  }, [customerType, isDistributor, distributor, firstName, lastName, idNum, company, companyNum, email, phone, items, shipping, dCity, dStreet, dHouse, dZip]);

  const isValid = Object.keys(errors).length === 0;

  const submit = async () => {
    if (!isValid) { setShowErrors(true); return; }
    const reference = `MAP-${Date.now().toString(36).toUpperCase()}`;
    setRef(reference);
    try {
      await fetch("/api/orders", {
        method: "POST", headers: { "Content-Type": "application/json" }, keepalive: true,
        body: JSON.stringify({
          orderId: reference, serviceName: "הזמנת מפות נייר", slug: service.slug, total,
          routeDetails: items.map((it) => { const p = findProduct(it.category, it.product); return p ? `${p.name} ×${it.quantity}${it.lamination ? " (מנוילן)" : ""}` : ""; }).filter(Boolean).join(" | "),
          delivery: shipping === "pickup" ? "איסוף עצמי" : shipping === "registered" ? "דואר רשום" : "דואר מהיר"
        })
      }).catch(() => {});
    } catch { /* demo/offline */ }
    setSubmitted(true);
  };

  const err = (k: string) => showErrors && errors[k] ? <p className="text-[11px] text-error-red mt-1">{errors[k]}</p> : null;
  const inputCls = "w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 min-h-[48px] focus:ring-2 focus:ring-secondary focus:outline-none";
  const selCls = inputCls;
  const labelCls = "block text-sm font-semibold text-primary mb-1.5";

  if (submitted) {
    return (
      <div dir="rtl" className="max-w-2xl mx-auto bg-white rounded-3xl border border-outline-variant/50 p-8 md:p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-positive-green/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-[52px] text-positive-green" aria-hidden="true">shopping_bag</span>
        </div>
        <h2 className="text-2xl font-extrabold text-primary mb-2">ההזמנה התקבלה</h2>
        <p className="text-on-surface-variant mb-1">מספר סימוכין: <span className="font-mono font-bold text-primary" dir="ltr">{ref}</span></p>
        <p className="text-2xl font-black text-primary my-3">סה"כ לתשלום: ₪{total.toLocaleString()}</p>
        <p className="text-sm text-on-surface-variant mb-6">אישור נשלח לכתובת <span className="font-semibold">{email}</span>.</p>
        <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-5 text-right mb-6">
          <p className="text-sm font-bold text-primary mb-2">מה קורה עכשיו?</p>
          <ul className="text-sm text-on-surface-variant space-y-1.5 list-disc pr-5">
            {shipping === "pickup"
              ? <li>איסוף עצמי — ההזמנה מטופלת תוך 4 ימי עסקים; תישלח הודעה כשתהיה מוכנה לאיסוף.</li>
              : <li>משלוח — המפות מוכנות תוך 4 ימי עסקים ונמסרות לדואר ישראל.</li>}
            <li>המחיר כולל מע"מ. תוספת מנוילן (22/55 ₪) חושבה לפריטים שסומנו.</li>
          </ul>
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
              {([["1", "לקוח פרטי"], ["2", "לקוח עסקי"], ["3", "מפיץ מורשה"]] as [CustomerType, string][]).map(([val, label]) => (
                <label key={val} className={`flex items-center justify-center text-center gap-1.5 p-2.5 rounded-xl border cursor-pointer text-sm transition-all ${customerType === val ? "border-secondary bg-secondary/5 ring-1 ring-secondary" : "border-outline-variant hover:border-secondary"}`}>
                  <input type="radio" name="ct" checked={customerType === val} onChange={() => setCustomerType(val)} />{label}
                </label>
              ))}
            </div>
            {err("customerType")}
          </div>

          {isDistributor && (
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className={labelCls} htmlFor="dist">שם המפיץ <span className="text-error-red">*</span></label>
                <select id="dist" value={distributor} onChange={(e) => setDistributor(e.target.value)} className={selCls}>
                  <option value="">בחירה…</option>
                  {DISTRIBUTORS.map((d) => <option key={d.hp} value={d.name}>{d.name}</option>)}
                </select>
                {err("distributor")}
              </div>
              <div>
                <label className={labelCls}>מספר ח.פ</label>
                <input dir="ltr" value={distributorHp} readOnly className={`${inputCls} bg-surface-container/60 text-on-surface-variant`} placeholder="ימולא אוטומטית" />
              </div>
            </div>
          )}
          {customerType === "1" && (
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div><label className={labelCls} htmlFor="fn">שם פרטי <span className="text-error-red">*</span></label><input id="fn" minLength={2} maxLength={25} value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} />{err("firstName")}</div>
              <div><label className={labelCls} htmlFor="ln">שם משפחה <span className="text-error-red">*</span></label><input id="ln" minLength={2} maxLength={25} value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} />{err("lastName")}</div>
              <div className="sm:col-span-2"><label className={labelCls} htmlFor="id">מספר זהות <span className="text-error-red">*</span></label><input id="id" dir="ltr" inputMode="numeric" maxLength={9} value={idNum} onChange={(e) => setIdNum(e.target.value)} className={inputCls} />{err("idNum")}</div>
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

        {/* Section 2 — products */}
        <section className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-7">
          <h3 className="text-lg font-extrabold text-primary mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-secondary text-white text-sm font-bold flex items-center justify-center">2</span>
            בחירת מוצרים
          </h3>
          <div className="space-y-4">
            {items.map((it, idx) => {
              const cat = CATALOG.find((c) => c.code === it.category);
              const p = findProduct(it.category, it.product);
              const isTopo = p?.kind === "topo25" || p?.kind === "topo50";
              return (
                <div key={it.id} className="rounded-2xl border border-outline-variant/70 p-4 bg-surface-container/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-secondary">מוצר {idx + 1}</span>
                    {items.length > 1 && (
                      <button type="button" onClick={() => setItems((a) => a.filter((x) => x.id !== it.id))} className="text-error-red text-xs flex items-center gap-1 hover:underline">
                        <span className="material-symbols-outlined text-[16px]">delete</span>הסרה
                      </button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>קטגוריה <span className="text-error-red">*</span></label>
                      <select value={it.category} onChange={(e) => patchItem(it.id, { category: e.target.value, product: "", sheet: "", city: "", language: "", lamination: false })} className={selCls}>
                        <option value="">בחירה…</option>
                        {CATALOG.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>מוצר <span className="text-error-red">*</span></label>
                      <select value={it.product} disabled={!cat} onChange={(e) => patchItem(it.id, { product: e.target.value, sheet: "", city: "", language: "", lamination: false })} className={`${selCls} disabled:opacity-50`}>
                        <option value="">{cat ? "בחירה…" : "בחרו קטגוריה"}</option>
                        {cat?.products.map((pr) => <option key={pr.code} value={pr.code}>{pr.name} — ₪{isDistributor ? pr.distributorPrice : pr.price}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Topographic: choose by sheet-index or city name */}
                  {isTopo && (
                    <div className="mt-3">
                      <div className="flex gap-2 mb-2">
                        {([["sheet", "לפי מפתח גיליונות"], ["city", "לפי שם היישוב"]] as ["sheet" | "city", string][]).map(([val, label]) => (
                          <label key={val} className={`flex-1 text-center text-sm p-2 rounded-lg border cursor-pointer ${it.by === val ? "border-secondary bg-secondary/5 ring-1 ring-secondary" : "border-outline-variant"}`}>
                            <input type="radio" className="sr-only" name={`by_${it.id}`} checked={it.by === val} onChange={() => patchItem(it.id, { by: val, sheet: "", city: "" })} />{label}
                          </label>
                        ))}
                      </div>
                      {it.by === "sheet" ? (
                        <select value={it.sheet} onChange={(e) => patchItem(it.id, { sheet: e.target.value })} className={selCls}>
                          <option value="">בחירת גיליון…</option>
                          {(p?.kind === "topo25" ? SHEETS_25 : SHEETS_50).map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      ) : (
                        <select value={it.city} onChange={(e) => patchItem(it.id, { city: e.target.value })} className={selCls}>
                          <option value="">בחירת יישוב…</option>
                          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      )}
                      <a href={p?.kind === "topo25"
                        ? "https://www.gov.il/BlobFolder/dynamiccollectorresultitem/digital25000/he/Index%2025%202022.pdf"
                        : "https://www.gov.il/BlobFolder/dynamiccollectorresultitem/raster50000/he/Index%2050%202022.pdf"}
                        target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-secondary underline mt-1.5">
                        <span className="material-symbols-outlined text-[13px]">open_in_new</span>מפתח גיליונות {p?.kind === "topo25" ? "1:25,000" : "1:50,000"}
                      </a>
                    </div>
                  )}

                  {/* City maps: pick a settlement */}
                  {p?.kind === "city" && (
                    <div className="mt-3 grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>בחירת יישוב <span className="text-error-red">*</span></label>
                        <select value={it.city} onChange={(e) => patchItem(it.id, { city: e.target.value })} className={selCls}>
                          <option value="">בחירה…</option>
                          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      {it.city && (
                        <div>
                          <label className={labelCls}>קנה מידה של המפה</label>
                          <input readOnly dir="ltr" value={cityScale(it.city)} className={`${inputCls} bg-surface-container/60 text-on-surface-variant`} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Language (only when the product offers more than one) */}
                  {p && p.languages.length > 1 && (
                    <div className="mt-3">
                      <label className={labelCls}>שפת המפה <span className="text-error-red">*</span></label>
                      <div className="flex flex-wrap gap-2">
                        {p.languages.map((lng) => (
                          <label key={lng} className={`text-sm px-3 py-1.5 rounded-full border cursor-pointer ${it.language === lng ? "border-secondary bg-secondary/5 ring-1 ring-secondary" : "border-outline-variant"}`}>
                            <input type="radio" className="sr-only" name={`lng_${it.id}`} checked={it.language === lng} onChange={() => patchItem(it.id, { language: lng })} />{lng}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap items-end gap-4">
                    <div className="w-28">
                      <label className={labelCls}>כמות <span className="text-error-red">*</span></label>
                      <input type="number" min={1} value={it.quantity} onChange={(e) => patchItem(it.id, { quantity: Math.max(1, Number(e.target.value) || 1) })} className={inputCls} />
                    </div>
                    {p?.lamination && (
                      <label className="flex items-center gap-2 text-sm pb-3 cursor-pointer">
                        <input type="checkbox" checked={it.lamination} onChange={(e) => patchItem(it.id, { lamination: e.target.checked })} className="w-4 h-4" />
                        מנוילן (+{p.lamination} ₪)
                      </label>
                    )}
                    <div className="mr-auto pb-2.5 text-sm font-bold text-primary">₪{lineTotal(it).toLocaleString()}</div>
                  </div>
                  {err(`item_${it.id}`)}
                </div>
              );
            })}
          </div>
          {items.length < 50 && (
            <button type="button" onClick={() => setItems((a) => [...a, blankItem()])} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>הוספת מוצר
            </button>
          )}
        </section>

        {/* Section 3 — delivery */}
        <section className="bg-white rounded-3xl border border-outline-variant/50 p-6 md:p-7">
          <h3 className="text-lg font-extrabold text-primary mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-secondary text-white text-sm font-bold flex items-center justify-center">3</span>
            פרטי משלוח
          </h3>
          <div className="grid sm:grid-cols-3 gap-2 mb-3">
            {SHIPPING_OPTIONS.map((opt) => (
              <label key={opt.code} className={`flex flex-col items-center text-center gap-0.5 p-3 rounded-xl border cursor-pointer transition-all ${shipping === opt.code ? "border-secondary bg-secondary/5 ring-1 ring-secondary" : "border-outline-variant hover:border-secondary"}`}>
                <input type="radio" name="ship" className="sr-only" checked={shipping === opt.code} onChange={() => setShipping(opt.code)} />
                <span className="material-symbols-outlined text-secondary">{opt.icon}</span>
                <span className="text-sm font-semibold">{opt.label}</span>
                <span className="text-[11px] text-on-surface-variant">{opt.price} ₪</span>
              </label>
            ))}
          </div>

          {shipping === "pickup" ? (
            <p className="text-xs text-on-surface-variant bg-surface-container/50 rounded-xl px-3 py-2 leading-relaxed">
              איסוף מהמשרד הראשי (לינקולן 1, תל אביב-יפו). לאיסוף מסניף אחר — יש לציין בהערות. סניפים: {OFFICES}.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              <div><label className={labelCls} htmlFor="dc">יישוב <span className="text-error-red">*</span></label><input id="dc" value={dCity} onChange={(e) => setDCity(e.target.value)} className={inputCls} />{err("dCity")}</div>
              <div><label className={labelCls} htmlFor="ds">רחוב <span className="text-error-red">*</span></label><input id="ds" value={dStreet} onChange={(e) => setDStreet(e.target.value)} className={inputCls} />{err("dStreet")}</div>
              <div><label className={labelCls} htmlFor="dh">מספר בית <span className="text-error-red">*</span></label><input id="dh" dir="ltr" maxLength={4} value={dHouse} onChange={(e) => setDHouse(e.target.value)} className={inputCls} />{err("dHouse")}</div>
              <div><label className={labelCls} htmlFor="dapt">מספר דירה</label><input id="dapt" dir="ltr" maxLength={4} value={dApt} onChange={(e) => setDApt(e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls} htmlFor="dz">מיקוד <span className="text-error-red">*</span></label><input id="dz" dir="ltr" inputMode="numeric" maxLength={7} value={dZip} onChange={(e) => setDZip(e.target.value)} className={inputCls} />{err("dZip")}</div>
              <div><label className={labelCls} htmlFor="dpo">תא דואר</label><input id="dpo" dir="ltr" inputMode="numeric" maxLength={5} value={dPobox} onChange={(e) => setDPobox(e.target.value)} className={inputCls} /></div>
            </div>
          )}
          <div className="mt-3">
            <label className={labelCls} htmlFor="rem">הערות ובקשות נוספות</label>
            <textarea id="rem" rows={2} value={remarks} onChange={(e) => setRemarks(e.target.value)} className={`${inputCls} resize-none`} />
          </div>
        </section>
      </div>

      {/* Running total / submit */}
      <aside className="lg:col-span-1">
        <div className="bg-gradient-to-br from-primary to-tertiary text-white rounded-3xl p-6 sticky top-44">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined">shopping_cart</span>סיכום ההזמנה</h3>
          <div className="space-y-2 mb-3">
            {items.filter((it) => findProduct(it.category, it.product)).map((it) => {
              const p = findProduct(it.category, it.product)!;
              return (
                <div key={it.id} className="flex justify-between gap-2 text-sm border-b border-white/15 pb-1.5">
                  <span className="text-white/80">{p.name} ×{it.quantity}{it.lamination && p.lamination ? " · מנוילן" : ""}</span>
                  <span className="font-bold whitespace-nowrap">₪{lineTotal(it).toLocaleString()}</span>
                </div>
              );
            })}
            {subtotal === 0 && <p className="text-sm text-white/60">טרם נבחרו מוצרים.</p>}
          </div>
          <div className="flex justify-between text-sm text-white/80 mb-1"><span>משלוח</span><span>₪{shippingCost}</span></div>
          <div className="flex justify-between items-baseline border-t border-white/20 pt-3 mb-5">
            <span className="text-sm font-bold">סה"כ לתשלום</span>
            <span className="text-3xl font-black text-secondary-container">₪{total.toLocaleString()}</span>
          </div>
          {isDistributor && <p className="text-[11px] text-secondary-container mb-3">מחירי מפיץ מורשה מוחלים על ההזמנה.</p>}
          {showErrors && !isValid && <p className="text-xs bg-white/15 rounded-lg px-3 py-2 mb-3">יש להשלים את שדות החובה המסומנים.</p>}
          <button type="button" onClick={submit} className="shine shine-glow w-full bg-secondary hover:bg-secondary/90 text-white px-5 py-3.5 rounded-full font-bold flex items-center justify-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-[20px]">payments</span>מעבר לתשלום
          </button>
          <p className="text-[11px] text-white/60 text-center mt-3">כולל מע"מ · טיפול עד 4 ימי עסקים</p>
        </div>
      </aside>
    </div>
  );
}

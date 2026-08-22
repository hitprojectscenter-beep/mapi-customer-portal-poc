"use client";

// CMS — Products & services management (full CRUD against /api/products).
// The catalog is DB-backed; changes here are live on the storefront.

import { useEffect, useMemo, useState } from "react";
import { categories, customerTypeLabels, type Service, type Category } from "@/lib/data";

type EditModel = Partial<Service> & { active?: boolean; featuresText?: string };
type AdminProduct = Service & { active?: boolean; sortOrder?: number };

const CTYPES: Service["customerTypes"] = ["private", "business", "government", "surveyor"];

const EMPTY: EditModel = {
  slug: "", name: "", category: "maps", categoryLabel: "", icon: "map",
  shortDescription: "", description: "", priceFrom: 0, priceUnit: "₪", deliveryDays: "",
  customerTypes: ["private", "business", "government", "surveyor"],
  externalHref: "", highlight: false, inScope: true, active: true, featuresText: ""
};

export default function CmsProductsPage() {
  const [items, setItems] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState<EditModel>(EMPTY);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [source, setSource] = useState<string>("");
  const [env, setEnv] = useState<string>("");
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const readOnly = source === "seed"; // no DB configured (demo mode)

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/products", { cache: "no-store" });
      const d = await r.json();
      setItems(Array.isArray(d?.products) ? d.products : []);
      setSource(d?.source || "");
      setEnv(d?.env || "");
    } catch { setItems([]); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const catLabel = useMemo(() => Object.fromEntries(categories.map(c => [c.id, c.label])), []);

  const flash = (kind: "ok" | "err", text: string) => { setMsg({ kind, text }); setTimeout(() => setMsg(null), 3500); };

  const startNew = () => { setEditingSlug(null); setForm(EMPTY); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const startEdit = (p: AdminProduct) => {
    setEditingSlug(p.slug);
    setForm({ ...p, active: p.active !== false, featuresText: (p.features || []).join("\n") });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleType = (t: Service["customerTypes"][number]) => {
    const cur = new Set(form.customerTypes || []);
    cur.has(t) ? cur.delete(t) : cur.add(t);
    setForm({ ...form, customerTypes: Array.from(cur) as Service["customerTypes"] });
  };

  const buildPayload = () => ({
    ...form,
    features: (form.featuresText || "").split("\n").map(s => s.trim()).filter(Boolean),
    priceFrom: Number(form.priceFrom) || 0,
    priceTo: form.priceTo === undefined || (form.priceTo as any) === "" ? undefined : Number(form.priceTo)
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim() || !form.slug?.trim()) { flash("err", "יש למלא שם ומזהה (slug)."); return; }
    setBusy(true);
    try {
      const editing = !!editingSlug;
      const url = editing ? `/api/products/${encodeURIComponent(editingSlug!)}` : "/api/products";
      const r = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload())
      });
      const d = await r.json();
      if (!r.ok || !d?.ok) {
        flash("err", d?.error === "db_not_configured"
          ? "נדרש חיבור למסד נתונים (פרודקשן) — לא ניתן לשמור בסביבת דמו."
          : `שמירה נכשלה: ${d?.error || r.status}`);
      } else {
        flash("ok", editing ? "המוצר עודכן." : "המוצר נוסף.");
        setForm(EMPTY); setEditingSlug(null);
        await load();
      }
    } catch { flash("err", "שגיאת רשת — נסו שוב."); }
    finally { setBusy(false); }
  };

  const remove = async (p: AdminProduct) => {
    if (!window.confirm(`למחוק את "${p.name}"? הפעולה תסיר אותו מהקטלוג.`)) return;
    try {
      const r = await fetch(`/api/products/${encodeURIComponent(p.slug)}`, { method: "DELETE" });
      const d = await r.json();
      if (r.ok && d?.ok) { flash("ok", "המוצר נמחק."); await load(); }
      else flash("err", d?.error === "db_not_configured" ? "נדרש מסד נתונים למחיקה." : "מחיקה נכשלה.");
    } catch { flash("err", "שגיאת רשת."); }
  };

  const toggleActive = async (p: AdminProduct) => {
    try {
      const r = await fetch(`/api/products/${encodeURIComponent(p.slug)}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...p, active: p.active === false })
      });
      if (r.ok) await load(); else flash("err", "עדכון סטטוס נכשל.");
    } catch { flash("err", "שגיאת רשת."); }
  };

  const inputCls = "w-full bg-surface-container border border-outline-variant rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-gold/50 focus:outline-none";
  const labelCls = "block text-xs font-semibold text-primary mb-1.5";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold text-primary">ניהול מוצרים ושירותים</h2>
            {env && (
              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${/פרודקשן/.test(env) ? "bg-error-red/15 text-error-red" : "bg-secondary/15 text-secondary"}`}
                data-tooltip="הסביבה (ומסד הנתונים) שעליה אתה פועל כעת. שים לב בעריכת פרודקשן."
              >
                סביבה: {env}
              </span>
            )}
          </div>
          <p className="text-xs text-on-surface-variant font-light">הוספה, עריכה ומחיקה — הקטלוג מתעדכן מיד עבור הלקוחות.</p>
        </div>
        {editingSlug && (
          <button type="button" onClick={startNew} className="shine btn-lux-ghost px-4 py-2 rounded-full text-xs flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">add</span>מוצר חדש
          </button>
        )}
      </div>

      {readOnly && (
        <div className="bg-alert-yellow/10 border border-alert-yellow/40 rounded-xl px-4 py-2.5 text-xs text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-alert-yellow" aria-hidden="true">info</span>
          סביבת דמו — הקטלוג מוצג מהרשימה המובנית. הוספה/עריכה/מחיקה יפעלו בפרודקשן (עם מסד הנתונים).
        </div>
      )}
      {msg && (
        <div className={`rounded-xl px-4 py-2.5 text-sm ${msg.kind === "ok" ? "bg-positive-green/10 text-positive-green" : "bg-error-red/10 text-error-red"}`}>
          {msg.text}
        </div>
      )}

      {/* Editor */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 p-5">
        <h3 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]" aria-hidden="true">{editingSlug ? "edit" : "add_circle"}</span>
          {editingSlug ? `עריכת מוצר: ${form.name}` : "הוספת מוצר / שירות"}
        </h3>
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>שם המוצר <span className="text-error-red">*</span></label>
            <input className={inputCls} value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>מזהה (slug) <span className="text-error-red">*</span></label>
            <input className={inputCls} dir="ltr" value={form.slug || ""} disabled={!!editingSlug}
              onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="e.g. topographic-map" />
          </div>
          <div>
            <label className={labelCls}>קטגוריה</label>
            <select className={inputCls} value={form.category} onChange={e => setForm({ ...form, category: e.target.value as Category })}>
              {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>תווית קטגוריה (תצוגה)</label>
            <input className={inputCls} value={form.categoryLabel || ""} onChange={e => setForm({ ...form, categoryLabel: e.target.value })} placeholder={catLabel[form.category as string] || ""} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>תיאור קצר</label>
            <input className={inputCls} value={form.shortDescription || ""} onChange={e => setForm({ ...form, shortDescription: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>תיאור מלא</label>
            <textarea className={`${inputCls} resize-none`} rows={3} value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>אייקון (Material Symbol)</label>
            <input className={inputCls} dir="ltr" value={form.icon || ""} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="map / flight / terrain" />
          </div>
          <div>
            <label className={labelCls}>זמן אספקה</label>
            <input className={inputCls} value={form.deliveryDays || ""} onChange={e => setForm({ ...form, deliveryDays: e.target.value })} placeholder="3-7 ימי עסקים" />
          </div>
          <div>
            <label className={labelCls}>מחיר מ־</label>
            <input className={inputCls} type="number" min={0} dir="ltr" value={form.priceFrom ?? 0} onChange={e => setForm({ ...form, priceFrom: Number(e.target.value) })} />
          </div>
          <div>
            <label className={labelCls}>מחיר עד (רשות)</label>
            <input className={inputCls} type="number" min={0} dir="ltr" value={form.priceTo ?? ""} onChange={e => setForm({ ...form, priceTo: e.target.value === "" ? undefined : Number(e.target.value) })} />
          </div>
          <div>
            <label className={labelCls}>יחידת מחיר</label>
            <input className={inputCls} value={form.priceUnit || "₪"} onChange={e => setForm({ ...form, priceUnit: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>קישור חיצוני (רשות)</label>
            <input className={inputCls} dir="ltr" value={form.externalHref || ""} onChange={e => setForm({ ...form, externalHref: e.target.value })} placeholder="https://…  (מפנה החוצה)" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>מאפיינים (שורה לכל מאפיין)</label>
            <textarea className={`${inputCls} resize-none`} rows={3} value={form.featuresText || ""} onChange={e => setForm({ ...form, featuresText: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>קהלי יעד</label>
            <div className="flex flex-wrap gap-2">
              {CTYPES.map(t => {
                const on = (form.customerTypes || []).includes(t);
                return (
                  <button type="button" key={t} onClick={() => toggleType(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${on ? "bg-secondary text-white border-secondary" : "bg-white text-primary border-outline-variant"}`}>
                    {customerTypeLabels[t]}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="sm:col-span-2 flex flex-wrap gap-5 pt-1">
            <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
              <input type="checkbox" checked={!!form.highlight} onChange={e => setForm({ ...form, highlight: e.target.checked })} /> מומלץ
            </label>
            <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
              <input type="checkbox" checked={form.inScope !== false} onChange={e => setForm({ ...form, inScope: e.target.checked })} /> בתכולת הפורטל
            </label>
            <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
              <input type="checkbox" checked={form.active !== false} onChange={e => setForm({ ...form, active: e.target.checked })} /> פעיל (מוצג בקטלוג)
            </label>
          </div>
          <div className="sm:col-span-2 flex gap-2 pt-2">
            <button type="submit" disabled={busy} className="shine shine-glow btn-lux-primary px-6 py-2.5 rounded-full text-sm flex items-center gap-2 disabled:opacity-60">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">{busy ? "hourglass_top" : "save"}</span>
              {busy ? "שומר…" : editingSlug ? "עדכון מוצר" : "הוספת מוצר"}
            </button>
            {editingSlug && (
              <button type="button" onClick={startNew} className="shine btn-lux-ghost px-5 py-2.5 rounded-full text-sm">ביטול</button>
            )}
          </div>
        </form>
      </section>

      {/* List */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 p-5">
        <h3 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]" aria-hidden="true">list</span>
          כל המוצרים {loading ? "" : `(${items.length})`}
        </h3>
        {loading ? (
          <p className="text-sm text-on-surface-variant py-6 text-center">טוען…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="text-on-surface-variant text-xs border-b border-outline-variant/50">
                  <th className="text-right font-semibold py-2 pe-2">מוצר</th>
                  <th className="text-right font-semibold py-2 px-2">קטגוריה</th>
                  <th className="text-right font-semibold py-2 px-2">מחיר מ־</th>
                  <th className="text-center font-semibold py-2 px-2">סטטוס</th>
                  <th className="text-center font-semibold py-2 ps-2">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {items.map(p => (
                  <tr key={p.slug} className="border-b border-outline-variant/30 hover:bg-surface-container/40">
                    <td className="py-2.5 pe-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">{p.icon}</span>
                        <div>
                          <p className="font-semibold text-primary leading-tight">{p.name}</p>
                          <p className="text-[11px] text-on-surface-variant font-mono" dir="ltr">{p.slug}{p.externalHref ? " ↗" : ""}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-on-surface-variant">{catLabel[p.category] || p.category}</td>
                    <td className="py-2.5 px-2 text-primary font-semibold" dir="ltr">{p.externalHref ? "—" : `${p.priceUnit}${(p.priceFrom || 0).toLocaleString()}`}</td>
                    <td className="py-2.5 px-2 text-center">
                      <button type="button" onClick={() => toggleActive(p)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${p.active === false ? "bg-on-surface-variant/10 text-on-surface-variant" : "bg-positive-green/10 text-positive-green"}`}
                        data-tooltip="לחיצה משנה פעיל/מושבת">
                        {p.active === false ? "מושבת" : "פעיל"}
                      </button>
                    </td>
                    <td className="py-2.5 ps-2">
                      <div className="flex gap-1 justify-center">
                        <button type="button" onClick={() => startEdit(p)} className="shine w-8 h-8 rounded-lg hover:bg-secondary/10 hover:text-secondary text-on-surface-variant flex items-center justify-center" data-tooltip="עריכה">
                          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">edit</span>
                        </button>
                        <button type="button" onClick={() => remove(p)} className="shine w-8 h-8 rounded-lg hover:bg-error-red/10 hover:text-error-red text-on-surface-variant flex items-center justify-center" data-tooltip="מחיקה">
                          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

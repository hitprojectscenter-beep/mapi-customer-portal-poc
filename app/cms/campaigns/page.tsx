"use client";

import { useEffect, useState } from "react";
import {
  loadCmsCampaigns, saveCmsCampaigns, cmsAudit, newId,
  type CmsCampaign, type CampaignStatus
} from "@/lib/cms";

const AUDIENCES: Array<{ id: string; label: string }> = [
  { id: "all", label: "כל הלקוחות" },
  { id: "citizen", label: "אזרחים פרטיים" },
  { id: "surveyor", label: "מודדים מוסמכים" },
  { id: "municipality", label: "רשויות מקומיות" },
  { id: "government", label: "משרדי ממשלה" },
  { id: "professional", label: "שמאים / מהנדסים / אדריכלים" },
  { id: "business", label: "לקוחות עסקיים" },
  { id: "researcher", label: "חוקרים וסטודנטים" },
  { id: "infrastructure", label: "תאגידי תשתית" }
];

const STATUS_META: Record<CampaignStatus, { label: string; cls: string }> = {
  draft: { label: "טיוטה", cls: "bg-surface-container text-on-surface-variant" },
  active: { label: "פעיל", cls: "bg-positive-green/10 text-positive-green" },
  ended: { label: "הסתיים", cls: "bg-error-red/10 text-error-red" }
};

const EMPTY_FORM = {
  name: "",
  audience: "all",
  discountPct: 10,
  bannerText: "",
  startDate: "",
  endDate: ""
};

export default function CmsCampaignsPage() {
  const [items, setItems] = useState<CmsCampaign[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => { setItems(loadCmsCampaigns()); }, []);

  const persist = (next: CmsCampaign[]) => {
    setItems(next);
    saveCmsCampaigns(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editingId) {
      persist(items.map(c => c.id === editingId ? { ...c, ...form } : c));
      cmsAudit(`עריכת קמפיין: "${form.name.slice(0, 40)}"`);
      setEditingId(null);
    } else {
      const item: CmsCampaign = {
        id: newId("c"),
        ...form,
        status: "draft",
        createdAt: new Date().toISOString().slice(0, 10)
      };
      persist([item, ...items]);
      cmsAudit(`יצירת קמפיין: "${form.name.slice(0, 40)}"`);
    }
    setForm(EMPTY_FORM);
  };

  const handleEdit = (c: CmsCampaign) => {
    setEditingId(c.id);
    setForm({
      name: c.name, audience: c.audience, discountPct: c.discountPct,
      bannerText: c.bannerText, startDate: c.startDate, endDate: c.endDate
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (c: CmsCampaign) => {
    if (!window.confirm(`למחוק את הקמפיין "${c.name}"?`)) return;
    persist(items.filter(x => x.id !== c.id));
    cmsAudit(`מחיקת קמפיין: "${c.name.slice(0, 40)}"`);
  };

  const setStatus = (c: CmsCampaign, status: CampaignStatus) => {
    persist(items.map(x => x.id === c.id ? { ...x, status } : x));
    cmsAudit(`שינוי סטטוס קמפיין "${c.name.slice(0, 30)}" ל-${STATUS_META[status].label}`);
  };

  const audienceLabel = (id: string) => AUDIENCES.find(a => a.id === id)?.label || id;

  return (
    <div className="space-y-6">
      {/* Editor */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 p-5">
        <h2 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">
            {editingId ? "edit" : "add_circle"}
          </span>
          {editingId ? "עריכת קמפיין" : "יצירת קמפיין חדש"}
        </h2>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="c-name" className="block text-xs font-semibold text-primary mb-1.5">שם הקמפיין</label>
            <input
              id="c-name" type="text" required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="לדוגמה: מבצע קיץ למודדים"
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="c-aud" className="block text-xs font-semibold text-primary mb-1.5">קהל יעד</label>
            <select
              id="c-aud" value={form.audience}
              onChange={(e) => setForm({ ...form, audience: e.target.value })}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
            >
              {AUDIENCES.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="c-disc" className="block text-xs font-semibold text-primary mb-1.5">
              אחוז הנחה — {form.discountPct}%
              {form.discountPct > 20 && <span className="text-error-red font-bold"> (דורש אישור סמנכ"ל!)</span>}
              {form.discountPct > 10 && form.discountPct <= 20 && <span className="text-alert-yellow font-bold"> (דורש אישור מנהל אגף)</span>}
            </label>
            <input
              id="c-disc" type="range" min={0} max={50} step={1} value={form.discountPct}
              onChange={(e) => setForm({ ...form, discountPct: parseInt(e.target.value) })}
              className="w-full accent-secondary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="c-start" className="block text-xs font-semibold text-primary mb-1.5">תאריך התחלה</label>
              <input
                id="c-start" type="date" required value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label htmlFor="c-end" className="block text-xs font-semibold text-primary mb-1.5">תאריך סיום</label>
              <input
                id="c-end" type="date" required value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
                dir="ltr"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="c-banner" className="block text-xs font-semibold text-primary mb-1.5">טקסט באנר</label>
            <input
              id="c-banner" type="text" value={form.bannerText}
              onChange={(e) => setForm({ ...form, bannerText: e.target.value })}
              placeholder='לדוגמה: 10% הנחה על מנוי CORS שנתי — עד סוף אוגוסט'
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2 flex items-center gap-2">
            <button
              type="submit"
              className="shine shine-glow bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-secondary transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">{editingId ? "save" : "add"}</span>
              {editingId ? "שמור שינויים" : "צור קמפיין (טיוטה)"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setForm(EMPTY_FORM); }}
                className="shine text-on-surface-variant px-4 py-2.5 rounded-full text-sm font-medium hover:text-primary border border-outline-variant"
              >
                ביטול
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Campaign list */}
      <section className="space-y-3">
        {items.map(c => (
          <article key={c.id} className="bg-white rounded-2xl border border-outline-variant/50 p-5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex-1 min-w-[220px]">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-base font-bold text-primary">{c.name}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${STATUS_META[c.status].cls}`}>
                    {STATUS_META[c.status].label}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
                    -{c.discountPct}%
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant font-light">{c.bannerText || "—"}</p>
                <p className="text-[11px] text-on-surface-variant mt-1.5">
                  🎯 {audienceLabel(c.audience)} · 📅 <span dir="ltr">{c.startDate} → {c.endDate}</span>
                </p>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                {c.status !== "active" && (
                  <button
                    type="button"
                    onClick={() => setStatus(c, "active")}
                    className="shine bg-positive-green/10 text-positive-green px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-positive-green hover:text-white transition-colors"
                  >
                    הפעל
                  </button>
                )}
                {c.status === "active" && (
                  <button
                    type="button"
                    onClick={() => setStatus(c, "ended")}
                    className="shine bg-alert-yellow/10 text-alert-yellow px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-alert-yellow hover:text-white transition-colors"
                  >
                    סיים קמפיין
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleEdit(c)}
                  className="shine w-9 h-9 rounded-lg text-secondary hover:bg-secondary/10 flex items-center justify-center"
                  aria-label="ערוך"
                >
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(c)}
                  className="shine w-9 h-9 rounded-lg text-error-red hover:bg-error-red/10 flex items-center justify-center"
                  aria-label="מחק"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
          </article>
        ))}
        {items.length === 0 && (
          <p className="bg-white rounded-2xl border border-outline-variant/50 p-8 text-center text-sm text-on-surface-variant font-light">
            אין קמפיינים עדיין — צור את הראשון למעלה.
          </p>
        )}
      </section>
    </div>
  );
}

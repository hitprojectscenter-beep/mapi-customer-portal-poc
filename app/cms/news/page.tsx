"use client";

import { useEffect, useState } from "react";
import {
  loadCmsNews, saveCmsNews, resetCmsNews, cmsAudit, newId,
  type CmsNewsItem, type CmsNewsType
} from "@/lib/cms";

const TYPE_META: Record<CmsNewsType, { label: string; dot: string }> = {
  new: { label: "חדש", dot: "bg-positive-green" },
  update: { label: "עדכון", dot: "bg-secondary" },
  promo: { label: "מבצע", dot: "bg-alert-yellow" },
  alert: { label: "התראה", dot: "bg-error-red" }
};

const EMPTY_FORM = { type: "new" as CmsNewsType, title: "", href: "/" };

export default function CmsNewsPage() {
  const [items, setItems] = useState<CmsNewsItem[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setItems(loadCmsNews()); }, []);

  const persist = (next: CmsNewsItem[]) => {
    setItems(next);
    saveCmsNews(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const wordCount = form.title.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (editingId) {
      persist(items.map(n => n.id === editingId ? { ...n, ...form } : n));
      cmsAudit(`עריכת חדשה: "${form.title.slice(0, 40)}"`);
      setEditingId(null);
    } else {
      const item: CmsNewsItem = {
        id: newId("n"),
        ...form,
        publishedAt: new Date().toISOString().slice(0, 10),
        active: true
      };
      persist([item, ...items]);
      cmsAudit(`הוספת חדשה: "${form.title.slice(0, 40)}"`);
    }
    setForm(EMPTY_FORM);
  };

  const handleEdit = (n: CmsNewsItem) => {
    setEditingId(n.id);
    setForm({ type: n.type, title: n.title, href: n.href });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (n: CmsNewsItem) => {
    if (!window.confirm(`למחוק את החדשה "${n.title}"?`)) return;
    persist(items.filter(x => x.id !== n.id));
    cmsAudit(`מחיקת חדשה: "${n.title.slice(0, 40)}"`);
  };

  const toggleActive = (n: CmsNewsItem) => {
    persist(items.map(x => x.id === n.id ? { ...x, active: !x.active } : x));
    cmsAudit(`${n.active ? "השבתת" : "הפעלת"} חדשה: "${n.title.slice(0, 40)}"`);
  };

  const handleReset = () => {
    if (!window.confirm("לשחזר את חדשות ברירת המחדל? פעולה זו תמחק את כל השינויים.")) return;
    setItems(resetCmsNews());
    cmsAudit("שחזור חדשות לברירת מחדל");
  };

  return (
    <div className="space-y-6">
      {/* Editor */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 p-5">
        <h2 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">
            {editingId ? "edit" : "add_circle"}
          </span>
          {editingId ? "עריכת חדשה" : "הוספת חדשה לשורת החדשות"}
        </h2>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-[140px_1fr] gap-3">
          <div>
            <label htmlFor="news-type" className="block text-xs font-semibold text-primary mb-1.5">סוג</label>
            <select
              id="news-type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as CmsNewsType })}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
              data-tooltip="סוג ההודעה קובע את צבע הנקודה והאייקון בסרגל החדשות הציבורי"
              data-tooltip-position="bottom"
            >
              {Object.entries(TYPE_META).map(([id, m]) => (
                <option key={id} value={id}>{m.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="news-title" className="block text-xs font-semibold text-primary mb-1.5">
              כותרת (עד 7 מילים) —{" "}
              <span className={wordCount > 7 ? "text-error-red font-bold" : "text-on-surface-variant"}>
                {wordCount}/7
              </span>
            </label>
            <input
              id="news-title"
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="לדוגמה: אורתופוטו חדש זמין באזור המרכז"
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
              data-tooltip="הכותרת שתוצג בסרגל החדשות — עד 7 מילים לפי כללי הבית (המונה מימין מתעדכן חי)"
              data-tooltip-position="bottom"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="news-href" className="block text-xs font-semibold text-primary mb-1.5">קישור יעד</label>
            <input
              id="news-href"
              type="text"
              value={form.href}
              onChange={(e) => setForm({ ...form, href: e.target.value })}
              placeholder="/catalog/aerial-photos"
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
              dir="ltr"
              data-tooltip="לאן תוביל לחיצה על החדשה — נתיב פנימי (למשל ‎/catalog) או כתובת מלאה"
              data-tooltip-position="bottom"
            />
          </div>
          <div className="sm:col-span-2 flex items-center gap-2 flex-wrap">
            <button
              type="submit"
              className="shine shine-glow bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-secondary transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">{editingId ? "save" : "add"}</span>
              {editingId ? "שמור שינויים" : "פרסם חדשה"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setForm(EMPTY_FORM); }}
                className="shine text-on-surface-variant px-4 py-2.5 rounded-full text-sm font-medium hover:text-primary border border-outline-variant"
              >
                ביטול עריכה
              </button>
            )}
            {saved && <span className="text-positive-green text-sm font-semibold">✓ נשמר</span>}
          </div>
        </form>
      </section>

      {/* News list */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 overflow-hidden">
        <header className="px-5 py-3 border-b border-outline-variant/50 flex items-center justify-between">
          <h2 className="text-base font-bold text-primary">
            חדשות בפורטל ({items.length})
          </h2>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-error-red hover:underline font-medium"
          >
            שחזר ברירת מחדל
          </button>
        </header>
        <ul className="divide-y divide-outline-variant/30" role="list">
          {items.map(n => (
            <li key={n.id} className={`px-5 py-3.5 flex items-center gap-3 flex-wrap ${!n.active ? "opacity-50" : ""}`}>
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${TYPE_META[n.type].dot}`} aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant w-12">{TYPE_META[n.type].label}</span>
              <div className="flex-1 min-w-[200px]">
                <p className="text-sm font-medium text-primary">{n.title}</p>
                <p className="text-[11px] text-on-surface-variant font-light" dir="ltr">{n.href} · {n.publishedAt}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleActive(n)}
                  className={`shine w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    n.active ? "text-positive-green hover:bg-positive-green/10" : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                  aria-label={n.active ? "השבת" : "הפעל"}
                  data-tooltip={n.active ? "פעילה — לחץ להשבתה" : "מושבתת — לחץ להפעלה"}
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-[20px]">{n.active ? "visibility" : "visibility_off"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleEdit(n)}
                  className="shine w-9 h-9 rounded-lg text-secondary hover:bg-secondary/10 flex items-center justify-center"
                  aria-label="ערוך"
                >
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(n)}
                  className="shine w-9 h-9 rounded-lg text-error-red hover:bg-error-red/10 flex items-center justify-center"
                  aria-label="מחק"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <p className="px-5 py-2.5 text-[11px] text-on-surface-variant bg-surface-container/30 border-t border-outline-variant/30 font-light">
          💡 החדשות הפעילות מוצגות בשורת החדשות בראש הפורטל, לפי סדר הרשימה. השינויים נשמרים בדפדפן זה (POC).
        </p>
      </section>
    </div>
  );
}

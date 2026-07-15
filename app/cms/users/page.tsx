"use client";

import { useEffect, useState } from "react";
import {
  loadCmsUsers, saveCmsUsers, cmsAudit, newId,
  type CmsUser, type CmsUserRole
} from "@/lib/cms";

const ROLE_META: Record<CmsUserRole, { label: string; cls: string }> = {
  admin: { label: "מנהל מערכת", cls: "bg-error-red/10 text-error-red" },
  editor: { label: "עורך תוכן", cls: "bg-secondary/10 text-secondary" },
  viewer: { label: "צופה בלבד", cls: "bg-surface-container text-on-surface-variant" }
};

const EMPTY_FORM = { name: "", email: "", role: "editor" as CmsUserRole };

export default function CmsUsersPage() {
  const [items, setItems] = useState<CmsUser[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => { setItems(loadCmsUsers()); }, []);

  const persist = (next: CmsUser[]) => {
    setItems(next);
    saveCmsUsers(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    if (items.some(u => u.email.toLowerCase() === form.email.trim().toLowerCase())) {
      window.alert("כתובת המייל כבר קיימת במערכת.");
      return;
    }
    const user: CmsUser = {
      id: newId("u"),
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role,
      active: true,
      lastLogin: null
    };
    persist([...items, user]);
    cmsAudit(`הוספת משתמש: ${user.name} (${ROLE_META[user.role].label})`);
    setForm(EMPTY_FORM);
  };

  const toggleActive = (u: CmsUser) => {
    if (u.primary) return;
    persist(items.map(x => x.id === u.id ? { ...x, active: !x.active } : x));
    cmsAudit(`${u.active ? "השבתת" : "הפעלת"} משתמש: ${u.name}`);
  };

  const changeRole = (u: CmsUser, role: CmsUserRole) => {
    if (u.primary) return;
    persist(items.map(x => x.id === u.id ? { ...x, role } : x));
    cmsAudit(`שינוי תפקיד ${u.name} ל-${ROLE_META[role].label}`);
  };

  const handleDelete = (u: CmsUser) => {
    if (u.primary) return;
    if (!window.confirm(`למחוק את המשתמש ${u.name}?`)) return;
    persist(items.filter(x => x.id !== u.id));
    cmsAudit(`מחיקת משתמש: ${u.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Add user */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 p-5">
        <h2 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">person_add</span>
          הוספת משתמש חדש
        </h2>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-[1fr_1fr_150px_auto] gap-3 items-end">
          <div>
            <label htmlFor="u-name" className="block text-xs font-semibold text-primary mb-1.5">שם מלא</label>
            <input
              id="u-name" type="text" required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="u-email" className="block text-xs font-semibold text-primary mb-1.5">מייל</label>
            <input
              id="u-email" type="email" required value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
              dir="ltr"
            />
          </div>
          <div>
            <label htmlFor="u-role" className="block text-xs font-semibold text-primary mb-1.5">תפקיד</label>
            <select
              id="u-role" value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as CmsUserRole })}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:outline-none"
            >
              {Object.entries(ROLE_META).map(([id, m]) => (
                <option key={id} value={id}>{m.label}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="shine shine-glow bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-secondary transition-colors whitespace-nowrap"
          >
            הוסף
          </button>
        </form>
      </section>

      {/* Users table */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 overflow-hidden">
        <header className="px-5 py-3 border-b border-outline-variant/50">
          <h2 className="text-base font-bold text-primary">משתמשי המערכת ({items.length})</h2>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-surface-container/50 text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-4 text-right">שם</th>
                <th className="py-2.5 px-4 text-right">מייל</th>
                <th className="py-2.5 px-4">תפקיד</th>
                <th className="py-2.5 px-4">סטטוס</th>
                <th className="py-2.5 px-4">כניסה אחרונה</th>
                <th className="py-2.5 px-4">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {items.map(u => (
                <tr key={u.id} className={`border-b border-outline-variant/30 ${!u.active ? "opacity-50" : ""}`}>
                  <td className="py-3 px-4 font-medium text-primary">
                    {u.name}
                    {u.primary && (
                      <span className="ms-2 text-[10px] font-bold text-alert-yellow bg-alert-yellow/10 px-2 py-0.5 rounded-full">
                        חשבון ראשי
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant" dir="ltr">{u.email}</td>
                  <td className="py-3 px-4 text-center">
                    {u.primary ? (
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${ROLE_META[u.role].cls}`}>
                        {ROLE_META[u.role].label}
                      </span>
                    ) : (
                      <select
                        value={u.role}
                        onChange={(e) => changeRole(u, e.target.value as CmsUserRole)}
                        className="bg-surface-container border border-outline-variant rounded-lg px-2 py-1 text-[11px] focus:ring-2 focus:ring-secondary focus:outline-none"
                        aria-label={`תפקיד של ${u.name}`}
                      >
                        {Object.entries(ROLE_META).map(([id, m]) => (
                          <option key={id} value={id}>{m.label}</option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.active ? "bg-positive-green/10 text-positive-green" : "bg-error-red/10 text-error-red"
                    }`}>
                      {u.active ? "פעיל" : "מושבת"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-on-surface-variant" dir="ltr">
                    {u.lastLogin || "—"}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => toggleActive(u)}
                        disabled={u.primary}
                        className="shine w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label={u.active ? "השבת" : "הפעל"}
                        data-tooltip={u.primary ? "לא ניתן להשבית חשבון ראשי" : u.active ? "השבת משתמש" : "הפעל משתמש"}
                        data-tooltip-position="bottom"
                      >
                        <span className="material-symbols-outlined text-[18px]">{u.active ? "toggle_on" : "toggle_off"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(u)}
                        disabled={u.primary}
                        className="shine w-8 h-8 rounded-lg text-error-red hover:bg-error-red/10 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="מחק"
                        data-tooltip={u.primary ? "לא ניתן למחוק חשבון ראשי" : "מחק משתמש"}
                        data-tooltip-position="bottom"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-5 py-2.5 text-[11px] text-on-surface-variant bg-surface-container/30 border-t border-outline-variant/30 font-light">
          💡 בסביבת הייצור, ניהול המשתמשים יתבצע דרך Salesforce (Profiles + Permission Sets) עם SSO ארגוני.
        </p>
      </section>
    </div>
  );
}

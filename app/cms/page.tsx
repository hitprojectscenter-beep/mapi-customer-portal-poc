"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  loadCmsNews, loadCmsCampaigns, loadCmsUsers, loadCmsAudit,
  type CmsAuditEntry
} from "@/lib/cms";

export default function CmsDashboardPage() {
  const [stats, setStats] = useState({ news: 0, activeNews: 0, campaigns: 0, activeCampaigns: 0, users: 0, activeUsers: 0 });
  const [audit, setAudit] = useState<CmsAuditEntry[]>([]);

  useEffect(() => {
    const news = loadCmsNews();
    const campaigns = loadCmsCampaigns();
    const users = loadCmsUsers();
    setStats({
      news: news.length,
      activeNews: news.filter(n => n.active).length,
      campaigns: campaigns.length,
      activeCampaigns: campaigns.filter(c => c.status === "active").length,
      users: users.length,
      activeUsers: users.filter(u => u.active).length
    });
    setAudit(loadCmsAudit().slice(0, 8));
  }, []);

  const cards = [
    { href: "/cms/news", icon: "newspaper", title: "חדשות", value: `${stats.activeNews}/${stats.news}`, sub: "פעילות / סה\"כ", tint: "bg-secondary/10 text-secondary" },
    { href: "/cms/campaigns", icon: "campaign", title: "קמפיינים", value: `${stats.activeCampaigns}/${stats.campaigns}`, sub: "פעילים / סה\"כ", tint: "bg-alert-yellow/10 text-alert-yellow" },
    { href: "/cms/users", icon: "group", title: "משתמשים", value: `${stats.activeUsers}/${stats.users}`, sub: "פעילים / סה\"כ", tint: "bg-positive-green/10 text-positive-green" }
  ];

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {cards.map(c => (
          <Link
            key={c.href}
            href={c.href}
            className="shine bg-white rounded-2xl border border-outline-variant/50 hover:border-secondary/50 hover:shadow-lg transition-all p-5 flex items-start gap-3"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${c.tint}`}>
              <span className="material-symbols-outlined text-[24px]">{c.icon}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary" dir="ltr">{c.value}</p>
              <p className="text-xs font-semibold text-primary">{c.title}</p>
              <p className="text-[11px] text-on-surface-variant font-light">{c.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 p-5">
        <h2 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">bolt</span>
          פעולות מהירות
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/cms/news" className="shine bg-primary text-white px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 hover:bg-secondary transition-colors">
            <span className="material-symbols-outlined text-[16px]">add</span> חדשה חדשה
          </Link>
          <Link href="/cms/campaigns" className="shine bg-primary text-white px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 hover:bg-secondary transition-colors">
            <span className="material-symbols-outlined text-[16px]">add</span> קמפיין חדש
          </Link>
          <Link href="/cms/users" className="shine bg-primary text-white px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 hover:bg-secondary transition-colors">
            <span className="material-symbols-outlined text-[16px]">person_add</span> משתמש חדש
          </Link>
          <Link href="/" target="_blank" className="shine bg-surface-container text-primary px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 hover:bg-secondary/10 transition-colors">
            <span className="material-symbols-outlined text-[16px]">open_in_new</span> צפייה בפורטל
          </Link>
        </div>
      </section>

      {/* Audit log */}
      <section className="bg-white rounded-2xl border border-outline-variant/50 overflow-hidden">
        <header className="px-5 py-3 border-b border-outline-variant/50 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">history</span>
          <h2 className="text-base font-bold text-primary">יומן שינויים אחרונים</h2>
        </header>
        {audit.length === 0 ? (
          <p className="px-5 py-6 text-sm text-on-surface-variant font-light">
            אין שינויים עדיין. פעולות עריכה יופיעו כאן אוטומטית.
          </p>
        ) : (
          <ul className="divide-y divide-outline-variant/30" role="list">
            {audit.map(a => (
              <li key={a.id} className="px-5 py-2.5 flex items-center justify-between gap-3 text-xs">
                <span className="text-primary">{a.action}</span>
                <span className="text-on-surface-variant font-light whitespace-nowrap" dir="ltr">
                  {new Date(a.at).toLocaleString("he-IL", { dateStyle: "short", timeStyle: "short" })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Content ownership reference (spec 4.11) */}
      <section className="bg-secondary/5 rounded-2xl border border-secondary/20 p-5">
        <h2 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
          תזכורת — מטריצת אחריות תוכן (אפיון 4.11)
        </h2>
        <p className="text-xs text-on-surface-variant leading-relaxed font-light">
          מחירים ומחירונים — עדכון שנתי (ינואר) באישור סמנכ"ל לקוחות · דפי שירותים — כל 6 חודשים באישור מנהל אגף ·
          FAQ — רבעוני · באנרים והודעות — שבועי/חודשי · תוכן באנגלית/ערבית — לאחר עדכון בעברית.
        </p>
      </section>
    </div>
  );
}

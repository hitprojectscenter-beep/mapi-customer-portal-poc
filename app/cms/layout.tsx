"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cmsVerifySession, cmsLogout, type CmsSession } from "@/lib/cms";

const NAV = [
  { href: "/cms", icon: "dashboard", label: "לוח בקרה" },
  { href: "/cms/news", icon: "newspaper", label: "ניהול חדשות" },
  { href: "/cms/campaigns", icon: "campaign", label: "קמפיינים" },
  { href: "/cms/users", icon: "group", label: "ניהול משתמשים" }
];

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/cms/login";
  const [session, setSession] = useState<CmsSession | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // The real gate: validates the httpOnly session cookie server-side
    cmsVerifySession().then(s => {
      if (cancelled) return;
      setSession(s);
      setChecked(true);
      if (!s && !isLogin) router.replace("/cms/login");
    });
    return () => { cancelled = true; };
  }, [pathname, isLogin, router]);

  const handleLogout = () => {
    cmsLogout();
    router.replace("/cms/login");
  };

  // Login page renders without chrome
  if (isLogin) return <>{children}</>;

  // Guard: wait for session check, block render if unauthenticated
  if (!checked) return <div className="min-h-[60vh]" aria-busy="true" />;
  if (!session) return null;

  return (
    <div className="bg-surface min-h-screen">
      {/* CMS header strip — light, champagne hairline (no filled band) */}
      <div className="bg-white border-b border-gold/30">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-5 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-lg md:text-xl font-bold flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[24px] text-gold-dark" aria-hidden="true">edit_note</span>
              <span>ניהול תוכן הפורטל</span>
            </h1>
            <p className="text-on-surface-variant text-xs font-light mt-0.5">
              {session.name} · {session.role}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="shine btn-lux-ghost px-4 py-2 rounded-full text-xs flex items-center gap-1.5"
            data-tooltip="יציאה מאובטחת מממשק הניהול — ה-session נמחק"
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">logout</span>
            <span>התנתקות</span>
          </button>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-48 h-fit">
          <nav className="bg-white rounded-2xl border border-outline-variant/50 p-2 flex lg:flex-col gap-1 overflow-x-auto" aria-label="CMS">
            {NAV.map(item => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shine flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    active ? "bg-primary text-white" : "text-primary hover:bg-surface-container"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}

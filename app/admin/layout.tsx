"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import type { TKey } from "@/lib/i18n";

const MODULES: Array<{
  href: string;
  icon: string;
  labelKey: TKey;
  subKey: TKey;
}> = [
  { href: "/admin", icon: "dashboard", labelKey: "admin.module.dashboard", subKey: "admin.subtitle" },
  { href: "/admin/pricing", icon: "price_check", labelKey: "admin.module.pricing", subKey: "admin.module.pricingSub" },
  { href: "/admin/approvals", icon: "task_alt", labelKey: "admin.module.approvals", subKey: "admin.module.approvalsSub" },
  { href: "/admin/subscriptions", icon: "subscriptions", labelKey: "admin.module.subscriptions", subKey: "admin.module.subscriptionsSub" },
  { href: "/admin/sales", icon: "trending_up", labelKey: "admin.module.sales", subKey: "admin.module.salesSub" },
  { href: "/admin/content", icon: "edit_note", labelKey: "admin.module.content", subKey: "admin.module.contentSub" }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-primary text-white border-b border-white/10">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary-container">admin_panel_settings</span>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-widest">{t("nav.admin")}</p>
                <p className="font-bold text-sm">{t("admin.welcomeBack")}</p>
              </div>
            </div>
            <Link
              href="/"
              className="shine text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5"
              data-tooltip={t("nav.home")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>{t("common.home")}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-6 grid lg:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="space-y-2">
          {MODULES.map((m) => {
            const isActive = pathname === m.href || (m.href !== "/admin" && pathname.startsWith(m.href));
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`shine block rounded-xl p-3 transition-all border ${
                  isActive
                    ? "bg-secondary/10 border-secondary text-secondary"
                    : "bg-white border-outline-variant/40 hover:border-secondary/40 text-primary"
                }`}
                data-tooltip={t(m.subKey)}
                data-tooltip-position="bottom"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">{m.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{t(m.labelKey)}</p>
                    <p className="text-[11px] text-on-surface-variant truncate">{t(m.subKey)}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </aside>

        {/* Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}

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
  group: "overview" | "sales" | "ops" | "content";
}> = [
  { href: "/admin", icon: "dashboard", labelKey: "admin.module.dashboard", subKey: "admin.subtitle", group: "overview" },
  { href: "/admin/sales", icon: "trending_up", labelKey: "admin.module.sales", subKey: "admin.module.salesSub", group: "overview" },
  { href: "/admin/goals", icon: "flag", labelKey: "nav.goals", subKey: "goals.subtitle", group: "overview" },
  { href: "/admin/pipeline", icon: "filter_alt", labelKey: "nav.pipeline", subKey: "pipe.subtitle", group: "sales" },
  { href: "/admin/strategic", icon: "stars", labelKey: "nav.strategic", subKey: "strat.subtitle", group: "sales" },
  { href: "/admin/approvals", icon: "task_alt", labelKey: "admin.module.approvals", subKey: "admin.module.approvalsSub", group: "sales" },
  { href: "/admin/subscriptions", icon: "subscriptions", labelKey: "admin.module.subscriptions", subKey: "admin.module.subscriptionsSub", group: "sales" },
  { href: "/admin/pricing", icon: "price_check", labelKey: "admin.module.pricing", subKey: "admin.module.pricingSub", group: "ops" },
  { href: "/admin/use-cases", icon: "menu_book", labelKey: "nav.useCases", subKey: "uc.subtitle", group: "ops" },
  { href: "/admin/content", icon: "edit_note", labelKey: "admin.module.content", subKey: "admin.module.contentSub", group: "content" }
];

const GROUP_LABELS: Record<string, string> = {
  overview: "סקירה כללית",
  sales: "מכירות",
  ops: "תפעול",
  content: "תוכן"
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const groupedModules = ["overview", "sales", "ops", "content"].map((group) => ({
    group,
    items: MODULES.filter((m) => m.group === group)
  }));

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-primary text-white border-b border-white/10">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary-container text-[22px]">admin_panel_settings</span>
              <div>
                <p className="text-[10px] text-white/60 uppercase tracking-widest">{t("nav.admin")}</p>
                <p className="font-bold text-xs sm:text-sm">{t("admin.welcomeBack")}</p>
              </div>
            </div>
            <Link
              href="/"
              className="shine text-[11px] bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5"
              data-tooltip={t("nav.home")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              <span>{t("common.home")}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-3 md:px-margin-desktop py-5 grid lg:grid-cols-[240px_1fr] gap-5">
        {/* Sidebar */}
        <aside>
          {groupedModules.map((group) => (
            <div key={group.group} className="mb-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1.5 px-2">
                {GROUP_LABELS[group.group]}
              </p>
              <div className="space-y-1">
                {group.items.map((m) => {
                  const isActive = pathname === m.href || (m.href !== "/admin" && pathname.startsWith(m.href));
                  return (
                    <Link
                      key={m.href}
                      href={m.href}
                      className={`shine block rounded-lg px-2.5 py-2 transition-all ${
                        isActive
                          ? "bg-secondary/10 border-r-2 border-secondary text-secondary"
                          : "hover:bg-white text-on-surface-variant hover:text-primary"
                      }`}
                      data-tooltip={t(m.subKey)}
                      data-tooltip-position="bottom"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[20px]">{m.icon}</span>
                        <p className="text-xs font-bold flex-1 min-w-0 truncate">{t(m.labelKey)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        {/* Content */}
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

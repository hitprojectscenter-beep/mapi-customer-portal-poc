import Link from "next/link";
import { mockOrders, mockNotifications } from "@/lib/data";

const kpis = [
  {
    label: 'הזמנות פעילות',
    value: 3,
    icon: "package_2",
    iconBg: "bg-secondary/10 text-secondary",
    trend: "+12%"
  },
  {
    label: 'הצעות ממתינות',
    value: 1,
    icon: "request_quote",
    iconBg: "bg-alert-yellow/10 text-alert-yellow",
    trend: "1 דחופה"
  },
  {
    label: 'מנויים פעילים',
    value: 2,
    icon: "subscriptions",
    iconBg: "bg-positive-green/10 text-positive-green",
    trend: "CORS + WS"
  },
  {
    label: 'הושלמו השנה',
    value: 12,
    icon: "task_alt",
    iconBg: "bg-primary/10 text-primary",
    trend: 'ב-5 חודשים'
  }
];

const statusClasses: Record<string, string> = {
  completed: "bg-positive-green/10 text-positive-green",
  active: "bg-secondary/10 text-secondary",
  "in-progress": "bg-alert-yellow/10 text-alert-yellow",
  cancelled: "bg-error-red/10 text-error-red"
};

const notifTypeClasses: Record<string, string> = {
  warning: "bg-alert-yellow/10 text-alert-yellow",
  info: "bg-secondary/10 text-secondary",
  success: "bg-positive-green/10 text-positive-green"
};

export default function DashboardPage() {
  return (
    <div className="bg-surface min-h-screen">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-l from-primary via-tertiary to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" aria-hidden="true" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
        <div className="relative max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-12 md:py-16">
          <div className="flex flex-row-reverse items-center gap-4 mb-2">
            <span className="material-symbols-outlined text-secondary-container text-[36px]">
              waving_hand
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold">
              שלום, יוסי כהן <span className="font-normal text-white/70 text-lg">|</span>
              <span className="text-secondary-container mr-2">ברוך הבא</span>
            </h1>
          </div>
          <p className="text-white/70 max-w-2xl text-center">
            לוח בקרה אישי - סיכום הפעילות שלך, הזמנות אחרונות, התראות ופעולות מהירות.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="shine shine-glow bg-secondary text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-secondary/90 transition-colors"
              data-tooltip="פתיחת קטלוג השירותים והתחלת הזמנה חדשה"
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined">add_shopping_cart</span>
              <span>הזמן שירות חדש</span>
            </Link>
            <Link
              href="/orders"
              className="shine bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white/20 transition-colors"
              data-tooltip="צפייה בהיסטוריית כל ההזמנות שלך"
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined">history</span>
              <span>היסטוריה</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <section className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop -mt-10 relative z-10 mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <div
              key={i}
              className="shine bg-white rounded-2xl p-5 border border-outline-variant/50 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
              data-tooltip={`${kpi.label}: ${kpi.value} (${kpi.trend})`}
              data-tooltip-position="bottom"
            >
              <div className="flex flex-row-reverse items-start justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.iconBg}`}
                >
                  <span className="material-symbols-outlined">{kpi.icon}</span>
                </div>
                <span className="text-[10px] text-on-surface-variant font-mono uppercase">
                  {kpi.trend}
                </span>
              </div>
              <p className="text-3xl md:text-4xl font-black text-primary text-center">{kpi.value}</p>
              <p className="text-sm text-on-surface-variant text-center">{kpi.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop pb-16 grid lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <section className="lg:col-span-2 bg-white rounded-3xl p-6 border border-outline-variant/50" aria-labelledby="recent-orders-heading">
          <div className="flex flex-row-reverse items-center justify-between mb-6">
            <h2 id="recent-orders-heading" className="text-xl font-extrabold text-primary flex items-center gap-2">
              <span>הזמנות אחרונות</span>
              <span className="material-symbols-outlined text-secondary">package_2</span>
            </h2>
            <Link
              href="/orders"
              className="shine text-sm font-bold text-secondary hover:underline px-2 py-1 rounded"
              data-tooltip="צפייה ברשימת כל ההזמנות שלך"
              data-tooltip-position="bottom"
            >
              לכל ההזמנות ←
            </Link>
          </div>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="border-b border-outline-variant text-xs text-on-surface-variant uppercase tracking-wider">
                  <th className="pb-3 pr-2">פעולות</th>
                  <th className="pb-3">סכום</th>
                  <th className="pb-3">סטטוס</th>
                  <th className="pb-3">תאריך</th>
                  <th className="pb-3">שירות</th>
                  <th className="pb-3">מס' הזמנה</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-outline-variant/40 hover:bg-surface-container/50 transition-colors">
                    <td className="py-4 pr-2">
                      <div className="flex gap-1 justify-end">
                        <button
                          className="shine w-8 h-8 rounded-lg hover:bg-secondary/10 hover:text-secondary text-on-surface-variant flex items-center justify-center"
                          aria-label={`צפה ב-${order.id}`}
                          data-tooltip={`צפייה בפרטי הזמנה ${order.id}`}
                          data-tooltip-position="bottom"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button
                          className="shine w-8 h-8 rounded-lg hover:bg-secondary/10 hover:text-secondary text-on-surface-variant flex items-center justify-center"
                          aria-label={`הורד ${order.id}`}
                          data-tooltip={`הורדת תוצר/חשבונית ל-${order.id}`}
                          data-tooltip-position="bottom"
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 font-bold text-primary">₪{order.amount}</td>
                    <td className="py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          statusClasses[order.status]
                        }`}
                      >
                        {order.statusLabel}
                      </span>
                    </td>
                    <td className="py-4 text-on-surface-variant text-sm">{order.date}</td>
                    <td className="py-4">
                      <span className="flex items-center gap-2 justify-end">
                        <span>{order.serviceName}</span>
                        <span className="material-symbols-outlined text-secondary text-[20px]">
                          {order.serviceIcon}
                        </span>
                      </span>
                    </td>
                    <td className="py-4 font-mono text-xs text-on-surface-variant">{order.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="md:hidden space-y-3" role="list">
            {mockOrders.slice(0, 5).map((order) => (
              <li
                key={order.id}
                className="bg-surface-container/50 rounded-2xl p-4 border border-outline-variant/40 hover:bg-surface-container transition-colors"
              >
                <div className="flex flex-row-reverse items-start justify-between mb-3 gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="material-symbols-outlined text-secondary text-[24px] flex-shrink-0">
                      {order.serviceIcon}
                    </span>
                    <div className="text-center min-w-0">
                      <p className="font-bold text-primary text-sm truncate">{order.serviceName}</p>
                      <p className="font-mono text-[10px] text-on-surface-variant">{order.id}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${
                      statusClasses[order.status]
                    }`}
                  >
                    {order.statusLabel}
                  </span>
                </div>
                <div className="flex flex-row-reverse items-center justify-between pt-2 border-t border-outline-variant/30">
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                    <span>{order.date}</span>
                    <span className="font-bold text-primary text-sm">₪{order.amount}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="shine w-9 h-9 rounded-lg bg-white hover:bg-secondary hover:text-white text-secondary flex items-center justify-center"
                      aria-label={`צפה ב-${order.id}`}
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button
                      className="shine w-9 h-9 rounded-lg bg-white hover:bg-secondary hover:text-white text-secondary flex items-center justify-center"
                      aria-label={`הורד ${order.id}`}
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Notifications + Quick Actions */}
        <div className="space-y-6">
          {/* Notifications */}
          <section
            className="bg-white rounded-3xl p-6 border border-outline-variant/50"
            aria-labelledby="notifications-heading"
          >
            <div className="flex flex-row-reverse items-center justify-between mb-6">
              <h2 id="notifications-heading" className="text-xl font-extrabold text-primary flex items-center gap-2">
                <span>התראות</span>
                <span className="material-symbols-outlined text-alert-yellow">notifications</span>
              </h2>
              <span className="bg-error-red text-white text-xs font-bold rounded-full px-2 py-0.5">
                {mockNotifications.length}
              </span>
            </div>
            <ul className="space-y-3" role="list">
              {mockNotifications.map((n) => (
                <li
                  key={n.id}
                  className={`rounded-2xl p-4 ${notifTypeClasses[n.type]} border border-current/10`}
                >
                  <div className="flex flex-row-reverse items-start gap-3">
                    <span className="material-symbols-outlined">{n.icon}</span>
                    <div className="flex-1 text-center">
                      <p className="text-sm font-medium mb-2">{n.title}</p>
                      <Link
                        href={n.href}
                        className="shine text-xs font-bold underline px-1 py-0.5 rounded"
                        data-tooltip={`${n.cta} - ${n.title}`}
                        data-tooltip-position="bottom"
                      >
                        {n.cta} ←
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Quick Actions */}
          <section
            className="bg-gradient-to-br from-primary to-tertiary text-white rounded-3xl p-6"
            aria-labelledby="quick-actions-heading"
          >
            <h2
              id="quick-actions-heading"
              className="text-xl font-extrabold mb-4 flex items-center gap-2 justify-end"
            >
              <span>פעולות מהירות</span>
              <span className="material-symbols-outlined text-secondary-container">bolt</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: 'מנוי CORS חדש',
                  icon: "sensors",
                  href: "/catalog/cors-subscription",
                  tip: "פתיחת מנוי לתחנות קבע - תיקוני RTK/VRS"
                },
                {
                  label: 'הזמן מפה',
                  icon: "map",
                  href: "/catalog/custom-map",
                  tip: "הזמנת מפה בהתאמה אישית A4-A0"
                },
                {
                  label: 'פתח פנייה',
                  icon: "support_agent",
                  href: "/cases/new",
                  tip: "פתיחת Case חדש לשירות הלקוחות"
                },
                {
                  label: 'הגדרות',
                  icon: "settings",
                  href: "https://www.gov.il/he/departments/survey_of_israel",
                  tip: 'ניהול פרופיל באתר gov.il'
                }
              ].map((action, i) => {
                const isExternal = action.href.startsWith("http");
                const sharedProps = {
                  className:
                    "shine bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center transition-colors",
                  "data-tooltip": action.tip,
                  "data-tooltip-position": "bottom" as const
                };
                const inner = (
                  <>
                    <span className="material-symbols-outlined text-secondary-container mb-2">
                      {action.icon}
                    </span>
                    <span className="text-xs font-bold">{action.label}</span>
                  </>
                );
                return isExternal ? (
                  <a
                    key={i}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...sharedProps}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link key={i} href={action.href} {...sharedProps}>
                    {inner}
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

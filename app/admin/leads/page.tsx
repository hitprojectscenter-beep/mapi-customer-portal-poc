"use client";

// AI Lead Management console — HLD V8 ch. 4.2 / 8.1 / 14.5 / 15.6-R3.
// Everything runs client-side on the localStorage lead store (POC).

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import type { TKey } from "@/lib/i18n";
import {
  loadLeads, resetLeads, leadStats, setLeadStatus, touchLead, reEngageLead,
  isSlaBreached, leadAgeLabel, scoreLead, parseIncomingEmail, captureLead,
  familyDef, FAMILIES, LEAD_AUTOMATIONS, SOURCE_LABELS,
  type Lead, type LeadStatus, type ScoreBand, type ParsedEmail
} from "@/lib/leads";

const BAND_STYLE: Record<ScoreBand, string> = {
  high: "bg-positive-green/10 text-positive-green border-positive-green/30",
  med: "bg-alert-yellow/10 text-alert-yellow border-alert-yellow/30",
  low: "bg-outline-variant/20 text-on-surface-variant border-outline-variant/50"
};

const STATUS_KEY: Record<LeadStatus, TKey> = {
  new: "leads.status.new",
  working: "leads.status.working",
  qualified: "leads.status.qualified",
  unqualified: "leads.status.unqualified",
  noResponse: "leads.status.noResponse",
  converted: "leads.status.converted"
};

const STATUS_STYLE: Record<LeadStatus, string> = {
  new: "bg-secondary/10 text-secondary",
  working: "bg-primary/10 text-primary",
  qualified: "bg-positive-green/10 text-positive-green",
  unqualified: "bg-outline-variant/30 text-on-surface-variant",
  noResponse: "bg-alert-yellow/10 text-alert-yellow",
  converted: "bg-positive-green/15 text-positive-green"
};

const EXAMPLE_EMAIL = `שלום רב,
שמי דניאל אביטל ואני מנהל פרויקטים בחברת נתיבי איילון.
אנחנו זקוקים לאורתופוטו עדכני ומודל גבהים DTM לאזור של כ-30 קמ"ר במרכז הארץ,
בתקציב משוער של 85,000 ₪ לטובת תכנון תשתיות.
אשמח להצעת מחיר ולפרטים על זמני אספקה.
טלפון: 052-7714583
daniel.a@ayalon-inf.co.il`;

export default function LeadsAdminPage() {
  const { t } = useLanguage();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  // Google Workspace backend status (Sheets DB + Chat notifications)
  const [workspace, setWorkspace] = useState<{ sheets: boolean; chat: boolean; sheetUrl: string | null } | null>(null);
  // Email-intake demo state
  const [emailText, setEmailText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [parsed, setParsed] = useState<ParsedEmail | null>(null);
  const [intakeMsg, setIntakeMsg] = useState<"" | "created" | "missing">("");

  useEffect(() => {
    setLeads(loadLeads());
    setLoaded(true);
    fetch("/api/leads")
      .then(r => r.json())
      .then(d => setWorkspace({ sheets: !!d.sheets, chat: !!d.chat, sheetUrl: d.sheetUrl || null }))
      .catch(() => setWorkspace(null));
  }, []);

  const stats = useMemo(() => leadStats(leads), [leads]);
  const filtered = useMemo(
    () => (statusFilter === "all" ? leads : leads.filter(l => l.status === statusFilter)),
    [leads, statusFilter]
  );
  const maxSource = Math.max(1, ...stats.bySource.map(s => s.count));
  const distTotal = Math.max(1, stats.distribution.high + stats.distribution.med + stats.distribution.low);

  const analyze = () => {
    if (!emailText.trim()) return;
    setAnalyzing(true);
    setParsed(null);
    setIntakeMsg("");
    // Small delay so the "AI is working" state is visible in the demo
    setTimeout(() => {
      setParsed(parseIncomingEmail(emailText));
      setAnalyzing(false);
    }, 900);
  };

  const createFromEmail = () => {
    if (!parsed) return;
    const res = captureLead({
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      email: parsed.email,
      phone: parsed.phone,
      organization: parsed.organization,
      family: parsed.family,
      interest: parsed.matchedKeywords.join(", ") || "מייל נכנס",
      source: "email",
      estimatedValue: parsed.estimatedValue
    });
    if (!res) {
      setIntakeMsg("missing");
      return;
    }
    setLeads(loadLeads());
    setIntakeMsg("created");
    setParsed(null);
    setEmailText("");
  };

  if (!loaded) return <div className="min-h-[50vh]" aria-busy="true" />;

  const kpis: { label: TKey; value: string; icon: string; cls: string }[] = [
    { label: "leads.kpi.active", value: String(stats.active), icon: "person_search", cls: "bg-secondary/10 text-secondary" },
    { label: "leads.kpi.newWeek", value: String(stats.newThisWeek), icon: "fiber_new", cls: "bg-primary/10 text-primary" },
    { label: "leads.kpi.treatment", value: String(stats.inTreatment), icon: "support_agent", cls: "bg-tertiary/10 text-tertiary" },
    { label: "leads.kpi.slaBreach", value: String(stats.slaBreaches), icon: "warning", cls: "bg-error-red/10 text-error-red" },
    { label: "leads.kpi.conversion", value: `${stats.conversionRate}%`, icon: "conversion_path", cls: "bg-positive-green/10 text-positive-green" }
  ];

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-[32px] text-secondary">psychology</span>
          <span>{t("leads.title")}</span>
        </h1>
        <p className="text-on-surface-variant text-sm">{t("leads.subtitle")}</p>
        <p className="text-xs text-on-surface-variant/70 mt-1 font-light">{t("leads.specRef")}</p>
        {workspace && (
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {workspace.sheets ? (
              <a
                href={workspace.sheetUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="shine inline-flex items-center gap-1.5 text-[11px] font-bold bg-positive-green/10 text-positive-green rounded-full px-3 py-1 hover:bg-positive-green/20 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">table_chart</span>
                <span>מחובר ל-Google Sheets — כל ליד חדש נכתב לגיליון</span>
                <span className="material-symbols-outlined text-[12px]">open_in_new</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-outline-variant/20 text-on-surface-variant rounded-full px-3 py-1">
                <span className="material-symbols-outlined text-[14px]">cloud_off</span>
                <span>מצב דמו — לידים נשמרים בדפדפן בלבד (חיבור Google Sheets: ראו PRODUCTION.md)</span>
              </span>
            )}
            {workspace.chat && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-secondary/10 text-secondary rounded-full px-3 py-1">
                <span className="material-symbols-outlined text-[14px]">forum</span>
                <span>התראות Google Chat פעילות</span>
              </span>
            )}
          </div>
        )}
      </header>

      {/* KPI row (14.5) */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6" aria-label="Lead KPIs">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-outline-variant/50">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${k.cls}`}>
              <span className="material-symbols-outlined text-[20px]">{k.icon}</span>
            </div>
            <p className="text-2xl font-black text-primary leading-tight">{k.value}</p>
            <p className="text-[11px] text-on-surface-variant mt-0.5">{t(k.label)}</p>
          </div>
        ))}
      </section>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Lead Scoring Distribution (14.5) */}
        <section className="bg-white rounded-2xl border border-outline-variant/50 p-5">
          <h2 className="font-extrabold text-primary text-sm mb-0.5">{t("leads.chart.scoring")}</h2>
          <p className="text-[11px] text-on-surface-variant mb-4 font-light">{t("leads.chart.scoringSub")}</p>
          {(["high", "med", "low"] as ScoreBand[]).map(band => {
            const count = stats.distribution[band];
            const pct = Math.round((count / distTotal) * 100);
            const color = band === "high" ? "bg-positive-green" : band === "med" ? "bg-alert-yellow" : "bg-outline-variant";
            return (
              <div key={band} className="flex items-center gap-2 mb-2.5">
                <span className="w-10 text-xs font-bold text-primary">{t(`leads.band.${band}` as TKey)}</span>
                <div className="flex-1 bg-surface-container rounded-full h-4 overflow-hidden">
                  <div className={`h-full ${color} transition-all`} style={{ width: `${pct}%` }} />
                </div>
                <span className="w-12 text-left text-xs font-bold text-on-surface-variant">{count} · {pct}%</span>
              </div>
            );
          })}
          <p className="text-[10px] text-on-surface-variant/70 mt-3 font-light">{t("leads.slaNote")}</p>
        </section>

        {/* By source */}
        <section className="bg-white rounded-2xl border border-outline-variant/50 p-5">
          <h2 className="font-extrabold text-primary text-sm mb-4">{t("leads.chart.source")}</h2>
          {stats.bySource.map(s => (
            <div key={s.source} className="flex items-center gap-2 mb-2">
              <span className="w-28 text-xs text-primary truncate">{SOURCE_LABELS[s.source]}</span>
              <div className="flex-1 bg-surface-container rounded-full h-3 overflow-hidden">
                <div className="h-full bg-gradient-to-l from-secondary to-primary" style={{ width: `${(s.count / maxSource) * 100}%` }} />
              </div>
              <span className="w-6 text-left text-xs font-bold text-on-surface-variant">{s.count}</span>
            </div>
          ))}
        </section>

        {/* Automations (8.1) */}
        <section className="bg-white rounded-2xl border border-outline-variant/50 p-5">
          <h2 className="font-extrabold text-primary text-sm mb-0.5">{t("leads.automations.title")}</h2>
          <p className="text-[11px] text-on-surface-variant mb-3 font-light">{t("leads.automations.sub")}</p>
          <ul className="space-y-2">
            {LEAD_AUTOMATIONS.map(a => (
              <li key={a.id} className="flex items-start gap-2 text-xs">
                <span className="mt-0.5 w-7 h-5 rounded bg-secondary/10 text-secondary font-mono font-bold flex items-center justify-center shrink-0">{a.id}</span>
                <div className="min-w-0">
                  <p className="font-bold text-primary leading-tight">{a.name}</p>
                  <p className="text-on-surface-variant font-light leading-snug">{a.trigger} → {a.action}</p>
                </div>
                <span className="ms-auto shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-positive-green/10 text-positive-green font-bold">{t("leads.automations.active")}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* R3 — AI email intake */}
      <section className="bg-gradient-to-l from-primary to-tertiary rounded-3xl p-[1px] mb-6">
        <div className="bg-white rounded-3xl p-5 md:p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-secondary">robot_2</span>
            <h2 className="font-extrabold text-primary">{t("leads.intake.title")}</h2>
          </div>
          <p className="text-xs text-on-surface-variant mb-4 font-light">{t("leads.intake.sub")}</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <textarea
                value={emailText}
                onChange={e => setEmailText(e.target.value)}
                placeholder={t("leads.intake.placeholder")}
                rows={8}
                dir="auto"
                className="w-full bg-surface-container border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-secondary focus:outline-none resize-y"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={analyze}
                  disabled={analyzing || !emailText.trim()}
                  className="shine shine-glow bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-secondary transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">{analyzing ? "hourglass_top" : "auto_awesome"}</span>
                  <span>{analyzing ? t("leads.intake.analyzing") : t("leads.intake.analyze")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setEmailText(EXAMPLE_EMAIL); setParsed(null); setIntakeMsg(""); }}
                  className="shine text-sm text-secondary font-semibold px-3 py-2 rounded-full hover:bg-secondary/5"
                >
                  {t("leads.intake.example")}
                </button>
              </div>
            </div>
            <div>
              {parsed ? (
                <div className="bg-surface-container rounded-2xl p-4 text-sm">
                  <p className="font-extrabold text-primary mb-2">{t("leads.intake.resultTitle")}</p>
                  <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                    <dt className="text-on-surface-variant">{t("ai.lead.first")} + {t("ai.lead.last")}</dt>
                    <dd className="font-bold text-primary">{parsed.firstName} {parsed.lastName} {!parsed.firstName && "—"}</dd>
                    <dt className="text-on-surface-variant">{t("footer.email")}</dt>
                    <dd className="font-bold text-primary" dir="ltr">{parsed.email || "—"}</dd>
                    <dt className="text-on-surface-variant">{t("footer.phone")}</dt>
                    <dd className="font-bold text-primary" dir="ltr">{parsed.phone || "—"}</dd>
                    <dt className="text-on-surface-variant">{t("leads.col.family")}</dt>
                    <dd className="font-bold text-primary">{familyDef(parsed.family).he}</dd>
                    <dt className="text-on-surface-variant">{t("leads.intake.confidence")}</dt>
                    <dd className="font-bold text-primary">{parsed.familyConfidence}%</dd>
                    <dt className="text-on-surface-variant">{t("leads.estValue")}</dt>
                    <dd className="font-bold text-primary">{parsed.estimatedValue > 0 ? `₪${parsed.estimatedValue.toLocaleString()}` : "—"}</dd>
                  </dl>
                  {parsed.matchedKeywords.length > 0 && (
                    <p className="text-[11px] text-on-surface-variant mt-2">
                      {t("leads.intake.keywords")}: {parsed.matchedKeywords.map((k, i) => (
                        <span key={i} className="inline-block bg-secondary/10 text-secondary rounded-full px-2 py-0.5 mx-0.5 font-semibold">{k}</span>
                      ))}
                    </p>
                  )}
                  {parsed.intent === "support" && (
                    <p className="text-[11px] text-alert-yellow font-semibold mt-2">⚠️ {t("leads.intake.supportIntent")}</p>
                  )}
                  <button
                    type="button"
                    onClick={createFromEmail}
                    className="shine mt-3 bg-positive-green text-white px-4 py-2 rounded-full text-xs font-bold hover:opacity-90 flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">person_add</span>
                    <span>{t("leads.intake.createLead")}</span>
                  </button>
                </div>
              ) : (
                <div className="h-full min-h-[140px] bg-surface-container/50 border border-dashed border-outline-variant rounded-2xl flex items-center justify-center p-6">
                  {intakeMsg === "created" ? (
                    <p className="text-sm font-bold text-positive-green text-center">{t("leads.intake.created")}</p>
                  ) : intakeMsg === "missing" ? (
                    <p className="text-sm font-bold text-error-red text-center">{t("leads.intake.missingMin")}</p>
                  ) : (
                    <span className="material-symbols-outlined text-[40px] text-outline-variant">mark_email_unread</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Leads table */}
      <section className="bg-white rounded-3xl border border-outline-variant/50 p-5 md:p-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <h2 className="text-lg font-extrabold text-primary">{t("leads.chart.status")}</h2>
          <div className="flex items-center gap-1.5 flex-wrap">
            {(["all", "new", "working", "noResponse", "converted", "unqualified"] as const).map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setStatusFilter(f)}
                className={`shine px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  statusFilter === f ? "bg-primary text-white" : "bg-surface-container text-primary hover:bg-outline-variant/30"
                }`}
              >
                {f === "all" ? t("leads.filter.all") : t(STATUS_KEY[f])}
                {f !== "all" && <span className="opacity-70"> · {stats.byStatus[f]}</span>}
              </button>
            ))}
            <button
              type="button"
              onClick={() => { setLeads(resetLeads()); setExpanded(null); }}
              className="shine px-3 py-1.5 rounded-full text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
            >
              {t("leads.reset")}
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-on-surface-variant text-center py-8">{t("leads.empty")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[860px]">
              <thead>
                <tr className="text-right text-xs text-on-surface-variant border-b border-outline-variant/50">
                  <th className="py-2 pe-2 font-semibold">{t("leads.col.lead")}</th>
                  <th className="py-2 pe-2 font-semibold">{t("leads.col.family")}</th>
                  <th className="py-2 pe-2 font-semibold">{t("leads.col.source")}</th>
                  <th className="py-2 pe-2 font-semibold">{t("leads.col.score")}</th>
                  <th className="py-2 pe-2 font-semibold">{t("leads.col.status")}</th>
                  <th className="py-2 pe-2 font-semibold">{t("leads.col.assignee")}</th>
                  <th className="py-2 pe-2 font-semibold">{t("leads.col.age")}</th>
                  <th className="py-2 font-semibold">{t("leads.col.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(lead => {
                  const fam = familyDef(lead.family);
                  const breach = isSlaBreached(lead);
                  const breakdown = scoreLead(lead.family, lead.estimatedValue, lead.source);
                  const isOpen = expanded === lead.id;
                  return (
                    <FragmentRow
                      key={lead.id}
                      lead={lead} fam={fam} breach={breach} breakdown={breakdown} isOpen={isOpen}
                      t={t}
                      onToggle={() => setExpanded(isOpen ? null : lead.id)}
                      onTouch={() => setLeads([...touchLead(lead.id)])}
                      onQualify={() => setLeads([...setLeadStatus(lead.id, "qualified")])}
                      onDisqualify={() => setLeads([...setLeadStatus(lead.id, "unqualified")])}
                      onReEngage={() => setLeads([...reEngageLead(lead.id)])}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

// Row + expandable detail (score breakdown per A3, timeline, conversion info)
function FragmentRow({ lead, fam, breach, breakdown, isOpen, t, onToggle, onTouch, onQualify, onDisqualify, onReEngage }: {
  lead: Lead;
  fam: ReturnType<typeof familyDef>;
  breach: boolean;
  breakdown: ReturnType<typeof scoreLead>;
  isOpen: boolean;
  t: (k: TKey) => string;
  onToggle: () => void;
  onTouch: () => void;
  onQualify: () => void;
  onDisqualify: () => void;
  onReEngage: () => void;
}) {
  const open = lead.status === "new" || lead.status === "working" || lead.status === "noResponse";
  return (
    <>
      <tr className={`border-b border-outline-variant/30 hover:bg-surface-container/40 transition-colors ${breach ? "bg-error-red/[0.03]" : ""}`}>
        <td className="py-2.5 pe-2">
          <p className="font-bold text-primary leading-tight">{lead.firstName} {lead.lastName}</p>
          <p className="text-[11px] text-on-surface-variant truncate max-w-[180px]">{lead.organization || lead.email || lead.phone}</p>
        </td>
        <td className="py-2.5 pe-2">
          <span className="inline-flex items-center gap-1 text-xs text-primary">
            <span className="material-symbols-outlined text-[16px] text-secondary">{fam.icon}</span>
            <span className="truncate max-w-[130px]">{fam.he}</span>
          </span>
        </td>
        <td className="py-2.5 pe-2 text-xs text-on-surface-variant whitespace-nowrap">{SOURCE_LABELS[lead.source]}</td>
        <td className="py-2.5 pe-2">
          <span className={`inline-flex items-center gap-1 border rounded-full px-2 py-0.5 text-xs font-black ${BAND_STYLE[lead.band]}`}>
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            {lead.score}
          </span>
        </td>
        <td className="py-2.5 pe-2">
          <span className={`text-[11px] font-bold rounded-full px-2 py-0.5 whitespace-nowrap ${STATUS_STYLE[lead.status]}`}>
            {t(STATUS_KEY[lead.status])}
          </span>
          {breach && (
            <span className="block text-[10px] text-error-red font-bold mt-0.5">⚠ {t("leads.sla.breach")}</span>
          )}
        </td>
        <td className="py-2.5 pe-2 text-xs text-primary whitespace-nowrap">{lead.assignee}</td>
        <td className="py-2.5 pe-2 text-[11px] text-on-surface-variant whitespace-nowrap">{leadAgeLabel(lead)}</td>
        <td className="py-2.5">
          <div className="flex items-center gap-1">
            {open && (
              <>
                <button type="button" onClick={onTouch} className="shine w-7 h-7 rounded-full bg-surface-container hover:bg-secondary/10 flex items-center justify-center" data-tooltip={t("leads.action.touch")} aria-label={t("leads.action.touch")}>
                  <span className="material-symbols-outlined text-[16px] text-secondary">call</span>
                </button>
                <button type="button" onClick={onQualify} className="shine w-7 h-7 rounded-full bg-surface-container hover:bg-positive-green/10 flex items-center justify-center" data-tooltip={t("leads.action.qualify")} aria-label={t("leads.action.qualify")}>
                  <span className="material-symbols-outlined text-[16px] text-positive-green">task_alt</span>
                </button>
                <button type="button" onClick={onReEngage} className="shine w-7 h-7 rounded-full bg-surface-container hover:bg-alert-yellow/10 flex items-center justify-center" data-tooltip={t("leads.action.reEngage")} aria-label={t("leads.action.reEngage")}>
                  <span className="material-symbols-outlined text-[16px] text-alert-yellow">notifications_active</span>
                </button>
                <button type="button" onClick={onDisqualify} className="shine w-7 h-7 rounded-full bg-surface-container hover:bg-error-red/10 flex items-center justify-center" data-tooltip={t("leads.action.disqualify")} aria-label={t("leads.action.disqualify")}>
                  <span className="material-symbols-outlined text-[16px] text-error-red">person_off</span>
                </button>
              </>
            )}
            <button type="button" onClick={onToggle} className="shine w-7 h-7 rounded-full bg-surface-container hover:bg-primary/10 flex items-center justify-center" data-tooltip={t("leads.action.details")} aria-label={t("leads.action.details")} aria-expanded={isOpen}>
              <span className="material-symbols-outlined text-[16px] text-primary">{isOpen ? "expand_less" : "expand_more"}</span>
            </button>
          </div>
        </td>
      </tr>
      {isOpen && (
        <tr className="bg-surface-container/30 border-b border-outline-variant/30">
          <td colSpan={8} className="p-4">
            <div className="grid md:grid-cols-3 gap-4 text-xs">
              <div>
                <p className="font-extrabold text-primary mb-2">{t("leads.score.breakdown")}</p>
                {[
                  { label: t("leads.score.serviceType"), val: breakdown.serviceType, max: 30 },
                  { label: t("leads.score.scope"), val: breakdown.scope, max: 40 },
                  { label: t("leads.score.sourceFactor"), val: breakdown.source, max: 30 }
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1.5">
                    <span className="w-16 text-on-surface-variant">{f.label}</span>
                    <div className="flex-1 bg-white rounded-full h-2.5 overflow-hidden border border-outline-variant/30">
                      <div className="h-full bg-gradient-to-l from-secondary to-primary" style={{ width: `${(f.val / f.max) * 100}%` }} />
                    </div>
                    <span className="w-12 text-left font-bold text-primary">{f.val}/{f.max}</span>
                  </div>
                ))}
                <p className="text-on-surface-variant mt-2">
                  {t("leads.estValue")}: <strong className="text-primary">{lead.estimatedValue > 0 ? `₪${lead.estimatedValue.toLocaleString()}` : "—"}</strong>
                  {lead.campaign && <> · {t("leads.campaignLabel")}: <strong className="text-primary">{lead.campaign}</strong></>}
                </p>
                {lead.interest && <p className="text-on-surface-variant mt-1">💬 {lead.interest}</p>}
                {lead.convertedTo && (
                  <p className="mt-2 bg-positive-green/10 text-positive-green rounded-xl px-3 py-2 font-semibold">
                    {t("leads.converted.to")} {lead.convertedTo.account} · {lead.convertedTo.opportunity}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <p className="font-extrabold text-primary mb-2">{t("leads.timeline")}</p>
                <ol className="space-y-1.5 max-h-44 overflow-y-auto pe-1">
                  {[...lead.events].reverse().map((ev, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" aria-hidden="true" />
                      <span className="text-on-surface-variant leading-snug">
                        <time className="font-mono text-[10px] text-on-surface-variant/70 me-1">
                          {new Date(ev.at).toLocaleString("he-IL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                        </time>
                        {ev.note}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

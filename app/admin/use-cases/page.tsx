"use client";

import { useLanguage } from "@/lib/LanguageContext";
import type { TKey } from "@/lib/i18n";

interface UseCase {
  id: number;
  titleKey: TKey;
  personaKey: TKey;
  steps: TKey[];
  icon: string;
  iconClasses: string;
}

const USE_CASES: UseCase[] = [
  {
    id: 1,
    titleKey: "uc.uc1.title",
    personaKey: "uc.uc1.persona",
    steps: ["uc.uc1.step1", "uc.uc1.step2", "uc.uc1.step3", "uc.uc1.step4", "uc.uc1.step5"],
    icon: "supervisor_account",
    iconClasses: "bg-primary/10 text-primary"
  },
  {
    id: 2,
    titleKey: "uc.uc2.title",
    personaKey: "uc.uc2.persona",
    steps: ["uc.uc2.step1", "uc.uc2.step2", "uc.uc2.step3", "uc.uc2.step4"],
    icon: "support_agent",
    iconClasses: "bg-secondary/10 text-secondary"
  },
  {
    id: 3,
    titleKey: "uc.uc3.title",
    personaKey: "uc.uc3.persona",
    steps: ["uc.uc3.step1", "uc.uc3.step2", "uc.uc3.step3", "uc.uc3.step4", "uc.uc3.step5"],
    icon: "person",
    iconClasses: "bg-positive-green/10 text-positive-green"
  },
  {
    id: 4,
    titleKey: "uc.uc4.title",
    personaKey: "uc.uc4.persona",
    steps: ["uc.uc4.step1", "uc.uc4.step2", "uc.uc4.step3", "uc.uc4.step4"],
    icon: "engineering",
    iconClasses: "bg-alert-yellow/10 text-alert-yellow"
  },
  {
    id: 5,
    titleKey: "uc.uc5.title",
    personaKey: "uc.uc5.persona",
    steps: ["uc.uc5.step1", "uc.uc5.step2", "uc.uc5.step3", "uc.uc5.step4", "uc.uc5.step5"],
    icon: "account_balance",
    iconClasses: "bg-tertiary/10 text-tertiary"
  }
];

export default function UseCasesPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">{t("uc.title")}</h1>
        <p className="text-sm text-on-surface-variant max-w-3xl">{t("uc.subtitle")}</p>
      </header>

      <div className="space-y-4">
        {USE_CASES.map((uc) => (
          <article key={uc.id} className="bg-white rounded-2xl border border-outline-variant/50 overflow-hidden">
            <header className="px-5 py-4 border-b border-outline-variant/50 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${uc.iconClasses}`}>
                <span className="material-symbols-outlined">{uc.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] uppercase tracking-widest font-bold text-secondary/70 mb-0.5">
                  {t("uc.persona")} #{uc.id}
                </p>
                <h2 className="text-base font-extrabold text-primary leading-tight">{t(uc.titleKey)}</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">{t(uc.personaKey)}</p>
              </div>
            </header>
            <ol className="p-5 space-y-2">
              {uc.steps.map((stepKey, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary/10 text-secondary text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-on-surface leading-relaxed pt-0.5">{t(stepKey)}</p>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}

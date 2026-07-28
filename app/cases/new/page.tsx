"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const MAX_BYTES = 25 * 1024 * 1024;

export default function NewCasePage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [urgency, setUrgency] = useState("regular");
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  // Requester personal details (return address)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileErr, setFileErr] = useState("");
  const [err, setErr] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    setFileErr("");
    const incoming = Array.from(list);
    const combined = [...files, ...incoming];
    const total = combined.reduce((s, f) => s + f.size, 0);
    if (total > MAX_BYTES) { setFileErr("סך הקבצים חורג מ-25MB. הסירו קובץ ונסו שוב."); return; }
    setFiles(combined);
  };
  const removeFile = (i: number) => setFiles(files.filter((_, idx) => idx !== i));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || (!email.trim() && !phone.trim())) {
      setErr("יש למלא שם מלא וכתובת מייל או טלפון לחזרה.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setErr("");
    // Route the inquiry to the leads pipeline with the requester's contact
    const [firstName, ...rest] = fullName.trim().split(" ");
    try {
      await fetch("/api/leads", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: `case-${Date.now().toString(36)}`,
          firstName, lastName: rest.join(" ") || "-", email: email.trim(), phone: phone.trim(),
          familyLabel: "פניית שירות", sourceLabel: "טופס פנייה",
          interest: `[${type || "כללי"}] ${subject} — ${description}${files.length ? ` (${files.length} קבצים מצורפים)` : ""}`,
          assignee: type === "professional" || type === "order" ? "אגף שיווק ומכירות" : "מוקד השירות",
          queue: "שירות"
        })
      });
    } catch { /* offline/demo — still confirm to the user */ }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="bg-surface min-h-screen">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-20">
          <div className="bg-white rounded-3xl p-10 md:p-16 text-center border border-outline-variant/50 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-positive-green/10 rounded-full mx-auto mb-6 flex items-center justify-center animate-fade-in">
              <span className="material-symbols-outlined text-[64px] text-positive-green">
                task_alt
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-primary mb-4">{t("case.receivedTitle")}</h1>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              {t("case.caseNum")} <span className="font-mono font-bold text-primary">CAS-2026-{Math.floor(Math.random() * 9000) + 1000}</span>
              <br />
              {t("case.respondTime")}
            </p>
            <div className="bg-surface-container rounded-2xl p-4 mb-8 text-center">
              <p className="text-sm font-bold text-primary mb-2">{t("case.whatNextEmoji")}</p>
              <ul className="text-sm text-on-surface-variant space-y-1 list-disc pr-5">
                <li>{t("case.next1")}</li>
                <li>{t("case.next2")}</li>
                <li>{t("case.next3")}</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row-reverse gap-3 justify-center">
              <Link
                href="/dashboard"
                className="shine shine-glow bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-secondary transition-colors"
                data-tooltip={t("case.backToDash")}
                data-tooltip-position="bottom"
              >
                {t("case.backToDash")}
              </Link>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="shine text-primary font-bold hover:underline px-3 py-2 rounded"
                data-tooltip={t("case.openAnother")}
                data-tooltip-position="bottom"
              >
                {t("case.openAnother")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-primary text-white">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
          <nav aria-label={t("nav.skipToContent")} className="text-sm text-white/70 mb-4">
            <ol className="flex flex-row-reverse items-center gap-2">
              <li>
                <Link href="/dashboard" className="hover:text-white">{t("nav.dashboard")}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-bold">{t("case.crumb")}</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{t("case.titleHero")}</h1>
          <p className="text-white/70">{t("case.intro3")}</p>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10 grid lg:grid-cols-3 gap-8">
        <aside className="bg-white rounded-3xl p-6 border border-outline-variant/50 lg:col-span-1 self-start">
          <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2 justify-center">
            <span>{t("case.needHelpQ")}</span>
            <span className="material-symbols-outlined text-secondary">support_agent</span>
          </h2>
          <div className="space-y-4 text-center">
            <div>
              <p className="text-xs text-on-surface-variant mb-1">{t("case.hoursEmoji")}</p>
              <p className="text-sm font-medium">{t("case.hoursWeek")}</p>
              <p className="text-sm font-medium">{t("case.hoursFri")}</p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant mb-1">{t("case.phoneEmoji")}</p>
              <p className="text-sm font-bold text-secondary">*6274</p>
              <p className="text-sm text-on-surface-variant">{t("help.callNumber")}</p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant mb-1">{t("case.emailEmoji")}</p>
              <a
                href="mailto:service@mapi.gov.il"
                className="text-sm font-bold text-secondary hover:underline"
              >
                service@mapi.gov.il
              </a>
            </div>
            <div className="border-t border-outline-variant pt-4">
              <p className="text-xs text-on-surface-variant mb-2">{t("case.autoEmoji")}</p>
              <button
                type="button"
                className="shine text-sm bg-secondary/10 text-secondary px-4 py-2 rounded-full font-bold hover:bg-secondary hover:text-white transition-colors flex items-center gap-2"
                data-tooltip={t("case.openSmartChatTip")}
                data-tooltip-position="bottom"
              >
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                <span>{t("case.openSmartChat")}</span>
              </button>
            </div>
          </div>
        </aside>

        <form
          onSubmit={onSubmit}
          className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/50"
        >
          <h2 className="text-xl font-extrabold text-primary mb-6 text-center">{t("case.details")}</h2>
          {err && (
            <p className="text-sm text-error-red bg-error-red/5 border border-error-red/20 rounded-xl px-4 py-2.5 mb-4 text-center" role="alert">{err}</p>
          )}
          <div className="space-y-5">
            {/* Requester personal details — so we can reply */}
            <div className="bg-gold-tint/40 border border-gold/25 rounded-2xl p-4">
              <p className="lux-label text-center mb-3">פרטי הפונה (כתובת לחזרה)</p>
              <div className="space-y-3">
                <div>
                  <label htmlFor="req-name" className="block text-xs font-bold text-primary mb-1.5">שם מלא <span className="text-error-red">*</span></label>
                  <input id="req-name" type="text" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="שם פרטי ומשפחה"
                    className="w-full bg-white border border-outline-variant rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-gold/50 focus:outline-none"
                    data-tooltip="שמכם המלא, כדי שנוכל לפנות אליכם בשם." />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="req-email" className="block text-xs font-bold text-primary mb-1.5">דוא"ל לחזרה</label>
                    <input id="req-email" type="email" value={email} onChange={e => setEmail(e.target.value)} dir="ltr" placeholder="name@example.com"
                      className="w-full bg-white border border-outline-variant rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-gold/50 focus:outline-none"
                      data-tooltip="כתובת הדואל שאליה נשיב לפנייתכם (דואל או טלפון — לפחות אחד)." />
                  </div>
                  <div>
                    <label htmlFor="req-phone" className="block text-xs font-bold text-primary mb-1.5">טלפון</label>
                    <input id="req-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} dir="ltr" placeholder="050-0000000"
                      className="w-full bg-white border border-outline-variant rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-gold/50 focus:outline-none"
                      data-tooltip="מספר טלפון ליצירת קשר (דואל או טלפון — לפחות אחד)." />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-bold text-primary mb-2 text-center">
                {t("case.type")} <span className="text-error-red">*</span>
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none"
              >
                <option value="">{t("case.typePlaceholder")}</option>
                <option value="technical">{t("case.type.tech")}</option>
                <option value="professional">{t("case.type.pro")}</option>
                <option value="order">{t("case.type.order")}</option>
                <option value="financial">{t("case.type.finance")}</option>
                <option value="suggestion">{t("case.type.suggestion")}</option>
              </select>
            </div>

            <div>
              <label htmlFor="related-order" className="block text-sm font-bold text-primary mb-2 text-center">
                {t("case.relatedLabel")}
              </label>
              <select
                id="related-order"
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none"
              >
                <option value="">{t("case.relatedPlaceholder2")}</option>
                <option>{t("case.mockOrder1")}</option>
                <option>{t("case.mockOrder2")}</option>
                <option>{t("case.mockOrder3")}</option>
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-bold text-primary mb-2 text-center">
                {t("case.subject")} <span className="text-error-red">*</span>
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                placeholder={t("case.titlePlaceholder")}
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-primary mb-2 text-center">
                {t("case.description")} <span className="text-error-red">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                placeholder={t("case.descPlaceholder")}
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-secondary focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-2 text-center">
                {t("case.attachLabel")}
              </label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="sr-only"
                onChange={e => { addFiles(e.target.files); e.target.value = ""; }}
                aria-label={t("case.chooseFiles")}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); }}
                onDrop={e => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
                className="border-2 border-dashed border-outline-variant rounded-xl p-6 text-center hover:border-gold cursor-pointer transition-colors"
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); } }}
                data-tooltip="גרירת קבצים לכאן או לחיצה לבחירה מהמחשב. ניתן לצרף מספר קבצים (תמונות, PDF, מסמכים) עד 25MB בסך הכל."
              >
                <span className="material-symbols-outlined text-[40px] text-gold-dark mb-2" aria-hidden="true">upload_file</span>
                <p className="text-sm text-on-surface-variant">
                  {t("case.dropFiles")}{" "}
                  <span className="text-gold-dark font-bold underline">{t("case.chooseFiles")}</span>
                </p>
                <p className="text-xs text-on-surface-variant mt-1">{t("case.attachMax")}</p>
              </div>
              {fileErr && <p className="text-xs text-error-red text-center mt-2">{fileErr}</p>}
              {files.length > 0 && (
                <ul className="mt-3 space-y-2" aria-label="קבצים מצורפים">
                  {files.map((f, i) => (
                    <li key={i} className="flex items-center justify-between gap-2 bg-surface-container rounded-xl px-3 py-2">
                      <span className="flex items-center gap-2 min-w-0">
                        <span className="material-symbols-outlined text-[18px] text-gold-dark flex-shrink-0" aria-hidden="true">description</span>
                        <span className="text-sm text-primary truncate">{f.name}</span>
                        <span className="text-[11px] text-on-surface-variant flex-shrink-0">({(f.size / 1024 / 1024).toFixed(2)}MB)</span>
                      </span>
                      <button type="button" onClick={() => removeFile(i)} className="shine w-7 h-7 rounded-full hover:bg-error-red/10 hover:text-error-red text-on-surface-variant flex items-center justify-center flex-shrink-0" aria-label={`הסרת ${f.name}`} data-tooltip="הסרת הקובץ מהפנייה">
                        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">close</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <fieldset>
              <legend className="block text-sm font-bold text-primary mb-2 text-center">
                {t("case.urgencyLabel")}
              </legend>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: "regular", label: t("case.regular"), color: "text-positive-green" },
                  { id: "urgent", label: t("case.urgent"), color: "text-alert-yellow" },
                  { id: "critical", label: t("case.critical"), color: "text-error-red" }
                ].map((u) => (
                  <label
                    key={u.id}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl cursor-pointer border transition-all ${
                      urgency === u.id
                        ? "border-secondary bg-secondary/5 ring-2 ring-secondary"
                        : "border-outline-variant hover:border-secondary"
                    }`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={u.id}
                      checked={urgency === u.id}
                      onChange={() => setUrgency(u.id)}
                      className="sr-only"
                    />
                    <span className={`font-bold ${u.color}`}>●</span>
                    <span>{u.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="flex flex-row-reverse items-center justify-between mt-8 pt-6 border-t border-outline-variant">
            <Link
              href="/dashboard"
              className="shine text-on-surface-variant font-bold hover:text-primary transition-colors px-3 py-2 rounded-lg"
              data-tooltip={t("case.cancelTip")}
              data-tooltip-position="bottom"
            >
              {t("case.cancelLabel")}
            </Link>
            <button
              type="submit"
              className="shine shine-glow bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary transition-colors flex items-center gap-2"
              data-tooltip={t("case.submitTip")}
              data-tooltip-position="bottom"
            >
              <span className="material-symbols-outlined">send</span>
              {t("case.submitBtn")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

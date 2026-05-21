"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { services } from "@/lib/data";

type Step = 1 | 2 | 3 | 4;

const stepLabels: Record<Step, string> = {
  1: "פרטי הבקשה",
  2: 'סימון אזור',
  3: 'אישור והצעת מחיר',
  4: 'תשלום'
};

export default function OrderPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const service = services.find((s) => s.slug === params.slug);

  const [step, setStep] = useState<Step>(1);
  const [size, setSize] = useState("A2");
  const [includeOrthophoto, setIncludeOrthophoto] = useState(true);
  const [delivery, setDelivery] = useState("digital");
  const [purpose, setPurpose] = useState("");
  const [areaMarked, setAreaMarked] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptQuote, setAcceptQuote] = useState(false);

  const price = useMemo(() => {
    if (!service) return 0;
    if (service.priceTable && service.priceTable.length > 0) {
      const row = service.priceTable.find((r) => r.label.startsWith(size));
      if (row) return includeOrthophoto && row.with ? row.with : row.without;
    }
    return service.priceFrom;
  }, [service, size, includeOrthophoto]);

  const shippingCost = delivery === "physical" || delivery === "both" ? 39 : 0;
  const totalPrice = price + shippingCost;

  if (!service) {
    return (
      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-20 text-center">
        <h1 className="text-3xl font-bold text-primary">שירות לא נמצא</h1>
        <Link href="/catalog" className="text-secondary underline mt-4 inline-block">
          חזרה לקטלוג
        </Link>
      </div>
    );
  }

  if (!service.inScope) {
    return (
      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-20 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">שירות זה אינו בתכולת הפורטל</h1>
        <p className="text-on-surface-variant mb-6">
          הזמנת השירות מתבצעת באמצעות מערכת govforms.
        </p>
        <a
          href={service.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-alert-yellow text-white px-8 py-4 rounded-full font-bold inline-flex items-center gap-2"
        >
          <span>פתח טופס</span>
          <span className="material-symbols-outlined">open_in_new</span>
        </a>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-8">
          <nav aria-label="ניווט נתיב" className="text-sm text-white/70 mb-4">
            <ol className="flex flex-row-reverse items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-white">דף הבית</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/catalog/${service.slug}`} className="hover:text-white">
                  {service.name}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-bold">הזמנה</li>
            </ol>
          </nav>
          <h1 className="text-2xl md:text-3xl font-extrabold">הזמנת {service.name}</h1>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-outline-variant sticky top-20 z-30">
        <div className="max-w-container-max-width mx-auto px-3 md:px-margin-desktop py-3 md:py-4">
          {/* Mobile compact view */}
          <div className="md:hidden flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-on-surface-variant">
              שלב {step} מתוך 4
            </span>
            <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-l from-positive-green to-secondary transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-primary truncate max-w-[120px]">
              {stepLabels[step]}
            </span>
          </div>

          {/* Desktop full step indicator */}
          <ol className="hidden md:flex flex-row-reverse items-center justify-between gap-4">
            <li className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-positive-green text-white flex items-center justify-center text-sm font-bold">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </span>
              <span className="text-sm font-bold text-positive-green">הזדהות</span>
            </li>
            {([1, 2, 3, 4] as Step[]).map((s) => {
              const isCurrent = s === step;
              const isComplete = s < step;
              return (
                <li key={s} className="flex items-center gap-2 flex-1">
                  <div className="flex-1 h-px bg-outline-variant relative">
                    <div
                      className={`absolute inset-0 transition-all ${
                        isComplete ? "bg-positive-green" : ""
                      }`}
                    />
                  </div>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      isComplete
                        ? "bg-positive-green text-white"
                        : isCurrent
                        ? "bg-secondary text-white"
                        : "bg-surface-container text-on-surface-variant"
                    }`}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {isComplete ? (
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    ) : (
                      s
                    )}
                  </span>
                  <span
                    className={`hidden lg:inline text-sm whitespace-nowrap ${
                      isCurrent ? "font-bold text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    {stepLabels[s]}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop py-10">
        {step === 1 && (
          <div className="grid lg:grid-cols-3 gap-8">
            <aside className="bg-secondary/5 rounded-3xl p-6 border border-secondary/20 lg:col-span-1">
              <h2 className="text-lg font-extrabold text-primary mb-3 flex items-center gap-2 justify-end">
                <span>שלב 1: פרטי הבקשה</span>
                <span className="material-symbols-outlined text-secondary">info</span>
              </h2>
              <p className="text-sm text-on-surface-variant text-right leading-relaxed">
                בשלב זה תזין את הפרטים הבסיסיים של ההזמנה - גודל המפה, אם תרצה לכלול
                אורתופוטו, ואופן האספקה.
                <br />
                <br />
                כל השדות המסומנים בכוכבית (*) הם חובה.
              </p>
            </aside>
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/50">
              <h3 className="text-xl font-extrabold text-primary mb-6 text-right">
                פרטי הבקשה הבסיסיים
              </h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="size" className="block text-sm font-bold text-primary mb-2 text-right">
                    גודל מפה <span className="text-error-red">*</span>
                  </label>
                  <select
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-right focus:ring-2 focus:ring-secondary focus:outline-none"
                  >
                    {service.priceTable?.map((row) => {
                      const sizeKey = row.label.split(" ")[0];
                      return (
                        <option key={sizeKey} value={sizeKey}>
                          {row.label} - ₪{row.without} {row.with ? `/ עם אורתופוטו ₪${row.with}` : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <fieldset>
                  <legend className="block text-sm font-bold text-primary mb-2 text-right">
                    כלול אורתופוטו? <span className="text-error-red">*</span>
                  </legend>
                  <div className="flex flex-row-reverse gap-4">
                    {[true, false].map((val) => (
                      <label
                        key={String(val)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl cursor-pointer border transition-all ${
                          includeOrthophoto === val
                            ? "border-secondary bg-secondary/5 ring-2 ring-secondary"
                            : "border-outline-variant hover:border-secondary"
                        }`}
                      >
                        <input
                          type="radio"
                          name="orthophoto"
                          checked={includeOrthophoto === val}
                          onChange={() => setIncludeOrthophoto(val)}
                          className="sr-only"
                        />
                        <span className="font-bold">{val ? "כן" : "לא"}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="block text-sm font-bold text-primary mb-2 text-right">
                    אופן אספקה <span className="text-error-red">*</span>
                  </legend>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { id: "digital", label: "קובץ דיגיטלי", icon: "download" },
                      { id: "physical", label: "משלוח בדואר", icon: "local_shipping" },
                      { id: "both", label: "שניהם", icon: "all_inclusive" }
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl cursor-pointer border transition-all ${
                          delivery === opt.id
                            ? "border-secondary bg-secondary/5 ring-2 ring-secondary"
                            : "border-outline-variant hover:border-secondary"
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          checked={delivery === opt.id}
                          onChange={() => setDelivery(opt.id)}
                          className="sr-only"
                        />
                        <span className="material-symbols-outlined text-secondary text-[20px]">
                          {opt.icon}
                        </span>
                        <span className="text-sm font-medium">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="purpose" className="block text-sm font-bold text-primary mb-2 text-right">
                    מטרת השימוש (אופציונלי)
                  </label>
                  <textarea
                    id="purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    rows={3}
                    placeholder="לדוגמה: תכנון פרויקט בניה, מחקר אקדמי..."
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-right focus:ring-2 focus:ring-secondary focus:outline-none resize-none"
                  />
                </div>
              </div>
              <div className="flex flex-row-reverse items-center justify-between mt-8 pt-6 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => router.push(`/catalog/${service.slug}`)}
                  className="shine text-on-surface-variant font-bold hover:text-primary transition-colors px-3 py-2 rounded-lg"
                  data-tooltip="חזרה לדף השירות"
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined align-middle ml-1">arrow_forward</span>
                  חזור
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="shine shine-glow bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary transition-colors flex items-center gap-2"
                  data-tooltip="המשך לשלב 2 - סימון אזור על המפה"
                  data-tooltip-position="bottom"
                >
                  המשך
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid lg:grid-cols-3 gap-8">
            <aside className="bg-secondary/5 rounded-3xl p-6 border border-secondary/20 lg:col-span-1">
              <h2 className="text-lg font-extrabold text-primary mb-3 flex items-center gap-2 justify-end">
                <span>שלב 2: סימון אזור</span>
                <span className="material-symbols-outlined text-secondary">my_location</span>
              </h2>
              <p className="text-sm text-on-surface-variant text-right leading-relaxed mb-4">
                סמן את האזור הגיאוגרפי על המפה. השטח המסומן יחושב אוטומטית בקמ"ר.
              </p>
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-on-surface-variant mb-2 text-right">פרטי הסימון:</p>
                {areaMarked ? (
                  <>
                    <p className="text-sm font-bold text-positive-green text-right">✓ הסימון תקין</p>
                    <p className="text-xs text-on-surface-variant text-right mt-2">
                      שטח: 1.2 קמ"ר
                      <br />
                      קואורדינטות מרכז: 32.0853, 34.7818
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-on-surface-variant text-right">
                    יש לסמן אזור על המפה
                  </p>
                )}
              </div>
            </aside>
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/50">
              <h3 className="text-xl font-extrabold text-primary mb-6 text-right">
                סימון האזור על המפה (GovMap)
              </h3>

              {/* Map placeholder */}
              <div className="aspect-video bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl border-2 border-dashed border-secondary/40 relative overflow-hidden">
                <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
                <div className="absolute top-4 left-4 flex flex-col gap-1">
                  <button
                    className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"
                    aria-label="התקרב"
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                  <button
                    className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"
                    aria-label="התרחק"
                  >
                    <span className="material-symbols-outlined text-[20px]">remove</span>
                  </button>
                  <button
                    className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"
                    aria-label="מסך מלא"
                  >
                    <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                  </button>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-[64px] text-secondary/40 mb-2">
                      map
                    </span>
                    <p className="text-sm text-on-surface-variant max-w-xs">
                      [רכיב GovMap LWC מוטמע - במצב POC הצגה סכמטית]
                    </p>
                  </div>
                </div>
                {areaMarked && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-alert-yellow/30 border-2 border-alert-yellow rounded-lg animate-fade-in" />
                )}
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="חיפוש מקום (לדוגמה: רחוב, גוש וחלקה...)"
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-right focus:ring-2 focus:ring-secondary focus:outline-none pr-10"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                    search
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAreaMarked(true)}
                  className={`shine px-4 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${
                    areaMarked
                      ? "bg-positive-green text-white"
                      : "bg-secondary text-white hover:bg-secondary/90"
                  }`}
                  data-tooltip={areaMarked ? "האזור סומן ונשמר בהצלחה" : "סימון פוליגון על המפה - חישוב שטח אוטומטי"}
                  data-tooltip-position="bottom"
                >
                  {areaMarked ? (
                    <>
                      <span className="material-symbols-outlined">check</span>
                      <span>סימון נשמר</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">draw</span>
                      <span>סמן אזור</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-row-reverse items-center justify-between mt-8 pt-6 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="shine text-on-surface-variant font-bold hover:text-primary transition-colors px-3 py-2 rounded-lg"
                  data-tooltip="חזרה לשלב 1 - פרטי הבקשה"
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined align-middle ml-1">arrow_forward</span>
                  חזור
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!areaMarked}
                  className="shine shine-glow bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary transition-colors flex items-center gap-2 disabled:bg-outline-variant disabled:cursor-not-allowed disabled:hover:bg-outline-variant"
                  data-tooltip={areaMarked ? "המשך לשלב 3 - סיכום הזמנה" : "סמן אזור על המפה לפני המשך"}
                  data-tooltip-position="bottom"
                >
                  המשך
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/50">
              <h3 className="text-xl font-extrabold text-primary mb-6 text-right">
                סיכום ההזמנה שלך
              </h3>
              <ul className="space-y-3 text-right" role="list">
                {[
                  { label: "סוג שירות", value: service.name },
                  { label: "גודל מפה", value: size },
                  { label: 'אורתופוטו', value: includeOrthophoto ? "כן" : "לא" },
                  {
                    label: "אופן אספקה",
                    value:
                      delivery === "digital"
                        ? "קובץ דיגיטלי"
                        : delivery === "physical"
                        ? "משלוח בדואר"
                        : "שניהם"
                  },
                  { label: 'אזור', value: '1.2 קמ"ר במרכז תל אביב' },
                  { label: "מזמין", value: "יוסי כהן | 012345678" }
                ].map((row, i) => (
                  <li key={i} className="flex flex-row-reverse items-center justify-between py-2 border-b border-outline-variant/30">
                    <span className="text-on-surface-variant text-sm">{row.label}</span>
                    <span className="font-bold text-primary">
                      <span className="material-symbols-outlined text-positive-green text-[18px] align-middle ml-2">
                        check_circle
                      </span>
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="shine flex-1 bg-surface-container hover:bg-surface-container-high text-primary px-4 py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-1"
                  data-tooltip="חזרה לשלב 1 - עריכת פרטי הבקשה"
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  ערוך פרטים
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="shine flex-1 bg-surface-container hover:bg-surface-container-high text-primary px-4 py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-1"
                  data-tooltip="חזרה לשלב 2 - עריכת האזור על המפה"
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  ערוך אזור
                </button>
              </div>
            </div>

            <aside className="bg-gradient-to-br from-primary to-tertiary text-white rounded-3xl p-6 md:p-8 sticky top-44">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 justify-end">
                <span>הצעת מחיר</span>
                <span className="material-symbols-outlined">request_quote</span>
              </h3>
              <div className="space-y-2 mb-4 text-right">
                <div className="flex flex-row-reverse justify-between text-sm">
                  <span className="text-white/70">
                    {service.name} {size}
                    {includeOrthophoto ? " + אורתופוטו" : ""}
                  </span>
                  <span>₪{price}</span>
                </div>
                {shippingCost > 0 && (
                  <div className="flex flex-row-reverse justify-between text-sm">
                    <span className="text-white/70">משלוח (דואר רשום)</span>
                    <span>₪{shippingCost}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-white/20 pt-4 mb-6 text-right">
                <div className="flex flex-row-reverse justify-between items-baseline">
                  <span className="text-sm font-bold">סה"כ לתשלום</span>
                  <span className="text-3xl font-black text-secondary-container">
                    ₪{totalPrice}
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-1">(כולל מע"מ)</p>
              </div>

              <div className="space-y-2 mb-6">
                <button
                  className="shine w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  data-tooltip="הורדת הצעת המחיר כקובץ PDF (DocGen)"
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  הורד הצעת מחיר PDF
                </button>
                <button
                  className="shine w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  data-tooltip="שליחת הצעת המחיר לתיבת המייל שלך"
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  שלח לעצמי במייל
                </button>
              </div>

              <p className="text-xs text-secondary-container mb-4">
                ⏱ תוקף הצעה: 30 ימים
              </p>

              <div className="space-y-3 mb-6 text-right text-sm">
                <label className="flex items-center justify-end gap-2 cursor-pointer">
                  <span>אני מאשר/ת את תנאי השימוש</span>
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-secondary"
                  />
                </label>
                <label className="flex items-center justify-end gap-2 cursor-pointer">
                  <span>אני מאשר/ת את הצעת המחיר</span>
                  <input
                    type="checkbox"
                    checked={acceptQuote}
                    onChange={(e) => setAcceptQuote(e.target.checked)}
                    className="w-4 h-4 rounded text-secondary"
                  />
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="shine px-4 py-3 rounded-xl text-white/70 font-bold hover:text-white"
                  data-tooltip="חזרה לשלב 2 - סימון אזור"
                  data-tooltip-position="bottom"
                >
                  ← חזור
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  disabled={!acceptTerms || !acceptQuote}
                  className="shine flex-1 bg-secondary hover:bg-secondary/90 text-white px-4 py-3 rounded-xl font-bold disabled:bg-white/20 disabled:cursor-not-allowed transition-colors"
                  data-tooltip={
                    !acceptTerms || !acceptQuote
                      ? "אשר את התנאים והצעת המחיר לפני התשלום"
                      : 'מעבר לשרת התשלומים הממשלתי המאובטח'
                  }
                  data-tooltip-position="bottom"
                >
                  ✓ אשר ועבור לתשלום
                </button>
              </div>
            </aside>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white rounded-3xl p-8 md:p-16 border border-outline-variant/50 max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-positive-green/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="material-symbols-outlined text-[64px] text-positive-green">
                lock
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-primary mb-4">מעבר לתשלום</h2>
            <p className="text-on-surface-variant mb-6">
              בלחיצה על הכפתור הבא תועבר/י לשרת התשלומים הממשלתי המאובטח.
              <br />
              סכום: <span className="font-bold text-primary">₪{totalPrice}</span>
            </p>
            <div className="bg-secondary/5 rounded-2xl p-4 mb-8 text-right">
              <p className="text-xs text-on-surface-variant mb-2">📌 מה יקרה אחרי?</p>
              <ol className="text-sm space-y-1 list-decimal pr-5">
                <li>תועבר/י לשרת התשלומים הממשלתי</li>
                <li>בסיום התשלום - תוחזר/י לפורטל</li>
                <li>הזמנה תיווצר אוטומטית במערכת</li>
                <li>תקבל/י אישור במייל ובסמס</li>
              </ol>
            </div>
            <div className="flex flex-col sm:flex-row-reverse gap-3">
              <Link
                href="/dashboard?paid=true"
                className="shine shine-glow flex-1 bg-positive-green text-white px-6 py-4 rounded-full font-bold hover:bg-positive-green/90 transition-colors flex items-center justify-center gap-2"
                data-tooltip='ב-POC מדמה תשלום מוצלח וחוזר ללוח הבקרה'
                data-tooltip-position="bottom"
              >
                <span className="material-symbols-outlined">payments</span>
                המשך לתשלום (סימולציה)
              </Link>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="shine px-6 py-4 rounded-full text-primary font-bold hover:bg-surface-container transition-colors"
                data-tooltip="חזרה לשלב הסיכום והצעת המחיר"
                data-tooltip-position="bottom"
              >
                ← חזור
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { cmsLogin } from "@/lib/cms";

const GOOGLE_CLIENT_ID = (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "").trim();

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          initialize: (config: { client_id: string; callback: (r: { credential: string }) => void }) => void;
          renderButton: (el: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

export default function CmsLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [gisReady, setGisReady] = useState(false);
  const googleBtnRef = useRef<HTMLDivElement>(null);

  // "Sign in with Google Workspace" — rendered only when a client id is set.
  // The ID token is verified server-side (/api/cms/google) against an
  // email allowlist before the httpOnly session cookie is issued.
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !gisReady) return;
    const gis = window.google?.accounts?.id;
    const host = googleBtnRef.current;
    if (!gis || !host) return;
    gis.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async ({ credential }) => {
        setBusy(true);
        setError(null);
        try {
          const res = await fetch("/api/cms/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential })
          });
          const data = await res.json();
          if (res.ok && data?.ok) {
            try { sessionStorage.setItem("mapi_cms_session_v2", JSON.stringify({ ...data.session, loginAt: Date.now() })); } catch { /* ignore */ }
            router.push("/cms");
            return;
          }
          setError(res.status === 403
            ? "חשבון Google זה אינו מורשה לניהול התוכן."
            : "פרטי ההתחברות שגויים. נסה שוב.");
        } catch {
          setError("שגיאת רשת. נסה שוב.");
        } finally {
          setBusy(false);
        }
      }
    });
    gis.renderButton(host, { theme: "outline", size: "large", width: 320, text: "signin_with", locale: "he" });
  }, [gisReady, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const result = await cmsLogin(email, password);
    setBusy(false);
    if (result.ok) {
      router.push("/cms");
      return;
    }
    setError(
      result.reason === "rate_limited"
        ? "בוצעו יותר מדי ניסיונות התחברות. מטעמי אבטחה יש להמתין כ-15 דקות ולנסות שוב."
        : result.reason === "network"
        ? "שגיאת רשת — בדקו את החיבור ונסו שוב."
        : "פרטי ההתחברות שגויים. נסה שוב."
    );
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary via-tertiary to-primary relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-5" aria-hidden="true" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white border border-outline-variant/50 shadow-md flex items-center justify-center overflow-hidden p-1">
            <Image src="/mapi-logo.svg" alt="מפ״י" width={64} height={64} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xl font-bold text-primary">ניהול תוכן הפורטל</h1>
          <p className="text-xs text-on-surface-variant mt-1 font-light">
            כניסה למנהלי תוכן מורשים בלבד · אגף שיווק ומכירות
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cms-email" className="block text-xs font-semibold text-primary mb-1.5">
              כתובת מייל
            </label>
            <input
              id="cms-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary focus:outline-none min-h-[48px]"
              dir="ltr"
              data-tooltip="כתובת המייל של חשבון מנהל התוכן המורשה (אותיות גדולות/קטנות לא משנות)"
              data-tooltip-position="bottom"
            />
          </div>
          <div>
            <label htmlFor="cms-password" className="block text-xs font-semibold text-primary mb-1.5">
              סיסמה
            </label>
            <div className="relative">
              <input
                id="cms-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant rounded-xl ps-4 pe-12 py-3 focus:ring-2 focus:ring-secondary focus:outline-none min-h-[48px]"
                dir="ltr"
                data-tooltip="הסיסמה רגישה לאותיות גדולות/קטנות — היעזרו בעינית כדי לוודא את ההקלדה"
                data-tooltip-position="bottom"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute end-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full hover:bg-gold-tint text-on-surface-variant hover:text-gold-dark flex items-center justify-center transition-colors"
                aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                aria-pressed={showPassword}
                data-tooltip={showPassword ? "הסתרת הסיסמה" : "הצגת הסיסמה במלואה לבדיקת ההקלדה"}
                data-tooltip-position="bottom"
                data-tooltip-edge="right"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-error-red bg-error-red/5 border border-error-red/20 rounded-xl px-4 py-2.5" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="shine shine-glow w-full bg-primary text-white py-3.5 rounded-full font-semibold hover:bg-secondary transition-colors disabled:opacity-60 flex items-center justify-center gap-2 min-h-[52px]"
          >
            <span className="material-symbols-outlined text-[20px]">{busy ? "hourglass_top" : "login"}</span>
            <span>{busy ? "מתחבר..." : "כניסה"}</span>
          </button>
        </form>

        {GOOGLE_CLIENT_ID && (
          <>
            <Script
              src="https://accounts.google.com/gsi/client"
              strategy="afterInteractive"
              onLoad={() => setGisReady(true)}
            />
            <div className="flex items-center gap-3 my-5" aria-hidden="true">
              <span className="flex-1 h-px bg-outline-variant" />
              <span className="text-[11px] text-on-surface-variant">או</span>
              <span className="flex-1 h-px bg-outline-variant" />
            </div>
            <div className="flex justify-center" ref={googleBtnRef} />
            <p className="text-[10px] text-on-surface-variant text-center mt-2 font-light">
              כניסה עם חשבון Google Workspace מורשה
            </p>
          </>
        )}

        <p className="text-[11px] text-on-surface-variant text-center mt-6 font-light">
          🔒 גישה מבוקרת. כל פעולה נרשמת ביומן השינויים.
        </p>
      </div>
    </div>
  );
}

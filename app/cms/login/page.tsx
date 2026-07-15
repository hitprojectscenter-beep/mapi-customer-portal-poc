"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cmsLogin } from "@/lib/cms";

export default function CmsLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const session = await cmsLogin(email, password);
    setBusy(false);
    if (session) {
      router.push("/cms");
    } else {
      setError("פרטי ההתחברות שגויים. נסה שוב.");
    }
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
            />
          </div>
          <div>
            <label htmlFor="cms-password" className="block text-xs font-semibold text-primary mb-1.5">
              סיסמה
            </label>
            <input
              id="cms-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-secondary focus:outline-none min-h-[48px]"
              dir="ltr"
            />
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

        <p className="text-[11px] text-on-surface-variant text-center mt-6 font-light">
          🔒 גישה מבוקרת. כל פעולה נרשמת ביומן השינויים.
        </p>
      </div>
    </div>
  );
}

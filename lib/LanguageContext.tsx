"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Lang, RTL_LANGUAGES, translate, TKey } from "./i18n";

interface LanguageContextValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (lang: Lang) => void;
  t: (key: TKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("he");

  useEffect(() => {
    // Load from localStorage / cookie on mount
    try {
      const stored = (localStorage.getItem("mapi-lang") as Lang | null) || null;
      if (stored && ["he", "en", "fr", "es", "ru", "ar"].includes(stored)) {
        setLangState(stored);
      } else {
        // Detect from browser
        const browserLang = navigator.language.slice(0, 2).toLowerCase();
        const detected = ["en", "fr", "es", "ru", "ar", "he"].includes(browserLang)
          ? (browserLang as Lang)
          : "he";
        setLangState(detected);
      }
    } catch {
      setLangState("he");
    }
  }, []);

  useEffect(() => {
    const dir = RTL_LANGUAGES.includes(lang) ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem("mapi-lang", lang);
      document.cookie = `mapi-lang=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    } catch {}
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
  }, []);

  const t = useCallback((key: TKey) => translate(key, lang), [lang]);

  const dir: "rtl" | "ltr" = RTL_LANGUAGES.includes(lang) ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback: return defaults (so server components don't break)
    return {
      lang: "he" as Lang,
      dir: "rtl" as const,
      setLang: () => {},
      t: (key: TKey) => translate(key, "he")
    };
  }
  return ctx;
}

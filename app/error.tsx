"use client";

// Route-segment error boundary.
// Deliberately self-contained: no LanguageContext / no app providers,
// so it still renders even if those are the thing that crashed.
// Static bilingual (Hebrew + English) text.

import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hook point for production error monitoring (e.g., Sentry.captureException)
    console.error("[MAPI Portal] Route error:", error);
  }, [error]);

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "Heebo, Arial, sans-serif",
        background: "#f8f9fb"
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div
          style={{
            width: 88,
            height: 88,
            margin: "0 auto 1.5rem",
            borderRadius: "50%",
            background: "#FEF3C7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44
          }}
          aria-hidden="true"
        >
          ⚠️
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0B61A1", marginBottom: 8 }}>
          משהו השתבש
        </h1>
        <p style={{ fontSize: 14, color: "#4b5563", marginBottom: 4 }}>
          אירעה שגיאה בלתי צפויה בדף זה. הצוות שלנו קיבל דיווח אוטומטי.
        </p>
        <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 24 }} dir="ltr">
          Something went wrong. Our team has been notified.
          {error.digest && <span style={{ display: "block", fontFamily: "monospace", marginTop: 4 }}>Ref: {error.digest}</span>}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#0B61A1",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            נסה שוב · Try again
          </button>
          <a
            href="/"
            style={{
              background: "#fff",
              color: "#0B61A1",
              border: "1px solid #0B61A1",
              borderRadius: 999,
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "inherit"
            }}
          >
            לדף הבית · Home
          </a>
        </div>
      </div>
    </div>
  );
}

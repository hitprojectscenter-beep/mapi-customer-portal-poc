"use client";

// Root-layout error boundary — the last line of defense.
// Renders its own <html>/<body> because the root layout itself failed.

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="he" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Heebo, Arial, sans-serif",
          background: "#f8f9fb",
          color: "#1f2937"
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 480, padding: "2rem" }}>
          <div
            style={{
              width: 88,
              height: 88,
              margin: "0 auto 1.5rem",
              borderRadius: "50%",
              background: "#FEE2E2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44
            }}
            aria-hidden="true"
          >
            🛠️
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0B61A1", marginBottom: 8 }}>
            הפורטל נתקל בתקלה
          </h1>
          <p style={{ fontSize: 14, color: "#4b5563", marginBottom: 4 }}>
            אנחנו מטפלים בזה. אנא נסו לרענן את הדף.
          </p>
          <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 24 }} dir="ltr">
            The portal hit a snag — please try refreshing.
            {error?.digest && <span style={{ display: "block", fontFamily: "monospace", marginTop: 4 }}>Ref: {error.digest}</span>}
          </p>
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
            רענן · Reload
          </button>
        </div>
      </body>
    </html>
  );
}

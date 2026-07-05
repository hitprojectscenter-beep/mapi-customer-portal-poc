import Link from "next/link";

// Branded 404 page — server component, no client dependencies.
export default function NotFound() {
  return (
    <div
      dir="rtl"
      className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-surface"
    >
      <div className="text-center max-w-md">
        <p className="text-7xl font-bold text-secondary/30 mb-4" dir="ltr">404</p>
        <h1 className="text-2xl font-bold text-primary mb-2">הדף לא נמצא</h1>
        <p className="text-sm text-on-surface-variant mb-2">
          ייתכן שהקישור השתנה או שהדף הוסר.
        </p>
        <p className="text-xs text-on-surface-variant mb-8" dir="ltr">
          Page not found — the link may have changed.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/"
            className="bg-primary text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-secondary transition-colors"
          >
            לדף הבית
          </Link>
          <Link
            href="/catalog"
            className="bg-white border border-primary text-primary px-7 py-3 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            לקטלוג השירותים
          </Link>
        </div>
      </div>
    </div>
  );
}

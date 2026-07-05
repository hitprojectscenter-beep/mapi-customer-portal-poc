// Lightweight client-side error monitoring.
// Captures window errors, unhandled promise rejections, and errors reported
// by React error boundaries into a localStorage ring buffer, viewable at
// /admin/monitoring. In production this upgrades to Sentry: replace the
// body of `capture` with Sentry.captureException(error, { extra: context }).

export interface CapturedError {
  id: string;
  message: string;
  stack?: string;
  source: "window" | "promise" | "boundary" | "manual";
  url: string;
  userAgent: string;
  timestamp: number;
}

const STORAGE_KEY = "mapi_error_log_v1";
const MAX_ERRORS = 50;
let initialized = false;

function readLog(): CapturedError[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CapturedError[]) : [];
  } catch {
    return [];
  }
}

function writeLog(errors: CapturedError[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(errors.slice(0, MAX_ERRORS)));
  } catch {
    /* storage full/blocked — monitoring must never crash the app */
  }
}

export function capture(
  error: unknown,
  source: CapturedError["source"] = "manual"
): void {
  try {
    const err = error instanceof Error ? error : new Error(String(error));
    const entry: CapturedError = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      message: err.message?.slice(0, 500) || "Unknown error",
      stack: err.stack?.slice(0, 2000),
      source,
      url: typeof window !== "undefined" ? window.location.pathname : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 200) : "",
      timestamp: Date.now()
    };
    writeLog([entry, ...readLog()]);
    // Production hook: Sentry.captureException(err, { tags: { source } });
  } catch {
    /* never throw from the monitor */
  }
}

export function getErrors(): CapturedError[] {
  return readLog();
}

export function clearErrors(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function initMonitoring(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  window.addEventListener("error", (event) => {
    // Ignore cross-origin script noise ("Script error.") — not actionable
    if (event.message === "Script error." && !event.filename) return;
    capture(event.error || event.message, "window");
  });

  window.addEventListener("unhandledrejection", (event) => {
    capture(event.reason, "promise");
  });
}

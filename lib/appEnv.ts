// Server-only: which deployment environment (and DB) is this request running
// against. Vercel injects VERCEL_ENV (production | preview | development) and
// VERCEL_GIT_COMMIT_REF (the git branch). Surfaced in the admin UI so operators
// always know which environment — and therefore which database — they are
// acting on. Critical once dev/test/prod use SEPARATE databases: it prevents
// accidentally editing production data while thinking you are in test.

export type AppEnv = "production" | "test" | "dev" | "preview" | "development" | "local";

export function appEnv(): { env: AppEnv; branch: string } {
  const vEnv = (process.env.VERCEL_ENV || "").trim();
  const branch = (process.env.VERCEL_GIT_COMMIT_REF || "").trim();
  let env: AppEnv = "local";
  if (vEnv === "production") env = "production";
  else if (vEnv === "development") env = "development";
  else if (vEnv === "preview") {
    // dev/test branches deploy as "preview"; use the branch name to distinguish.
    if (branch === "dev" || branch === "test") env = branch;
    else env = "preview";
  }
  return { env, branch };
}

/** Human label for the admin badge. */
export function appEnvLabel(): string {
  const { env } = appEnv();
  const map: Record<string, string> = {
    production: "פרודקשן", test: "בדיקות (test)", dev: "פיתוח (dev)",
    preview: "תצוגה מקדימה", development: "פיתוח מקומי", local: "מקומי"
  };
  return map[env] || env;
}

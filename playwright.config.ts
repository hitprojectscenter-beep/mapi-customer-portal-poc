import { defineConfig, devices } from "@playwright/test";

// E2E smoke suite. Runs against a production build (`next start`) —
// the same artifact that ships to Vercel, so a green run means the
// deployed bundle actually works, not just the dev server.
export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: "http://localhost:3100",
    // Hebrew-Israel locale — the portal auto-detects browser language,
    // and the smoke assertions target the default Hebrew UI
    locale: "he-IL",
    timezoneId: "Asia/Jerusalem",
    trace: "on-first-retry",
    screenshot: "only-on-failure"
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    // Pixel 5 profile = Chromium engine — no extra browser download needed
    { name: "mobile", use: { ...devices["Pixel 5"] } }
  ],
  webServer: {
    command: "npx next start --port 3100",
    url: "http://localhost:3100",
    // Never reuse: an orphaned/stale server on 3100 (or another session's
    // dev server clobbering .next) must not silently serve the tests
    reuseExistingServer: false,
    timeout: 120_000
  }
});

import { test, expect } from "@playwright/test";

// Smoke suite — the critical user journeys that must never break.
// Selectors are text/role-based (Hebrew UI) to stay resilient to styling changes.

test.describe("MAPI Portal — smoke", () => {
  test("homepage loads with brand and hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/מפ"י/);
    // Real uploaded logo is served
    const logo = page.locator('header img[src*="mapi-logo"]').first();
    await expect(logo).toBeVisible();
    // Hero headline
    await expect(page.getByText("פורטל למידע")).toBeVisible();
  });

  test("mouse wheel scrolls the page", async ({ page }) => {
    // Regression guard: overflow-x/overscroll-behavior on <body> once turned
    // it into a chained scroll container that swallowed wheel events —
    // the page ignored the mouse wheel entirely on desktop.
    await page.goto("/");
    await page.mouse.move(400, 400);
    await page.mouse.wheel(0, 800);
    await page.waitForFunction(() => window.scrollY > 100, undefined, { timeout: 5000 });
  });

  test("catalog lists services with sort control", async ({ page }) => {
    await page.goto("/catalog");
    // services render as cards
    await expect(page.locator("article").first()).toBeVisible();
    const count = await page.locator("article").count();
    expect(count).toBeGreaterThanOrEqual(10);
    // Sort dropdown present
    await expect(page.locator("select").first()).toBeVisible();
  });

  test("PDP shows price and the order CTA", async ({ page }) => {
    await page.goto("/catalog/custom-map");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("מפה בהתאמה אישית");
    // Ordering now opens the original government form in a new tab
    await expect(page.getByRole("link", { name: /מעבר להזמנה/ }).first()).toBeVisible();
  });

  test("product order links out to the original government form in a new tab", async ({ page }) => {
    await page.goto("/catalog/custom-map");
    const orderLink = page.getByRole("link", { name: /מעבר להזמנה/ }).first();
    await expect(orderLink).toHaveAttribute("target", "_blank");
    await expect(orderLink).toHaveAttribute("href", /govforms\.gov\.il/);
    // The in-portal wizard is intentionally disabled (in development)
    await expect(page.getByRole("button", { name: /בפיתוח/ }).first()).toBeDisabled();
  });

  test("plans page shows 3 tiers and comparison table", async ({ page }) => {
    await page.goto("/plans");
    await expect(page.getByText("פתוח לציבור").first()).toBeVisible();
    await expect(page.getByText("פרימיום").first()).toBeVisible();
    await expect(page.getByText("מגזר ציבורי").first()).toBeVisible();
    await expect(page.locator("table")).toBeVisible();
  });

  test("bundles page shows product packages with savings", async ({ page }) => {
    await page.goto("/bundles");
    await expect(page.getByText("חבילת מודד מוסמך").first()).toBeVisible();
    await expect(page.getByText(/-\d+%/).first()).toBeVisible();
  });

  test("api-hub dashboard renders KPIs and tabs", async ({ page }) => {
    await page.goto("/api-hub");
    // Target the h1 — a bare getByText would match the desktop nav link,
    // which is hidden on mobile viewports
    await expect(page.getByRole("heading", { level: 1 })).toContainText("API Hub");
    // Tab by name — a bare role=tab would also match the NewsTicker dots
    await expect(page.getByRole("tab", { name: /סיכום/ })).toBeVisible();
  });

  test("unknown URL shows branded 404", async ({ page }) => {
    await page.goto("/no-such-page-xyz");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("הדף לא נמצא")).toBeVisible();
  });

  test("language switch to English translates nav", async ({ page }) => {
    await page.goto("/");
    // Open language switcher and pick English
    await page.locator('button[aria-label*="Change language"], button[data-tooltip*="Change language"]').first().click();
    await page.getByText("English", { exact: false }).first().click();
    await expect(page.locator("header")).toContainText(/Home|Catalog/i, { timeout: 15_000 });
  });
});

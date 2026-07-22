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
    await expect(page.getByText("העתיד של המידע")).toBeVisible();
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
    // 14 services render as cards
    await expect(page.locator("article").first()).toBeVisible();
    const count = await page.locator("article").count();
    expect(count).toBeGreaterThanOrEqual(10);
    // Sort dropdown present
    await expect(page.locator("select").first()).toBeVisible();
  });

  test("PDP shows price, quantity and add-to-cart", async ({ page }) => {
    await page.goto("/catalog/custom-map");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("מפה בהתאמה אישית");
    await expect(page.locator("#qty")).toBeVisible();
    await expect(page.getByRole("button", { name: /הוסף לעגלה/ }).first()).toBeVisible();
  });

  test("add to cart updates cart badge and mini-cart", async ({ page }) => {
    await page.goto("/catalog/custom-map");
    await page.getByRole("button", { name: /הוסף לעגלה/ }).first().click();
    // Mini-cart drawer opens with the item
    await expect(page.getByText("עגלת ההזמנות")).toBeVisible();
    await expect(page.getByText("מפה בהתאמה אישית").first()).toBeVisible();
  });

  test("plans page shows 3 tiers and comparison table", async ({ page }) => {
    await page.goto("/plans");
    await expect(page.getByText("פתוח לציבור").first()).toBeVisible();
    await expect(page.getByText("פרימיום").first()).toBeVisible();
    await expect(page.getByText("מגזר ציבורי").first()).toBeVisible();
    await expect(page.locator("table")).toBeVisible();
  });

  test("bundles page shows regional bundles with savings", async ({ page }) => {
    await page.goto("/bundles");
    await expect(page.getByText("חבילת גליל").first()).toBeVisible();
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

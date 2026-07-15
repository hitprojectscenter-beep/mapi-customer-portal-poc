import { test, expect } from "@playwright/test";

// CMS back-office suite — content-manager journeys.
// Credentials come from env so the secret is never committed;
// locally: set CMS_E2E_EMAIL / CMS_E2E_PASSWORD to run the full flow.
const EMAIL = process.env.CMS_E2E_EMAIL || "";
const PASSWORD = process.env.CMS_E2E_PASSWORD || "";
const hasCreds = EMAIL.length > 0 && PASSWORD.length > 0;

test.describe("MAPI CMS — content manager", () => {
  test("unauthenticated /cms redirects to login", async ({ page }) => {
    await page.goto("/cms");
    await page.waitForURL(/\/cms\/login/);
    await expect(page.getByText("ניהול תוכן הפורטל")).toBeVisible();
    await expect(page.locator("#cms-email")).toBeVisible();
    await expect(page.locator("#cms-password")).toBeVisible();
  });

  test("wrong credentials show an error", async ({ page }) => {
    await page.goto("/cms/login");
    await page.locator("#cms-email").fill("wrong@example.com");
    await page.locator("#cms-password").fill("not-the-password");
    await page.getByRole("button", { name: /כניסה/ }).click();
    // Next.js route announcer is also role="alert" — scope by text
    await expect(page.getByText("פרטי ההתחברות שגויים")).toBeVisible();
  });

  test("footer exposes a discreet CMS link", async ({ page }) => {
    await page.goto("/");
    const link = page.locator('footer a[href="/cms/login"]');
    await expect(link).toHaveText("ניהול תוכן");
  });

  test(hasCreds ? "manager can log in, publish news, see it on the ticker" : "login flow (skipped — no creds in env)", async ({ page }) => {
    test.skip(!hasCreds, "CMS_E2E_EMAIL / CMS_E2E_PASSWORD not set");

    // Login
    await page.goto("/cms/login");
    await page.locator("#cms-email").fill(EMAIL);
    await page.locator("#cms-password").fill(PASSWORD);
    await page.getByRole("button", { name: /כניסה/ }).click();
    await page.waitForURL(/\/cms$/);
    await expect(page.getByText("לוח בקרה")).toBeVisible();

    // Publish a news item
    await page.goto("/cms/news");
    await page.locator("#news-title").fill("בדיקת E2E אוטומטית לחדשות");
    await page.getByRole("button", { name: /פרסם חדשה/ }).click();
    await expect(page.getByText("בדיקת E2E אוטומטית לחדשות").first()).toBeVisible();

    // The public ticker now carries the managed item.
    // (Attached, not "visible": the mobile carousel shows one card at a
    //  time and may have rotated past index 0 by assertion time.)
    await page.goto("/");
    const ticker = page.getByRole("region", { name: "חדשות" });
    await expect(ticker.getByText("בדיקת E2E אוטומטית לחדשות").first()).toBeAttached();

    // Users page renders with the primary account protected
    await page.goto("/cms/users");
    await expect(page.getByText("חשבון ראשי")).toBeVisible();

    // Campaigns page renders
    await page.goto("/cms/campaigns");
    await expect(page.getByText(/יצירת קמפיין חדש/)).toBeVisible();
  });
});

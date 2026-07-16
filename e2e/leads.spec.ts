import { test, expect } from "@playwright/test";

// AI Lead Management suite — HLD V8 ch. 4.2 / 8.1 / 14.5 / 15.6-R3

test.describe("MAPI Leads — AI lead management", () => {
  test("admin console renders KPIs, scoring distribution and automations", async ({ page }) => {
    await page.goto("/admin/leads");
    await expect(page.getByRole("heading", { name: "ניהול לידים חכם (AI)" })).toBeVisible();
    await expect(page.getByText("Lead Scoring Distribution")).toBeVisible();
    // A1-A5 verbatim from spec 8.1
    await expect(page.getByText("Auto-Response Email")).toBeVisible();
    await expect(page.getByText("Lead to Customer Conversion")).toBeVisible();
    // Seeded inbox has rows
    await expect(page.getByText("עיריית חיפה").first()).toBeAttached();
  });

  test("R3 email intake: AI parse creates a routed lead", async ({ page }) => {
    await page.goto("/admin/leads");
    // Load the built-in example email, run the "AI" analysis
    await page.getByRole("button", { name: "טען דוגמה" }).click();
    await page.getByRole("button", { name: "עבד עם AI" }).click();
    await expect(page.getByText("תוצאת הניתוח")).toBeVisible({ timeout: 5000 });
    // Scope to the result panel — the pasted email text also contains the name
    await expect(page.locator("dd", { hasText: "דניאל אביטל" })).toBeVisible();
    // Create the lead and find it in the inbox table
    await page.getByRole("button", { name: "צור ליד מהמייל" }).click();
    await expect(page.getByText("דניאל אביטל").first()).toBeAttached();
  });

  test("lead intake API enforces the spec minimum and reports Workspace status", async ({ request }) => {
    // Below spec minimum (no last name) → rejected per HLD 4.2
    const bad = await request.post("/api/leads", { data: { firstName: "רק", lastName: "", email: "x@y.com" } });
    expect(bad.status()).toBe(422);

    // Valid payload → accepted (demo mode: stored="none" when no env is set)
    const good = await request.post("/api/leads", {
      data: {
        firstName: "בדיקה", lastName: "API", email: "api-e2e@example.com",
        familyLabel: "מפות", sourceLabel: "טופס באתר", score: 50
      }
    });
    expect(good.ok()).toBeTruthy();
    expect((await good.json()).ok).toBe(true);

    // Status endpoint for the admin chip
    const status = await request.get("/api/leads");
    const s = await status.json();
    expect(s.ok).toBe(true);
    expect(typeof s.sheets).toBe("boolean");
  });

  test("chatbot mini-form captures a lead that reaches the admin inbox", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "מסייע AI חכם" }).click();
    await page.getByRole("button", { name: /השאירו פרטים/ }).click();
    await page.locator("#ai-lead-first").fill("בדיקת");
    await page.locator("#ai-lead-last").fill("אוטומטית");
    await page.locator("#ai-lead-contact").fill("lead-e2e@example.com");
    await page.getByRole("button", { name: /שלחו ונחזור/ }).click();
    await expect(page.getByText(/מספר ליד/)).toBeVisible();

    await page.goto("/admin/leads");
    await expect(page.getByText("בדיקת אוטומטית").first()).toBeAttached();
  });
});

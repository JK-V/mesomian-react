import { test, expect } from "@playwright/test";

test.describe("Focus management", () => {
  test("traps focus inside DrawerSheet", async ({ page }) => {
    await page.goto("/drawer");
    await page.getByRole("button", { name: "Open drawer" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Close drawer" })).toBeFocused();
  });

  test("returns focus to trigger on Dialog close", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open dialog" });
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  });
});

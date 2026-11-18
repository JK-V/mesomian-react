import { test, expect } from "@playwright/test";

test.describe("Theme switching", () => {
  test("renders light mode by default", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("button")).toHaveCSS("background-color", /rgb\(37, 99, 235\)/);
  });

  test("switches to dark mode", async ({ page }) => {
    await page.goto("/?mode=dark");
    await expect(page.locator("button")).toHaveCSS("background-color", /rgb\(59, 130, 246\)/);
  });
});

test.describe("Keyboard navigation", () => {
  test("opens Dialog with Enter and closes with Escape", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("navigates Carousel with arrow keys", async ({ page }) => {
    await page.goto("/carousel");
    await page.keyboard.press("ArrowRight");
    await expect(page.getByText("Slide 2")).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByText("Slide 1")).toBeVisible();
  });
});

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

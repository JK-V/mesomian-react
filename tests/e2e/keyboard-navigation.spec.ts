import { test, expect } from "@playwright/test";

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

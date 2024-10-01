import { expect, test } from "@playwright/test";

test.describe("integrity test", () => {
  test("success", async ({ page }) => {
    await page.goto("/index.html");
    await expect(page.getByText("test")).toBeVisible();
  });
  test("faild", async ({ page }) => {
    await page.goto("/index2.html");
    await expect(page.getByText("test")).not.toBeVisible();
  });
});

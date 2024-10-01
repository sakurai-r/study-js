import { test, expect } from "@playwright/test";

test.describe("index.html", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.01-03/ex14/index.html");
  });

  test("Initial state", async ({ page }) => {
    const food1 = page.getByTestId("food1");
    const stationery1 = page.getByTestId("stationery1");
    const stationery2 = page.getByTestId("stationery2");

    // 全ての項目が初期状態では表示されていることを確認
    await expect(food1).toBeVisible();
    await expect(stationery1).toBeVisible();
    await expect(stationery2).toBeVisible();
  });

  test('Selecting "food" filters only food items', async ({ page }) => {
    await page.getByTestId("select").selectOption("food");

    const food1 = page.getByTestId("food1");
    const stationery1 = page.getByTestId("stationery1");
    const stationery2 = page.getByTestId("stationery2");

    // 食品のみが表示されていることを確認
    await expect(food1).toBeVisible();
    await expect(stationery1).toBeHidden();
    await expect(stationery2).toBeHidden();
  });

  test('Selecting "stationery" filters only stationery items', async ({
    page,
  }) => {
    await page.getByTestId("select").selectOption("stationery");

    const food1 = page.getByTestId("food1");
    const stationery1 = page.getByTestId("stationery1");
    const stationery2 = page.getByTestId("stationery2");

    // 文房具のみが表示されていることを確認
    await expect(food1).toBeHidden();
    await expect(stationery1).toBeVisible();
    await expect(stationery2).toBeVisible();
  });

  test('Selecting "all" shows all items', async ({ page }) => {
    await page.getByTestId("select").selectOption("all");

    const food1 = page.getByTestId("food1");
    const stationery1 = page.getByTestId("stationery1");
    const stationery2 = page.getByTestId("stationery2");

    // 全ての項目が表示されていることを確認
    await expect(food1).toBeVisible();
    await expect(stationery1).toBeVisible();
    await expect(stationery2).toBeVisible();
  });
});

import { expect, test } from "@playwright/test";

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} todo
 */
async function addToDo(page, todo) {
  await page.getByRole("textbox").fill(todo);
  await page.getByRole("button", { name: "Add" }).click();
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function countToDos(page) {
  return await page.getByRole("listitem").count();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
function queryToDo(page, index) {
  return page.getByRole("listitem").nth(index);
}

test.describe("simple todo app with sessionStorage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.11-15/ex06");
    await page.evaluate(() => sessionStorage.clear());
  });

  test("no default todos", async ({ page }) => {
    expect(await countToDos(page)).toBe(0);
  });

  test("add new todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("persist todos in sessionStorage", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");

    // デバッグ用: sessionStorage に正しく保存されているか確認
    const savedData = await page.evaluate(() =>
      sessionStorage.getItem("todo-list")
    );
    console.log("Saved data in sessionStorage:", savedData); // ログを確認

    // sessionStorage のデータが保存されるのを待つ
    await page.waitForFunction(() => {
      const todos = sessionStorage.getItem("todo-list");
      return todos !== null;
    });

    const todos = await page.evaluate(() =>
      JSON.parse(sessionStorage.getItem("todo-list"))
    );
    expect(todos).toEqual([
      { text: "質問表に質問を記載する", completed: false },
    ]);
  });

  test("sessionStorage clears on new session", async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("/ch15.11-15/ex06");

    await addToDo(page1, "質問表に質問を記載する");

    const page2 = await context.newPage();
    await page2.goto("/ch15.11-15/ex06");

    expect(await countToDos(page2)).toBe(0);
  });
});

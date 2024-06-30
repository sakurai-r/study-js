import { C } from "./index.js"; // ts でも可

test("", () => {
  const c = new C();
  expect(c.getX()).toBe(42);
  expect(c.x).toBeUndefined();
});

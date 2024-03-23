import { isEqual } from "./index.ts";

describe("isEqual", () => {
  test.each([
    [5, 5],
    [0.3 - 0.2, 0.1],
    [0.2 - 0.1, 0.1],
    [1, 1 + 1e-11],
  ])("returns true when comparing %p and %p", (num1, num2) => {
    expect(isEqual(num1, num2)).toBe(true);
  });

  test.each([
    [5, 2],
    [0.1, 0.3],
    [1, -1],
    [1, 1 + 1e-10],
  ])("returns false when comparing %p and %p", (num1, num2) => {
    expect(isEqual(num1, num2)).toBe(false);
  });
});

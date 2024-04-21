import { fibWhile, fibDoWhile, fibFor } from "./index.ts";

const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

describe("index.ts", () => {
  test("fibWhile", () => {
    expect(fibWhile()).toStrictEqual(expected);
  });

  test("fibDoWhile", () => {
    expect(fibDoWhile()).toStrictEqual(expected);
  });

  test("fibFor", () => {
    expect(fibFor()).toStrictEqual(expected);
  });
});

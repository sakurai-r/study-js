import { equalArrays } from "./index.js";

describe("equalArrays", () => {
  test("should return false when equalArrays is given arrays with different values", () => {
    const a = { a: "hoge" };
    const b = { b: "fuga" };
    // a.length は undefined になる
    expect(equalArrays(a, b)).toEqual(true);
  });
});

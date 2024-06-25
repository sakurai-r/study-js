import { sequenceToObject } from "./index.ts";

describe("sequenceToObject", () => {
  test.each([
    {
      input: ["a", 1],
      expected: { a: 1 },
    },
    {
      input: ["a", "aaa"],
      expected: { a: "aaa" },
    },
    {
      input: ["a", 1, "b", "bbb"],
      expected: { a: 1, b: "bbb" },
    },
    {
      input: ["a", 1, "b", NaN, "c", -10],
      expected: { a: 1, b: NaN, c: -10 },
    },
  ])("sequenceToObject(%s) => %s", ({ input, expected }) => {
    expect(sequenceToObject(...input)).toEqual(expected);
  });

  test("throw an error if the number of values is odd", () => {
    expect(() => sequenceToObject("a", 1, "b")).toThrow(
      "引数の個数が偶数ではありません。"
    );
  });

  test("throw an error if odd-indexed values are not strings", () => {
    expect(() => sequenceToObject(1, 2, "b", 2)).toThrow(
      "奇数番の引数の値がstring型ではありません。"
    );
    expect(() => sequenceToObject("a", 1, 2, 2)).toThrow(
      "奇数番の引数の値がstring型ではありません。"
    );
  });
});

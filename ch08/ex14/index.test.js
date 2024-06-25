import { any, catching } from "./index.js";

describe("any", () => {
  test.each([
    { input: 0, expected: false },
    { input: 42, expected: true },
    {
      input: -0.5,
      expected: true,
    },
  ])("isNonZero(%input) => %expected ", ({ input, expected }) => {
    const isNonZero = any(
      (n) => n > 0,
      (n) => n < 0
    );

    expect(isNonZero(input)).toBe(expected);
  });
});

describe("catching", () => {
  test.each([
    { input: '{ "a": 1 }', expected: { a: 1 } },
    {
      input: "{Invalid Json}",
      expected: {
        error: "SyntaxError: Unexpected token I in JSON at position 1",
      },
    },
  ])("safeJsonParse(%input) => %expected ", ({ input, expected }) => {
    const safeJsonParse = catching(JSON.parse, (e) => {
      return { error: e.toString() };
    });

    expect(safeJsonParse(input)).toStrictEqual(expected);
  });
});

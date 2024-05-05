import { filterEvenValues } from "./index.ts";

describe("filterEvenValues", () => {
  test.each([
    [{ a: 1, b: 2, c: 3 }, { b: 2 }],
    [{ a: 1, b: 0, c: 3 }, { b: 0 }],
    [{ a: -1, b: -2, c: 3 }, { b: -2 }],
    [
      { a: 10, b: 2, c: 18 },
      { a: 10, b: 2, c: 18 },
    ],
    [{ a: 1 }, {}],
    [{ a: 6 }, { a: 6 }],
    [{ a: NaN, b: 8 }, { b: 8 }],
    [{ a: Infinity, b: -Infinity, c: 2 }, { c: 2 }],
  ])('filterEvenValues("%s")=>"%s"', (input, expected) => {
    expect(filterEvenValues(input as { [key: string]: number })).toStrictEqual(
      expected
    );
  });
});

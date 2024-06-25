import { pow, powerRecursive } from "./index.ts";

describe("pow", () => {
  test.each([
    {
      x: 0,
      n: 1,
      expected: 0,
    },
    {
      x: 1,
      n: 0,
      expected: 1,
    },
    {
      x: 3,
      n: 2,
      expected: 9,
    },
    {
      x: 2,
      n: -2,
      expected: 0.25,
    },
    {
      x: 0.25,
      n: 2,
      expected: 0.0625,
    },
  ])("pow(%s, %s) => %s", ({ x, n, expected }) => {
    expect(pow(x, n)).toStrictEqual(expected);
  });
});

describe("powerRecursive", () => {
  test.each([
    {
      x: 0,
      n: 1,
      expected: 0,
    },
    {
      x: 1,
      n: 0,
      expected: 1,
    },
    {
      x: 3,
      n: 2,
      expected: 9,
    },
    {
      x: -3,
      n: 3,
      expected: -27,
    },
    {
      x: 2,
      n: -2,
      expected: 0.25,
    },
    {
      x: 0.25,
      n: 2,
      expected: 0.0625,
    },
  ])("powerRecursive(%s, %s) => %s", ({ x, n, expected }) => {
    expect(powerRecursive(x, n)).toStrictEqual(expected);
  });
});

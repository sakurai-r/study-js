import { add, sub, mul, div } from "./index.ts";

describe("add", () => {
  test.each([
    [
      {
        real: 4,
        imaginary: 5,
      },
      {
        real: 2,
        imaginary: 1,
      },
      {
        real: 2,
        imaginary: 4,
      },
    ],
    [
      {
        real: -3,
        imaginary: -5,
      },
      {
        real: -1,
        imaginary: 0,
      },
      {
        real: -2,
        imaginary: -5,
      },
    ],
    [
      {
        real: 0,
        imaginary: 0,
      },
      {
        real: 0,
        imaginary: 0,
      },
      {
        real: 0,
        imaginary: 0,
      },
    ],
    [
      {
        real: NaN,
        imaginary: NaN,
      },
      {
        real: 0,
        imaginary: -1,
      },
      {
        real: NaN,
        imaginary: NaN,
      },
    ],
    [
      {
        real: -Infinity,
        imaginary: Infinity,
      },
      {
        real: -Infinity,
        imaginary: Infinity,
      },
      {
        real: 3,
        imaginary: -5,
      },
    ],
  ])("returns %n when comparing %n and %n", (result, z1, z2) => {
    expect(add(z1, z2)).toStrictEqual(result);
  });
});

describe("sub", () => {
  test.each([
    [
      {
        real: 1,
        imaginary: 4,
      },
      {
        real: 3,
        imaginary: 5,
      },
      {
        real: 2,
        imaginary: 1,
      },
    ],
    [
      {
        real: -10,
        imaginary: -6,
      },
      {
        real: -11,
        imaginary: -8,
      },
      {
        real: -1,
        imaginary: -2,
      },
    ],
    [
      {
        real: -2,
        imaginary: 5,
      },
      {
        real: -4,
        imaginary: 0,
      },
      {
        real: -2,
        imaginary: -5,
      },
    ],
    [
      {
        real: 0,
        imaginary: 0,
      },
      {
        real: 0,
        imaginary: 0,
      },
      {
        real: 0,
        imaginary: 0,
      },
    ],
    [
      {
        real: NaN,
        imaginary: NaN,
      },
      {
        real: 0,
        imaginary: -1,
      },
      {
        real: NaN,
        imaginary: NaN,
      },
    ],
    [
      {
        real: -Infinity,
        imaginary: Infinity,
      },
      {
        real: -Infinity,
        imaginary: Infinity,
      },
      {
        real: 3,
        imaginary: -5,
      },
    ],
  ])("returns %n when comparing %n and %n", (result, z1, z2) => {
    expect(sub(z1, z2)).toStrictEqual(result);
  });
});

describe("mul", () => {
  test.each([
    [
      {
        real: 6,
        imaginary: 5,
      },
      {
        real: 2,
        imaginary: 1,
      },
      {
        real: 3,
        imaginary: 5,
      },
    ],
    [
      {
        real: 2,
        imaginary: 12,
      },
      {
        real: -1,
        imaginary: -4,
      },
      {
        real: -2,
        imaginary: -3,
      },
    ],
    [
      {
        real: -2,
        imaginary: -0,
      },
      {
        real: -1,
        imaginary: 0,
      },
      {
        real: 2,
        imaginary: -5,
      },
    ],
    [
      {
        real: 0,
        imaginary: 0,
      },
      {
        real: 0,
        imaginary: 0,
      },
      {
        real: 0,
        imaginary: 0,
      },
    ],
    [
      {
        real: NaN,
        imaginary: NaN,
      },
      {
        real: 0,
        imaginary: -1,
      },
      {
        real: NaN,
        imaginary: NaN,
      },
    ],
    [
      {
        real: Infinity,
        imaginary: -Infinity,
      },
      {
        real: -Infinity,
        imaginary: Infinity,
      },
      {
        real: -3,
        imaginary: -5,
      },
    ],
  ])("returns %n when comparing %n and %n", (result, z1, z2) => {
    expect(mul(z1, z2)).toStrictEqual(result);
  });
});

describe("div", () => {
  test.each([
    [
      {
        real: 2,
        imaginary: 5,
      },
      {
        real: 4,
        imaginary: 5,
      },
      {
        real: 2,
        imaginary: 1,
      },
    ],
    [
      {
        real: 3,
        imaginary: 3,
      },
      {
        real: -3,
        imaginary: -6,
      },
      {
        real: -1,
        imaginary: -2,
      },
    ],
    [
      {
        real: -2,
        imaginary: -3,
      },
      {
        real: 10,
        imaginary: -6,
      },
      {
        real: -5,
        imaginary: 2,
      },
    ],
    [
      {
        real: NaN,
        imaginary: NaN,
      },
      {
        real: 0,
        imaginary: 0,
      },
      {
        real: 0,
        imaginary: 0,
      },
    ],
    [
      {
        real: NaN,
        imaginary: NaN,
      },
      {
        real: 2,
        imaginary: -5,
      },
      {
        real: NaN,
        imaginary: NaN,
      },
    ],
    [
      {
        real: -Infinity,
        imaginary: Infinity,
      },
      {
        real: -Infinity,
        imaginary: Infinity,
      },
      {
        real: 3,
        imaginary: 5,
      },
    ],
  ])("returns %n when comparing %n and %n", (result, z1, z2) => {
    expect(div(z1, z2)).toStrictEqual(result);
  });
});

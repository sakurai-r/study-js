import { bitCount } from "./index.ts";

describe("bitCount", () => {
  test.each([
    [0, 0], // 0
    [1, 1], // 1
    [2, 1], // 10
    [3, 2], // 11
    [4, 1], // 100
    [5, 2], // 101
    [9, 2], // 1001
    [15, 4], // 1111
    [16, 1], // 10000
    [31, 5], // 11111
    [32, 1], // 100000
    [63, 6], // 111111
    [64, 1], // 1000000
    [127, 7], // 1111111
    [128, 1], // 10000000
    [255, 8], // 11111111
    [0b10101010, 4],
    [0xffffffff, 32],
  ])("returns %i for %i", (input, expected) => {
    expect(bitCount(input)).toBe(expected);
  });

  test.each([
    [-1, 32], // 1111 1111 1111 1111 1111 1111 1111 1111
    [-2, 31], // 1111 1111 1111 1111 1111 1111 1111 1110
    [-15, 29], // 1111 1111 1111 1111 1111 1111 1111 0001
  ])("returns %i for negative numbers %i", (input, expected) => {
    expect(bitCount(input)).toBe(expected);
  });
});

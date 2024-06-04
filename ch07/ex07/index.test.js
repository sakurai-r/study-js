import { bubbleSort } from "./index.js";

describe("bubbleSort", () => {
  test.each([
    { array: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
    { array: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] },
    {
      array: [3, 1, 11, 4, 9, 2, 6, 5],
      expected: [1, 2, 3, 4, 5, 6, 9, 11],
    },
    { array: [2, 4, 3, 2, 1, 1, 3], expected: [1, 1, 2, 2, 3, 3, 4] },
    { array: [1], expected: [1] },
    { array: [], expected: [] },
  ])("bubbleSort($array) => $expected", ({ array, expected }) => {
    const sortedArray = bubbleSort(array);
    expect(sortedArray).toEqual(expected);
  });
});

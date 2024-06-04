import { add, multiply } from "./index.ts";

describe("add", () => {
  test.each([
    {
      table1: [
        [1, 2],
        [3, 4],
      ],
      table2: [
        [3, 4],
        [1, 2],
      ],
      expected: [
        [4, 6],
        [4, 6],
      ],
    },
    {
      table1: [
        [1, 2, 3],
        [3, 4, 0],
        [-1, -10, -3],
      ],
      table2: [
        [3, 4, -3],
        [1, -6, -4],
        [-4, -5, -2],
      ],
      expected: [
        [4, 6, 0],
        [4, -2, -4],
        [-5, -15, -5],
      ],
    },
    {
      table1: [
        [Infinity, -Infinity, 5, -1],
        [NaN, 5, 2, 16],
      ],
      table2: [
        [4, 6, -5, 4],
        [NaN, -Infinity, 11, 0],
      ],
      expected: [
        [Infinity, -Infinity, 0, 3],
        [NaN, -Infinity, 13, 16],
      ],
    },
  ])("add(%s, %s) => %s", ({ table1, table2, expected }) => {
    expect(add(table1, table2)).toStrictEqual(expected);
  });

  test("throw an error when tables have different lengths", () => {
    const table1 = [
      [1, 2],
      [3, 4, 5],
    ];

    const table2 = [
      [5, 6, 7],
      [8, 9, 10],
    ];
    expect(() => add(table1, table2)).toThrow(
      "配列のすべての行の長さが同じではありません。"
    );
  });

  test("throw an error when tables have rows of different dimensions", () => {
    const table1 = [
      [1, 2],
      [3, 4],
    ];

    const table2 = [
      [5, 6, 7],
      [8, 9, 10],
    ];

    expect(() => add(table1, table2)).toThrow(
      "２つの行列の長さが同じではありません。"
    );
  });
});

describe("multiply", () => {
  test.each([
    {
      table1: [
        [1, 2],
        [3, 4],
      ],
      table2: [
        [3, 4],
        [1, 2],
      ],
      expected: [
        [5, 8],
        [13, 20],
      ],
    },
    {
      table1: [
        [1, 2, 3],
        [3, 4, 0],
        [-1, -10, -3],
      ],
      table2: [
        [3, -4],
        [1, -6],
        [-4, -5],
      ],
      expected: [
        [-7, -31],
        [13, -36],
        [-1, 79],
      ],
    },
    {
      table1: [
        [Infinity, -Infinity, 5, -1],
        [NaN, 5, 2, 16],
      ],
      table2: [
        [4, 6],
        [NaN, -Infinity],
        [1, -6],
        [-3, 5],
      ],
      expected: [
        [NaN, Infinity],
        [NaN, NaN],
      ],
    },
  ])("multiply(%s, %s) => %s", ({ table1, table2, expected }) => {
    expect(multiply(table1, table2)).toStrictEqual(expected);
  });

  test("throw an error when tables have different lengths", () => {
    const table1 = [
      [1, 2],
      [3, 4, 5],
    ];

    const table2 = [
      [5, 6, 7],
      [8, 9, 10],
    ];
    expect(() => multiply(table1, table2)).toThrow(
      "配列のすべての行の長さが同じではありません。"
    );
  });

  test("throw an error when number of columns in table1 does not equal number of rows in table2", () => {
    const table1 = [
      [1, 2],
      [3, 4],
    ];

    const table2 = [
      [5, 6],
      [7, 8],
      [9, 10],
    ];

    expect(() => multiply(table1, table2)).toThrow(
      "１つ目の行列の列数と２つ目の行列の行数が一致していません。"
    );
  });
});

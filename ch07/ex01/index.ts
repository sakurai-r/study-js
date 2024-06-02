export const add = (table1: number[][], table2: number[][]) => {
  if (!(isTable(table1) && isTable(table2))) {
    throw new Error("配列のすべての行の長さが同じではありません。");
  }
  if (
    table1.length !== table2.length ||
    table1[0].length !== table2[0].length
  ) {
    throw new Error("２つの行列の長さが同じではありません。");
  }

  const result: number[][] = [];
  for (let row = 0; row < table1.length; row++) {
    result[row] = [];
    for (let col = 0; col < table1[row].length; col++) {
      result[row][col] = table1[row][col] + table2[row][col];
    }
  }

  return result;
};

export const multiply = (table1: number[][], table2: number[][]) => {
  if (!(isTable(table1) && isTable(table2))) {
    throw new Error("配列のすべての行の長さが同じではありません。");
  }

  if (table1[0].length !== table2.length) {
    throw new Error(
      "１つ目の行列の列数と２つ目の行列の行数が一致していません。"
    );
  }

  const result: number[][] = [];
  for (let i = 0; i < table1.length; i++) {
    result[i] = [];
    for (let j = 0; j < table2[0].length; j++) {
      result[i][j] = 0;
      for (let k = 0; k < table1[0].length; k++) {
        result[i][j] += table1[i][k] * table2[k][j];
      }
    }
  }

  return result;
};

const isTable = (table: number[][]) => {
  for (let i = 1; i < table.length; i++) {
    if (table[0].length !== table[i].length) {
      return false;
    }
  }
  return true;
};

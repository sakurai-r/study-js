// 50 x 50 の盤面とする
export const ROWS = 50;
export const COLS = 50;
// 1セルのサイズ
export const RESOLUTION = 10;

// Life Game のルールに従ってセルを更新する
export const updateGrid = (grid) => {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      let countTrue = 0;
      // 上のセル
      if (row > 0 && grid[row - 1][col]) {
        countTrue++;
      }
      // 下のセル
      if (row < ROWS - 1 && grid[row + 1][col]) {
        countTrue++;
      }
      // 左のセル
      if (col > 0 && grid[row][col - 1]) {
        countTrue++;
      }
      // 右のセル
      if (col < COLS - 1 && grid[row][col + 1]) {
        countTrue++;
      }
      // 左上のセル
      if (row > 0 && col > 0 && grid[row - 1][col - 1]) {
        countTrue++;
      }
      // 右上のセル
      if (row > 0 && col < COLS - 1 && grid[row - 1][col + 1]) {
        countTrue++;
      }
      // 左下のセル
      if (row < ROWS - 1 && col > 0 && grid[row + 1][col - 1]) {
        countTrue++;
      }
      // 右下のセル
      if (row < ROWS - 1 && col < COLS - 1 && grid[row + 1][col + 1]) {
        countTrue++;
      }

      if (grid[row][col]) {
        // 隣り合うセルの true がちょうど 2 か 3 の場合は、true になる
        nextGrid[row][col] = countTrue === 2 || countTrue === 3;
      } else {
        // 隣り合うセルの true がちょうど 3 の場合は、true になる
        nextGrid[row][col] = countTrue === 3;
      }
    }
  }
  return nextGrid;
};

export const renderGrid = (grid, ctx) => {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? 'black' : 'white';
      ctx.fill();
      ctx.stroke();
    }
  }
};

// 再帰的に三角形の座標を計算
function calculateTriangles(x, y, size, depth) {
  if (depth === 0) {
    // 再帰の最下層では三角形を返す
    return [{ x, y, size }];
  } else {
    const newSize = size / 2;
    // 再帰的に三角形を分割
    return [
      ...calculateTriangles(x, y + newSize, newSize, depth - 1), // 左下
      ...calculateTriangles(x + newSize, y + newSize, newSize, depth - 1), // 右下
      ...calculateTriangles(x + newSize / 2, y, newSize, depth - 1), // 上
    ];
  }
}

onmessage = (event) => {
  const { x, y, size, depth } = event.data;
  const triangles = calculateTriangles(x, y, size, depth);
  postMessage({ triangles });
};

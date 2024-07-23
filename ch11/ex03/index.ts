export function littleToBigEndian(array: Uint32Array): Uint32Array {
  // 1つの要素が 32 ビット（4 バイト）
  const buffer = new ArrayBuffer(array.length * 4);
  const view = new DataView(buffer);

  array.forEach((value, index) => {
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint32
    // true を指定してリトルエンディアン形式で格納する
    view.setUint32(index * 4, value, true);
  });

  const result = new Uint32Array(array.length);
  for (let i = 0; i < result.length; i++) {
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint32
    // false または undefined の場合ビッグエンディアン形式で読み取る
    result[i] = view.getUint32(i * 4, false);
  }

  return result;
}

export function bigToLittleEndian(array: Uint32Array): Uint32Array {
  const buffer = new ArrayBuffer(array.length * 4);
  const view = new DataView(buffer);

  array.forEach((value, index) => {
    view.setUint32(index * 4, value, false);
  });

  const result = new Uint32Array(array.length);
  for (let i = 0; i < result.length; i++) {
    result[i] = view.getUint32(i * 4, true);
  }

  return result;
}

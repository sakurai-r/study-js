export const sum = (array) => {
  if (!Array.isArray(array)) {
    return 0;
  }
  return array.reduce((x, y) => x + y, 0);
};

export const join = (array, separator = ",") => {
  if (!Array.isArray(array)) {
    throw new Error();
  }

  if (array.length === 0) {
    return "";
  }

  // Null 合体演算子 左辺が null または undefined の場合に右の値を返す
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
  return array.reduce((x, y) => `${x ?? ""}${separator}${y ?? ""}`);
};

export const reverse = (array) => {
  return array.reduce((x, y) => [y, ...x], []);
};

export const every = (array, callback) => {
  return array.reduce((x, y, i, arr) => x && callback(y, i, arr), true);
};

export const some = (array, callback) => {
  return array.reduce((x, y, i, arr) => x || callback(y, i, arr), false);
};

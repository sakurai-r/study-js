// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/instanceof
export const instanceOf = (object, constructor) => {
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
  // 何も継承していないオブジェクトの場合は null を返す
  let proto = Object.getPrototypeOf(object);

  while (proto !== null) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
};

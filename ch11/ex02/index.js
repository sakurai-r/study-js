export default function cache(f) {
  const map = new WeakMap();

  return function (obj) {
    if (map.has(obj)) {
      return map.get(obj);
    } else {
      const result = f(obj);
      map.set(obj, result);
      return result;
    }
  };
}

/* eslint-disable no-prototype-builtins */
const o = {}; // o はObject.prototype からメソッドを継承し、
o.x = 1; // 独自プロパティx を持つ。
const p = Object.create(o); // p はo とObject.prototype からプロパティを継承し、
p.y = 2; // 独自プロパティy を持つ。
console.log(`o.isPrototypeOf(p) = ${o.isPrototypeOf(p)}`);

const q = Object.create(p); // q は、p、o、Object.prototype からプロパティを継承し、
q.z = 3; // 独自プロパティz を持つ。
console.log(`p.isPrototypeOf(q) = ${p.isPrototypeOf(q)}`);
console.log(`o.isPrototypeOf(q) = ${o.isPrototypeOf(q)}`);

// `Array.prototype`オブジェクト(Arrayのインスタンスのプロトタイプ)が
// Object.prototypeのプロトタイプチェーンに含まれているかを確認している
console.log(
  `Object.prototype.isPrototypeOf(Array.prototype) = ${Object.prototype.isPrototypeOf(
    Array.prototype
  )}`
);

console.log(
  `Object.prototype.isPrototypeOf(Date) = ${Object.prototype.isPrototypeOf(
    Date
  )}`
);
console.log(
  `Object.prototype.isPrototypeOf(Date.prototype) = ${Object.prototype.isPrototypeOf(
    Date.prototype
  )}`
);

console.log(
  `Object.prototype.isPrototypeOf(Map) = ${Object.prototype.isPrototypeOf(Map)}`
);
console.log(
  `Object.prototype.isPrototypeOf(Map.prototype) = ${Object.prototype.isPrototypeOf(
    Map.prototype
  )}`
);

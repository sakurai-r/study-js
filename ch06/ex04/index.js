// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
/**
 * Object.DefineProperty() を使用してプロパティを定義する場合
 * writable 属性/enumerable 属性/configurable 属性 の規定値が false になる。
 */

const obj1 = {};

/**
 * writable 属性
 * writable プロパティ属性が false の場合、そのプロパティは「書き込み不可」になります。
 * 代入ができなくなります。書き込み不可能なプロパティに書き込もうとすると、変更されず、厳格モードではエラーになります。
 */
Object.defineProperty(obj1, "a", {
  value: 37,
  writable: false,
});
try {
  // writable:false のため「書き込み不可」
  obj1.a = 25; // TypeError が発生: "a" is read-only
} catch (e) {
  console.log(e);
} finally {
  console.log(obj1.a);
}

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
/* eslint-disable no-prototype-builtins */
console.log(obj1.hasOwnProperty("a")); // -> true

/**
 * enumerable 属性
 * enumerable プロパティ属性は、そのプロパティが Object.assign() や スプレッド演算子で認識されるかどうかを定義します。
 * Symbol 以外のプロパティでは、 for...in ループや Object.keys() に現れるかどうかも定義します。
 */
const obj2 = {};
Object.defineProperty(obj2, "a", {
  value: 1,
  enumerable: true,
});
console.log(obj2.propertyIsEnumerable("a")); // -> true

Object.defineProperty(obj2, "b", {
  value: 2,
  enumerable: false,
});
console.log(obj2.propertyIsEnumerable("b")); // -> false

Object.defineProperty(obj2, "c", {
  value: 3,
}); // enumerable の既定値は false
console.log(obj2.propertyIsEnumerable("c")); // -> false

obj2.d = 4; // このようにプロパティを生成するとき、 enumerable の既定値は true
console.log(obj2.propertyIsEnumerable("d")); // -> true

for (const i in obj2) {
  console.log(i);
}
// a
// b

console.log(Object.keys(obj2)); // ['a', 'd']
console.log(obj2.hasOwnProperty("d")); // -> true

/**
 * configurable 属性
 * configurable 属性は、プロパティをオブジェクトから削除できるかとプロパティの属性 (value と writable 以外) を変更できるかを制御します。
 */
const obj3 = {};
Object.defineProperty(obj3, "a", {
  get() {
    return 1;
  },
  configurable: false,
});

try {
  Object.defineProperty(obj3, "a", {
    configurable: true,
    enumerable: true,
  });
} catch (e) {
  console.log(e); // -> TypeError: Cannot redefine property: a
}

console.log(obj3.a);
try {
  delete obj3.a; // 何も起きない
} catch (e) {
  console.log(e); // -> TypeError: Cannot delete property 'a' of #<Object>
} finally {
  console.log(obj3.a); // -> 1
}

console.log(obj3.hasOwnProperty("a")); // -> true

const obj4 = {};
Object.defineProperty(obj4, "b", {
  writable: true,
  configurable: false,
});
console.log(obj4.b); // undefined
Object.defineProperty(obj4, "b", {
  value: 1,
}); // 構成可能な値が false の場合でも、オブジェクトは書き込み可能なので、値を置き換えることができる
console.log(obj4.b); // 1
obj4.b = 2; // 割り当てる演算子を使って値を変更することもできる
console.log(obj4.b); // 2
// プロパティの書き込み可能属性を切り替える
Object.defineProperty(obj4, "b", {
  writable: false,
});
try {
  Object.defineProperty(obj4, "b", {
    value: 1,
  });
} catch (e) {
  console.log(e); // TypeError: プロパティは書き込みも構成も可能でないため、変更することができない
}

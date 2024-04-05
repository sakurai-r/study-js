const obj1: { [key: string]: number } = { x: 1 };

obj1.y = 2;

const obj2 = { x: 1, y: 2 };

/**
 * オブジェクトは値で比較しない
 * ２つのオブジェクト値は、両者が同じオブジェクトを参照している場合のみ同一と判定される
 */
console.log(obj1 === obj2); // -> false

interface obj {
  [key: string]: number;
}

// 入れ子のオブジェクトの場合などはエラーになるかも
// 実際に実業務で比較したい場合はユーティリティの関数を使用するといい
export const isEqual = (obj1: obj, obj2: obj) => {
  if (obj1 === obj2) {
    return true;
  }
  // obj1.length は undefined
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};

// JSON に表示されないプロパティを入れるケースがある
// 要素の順番が違うとfalse
// export const isEqual = (obj1: obj, obj2: obj) => {
//  return JSON.stringify(obj1) === JSON.stringify(obj2);
// };

// const x = { x: 2, y: undefined };
// const y = { x: 2 };

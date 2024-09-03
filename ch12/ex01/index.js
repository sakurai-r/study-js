// 明示的にイテレータインタフェース のメソッドを呼ぶ
// ジェネレータ関数によって生成されたオブジェクトがイテレータインタフェースを満たしていることを確認する
// return() や throw() がどのようなときに呼ばれるのか確認する
// ジェネレータ関数の中身がどのタイミングで初めて実行されるか確認する

function counterIter(max) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

function* counterGen(max) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
  } finally {
    console.log("counterGen: finally");
  }
}

const iter = counterIter(2); // -> counterIter

console.log(iter.next()); // -> { value: 1, done: false }
console.log(iter.next()); // -> { value: 2, done: false }
console.log(iter.next()); // -> { value: undefined, done: true }

console.log(iter.return(10)); // -> { value: 10, done: true }

try {
  iter.throw(new Error("test")); // -> counterIter: throw: Error: test
} catch (e) {}

const iter2 = counterIter(2); // -> counterIter
// 間接的に呼ぶ
for (const value of iter2) {
  // return() が呼ばれる
  if (value === 2) {
    break;
  }
  console.log(`{value: ${value}}`);
}
/**
 * counterIter: Symbol.iterator
 * counterIter: next
 * {value: 1}
 * counterIter: next
 * counterIter: next
 * counterIter: return: undefined
 */

const gen = counterGen(2); // -> この時点では何も出力されない

// next() メソッドを呼び出すと、ジェネレータ関数は最初（または現在の位置）から、yield文まで実行される
console.log(gen.next()); // -> { value: 1, done: false }
console.log(gen.next()); // -> { value: 2, done: false }

// return() や throw() が呼ばれた際に、finally ブロックが実行される
console.log(gen.next()); // -> { value: undefined, done: true }

console.log(gen.return(10)); // -> { value: 10, done: true }

try {
  gen.throw(new Error("test error"));
} catch (e) {}

const gen2 = counterGen(2); // -> counterGen

for (const value of gen2) {
  console.log(`{value: ${value}}`);
}
/**
 * counterGen: next
 * {value: 1}
 * counterGen: next
 * {value: 2}
 * counterGen: finally
 */

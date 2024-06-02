//function fizzbuzz(n) {
//  for (let i = 1; i <= n; i++) {
//    if (i % 15 === 0) {
//      console.log("FizzBuzz");
//    } else if (i % 3 === 0) {
//      console.log("Fizz");
//    } else if (i % 5 === 0) {
//      console.log("Buzz");
//    } else {
//      console.log(i);
//    }
//  }
//}

// 連番の生成
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from#%E9%80%A3%E7%95%AA%E3%81%AE%E7%94%9F%E6%88%90%EF%BC%88%E7%AF%84%E5%9B%B2%E6%8C%87%E5%AE%9A%EF%BC%89
function fizzbuzz(n) {
  Array.from({ length: n }, (_, i) => i + 1).forEach((i) => {
    console.log(
      i % 15 === 0
        ? "FizzBuzz"
        : i % 3 === 0
        ? "Fizz"
        : i % 5 === 0
        ? "Buzz"
        : i
    );
  });
}

//function sumOfSquaredDifference(f, g) {
//  let result = 0;
//  for (let i = 0; i < f.length; i++) {
//    result += (f[i] - g[i]) ** 2;
//  }
//  return result;
//}

function sumOfSquaredDifference(f, g) {
  return f.map((v, i) => (v - g[i] ** 2).reduce((x, y) => x + y, 0));
}

//function sumOfEvensIsLargerThan42(array) {
//  let sum = 0;
//  for (let i = 0; i < array.length; i++) {
//    if (array[i] % 2 !== 0) {
//      continue;
//    }
//    sum += array[i];
//    if (sum >= 42) {
//      return true;
//    }
//  }
//  return false;
//}

function sumOfEvensIsLargerThan42(array) {
  return array.filter((v) => v % 2 === 0).reduce((x, y) => x + y, 0) >= 42;
}

export const fizzbuzz = ()=>Array.from({length:100},(_, i) =>(i+1)%15?(i+1)%3?(i+1)%5?i+1:"Buzz":"Fizz":"FizzBuzz").join("\n")+"\n";
// prettier-ignore

// i が 1 の場合
// i % 15 ? ( i % 3 ? ( i % 5 ? i : "Buzz") : "Fizz") : "FizzBuzz"
// i % 15 ? ( i % 3 ? i : "Fizz") : "FizzBuzz"
// i % 15 ? i : "FizzBuzz"
// i

// i が 15 の場合
// i % 15 ? ( i % 3 ? ( i % 5 ? i : "Buzz") : "Fizz") : "FizzBuzz"
// i % 15 ? ( i % 3 ? "Buzz" : "Fizz") : "FizzBuzz"
// i % 15 ? "Fizz": "FizzBuzz"
// "FizzBuzz"

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Conditional_operator#%E6%9D%A1%E4%BB%B6%E3%81%AE%E9%80%A3%E9%8E%96
/**
 * 三項演算子は右結合で、すなわち以下のような方法で if … else if … else if … else の連鎖と同様に「連鎖」させることができます。
 */

//function example(…) {
//  return condition1 ? value1
//       : condition2 ? value2
//       : condition3 ? value3
//       : value4;
//}

// 以下のものと同等。

//function example(…) {
//  if (condition1) { return value1; }
//  else if (condition2) { return value2; }
//  else if (condition3) { return value3; }
//  else { return value4; }
//}

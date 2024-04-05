const fib = (n: number): number => {
  if (n <= 1) {
    return n;
  }

  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    const sum = a + b;
    a = b;
    b = sum;
  }
  return b;
  /**
   * https://ja.javascript.info/task/fibonacci-numbers
   * フィボナッチ数(Fibonacci numbers)の配列には Fn = Fn-1 + Fn-2 という式があります。つまり、次の数字は前の2つの数字の合計です。
   * 最初の2角数値は 1 で、次に 2(1+1)、次は 3(1+2), 5(2+3), と続きます: 1, 1, 2, 3, 5, 8, 13, 21....
   * return fib(n - 1) + fib(n - 2); の場合
   * fib(5) = fib(4) + fib(3)
   * fib(4) = fib(3) + fib(2)
   * の様に同じ値が何度も何度も再評価されるため、計算の総量が大きく処理が遅くなってしまう。
   */
};

console.log(fib(0));
console.log(fib(1));
console.log(fib(5));
console.log(fib(75));

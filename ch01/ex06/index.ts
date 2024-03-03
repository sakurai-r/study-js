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
    // https://ja.javascript.info/task/fibonacci-numbers
    // return fib(n - 1) + fib(n - 2);
};

console.log(fib(0));
console.log(fib(1));
console.log(fib(5));
console.log(fib(75));

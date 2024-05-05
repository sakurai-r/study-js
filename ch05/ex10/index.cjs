const startTime = performance.now();
const obj = { a: 1, b: 2, c: 3 };
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  with (obj) {
    sum += a + b + c;
  }
}
const endTime = performance.now();
console.log(endTime - startTime);

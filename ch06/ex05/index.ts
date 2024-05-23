const obj1 = {
  a: 1,
  b: "hoge",
  c: 2,
  d: "faga",
};

const obj2: { [key: string]: string | number } = {
  ...obj1,
  a: 2,
  e: 3,
  f: "eee",
};
Object.defineProperty(obj2, "b", {
  value: "bbb",
  enumerable: false,
});

for (const i in obj2) {
  console.log(`${i}: ${obj2[i]}`);
}

/**
 * a: 2
 * c: 2
 * d: faga
 * e: 3
 * f: eee
 */

const object: { [key: string]: string | number | boolean } = {
  a: "somestring",
  b: 42,
  c: false,
};

for (const key in object) {
  console.log(`key：${key}`);
  // key in object いらない
  if (key in object) {
    console.log(`value:${object[key]}`);
  }
}

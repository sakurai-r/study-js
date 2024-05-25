const func = (obj: { [key: string]: string | number }) => {
  const ownProperty = Reflect.ownKeys(obj);
  console.log(ownProperty);

  const enumerableProperty = [];
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      enumerableProperty.push(key);
    }
  }

  return [...ownProperty, ...enumerableProperty];
};

const obj = { a: "aaa", b: 222 };

Object.defineProperty(obj, "c", {
  value: "ccc",
});

const obj2 = Object.create(obj);
Object.defineProperties(obj, {
  d: {
    value: 42,
    enumerable: true,
  },
  e: {
    value: "e",
  },
});

console.log(func(obj2));

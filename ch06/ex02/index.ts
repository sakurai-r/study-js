const obj = {
  key1: "value1",
  key2: 26,
};

const createObj = Object.create(obj);
console.log(Object.getPrototypeOf(createObj)); // -> { key1: 'value1', key2: 26 }

export const pop = (array) => {
  const result = [...array];
  result.pop();
  return result;
};

export const push = (array, element) => {
  const result = [...array];
  result.push(element);
  return result;
};

export const shift = (array) => {
  const result = [...array];
  result.shift();
  return result;
};

export const unshift = (array, element) => {
  const result = [...array];
  result.unshift(element);
  return result;
};

export const sort = (array, callback) => {
  return [...array].sort(callback);
};

const seq = [1, 2, 3, 4, 5];

console.log(pop(seq)); // [1, 2, 3, 4]
console.log(push(seq, 6)); // [1, 2, 3, 4, 5, 6]
console.log(shift(seq)); // [2, 3, 4, 5]
console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
console.log(sort(seq, (a, b) => b - a)); // [5, 4, 3, 2, 1]

// 元の配列は変更されていない
console.log(seq); // [1, 2, 3, 4, 5]

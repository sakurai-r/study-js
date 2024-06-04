import { pop, push, shift, sort, unshift } from ".";

test("pop", () => {
  const seq = [1, 2, 3, 4, 5];
  expect(pop(seq)).toStrictEqual([1, 2, 3, 4]);
  expect(seq).toStrictEqual([1, 2, 3, 4, 5]);
});

test("push", () => {
  const seq = [1, 2, 3, 4, 5];
  expect(push(seq, 6)).toStrictEqual([1, 2, 3, 4, 5, 6]);
  expect(seq).toStrictEqual([1, 2, 3, 4, 5]);
});

test("shift", () => {
  const seq = [1, 2, 3, 4, 5];
  expect(shift(seq)).toStrictEqual([2, 3, 4, 5]);
  expect(seq).toStrictEqual([1, 2, 3, 4, 5]);
});

test("unshift", () => {
  const seq = [1, 2, 3, 4, 5];
  expect(unshift(seq, 0)).toStrictEqual([0, 1, 2, 3, 4, 5]);
  expect(seq).toStrictEqual([1, 2, 3, 4, 5]);
});

test("sort", () => {
  const seq = [1, 2, 3, 4, 5];
  expect(sort(seq, (a, b) => b - a)).toStrictEqual([5, 4, 3, 2, 1]);
  expect(seq).toStrictEqual([1, 2, 3, 4, 5]);
});

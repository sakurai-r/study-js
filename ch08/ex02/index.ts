export const pow = (x: number, n: number) => {
  if (n === 0) {
    return 1;
  }
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
};

export const powerRecursive = (x: number, n: number): number => {
  if (n === 0) {
    return 1;
  }
  if (n < 0) {
    return 1 / powerRecursive(x, -n);
  }
  return x * powerRecursive(x, n - 1);
};

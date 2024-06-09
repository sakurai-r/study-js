export const pow = (x: number, n: number) => {
  if (n === 0) {
    return 1;
  }
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let result = 1;
  while (n > 0) {
    if (n % 2 === 1) {
      result *= x;
    }
    x *= x;
    n = Math.floor(n / 2);
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
  if (n % 2 === 0) {
    const halfPower = powerRecursive(x, n / 2);
    return halfPower * halfPower;
  } else {
    return x * powerRecursive(x, n - 1);
  }
};

export const fibWhile = (): number[] => {
  const fib: number[] = [1, 1];
  let i = 2;
  while (i < 10) {
    fib[i] = fib[i - 1] + fib[i - 2];
    i++;
  }
  return fib;
};

export const fibDoWhile = (): number[] => {
  const fib: number[] = [1, 1];
  let i = 2;
  do {
    fib[i] = fib[i - 1] + fib[i - 2];
  } while (++i < 10);
  return fib;
};

export const fibFor = (): number[] => {
  const fib: number[] = [1, 1];
  for (let i = 2; i < 10; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib;
};

export function* fibonacciSequenceGen() {
  let x = 0,
    y = 1;
  for (;;) {
    yield y;
    [x, y] = [y, x + y]; // 分割代入を行っている。
  }
}

export function fibonacciSequenceIter() {
  let x = 0;
  let y = 1;
  let done = false;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (done) {
        return { value: undefined, done: done };
      }
      const value = y;
      [x, y] = [y, x + y];
      return { value, done: done };
    },
    return(value) {
      done = true;
      return { value, done: done };
    },
    throw(e) {
      done = true;
      throw e;
    },
  };
}

function filter(iterable, predicate) {
  let iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      for (;;) {
        let v = iterator.next();
        if (v.done || predicate(v.value)) {
          return v;
        }
      }
    },
  };
}

function* integerGen(start = 2, end = Infinity) {
  for (let n = start; n <= end; n++) {
    yield n;
  }
}

export function* primes() {
  let iter = integerGen(2);
  for (;;) {
    let prime = iter.next().value;
    yield prime;
    iter = filter(iter, (n) => n % prime !== 0);
  }
}

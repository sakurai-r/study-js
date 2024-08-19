import { fibonacciSequenceGen, fibonacciSequenceIter } from "./index.js";

describe("fibonacciSequenceIter and fibonacciSequenceGen", () => {
  test("next() method should return the same sequence", () => {
    const gen = fibonacciSequenceGen();
    const iter = fibonacciSequenceIter();

    for (let i = 0; i < 10; i++) {
      expect(iter.next()).toEqual(gen.next());
    }
  });

  test("return() method should behave the same", () => {
    const gen = fibonacciSequenceGen();
    const iter = fibonacciSequenceIter();

    gen.next();
    iter.next();

    const genReturnResult = gen.return();
    const iterReturnResult = iter.return();

    expect(iterReturnResult).toEqual(genReturnResult);

    expect(gen.next().done).toBe(true);
    expect(iter.next().done).toBe(true);
  });

  test("throw() method should behave the same", () => {
    const gen = fibonacciSequenceGen();
    const iter = fibonacciSequenceIter();

    gen.next();
    iter.next();

    const testError = new Error("Test error");

    let genErrorCaught = false;
    let iterErrorCaught = false;

    try {
      gen.throw(testError);
    } catch (e) {
      genErrorCaught = true;
      expect(e).toEqual(testError);
    }

    try {
      iter.throw(testError);
    } catch (e) {
      iterErrorCaught = true;
      expect(e).toEqual(testError);
    }

    expect(genErrorCaught).toBe(true);
    expect(iterErrorCaught).toBe(true);

    expect(gen.next().done).toBe(true);
    expect(iter.next().done).toBe(true);
  });
});

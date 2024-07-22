import cache from "./index.js";

function slowFn(obj) {
  let sum = 0;
  while (sum < 1e8) {
    sum++;
  }
  return sum;
}

describe("cache function", () => {
  it("return the same result for the same object and avoid recalculating", () => {
    const cachedSlowFn = cache(slowFn);
    const obj = { a: 1 };

    const result1 = cachedSlowFn(obj);
    expect(result1).toBe(1e8);

    const result2 = cachedSlowFn(obj);
    expect(result2).toBe(1e8);

    const mockSlowFn = jest.fn(slowFn);
    const cachedMockSlowFn = cache(mockSlowFn);
    cachedMockSlowFn(obj);
    cachedMockSlowFn(obj);

    expect(mockSlowFn).toHaveBeenCalledTimes(1);
  });

  it("different objects", () => {
    const cachedSlowFn = cache(slowFn);
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };

    const result1 = cachedSlowFn(obj1);
    const result2 = cachedSlowFn(obj2);

    expect(result1).toBe(1e8);
    expect(result2).toBe(1e8);
  });
});

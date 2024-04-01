import { isEqual } from "./index.ts";

describe("isEqual", () => {
  test.each([
    [{ x: 1 }, { x: 1 }],
    [
      { x: 1, y: 2 },
      { x: 1, y: 2 },
    ],
    [
      { y: 2, x: 1, z: 3 },
      { x: 1, z: 3, y: 2 },
    ],
  ])("isEqual(%o, %o) return true", (obj1, obj2) => {
    expect(isEqual(obj1, obj2)).toEqual(true);
  });

  test.each([
    [{ x: 1 }, { x: 1, y: 2 }],
    [
      { x: 1, y: 3 },
      { x: 1, y: 2 },
    ],
  ])("isEqual(%o, %o) return false", (obj1, obj2) => {
    expect(isEqual(obj1, obj2)).toEqual(false);
  });
});

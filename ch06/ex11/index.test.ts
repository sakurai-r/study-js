import { obj } from "./index.ts";

describe("obj", () => {
  beforeEach(() => {
    obj.r = 0;
    obj.theta = 0;
  });

  test("setting x should update r and theta correctly", () => {
    obj.x = 3;
    expect(obj.r).toBe(3);
    expect(obj.theta).toBe(0);
  });

  test("setting y should update r and theta correctly", () => {
    obj.y = 4;
    expect(obj.r).toBe(4);
    expect(obj.theta).toBe(Math.PI / 2);
  });

  test.each([
    [3, 4, 5, Math.atan2(4, 3)],
    [5, 12, 13, Math.atan2(12, 5)],
    [8, 15, 17, Math.atan2(15, 8)],
  ])(
    "setting both x = %s and y = %s should update r = %s and theta = %s",
    (x, y, r, theta) => {
      obj.x = x;
      obj.y = y;
      expect(obj.r).toBe(r);
      expect(obj.theta).toBe(theta);
    }
  );

  test("setting x to NaN should throw an error", () => {
    expect(() => {
      obj.x = NaN;
    }).toThrow("Error: The value of 'x' cannot be NaN.");
  });

  test("setting y to NaN should throw an error", () => {
    expect(() => {
      obj.y = NaN;
    }).toThrow("Error: The value of 'y' cannot be NaN.");
  });
});

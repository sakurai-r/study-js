import { Day, isHolidayIf, isHolidaySwitch } from "./index.ts";

describe("isHolidayIf", () => {
  test.each([
    ["月", false],
    ["火", false],
    ["水", false],
    ["木", false],
    ["金", false],
    ["土", true],
    ["日", true],
  ])('isHolidayIf("%s")=>"%s"', (input, expected) => {
    expect(isHolidayIf(input as Day)).toBe(expected);
  });
});

describe("isHolidaySwitch", () => {
  test.each([
    ["月", false],
    ["火", false],
    ["水", false],
    ["木", false],
    ["金", false],
    ["土", true],
    ["日", true],
  ])('isHolidaySwitch("%s")=>"%s"', (input, expected) => {
    expect(isHolidaySwitch(input as Day)).toBe(expected);
  });
});

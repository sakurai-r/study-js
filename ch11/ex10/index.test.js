import {
  getDaysInMonth,
  getWeekdaysCount,
  getDayOfWeek,
  getFirstDayOfPreviousMonth,
} from "./index.js";

test("getDaysInMonth()", () => {
  expect(getDaysInMonth(2024, 2)).toBe(29);
  expect(getDaysInMonth(2023, 2)).toBe(28);
  expect(getDaysInMonth(2024, 4)).toBe(30);
  expect(getDaysInMonth(2024, 1)).toBe(31);
});

test("getWeekdaysCount()", () => {
  expect(getWeekdaysCount("2024-07-01", "2024-07-31")).toBe(23);
  expect(getWeekdaysCount("2024-07-01", "2024-07-07")).toBe(5);
});

test("getDayOfWeek()", () => {
  expect(getDayOfWeek("2024-08-02", "ja-JP")).toBe("金曜日");
  expect(getDayOfWeek("2024-08-02", "en-US")).toBe("Friday");
  expect(getDayOfWeek("2024-08-02", "fr-FR")).toBe("vendredi");
});

describe("getFirstDayOfPreviousMonth()", () => {
  test.each([
    [new Date(2024, 1, 15), new Date(2024, 0, 1)],
    [new Date(2024, 2, 15), new Date(2024, 1, 1)],
    [new Date(2024, 11, 15), new Date(2024, 10, 1)],
  ])(
    "returns the first day of the previous month for %s",
    (inputDate, expectedDate) => {
      const mockDate = jest
        .spyOn(global, "Date")
        .mockImplementation(() => inputDate);

      const result = getFirstDayOfPreviousMonth();
      expect(result.getFullYear()).toBe(expectedDate.getFullYear());
      expect(result.getMonth()).toBe(expectedDate.getMonth());
      expect(result.getDate()).toBe(expectedDate.getDate());
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);

      mockDate.mockRestore();
    }
  );
});

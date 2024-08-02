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

test("getFirstDayOfPreviousMonth()", () => {
  const now = new Date();
  const previousMonthDate = getFirstDayOfPreviousMonth();

  now.setDate(1);
  now.setHours(0, 0, 0, 0);
  if (now.getMonth() === 0) {
    now.setFullYear(now.getFullYear() - 1);
    now.setMonth(11);
  } else {
    now.setMonth(now.getMonth() - 1);
  }

  expect(previousMonthDate.toISOString()).toBe(now.toISOString());
});

import { returnArray, squared, nowTime } from "./index.ts";

describe("returnArray", () => {
  const spyConsoleLog = jest.spyOn(global.console, "log").mockImplementation();

  beforeEach(() => {
    spyConsoleLog.mockClear();
  });

  test.each([
    {
      n: 1,
      c: "a",
      expected: ["a"],
    },
    {
      n: 3,
      c: "abc",
      expected: ["abc", "abc", "abc"],
    },
  ])("return(%s, %s) => %s", ({ n, c, expected }) => {
    expect(returnArray(n, c)).toStrictEqual(expected);
    expect(global.console.log).toHaveBeenCalledTimes(n);
  });
});

describe("squared", () => {
  test.each([
    {
      x: 0,
      expected: 0,
    },
    {
      x: 4,
      expected: 16,
    },
    {
      x: -5,
      expected: 25,
    },
  ])("squared(%s, %s) => %s", ({ x, expected }) => {
    expect(squared(x)).toStrictEqual(expected);
  });
});

describe("nowTime", () => {
  jest.useFakeTimers().setSystemTime(new Date("2024/6/9 16:15:18"));
  test("nowTime() => {now: nowTime}", () => {
    expect(nowTime()).toStrictEqual({ now: "2024/6/9 16:15:18" });
  });
});

import { retryWithExponentialBackoff } from "./index.js";

jest.useFakeTimers();

describe("retryWithExponentialBackoff", () => {
  it("true if func returns true on the first try", () => {
    const func = jest.fn().mockReturnValue(true);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 3, callback);

    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true);
  });

  it("correct number of times if func returns false", () => {
    const func = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValue(true);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 3, callback);

    jest.advanceTimersByTime(1000);
    jest.advanceTimersByTime(2000);

    expect(func).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(true);
  });

  it("false if func never returns true within maxRetry", () => {
    const func = jest.fn().mockReturnValue(false);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 3, callback);

    jest.advanceTimersByTime(1000);
    jest.advanceTimersByTime(2000);
    jest.advanceTimersByTime(4000);

    expect(func).toHaveBeenCalledTimes(4);
    expect(callback).toHaveBeenCalledWith(false);
  });

  it("false if func fails and maxRetry is 0", () => {
    const func = jest.fn().mockReturnValue(false);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 0, callback);

    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(false);
  });
});

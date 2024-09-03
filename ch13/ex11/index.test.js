import { retryWithExponentialBackoff } from "./index.js";

describe("retryWithExponentialBackoff", () => {
  test("resolve immediately if the function succeeds on the first try", async () => {
    const mockFunc = jest.fn().mockResolvedValue("success");

    const resultPromise = await retryWithExponentialBackoff(mockFunc, 3);

    expect(resultPromise).toBe("success");
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  test("retry the function up to maxRetry times if it fails", async () => {
    const mockFunc = jest
      .fn()
      .mockRejectedValueOnce(new Error("failure"))
      .mockRejectedValueOnce(new Error("failure"))
      .mockResolvedValue("success");

    const resultPromise = await retryWithExponentialBackoff(mockFunc, 3);

    expect(resultPromise).toBe("success");
    expect(mockFunc).toHaveBeenCalledTimes(3);
  }, 20000);
});

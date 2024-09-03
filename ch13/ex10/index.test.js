import { fetchSumOfFileSizes } from "./index.js";
import { beforeFetchSumOfFileSizes } from "./before.js";

test("fetchSumOfFileSizes", async () => {
  let result;
  let expected;
  await fetchSumOfFileSizes("ch13/ex03", (err, size) => {
    result = size;
  });
  beforeFetchSumOfFileSizes("ch13/ex03", (err, size) => {
    expected = size;
  });
  expect(result).toBe(expected);
});

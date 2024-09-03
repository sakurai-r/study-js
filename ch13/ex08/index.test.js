import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.js";
import {
  beforeFetchFirstFileSize,
  beforeFetchSumOfFileSizes,
} from "./before.js";

test("fetchFirstFileSize", async () => {
  let result;
  await fetchFirstFileSize("ch13/ex03", (err, size) => {
    let expected;
    beforeFetchFirstFileSize("ch13/ex03", (err, size) => {
      expected = size;
    });
    result = size;
    expect(result).toBe(expected);
  });
});

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

import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.js";
import {
  beforeFetchFirstFileSize,
  beforeFetchSumOfFileSizes,
} from "./before.js";

test("fetchFirstFileSize()", async () => {
  let result;
  fetchFirstFileSize("ch13/ex03", (err, size) => {
    let expected;
    beforeFetchFirstFileSize("ch13/ex03", (err, size) => {
      expected = size;
    });
    result = size;
    expect(result).toBe(expected);
  });
});

test("fetchSumOfFileSizes()", async () => {
  let result;
  fetchSumOfFileSizes("ch13/ex03", (err, size) => {
    let expected;
    beforeFetchSumOfFileSizes("ch13/ex03", (err, size) => {
      expected = size;
    });
    result = size;
    expect(result).toBe(expected);
  });
});

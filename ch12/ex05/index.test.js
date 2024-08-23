import { readLines } from "./index.js";

describe("readLines", () => {
  test("yield each line correctly", () => {
    const testFilePath = "./ch12/ex05/text.txt";
    const expectedLines = [
      "Hello, World",
      "This is a test file.",
      "It contains multiple lines.",
      "Each line ends with a newline character.",
      "This is the last line.",
    ];

    const lines = [...readLines(testFilePath)];
    expect(lines).toStrictEqual(expectedLines);
  });

  test("handle files with no newline at the end", () => {
    const noNewlineFilePath = "./ch12/ex05/noNewLine.txt";

    const lines = [...readLines(noNewlineFilePath)];
    expect(lines).toStrictEqual(["This file has no newline at the end"]);
  });

  test("return an empty array for an empty file", () => {
    const emptyFilePath = "./ch12/ex05/empty.txt";

    const lines = [...readLines(emptyFilePath)];
    expect(lines).toStrictEqual([]);
  });
});

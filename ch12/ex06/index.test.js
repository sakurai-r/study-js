import { walk } from "./index.js";

describe("walk", () => {
  test("correctly iterate over files and directories", () => {
    const path = "./ch12";
    const expected = [
      { path: "ch12\\ex01", isDirectory: true },
      { path: "ch12\\ex01\\index.js", isDirectory: false },
      { path: "ch12\\ex02", isDirectory: true },
      { path: "ch12\\ex02\\index.js", isDirectory: false },
      { path: "ch12\\ex02\\index.test.js", isDirectory: false },
      { path: "ch12\\ex03", isDirectory: true },
      { path: "ch12\\ex03\\index.js", isDirectory: false },
      { path: "ch12\\ex03\\index.test.js", isDirectory: false },
      { path: "ch12\\ex04", isDirectory: true },
      { path: "ch12\\ex04\\index.js", isDirectory: false },
      { path: "ch12\\ex04\\index.test.js", isDirectory: false },
      { path: "ch12\\ex05", isDirectory: true },
      { path: "ch12\\ex05\\empty.txt", isDirectory: false },
      { path: "ch12\\ex05\\index.js", isDirectory: false },
      { path: "ch12\\ex05\\index.test.js", isDirectory: false },
      { path: "ch12\\ex05\\noNewLine.txt", isDirectory: false },
      { path: "ch12\\ex05\\text.txt", isDirectory: false },
      { path: "ch12\\ex06", isDirectory: true },
      { path: "ch12\\ex06\\index.js", isDirectory: false },
      { path: "ch12\\ex06\\index.test.js", isDirectory: false },
      { path: "ch12\\README.md", isDirectory: false },
    ];

    expect([...walk(path)]).toStrictEqual(expected);
  });
});

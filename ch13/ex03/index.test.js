import { readdir, stat } from "./index.js";

describe("readdir()", () => {
  test("return directory contents for a valid path", () => {
    readdir("./ch13/ex03").then((dir) =>
      expect(dir).toStrictEqual(["index.js", "index.test.js"])
    );
  });
  test("throw an error for an invalid path", () => {
    expect(readdir("./ch13/ex3")).rejects.toThrow();
  });
});

describe("stat()", () => {
  test("identify a directory correctly", () => {
    stat("./ch13/ex03").then((stat) => {
      expect(stat.isDirectory()).toBe(true);
    });
  });
  test("identify a file correctly", () => {
    stat("./ch13/ex03/index.js").then((stat) => {
      expect(stat.isDirectory()).toBe(false);
    });
  });
  test("throw an error for an invalid path", () => {
    expect(stat("./ch13/ex3")).rejects.toThrow();
  });
});

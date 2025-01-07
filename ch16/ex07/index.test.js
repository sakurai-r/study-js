import { checkEntry } from "./index.js";

describe("checkEntry()", () => {
  it("return 'file' for a regular file", async () => {
    const result = await checkEntry("./ch16/ex07/test/file.txt");
    expect(result).toBe("file");
  });

  it("return 'directory' for a directory", async () => {
    const result = await checkEntry("./ch16/ex07/test/dir");
    expect(result).toBe("directory");
  });

  it("return an error for non-existent paths", async () => {
    const result = await checkEntry("./non-existent");
    expect(result.message).toMatch(/no such file or directory/i);
  });
});

import { walk } from "./index.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";

jest.mock("node:fs/promises");

describe("walk()", () => {
  let mockReaddir;

  beforeAll(() => {
    mockReaddir = fs.readdir;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("walk through all files and directories", async () => {
    mockReaddir.mockImplementation(async (dirPath) => {
      switch (dirPath) {
        case ".":
          return [
            { name: "A", isDirectory: () => true },
            { name: "B", isDirectory: () => true },
            { name: "foo.txt", isDirectory: () => false },
          ];
        case path.join(".", "B"):
          return [{ name: "C", isDirectory: () => true }];
        case path.join(".", "B", "C"):
          return [{ name: "buz.txt", isDirectory: () => false }];
        default:
          return [];
      }
    });

    const expectedResults = [
      { path: "A", isDirectory: true },
      { path: "B", isDirectory: true },
      { path: "foo.txt", isDirectory: false },
      { path: path.join("B", "C"), isDirectory: true },
      { path: path.join("B", "C", "buz.txt"), isDirectory: false },
    ];

    const results = [];
    for await (const entry of walk(".")) {
      results.push(entry);
    }

    expect(results).toEqual(expect.arrayContaining(expectedResults));
  });
});

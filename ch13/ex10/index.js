import * as fs from "node:fs/promises";
import { join } from "node:path";

export async function fetchSumOfFileSizes(path) {
  try {
    const files = await fs.readdir(path);

    return Promise.all(
      files.map((file) => fs.stat(join(path, file)).then((stats) => stats.size))
    ).then((sizes) => sizes.reduce((x, y) => x + y, 0));
  } catch (err) {
    throw err;
  }
}

import * as fs from "node:fs/promises";
import { join } from "node:path";

export async function fetchFirstFileSize(path) {
  try {
    const files = await fs.readdir(path);

    if (files.length === 0) {
      return null;
    }

    const stats = await fs.stat(join(path, files[0]));
    return stats.size;
  } catch (err) {
    throw err;
  }
}

export async function fetchSumOfFileSizes(path) {
  try {
    const files = await fs.readdir(path);

    let total = 0;

    for (const file of files) {
      const stats = await fs.stat(join(path, file));
      total += stats.size;
    }

    return total;
  } catch (err) {
    throw err;
  }
}

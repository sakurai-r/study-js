import * as fs from "node:fs/promises";
import * as path from "node:path";

export async function* walk(rootPath) {
  const entries = await fs.readdir(rootPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(rootPath, entry.name);
    const isDirectory = entry.isDirectory();

    yield {
      path: fullPath,
      isDirectory: isDirectory,
    };

    if (isDirectory) {
      yield* walk(fullPath);
    }
  }
}

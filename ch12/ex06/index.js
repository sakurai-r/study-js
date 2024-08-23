import * as fs from "node:fs";
import * as path from "node:path";

export function* walk(rootPath) {
  const entries = fs.readdirSync(rootPath, { withFileTypes: true });

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

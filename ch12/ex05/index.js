import * as fs from "node:fs";

export function* readLines(filePath) {
  const fd = fs.openSync(filePath, "r");
  const buffer = Buffer.alloc(1024);
  let pendingLine = "";

  try {
    for (;;) {
      const numBytesRead = fs.readSync(fd, buffer, 0, buffer.length, null);

      if (numBytesRead === 0) {
        break;
      }

      const chunk = pendingLine + buffer.toString("utf8", 0, numBytesRead);
      const lines = chunk.split("\n");
      // \n を含まない不完全な行を格納
      pendingLine = lines.pop() || "";

      yield* lines;
    }

    if (pendingLine !== "") {
      yield pendingLine;
    }
  } finally {
    fs.closeSync(fd);
  }
}

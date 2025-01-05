import { stat } from "node:fs/promises";

export const checkEntry = async (path) => {
  try {
    const stats = await stat(path);
    if (stats.isFile()) {
      return "file";
    }

    if (stats.isDirectory()) {
      return "directory";
    }
  } catch (err) {
    return err;
  }
};

import * as fs from "node:fs";

// https://nodejs.org/api/fs.html#fsreaddirpath-options-callback
export function readdir(path, options) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err, dir) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(dir);
    });
  });
}

// https://nodejs.org/api/fs.html#fsstatpath-options-callback
export function stat(path, options) {
  return new Promise((resolve, reject) => {
    fs.stat(path, options, (err, stat) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stat);
    });
  });
}

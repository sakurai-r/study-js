import * as fs from "node:fs";

// https://nodejs.org/api/fs.html#fsreaddirpath-options-callback
function readdir(path, options) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

console.log(fs.readdir("./ch13"));
readdir("./ch13").then((v) => console.log(v));

// https://nodejs.org/api/fs.html#fsstatpath-options-callback
function stat(path, options) {
  return new Promise((resolve, reject) => {
    fs.stat(path, options, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

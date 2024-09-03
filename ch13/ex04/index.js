import * as fsPromises from "node:fs/promises";

export function fetchFirstFileSize(path, callback) {
  fsPromises
    .readdir(path)
    .then((files) => {
      if (files.length === 0) {
        callback(null, null);
        return;
      }
      fsPromises
        .stat([path, files[0]].join("/"))
        .then((stats) => callback(null, stats.size))
        .catch((err) => callback(err));
    })
    .catch((err) => callback(err));
}

export function fetchSumOfFileSizes(path, callback) {
  fsPromises
    .readdir(path)
    .catch((err) => callback(err))
    .then((files) => {
      let total = 0;
      const rest = [...files];

      function iter() {
        if (rest.length === 0) {
          callback(null, total);
          return;
        }

        const next = rest.pop();
        fsPromises
          .stat([path, next].join())
          .catch((err) => {
            callback(err);
          })
          .then((stats) => {
            total += stats.size;
            iter();
          });
      }
      iter();
    });
}
fetchFirstFileSize("ch13/ex03", (err, size) => console.log(size));

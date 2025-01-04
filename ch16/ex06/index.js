import fs from "fs";

fs.truncate("./ex06/file.txt", 10, (err) => {
  if (err) {
    throw err;
  }
  console.log("file.txt was truncated.");
});

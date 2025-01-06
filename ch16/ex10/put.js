import fs from "fs";

// NOTE: file.txt の内容をアップロード
fetch("http://localhost:8000/large_image.jpeg", {
  method: "PUT",
  body: fs.createReadStream("large_image.jpeg"),
  duplex: "half",
});

//fetch("http://localhost:8000/file.txt", {
//  method: "PUT",
//  body: fs.readFileSync("file.txt"),
//  duplex: "half",
//});

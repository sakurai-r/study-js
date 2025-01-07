import fs from "fs";

// NOTE: file.txt の内容をアップロード
fetch("http://localhost:8000/1GB.png", {
  method: "PUT",
  body: fs.createReadStream("1GB.png"),
  duplex: "half",
});

//fetch("http://localhost:8000/1GB.png", {
//  method: "PUT",
//  body: fs.readFileSync("1GB.png"),
//  duplex: "half",
//});

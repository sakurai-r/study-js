import fs from "fs";
import iconv from "iconv-lite";

// ストリームを使用してShift_JISからUTF-8に変換して表示
const readStream = fs.createReadStream("hello.txt");

readStream
  .pipe(iconv.decodeStream("Shift_JIS"))
  .on("data", (chunk) => {
    console.log(chunk);
  })
  .on("error", (err) => {
    console.error("ファイルの読み込み中にエラーが発生しました:", err);
  });

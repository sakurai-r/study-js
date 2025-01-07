const express = require("express");
const path = require("path");
const fs = require("fs");

// 指定されたルートディレクトリとポートでサーバーを起動する
export function serve(rootDirectory, port) {
  const app = express();

  // http://expressjs.com/ja/api.html#app.all
  app.all("/test/mirror", (request, response) => {
    // レスポンスヘッダを設定する。
    response.setHeader("Content-Type", "text/plain; charset=UTF-8");
    // レスポンスのステータスコードを指定する。
    response.writeHead(200); // 200 OK
    // レスポンスボディの最初はリクエスト。
    response.write(
      `${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`
    );
    // リクエストヘッダを出力する。
    let headers = request.rawHeaders;
    for (let i = 0; i < headers.length; i += 2) {
      response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
    }
    // ヘッダの末尾に空行を追加する。
    response.write("\r\n");
    // 次に、リクエストボディをレスポンスボディにコピーする必要がある。
    // 両方ともストリームなので、パイプを使うことができる。
    request.pipe(response);
  });

  // 静的ファイルを提供するミドルウェア
  // http://expressjs.com/ja/api.html#app.use
  app.use((request, response) => {
    const filePath = path.resolve(rootDirectory, request.path.substring(1));

    // ファイルが存在するか確認
    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        response.setHeader("Content-Type", "text/plain; charset=UTF-8");
        response.status(404).send(`File not found: ${request.path}`);
        return;
      }

      // ファイルの拡張子に基づいてContent-Typeを設定
      const ext = path.extname(filePath);
      let type;
      switch (ext) {
        case ".html":
        case ".htm":
          type = "text/html";
          break;
        case ".js":
          type = "text/javascript";
          break;
        case ".css":
          type = "text/css";
          break;
        case ".png":
          type = "image/png";
          break;
        case ".txt":
          type = "text/plain";
          break;
        default:
          type = "application/octet-stream";
          break;
      }
      response.setHeader("Content-Type", type);

      // ファイルをストリームでレスポンスに送信
      const stream = fs.createReadStream(filePath);
      stream.pipe(response);
    });
  });

  // サーバーを起動
  // http://expressjs.com/ja/api.html#app.listen
  const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  // プロセス終了時にサーバーを閉じる
  process.on("exit", () => {
    console.log(`Closing server on port ${port}`);
    server.close();
  });

  return server;
}

// コマンドライン引数からルートディレクトリとポートを取得
//serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);

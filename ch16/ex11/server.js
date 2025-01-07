import { createServer } from "net";

const port = 3000;
let server;

export const startServer = (callback) => {
  server = createServer((clientSocket) => {
    clientSocket.on("data", (clientData) => {
      // リクエストデータを文字列に変換
      const request = clientData.toString();

      // リクエストの最初の行とヘッダー部分を分割
      const [requestLine, ...headerLines] = request.split("\r\n");
      const [method, path] = requestLine.split(" ");

      // GETリクエスト: フォームを返却
      if (method === "GET" && path === "/") {
        const response = [
          "HTTP/1.1 200 OK",
          "Content-Type: text/html; charset=UTF-8",
          "",
          "<!doctype html>",
          '<html lang="ja">',
          "<head>",
          '  <meta charset="UTF-8" />',
          '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
          "  <title>Greeting Form</title>",
          "</head>",
          "<body>",
          '  <form action="/greeting" method="POST">',
          '    <label for="name">Name:</label>',
          '    <input type="text" id="name" name="name" />',
          '    <label for="greeting">Greeting:</label>',
          '    <input type="text" id="greeting" name="greeting" />',
          '    <button type="submit">Submit</button>',
          "  </form>",
          "</body>",
          "</html>",
          "",
        ].join("\r\n");
        clientSocket.write(response);
      }
      // POSTリクエスト: 入力されたデータを使ったHTMLを返却
      else if (method === "POST" && path === "/greeting") {
        // リクエストボディを抽出
        const body = request.split("\r\n\r\n")[1];
        const params = new URLSearchParams(body);
        const name = params.get("name") || "Unknown"; // デフォルト値は 'Unknown'
        const greeting = params.get("greeting") || "Hello"; // デフォルト値は 'Hello'

        const response = [
          "HTTP/1.1 200 OK",
          "Content-Type: text/html; charset=UTF-8",
          "",
          "<!doctype html>",
          '<html lang="ja">',
          "<head>",
          '  <meta charset="UTF-8" />',
          "  <title>Greeting Result</title>",
          "</head>",
          "<body>",
          `  <p>${greeting}, ${name}!</p>`, // 挨拶メッセージを表示
          "</body>",
          "</html>",
          "",
        ].join("\r\n");
        clientSocket.write(response);
      }
      // 定義されていないパスやメソッドの場合
      else {
        const response = [
          `HTTP/1.1 ${
            method === "GET" || method === "POST"
              ? "404 Not Found"
              : "405 Method Not Allowed"
          }`,
          "Content-Type: text/plain; charset=UTF-8",
          "",
          method === "GET" || method === "POST"
            ? "404 Not Found"
            : "405 Method Not Allowed",
          "",
        ].join("\r\n");
        clientSocket.write(response);
      }

      // ソケットを閉じる
      clientSocket.end();
    });
  });
  server.listen(port, callback);
};

export const stopServer = (callback) => {
  if (server) {
    server.close(callback);
  }
};

//startServer(() => {
//  console.log(`Server is running on port ${port}`);
//});

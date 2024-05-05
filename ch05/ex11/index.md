[Node.js のデバッグ](https://nodejs.org/en/learn/getting-started/debugging)

1. コードのデバッグしたい箇所に`debugger`文を追加する。
   例

   ```js
   function calculate(a, b) {
     debugger; // ここでデバッグ開始
     return a + b;
   }
   const result = calculate(3, 4);
   console.log(result);
   ```

2. コマンド(`node --inspect xxxx.js`)でデバッガーを起動する
   例

   ```
   $ node --inspect-brk ex11/sample.js
   Debugger listening on ws://127.0.0.1:9229/b675c3de-0e38-4806-bd6d-8a3540853ace
   For help, see: https://nodejs.org/en/docs/inspector
   ```

3. Chrome DevTools や VS Code 等のデバッガーツールを使用してデバッグを行う

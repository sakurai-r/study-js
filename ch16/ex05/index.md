> 標準入力、標準出力、標準エラー出力、リダイレクト、パイプという単語について調べなさい
- 標準入力：実行するプログラムへの入力ストリーム。キーボード入力などを受け取る。
- 標準出力：プログラムを実行した結果の出力ストリーム。主に画面に出力される。
- 標準エラー出力：プログラムが異常終了したときのエラーメッセージ出力ストリーム。主に画面に出力される。
- リダイレクト：コマンドの最後に「>出力先ファイル」と記述することで標準出力をファイルに保存できる。
- パイプ：複数のコマンド同士をつなげ、1つ目のコマンドの出力結果を次のコマンドの標準入力にできる。

[参照１](https://webbibouroku.com/Blog/Article/redirect-pipe)
[参照２](https://linux.joho.info/command/stdin-stdout-stderr/#toc4)

> 以下のコードを cat.mjs というファイルに保存し、後述する実験の結果を予測し、実際に実験しなさい

```mjs
import fs from "fs";

if (process.argv.length > 2) {
  // node cat.js foo.txt といった形式ならばファイルを読み込み標準出力に出力する
  fs.createReadStream(process.argv[2]).pipe(process.stdout);
} else {
  // そうでなければ標準入力を標準出力に出力する
  process.stdin.pipe(process.stdout);
}
```

実験: file は適当なファイルとし invalid-file は存在しないファイルとしなさい

`node cat.mjs`
予想
キーボードで入力した標準入力が、そのまま表示される

結果
```
PS C:\Users\r00527802\Desktop\study-js\ch16\ex05> node cat.mjs
a
a
aiueo
aiueo
```

`echo FOO | node cat.mjs`
予想
`FOO` が出力される

結果
```
PS C:\Users\r00527802\Desktop\study-js\ch16\ex05> echo FOO | node cat.mjs
FOO
```

`node cat.mjs > output.txt`
予想
キーボードで入力した標準入力が、 output.txt ファイルに出力される

結果
```
PS C:\Users\r00527802\Desktop\study-js\ch16\ex05> node cat.mjs > output.txt
test
hoge
fugafuga
```

```output.txt
test
hoge
fugafuga

```

`node cat.mjs file`
予想
入力ファイルの中身が標準出力に表示される

結果
```input.txt
input
text
```
```
PS C:\Users\r00527802\Desktop\study-js\ch16\ex05> node cat.mjs input.txt
input
text
```

`node cat.mjs file > output.txt`
予想
入力ファイルの中身が `output.txt` ファイルに出力される。

結果
```
PS C:\Users\r00527802\Desktop\study-js\ch16\ex05> node cat.mjs input.txt > output.txt
```

```input.txt
input
text
```

```output.txt
input
text

```

`node cat.mjs invalid-file > output.txt`
予想
エラー出力が `output.txt` ファイルに出力される。

結果
ターミナルにエラーが出力され、`output.txt`ファイルには何も出力されない。

```
PS C:\Users\r00527802\Desktop\study-js\ch16\ex05> node cat.mjs invalid-file.txt > output.txt
node:events:495
      throw er; // Unhandled 'error' event
      ^

Error: ENOENT: no such file or directory, open 'C:\Users\r00527802\Desktop\study-js\ch16\ex05\invalid-file.txt'
Emitted 'error' event on ReadStream instance at:
    at emitErrorNT (node:internal/streams/destroy:151:8)
    at emitErrorCloseNT (node:internal/streams/destroy:116:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\r00527802\\Desktop\\study-js\\ch16\\ex05\\invalid-file.txt'
}

Node.js v18.20.4
```

```output.txt

```

`node cat.mjs invalid-file 2> error.txt`
予想
`error.txt` ファイルにエラーが出力される

結果
```
PS C:\Users\r00527802\Desktop\study-js\ch16\ex05> node cat.mjs invalid-file.txt 2> error.txt
```

```error.txt
node : node:events:495
発生場所 行:1 文字:1
+ node cat.mjs invalid-file.txt 2> error.txt
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (node:events:495:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError

      throw er; // Unhandled 'error' event
      ^

Error: ENOENT: no such file or directory, open 'C:\Users\r00527802\Desktop\study-js\ch16\ex05\invalid-file.txt'
Emitted 'error' event on ReadStream instance at:
    at emitErrorNT (node:internal/streams/destroy:151:8)
    at emitErrorCloseNT (node:internal/streams/destroy:116:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\r00527802\\Desktop\\study-js\\ch16\\ex05\\invalid-file.txt'
}

Node.js v18.20.4
```

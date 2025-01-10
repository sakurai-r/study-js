# Linux
> echo HELLO | tr [:upper:] [:lower:] > hello.txt

# Windows (WSL が必要)
> wsl echo HELLO | wsl tr [:upper:] [:lower:] > hello.txt

# いずれも hello.txt に `hello` と書き込まれる

# Windows (WSL 不要)
# 問題: なぜ直接 dir を使わず cmd /c を書いているのだろうか？これらの意味は？
> cmd /c dir | cmd /c "findstr DIR"

`dir`コマンドは、Windows の内部コマンドであり、外部プログラムではない。そのため、Node.jsの child_process.spawn や exec は`dir`を直接実行しようとするとエラーになる。
`cmd /c`を使うことで、`dir`などの内部コマンドをcmdプロセスの中で実行させることができる。これにより、`dir`のような外部ファイルとして存在しないコマンドも実行可能になる。

```sh
>  dir | "findstr DIR"
Error: spawn dir ENOENT
    at ChildProcess._handle.onexit (node:internal/child_process:284:19)
    at onErrorNT (node:internal/child_process:477:16)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'spawn dir',
  path: 'dir',
  spawnargs: []
}
```

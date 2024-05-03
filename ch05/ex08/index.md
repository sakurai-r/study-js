```ts
let x = 0;

for (let i = 1; i <= 5; i++) {
  x = i;
  try {
    throw Error();
  } catch {
    break;
  } finally {
    continue;
  }
}

console.log(x);
```

1. `x = 1`
2. try ブロックの実行中に error が発生する
3. catch ブロックで break 文が実行される
4. finally ブロックで continue 文が実行される
5. x がインクリメントされる
6. 2 ~ 5 が繰り返され、 `x = 5` の時点でループを抜ける
7. console.log で `5` が出力される

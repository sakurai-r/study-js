実行結果

```
0 1 0
1 1 0
```

JavaScript インタプリタの解釈

```ts
let a = 0,
  b = 0;

// c = 0; const c = aの時点でコードとして解釈できる。
const c = a;
// b 前置インクリメント;
++b;

// a = 0, b = 1, c = 0;
console.log(a, b, c);

// a 後置インクリメント
// e に格納した後にインクリメントされるので e = 1;
const e = a++;
// a = 1;
b;

console.log(a, b, e);
// a = 1, b = 1, e = 0;
```

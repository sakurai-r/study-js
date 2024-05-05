```js
const startTime = performance.now();
const obj = { a: 1, b: 2, c: 3 };
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += obj.a + obj.b + obj.c;
}
const endTime = performance.now();
console.log(endTime - startTime);
```

`1.39`ミリ秒

```cjs
const startTime = performance.now();
const obj = { a: 1, b: 2, c: 3 };
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  with (obj) {
    sum += a + b + c;
  }
}
const endTime = performance.now();
console.log(endTime - startTime);
```

`243.59`ミリ秒

[mdn web docs_with](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/with)

```
パフォーマンス: with 文は、すべての名前検索において、指定したオブジェクトを最初に検索することを強制します。
したがって、指定したオブジェクトのメンバーでない識別子はすべて、with ブロックの中で見つかるのがより遅くなります。
さらに、オプティマイザーはそれぞれの非修飾識別子が何を参照しているのかについて仮定することができないため、識別子を使用するたびに同じプロパティの検索を繰り返さなければなりません。
```

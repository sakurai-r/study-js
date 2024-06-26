[void 演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/void) は与えられた式を評価し、 `undefined` を返す。

```js
void 0; // -> undefined
void {}; // -> undefined
void "hoge"; // -> undefined
```

[undefined](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined#%E8%A7%A3%E8%AA%AC) は、グローバルスコープ以外のスコープで識別子として使用できる(undefinedは予約語ではないため)。
したがって、別の値に書き換えられている可能性があるため、常に `undefined` を返すとは限らない。

```js
if (foo === undefined) { ... }
```

最近のブラウザー (JavaScript 1.8.5 / Firefox 4 以降) での undefined は、 ECMAScript 5 仕様により、設定不可、書込不可のプロパティとなります。 (そうでない場合でも、上書きは避けてください。)

## グローバルオブジェクトを参照する方法を、ブラウザ内、node内、ブラウザnode問わずの３種記しなさい。

### ブラウザ 内
ウェブ上では [window](https://developer.mozilla.org/ja/docs/Web/API/Window/window), [self](https://developer.mozilla.org/ja/docs/Web/API/Window/self), [frames](https://developer.mozilla.org/ja/docs/Web/API/Window/frames) を使うことができます。しかし Web Worker は self のみを利用することができます
```js
window.foo;
```
[ブラウザ内の window オブジェクト](https://developer.mozilla.org/ja/docs/Glossary/Global_object#%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%83%BC%E5%86%85%E3%81%AE_window_%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88)

### node 内
Node.js で実行されるスクリプトの場合、 [global](https://nodejs.org/api/globals.html#globals_global) と呼ばれるオブジェクトがグローバルオブジェクトになります。
```js
global.foo;
```

### ブラウザnode問わず
globalThis プロパティは、環境を越えてグローバルな this 値 (すなわちグローバルオブジェクト自身) にアクセスするための標準的な方法を提供します。
[globalThis](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/globalThis)
```js
globalThis.foo;
```

## また、ブラウザとnodeのグローバルオブジェクトのプロパティやメソッドを比較し、ブラウザ独自のものを10程度記しなさい。

1. document
2. window.moveTo()
3. window.scrollTo()
4. window.addEventListener()
5. window.removeEventListener()
6. window.innerHeight
7. window.innerWidth
8. window.length
9. window.localStorage
10. window.location
11. window.sessionStorage
12. window.history
13. window.navigator

## 最後に、グローバルオブジェクトにundefinedが定義されていることを確認し、過去のES仕様でどのような問題が発生していたかを記しなさい。

[undefined](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined#%E8%A7%A3%E8%AA%AC) は、グローバルスコープ以外のスコープで識別子として使用できる(undefinedは予約語ではないため)。
したがって、別の値に書き換えられている可能性があるため、常に `undefined` を返すとは限らない。

```js
if (foo === undefined) { ... }
```

最近のブラウザー (JavaScript 1.8.5 / Firefox 4 以降) での undefined は、 ECMAScript 5 仕様により、設定不可、書込不可のプロパティとなります。 (そうでない場合でも、上書きは避けてください。)

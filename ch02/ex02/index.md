### $ を変数名として利用するライブラリ
- [jQuery](https://jquery.com/)

ウェブブラウザ用のJavaScriptコードをより容易に記述できるようにするために設計されたJavaScriptライブラリ

```js
$('#myElement').addClass('highlight');
```

- [Zepto.js](https://zeptojs.com/)
Zeptoはモダンブラウザ向けの最小限のJavaScriptライブラリで、ほぼjQuery互換のAPIを備えている

```js
$('#myElement').hide();
```


### _ を変数名として利用するライブラリ
- [loadash](https://lodash.com/)

Lodashは、配列、数値、オブジェクト、文字列などを扱う手間を省き、JavaScriptを簡単にする。
Lodashのモジュール化されたメソッドは、以下のような用途に最適：
```
1. 配列、オブジェクト、文字列の繰り返し処理
2. 値の操作とテスト
3. 複合関数の作成
```

```js
_.map([1, 2, 3], function(n) { return n * 2; });
```

- [Underscore.js](https://underscorejs.org/)

Underscoreは、組み込みオブジェクトを拡張することなく、便利な関数型プログラミングヘルパーを提供するJavaScriptライブラリ

```js
_.each([1, 2, 3], function(num) {
  console.log(num);
});
```

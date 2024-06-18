```js
function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}

f(`"; alert('アラート');`);
```

[コードインジェクション](https://developer.amazon.com/ja/docs/login-with-amazon/code-injection.html)
ウェブサイトで想定外の行動を引き起こすように入力やパラメーターの値を変更する攻撃手法です。ウェブサイトが受信データを検証せずに処理すると、コードインジェクション攻撃を受ける可能性があります。

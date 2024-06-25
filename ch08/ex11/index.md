自作関数の場合、関数のソースコード全体を返す

```js
const func = () => {
  console.log("func");
};
console.log(func.toString());
// () => {
//   console.log("func");
// }
```

組み込み関数の場合は、関数本体は`[native code]`という文字列になる

```js
console.log(toString.toString());
// function toString() { [native code] }
```

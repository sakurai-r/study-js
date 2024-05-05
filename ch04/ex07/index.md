```js
// このような関数は絶対に書いてはならない。
function set42(key) {
  eval(`${key} = 42;`);
}

// 例:
set42("hello");
console.log(hello); // 42
```

回答

```ts
set42("while(true);");
```

無限ループが発生する。

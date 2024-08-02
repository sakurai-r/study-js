```js
// test.js
console.log("test");
```

```js
// util.js
console.log("util");
```

```js
// index.js
import "./test.js";
import "./test.js";

console.log("index");

import "./util.js";
```

予想

- import は関数宣言と同様に、先頭に巻き上げられる
- エクスポートがないモジュールを取り込んだ場合、最初にインポートされたときに実行され、その後にインポートされても何もしない

```
test
util
index
```

結果

```
test
util
index
```

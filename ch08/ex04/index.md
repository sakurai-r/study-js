```js
const obj = {
  om: function () {
    const nest = {
      nm: function () {
        console.log(this === obj, this === nest);
      },
      arrow: () => {
        console.log(this === obj, this === nest);
      },
    };
    nest.nm();
    nest.arrow();
  },
};
obj.om();
```

### 予想

nest.nm()
this === obj // => false
this === nest // => true

nest.arrow()
this === obj // => false
this === nest // => true

### 結果

obj.om()
function()での呼び出しは、関数を呼び出したオブジェクト`obj`がthisの値になる

nest.nm()
function()での呼び出しは、関数を呼び出したオブジェクト`nest`がthisの値になる
this === obj // => false
this === nest // => true

nest.arrow()
アロー関数はthisを継承する this === `obj`
this === obj // => true
this === nest // => false

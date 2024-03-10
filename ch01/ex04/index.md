予想
```
{answer: 42}

{answer: 0}
```

結果

開発者ツールを開いた状態でhtmlファイルを開いた場合
```
{answer: 0}

{answer: 0}
```

開発者ツールを後から開いた場合
```
{answer: 0}

{answer: 0}
```

コード修正案
```js
  <script>
    const life = { answer: 42 };
    console.log(life);
    const newLife = {...life, answer:0};
    console.log(newLife);
  </script>
```

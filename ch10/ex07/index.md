### [date-fns](https://github.com/date-fns/date-fns/tree/main/src)

src ディレクトリ配下は、各関数ごとにフォルダが分かれている。
フォルダは以下のindex.ts内に、1つの関数が定義され、exportされている。
必要な関数だけを個別にインポートして使用することができるようになっている。

src/
├ add
│ ├ index.ts
│ └ test.ts
...

### [luxon](https://github.com/moment/luxon/tree/master/src)

`src/luxon.js` 内で同じディレクトリの `default export` された複数のクラスを再エクスポートしている。`Luxon` の最も重要な`DateTime`クラスもこちらに集約されている。

src/
├ impl/
├ zones/
├ datetime.js
├ duration.js
├ error.js
├ info.js
├ interval.js
├ luxon.js
...

### [dayjs](https://github.com/iamkun/dayjs/tree/dev/src)

`src/index.js` 内で `Day.js` のメイン機能が `default export` されている。
`src/plugin/` 配下は `Day.js` に追加して機能を拡張・追加することができる独立したモジュールになっている。
src/
├ locale/
├ plugin/
├ constant.js
├ index.js
└ utils.js

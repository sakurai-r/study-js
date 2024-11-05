1. 15.4-10.1 および 15.4-10.2 の ToDo アプリに対してブラウザの開発者ツールから値の変更やプロパティの追加を試してみなさい

2. 開発者ツールで CSS に関して実行できる操作を検索エンジンで調べ、便利だと思ったものを 3 つ挙げなさい

- CSS の値の変更がリアルタイムでできること
- ボックスモデルを確認できること
- レスポンシブデザインをプレビューで確認できること

3. 15.4-10.2 のアプリの body 要素に対し、元々 HTML および JS 内で利用していなかった Tailwind CSS のクラス (bg-rose-600 など何でも良い) を開発者ツールから追加すると変更が反映されないが、これは何故か調べなさい

TailWind CSS はプロジェクトに実際に使用している CSS のみを生成することで、可能な限り小さい CSS ファイルを作成しているため、開発者ツールで追加してもクラスにスタイルが反映されない。

```
Tailwind CSS is incredibly performance focused and aims to produce the smallest CSS file possible by only generating the CSS you are actually using in your project.
```
https://tailwindcss.com/docs/optimizing-for-production

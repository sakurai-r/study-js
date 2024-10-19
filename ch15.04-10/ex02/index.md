1. [Tailwind CSS](https://tailwindcss.com/) がどういったフレームワークか調べなさい。

Tailwind CSS は、すべての HTML ファイル、JavaScript コンポーネント、およびその他のテンプレートをスキャンしてクラス名を検索し、対応するスタイルを生成して、静的 CSS ファイルに書き込むことで機能する。

メリット
- クラス名を一々考えなくていい
- CSS 肥大化が防げる
- 変更がより安全になる(CSSはグローバル、HTMLのクラスはローカルなので)

通常、Web 上で何かをスタイルする必要があるときは、CSSを記述する必要がある。
TailWind を使用すると、既存のクラスを HTML に直接適応してスタイルを設定できる。

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center gap-x-4">
  <div class="shrink-0">
    <img class="size-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```

- Tailwind の flexbox と padding ユーティリティ(flex, shrink-0, p-6)でカード全体のレイアウトを制御
- max-width と margin ユーティリティ(max-w-sm, mx-auto)でカードの幅を制限し、水平方向の中央に配置
- 背景色、ボーダー半径、ボックスシャドウユーティリティ(bg-white, rounded-xl, shadow-lg)
- ロゴ画像の幅と高さを設定するサイズユーティリティ(size-12)
- ロゴとテキストの間隔を扱うギャップユーティリティ(gap-x-4)
- フォントサイズ、テキスト色、フォントウェイトユーティリティ(text-xl, text-black, font-mediumなど)

このアプローチにより、カスタム CSS を 1 行も記述せずに、完全にカスタムのコンポーネント デザインを実装できる。

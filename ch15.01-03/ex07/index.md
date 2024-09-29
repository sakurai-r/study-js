自分が運営する販売サイトにYouTubeのトップページをiframeで組込み、更に自作のscript.jsによりiframe内のデータを分析しようとしています。

```html
<iframe id="other" src="https://www.youtube.com/"></iframe>
<script src="./script.js"></script>
```
```js
(async () => {
  // YouTube が利用者に推薦する動画タイトルを取得すれば、利用者に最適な商品セットを表示できるのではないか？
  const titles = document.getElementById("").contentWindowquerySelectorAll('#video-title');
  for (const t of titles) {
    await fetch("your-server-path", { method: "POST", body: t.textContent })
  }
});
```

しかし、トップページを読み込むとエラーになります。用語「クリックジャッキング」を調べて理由を説明しなさい。

  ウェブサイトの中には、ログイン機能を設け、ログインしている利用者のみが使用可能な機能を提供しているものがあります。該当する機能がマウス操作のみで使用可能な場合、細工された外部サイトを閲覧し操作することにより、利用者が誤操作し、意図しない機能を実行させられる可能性があります。このような問題を「クリックジャッキングの脆弱性」と呼び、問題を悪用した攻撃を、「クリックジャッキング攻撃」と呼びます。

[クリックジャッキング](https://www.ipa.go.jp/security/vuln/websecurity/clickjacking.html)

実際にページを読み込むと以下の様なエラーが発生する。
`フレーム内の “https://www.youtube.com/” の読み込みが “X-Frame-Options” ディレクティブの設定値 “sameorigin” により拒否されました。`

[X-Frame-Options](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/X-Frame-Options) は HTTP のレスポンスヘッダーで、ブラウザーがページを `<frame>`、`<iframe>`、`<embed>`、`<object>` の中に表示することを許可するかどうかを示すために使用する。サイトはコンテンツが他のサイトに埋め込まれないよう保証することで、クリックジャッキング攻撃を防ぐために使用することができる。youtube.comでは、ページ本体と同じオリジンのフレーム内でのみ表示が許可されている。

-------------------------------------------------------------------------
また、script.jsも動作しません。ここで、同一オリジンポリシーがなく、iframe内の他サイトのDOM変更が可能な仕様を想定し、どのような重大な問題が発生しうるか記載しなさい。

同一オリジンポリシーがなく、iframe 内の他サイトのDOM操作が可能な場合、インターネット上の悪意のあるウェブサイトがブラウザー内で JS を実行して、 (ユーザーがサインインしている) サードパーティのウェブメールサービスや (公開 IP アドレスを持たないことで攻撃者の直接アクセスから保護されている) 企業のイントラネットからデータを読み取り、そのデータを攻撃者に中継することができる。
[クロスサイト・スクリプティング](https://www.ipa.go.jp/security/vuln/websecurity/cross-site-scripting.html)

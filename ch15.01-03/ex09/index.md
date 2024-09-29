react 等のフロントエンドフレームワークを使用すると、自動的にエスケープ処理がおこなわれる。

[JSXはインジェクション攻撃を防ぐ](https://ja.legacy.reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks)
  デフォルトでは、React DOM は JSX に埋め込まれた値をレンダー前にエスケープします。このため、自分のアプリケーションで明示的に書かれたものではないあらゆるコードは、注入できないことが保証されます。レンダーの前に全てが文字列に変換されます。これは XSS (cross-site-scripting) 攻撃の防止に役立ちます。

react を使用した場合でも以下のように、要素に対して生の HTML 文字列を渡すことができる。
```jsx
const markup = { __html: '<p>some raw html</p>' };
return <div dangerouslySetInnerHTML={markup} />;
```
元の DOM の innerHTML プロパティも同様、マークアップが完全に信頼できるソースから来ていない限り、この方法を使うと XSS 脆弱性が発生する。

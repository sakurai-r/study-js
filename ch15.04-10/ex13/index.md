15.4-10.11 では #/ や #/active といった URL を利用した。 少し昔だとこのような URL は #!/ や #!/active と ! を付けることもあった (もしかしたら職場でそのようなコードを見るかもしれない)。 このような形式を当時は hashbang と呼んだ。どうしてこのようなスタイルが存在したのだろうか。

参考: [Twitter がページ表示時間を 5 分の 1 に高速化。どのようなテクニックを使ったのか？](https://www.publickey1.jp/blog/12/twitter51.html)


1. ページ全体を再読み込みせずにコンテンツを動的に更新する手法として、[URLのフラグメント](https://developer.mozilla.org/ja/docs/Web/URI/Fragment)部分（#以降）を利用してアプリケーションの状態を表現する方法が広がった。例えば、#activeのようにURLに状態を埋め込むことで、ユーザーが異なるビューに遷移できるようにしていた。

2. この手法では検索エンジンのクローラーが動的に生成されるコンテンツを適切にインデックスできないという問題があるため、サイトのSEO効果が低下し、Googleがコンテンツを正しく認識できなくなった。Googleは、JavaScriptによるナビゲーションを理解させる方法を模索したが、技術的な限界から断念した。

3. この状況を受けて、Googleは#!を用いたURLの後ろに続く部分をクエリパラメータとして解釈し、対応するコンテンツを返すという仕様を公開した。これにより、クローラーが動的コンテンツを適切に取得できるようにした。

4. この仕様公開を受けて、多くの開発者は#!を用いたURLがGoogleから推奨されていると誤解し、これを「唯一の正しい方法」として採用し始めた。その結果、#!を含むURLが広く普及したが、後にHTML5のpushStateやreplaceStateといったHistory APIの登場により、より適切な方法が提供されている。


https://developers.google.com/search/docs/crawling-indexing/url-structure?hl=ja
```
Google は通常フラグメント URL をサポートしていないため、ページのコンテンツを変えるためにフラグメントを使用しないでください。JavaScript を使用してコンテンツを変える場合は、代わりに History API を使用してください。

非推奨: フラグメント URL:

https://example.com/#/potatoes
```

参照: [URLにつく「#!」って何だったの？~Hashbangの復讐~](https://neos21.net/blog/2016/06/14-01.html)
参照: [さらなる「#!」URL批判](https://karasuyamatengu.hatenadiary.org/entry/20110212/1297465199)

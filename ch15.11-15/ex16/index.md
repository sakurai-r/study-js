オリジン間リソース共有（CORS）について、以下の問いに答えなさい。

1. クロスオリジンリクエストに制約が無かった場合、どのような問題が発生するか述べなさい
   クロスオリジンリクエストに制限がない場合、悪意のあるウェブサイトがユーザーの知らないうちに他のサイトへのリクエストを送ることができるため以下の様な脆弱性が発生する。
  - XSS (Cross Site Scripting)
  ユーザーが Web サイトにアクセスすることで不正なスクリプトが Client (Web ブラウザ) で実行されてしまう脆弱性。
  被害例は、Cookie 内のセッション情報を抜き取られて不正ログインを行われる、など。

  - CSRF (Cross-Site Request Forgeries)
  Web アプリケーションのユーザーが、意図しない処理を Web アプリケーション (Web Server) 上で実行される脆弱性。通称「しーさーふ」。
  被害例は、本来はログインしたユーザーしか実行できない記事の投稿処理を勝手にされる、など。

    [なんとなく CORS がわかる...はもう終わりにする。](https://qiita.com/att55/items/2154a8aad8bf1409db2b)

2. クロスオリジンリクエストで メソッド(POST/GET)やリクエストの内容によって Preflight リクエストの有無が異なるのは何故か、その理由を述べなさい
  [単純リクエスト](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS#%E5%8D%98%E7%B4%94%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88)は、[Preflight request](https://developer.mozilla.org/ja/docs/Glossary/Preflight_request) なしで送信される。これは、HTMLフォームがこれらのリクエストを異なるオリジンに送信できるため、サーバーは既に CSRF 対策を講じていると想定されているからである。一方、その他のリクエストはサーバーへの影響が大きいため、Preflaight request が必要となる。
  ```
  リクエストによっては CORS プリフライトを発生させません。これをこの記事では古い CORS 仕様書に倣って単純リクエストと呼んでいますが、 (現在 CORS を定義している) Fetch 仕様書 ではこの用語を使用していません。
  その動機は、HTML 4.0 からの <form> 要素（サイト間 fetch() と XMLHttpRequest に先行する）は、どのオリジンにでも単純なリクエストを送信できるので、サーバーを書く人はすでに cross-site request forgery (CSRF) から保護していなければならないからです。この仮定の下では、 CSRF の脅威はフォーム送信の脅威よりも悪くないので、サーバーはフォーム送信のように見えるすべてのリクエストを受け取ることを（プリフライトリクエストに応答することによって）オプトインする必要はないのです。しかし、サーバーは Access-Control-Allow-Origin を使用して、レスポンスをスクリプトと共有することを選択する必要があります。
  ```
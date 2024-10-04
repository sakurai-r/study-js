問1
async = true にして js を 'load'にする

[参照](https://qiita.com/phanect/items/82c85ea4b8f9c373d684)

domcontentloaded で実施した場合
HTML のパースが完了した直後に発火しするので
全部のライブラリがそろっていない可能性がある

differ で待つ意味もない
```
<script> タグに defer 属性を追加することで、HTML パース完了後、DOMContentLoaded イベントの直前に (※WHATWG 仕様) JS ファイルを実行します。
```

問2
differ のみ


正規表現の処理には予想以上に時間がかかる可能性がある。

例えば利用者によって ^(a|aa)+$ といった文字列が入力されたと考えよう。 この正規表現が "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!" といった文字列にマッチするか調べようとするとどうなるだろうか。

`^` : 文字列の先頭
`(a | aa)+` : `a` または `aa` のどちらか一方の１回以上の繰り返し
`$` : 文字列の最後

1. 先頭の `a` から順番に `(a | aa)`　の `a` にマッチする
2. `!` の手前まで全部マッチした後に、最後の文字が `!` なのでマッチしない
3. `a` と `aa` のすべての組み合わせでマッチするかを検証する
4. 結果的にすべて末尾が `!` なのでマッチしない

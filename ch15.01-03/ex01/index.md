index.html ファイル内の script タグから type="module" 属性を削除した場合、期待通り動作させるにはどうすべきか答えなさい。

`defer`属性をつける
type="module"属性を持つスクリプトは、デフォルトでは、defer 属性を付けられたスクリプ
トと同じようにドキュメントが読み込まれた後に実行されます。

```html
<script defer src="/ch15.01-03/ex01/index.js"></script>
```

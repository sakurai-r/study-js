[JQuery Deferred Object](https://api.jquery.com/category/deferred-object/)
jQuery1.5から導入されたDeferredオブジェクトは、jQuery.Deferred()メソッドを呼び出すことで作成される連鎖可能なユーティリティオブジェクトです。複数のコールバックをコールバックキューに登録したり、コールバックキューを呼び出したり、同期関数や非同期関数の成功や失敗の状態を中継したりすることができます。

DeferredオブジェクトはjQueryオブジェクトがチェーン可能であるのと同様にチェーン可能ですが、独自のメソッドを持っています。Deferredオブジェクトを作成した後、オブジェクトの作成から直接チェインするか、オブジェクトを変数に保存し、その変数に対して1つ以上のメソッドを呼び出す事で、以下のメソッドを使用する事が出来ます。

[Deferred と Promise](https://azu.github.io/promises-book/#deferred-and-promise)

DeferredとPromiseの関係を簡単に書くと以下のようになる。

    Deferred は Promiseを持っている

    Deferred は Promiseの状態を操作する特権的なメソッドを持っている

Promise...値が将来的に正常な値(Fulfilled)か異常な値(Rejected)が入るというものを予約したオブジェクト
Deferred...まだ処理が終わってないということを表すオブジェクトで、 処理が終わった時の結果を取得する機構(Promise)に加えて処理を進める機構をもったもの

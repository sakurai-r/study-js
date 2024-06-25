書籍8.2.1の 「再帰関数とスタック」には、関数が自身を数千回呼び出した場合はエラーが発生すると書かれている。

1. プログラミング言語や処理系によっては、再帰呼び出しを関数の処理の末尾にする(末尾再帰)ことで、スタックオーバーフローが起こらないよう最適化できるものがある。末尾再帰は何故そのような最適化ができるのか答えなさい。

   ある関数`a`が別の関数`b`を末尾呼び出しした場合、`a`の結果(リターン値)は`b`の結果そのものである。したがって、`a`のコールスタックを`b`のコールスタックとして再利用することができる。

   [コールスタック](https://developer.mozilla.org/ja/docs/Glossary/Call_stack)

   ```
   スクリプトが関数を呼び出すとき、インタープリターはそれをコールスタックに追加し、それから関数の実行を始めます。
   その関数から呼び出されたどの関数も、コールスタックのその上に追加され、呼び出し先を実行します。
   現在の関数が終了すると、インタープリターはスタックからそれを外し、最後のコードがリストされている場所から実行を再開します。
   スタックが割り当てられている量よりも多くのスペースを使用した場合、 "stack overflow" エラーとなります。
   ```

1. JavaScript で末尾再帰最適化を実装している処理系を答えなさい。
   利用できる環境があれば、実際に以下の URL を表示・実行してエラーが発生しないことを確認しなさい。
   https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMAhtOAnGKA2AKMALkTBAFsAjAUwwEpEBvAWAChFlxp4kYoa8ADhjgATENGKlKNADSIIccHwyTy1Oo1bt2MYIjwKlNRAD4S9Zm23sMVKCAxIho8VADcW7QF9PNuw55lQWExaEQAKnlFMGU5QxjjAGpEAEZaDysfK1t7R0RefhS5NIys1gUwAGc4HCoAOhw4AHM8VHQsXDwUgAZe3tp01iA

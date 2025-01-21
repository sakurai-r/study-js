> TypeScriptのトランスパイルは@babel/preset-typescriptやtscによって可能だが、それぞれの違いを調べなさい。

### BabelとTypeScriptの違い

`Babel`と`tsc`の違い

1. 型チェックの有無: `tsc`は静的型チェックをおこなうが、`Babel`は型チェックを行わず、主に構文の変換をしている。
2. [const enum](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums)のサポート: `tsc`は`const enum`をサポートしているが、`Babel`はサポートしていない。
3. [デコレータ](https://www.typescriptlang.org/docs/handbook/decorators.html)と[メタデータ](https://www.typescriptlang.org/docs/handbook/decorators.html#metadata): `tsc`はデコレータとメタデータのサポートが進んでおり、これらの機能を活用した高度なメタプログラミングが可能。
4. 高い拡張性: `Babel` は `tsc` よりも拡張性が高く、コードを最適化し使われていないインポートやインライン、定数などを取り除くのに役立つプラグインがたくさんある。 `tsc` はカスタム変換を可能にする独自の Transformer API があるが、`Babel` はプラグインの選択肢が豊富でよりアクセスしやすい。

### どちらを選ぶべきか？
静的型チェックが重要であれば`tsc`を、ビルドプロセスの柔軟性や特定のトランスフォーメーションが必要であれば`Babel`を選択するのが適切。また、組み合わせて使用することで、両者の利点を活用することも可能。


[Babel vs. TypeScript: Choosing the right compiler for your project](https://blog.logrocket.com/babel-vs-typescript-choosing-right-compiler-project/)
[Using Babel with TypeScript](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html)

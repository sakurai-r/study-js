### development

evalを使用して実行している。
デフォルトでは eval ソースマップを使用して、ビルドが速くなる
ソースマップが生成され、ブラウザで元のソースコードを確認しやすくなる
パフォーマンスよりも開発の利便性を重視しており、最小化や圧縮などの最適化は行われない

### production

1行にコードがまとまっていて、他2つと比較してコードにコメントが無い
デフォルトで TerserPlugin などが有効になり、コードが圧縮される
不要なコメントやデバッグ用のコードが削除される
モジュールの最適化（ツリーシェイキングなど）が行われ、バンドルサイズが小さくなる
デフォルトではソースマップが生成されず、実行コードが1行にまとめられる

### none

webpack_modulesにコードをまとめている

https://webpack.js.org/configuration/mode

```
development DefinePluginのprocess.env.NODE_ENVをdevelopmentに設定します。モジュールとチャンクに有用な名前を有効にします。

production DefinePluginのprocess.env.NODE_ENVをproductionに設定します。モジュールとチャンクの決定論的な揶揄名、FlagDependencyUsagePlugin、FlagIncludedChunksPlugin、ModuleConcatenationPlugin、NoEmitOnErrorsPlugin、TerserPluginを有効にします。

none デフォルトの最適化オプションを無効にします。
```

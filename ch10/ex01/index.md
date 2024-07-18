### development

コードは読めるが、改行等がなくまとめられている

### production

### none

元のコードをまとめただけ

https://webpack.js.org/configuration/mode

```
development DefinePluginのprocess.env.NODE_ENVをdevelopmentに設定します。モジュールとチャンクに有用な名前を有効にします。

production DefinePluginのprocess.env.NODE_ENVをproductionに設定します。モジュールとチャンクの決定論的な揶揄名、FlagDependencyUsagePlugin、FlagIncludedChunksPlugin、ModuleConcatenationPlugin、NoEmitOnErrorsPlugin、TerserPluginを有効にします。

none デフォルトの最適化オプションを無効にします。
```

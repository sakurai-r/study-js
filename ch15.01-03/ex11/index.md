以下のhtmlを開き、ボタン押下時のコンソール出力結果を確認しなさい。

```コンソール出力結果
div
button
```

次にcaptureの値を変更しdivとbuttonのコンソール出力順序が逆になることを確認しなさい。

```{ capture: false }とした場合のコンソール出力結果
button
div
```

更にscript中のコメント1.～4.の指示に従いカスタムイベントの関連コードを完成させなさい。


最後にブラウザのデバッグツール(Chromeの場合はDeveloper ToolのEvent Listners)で、btn等に登録されているイベントをそれぞれ確認しなさい。

click
  - div#div
    - handler: ()=>{console.log("div");}
  - button#dtn
    - handler: ()=>{randomEventTarget.trigger();}
  - button#dtn
    - handler: ()=>{console.log("button");}

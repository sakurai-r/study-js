##### 用語「マルチスレッド」について調べなさい
1つのコンピュータープログラムを実行する際に、アプリケーションのプロセス（タスク）を複数のスレッドに分けて並行処理する流れのこと。反対に、シングルスレッドはソースコードの上から順に一つの処理を行う。

##### フィボナッチ数を計算するmFib.jsをスレッド数を変更しながら実行し(*1)、 コンソール出力とOS機能(*2)で結果とスレッド数を確認しなさい。

スレッド : 1
```
Worker 0 execution time: 17.119s
Total execution time: 17.124s
Fibonacci number: 1836311902
```

スレッド : 4
```
Worker 1 execution time: 1.649s
Worker 0 execution time: 3.569s
Worker 3 execution time: 6.589s
Worker 2 execution time: 10.057s
Total execution time: 10.063s
Fibonacci number: 1836311902
```

スレッド : 5
```
Worker 1 execution time: 1.209s
Worker 0 execution time: 2.729s
Worker 4 execution time: 4.666s
Worker 2 execution time: 6.954s
Worker 3 execution time: 9.820s
Total execution time: 9.826s
Fibonacci number: 1836311902
```

スレッド : 6
```
Worker 2 execution time: 745.452ms
Worker 0 execution time: 1.257s
Worker 4 execution time: 1.713s
Worker 1 execution time: 3.839s
Worker 3 execution time: 6.119s
Worker 5 execution time: 9.342s
Total execution time: 9.348s
Fibonacci number: 1836311902
```

スレッド : 8
```
Worker 2 execution time: 372.269ms
Worker 6 execution time: 485.051ms
Worker 3 execution time: 828.793ms
Worker 5 execution time: 1.093s
Worker 4 execution time: 1.546s
Worker 7 execution time: 3.351s
Worker 0 execution time: 5.907s
Worker 1 execution time: 8.406s
Total execution time: 8.412s
Fibonacci number: 1836311902
```

スレッド : 10
```
Worker 1 execution time: 199.772ms
Worker 0 execution time: 248.564ms
Worker 4 execution time: 454.924ms
Worker 5 execution time: 618.857ms
Worker 7 execution time: 791.169ms
Worker 9 execution time: 1.093s
Worker 8 execution time: 1.725s
Worker 3 execution time: 2.507s
Worker 6 execution time: 4.244s
Worker 2 execution time: 6.891s
Total execution time: 6.897s
Fibonacci number: 1836311902
```

スレッド : 12
```
Worker 7 execution time: 131.04ms
Worker 5 execution time: 158.519ms
Worker 2 execution time: 218.249ms
Worker 10 execution time: 287.119ms
Worker 0 execution time: 370.526ms
Worker 6 execution time: 565.159ms
Worker 1 execution time: 730.098ms
Worker 11 execution time: 1.147s
Worker 9 execution time: 1.868s
Worker 3 execution time: 3.257s
Worker 8 execution time: 5.418s
Worker 4 execution time: 7.969s
Total execution time: 7.976s
Fibonacci number: 1836311902
```

CPU スペック
```
論理プロセッサ数: 12
コア数: 10
基本速度: 1.80 GHz
```

論理プロセッサ数が12 コア数が10なので、10～12辺りが理想

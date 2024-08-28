import {
  wait,
  wait0,
  wait1,
  wait2,
  wait3,
  log,
  logA,
  logB,
  logC,
  errX,
  errY,
} from "../index.js";

function f1() {
  // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
  //
  // 回答:
  // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
  //
  // 説明:
  // wait3 の解決後に logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されるため。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                                 wait1
  //                                |-----|
  //                                       logC
  //                                      |-|
  wait3()
    .then(logA)
    .then(() => wait2().then(logB))
    .then(() => wait1().then(logC));
}

//f1();

function f2() {
  // NOTE: 2つ目の then の中で return が無くなっていることに注意 (典型的なミス)
  //
  // 解答例:
  // 3秒後に A が出力され、その1秒後に C が出力され、その1秒後に B が出力される。
  // 2つ目の .then のコールバック関数が値を return していないため、この .then が返す Promise は即解決される。
  // このため logA() の実行すぐ後に wait1().then(...) が実行され C が先に出力される。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                  wait1
  //                 |-----|
  //                        logC
  //                       |-|
  wait3()
    .then(logA)
    .then(() => {
      wait2().then(logB);
    })
    .then(() => wait1().then(logC));
}

//f2();

function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  //
  // 予想：
  // 0秒後に A が出力され、その直後に errX が発生する。
  //
  // 解答:
  // C が出力された0秒後に A が出力され、その直後に errX が発生する。
  // finally ブロックは同期的に実行されるため、logC() が logA より先に実行される。
  // Promise が解決された後に例外が発生するが、非同期処理内で発生した例外はその非同期処理内でしかキャッチできないため　B は出力されない。
  //
  // 図解:
  //  wait0
  // |----------|
  //            logA
  //            |-|
  //              errX
  //              |-|
  //   logC
  //   |-|
  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}

//f3();

function f4() {
  // NOTE: f5 との比較用
  //
  // 予想：
  // 2 秒後に A が出力され、その 1秒後に B が出力され、その直後に 100 が出力される。
  //
  // 解答:
  // 予想と同じ。
  // 2 秒後に Promise が解決されると、1 つ目の then() が実行される。
  // A が出力された後、 return 40 によって次の then() に 40 が渡される。
  // 2 番目の then() が実行され value には 40 が入るがこの値は使用されない。
  // 1 秒後に B が出力され、 return 100 によって次の then() に100 が渡される。
  // 3 番目の then() が実行され value には 100 が渡される。
  // 100 が出力される。
  //
  // 図解:
  //  wait2
  // |----------|
  //            logA
  //            |-|
  //              wait(1000)
  //              |-----|
  //                    logB
  //                    |-|
  //                      log(1000)
  //                      |-|
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

//f4();

function f5() {
  // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
  //
  // 予想：
  // 1秒後に B が出力され、2 秒後に A が出力され、その直後に 40 が出力される。
  //
  // 解答:
  // 予想と同じ。
  // wait1().then()は 2 つ目の then() の中で関数ではなく Promise になっているため、
  // wait2() の解決を待たずに即時実行される。
  // そのため、1 秒後に B が出力される。
  // 2 秒後に wait2() が解決され、 A が出力され、return 40 によって3つ目の then() に 40 が渡される。
  // 40 が出力される。
  //
  // 図解:
  //  wait2
  // |----------|
  //            logA
  //            |-|
  //              log(1000)
  //              |-|
  //  wait(1000)
  // |----|
  //      logB
  //      |-|

  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then(
      wait1().then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

//f5();

function f6() {
  // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか
  //
  // 予想：
  // 1秒後に A が出力され、 2 秒後に A が出力され、3 秒後に C が出力される。
  //
  // 解答:
  // 予想と同じ。
  // wait1().then(logA) が解決されると wait1 と wait2 がそれぞれ実行される。
  // 1 秒後に B が出力され、2 秒後に C が出力される
  //
  // 図解:
  //  wait1
  // |-----|
  //       logA
  //       |-|
  //         wait1
  //         |------|
  //                logB
  //                |-|
  //         wait2
  //         |--------------|
  //                        logC
  //                        |-|
  const p = wait1().then(logA);
  p.then(() => wait1()).then(logB);
  p.then(() => wait2()).then(logC);
}

//f6();

function f7() {
  // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
  // (= 解決済みの Promise の then を呼び出すとどうなるか)
  //
  // 予想：
  // 1秒後に A が出力され、 2 秒後に B が出力され、直後に C が出力される。
  //
  // 解答:
  // 予想と同じ。
  // wait1() が実行された直後に wait2() も実行される。
  // 1 秒待機が完了し、 A が出力される。
  // 2 秒待機が完了し、then() の処理に移るが、p は解決されているので即時 B が出力される。
  // 次の then() に移り、C が出力される。
  //
  // 図解:
  //  wait1
  // |-----|
  //       logA
  //       |-|
  // wait2
  // |-----------|
  //             logB
  //             |-|
  //               logC
  //               |-|
  const p = wait1().then(logA);
  wait2()
    .then(() => {
      return p.then(logB);
    })
    .then(logC);
}

//f7();

function f8() {
  // NOTE: f9, f10 との比較用
  //
  // 予想：
  // 1秒後に X が出力され、 直後に A が出力される。
  //
  // 解答:
  // 予想と同じ。
  // wait1() が解決された後に、errX が発生する。
  // errX が catch() まで伝播し、 X が出力される。
  // 最後に finally() に到達し、 A が出力される。
  //
  // 図解:
  //  wait1
  // |-----|
  //       errX
  //       |-|
  //         log(X)
  //         |-|
  //           logA
  //           |-|
  wait1()
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

//f8();

function f9() {
  // NOTE: f12 との比較用
  //
  // 予想：
  // 1秒後に Y が出力され、その直後に A が出力される。
  //
  // 解答:
  // 予想と同じ。
  // wait1() が解決された後に、() => 42 が実行される。
  // 次の then() で errY が発生する。
  // errY が catch() まで伝播し、 Y が出力される。
  // 最後に finally() に到達し、 A が出力される。
  //
  // 図解:
  //  wait1
  // |-----|
  //       () => 42
  //       |-|
  //         errY
  //         |-|
  //           log(Y)
  //           |-|
  //             logA
  //             |-|
  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

// f9();

function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  //
  // 予想：
  // 1秒後に Y が出力され、その直後に A が出力される。
  //
  // 解答:
  // wait1() が解決された後に、() => 42 が実行される。
  // 次の then() で errY が発生するが、第二引数のコールバック関数はこれより前の Promise で失敗した場合に呼ばれるもののためスルーされる。
  // エラーはキャッチされずそのままスローされるが、finally(logA) が実行され A が出力される。
  //
  // 図解:
  //  wait1
  // |-----|
  //       () => 42
  //       |-|
  //         errY
  //         |-|
  //           log(A)
  //           |-|
  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}

//f10();

function f11() {
  // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
  //
  // 予想：
  // X が出力される。
  //
  // 解答:
  // 予想と同じ。
  // errX() が Promise の中でエラーがスローされると Promise が失敗する。
  // 失敗した Promise は reject を呼び出す。
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise
  // その後、catch() コールバックが呼び出されて X が出力される。
  //
  // 図解:
  // errX
  // |-|
  //   log(X)
  //   |-|
  new Promise((resolve, reject) => {
    errX();
  }).catch((e) => log(e.message));
}

//f11();

function f12() {
  // new Promise 内だがコールバック関数で throw した場合は？
  //
  // 予想：
  // errX() のエラーがスローされる
  //
  // 解答:
  // 予想と同じ。
  // new Promise が作成され、 setTimeout() が呼ばれる。
  // 0 秒の遅延の後、 errX のエラーが発生する。
  // このエラーは setTimeout のコールバック内のエラーであるため、Promise の範囲外。
  // そのため、そのままスローされる。
  //
  // 図解:
  // new Promise
  // |-|
  //   setTimeout()
  //   |------|
  //          errX()
  //          |-|
  new Promise((resolve, reject) => {
    setTimeout(() => errX(), 0);
  }).catch((e) => log(e.message));
}

f12();

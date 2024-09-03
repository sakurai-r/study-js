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

async function h1() {
  // 予想：
  // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
  //
  // 解答:
  // 予想と同じ。
  // wait3 の解決後(3秒後)に logA が実行される
  // wait2 の解決後(2秒後)に logB が実行される
  // wait1 の解決後(1秒後)に logC が実行される
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
  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e) {
    log(e.message);
  }
}

//h1();

function h2() {
  // NOTE: h3 との比較用
  //
  // 予想：
  // 即時 errX() が実行され、err がスローされる
  // 発生したエラーが catch され X が出力される。
  //
  // 解答:
  // 予想と同じ。
  //
  // 図解:
  // errX()
  // |-------|
  //         log(X)
  //         |-|
  new Promise(() => {
    errX();
  }).catch((e) => log(e.message));
}

//h2();

function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  // 予想：
  // 即時 errX() が実行され、err がスローされる
  // 発生したエラーが catch され X が出力される。
  //
  // 解答:
  // エラーがスローされる
  // 非同期処理中で発生した例外はその非同期処理内でしかキャッチできない
  // 以下の形ならキャッチできる
  //try {
  //  errX();
  //} catch (e) {
  //  log(e.message);
  //}
  //
  // 図解:
  // errX()
  // |-------|
  new Promise(async () => {
    errX();
  }).catch((e) => log(e.message));
}

//h3();

async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  // 予想：
  // wait2 と wait1 が並行して実行される
  // １秒後に errY() が実行されエラーがスローされる
  // また、then() の非同期処理の内部で発生したエラーは外側の try/catch には伝搬しないので、キャッチできずに終了する。
  //
  // 解答:
  // 予想と同じ
  //
  // 図解:
  // wait2()
  // |-------|
  //         errX()
  //         |-|
  // wait1()
  // |---|
  //     errY()
  //     |-|
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}

h4();

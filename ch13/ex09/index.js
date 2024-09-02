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

async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  //
  // 予想：
  // 1秒後に 42 が出力され、その2秒後に 100 が出力される。
  // wait1 と wait2 が並行して実行されるが
  // 先に () => 42 で Promise が解決されるため、この時点での v = 42となるため、１回目のlog(v) は 42 が出力される。
  // 一度解決された Promise の値が変更されることはないが、その他の Promise も非同期的に処理されるため、変数 v = 100 の変更が反映される。
  // したがって、2 回目の log(v) は 100 が出力される。
  //
  // 解答:
  // 予想と同じ。
  //
  // 図解:
  // wait1
  // |----|
  //      log(42)
  //      |-|
  // wait2
  // |---------|
  //            v = 100
  //            |-|
  //               () => 0
  //      wait2
  //      |---------|
  //                log(100)
  //                |-|

  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
}

//i1();

async function i2() {
  // 予想：
  // 1秒後に 42 が出力され、その2秒後に 100 が出力される。
  // wait1 と wait2 が並行して実行されるが
  // 先に () => 42 で Promise が解決されるため、この時点での v = 42となるため、１回目のlog(v) は 42 が出力される。
  // 一度解決された Promise の値が変更されることはないが、その他の Promise も非同期的に処理されるため、変数 v = 100 の変更が反映される。
  // したがって、2 回目の log(v) は 100 が出力される。
  //
  // 解答:
  // 予想と同じ。
  //
  // 図解:
  // wait3
  // |------------|
  //              logA
  //              |-|
  // wait2
  // |--------|
  //          logB
  //          |-|
  // wait1
  // |----|
  //      logC
  //      |-|
  //             log(["A", "B", "C"])
  //             |-|
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}

//i2();

async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  //
  // 予想：
  // wait3 wait2 wait1 が並列して実行されるが
  // 1秒後にエラーがスローされ、catch された後 Y が出力される。
  // その直後 42 が出力される。
  // Promise のいずれかが拒否された場合は、非同期的に拒否されるため、その他の Promise の処理も継続される。
  // 2 秒後に B が出力される。
  // 3 秒後にv = 0 の変更が反映される。
  // したがって、2 回目の log(v) は 0 が出力される。
  //
  // 解答:
  // 予想と同じ。
  //
  // 図解:
  // wait3
  // |------------|
  //              v = 0
  //              |-|
  //                errX
  //                |-|
  // wait2
  // |--------|
  //          logB
  //          |-|
  // wait1
  // |----|
  //      errY
  //      |-|
  //        log(e.message)
  //        |-|
  //          log(42)
  //          |-|
  //            wait3
  //            |------------|
  //                         log(0)
  //                         |-|
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}

//i3();

async function i4() {
  // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
  //
  // 予想：
  // 5秒後に 0 が出力される。
  // 4秒後に 1 が出力される。
  // 3秒後に 2 が出力される。
  // 2秒後に 3 が出力される。
  // 1秒後に 4 が出力される。
  // 即時 COMPLETED が出力される。
  //
  // 解答:
  // 予想と同じ。
  //
  // 図解:
  // wait5
  // |----------|
  //            log(0)
  //            |-|
  //               wait4
  //               |--------|
  //                        log(1)
  //                        |-|
  //                          wait3
  //                          |------|
  //                                 log(2)
  //                                 |-|
  //                                   wait2
  //                                   |----|
  //                                        log(3)
  //                                        |-|
  //                                          wait1
  //                                          |--|
  //                                             log(4)
  //                                             |-|
  //                                                log("COMPLETED")
  //                                                |-|

  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

//i4();

async function i5() {
  // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
  //
  // 予想：
  // then() 中が関数ではなく Promise になっているため処理を待たずに即時実行される。
  // ループがすぐ終了し、COMPLETED が出力される。
  // 各Promise はほぼ同タイミングで並行に実行されるため、以下の順序になる。
  // 1秒後に 4 が出力される。
  // 2秒後に 3 が出力される。
  // 3秒後に 2 が出力される。
  // 4秒後に 1 が出力される。
  // 5秒後に 0 が出力される。
  //
  // 解答:
  // 予想と同じ。
  //
  // 図解:
  // wait5
  // |----------|
  //            log(0)
  //            |-|
  // wait4
  // |--------|
  //          log(1)
  //          |-|
  // wait3
  // |------|
  //        log(2)
  //        |-|
  // wait2
  // |----|
  //      log(3)
  //      |-|
  // wait1
  // |--|
  //    log(4)
  //    |-|
  // log("COMPLETED")
  // |-|
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

//i5();

async function i6() {
  //
  // 予想：
  // Promise.all() 内の各 Promise は並行に実行されるため、以下の順序になる。
  // 1秒後に 4 が出力される。
  // 2秒後に 3 が出力される。
  // 3秒後に 2 が出力される。
  // 4秒後に 1 が出力される。
  // 5秒後に 0 が出力される。
  // 最後の Promise の解決を待った後 COMPLETED が出力される。
  //
  // 解答:
  // 予想と同じ。
  //
  // 図解:
  // wait5
  // |----------|
  //            log(0)
  //            |-|
  //              log("COMPLETED")
  //              |-|
  // wait4
  // |--------|
  //          log(1)
  //          |-|
  // wait3
  // |------|
  //        log(2)
  //        |-|
  // wait2
  // |----|
  //      log(3)
  //      |-|
  // wait1
  // |--|
  //    log(4)
  //    |-|

  return Promise.all(
    [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i)))
  ).then(() => log("COMPLETED"));
}

//i6();

async function i7() {
  // NOTE: i8 との比較用
  //
  // 予想：
  // 11 秒後に 10 が出力される。
  //
  // 解答:
  // 予想と同じ。
  //
  // 図解:
  // p1
  // wait1 (v = 0)
  // |--|
  //    wait2 (v = 2)
  //    |----|
  //         wait2 (v = 4)
  //         |----|
  //               wait2 (v = 6)
  //               |----|
  //                    wait2 (v = 8)
  //                    |----|
  //                         wait2 (v = 10)
  //                         |----|
  //                              log(10)
  //                              |-|
  // p2
  // wait2 (v = 1)
  // |----|
  //      wait2 (v = 3)
  //      |----|
  //           wait2 (v = 5)
  //           |----|
  //                wait2 (v = 7)
  //                |----|
  //                     wait2 (v = 9)
  //                     |----|

  let v = 0;

  // 1秒待った後に2秒間隔で value の値を更新
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  // 2秒間隔で value の値を更新
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

//i7();

async function i8() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  //
  // 予想：
  // 11 秒後に 4 が出力される。
  //
  // 解答:
  // 予想と同じ。
  //
  // 図解:
  // p1
  // wait1 (v = 0)
  // |--|
  //    wait2 (v = 1)
  //    |----|
  //         wait2 (v = 2)
  //         |----|
  //               wait2 (v = 3)
  //               |----|
  //                    wait2 (v = 4)
  //                    |----|
  //                         wait2 (v = 5)
  //                         |----|
  //                              log(5)
  //                              |-|
  // p2
  // wait2 (v = 0)
  // |----|
  //      wait2 (v = 1)
  //      |----|
  //           wait2 (v = 2)
  //           |----|
  //                wait2 (v = 3)
  //                |----|
  //                     wait2 (v = 4)
  //                     |----|
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

i8();

const threads = require("worker_threads");
if (threads.isMainThread) {
  //sharedArray を number 型の変数 num にする
  let num = 0;
  let worker = new threads.Worker(__filename);
  worker.on("online", () => {
    for (let i = 0; i < 10_000_000; i++) {
      // メインスレッドの for ループで Atomic.add の代わりに num をインクリメントする
      num++;
    }
    worker.on("message", (message) => {
      if (message === "num をインクリメントせよ") {
        num++;
      } else if (message === "done") {
        // 両方のスレッドが終了したら、期待通りの20,000,000 という値になって
        // いることを確認する。
        console.log(num);
      }
    });
  });
} else {
  for (let i = 0; i < 10_000_000; i++) {
    // サブスレッドの for ループで Atomic.add の代わりにメインスレッドに"num をインクリメントせよ"というメッセージを送り、メインスレッドではそのメッセージを受信したら num をインクリメントする
    threads.parentPort.postMessage("num をインクリメントせよ");
  }
  threads.parentPort.postMessage("done");
}

import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く

// https://nodejs.org/docs/latest-v14.x/api/process.html#process_signal_events
// シグナルをトラップし、子プロセスに転送して終了を待つ
// キーボードからの割り込み (Ctrl + C)
process.on("SIGINT", () => {
  console.log("Receive SIGINT.");
  if (child) {
    child.kill("SIGINT");
    child.on("close", () => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

process.on("SIGTERM", () => {
  console.log("Receive SIGTERM.");
  if (child) {
    child.kill("SIGTERM");
    child.on("close", () => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});


while (true) {
  const result = await startChild();
  if (result.code === 0) {
    console.log("Child process exited normally.");
    break;
  }
  console.log(`Child process exited with code ${result.code}. Restarting...`);
}

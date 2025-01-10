import { Socket } from "net";

const port = 3000;
const host = "127.0.0.1";
const totalClients = 100000; // 試行する最大接続数
const clients = [];
let successfulConnections = 0;

function testConnections() {
  for (let i = 0; i < totalClients; i++) {
    const client = new Socket();
    clients.push(client);

    client.connect(port, host, () => {
      successfulConnections++;
      console.log(`Client ${i + 1} connected successfully`);
    });

    client.on("error", (err) => {
      console.log(err);
      console.error(`Client ${i + 1} failed to connect: ${err.message}`);
      cleanupClients();
      process.exit(1); // エラーが発生した時点で終了
    });

    client.on("close", () => {
      console.log(`Client ${i + 1} connection closed`);
    });
  }

  setTimeout(() => {
    console.log(`\n--- Connection Test Results ---`);
    console.log(`Total Successful Connections: ${successfulConnections}`);
    cleanupClients();
  }, 5000); // 5秒後に結果を出力
}

function cleanupClients() {
  clients.forEach((client) => client.destroy());
  console.log("All clients cleaned up");
}

testConnections();

import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:3003");

ws.on("open", () => {
  console.log("Connected to WebSocket server");
});

ws.on("message", (data) => {
  try {
    const request = JSON.parse(data);
    const response = {
      id: request.id,
      body: `Hello, ${request.body}`,
    };
    ws.send(JSON.stringify(response));
  } catch (err) {
    console.error("Failed to process request:", err);
  }
});

ws.on("error", (err) => {
  console.error(err);
});

ws.on("close", () => {
  console.log("WebSocket connection closed");
});

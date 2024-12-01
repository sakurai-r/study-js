import WebSocket from "ws";

let requestId = 0;
const pendingRequests = new Map();

async function sendRequest(requestBody) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("ws://localhost:3003");
    const timeout = 5000;
    const currentId = ++requestId;

    const request = {
      id: currentId,
      body: requestBody,
    };

    ws.on("open", () => {
      ws.send(JSON.stringify(request));
    });

    ws.on("message", (message) => {
      try {
        const response = JSON.parse(message);
        if (response.id === currentId) {
          resolve(response.body);
          ws.close();
        }
      } catch (err) {
        reject(err);
        ws.close();
      }
    });

    ws.on("close", () => {
      if (pendingRequests.has(currentId)) {
        reject(new Error("WebSocket connection closed"));
        pendingRequests.delete(currentId);
      }
    });

    ws.on("error", (err) => {
      reject(err);
      ws.close();
    });

    setTimeout(() => {
      if (pendingRequests.has(currentId)) {
        reject(new Error("Request timeout"));
        ws.close();
        pendingRequests.delete(currentId);
      }
    }, timeout);

    pendingRequests.set(currentId, { resolve, reject });
  });
}

const inputs = [];
inputs.push(document.getElementById("form1"));
inputs.push(document.getElementById("form2"));
inputs.push(document.getElementById("form3"));

const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  inputs.forEach(async (input) => {
    try {
      const res = await sendRequest(input.value);
      const result = document.createElement("p");
      result.textContent = res;
      input.after(result);
    } catch (e) {
      const error = document.createElement("p");
      error.textContent = e;
      input.after(error);
    }
  });
});

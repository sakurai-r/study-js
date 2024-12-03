const wsRequest = new WebSocket("ws://localhost:3003");
const wsResponse = new WebSocket("ws://localhost:3003");

wsRequest.onopen = () => console.log("Request WebSocket connected");
wsResponse.onopen = () => console.log("Response WebSocket connected");

wsResponse.onmessage = (event) => handleServerRequest(event);

function handleServerRequest(event) {
  const request = JSON.parse(event.data);
  const response = { id: request.id, msg: `Hello, ${request.msg}` };

  console.log("Responder received:", request);
  wsResponse.send(JSON.stringify(response));
}

function sendRequest(requestId, message) {
  return new Promise((resolve, reject) => {
    const msg = JSON.stringify({ id: requestId, msg: message });
    let timeoutHandle;

    wsRequest.send(msg);

    const handleMessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.id === requestId) {
        clearTimeout(timeoutHandle);
        wsRequest.removeEventListener("message", handleMessage);
        resolve(response.msg);
      }
    };

    timeoutHandle = setTimeout(() => {
      wsRequest.removeEventListener("message", handleMessage);
      reject(new Error("タイムアウトしました"));
    }, 50000);

    wsRequest.addEventListener("message", handleMessage);
  });
}

const requestContainer = document.getElementById("requests");
const addRequestButton = document.getElementById("addRequest");
const sendAllButton = document.getElementById("sendAll");

function createRequestInput() {
  const requestDiv = document.createElement("div");
  requestDiv.classList.add("request");
  requestDiv.innerHTML = `
    <input type="text" size="40" placeholder="メッセージを入力してください" />
    <span class="response"></span>
  `;
  return requestDiv;
}

addRequestButton.addEventListener("click", () => {
  requestContainer.appendChild(createRequestInput());
});

sendAllButton.addEventListener("click", async () => {
  const requests = Array.from(requestContainer.querySelectorAll(".request"));
  const promises = requests.map((requestDiv, index) =>
    processRequest(requestDiv, index + 1)
  );

  try {
    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
});

async function processRequest(requestDiv, requestId) {
  const input = requestDiv.querySelector("input");
  const responseSpan = requestDiv.querySelector(".response");
  const message = input.value.trim();

  responseSpan.textContent = "送信中";
  responseSpan.className = "response";

  try {
    const response = await sendRequest(requestId, message);
    responseSpan.textContent = response;
  } catch (error) {
    responseSpan.textContent = error.message;
    responseSpan.className = "response error";
  }
}

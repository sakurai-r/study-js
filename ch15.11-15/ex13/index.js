document.querySelector("#send-button").addEventListener("click", async () => {
  const userInput = document.querySelector("#user-input").value.trim();
  if (!userInput) return;

  appendMessage(userInput, "user-message");
  document.querySelector("#user-input").value = "";

  try {
    await fetchLLMResponse(userInput);
  } catch (error) {
    console.error(error);
    appendMessage("エラーが発生しました。", "ai-message");
  }
});

function appendMessage(text, className) {
  const chatBox = document.querySelector("#chat-box");
  const message = document.createElement("div");
  message.className = `message ${className}`;
  message.textContent = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function appendOrUpdateLastMessage(char) {
  const chatBox = document.querySelector("#chat-box");
  const lastMessage = chatBox.lastChild;

  if (lastMessage && lastMessage.classList.contains("ai-message")) {
    lastMessage.textContent += char;
  } else {
    appendMessage(char, "ai-message");
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchLLMResponse(prompt) {
  const response = await fetch("http://localhost:11434/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gemma:2b",
      prompt,
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTPエラー: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n");

    for (const line of lines) {
      try {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("data:")) {
          const json = JSON.parse(trimmedLine.replace(/^data:\s*/, ""));
          const text = json.choices[0]?.text || "";

          for (const char of text) {
            appendOrUpdateLastMessage(char);

            if (char === "。" || char === "、" || char === "\n") {
              appendMessage("", "ai-message");
            }
          }
        }
      } catch (err) {
        console.error("JSONパースエラー:", err, line);
      }
    }
  }
}

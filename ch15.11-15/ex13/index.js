const addChatStyle = (item) => {
  item.style.width = "fit-content";
  item.style.padding = "8px";
  item.style.marginTop = "8px";
  item.style.marginBottom = "8px";
  return item;
};

const onClickSubmitBtn = async () => {
  const chatArea = document.getElementById("chat-area");
  const input = document.getElementById("input");
  const inputText = input.value;
  const req = document.createElement("p");
  req.class = "chat-item";
  req.textContent = inputText;
  req.style.backgroundColor = "lightcyan";
  req.style.marginLeft = "auto";

  chatArea.appendChild(addChatStyle(req));
  const url = "http://localhost:11434/api/chat";
  const data = {
    model: "gemma2:2b",
    messages: [
      {
        role: "user",
        content: inputText,
      },
    ],
    stream: true,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = document.createElement("p");
  res.class = "chat-item";
  res.textContent = "";
  res.style.backgroundColor = "palegreen";
  res.style.marginRight = "auto";
  chatArea.appendChild(addChatStyle(res));

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8"); // バイトデータをテキストに変換する。
  while (true) {
    // 下に抜けるまでループ。
    const { done, value } = await reader.read(); // チャンクを読み出す。
    if (value) {
      const respJson = JSON.parse(decoder.decode(value, { stream: true }));
      res.textContent += respJson.message.content;
    }
    if (done) {
      // これが最後のチャンクなら、
      break; // ループを抜ける。
    }
  }
};

const submit = document.getElementById("submit");
submit.addEventListener("click", onClickSubmitBtn);

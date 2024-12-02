const accessTokenInput = document.querySelector("#accessToken");
const fileInput = document.querySelector("#fileInput");
const uploadButton = document.querySelector("#uploadButton");
const statusElement = document.querySelector("#status");

uploadButton.addEventListener("click", async () => {
  const accessToken = accessTokenInput.value;
  const file = fileInput.files[0];

  if (!accessToken) {
    statusElement.textContent = "アクセストークンが入力されていません。";
    return;
  }

  if (!file) {
    statusElement.textContent = "ファイルが選択されていません。";
    return;
  }

  statusElement.textContent = "アップロード中...";

  try {
    const endpoint = `https://graph.microsoft.com/v1.0/me/drive/root:/${encodeURIComponent(
      file.name
    )}:/content`;
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": file.type,
      },
      body: file,
    });

    if (response.ok) {
      statusElement.textContent = "アップロード完了";
    } else {
      const error = await response.json();
      console.error(error);
      statusElement.textContent = "アップロードに失敗しました";
    }
  } catch (error) {
    console.error(error);
    statusElement.textContent = "アップロード中にエラーが発生しました";
  }
});

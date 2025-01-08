document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);

    // Web Worker のインスタンスを作成
    const worker = new Worker("./worker.js", { type: "module" });

    // ワーカーにデータを送信
    worker.postMessage(imageData);

    // ワーカーからの結果を受け取る
    worker.onmessage = (event) => {
      const { data, width, height } = event.data;
      const outputImageData = new ImageData(data, width, height);
      filteredCtx.putImageData(outputImageData, 0, 0);
    };

    // ワーカーのエラーハンドリング
    worker.onerror = (err) => {
      console.error("Worker error:", err);
    };
  });

  reader.readAsDataURL(file);
});

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
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    // グレースケールへの変換 (RGB を足して平均を取っている)
    //for (let i = 0; i < data.length; i += 4) {
    //  const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    //  data[i] = avg;
    //  data[i + 1] = avg;
    //  data[i + 2] = avg;
    //}
    //filteredCtx.putImageData(imageData, 0, 0);

    const outputData = new Uint8ClampedArray(imageData.data.length);

    // 参照: https://www.simulationroom999.com/blog/gaussian-filter/
    // 5x5のガウシアンフィルタカーネル
    const gaussianKernel = [
      [1, 4, 6, 4, 1],
      [4, 16, 24, 16, 4],
      [6, 24, 36, 24, 6],
      [4, 16, 24, 16, 4],
      [1, 4, 6, 4, 1],
    ];
    //カーネル全体の重みの合計
    const kernelWeight = 256;

    // 5×5の領域がはみ出さないように2ピクセル分ずらす
    for (let y = 2; y < height - 2; y++) {
      for (let x = 2; x < width - 2; x++) {
        let red = 0;
        let green = 0;
        let blue = 0;

        gaussianKernel.forEach((row, kernelY) => {
          row.forEach((weight, kernelX) => {
            //　カーネルの中心を基準にする
            const offsetX = x + kernelX - 2;
            const offsetY = y + kernelY - 2;
            // 各ピクセルは4つの値 (R, G, B, A) で構成されているため、特定のピクセルのデータにアクセスするには、ピクセル位置に4を掛ける
            const pixelIndex = (offsetY * width + offsetX) * 4;

            // 各色成分（RGB）にカーネルの重みを掛けて加算
            red += data[pixelIndex] * weight;
            green += data[pixelIndex + 1] * weight;
            blue += data[pixelIndex + 2] * weight;
          });
        });

        const i = (y * width + x) * 4;
        // カーネルの重みで割ることで、ぼかし後の色成分の平均を計算
        outputData[i] = red / kernelWeight; // ピクセルの赤色要素
        outputData[i + 1] = green / kernelWeight; // 緑
        outputData[i + 2] = blue / kernelWeight; // 青
        outputData[i + 3] = data[i + 3]; // アルファ要素(透明度)
      }
    }

    const outputImageData = new ImageData(outputData, width, height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  reader.readAsDataURL(file);
});

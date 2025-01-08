self.onmessage = (event) => {
  const { data, width, height } = event.data;
  const outputData = new Uint8ClampedArray(data.length);

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

  // メインスレッドにデータを送信
  self.postMessage({ data: outputData, width, height });
};

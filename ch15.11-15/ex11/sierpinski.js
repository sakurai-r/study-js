class SierpinskiCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.worker = new Worker("./sierpinskiWorker.js");
    this.setSize();

    this.worker.onmessage = (event) => {
      const { triangles } = event.data;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = "#fff";
      this.context.strokeStyle = "#000";

      for (const { x, y, size } of triangles) {
        this.context.beginPath();
        this.context.moveTo(x + size / 2, y); // 頂点（上に移動）
        this.context.lineTo(x, y + size); // 左下
        this.context.lineTo(x + size, y + size); // 右下
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
      }
    };

    window.addEventListener("resize", () => this.setSize());
    this.render();
  }

  setSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.render();
  }

  render() {
    const { width, height } = this.canvas;
    const size = Math.min(width, height) * 0.9; // 最大サイズ
    const x = (width - size) / 2; // 中央に配置
    const y = (height - size) / 2;

    this.worker.postMessage({
      x,
      y,
      size,
      depth: 7, // 再帰の深さを指定
    });
  }
}

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
new SierpinskiCanvas(canvas);

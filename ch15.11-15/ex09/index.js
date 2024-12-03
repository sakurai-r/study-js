const ROWS = 50;
const COLS = 50;
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

const ws = new WebSocket("ws://localhost:3003");

ws.onopen = () => {
  console.log("Connected to WebSocket server");
};

ws.onerror = (err) => {
  console.error(err);
};

let grid = [];
let animationId = null;

function renderGrid(grid) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case "update":
      grid = data.grid;
      renderGrid(grid);
      break;
    case "start":
      if (!animationId) {
        update();
      }
      break;
    case "pause":
      cancelAnimationFrame(animationId);
      animationId = null;
      break;
    default:
      console.warn("Unknown message type:", data.type);
  }
};

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: event.clientX - rect.left, y: event.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);

  ws.send(JSON.stringify({ type: "toggle", row, col }));
});

startButton.addEventListener("click", () => {
  ws.send(JSON.stringify({ type: "start" }));
});

pauseButton.addEventListener("click", () => {
  ws.send(JSON.stringify({ type: "pause" }));
});

function update() {
  renderGrid(grid);
  animationId = requestAnimationFrame(update);
}

renderGrid(grid);

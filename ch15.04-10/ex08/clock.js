const hands = document.querySelector(".hands");
const sechand = document.createElementNS("http://www.w3.org/2000/svg", "line");
sechand.setAttribute("class", "secondhand");
sechand.setAttribute("x1", "50");
sechand.setAttribute("y1", "50");
sechand.setAttribute("x2", "50");
sechand.setAttribute("y2", "20");
sechand.setAttribute("stroke", "red");
sechand.setAttribute("stroke-width", "1");
hands.appendChild(sechand);

(function updateClock() {
  // SVG 時計の画像を更新して現在時刻を表示する。
  let now = new Date(); // 現在時刻。
  let sec = now.getSeconds(); // 秒。
  let min = now.getMinutes() + sec / 60; // 小数部を持つ分。
  let hour = (now.getHours() % 12) + min / 60; // 小数部を持つ時。
  let secangle = sec * 6; // 1 秒あたり 6 度。
  let minangle = min * 6; // 1 分あたり 6 度。
  let hourangle = hour * 30; // 1 時間あたり 30 度。
  // 時計の針のSVG 要素を取得する。
  let sechand = document.querySelector("#clock .secondhand");
  let minhand = document.querySelector("#clock .minutehand");
  let hourhand = document.querySelector("#clock .hourhand");
  // SVG 属性を設定して、時計盤の中で回転する。
  sechand.setAttribute("transform", `rotate(${secangle},50,50)`);
  minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
  hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);
  // 1 秒後にこの関数を再度実行する。
  setTimeout(updateClock, 1000);
})(); // ここで関数を即座に実行していることに注意。

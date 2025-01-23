let a;
let x;
let y;
const r = 10;

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/with#%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%82%92%E7%8F%BE%E5%9C%A8%E3%81%AE%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%97%E3%81%AB%E5%88%86%E5%89%B2%E4%BB%A3%E5%85%A5%E3%81%97%E3%81%A6_with_%E6%96%87%E3%82%92%E9%81%BF%E3%81%91%E3%82%8B
//with (Math) {
{
  const { PI, cos, sin } = Math;
  a = PI * r * r;
  x = r * cos(PI);
  y = r * sin(PI / 2);
}

console.log(a, x, y);

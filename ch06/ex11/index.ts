export const obj = {
  r: 0,
  theta: 0,

  get x() {
    return this.r * Math.cos(this.theta);
  },
  set x(value) {
    if (isNaN(value)) {
      throw new Error("Error: The value of 'x' cannot be NaN.");
    }
    // r, theta を更新すると y の値も変化してしまうので事前に値を保持しておく
    const y = this.y;
    this.r = Math.hypot(value, y);
    this.theta = Math.atan2(y, value);
  },
  get y() {
    return this.r * Math.sin(this.theta);
  },
  set y(value) {
    if (isNaN(value)) {
      throw new Error("Error: The value of 'y' cannot be NaN.");
    }
    // r, theta を更新すると x の値も変化してしまうので事前に値を保持しておく
    const x = this.x;
    this.r = Math.hypot(x, value);
    this.theta = Math.atan2(value, x);
  },
};

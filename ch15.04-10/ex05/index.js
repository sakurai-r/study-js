class InlineCircle extends HTMLElement {
  connectedCallback() {
    // 円の作成に必要なスタイルを設定する。
    this.style.display = "inline-block";
    this.style.borderRadius = "50%";
    this.style.transform = "translateY(10%)";
    // 大きさがまだ設定されていない場合、現在のフォントサイズを基に
    // デフォルトの大きさを設定する。
    if (!this.style.width) {
      this.style.width = "0.8em";
      this.style.height = "0.8em";
    }
  }
  // 静的なobservedAttributes プロパティで、値が変化したときに
  // 通知してほしい属性を指定する（ここではゲッターを使っている。
  // 「static」はメソッドにしか使えないため）。
  static get observedAttributes() {
    return ["diameter", "color", "border-color"];
  }
  // カスタム要素が初めて解釈されるときや、その後解釈されたときに、
  // 前記した属性のいずれかが変化すると、このコールバックが呼び出される。
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "diameter":
        // diameter 属性が変更された場合、大きさを更新する。
        this.style.width = newValue;
        this.style.height = newValue;
        break;
      case "color":
        // color 属性が変更された場合、色を変更する。
        this.style.backgroundColor = newValue;
        break;
      case "border-color":
        // border-color 属性が変更された場合、色を変更する。
        console.log(`Applying borderColor: ${newValue}`);
        this.style.border = `solid 10px ${newValue}`;
        break;
    }
  }

  get diameter() {
    return this.getAttribute("diameter");
  }
  set diameter(diameter) {
    this.setAttribute("diameter", diameter);
  }
  get color() {
    return this.getAttribute("color");
  }
  set color(color) {
    this.setAttribute("color", color);
  }
  get borderColor() {
    return this.getAttribute("border-color");
  }
  set borderColor(borderColor) {
    this.setAttribute("border-color", borderColor);
  }
}

customElements.define("inline-circle", InlineCircle);

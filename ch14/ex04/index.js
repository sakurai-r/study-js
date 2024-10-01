export class Hiragana {
  constructor(char) {
    // http://www.asahi-net.or.jp/~AX2S-KMTN/ref/unicode/e_asia.html#u3040
    if (!char.match(/^[\u3040-\u309F]$/)) {
      throw new Error("ひらがな1文字である必要があります。");
    }
    this.char = char;
    this.code = char.charCodeAt(0);
  }

  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.code;
    } else if (hint === "string" || hint === "default") {
      return this.char;
    }
  }
}

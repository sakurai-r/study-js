export class IgnoreAccentPattern {
  constructor(pattern) {
    if (pattern instanceof RegExp) {
      this.pattern = pattern;
      // 文字列を Unicode 正規化して分解し、 \u0300-\u036f の範囲を取り除く
      this.regexpText = pattern.source
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      // https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions#%E3%83%95%E3%83%A9%E3%82%B0%E3%82%92%E7%94%A8%E3%81%84%E3%81%9F%E9%AB%98%E5%BA%A6%E3%81%AA%E6%A4%9C%E7%B4%A2
      this.flags = pattern.flags;
    } else {
      this.pattern = new RegExp(pattern);
      // 文字列を Unicode 正規化して分解し、 \u0300-\u036f の範囲を取り除く
      this.regexpText = pattern
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      this.flags = "";
    }
  }

  [Symbol.search](s) {
    const normalizedStr = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    return normalizedStr.search(new RegExp(this.regexpText, `u${this.flags}`));
  }

  [Symbol.match](s) {
    const normalizedStr = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalizedStr.match(new RegExp(this.regexpText, `u${this.flags}`));
  }
}

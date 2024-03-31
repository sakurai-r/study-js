class Example {
  private value: { [key: string]: number };

  constructor(value: { [key: string]: number }) {
    this.value = value;
  }

  // オブジェクトを表す基本型に変換する
  valueOf() {
    //console.log("valueOf");
    return this.value;
  }

  // オブジェクトを表す文字列を返す
  toString() {
    //console.log("toString");
    return `${this.value}`;
  }
}

const obj = new Example({ num: 2 });

// JavaScript は valueOf メソッドを、オブジェクトをプリミティブな値に変換するときに呼び出す。
// 自分で valueOf メソッドを実行する必要はほとんどなく、プリミティブな値が期待される場面にオブジェクトが出くわしたとき JavaScript が自動的に実行する。
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf#%E8%A7%A3%E8%AA%AC
// valueOf() メソッドはオブジェクトをそのまま返すが、プリミティブな値ではないので使えない。
// 次に toString() メソッドが呼ばれるので '[object Object]' に変換される。
// 最後に '[object Object]' は数値に変換できないので NaN になる。
console.log(+obj);

// すべてのオブジェクトは toString メソッドを持ち、オブジェクトが文字列値として表される場面や、文字列が期待される構文で参照されたときに自動的に呼び出される
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#%E8%A7%A3%E8%AA%AC
console.log(`${obj}`);

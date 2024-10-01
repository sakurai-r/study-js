export class MyArrayLike {
  constructor(length = 0) {
    this.length = length;
  }
}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  /**
   * 独自のSymbol.species ゲッターを明示的に定義し
   * MyArrayLikeオブジェクトを返すように設定する
   **/
  static get [Symbol.species]() {
    return MyArrayLike;
  }
}

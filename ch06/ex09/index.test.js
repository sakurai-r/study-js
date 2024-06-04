const mock = jest.fn();

const obj = {
  x: 0,
  y: 0,
  sum() {
    mock();
    return this.x + this.y;
  },
};

obj.toJSON = function () {
  return { x: this.x, y: this.y, sum: this.sum() };
};

/**
 * Object.prototype には、toJSON() メソッドは定義されていません。しかし、JSON.string
 * ify()メソッド（§6.8 参照）は、シリアライズ対象のオブジェクトにtoJSON()メソッドが存在す
 * るかどうかを調べます。シリアライズ対象のオブジェクトにtoJSON()メソッドが存在すれば、元
 * のオブジェクトの代わりに、toJSON()メソッドの戻り値をシリアライズします。
 */
obj.x = 1;
obj.y = 2;
test('JSON.stringify(obj) => {"x":1,"y":2,"sum":3}', () => {
  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
  expect(mock).toHaveBeenCalled();
});

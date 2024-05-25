import assign from "./index.ts";

describe("assign function", () => {
  test("one object", () => {
    const target = { a: 1 };
    const source = { b: 2 };

    expect(assign({}, target, source)).toEqual(
      Object.assign({}, target, source)
    );
  });

  test("multiple objects", () => {
    const target = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3 };

    expect(assign({}, target, source1, source2)).toEqual(
      Object.assign({}, target, source1, source2)
    );
  });

  test("overwriting properties", () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };

    expect(assign({}, target, source)).toEqual(
      Object.assign({}, target, source)
    );
  });

  test("symbol properties", () => {
    const target = {};
    const sym1 = Symbol("sym1");
    const sym2 = Symbol("sym2");
    const source = { [sym1]: "value1", [sym2]: "value2" };

    expect(assign({}, target, source)).toEqual(
      Object.assign({}, target, source)
    );
  });

  test("copying properties with getter and setter", () => {
    const target = {};
    const source = {
      _a: 1,
      get a() {
        return this._a;
      },
      set a(value) {
        this._a = value;
      },
    };

    expect(assign({}, target, source)).toEqual(
      Object.assign({}, target, source)
    );
  });
});

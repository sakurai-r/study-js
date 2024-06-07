import assign from "./index.ts";

describe("assign()", () => {
  test("one object", () => {
    const target1 = { a: 1 };
    const target2 = { a: 1 };
    const source = { b: 2 };

    expect(assign(target1, source)).toStrictEqual(
      Object.assign(target2, source)
    );
  });

  test("multiple objects", () => {
    const target1 = { a: 1 };
    const target2 = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3 };

    expect(assign(target1, source1, source2)).toStrictEqual(
      Object.assign(target2, source1, source2)
    );
  });

  test("overwriting properties", () => {
    const target1 = { a: 1, b: 2 };
    const target2 = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };

    expect(assign(target1, source)).toStrictEqual(
      Object.assign(target2, source)
    );
  });

  test("symbol properties", () => {
    const sym1 = Symbol("sym1");
    const sym2 = Symbol("sym2");
    const source = { [sym1]: "value1", [sym2]: "value2" };

    expect(assign({}, source)).toStrictEqual(Object.assign({}, source));
  });

  test("copying properties with getter and setter", () => {
    const source = {
      _a: 1,
      get a() {
        return this._a;
      },
      set a(value) {
        this._a = value;
      },
    };

    expect(assign({}, source)).toStrictEqual(Object.assign({}, source));
  });
});

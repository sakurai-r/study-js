import getProperties from "./index.ts";

describe("getProperties()", () => {
  const sym1 = Symbol("sym1");
  const obj = Object.defineProperty({ a: 1 }, "b", {
    value: "bbb",
    enumerable: false,
  });

  const obj2 = Object.create(obj);
  Object.defineProperties(obj2, {
    c: {
      value: "ccc",
    },
    4: {
      value: 4,
      enumerable: true,
    },
  });

  test.each([
    [{}, []],
    [{ " ": "value" }, [" "]],
    [{ a: 1 }, ["a"]],
    [
      { a: 1, 3: "hoge", [sym1]: "value1", "-6": "マイナス" },
      ["3", "a", "-6", sym1],
    ],
    [obj, ["a", "b"]],
    [obj2, ["4", "c", "a"]],
  ])('getProperties("%s") => [%s]', (input, expected) => {
    expect(getProperties(input)).toStrictEqual(expected);
  });
});

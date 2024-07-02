import { TypedMap, DefaultTypedMap } from "./index.js";

describe("index.js", () => {
  const keyType = "string";
  const valueType = "number";

  test("should have the same structure", () => {
    const typedMap = new TypedMap(keyType, valueType, [
      ["key1", 1],
      ["key2", 2],
    ]);
    const defaultTypedMap = new DefaultTypedMap(keyType, valueType, [
      ["key1", 1],
      ["key2", 2],
    ]);

    expect(typedMap.keyType).toBe(defaultTypedMap.keyType);
    expect(typedMap.valueType).toBe(defaultTypedMap.valueType);

    expect(Array.from(typedMap.map.entries())).toEqual(
      Array.from(defaultTypedMap.entries())
    );

    expect(typeof typedMap.set).toBe(typeof defaultTypedMap.set);

    typedMap.set("key3", 3);
    defaultTypedMap.set("key3", 3);

    expect(Array.from(typedMap.map.entries())).toEqual(
      Array.from(defaultTypedMap.entries())
    );
  });

  test("invalid key type in constructor", () => {
    expect(
      () =>
        new TypedMap(keyType, valueType, [
          ["key1", "invalid"],
          [2, 2],
        ])
    ).toThrow(TypeError);
    expect(
      () =>
        new DefaultTypedMap(keyType, valueType, [
          ["key1", "invalid"],
          [2, 2],
        ])
    ).toThrow(TypeError);
  });

  test("invalid value type in constructor", () => {
    expect(
      () => new TypedMap(keyType, valueType, [["key1", "invalid"]])
    ).toThrow(TypeError);
    expect(
      () => new DefaultTypedMap(keyType, valueType, [["key1", "invalid"]])
    ).toThrow(TypeError);
  });

  test("invalid key type in set method", () => {
    const typedMap = new TypedMap(keyType, valueType);
    const defaultTypedMap = new DefaultTypedMap(keyType, valueType);

    expect(() => typedMap.set(2, 2)).toThrow(TypeError);
    expect(() => defaultTypedMap.set(2, 2)).toThrow(TypeError);
  });

  test("invalid value type in set method", () => {
    const typedMap = new TypedMap(keyType, valueType);
    const defaultTypedMap = new DefaultTypedMap(keyType, valueType);

    expect(() => typedMap.set("key1", "invalid")).toThrow(TypeError);
    expect(() => defaultTypedMap.set("key1", "invalid")).toThrow(TypeError);
  });
});

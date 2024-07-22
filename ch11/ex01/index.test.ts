import TypeMap from "./index.ts";

describe("index.ts", () => {
  test("normal", () => {
    class Foo {}

    const typeMap = new TypeMap();
    typeMap.set(String, "string");
    typeMap.set(Number, 123);
    typeMap.set(Foo, new Foo());
    typeMap.get(String);
    typeMap.get(Number);

    // typeMap.set(Date, "not a date");

    expect(typeMap.get(String)).toBe("string");
    expect(typeMap.get(Number)).toBe(123);
  });
});

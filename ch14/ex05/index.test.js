import { returnType } from "./index.js";

describe("returnType", () => {
  test('return "string"', () => {
    const result = returnType`value is ${"A"}.`;
    expect(result).toBe("value is string.");
  });

  test('return "object"', () => {
    const result = returnType`value is ${{ x: 1 }}.`;
    expect(result).toBe("value is object.");
  });

  test('return "number"', () => {
    const result = returnType`value is ${42}.`;
    expect(result).toBe("value is number.");
  });

  test('return "boolean"', () => {
    const result = returnType`value is ${true}.`;
    expect(result).toBe("value is boolean.");
  });

  test('return "undefined"', () => {
    const result = returnType`value is ${undefined}.`;
    expect(result).toBe("value is undefined.");
  });

  test('return "function"', () => {
    const result = returnType`value is ${() => {}}.`;
    expect(result).toBe("value is function.");
  });
});

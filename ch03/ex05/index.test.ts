import { switchLineEnding } from "./index.ts";

describe("switchLineEnding", () => {
  test("switch LF to CR+LF", () => {
    const input = "He\nllo\n Wor\nl\nd";
    const expected = "He\r\nllo\r\n Wor\r\nl\r\nd";
    expect(switchLineEnding(input)).toEqual(expected);
  });

  test("switch CR+LF to LF", () => {
    const input = "He\r\nllo\r\n Wor\r\nl\r\nd";
    const expected = "He\nllo\n Wor\nl\nd";
    expect(switchLineEnding(input)).toEqual(expected);
  });

  test("switch CR+LF to LF and LF to CR+LF", () => {
    const input = "He\nllo\r\n Wor\nl\r\nd";
    const expected = "He\r\nllo\n Wor\r\nl\nd";
    expect(switchLineEnding(input)).toEqual(expected);
  });

  test("return the same string", () => {
    const input = "Hello World";
    const expected = "Hello World";
    expect(switchLineEnding(input)).toEqual(expected);
  });
});

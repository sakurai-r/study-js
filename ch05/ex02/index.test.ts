import { escapeIf, escapeSwitch } from "./index.ts";

describe("escapeIf", () => {
  test.each([
    ["Escape\0Test", "Escape\\0Test"],
    ["Escape\bTest", "Escape\\bTest"],
    ["Escape\tTest", "Escape\\tTest"],
    ["Escape\nTest", "Escape\\nTest"],
    ["Escape\vTest", "Escape\\vTest"],
    ["Escape\fTest", "Escape\\fTest"],
    ["Escape\rTest", "Escape\\rTest"],
    ['Escape"Test', 'Escape\\"Test'],
    ["Escape'Test", "Escape\\'Test"],
    ["Escape\0Test\0", "Escape\\0Test\\0"],
    ["Escape\bTes\bt", "Escape\\bTes\\bt"],
    ["Es\tcape\tTest", "Es\\tcape\\tTest"],
    ["\nEscape\nTest", "\\nEscape\\nTest"],
    ["Escape\v\vTest", "Escape\\v\\vTest"],
    ["Escape\fTes\ft", "Escape\\fTes\\ft"],
    ["Esca\rpe\rTest", "Esca\\rpe\\rTest"],
    ['Escape""Test', 'Escape\\"\\"Test'],
    ["Escape'Te'st", "Escape\\'Te\\'st"],
    ["\0\b\t\n\v\f\r\"'", "\\0\\b\\t\\n\\v\\f\\r\\\"\\'"],
    ["Escape Test", "Escape Test"],
    ["", ""],
  ])('escapeIf("%s") => "%s"', (input, expected) => {
    expect(escapeIf(input)).toBe(expected);
  });
});

describe("escapeSwitch", () => {
  test.each([
    ["Escape\0Test", "Escape\\0Test"],
    ["Escape\bTest", "Escape\\bTest"],
    ["Escape\tTest", "Escape\\tTest"],
    ["Escape\nTest", "Escape\\nTest"],
    ["Escape\vTest", "Escape\\vTest"],
    ["Escape\fTest", "Escape\\fTest"],
    ["Escape\rTest", "Escape\\rTest"],
    ['Escape"Test', 'Escape\\"Test'],
    ["Escape'Test", "Escape\\'Test"],
    ["Escape\0Test\0", "Escape\\0Test\\0"],
    ["Escape\bTes\bt", "Escape\\bTes\\bt"],
    ["Es\tcape\tTest", "Es\\tcape\\tTest"],
    ["\nEscape\nTest", "\\nEscape\\nTest"],
    ["Escape\v\vTest", "Escape\\v\\vTest"],
    ["Escape\fTes\ft", "Escape\\fTes\\ft"],
    ["Esca\rpe\rTest", "Esca\\rpe\\rTest"],
    ['Escape""Test', 'Escape\\"\\"Test'],
    ["Escape'Te'st", "Escape\\'Te\\'st"],
    ["\0\b\t\n\v\f\r\"'", "\\0\\b\\t\\n\\v\\f\\r\\\"\\'"],
    ["Escape Test", "Escape Test"],
    ["", ""],
  ])('escapeSwitch("%s") => "%s"', (input, expected) => {
    expect(escapeSwitch(input)).toBe(expected);
  });
});

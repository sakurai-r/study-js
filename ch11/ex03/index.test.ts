import { littleToBigEndian, bigToLittleEndian } from "./index.ts";

describe("littleToBigEndian", () => {
  test.each([
    {
      input: new Uint32Array([0x12345678]),
      expected: new Uint32Array([0x78563412]),
    },
    {
      input: new Uint32Array([0x12345678, 0x9abcdef0]),
      expected: new Uint32Array([0x78563412, 0xf0debc9a]),
    },
    {
      input: new Uint32Array([0x11223344, 0x11223344]),
      expected: new Uint32Array([0x44332211, 0x44332211]),
    },
    { input: new Uint32Array([]), expected: new Uint32Array([]) },
  ])(
    "converts little endian to big endian correctly",
    ({ input, expected }) => {
      const output = littleToBigEndian(input);
      expect(output).toEqual(expected);
    }
  );
});

describe("bigToLittleEndian", () => {
  test.each([
    {
      input: new Uint32Array([0x78563412]),
      expected: new Uint32Array([0x12345678]),
    },
    {
      input: new Uint32Array([0x78563412, 0xf0debc9a]),
      expected: new Uint32Array([0x12345678, 0x9abcdef0]),
    },
    {
      input: new Uint32Array([0x44332211, 0x44332211]),
      expected: new Uint32Array([0x11223344, 0x11223344]),
    },
    { input: new Uint32Array([]), expected: new Uint32Array([]) },
  ])(
    "converts big endian to little endian correctly",
    ({ input, expected }) => {
      const output = bigToLittleEndian(input);
      expect(output).toEqual(expected);
    }
  );
});

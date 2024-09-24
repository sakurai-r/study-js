import { Hiragana } from "./index.js";

describe("Hiragana クラスのテスト", () => {
  test("store a hiragana character and work correctly", () => {
    const hiragana = new Hiragana("あ");
    expect(`${hiragana}`).toBe("あ");
    expect(+hiragana).toBe(12354);
  });

  test("sort correctly by UTF-16 code unit", () => {
    const chars = ["い", "あ", "う"].map((c) => new Hiragana(c));
    const sorted = chars.sort((a, b) => a - b);
    expect(sorted.map((c) => `${c}`)).toEqual(["あ", "い", "う"]);
  });

  test("sort correctly by string value", () => {
    const chars = ["い", "う", "あ"].map((c) => new Hiragana(c));
    const sorted = chars.sort((a, b) => `${a}`.localeCompare(`${b}`));
    expect(sorted.map((c) => `${c}`)).toEqual(["あ", "い", "う"]);
  });

  test("throw an error if not a hiragana character", () => {
    expect(() => new Hiragana("a")).toThrow(
      "ひらがな1文字である必要があります。"
    );
  });
});

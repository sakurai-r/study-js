import { sortJapanese, toJapaneseDateString } from "./index.ts";

describe("sortJapanese() test", () => {
  test.each([
    [
      ["あかさたな", "あんぱん", "あいうえお"],
      ["あいうえお", "あかさたな", "あんぱん"],
    ],
    [
      ["じぇいえふえーぎんこう", "じぇいえすけんしゅう"],
      ["じぇいえすけんしゅう", "じぇいえふえーぎんこう"],
    ],
    [
      ["かに", "がに", "カニ", "ガニ"],
      ["かに", "カニ", "がに", "ガニ"],
    ],
  ])("correct sort", (input, expected) => {
    expect(sortJapanese(input)).toMatchObject(expected);
  });
});

describe("toJapaneseDateString() test", () => {
  test.each([
    ["2019-01-01", "平成31年1月1日"],
    ["2019-05-01", "令和元年5月1日"],
    ["2024-07-29", "令和6年7月29日"],
  ])("%s→%s", (date, expected) => {
    expect(toJapaneseDateString(new Date(date))).toBe(expected);
  });
});

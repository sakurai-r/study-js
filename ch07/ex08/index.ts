export const reverse = (str: string) => {
  const segmenterJa = new Intl.Segmenter("ja-JP", { granularity: "grapheme" });
  return [...segmenterJa.segment(str)]
    .map((e) => e.segment)
    .reverse()
    .join("");
};

// Intl.Segmenter()コンストラクター
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/Segmenter

// Intl.Segmenter
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter

// join
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/join

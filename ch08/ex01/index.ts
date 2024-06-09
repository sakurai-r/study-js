//以下のアロー関数を簡潔に記載しなさい。なお、引数や戻り値の括弧の要否などをコードコメントで説明しなさい。

/**
 * 自然数nと英数文字cを引数にとり、文字cをn回コンソール出力してから文字cをn個含む配列を返す
 * @param {number} n 自然数
 * @param {string} c 英数文字
 * @return {String[]} cをn個含む配列
 */
export const returnArray = (n: number, c: string): string[] => {
  const result = [];
  for (let i = 0; i < n; i++) {
    console.log(c);
    result.push(c);
  }
  return result;
};

/**
 * 数値xを引数にとり、xの二乗の数値を返す
 * @param {number} x
 * @return {number} x^2
 */
export const squared = (x: number): number => {
  return Math.pow(x, 2);
};

/**
 * 引数なしで、現在時刻のプロパティnowを含むオブジェクトを返す
 * @returns {now : string}
 */
export const nowTime = (): { now: string } => {
  return { now: new Date().toLocaleString() };
};

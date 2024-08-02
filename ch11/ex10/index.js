// 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す関数
export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す関数
export function getWeekdaysCount(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;
  let currentDate = start;

  while (currentDate <= end) {
    const day = currentDate.getDay();
    if (day !== 0 && day !== 6) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}

// 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
export function getDayOfWeek(dateString, locale) {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { weekday: "long" });
}

// ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数。ただし getMonth、setMonth は利用してはいけない。
export function getFirstDayOfPreviousMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  let previousMonth = month - 1;
  let previousYear = year;

  if (previousMonth < 0) {
    previousMonth = 11;
    previousYear--;
  }

  return new Date(previousYear, previousMonth, 1, 0, 0, 0, 0);
}

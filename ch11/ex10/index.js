// 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す関数
export function getDaysInMonth(year, month) {
  // 日を 0 に設定すると、前月の最終日になる
  return new Date(year, month, 0).getDate();
}

// 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す関数
export function getWeekdaysCount(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;
  let currentDate = start;
  const SUNDAY = 0;
  const SATURDAY = 6;

  while (currentDate <= end) {
    const day = currentDate.getDay();
    if (day !== SUNDAY && day !== SATURDAY) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}

// 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
export function getDayOfWeek(dateString, locale) {
  const date = new Date(dateString);
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  return date.toLocaleDateString(locale, { weekday: "long" });
}

// ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数。ただし getMonth、setMonth は利用してはいけない。
export function getFirstDayOfPreviousMonth() {
  const date = new Date();
  // 前の月の最終日
  date.setDate(0);
  // 前の月の最初の日
  date.setDate(1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date;
}

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/substring
export function substring(str, indexStart, indexEnd) {
  const start = indexStart > 0 ? indexStart : 0;
  const correctStart = start < str.length ? Math.floor(start) : str.length;

  if (indexEnd === undefined) {
    let result = "";
    for (let i = correctStart; i < str.length; i++) {
      result += str[i];
    }
    return result;
  }

  const end = indexEnd > 0 ? indexEnd : 0;
  const correctEnd = end < str.length ? Math.floor(end) : str.length;

  if (correctStart > correctEnd) {
    let result = "";
    for (let i = correctEnd; i < correctStart; i++) {
      result += str[i];
    }
    return result;
  }

  let result = "";
  for (let i = correctStart; i < correctEnd; i++) {
    result += str[i];
  }
  return result;
}

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/slice
export function slice(str, indexStart, indexEnd) {
  const start =
    indexStart === undefined || !Number(indexStart) || Number.isNaN(indexStart)
      ? 0
      : indexStart;
  const correctStart = Math.floor(
    start < 0 ? Math.max(start + str.length, 0) : start
  );

  if (indexEnd === undefined || !Number(indexEnd) || indexEnd >= str.length) {
    if (Number.isNaN(indexEnd)) {
      return "";
    }
    let result = "";
    for (let i = correctStart; i < str.length; i++) {
      result += str[i];
    }
    return result;
  }

  const correctEnd = Math.floor(
    indexEnd < 0 ? Math.max(indexEnd + str.length, 0) : indexEnd
  );

  let result = "";
  for (let i = correctStart; i < correctEnd; i++) {
    result += str[i];
  }
  return result;
}

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
export function padStart(str, targetLength, padString) {
  const length = targetLength > str.length ? targetLength - str.length : 0;
  if (padString === undefined) {
    let addString = "";
    for (let i = 0; i < length; i++) {
      addString += " ";
    }
    return addString + str;
  }

  let addString = "";
  for (let i = 0; i < length; i++) {
    addString += padString[i % padString.length];
  }
  return addString + str;
}

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/trim
export function trim(str) {
  /**
   * ^ 文字列の開始位置
   * \s* ０個以上の空白文字
   * $ 文字列の終了位置
   */
  return str.replace(/^\s*|\s*$/g, "");
}

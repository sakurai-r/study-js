export function substring(str, indexStart, indexEnd) {
  let result = "";
  if (indexEnd === undefined) {
    for (let i = indexStart; i < str.length; i++) {
      result += str[i];
    }
  } else {
    for (let i = indexStart; i < indexEnd; i++) {
      result += str[i];
    }
  }
  return result;
}

export function slice(str, indexStart, indexEnd) {
  // TODO: ここを実装しなさい
  return "TODO";
}

export function padStart(str, targetLength, padString) {
  // TODO: ここを実装しなさい
  return "TODO";
}

export function trim(str) {
  // TODO: ここを実装しなさい
  return "TODO";
}

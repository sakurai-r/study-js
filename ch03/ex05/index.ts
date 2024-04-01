// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/replace#%E7%BD%AE%E6%8F%9B%E6%96%87%E5%AD%97%E5%88%97%E3%81%A8%E3%81%97%E3%81%A6%E3%81%AE%E9%96%A2%E6%95%B0%E3%81%AE%E6%8C%87%E5%AE%9A
export const switchLineEnding = (str: string) => {
  return str.replace(/\r\n|\n/g, (match) => {
    return match === "\n" ? "\r\n" : "\n";
  });
};

export const f = (v) => {
  const args = [];
  for (let i = 1; i <= 10; i++) {
    args.push(`$${i}`);
  }

  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  return new Function(
    ...args,
    v.includes("\n") || /return/.test(v) ? v : `return ${v};`
  );
};

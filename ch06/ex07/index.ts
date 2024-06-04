interface obj {
  [key: string | number | symbol]: string | number;
}

const assign = (target: obj, ...sourceList: obj[]) => {
  for (const source of sourceList) {
    const keys = [
      ...Object.keys(source),
      ...Object.getOwnPropertySymbols(source),
    ];
    for (const key of keys) {
      target[key] = source[key];
    }
  }
  return target;
};

export default assign;

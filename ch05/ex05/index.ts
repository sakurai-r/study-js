export const filterEvenValues = (obj: { [key: string]: number }) => {
  const result: { [key: string]: number } = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v % 2 === 0) {
      result[k] = v;
    }
  }
  return result;
};

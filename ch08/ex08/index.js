export const counterGroup = () => {
  let counters = [];

  const newCounter = () => {
    let n = 0;

    return {
      count: () => n++,
      reset: () => {
        n = 0;
      },
      n: () => n,
    };
  };

  const total = () => counters.reduce((x, y) => x + y.n(), 0);

  return {
    newCounter: () => {
      const counter = newCounter();
      counters.push(counter);
      return counter;
    },
    total,
  };
};

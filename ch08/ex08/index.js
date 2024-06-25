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
  const average = () => {
    if (counters.length < 1) {
      throw new TypeError();
    }
    return total() / counters.length;
  };
  const variance = () => {
    if (counters.length < 2) {
      throw new TypeError();
    }
    const avg = average();
    return (
      counters.reduce((x, y) => x + Math.pow(y.n() - avg, 2), 0) /
      counters.length
    );
  };

  return {
    newCounter: () => {
      const counter = newCounter();
      counters.push(counter);
      return counter;
    },
    total,
    average,
    variance,
  };
};

export const any = (...functions) => {
  return (n) => functions.some((f) => f(n));
};

export const catching = (f, errorHandler) => {
  return (...arg) => {
    try {
      return f(arg);
    } catch (e) {
      return errorHandler(e);
    }
  };
};

export const addMyCall = (f) => {
  f.myCall = (obj, ...arg) => {
    f.bind(obj, arg);
  };
};

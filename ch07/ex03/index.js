export const sum = (array) => {
  if (!Array.isArray(array)) {
    return 0;
  }
  return array.reduce((x, y) => x + y, 0);
};

export const join = (array, _separator) => {
  const separator = _separator ? _separator : ",";
  return array.reduce((x, y) => {
    y ? x + separator + y : "";
  }, "");
};

export const reverse = (array) => {};

export const every = () => {};

export const some = () => {};

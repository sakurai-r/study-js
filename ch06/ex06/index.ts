const getProperties = (obj: {
  [key: string | number | symbol]: string | number;
}) => {
  const enumerableProperty = [];
  const symbolProperty = [];
  let prototype = Object.getPrototypeOf(obj);
  while (prototype !== null) {
    for (const enumerableKey of Object.keys(prototype)) {
      enumerableProperty.push(enumerableKey);
    }
    for (const symbolKey of Object.getOwnPropertySymbols(prototype)) {
      symbolProperty.push(symbolKey);
    }
    prototype = Object.getPrototypeOf(prototype);
  }

  return [...Reflect.ownKeys(obj), ...enumerableProperty, ...symbolProperty];
};

export default getProperties;

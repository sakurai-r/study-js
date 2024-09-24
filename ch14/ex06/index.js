export function loggingProxy(o) {
  const calledMethod = [];

  const handler = {
    get(target, property) {
      const targetProp = target[property];

      if (typeof targetProp === "function") {
        return function (...args) {
          calledMethod.push({
            methodName: property,
            timestamp: new Date().toISOString(),
            parameters: args,
          });

          // apply によって 指定した this と引数で関数を呼び出した結果が返る。
          // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
          return targetProp.apply(this, args);
        };
      }
      return targetProp;
    },
  };

  return { proxy: new Proxy(o, handler), calledMethod };
}

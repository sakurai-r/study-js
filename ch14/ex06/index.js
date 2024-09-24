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

          /**
           * この関数は、関数fをoのメソッドとして呼び出します。そして、args配列中の値を引数として渡します。
           * なお、oがnullの場合は、関数として呼び出されます。f.apply(o, args)と記述したのと同じです。
           */
          return targetProp.apply(this, args);
        };
      }
      return targetProp;
    },
  };

  return { proxy: new Proxy(o, handler), calledMethod };
}

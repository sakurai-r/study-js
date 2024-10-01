import { loggingProxy } from "./index.js";

describe("loggingProxy", () => {
  let obj;
  let proxy;
  let calledMethod;

  beforeEach(() => {
    obj = {
      greet(name) {
        return `Hello, ${name}`;
      },
      add(a, b) {
        return a + b;
      },
      test: "string",
    };

    ({ proxy, calledMethod } = loggingProxy(obj));
  });

  test("record method call in the history", () => {
    proxy.greet("Sakurai");
    proxy.add(1, 2);

    expect(calledMethod.length).toBe(2);

    expect(calledMethod[0]).toMatchObject({
      methodName: "greet",
      parameters: ["Sakurai"],
    });

    expect(calledMethod[1]).toMatchObject({
      methodName: "add",
      parameters: [1, 2],
    });
  });

  test("not record access to non-method properties", () => {
    const nonMethodProp = proxy.test;
    expect(nonMethodProp).toBe("string");

    expect(calledMethod.length).toBe(0);
  });
});

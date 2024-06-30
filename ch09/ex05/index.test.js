import { instanceOf } from "./index.js";

class A {}
class B extends A {}
class C extends B {}

describe("index.js", () => {
  test("多段に継承したクラスのインスタンスと基底クラスのコンストラクタを入力するケース", () => {
    const c = new C();
    expect(instanceOf(c, A)).toBe(c instanceof A);
    expect(instanceOf(c, B)).toBe(c instanceof B);
    expect(instanceOf(c, C)).toBe(c instanceof C);
  });

  test("継承関係にないインスタンスとクラスのコンストラクタを入力するケース", () => {
    class D {}
    const d = new D();
    expect(instanceOf(d, A)).toBe(d instanceof C);
    expect(instanceOf(d, B)).toBe(d instanceof C);
    expect(instanceOf(d, C)).toBe(d instanceof C);
  });
});

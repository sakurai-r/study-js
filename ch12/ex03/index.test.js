import { counter } from "./index.js";

describe("counter generator", () => {
  it("increment the value correctly", () => {
    const gen = counter();

    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
    expect(gen.next().value).toBe(3);
  });

  it("reset the value to 0 when an exception is thrown", () => {
    const gen = counter();

    gen.next();
    gen.next();
    gen.next();

    gen.throw();
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
  });
});

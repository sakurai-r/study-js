import { Warrior, MageWarrior } from "./index.js";

describe("index.js", () => {
  test.each([
    { atk: 0, expected: 0 },
    { atk: 1, expected: 2 },
    { atk: 15, expected: 30 },
  ])("Warrior($atk) => attack() = $expected", ({ atk, expected }) => {
    const warrior = new Warrior(atk);
    expect(warrior.attack()).toBe(expected);
  });

  test.each([
    { atk: 0, mgc: 0, expected: 0 },
    { atk: 1, mgc: 1, expected: 3 },
    { atk: 15, mgc: 20, expected: 50 },
  ])(
    "MageWarrior($atk, $mgc) => attack() = $expected",
    ({ atk, mgc, expected }) => {
      const mageWarrior = new MageWarrior(atk, mgc);
      expect(mageWarrior.attack()).toBe(expected);
    }
  );
});

import { primes } from "./index.js";

describe("primes generator", () => {
  test("generate the first prime number", () => {
    const primeGen = primes();
    expect(primeGen.next().value).toBe(2);
  });

  test("generate prime numbers in the correct sequence", () => {
    const primeGen = primes();
    const firstTenPrimes = [
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
      71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
    ];
    const generatedPrimes = [];

    for (let i = 0; i < firstTenPrimes.length; i++) {
      generatedPrimes.push(primeGen.next().value);
    }

    expect(generatedPrimes).toEqual(firstTenPrimes);
  });

  test("be able to generate large prime numbers", () => {
    const primeGen = primes();
    let prime;

    for (let i = 0; i < 100; i++) {
      prime = primeGen.next().value;
    }

    expect(prime).toBe(541);
  });
});

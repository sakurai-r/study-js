import { abs, sum, factorial } from "./index.ts";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
    describe("abs", () => {
        it("returns same value when positive value given", () => {
            expect(abs(42)).toBe(42);
        });

        it("returns negated value when negative value given", () => {
            expect(abs(-42)).toBe(42);
        });

        it("returns zero value when zero given", () => {
            expect(abs(0)).toBe(0);
        });
    });

    describe("sum", () => {
        it("returns sum value when an array of positive numbers", () => {
            expect(sum([2, 3, 5, 7, 11])).toBe(28);
        });

        it("returns sum value when an array of negated num values", () => {
            expect(sum([-2, -3, -5, -7, -11])).toBe(-28);
        });

        it("returns zero when an empty array", () => {
            expect(sum([])).toBe(0);
        });

        it("works with an array of a single number", () => {
            expect(sum([2])).toEqual(2);
        });
    });

    describe("factorial", () => {
        it("returns the value of the factorial when positive value given", () => {
            expect(factorial(5)).toBe(120);
        });

        it("returns one value when negated value given", () => {
            expect(factorial(-5)).toBe(1);
        });

        it("returns one value when a number less than or equal to one given", () => {
            expect(factorial(1)).toBe(1);
        });
    });
});

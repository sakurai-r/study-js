export const isEqual = (num1: number, num2: number): boolean => {
  return Math.abs(num1 - num2) < 1e-10;
};

/**
 * JavaScript をはじめとして、最近のプログラミング言語の大半で使われているIEEE-754 浮動小
 * 数点表現形式は、2進数表記です。このため、1/2や1/8、1/1024などの小数は正確に表現できます。
 * しかし、金融計算などで普段使っているのは1/10、1/100 などの10 進数です。2 進浮動小数
 * 点表現形式では、0.1のような値も正確には表現できません。
 * 丸め誤差のために、.3 と.2 の差分の近似表現と、.2 と.1 の差分の近似表現は正確には同じ値になりません。
 * https://typescriptbook.jp/reference/values-types-variables/number/decimal-calculation-error
 */
console.log(isEqual(0.3 - 0.2, 0.1));
console.log(isEqual(0.2 - 0.1, 0.1));

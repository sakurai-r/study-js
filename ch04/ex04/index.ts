export const bitCount = (num: number) => {
  let count = 0;
  while (num) {
    // 「１」との論理積をとることで最下位ビットだけが残る
    count += num & 1;
    num >>>= 1;
  }
  return count;
};

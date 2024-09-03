export function* counter() {
  let c = 0;
  for (;;) {
    try {
      yield ++c;
    } catch (e) {
      c = 0;
      yield c;
    }
  }
}

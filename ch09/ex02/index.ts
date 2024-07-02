export class C {
  static #x = 0;
  get x() {
    return C.#x++;
  }
}

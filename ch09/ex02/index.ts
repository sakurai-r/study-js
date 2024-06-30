export class C {
  private static x = 0;
  get x() {
    return C.x++;
  }
}

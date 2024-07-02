//class C {
//  x = 42;

//  getX() {
//    return this.x;
//  }
//}

//export class C {
//  #x = 42;

//  getX() {
//    return this.#x;
//  }
//}

export class C {
  constructor() {
    const x = 42;

    this.getX = () => {
      return x;
    };
  }
}

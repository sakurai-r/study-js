class Animal {
  eat() {
    console.log("食べる");
  }

  makeSound() {
    console.log("鳴く");
  }
}

class Fish {
  #fish;
  constructor() {
    this.#fish = new Animal();
  }

  eat() {
    return this.#fish.eat();
  }
}

const fish = new Fish();
fish.makeSound();

import Animal from "./animal.js";
import { add, subtract } from "./util.js";

const animal = new Animal();
animal.makeSound();

console.log(add(2, 5));
console.log(subtract(5, 2));

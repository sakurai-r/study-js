const animalClass = require("./animal.cjs");

const animal = new animalClass();
animal.eat();

const sum = require("./util.cjs").sum;

console.log(sum(2, 5));

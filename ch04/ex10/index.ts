const array = ["r", "i", "c", "o", "h"];

delete array[3];

for (let i = 0; i < array.length; i++) {
  console.log(`array[${i}] : ${array[i]}`);
}
/**
 * array[0] : r
 * array[1] : i
 * array[2] : c
 * array[3] : undefined
 * array[4] : h
 */
console.log(array.length); // -> 5

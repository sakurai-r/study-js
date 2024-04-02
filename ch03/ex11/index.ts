const s1 = Symbol("symbol");
const s2 = Symbol("symbol");

const obj = {
  [s1]: "s1",
  [s2]: "s2",
};

"hoge".length;

//const obj2 = {
//  [Symbol("s")]: "s1",
//  [Symbol("s")]: "s2",
//  [Symbol("s")]: "s3",
//};

//console.log(Object.getOwnPropertySymbols(obj2));
//console.log(obj2[Object.getOwnPropertySymbols(obj2)[0]]);

// Symbol 関数は一意の値を返すため、同じ文字列を使って、Symbol() を2度呼び出しても異なる Symbol 値が返される。
console.log(`s1 : ${obj[s1]}`); // -> s1
console.log(`s2 : ${obj[s2]}`); // -> s2

const symFor1 = Symbol.for("symbol");
const symFor2 = Symbol.for("symbol");

const objSymFor = {
  [symFor1]: "symFor1",
  [symFor2]: "symFor2",
};

// 文字列に関連付けられた Symbol 値がない場合には、新たに Symbol 値が生成されて返される。
// 関連付けられた Symbol 値がある場合は、既存のSymbol値が返される。
// Symbol.for() は、同じ文字列を使って呼び出した場合は、常に同じ値を返す
// 戻り値として返された Symbol 値に対して toString() を呼び出すと、Symbol.for() に渡された文字列も出力されます
console.log(`symFor1 : ${objSymFor[symFor1]}`); // -> symFor2
console.log(`symFor2 : ${objSymFor[symFor1]}`); // -> symFor2

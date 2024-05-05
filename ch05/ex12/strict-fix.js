/* eslint-disable no-delete-var */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

// strict モードでは、with文は使えません
const obj = { a: 1, b: 2 };
console.log(obj.a, obj.b);

/**
 * strict モードでは、変数はすべて宣言しなければなりません。宣言していない変数、関数、
 * 関数パラメータ、catch 節パラメータ、グローバルオブジェクトのプロパティに対して値を
 * 設定すると、ReferenceError がスローされます（非strict モードであれば、グローバルオブ
 * ジェクトに新しいプロパティが追加され、グローバル変数が暗黙に宣言されます）。
 */
const hoge = 10;

/**
 * strict モードでは、メソッドではなく、関数として呼び出された関数中において、this の
 * 値はundefined になります（非strict モードであれば、関数として呼び出された関数中で
 * は、this の値はグローバルオブジェクトになります）。また、strict モードでは、call()
 * やapply()（§8.7.4）を使って関数を呼び出すと、this の値は、call() やapply() の第
 * 1 引数として渡したものとまったく同じ値になります（非strict モードであれば、null や
 * undefined 値を指定した場合はグローバルオブジェクトに変更され、オブジェクト以外の
 * 値を渡すとオブジェクトに変換されます）。
 */
function checkThis() {
  console.log(this);
}
checkThis();

/**
 * strict モードでは、書き込み不可（nonwritable）なプロパティへの代入や、拡張不可
 * （nonextensible）のオブジェクトに対して新たなプロパティを作成しようとすると、
 * TypeError がスローされます（非strict モードであれば、何の例外も発生せず、代入や
 * 作成ができないだけです）。
 */
var nonWritableObj = {};
Object.defineProperty(nonWritableObj, "prop", {
  value: 10,
  writable: false,
});
try {
  nonWritableObj.prop = 20;
} catch (e) {
  console.log(e); // TypeError
}

/**
 * 非strict モードであれば、eval()に渡されたコードから、呼び出し側のスコープ中に変数を
 * 宣言したり、関数を定義したりできますが、strict モードではできません。strict モードでこ
 * れらのことを行うと、eval() 用に新たに作成されたスコープ中に変数や関数が定義されま
 * す。eval()から戻るときに、このスコープは廃棄されます。
 */
try {
  eval("var insideEval = 'hoge';");
  console.log(insideEval);
} catch (e) {
  console.log(e); // ReferenceError
}

/**
 * strict モードでは、関数のArgumentsオブジェクト（§8.3.3 参照）には、関数に渡された値
 * の静的なコピーが保持されます。非strict モードであれば、Argumentsオブジェクトは「特
 * 殊な」振る舞いを行います。配列の要素としても、関数のパラメータ名でも同じ値を参照で
 * きるようにしてくれます。
 */
function modifyArguments(x) {
  arguments[0] = 10;
  console.log(x); // -> 5
}
modifyArguments(5);

/**
 * strict モードでは、delete演算子の後に、変数や関数、関数パラメータを表す識別子を記述
 * すると、SyntaxError がスローされます（非strict モードであれば、delete 処理が失敗し、
 * delete式はfalse と評価されるだけです）。
 */
//const x = 1;
//delete x;
//console.log(x);

/**
 * strict モードでは、オブジェクトリテラルで、同じ名前で複数のプロパティを定義すると構
 * 文エラーになります（非strict モードであれば、エラーになりません）。
 */
const duplicateProps = {
  a: "hoge",
  b: "fuga",
};
console.log(duplicateProps.a);

/**
 * strict モードでは、関数を宣言するときに、同じ名前で複数のパラメータを定義すると構文
 * エラーになります（非strict モードであれば、エラーになりません）。
 */
function duplicateParameters(a, b) {
  console.log(a);
  console.log(b);
}
duplicateParameters(1, 2);

/**
 * strictモードでは、8進数リテラル（0xではなく、0から始まる数値）は使えません（非strict
 * モードでは、処理系によっては8 進数リテラルが使える場合もあります）。
 */
const oct = 8;
console.log(oct);

/**
 * strict モードでは、eval やarguments 識別子はキーワードのような扱いになり、値を変更
 * できません。これらの識別子に値を代入したり、変数名や関数名として使ったり、関数のパ
 * ラメータとして使ったり、catchブロックの識別子として使ったりすることはできません。
 */
//const eval = "eval";
const args = "arguments";

/**
 * strict モードでは、コールスタックの確認にも制限が追加されます。strict モードの関数中で
 * は、arguments.callerとarguments.calleeにアクセスすると、TypeErrorがスローさ
 * れます。また、strict モードの関数に対して、caller とarguments プロパティを読み出す
 * とTypeError がスローされます（処理系によっては、非strict モードの関数に対して、これ
 * らの非標準のプロパティが定義されている場合があります）。
 */
function stack() {
  try {
    console.log(arguments.caller);
    console.log(arguments.callee);
  } catch (e) {
    console.log(e); //TypeError
  }
}
stack();

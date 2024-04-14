// 何らかのリサイズを行う関数と思って読んで下さい
//
// - params には undefined またはオブジェクトが与えられる
// - params.maxWidth が与えられる場合 (正の整数と仮定して良い) はその値を利用する
// - params.maxHeight が与えられる場合 (正の整数と仮定して良い) はその値を利用する
//function resize(params) {
//  let maxWidth = 600;
//  let maxHeight = 480;

//  if (params && params.maxWidth) {
//    maxWidth = params.maxWidth;
//  }

//  if (params && params.maxHeight) {
//    maxHeight = params.maxHeight;
//  }

//  console.log({ maxWidth, maxHeight });
//}
const resize1 = (params?: { [key: string]: number } | undefined) => {
  // && 前後のオペランドの両方が true の場合にのみ true
  // || はオペランドの一方または両方が true に変換される場合は true に変換される値を返す
  const maxWidth = (params && params.maxWidth) || 600;
  const maxHeight = (params && params.maxHeight) || 480;

  console.log({ maxWidth, maxHeight });
};

const resize2 = (params?: { [key: string]: number }) => {
  // ?. 左側の式が null や undefined に評価された場合でも TypeError を防ぐ。
  // ?? は左辺のオペランドが null でも undefined でもない場合は、左辺の値を返す。
  const maxWidth = params?.maxWidth ?? 600;
  const maxHeight = params?.maxHeight ?? 480;

  console.log({ maxWidth, maxHeight });
};

resize1({ maxWidth: 100, maxHeight: 200 });
resize1({ maxHeight: 300 });
resize1();

resize2({ maxWidth: 100, maxHeight: 200 });
resize2({ maxWidth: 300 });
resize2();

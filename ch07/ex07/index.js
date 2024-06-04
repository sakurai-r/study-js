export const bubbleSort = (
  array,
  compare = (lhs, rhs) => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0)
) => {
  for (let i = 0; i < array.length - 1; i++) {
    let swapped = false;

    // ソート済みの終端の要素を除外して比較する
    for (let j = 0; j < array.length - 1 - i; j++) {
      // 隣り合う要素を比較して、左辺の方が大きい場合は要素を入れ替える
      if (compare(array[j], array[j + 1]) > 0) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        swapped = true;
      }
    }

    // 1回目のループで１度も交換が発生していない場合は既にソート済みのためループを抜ける
    if (!swapped) {
      break;
    }
  }

  return array;
};

// lhs left-hand side
// rhs right-hand side

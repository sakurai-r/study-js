export const addMyCall = (f) => {
  f.myCall = (obj, ...arg) => {
    // 第1引数は this の値にバインドされ
    // 2番目以降の引数は関数の引数にバインドされる
    // return f(obj, ...arg)() の場合、this はグローバルまたは undefined
    // TypeError: Cannot read properties of undefined (reading 'a')
    return f.bind(obj, ...arg)();
  };
};

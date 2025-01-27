const path = require('path');

module.exports = {
  entry: './ex05/index.js', // エントリーポイント
  output: {
    filename: 'bundle.js', // バンドル後のファイル名
    path: path.resolve(__dirname, 'ex05/dist'), // 出力先ディレクトリ
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
};

const path = require('path');

module.exports = {
  entry: './ex06/index.js',
  output: {
    filename: 'bundle.js', // バンドル後のファイル名
    path: path.resolve(__dirname, 'ex06/dist'), // 出力先ディレクトリ
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
};

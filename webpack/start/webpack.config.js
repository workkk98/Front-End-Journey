const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  context: __dirname,
  entry: {
    a: './src/index.js', // 键名 表示chunk名字
    b: './src/index2.js'
  },
  output: {
    filename: 'bundle-[name]-[hash].js',
    path: path.resolve(__dirname , './dist')
  },
  module: {
  // 我觉得这样设置是因为 module就是对某些特殊模块的加载。 rules数组的设计是为了一个个核对后缀名
    rules: [
      {
        // 正则这里一定要注意了 因为弄错格式就会报错
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
}

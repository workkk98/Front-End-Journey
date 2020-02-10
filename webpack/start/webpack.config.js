const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map', // 打开工具 查看错误行数
  context: __dirname, // 整个上下文的路径
  entry: './src/index.js',
  output: {
    filename: 'bundle-[name].js',
    path: path.resolve(__dirname , './dist'),
    // chunkFilename: '[name]-chunk-[id]'
  },
  module: {
  // 我觉得这样设置是因为 module就是对某些特殊模块的加载。 rules数组的设计是为了一个个核对后缀名
    rules: [
      {
        // 正则这里一定要注意了 因为弄错格式就会报错
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:8].css'
    })
  ],
  resolve: {
    alias: {
      assets: '../assets/'
    }
  }
}

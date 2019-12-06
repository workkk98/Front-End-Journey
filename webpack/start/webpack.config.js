const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map', //source-map妙用，映射错误到源文件
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },  // 入口
  output: { // 出口
    path: path.resolve(__dirname, 'dist'), // 输出路径
    filename: '[name].bundle.js' // 输出文件名
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '管理输出'
    })
  ]
}
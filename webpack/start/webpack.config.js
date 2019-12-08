const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map', //source-map妙用，映射错误到源文件
  devServer: {
    contentBase: './dist',
    hot: true  //HMR hot module Replacement
    // publicPath: './docs'
  },
  //webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中，
  //然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。
  //如果你的页面希望在其他不同路径中找到 bundle 文件，则可以通过 dev server 配置中的 publicPath 选项进行修改
  entry: {
    app: './src/index.js'
  },  // 入口
  output: { // 出口
    path: path.resolve(__dirname, 'dist'), // 输出路径
    filename: '[name].bundle.js', // 输出文件名
    publicPath: '/'
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '管理输出'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
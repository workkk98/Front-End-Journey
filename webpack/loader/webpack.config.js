const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')

function resolve(name) {
  return path.resolve(__dirname,`./${name}`)
}


module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    contentBase: 'dist',
    hot: true
  },
  output: {
    path: resolve('dist'),
    filename: '[name]-[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            options: {
              name: 'prettier'
            },
            loader: 'prettierscript-loader'
          },'html-loader','markdown-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolveLoader: {
    modules: ['node_modules','./'],
  }
}
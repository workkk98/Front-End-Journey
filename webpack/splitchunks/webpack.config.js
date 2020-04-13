const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin }  = require('webpack-bundle-analyzer')

module.exports = {
  mode: 'development',
  entry: {
    // entry: './src/entry.js',
    entry2: './src/default2/entry2.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]-[hash:8].js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ]
}
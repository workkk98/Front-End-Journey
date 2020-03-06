const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
    // another: path.resolve(__dirname, './src/another_module.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]-[hash:8].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'step1'
    }),
    new CleanWebpackPlugin(),
    // new webpack.optimize.SplitChunksPlugin({
    //   name: 'common'
    // })
  ],
  optimization: {
    // splitChunks: {
    //   chunks: 'all',
    //   minSize: 30000,
    //   // minRemainingSize: 0, webpack 5才能用
    //   // maxSize: 0,
    //   minChunks: 1,
    //   // maxAsyncRequests: 6,
    //   // maxInitialRequests: 4,
    //   automaticNameDelimiter: '~',
    //   automaticNameMaxLength: 30,
    //   cacheGroups: {
    //     defaultVendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true
    //     }
    //   }
    // },
  },
  devServer: {
    contentBase: './dist'
  }
}
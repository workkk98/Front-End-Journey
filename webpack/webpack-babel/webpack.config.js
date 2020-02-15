const path = require('path')
const {WebPlugin} = require('web-webpack-plugin')

module.exports = {
  entry: './main.js',
  devtool: 'true',
  output: {
    path: path.resolve(__dirname , './dist'),
    filename: '[name]-[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use : ['babel-loader']
      },
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts','.js']
  },
  plugins: [
    new WebPlugin({
      template: './template.html',
      filename: 'index.html'
    })
  ]
}
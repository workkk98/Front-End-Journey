const path = require('path')

module.exports = {
  entry: './src/index.js',  // 入口
  output: { // 出口
    path: path.resolve(__dirname, 'dist'), // 输出路径
    filename: 'bundle.js' // 输出文件名
  },
  module: { //loader
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.woff/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}
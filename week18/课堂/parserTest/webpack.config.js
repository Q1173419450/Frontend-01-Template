module.exports = {
  entry: './src/parser.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  mode: 'development',
  optimization: {
    minimize: false
  }
}
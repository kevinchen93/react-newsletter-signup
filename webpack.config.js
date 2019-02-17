const path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend/allergan-code-exercise.jsx',
  output: {
    path: path.resolve(__dirname, 'assets', 'js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '*' ]
  },
  devtool: 'source-map',
};

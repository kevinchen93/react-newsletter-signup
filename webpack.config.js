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
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [ '@babel/plugin-proposal-class-properties']
          }
        },
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '*' ]
  },
  devtool: 'source-map',
};

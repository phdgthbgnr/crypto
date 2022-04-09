const path = require('path');

module.exports = {
  mode: 'production',

  entry: './src/_js/app.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'script.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js'],
  },

  devtool: 'source-map',

  devServer: {
    static: path.resolve(__dirname, './public'),
  },
};

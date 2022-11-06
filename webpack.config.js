const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',

  entry: {
    app: ['./src/_js/app.js'],
    worker: ['./src/_js/workers/worker.js'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].js',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],

  resolve: {
    extensions: ['*', '.js'],
  },

  devtool: 'source-map',

  devServer: {
    static: path.resolve(__dirname, './public'),
  },
};

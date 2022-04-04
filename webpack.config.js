const path = require('path');

module.exports = {
  mode: 'development',
  entry: '.src/_js/app.js',
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'public'),
  },

  modules: {
    rules: [
      {
        test: /\.js$/,
        excludes: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

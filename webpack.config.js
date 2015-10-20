/* globals module */

module.exports = {
  entry: {
    source: './src/source/main.js',
    config: './src/config/main.js'
  },

  resolve:  {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },

  output: {
    path: 'dist',
    filename: '[name].js'
  },

  module: {
    loaders: [
      // ES6 loader
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel?optional[]=runtime'
      },

      // TypeScript loader, for xjs framework source code
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
};
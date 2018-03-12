const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // installed via npm
// const webpack = require('webpack'); //to access built-in plugins

const config = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    alias: { vue: 'vue/dist/vue.js' }
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // { test: /\.png$/, loader: 'url-loader?limit=100000' },
      // { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.ttf$/, loader: 'file-loader' }
    ]
  },
  devtool: 'source-map',
  devServer: {
    compress: false,
    port: 9000
  }
}

module.exports = config

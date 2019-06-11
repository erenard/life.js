const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: { main: './app' },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '../dist')
  },
  resolve: {
    modules: [
      'app',
      'node_modules'
    ],
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './app/index.html' }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // { test: /\.png$/, use: 'url-loader?limit=100000' },
      // { test: /\.jpg$/, use: 'file-loader' },
      { test: /\.ttf$/, use: 'file-loader' },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }
}

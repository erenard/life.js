const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
  entry: './app',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    modules: [
      'app',
      'node_modules'
    ],
    alias: { vue: 'vue/dist/vue.js' }
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true
    }),
    new HtmlWebpackPlugin({ template: './app/index.html' })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // { test: /\.png$/, use: 'url-loader?limit=100000' },
      // { test: /\.jpg$/, use: 'file-loader' },
      { test: /\.ttf$/, use: 'file-loader' }
    ]
  },
  devtool: 'source-map',
  devServer: {
    compress: false,
    port: 9000
  }
}

module.exports = config

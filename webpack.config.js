const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const production = process.argv.indexOf('production') > -1

const config = {
  entry: { main: './app' },
  output: {
    filename: '[name].bundle.js',
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
    new UglifyJsPlugin(production ? {
      sourceMap: true,
      uglifyOptions: {
        comment: false,
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: true
        }
      }
    } : {}),
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
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'vendor'
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          minSize: 1
        }
      }
    }
  }
}

module.exports = config

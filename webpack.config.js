const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const developmentPort = 9000

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
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    compress: false,
    port: developmentPort
  }
}

module.exports = function (env, args) {
  if (args['bundle-analyzer']) {
    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerPort: developmentPort
    }))
  }
  if (args.mode === 'production') {
    config.optimization = {
      minimize: true,
      minimizer: [new UglifyJsPlugin({
        parallel: true
      })]
    }
  }
  return config
}

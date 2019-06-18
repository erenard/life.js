const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const parts = require('./webpack.parts')
const path = require('path')

const developmentPort = 9000

const config = {
  entry: { main: './app' },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '../dist')
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './app/index.html' })
  ],
  module: {
    rules: [
      // { test: /\.png$/, use: 'url-loader?limit=100000' },
      // { test: /\.jpg$/, use: 'file-loader' },
      { test: /\.ttf$/, use: 'file-loader' },
      { test: /\.glsl$/, use: 'raw-loader' }
    ]
  }
}

module.exports = function (env, args) {
  if (args['bundle-analyzer']) {
    return merge(config, parts.resolveModules(), parts.babel(), parts.vuejs(), parts.analyzeBundles(developmentPort))
  }
  if (args.mode === 'production') {
    return merge(config, parts.resolveModules(), parts.babel(), parts.vuejs(), parts.optimization())
  }
  if (args.mode === 'development') {
    return merge(config, parts.resolveModules(), parts.babel(), parts.vuejs(), parts.devServer(developmentPort))
  }
}

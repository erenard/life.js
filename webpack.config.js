const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const parts = require('./webpack.parts')
const path = require('path')

const developmentPort = 9000

const config = {
  entry: { main: './app' },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './app/index.html' })
  ]
}

module.exports = function (env, args) {
  const mandatoryParts = [parts.resolveModules(), parts.babel(), parts.vuejs()]
  const optionalParts = []

  if (env && env['bundle-analyzer']) {
    optionalParts.push(parts.analyzeBundles(developmentPort))
  }

  if (env && env.WEBPACK_SERVE) {
    optionalParts.push(parts.devServer(developmentPort))
  }

  return merge(config, ...mandatoryParts, ...optionalParts)
}

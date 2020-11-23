const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { merge } = require('webpack-merge')
const parts = require('./webpack.parts')
const path = require('path')

const port = 9000

const config = {
  entry: { main: './app' },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './app/index.html' })
  ]
}

module.exports = function (env, args) {
  const isDev = args.mode !== 'production'
  const mandatoryParts = [parts.resolveModules(), parts.babel(), parts.vuejs({ isDev })]
  const optionalParts = []

  if (env && env['bundle-analyzer']) {
    optionalParts.push(parts.analyzeBundles({ port }))
  }

  if (env && env.WEBPACK_SERVE) {
    optionalParts.push(parts.devServer({ port }))
  }

  return merge(config, ...mandatoryParts, ...optionalParts)
}

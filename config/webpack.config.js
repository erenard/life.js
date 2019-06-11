const webpackBaseConfig = require('./webpack.base.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const developmentPort = 9000

const config = Object.assign({}, webpackBaseConfig, {
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    compress: false,
    port: developmentPort
  }
})

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

const path = require('path')
const nodeExternals = require('webpack-node-externals')
const isCoverage = process.env.NODE_ENV === 'coverage'

const config = {
  output: { // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  resolve: {
    modules: [
      'app',
      'test/mock',
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  target: 'node', // webpack should compile node compatible code
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: 'inline-cheap-module-source-map'
}

if (isCoverage) {
  config.module.loaders = [{
    test: /\.(js|ts)/,
    include: path.resolve('app'), // instrument only testing sources with Istanbul, after ts-loader runs
    loader: 'istanbul-instrumenter-loader'
  }].concat(config.module.loaders)
}

module.exports = config

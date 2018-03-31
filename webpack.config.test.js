const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const isCoverage = process.env.NODE_ENV === 'coverage'

const config = {
  entry: [
    './test/index.js'
  ],
  output: { // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    path: path.join(__dirname, '.tmp'),
    filename: 'tests.js'
  },
  resolve: {
    modules: [
      'app',
      'test/mock',
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      document: ['document-mock', 'default']
    })
  ],
  target: 'node', // webpack should compile node compatible code
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: 'inline-cheap-module-source-map'
}

if (isCoverage) {
  config.module.rules = [{
    test: /\.(js|ts)/,
    include: path.resolve('app'), // instrument only testing sources with Istanbul, after ts-loader runs
    use: {
      loader: 'istanbul-instrumenter-loader',
      options: {
        esModules: true
      }
    }
  }].concat(config.module.rules)
}

module.exports = config

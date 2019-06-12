process.env.CHROME_BIN = require('puppeteer').executablePath()
// const webpack = require('webpack')
// const path = require('path')
const webpackBaseConfig = require('../config/webpack.base.config')

module.exports = function (config) {
  config.set({
    basePath: '..',
    // browsers: ['ChromeHeadless'],
    frameworks: [
      'mocha'
      // 'chai'
    ],

    files: [
      { pattern: './test/**/*.spec.js', watched: false }
    ],

    preprocessors: {
      './test/**/*.spec.js': ['webpack']
    },

    plugins: [
      // 'karma-chrome-launcher',
      'karma-mocha',
      'karma-webpack'
      // 'karma-chai'
    ],

    webpack: webpackBaseConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    reporters: ['progress']
  })
}

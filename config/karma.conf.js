process.env.CHROME_BIN = require('puppeteer').executablePath()
const { merge } = require('webpack-merge')
const parts = require('./webpack.parts')

module.exports = function (config) {
  config.set({
    basePath: '..',
    browsers: ['ChromeHeadless'],
    frameworks: [
      'mocha'
      // 'chai'
    ],

    files: [
      { pattern: './app/**/*.spec.js', watched: false }
    ],

    preprocessors: {
      './app/**/*.spec.js': ['webpack']
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-webpack'
      // 'karma-chai'
    ],

    webpack: merge(
      parts.resolveModules(),
      parts.babel(),
      parts.vuejs()
    ),

    webpackMiddleware: {
      stats: 'errors-only'
    },

    reporters: ['progress']
  })
}

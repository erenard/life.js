process.env.CHROME_BIN = require('puppeteer').executablePath()
// const webpack = require('webpack')
// const path = require('path')

module.exports = function (config) {
  config.set({
    basePath: '..',
    browsers: ['ChromeHeadless'],
    frameworks: [
      'mocha'
      // 'chai'
    ],

    files: ['./test/**/*.spec.js'],

    preprocessors: {
      './test/**/*.spec.js': ['webpack']
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-webpack'
      // 'karma-chai'
    ],

    webpack: {
      mode: 'none',
      resolve: {
        modules: ['./app', './node_modules'],
        alias: {
          vue: 'vue/dist/vue.js'
        }
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          { test: /\.vue$|\.html$|\.styl$|\.css$|\.scss$/, loader: 'ignore-loader' }
        ]
      }
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    reporters: ['progress']
  })
}

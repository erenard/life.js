process.env.CHROME_BIN = require('puppeteer').executablePath()
const webpack = require('webpack')
const path = require('path')

module.exports = function (config) {
  config.set({
    basePath: '..',
    files: ['./test/**/*.spec.js'],
    preprocessors: {
      './test/**/*.spec.js': ['webpack', 'sourcemap']
    },
    frameworks: ['mocha'],
    browsers: ['ChromeHeadless'],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{ type: 'text-summary' }, { type: 'lcov', subdir: '.' }]
    },
    plugins: ['karma-chrome-launcher', 'karma-mocha', 'karma-webpack', 'karma-sourcemap-loader', 'karma-coverage'],
    singleRun: false,
    autoWatch: true,
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
              loader: 'babel-loader',
              options: {
                plugins: ['istanbul']
              }
            }
          },
          { test: /\.vue$|\.html$|\.styl$|\.css$|\.scss$/, loader: 'ignore-loader' }
        ]
      },
      devtool: 'inline-source-map'
    },
    webpackMiddleware: {
      noInfo: true
    }
  })
}

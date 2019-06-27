process.env.CHROME_BIN = require('puppeteer').executablePath()
const merge = require('webpack-merge')
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
      // { pattern: './test/**/*.spec.js', watched: false }
      './test/game/cell.spec.js',
      './test/game/grid.spec.js',
      './test/render/pixi-renderer.spec.js',
      './test/render/animation.spec.js',
      './test/components/rules-editor-vue.spec.js',
      './test/components/user-interface-vue.spec.js'
    ],

    preprocessors: {
      // './test/**/*.spec.js': ['webpack']
      './test/game/cell.spec.js': ['webpack'],
      './test/game/grid.spec.js': ['webpack'],
      './test/render/pixi-renderer.spec.js': ['webpack'],
      './test/render/animation.spec.js': ['webpack'],
      './test/components/rules-editor-vue.spec.js': ['webpack'],
      './test/components/user-interface-vue.spec.js': ['webpack']
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
      parts.vuejs(),
    ),

    webpackMiddleware: {
      stats: 'errors-only'
    },

    reporters: ['progress']
  })
}

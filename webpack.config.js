const { merge } = require('webpack-merge')
const parts = require('./webpack.parts')

const port = 9000

const config = {
  entry: { main: './app' }
}

module.exports = function (env, args) {
  const isDev = args.mode !== 'production'
  const mandatoryParts = [parts.baseConfig({ isDev }), parts.vuejs({ isDev })]
  const optionalParts = []

  if (env && env['bundle-analyzer']) {
    optionalParts.push(parts.analyzeBundles({ port }))
  }

  if (env && env.WEBPACK_SERVE) {
    optionalParts.push(parts.devServer({ port }))
  }

  return merge(config, ...mandatoryParts, ...optionalParts)
}

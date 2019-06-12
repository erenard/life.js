const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  analyzeBundles: port => ({
    plugins: [new BundleAnalyzerPlugin({
      analyzerPort: port
    })]
  }),
  babel: () => ({
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    }
  }),
  devServer: port => ({
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      compress: false,
      port
    }
  }),
  optimization: () => ({
    optimization: {
      minimize: true,
      minimizer: [new UglifyJsPlugin({
        parallel: true
      })]
    }
  }),
  resolveModules: () => ({
    resolve: {
      modules: [
        'app',
        'node_modules'
      ]
    }
  }),
  vuejs: () => ({
    resolve: {
      alias: {
        'vue': 'vue/dist/vue.esm.js'
      }
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    module: {
      rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.vue$/, use: 'vue-loader' }
      ]
    }
  })
}

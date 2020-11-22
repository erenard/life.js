const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
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
      port,
      contentBase: './dist'
    }
  }),
  resolveModules: () => ({
    resolve: {
      modules: [
        'app',
        'node_modules'
      ]
    },
    module: {
      rules: [
        // { test: /\.png$/, use: 'url-loader?limit=100000' },
        // { test: /\.jpg$/, use: 'file-loader' },
        { test: /\.ttf$/, use: 'file-loader' },
        { test: /\.glsl$/, use: 'raw-loader' }
      ]
    }
  }),
  vuejs: () => ({
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm.js'
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

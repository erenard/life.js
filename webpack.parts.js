const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  analyzeBundles: ({ port }) => ({
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
  devServer: ({ port }) => ({
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      compress: false,
      port,
      contentBase: './dist',
      quiet: true
    }
  }),
  resolveModules: () => ({
    resolve: {
      extensions: ['.js'],
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
  vuejs: ({ isDev }) => ({
    resolve: {
      extensions: ['.vue'],
      alias: {
        vue: isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js'
      }
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      })
    ],
    module: {
      rules: [

        {
          test: /\.css$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: isDev } }
          ]
        },
        { test: /\.vue$/, use: 'vue-loader' }
      ]
    }
  })
}

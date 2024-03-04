const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  analyzeBundles: ({ port }) => ({
    plugins: [new BundleAnalyzerPlugin({
      analyzerPort: port
    })]
  }),
  devServer: ({ port }) => ({
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      compress: false,
      port,
      contentBase: './dist',
      quiet: false,
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp'
      }
    }
  }),
  baseConfig: ({ isDev }) => ({
    output: {
      filename: '[name].[contenthash].js',
      path: path.join(__dirname, 'dist'),
      publicPath: isDev ? '/' : '/life.js/'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ favicon: './app/assets/favicon.ico', template: './app/index.html' })
    ],
    resolve: {
      extensions: ['.js'],
      modules: [
        'app',
        'node_modules'
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        { test: /\.worker\.js$/, use: { loader: 'worker-loader' } },
        // { test: /\.png$/, use: 'url-loader?limit=100000' },
        // { test: /\.jpg$/, use: 'file-loader' },
        { test: /\.ttf$/, use: 'file-loader' },
        { test: /\.glsl$/, use: 'raw-loader' },
        {
          test: /favicon\.ico$/,
          use: 'file-loader?name=[name].[ext]'
        }
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

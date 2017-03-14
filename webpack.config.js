const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

const config = {
	entry: './app/main.js',
	output: {
		filename: 'bundle.js',
		path: './dist'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new HtmlWebpackPlugin({template: './app/index.html'})
	],
	target: 'electron',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['env']
				}
			},
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.png$/, loader: 'url-loader?limit=100000' },
			{ test: /\.jpg$/, loader: 'file-loader' },
			{ test: /\.ttf$/, loader: 'file-loader' }
		]
	},
	devtool: 'cheap-eval-source-map',
	devServer: {
		compress: true,
		port: 9000
	},
	watch: true,
	watchOptions: {
		ignore: '/node_modules'
	}
};

module.exports = config;

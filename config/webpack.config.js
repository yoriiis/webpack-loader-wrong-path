const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = (env, argv) => {
	const { mode } = argv
	const isProduction = mode === 'production'

	return {
		watch: !isProduction,
		context: __dirname,
		entry: path.resolve('src/index.js'),
		output: {
			filename: 'index.min.js',
			path: resolveApp('dist')
		},
		devtool: isProduction ? false : 'inline-source-map',
		module: {
			rules: [
				{
					test: /\.js$/,
					// The path is incorrect and does not generates error
					// Babel transpilation is ignored
					include: [path.resolve(__dirname, './src')],
					use: [
						{
							loader: 'babel-loader',
							options: {
								configFile: path.resolve(__dirname, './babel.config.js')
							}
						}
					]
				}
			]
		},
		resolve: {
			extensions: ['.js'],
			modules: [resolveApp('node_modules')]
		},
		stats: {
			assets: true,
			colors: true,
			hash: false,
			timings: true,
			modules: false,
			entrypoints: false,
			excludeAssets: /.map$/,
			assetsSort: '!size'
		}
	}
}

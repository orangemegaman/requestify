const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
	const isDev = env.env === 'dev';

	return {
		mode: isDev ? 'development' : 'production',
		entry: {
			app: './src/index.tsx',
		},
		output: {
			filename: isDev ? 'js/[name].js' : 'js/[name]-[chunkhash:7].js',
			path: path.resolve(process.cwd(), './dist/static/'),
		},
		module: {
			rules: [
				{
					test: /\.ts[x]?$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'ts-loader',
							options: {
								transpileOnly: isDev,
								compilerOptions: {
									noEmit: false,
								},
							},
						},
					],
				},
				{
					test: /\.css$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: 'global',
							},
						},
					],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'public/index.html',
			}),
		],
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
		},
		devServer: {
			port: 7000,
			hot: true,
		},
	};
};

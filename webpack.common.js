const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

require('dotenv').config();

// configurationSource may be 'Webpack', 'Caddy', or 'Hardcoded' depending on environment

commonConfig = (devBuild, htmlWebpackOptions, configurationSource) => {
	const buildPath = path.resolve(__dirname, 'public', 'build');
	const mainPath = path.resolve(__dirname, 'src', 'main/entry.tsx');

	const expandedConfiguration = {};

	if (configurationSource === 'Webpack') {
		// these should be defined in environment or .env file
		expandedConfiguration['CONFIGURATION_API_BASE'] = JSON.stringify(process.env.API_BASE);
		expandedConfiguration['CONFIGURATION_KEYCLOAK_CLIENT_ID'] = JSON.stringify(process.env.KEYCLOAK_CLIENT_ID);
		expandedConfiguration['CONFIGURATION_KEYCLOAK_REALM'] = JSON.stringify(process.env.KEYCLOAK_REALM);
		expandedConfiguration['CONFIGURATION_KEYCLOAK_URL'] = JSON.stringify(process.env.KEYCLOAK_URL);
	}

	return {
		entry: {
			mainBundle: ['core-js/stable', 'regenerator-runtime/runtime', mainPath]
		},
		optimization: {
			moduleIds: 'deterministic',
			chunkIds: 'named',
			splitChunks: {
				maxInitialRequests: Infinity,
				minSize: 0,
				chunks: 'all',
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
							return `vendor.${packageName.replace('@', '')}`;
						}
					}
				}
			}
		},
		output: {
			crossOriginLoading: 'anonymous',
			filename: 'js/[name].[contenthash].js',
			path: buildPath,
			publicPath: '/',
			assetModuleFilename: 'assets/[hash][ext][query]'
		},
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			alias: {}
		},
		module: {
			rules: [
				{
					test: /\.[jt]sx?$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
							plugins: [
								(devBuild && 'react-refresh/babel'),
								'@babel/proposal-class-properties',
								'@babel/proposal-object-rest-spread',
								'@babel/plugin-proposal-nullish-coalescing-operator',
								'@babel/plugin-proposal-optional-chaining'
							].filter(Boolean)
						}
					}
				},
				{
					test: /\.(s?)css$/,
					use: [
						{
							loader: 'style-loader'
						},
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'resolve-url-loader',
							options: {}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				},
				{
					test: /\.(jpe?g|png|gif|svg|ico)$/i,
					type: 'asset',
					generator: {
						filename: 'images/[hash][ext][query]'
					},
					parser: {
						dataUrlCondition: {
							maxSize: 8 * 1024
						}
					}
				},
				{
					test: /\.(otf|eot|ttf|woff|woff2)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'fonts/[hash][ext][query]'
					}
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			// broken
			// new MiniCssExtractPlugin({
			//   filename: 'css/[name][hash].css',
			//   chunkFilename: 'css/[id][hash].css',
			//   publicPath: '/'
			// }),
			// new CompressionPlugin(),
			new Webpack.DefinePlugin({
				CONFIGURATION_SOURCE: JSON.stringify(configurationSource),
				...expandedConfiguration
			}),
			new HtmlWebpackPlugin({
				chunks: ['mainBundle'],
				...htmlWebpackOptions
			}),
			(devBuild && new ReactRefreshWebpackPlugin())
		].filter(Boolean)
	};
};

module.exports = {commonConfig};

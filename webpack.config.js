const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = {
	entry: './src/es6/client.js',
	output: { path: __dirname, filename: './build/js/client.min.js' },
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query:
				{
					presets: [ 'es2015', 'react' ],
					plugins: [ 'transform-decorators-legacy']
				}
			} ],
	devtool: ['source-map'],
	plugins: [
         new webpack.optimize.UglifyJsPlugin({
             compress: {
                 screw_ie8: true,
                 warnings: false
             }
         })
     ]
	}
};

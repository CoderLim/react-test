/*
 *  webpack1.x迁移到2.x需要注意：
 *     1、extract-text-webpack-plugin: https://webpack.js.org/guides/migrating/#extracttextwebpackplugin-breaking-change
 * 
 */
var path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var DashboardPlugin = require('webpack-dashboard/plugin');
var HelloWorldPlugin = require('./plugins/HelloWorldPlugin.js');

module.exports = {
   /* devtool: '#eval-source-map',*/
    entry: {
      app: './components/index.jsx',
      /*vendor: ['react']*/
    },
    output: {
        path: path.resolve(__dirname, 'public/assets'),
        filename: 'js/[name].js',
        /*chunkFilename: 'js/[name].[hash].js',*/
        publicPath: '/assets/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015', 'stage-0'],
                        compact: false
                    }
                },
            ]
        },
        {
            test: /\.css$/,
            exclude: '/node_modules/',
            use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader']})
        }, {
            test: /\.scss$/,
            use: ['style-loader',
                'css-loader', 'sass-loader']
        }, {

        }],
        /*noParse: /\.min\.js/*/
    },
    plugins: [
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new ExtractTextPlugin('css/style.css'),
        /**
         * 这里是自动导入每个文件的lib，不用自己引用
         */
        new webpack.ProvidePlugin({
          React: 'react',
        }),
        new HelloWorldPlugin({options: true}),
        new ExtractTextPlugin('style.css')
        // new DashboardPlugin()
    ]
}

if (process.env.NODE_ENV === 'production') {
   // module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
}

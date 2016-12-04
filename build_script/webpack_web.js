var path = require('path')
var webpack = require('webpack')
var CleanPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var projectRootPath = path.resolve(__dirname, '../');

module.exports = {
    context: projectRootPath,
    devtool: 'cheap-source-map',
    entry: {
        app: ['babel-polyfill', 'whatwg-fetch', './src/index_web']
    },
    resolve: {
        alias: {
            app: path.join(projectRootPath, 'src'),
            libs: path.join(projectRootPath, 'libs'),
            'i18n': path.join(projectRootPath, 'i18n'),
            'client_api_service': path.join(projectRootPath, 'src/client_api_service'),
        }
    },
    output: {
        path: path.resolve(projectRootPath, './dist/web/static'),
        filename: 'bundle.js',
        publicPath: './static/',
    },
    plugins: [
        new CleanPlugin([path.resolve(projectRootPath, './dist/web/static')], { root: projectRootPath }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: path.resolve(projectRootPath, './src/index.html'),
            inject: false
        }),
        // ignore dev config
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

        // set global vars
        new webpack.DefinePlugin({
            'process.env': {
                // Useful to reduce the size of client-side libraries, e.g. react
                NODE_ENV: JSON.stringify('production')
            }
        }),

        // optimizations
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            { test: /\.css/, loader: 'style!css' },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.(js|jsx)$/, loader: 'babel', exclude: /node_modules/, include: projectRootPath },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=10000' }
        ]
    },
    babel: {
        "presets": ["es2015", "react"],
        "plugins": ["antd"]
    }
}
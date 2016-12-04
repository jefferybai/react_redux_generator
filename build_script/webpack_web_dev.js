var path = require('path');
var webpack = require('webpack');

var projectRootPath = path.resolve(__dirname, '../');

module.exports = {
    context: projectRootPath,
    devtool: 'eval',
    entry: {
        app: [
            'event-source-polyfill',
            'webpack-hot-middleware/client',
            'babel-polyfill',
            'whatwg-fetch',
            './src/index_web_dev'
        ],
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
        path: path.resolve(projectRootPath, './dist/static'),
        filename: 'bundle.js',
        publicPath: '/static/',
        sourceMapFilename: '[file].map'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        loaders: [
            { test: /\.css/, loader: 'style!css' },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.(js|jsx)$/, loaders: ['react-hot', 'babel' ], exclude: /node_modules/, include: projectRootPath },
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
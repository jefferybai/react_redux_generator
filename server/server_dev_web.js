/**
 * 用于开发web版的开发服务器
 */
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('../build_script/webpack_web_dev')
var express = require('express')

require('./server_mock')

var app = express()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath, reporter: customReporter }))
app.use(webpackHotMiddleware(compiler))

app.use('/images', express.static('src/images'))

//兼容老版，有些配置开发basepath配置为 '/mock_data的情况'
function crossMiddleware(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', req.get('origin') || null);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    res.setHeader('Access-Control-Expose-Headers', 'PARA_TOKEN,PARA_MTOKEN,x-requested-with');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Range');
}
app.use('/mock_data', function(req, res) {
    crossMiddleware(req, res);
    var url = req.url.split('?')[0];
    res.setHeader('Content-Type', 'application/json');
    fs.readFile(path.resolve(__dirname, '../mock_data', '.'+url), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.json({code: 404});
            return;
        }
        res.json(JSON.parse(data))
    });
});

app.use(function(req, res) {
    res.sendFile(path.resolve(__dirname, '../src/index.html'))
})

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})

/** 自定义的webpack编译日志输出 */
function customReporter(option) {
    var state = option.state;
    var stats = option.stats;
    var options = option.options;

    if(state) {
        var displayStats = (!options.quiet && options.stats !== false);
        if(displayStats &&
            !(stats.hasErrors() || stats.hasWarnings()) &&
            options.noInfo)
            displayStats = false;
        if(displayStats) {
            var jsonStats = stats.toJson();
            if (jsonStats.errors.length > 0) {
                jsonStats.errors.forEach(function (err) {
                    console.error(err);
                    console.log('\r\n');
                });
                return;
            }

            if (jsonStats.warnings.length > 0) {
                console.log(`## ${jsonStats.warnings.length} warnings`);
            }
        }
        if(!options.noInfo && !options.quiet) {
            options.log("webpack: bundle is now VALID.");
        }
    } else {
        options.log("webpack: bundle is now INVALID.");
    }
}
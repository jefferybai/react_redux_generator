/**
 * 用于预览开发好的web版， 需要启动mock-server
 */
var fs = require('fs')
var path = require('path')
var express = require('express')

var app = express()
var port = 3000

app.use(express.static(path.resolve(__dirname, '../dist/web')));

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})
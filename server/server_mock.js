/**
 * 用于模拟http api的服务器，主要用于客户端版本打包好后，开发测试用。
 */
var os = require('os');
var fs = require('fs');
var path = require('path');
var https = require('https');
var http = require('http');
var express = require('express')
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express()

var projectRootPath = path.resolve(__dirname, '../');
var homedir = os.homedir();

/* 配置 */
var httpPort = 3001
// var httpsPort = 443
// var httpsOption = {
//     key: fs.readFileSync(path.resolve(__dirname, './cert/privatekey.pem')),
//     cert: fs.readFileSync(path.resolve(__dirname, './cert/server_cert.pem')),
//     ca: fs.readFileSync(path.resolve(__dirname, './cert/my-root-ca.crt.pem'))
// }
//var uploadTmpPath = path.resolve(os.tmpdir(), './para_scp_')

var apiPathMap = {
    '/user/api': '../mock_data/user/api',
    '/haze/api': '../mock_data/haze'
}

//以此给其他api装上各种中间件
Object.keys(apiPathMap).forEach(function (apiBasePath) {
    app.use(apiBasePath, crossMiddleware)
    app.use(apiBasePath, bodyParser.json())
    app.use(apiBasePath, bodyParser.urlencoded({ extended: true }))
    app.use(apiBasePath, defaultHandler)
})

//默认返回中间件，通知调用者服务已启动
app.use(function (req, res) {
    res.send('mock server started.');
})

//启动http和https的服务
http.createServer(app).listen(httpPort, serverCb.bind(null, 'http'));
//https.createServer(httpsOption, app).listen(httpsPort, serverCb.bind(null, 'https'));

/* 进程异常和推出时的处理操作 */
process.on('uncaughtException', function (err) {
    console.log(`Caught exception: ${err}`);
    exitHandle()
});

process.on('unhandledRejection', function (reason, p) {
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
    exitHandle()
});

process.on('exit', function (code) {
    console.log('exit')
    exitHandle()
});

/* 默认中间件处理函数 */
function defaultHandler(req, res) {
    var localPath = apiPathMap[req.baseUrl];

    var url = req.url.split('?')[0];

    var filePath = path.resolve(__dirname, localPath, '.' + url)

    if (url == '/') {
        res.send('mock server started.');
        return
    }

    fs.readFile(filePath, 'utf8', (error, data) => {
        if (error) {
            console.error(error)
        }
        try {
            res.json(JSON.parse(data))
        } catch (error) {
            res.send(data)
        }
    });
}

/* 下载的api中间件处理函数 */
function downloadHandler(req, res, next) {
    var url = req.url.split('?')[0];
    if (url !== '/demo/file/download') {
        return next();
    }

    var downloadUrl = req.query.path

    res.download(downloadUrl, function (error) {
        if (error) {
            console.error(error)
        }
    })
}

/* 上传api中间件处理函数 */
function uploadHandler(req, res, next) {
    req.files.forEach(function (file) {
        fs.readFile(file.path, function (error, data) {
            if (error) {
                console.error(error)
                res.json({ code: 3006 });
                return;
            }

            var destination = path.join(req.body.path, file.originalname);
            var writer = fs.createWriteStream(destination);
            writer.on('error', (error) => {
                res.json({ code: 3006 });
                console.error(error);
            });
            writer.write(data);
            writer.end();
            res.json({ code: 200 });
            console.log(`upload file to ${destination}`);
        });
    });
}

/* 允许跨域的中间件处理函数 */
function crossMiddleware(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', req.get('origin') || null);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    res.setHeader('Access-Control-Expose-Headers', 'PARA_TOKEN,PARA_MTOKEN,x-requested-with');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Range');
    next();
}

/* 服务启动后回调 */
function serverCb(protocol, error) {
    if (error) {
        console.error(error)
    } else {
        console.info('==> ' + protocol + ' mock server started.')
    }
}

/* 服务退出回调 */
function exitHandle() {
    //rmdirSync(uploadTmpPath);
    console.log('upload tmpdir removed');
    console.log('mock server stoped');
}

//删除指定目录
var rmdirSync = (function () {
    function iterator(url, dirs) {
        var stat = fs.statSync(url);
        if (stat.isDirectory()) {
            dirs.unshift(url);//收集目录
            inner(url, dirs);
        } else if (stat.isFile()) {
            fs.unlinkSync(url);//直接删除文件
        }
    }
    function inner(path, dirs) {
        var arr = fs.readdirSync(path);
        for (var i = 0, el; el = arr[i++];) {
            iterator(path + "/" + el, dirs);
        }
    }
    return function (dir, cb) {
        cb = cb || function () { };
        var dirs = [];

        try {
            iterator(dir, dirs);
            for (var i = 0, el; el = dirs[i++];) {
                fs.rmdirSync(el);//一次性删除所有收集到的目录
            }
            cb()
        } catch (e) {//如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
            e.code === "ENOENT" ? cb() : cb(e);
        }
    }
})();
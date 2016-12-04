var fs = require('fs')
var webpack = require("webpack");
var options = require("./webpack_web");

var compiler = webpack(options);

function errHandle(err, stats) {
    if(err) {
        return console.error(err);
    }
    var jsonStats = stats.toJson();
    if(jsonStats.errors.length > 0) {
        jsonStats.errors.forEach(function(err) {
            console.error(err);
        })
        return;
    }

    if(jsonStats.warnings.length > 0) {
        console.log('## warnings');
        jsonStats.warnings.forEach(function(warning) {
            console.warn(warning);
        });
        console.log('\r\n');
    }

    console.log(`webpack version ${jsonStats.version}`)
    jsonStats.assets.forEach(function(asset) {
        console.log(`${asset.name}  --  size ${asset.size}  --  chunks ${asset.chunks.length}`)
    })
    console.log('\r\n');
    console.log('compile web success in ' + jsonStats.time + 's')
}

compiler.run(errHandle);
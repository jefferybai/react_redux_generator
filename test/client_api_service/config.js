"use strict";

const assert = require('assert');
const fsExtra = require('fs-extra');
const router = require('../../src/client_api_service/router');
const defaultConfig = require('../../src/client_api_service/config/default_config');
const getConfigPath = require('../../src/client_api_service/libs/get_data_path').getConfigPath;

module.exports = function(fileCache) {
    var userConfig = {
        panel_theme: 'osx'
    };

    var configPath = getConfigPath();

    var initConfig = {
        language: 'en'
    };

    fsExtra.removeSync(configPath);

    router.call(null, "config/init", initConfig)
        .then(() => {
            var jsonObj = fsExtra.readJsonSync(configPath, {throws: false});
            assert.deepEqual(jsonObj, initConfig, 'config/init fail');

            console.log("config/init success");

            return router.call(null, "config/load")
        })
        .then(response => {
            console.log(response);
            var jsonObj = fsExtra.readJsonSync(configPath, {throws: false});
            assert.deepEqual(response, Object.assign({}, defaultConfig, jsonObj), 'config/load response wrong data');

            console.log("config/load success");

            return router.call(null, "config/save", userConfig)
        })
        .then(response => {
            console.log(response);

            var jsonObj = fsExtra.readJsonSync(configPath, {throws: false});
            assert.deepEqual(response, Object.assign({}, defaultConfig, initConfig, userConfig), 'config/save response wrong data');
            assert.deepEqual(jsonObj, Object.assign({}, initConfig, userConfig), 'config/save fail');

            console.log("config/save success");

            return router.call(null, "config/init", initConfig)
        })
        .then(() => {
            var jsonObj = fsExtra.readJsonSync(configPath, {throws: false});
            assert.notDeepEqual(jsonObj, initConfig, 'config/init fail. init should not run when config.js exit.');

            console.log("config/init success");

            return router.call(null, "config/reset")
        })
        .then(response => {
            console.log(response);

            assert.deepEqual(response, defaultConfig, 'reset config fail, response not equal to default');

            var jsonObj = fsExtra.readJsonSync(configPath, {throws: false});
            assert.deepEqual({}, jsonObj, 'config/reset fail');

            console.log("config/reset success");
        })
        .catch(err => {
            console.error(err);
        });
}
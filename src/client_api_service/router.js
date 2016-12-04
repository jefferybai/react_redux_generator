/**
 * 客户端api转发，通过apiname映射到具体的模块
 * @param {string} apiname api名称
 * @param {object} param api名称
 * @return {Promise} 返回promise对象
 */
var apiMap = require('./routes')

module.exports = function(apiname) {
    var args = [].slice.call(arguments, 1);

    var result;
    if (apiMap[apiname]) {
        result = require(apiMap[apiname]).apply(null, args);
    } else {
        result = Promise.reject({
            code: 404,
            msg: 'not found api '+ apiname
        });
    }

    if (result instanceof Promise) {
        return result
    } else {
        return Promise.resolve(result)
    }
}
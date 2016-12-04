const assert = require('assert');
const httpApiProxy = require('../libs/common/client_api_service/http_api_proxy');

module.exports = function() {
    httpApiProxy({
        url: 'https://user.paratera.com/user/api/login',
        method: 'POST',
        contentType: 'form',
        data: {
            token_type: 'COOKIE',
            cookie_type: 'WAL',
            third_party: 'SELF',
            email: 'admin',
            password: '89bd6c079bf4f69440ea150a02220a69'
        }
    })
    .then(function(response) {
        console.log('登陆成功, 登陆用户信息：')
        console.log(response)

        return httpApiProxy({
            url: 'https://demo.paratera.com/haze/api/app/list'
        })
    })
    .then(function(response) {
        console.log('applist: ')
        console.log(response)
    })
    .catch(e => {
        console.error(e)
    })
}
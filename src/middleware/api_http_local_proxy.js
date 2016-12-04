/**
 * client版中调用api的本地代理中间件
 */
"use strict";

import httpApiProxy from 'libs/common/client_api_service/http_api_proxy'
import { CALL_API_HTTP, CALL_API_HTTP_START, CALL_API_HTTP_FAIL, USER_SERVICE_BASEPATH } from 'libs/common/constants/api_http'

// A Redux middleware that interprets actions with CALL_API_HTTP info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    if (action.type !== CALL_API_HTTP) {
        return next(action)
    }

    let {
        apiActionType,
        basepath = '/',
        endpoint,
        method = 'GET',
        data,
        contentType = "json",
        acceptType = "json"
    } = action

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }
    if (!['object', 'undefined', 'string'].includes(typeof data)) {
        throw new Error('Expected data to be object')
    }

    if (basepath == USER_SERVICE_BASEPATH) {
        if (process.env.NODE_ENV !== 'production') {
            //libs/common/constants/api_http定义的老板开发常量
            basepath = 'http://localhost:3000/mock_data/user/api'
        }
    }

    next(Object.assign(action, { type: CALL_API_HTTP_START }))

    return httpApiProxy({
        url: basepath + "/" + endpoint,
        method: method.toUpperCase(),
        contentType: contentType,
        acceptType: acceptType,
        data: data
    })
        .catch(e => {
            next({
                type: CALL_API_HTTP_FAIL,
                apiActionType: apiActionType,
                error: e
            });
            return Promise.reject(e);
        })
        .then(response => {
            next({
                response,
                type: apiActionType
            })
            return response
        })
}
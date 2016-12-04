import asyncActionCreator from 'libs/utils/asyncActionCreator'
import { CALL_API_HTTP, DOWNLOAD } from 'libs/common/constants/api_http'
import { MOBILE_BASEPATH } from '../constants/api_http'
import * as ActionTypes from '../constants/app'


/**
 * 获取客户端最新版本号
 */
export const requestLastVersion = asyncActionCreator(() => ({
    type: CALL_API_HTTP,
    apiActionType: ActionTypes.REQUEST_LAST_VERSION,
    basepath: MOBILE_BASEPATH,
    endpoint: 'public/version/check',
    method: 'POST',
    contentType: 'form',
    data: {
        platform: ActionTypes.APP_PLATFORM_ID
    }
}));

/**
 * 下载最新版本客户端
 * @param {string} url 下载地址
 */
export function downloadLast (url) {
    return {
        type: DOWNLOAD,
        url
    }
}
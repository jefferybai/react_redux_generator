import asyncActionCreator from 'libs/utils/asyncActionCreator'
import { CALL_API_HTTP } from 'libs/common/constants/api_http'
import { HAZE_BASEPATH, SSH_BASEPATH } from '../constants/api_http'
import * as ActionTypes from '../constants/apps'
import { APP_PLATFORM_ID } from '../constants/app'

/** 获取已安装的应用 */
export const requestInstalledApps = asyncActionCreator(() => {
    return {
        type: CALL_API_HTTP,
        apiActionType: ActionTypes.APPS_REQUEST_INSTALLED_APPS,
        basepath: SSH_BASEPATH,
        endpoint: 'haze/app/list',
        data: { platform: APP_PLATFORM_ID }
    };
});

/** 获取应用列表 */
export const requestApps = asyncActionCreator(() => ({
    type: CALL_API_HTTP,
    apiActionType: ActionTypes.APPS_REQUEST_APPS,
    basepath: SSH_BASEPATH,
    endpoint: 'haze/app/list'
}));

/** 安装应用 */
export const installApp = asyncActionCreator(app => ({
    type: CALL_API_HTTP,
    apiActionType: ActionTypes.APPS_INSTALL_APP,
    basepath: HAZE_BASEPATH,
    endpoint: 'app/install',
    app,
    data: { appId: app.appId }
}));

/** 卸载应用 */
export const uninstallApp = asyncActionCreator(app => ({
    type: CALL_API_HTTP,
    apiActionType: ActionTypes.APPS_UNINSTALL_APP,
    basepath: HAZE_BASEPATH,
    endpoint: 'app/uninstall',
    app,
    data: { appId: app.appId }
}));
/**
 * 系统状态模型，以及数据存储
 * @module reducers/app
 */
import { getResource } from 'i18n';
import * as ConfigActionType from 'libs/common/constants/config';
import * as AppActionType from '../constants/app';

export * from 'libs/common/reducers/app'

export function i18n(state=getResource(), action) {
    switch (action.type) {
        case ConfigActionType.CONFIG_LOAD:
        case ConfigActionType.CONFIG_SAVE:
        case ConfigActionType.CONFIG_RESET:
            return getResource(action.response.language);
        default:
            return state;
    }
}

export function lastVersion(state={
    version: null,
    url: null
}, action) {
    switch (action.type) {
        case AppActionType.REQUEST_LAST_VERSION:
            return {
                version: action.response.version_name,
                url: action.response.url
            };
        default:
            return state;
    }
}
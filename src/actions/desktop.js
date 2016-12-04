import asyncActionCreator from 'libs/utils/asyncActionCreator'
import { HAZE_BASEPATH } from '../constants/api_http'
import * as ActionTypes from '../constants/desktop'

//启动应用
export function startupApp(app) {
    return {
        type: ActionTypes.DESKTOP_START_UP_APP,
        app
    }
}

//关闭窗口面板
export function shutdownPanel(panelId) {
    return {
        type: ActionTypes.DESKTOP_SHOT_DOWN_PANEL,
        panelId
    }
}

//最小化窗口面板
export function minimizePanel(panelId) {
    return {
        type: ActionTypes.DESKTOP_MINIMIZE_PANEL,
        panelId
    }
}

//聚焦窗口面板
export function focusPanel(panel) {
    return {
        type: ActionTypes.DESKTOP_FOCUS_PANEL,
        panelId: panel?panel.id:null,
        panel
    }
}

//窗口面板-新建标签页
export function panelNewTab(panelId, app) {
    return {
        type: ActionTypes.DESKTOP_PANEL_NEW_TAB,
        panelId,
        app
    }
}

//窗口面板-关闭标签页
export function panelRemoveTab(panelId, tabId) {
    return {
        type: ActionTypes.DESKTOP_PANEL_REMOVE_TAB,
        panelId,
        tabId
    }
}

//窗口面板-聚焦标签页
export function panelFocusTab(panelId, tabId) {
    return {
        type: ActionTypes.DESKTOP_PANEL_FOCUS_TAB,
        panelId,
        tabId
    }
}
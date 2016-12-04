module.exports = {
    /**
     * 服务端api响应的提示的文案,
     * @format http_api_res_${error_code} error_code为服务端返回500时，response body中json对象的code属性
     */
    'http_api_res_401': "login is expired，please retry！",
    'http_api_res_415': "wrong username or password",
    'http_api_res_420': "wrong username or password",

    /**
     * 界面使用的文案,
     * @format ui_{route_name}_{custom_id} route_name 为页面所属一级路由名, custom_id自己看着办
     */
    //通用-保存按钮
    'ui_btn_save': 'save',
    //通用-取消按钮
    'ui_btn_cancel': 'cancel',
    //通用-保存成功提示
    'ui_alert_success': 'success',

    //登录页面-表单标题
    'ui_login_1': 'login',
    //登录页面-表单用户名文本框placeholder
    'ui_login_2': 'email or phone number',
    //登录页面-表单密码文本框placeholder
    'ui_login_3': 'password',
    //登录页面-表单按钮普通状态下文案
    'ui_login_4': 'sign in',
    //登录页面-注册链接文案
    'ui_login_5': 'register',
    //登录页面-本地校验用户名不对的提示
    'ui_login_6': 'user name is invalid',
    //登录页面-本地校验密码为空的提示
    'ui_login_7': 'you must forgot input password',
    //登录页面-忘记密码链接文案
    'ui_login_8': 'forgot password',

    //app-升级提示
    'ui_app_upgrade': 'A new version was released, now for updates?',
    //app-关闭窗口提示
    'ui_app_close_tip': 'putty and winscp will close togather, still close?',

    //桌面-topbar-配置
    'ui_desktop_topbar-1': 'configuration',
    //桌面-topbar-关于
    'ui_desktop_topbar-2': 'about',
    //桌面-topbar-计费中心链接
    'ui_desktop_topbar-3': 'billings',
    //桌面-topbar-作业中心链接
    'ui_desktop_topbar-4': 'jobs',
    //测速
    'ui_desktop_topbar-5': 'internet speed',
    //桌面-图标提示名称
    'ui_desktop_link-1': 'name',
    //桌面-图标提示版本
    'ui_desktop_link-2': 'version',
    //桌面-图标提示说明
    'ui_desktop_link-3': 'description',

    //home-配置-语言
    'ui_config_1': 'language',
    //home-配置界面-表单按钮-恢复默认配置
    'ui_config_3': 'reset',

    //应用商店
    'ui_appstore': 'App Store',
}
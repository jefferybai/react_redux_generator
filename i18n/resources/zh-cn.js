module.exports = {
    /**
     * 服务端api响应的提示的文案,
     * @format http_api_res_${error_code} error_code为服务端返回500时，response body中json对象的code属性
     */
    'http_api_res_401': "登录失效，请重新登陆！",
    'http_api_res_415': "用户名或密码不正确",
    'http_api_res_420': "用户名或密码不正确",

    /**
     * 界面使用的文案,
     * @format ui_{route_name}_{custom_id} route_name 为页面所属一级路由名, custom_id自己看着办
     */
    //通用-保存按钮
    'ui_btn_save': '保存',
    //通用-取消按钮
    'ui_btn_cancel': '取消',
    //通用-保存成功提示
    'ui_alert_success': '保存成功！',

    //登录页面-表单标题
    'ui_login_1': '登 录',
    //登录页面-表单用户名文本框placeholder
    'ui_login_2': '邮箱或手机号',
    //登录页面-表单密码文本框placeholder
    'ui_login_3': '密码',
    //登录页面-表单按钮普通状态下文案
    'ui_login_4': '登录',
    //登录页面-注册链接文案
    'ui_login_5': '注册',
    //登录页面-本地校验用户名不对的提示
    'ui_login_6': '用户名格式不正确',
    //登录页面-本地校验密码为空的提示
    'ui_login_7': '密码不能为空',
    //登录页面-忘记密码链接文案
    'ui_login_8': '忘记密码',

    //app-升级提示
    'ui_app_upgrade': '新版本发布了，现在更新吗？',
    //app-关闭窗口提示
    'ui_app_close_tip': '为了您的账号安全, 关闭超算云桌面会将您启动的putty和winscp应用一起关闭, 是否继续?',

    //桌面-topbar-配置
    'ui_desktop_topbar-1': '配置',
    //桌面-topbar-关于
    'ui_desktop_topbar-2': '关于',
    //桌面-topbar-计费中心链接
    'ui_desktop_topbar-3': '计费中心',
    //桌面-topbar-作业中心链接
    'ui_desktop_topbar-4': '作业中心',
    //测速
    'ui_desktop_topbar-5': '测速',
    //桌面-图标提示名称
    'ui_desktop_link-1': '名称',
    //桌面-图标提示版本
    'ui_desktop_link-2': '版本',
    //桌面-图标提示说明
    'ui_desktop_link-3': '说明',

    //桌面-配置-语言
    'ui_config_1': '语言',
    //桌面-配置-表单按钮-恢复默认配置
    'ui_config_3': '恢复默认配置',

    //应用商店
    'ui_appstore': '应用商店',
}
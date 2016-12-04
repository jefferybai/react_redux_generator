/**
 * 临时的应用配置，之后这些配置会保存在服务端.
 */
export default function(app) {
    var appId = app.appId;
    var indexUrl = app.appDesc&&app.appDesc.indexUrl;
    var config = {
        system: {
            //是否允许应用运行多窗口实例
            enableMultiInstance: true,
            //是否允许应用开启标签页的展现形式
            enableTabs: false,
            //应用窗口默认宽度
            defaultWidth: 1000,
            //应用窗口默认高度
            defaultHeight: 520
        }
    };

    //启动超算帐号管理器
    if(indexUrl.indexOf('putty_login') !== -1) {
        config.system.defaultWidth = 640;
        config.system.defaultHeight = 420;
    }

    //web SSH应用配置
    if (/^http(s)?:\/\/ssh.paratera.com/.test(indexUrl)) {
        config.system.enableMultiInstance = false;
        config.system.enableTabs = true;
        config.system.defaultWidth = 830;
        config.system.defaultHeight = 500;
    }

    //计费中心配置
    if (appId == '__oits_report__') {
        config.system.enableMultiInstance = false;
    }

    //作业中心配置
    if (indexUrl == './app/jobs/index.html') {
        config.system.enableMultiInstance = false;
    }

    return config;
}
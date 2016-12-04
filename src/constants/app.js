/**
 * 计算平台ID
 */
function getPlatformId() {
    switch(process && process.platform) {
        case 'win32' : return '11';
        case 'darwin': return '13';
        default      : return '10';
    }
}

/**
 * ACTION常量-获取客户端最新版本号
 */
export const REQUEST_LAST_VERSION = 'APP_REQUEST_LAST_VERSION';

/**
 * 应用平台ID
 */
export const APP_PLATFORM_ID = getPlatformId();
import { getResource } from 'i18n';

export default function errorCodeMap(err, store) {
    var I18N_TXT = getResource();
    return {
        401: I18N_TXT['http_api_res_401'],
        415: I18N_TXT['http_api_res_415'],
        420: I18N_TXT['http_api_res_420'],
        "not_support_now": "not support now",
    };
}
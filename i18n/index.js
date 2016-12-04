/**
 * 国际化模块
 * @module i18n
 */
"use strict";
import moment from 'moment';
import './moment_locale/zh-cn';

import resources from './resources';

const _languages = ['en', 'zh-cn'];
var defaultLanguage = 'zh-cn';
var language = defaultLanguage;

moment.locale(language);

if (typeof navigator == 'object' && navigator.language) {
    setLanguage(navigator.language.toLowerCase());
}

/**
 * 设置语言
 * @param {string} lang 语言
 */
export function setLanguage(lang) {
    if (_languages.indexOf(lang) == -1) {
        console.warn(`${lang} is not support. supported _languages is ${_languages}`);
        return;
    }
    moment.locale(lang);
    language = lang;
}

/**
 * 获取当前语言或指定语言的文案资源
 * @param {string} lang 语言，如果没有则返回当前已设置的语言
 */
export function getResource(lang) {
    if (_languages.indexOf(lang) == -1) {
        if (lang != null) {
            console.warn(`${lang} is not support. supported _languages is ${_languages}`);
        }
        return resources[language];
    } else {
        return resources[lang];
    }
}

export const languages = [
    {
        code: 'en',
        name: 'English'
    },
    {
        code: 'zh-cn',
        name: '中文'
    }
];
/**
 * 工具函数
 */
'use strict';

const crypto = require('crypto');

/**
 * md5 加密函数
 * @param  {String} text 要加密的文本
 * @return {String}      加密后的文本
 */
exports.md5 = (text) => {
    return crypto.createHash('md5').update(text).digest('hex');
};
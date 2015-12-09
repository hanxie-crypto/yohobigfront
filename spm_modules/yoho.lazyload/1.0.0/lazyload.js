/**
 * lazyload
 * @author: xuqi(qi.xu@yoho.cn)
 * @date: 2015/6/25
 */
var $ = require('yoho.jquery');
require('./lib/jquery.lazyload.js');

/**
 * 为指定imgs添加lazyload效果,未指定imgs则为所有img.lazy添加lazyload效果
 * @params imgs lazyload的图片
 * @params options lazyload效果选项
 */
module.exports = function(imgs, options) {
    var setting = {
        effect : 'fadeIn',
        effect_speed: 10,
        placeholder: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///93d3f///yH5BAEAAAMALAAAAAABAAEAAAICVAEAOw==',
        skip_invisible: false
    }, $imgs, argsLength = arguments.length;
    
    //分解参数
    (function seperateOptions() {
        switch (argsLength) {
            case 0:
                $imgs = $('img.lazy');
                break;
            case 1:
                if (imgs instanceof $) {
                    //img
                    $imgs = imgs;
                } else {
                    $imgs = $('img.lazy');
                    $.extend(setting, imgs);
                }
                break;
            case 2:
                $imgs = imgs;
                setting = $.extend(setting, options);
                break;
        }
    }());

    $imgs.lazyload(setting);
};
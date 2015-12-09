/**
 * 头部
 * @author: wangqing<robin.wang@yoho.cn>
 * @date: 2015/12/01
 */


var $ = require('yoho.jquery');
var handlebars = require('yoho.handlebars');
var json2 = require('json2');
var noticeSuccess = false;
var hbhelper = require('../../hbshelper');

/**
 * 判断为1的helper
 * @param  {[type]} v1       [description]
 * @param  {[type]} options) {               if (v1 [description]
 * @return {[type]}          [description]
 */
handlebars.registerHelper('equalone',hbhelper.equalone);
require('../plugin/yohocookie');
require('../plugin/yohocart');
/**
 * 获取头部banner的回调函数
 * @param {[type]} data [description]
 */
function JsonPCallBack(data) {
    var topbanner;

    if (+data.code === 200) {
        if (typeof data.data === 'object') {
            topbanner = '<a target="_blank" href="' + data.data.url + '" class="page-top-banner"' +
                'style="height:50px;border:none;background-image:url(' + window.unescape(data.data.src) + ');' +
                'background-position: center;display:block;background-color:#ff5409;">&nbsp;</a>';
            $('body').prepend(topbanner);
        }
    }
}

/**
 * 获取头部服务器维护的回调
 * @param {[type]} data [description]
 */
function NoticeCallBack(data) {
    if (+data.code === 200) {
        noticeSuccess = true;
    }
}
window.JsonPCallBack = JsonPCallBack;

window.NoticeCallBack = NoticeCallBack;
/**
 * 检测是否获得公告
 * @return {[type]} [description]
 */
function checkNotice() {
    var noticeinner;

    if (!noticeSuccess) {
        noticeinner = '<div class="noticewrapper">' +
            '<div class="noticecontainer">' +
            '<h1 class="noticetitle">关于系统升级的公告</h1>' +
            '<div class="noticecontent">' +
            '<p class="tips">尊敬的顾客:</p>' +
            '<p class="detail">您好！为了向您提供更优质的服务，目前系统正在升级，请耐心等待。</p>' +
            '<p class="detail">' +
            '系统升级期间，部分地区用户体验会有暂时中断，如遇紧急事宜，欢迎垂询客服热线：400-889-9646 09:00-22:30(周一至周日)。稍后系统将恢复正常' +
            '</p>' +
            '<p class="detail">使用，欢迎您继续光顾YOHO!BUY有货！带来不便之处深表歉意，请您谅解！</p>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('.header-topwrapper').append(noticeinner);
    }
}
/**
 * 获得banner数据
 * @param  {[string]} code [banner对应的编码]
 * @return {[type]}      [description]
 */
function getBannerData(code) {
    var script = document.createElement('script');

    script.src = 'http://new.yohobuy.com/resource/getbanner?content_code=' +
        code + '&client_type=web&callback=JsonPCallBack';
    document.getElementsByTagName('head')[0].appendChild(script);
}
/**
 * 获取公告的jsonp请求
 * @param  {[type]} code [description]
 * @return {[type]}      [description]
 */
function getNoticeData(code) {
    var script = document.createElement('script');

    script.src = 'http://new.yohobuy.com/resource/getbanner?content_code=' +
        code + '&client_type=web&callback=NoticeCallBack';
    document.getElementsByTagName('head')[0].appendChild(script);
    window.setTimeout(checkNotice, 5000); //5s后检测是否成功
}
/**
 * 显示和隐藏
 * @param  {[type]} sourceClass [description]
 * @param  {[type]} targetClass [description]
 * @return {[type]}             [description]
 */
function toggleDisplay(sourceClass, targetClass) {
    var $that,
        targetobj;

    $(sourceClass).hover(function(e) {
        e.preventDefault();
        $that = $(this);
        targetobj = $(targetClass)[0];
        if (targetobj.style.display === '') {
            $that.addClass('acttags');
            targetobj.style.display = 'block';
        } else {
            $that.removeClass('acttags');
            targetobj.style.display = '';
        }
    });
}

/**
 * 执行顶部显示和隐藏
 * @return {[type]} [description]
 */
function actionTopTagToggle() {
    var tags = [{
            sourceClass: '.myyoho',
            targetClass: '.myyoho-info'
        }, {
            sourceClass: '.phone',
            targetClass: '.qr'
        }],
        obj,
        i;

    for (i = 0; i < tags.length; i++) {
        obj = tags[i];
        toggleDisplay(obj.sourceClass, obj.targetClass);
    }
}
/**
 * 执行顶部群组鼠标交互
 * @return {[type]} [description]
 */
function actionYoHoGroup() {
    var $this;

    $('.yohogroup').mouseenter(function() {
        $this = $(this);
        $this.text($this.attr('cn'));
    });
    $('.yohogroup').mouseleave(function() {
        $this = $(this);
        $this.text($this.attr('en'));
    });
}

/**
 * 检测是否支持css3的动画
 * @return {Boolean} [description]
 */
function isSupportCss3Animation() {
    var thisFunc,
        prefixList = ['webkit', 'moz', 'ms'],
        i;

    for (i = 0; i < prefixList.length; i++) {
        thisFunc = prefixList[i] + 'RequestAnimationFrame';
        if (window[thisFunc]) {
            return true;
        } else {
            return false;
        }
    }

}
/**
 * css3动画
 * @param  {Array}  ) {               var thisFunc, prefixList [description]
 * @return {[type]}   [description]
 */
function requestFrameCloser() {
    var prefixList = ['webkit', 'moz', 'ms'];
    var func1 = prefixList[0] + 'RequestAnimationFrame';
    var func2 = prefixList[1] + 'RequestAnimationFrame';
    var func3 = prefixList[2] + 'RequestAnimationFrame';

    if (window[func1]) {
        return function(callback) {
            window[func1](callback);
        };
    }
    if (window[func2]) {
        return function(callback) {
            window[func2](callback);
        };
    }
    if (window[func3]) {
        return function(callback) {
            window[func3](callback);
        };
    }
    return function(callback) {
        window.setTimeout(callback, 67);
    };
}


window.requestFrame = requestFrameCloser();
window.start = 0;
window.$logotrans = $('.icon-logo');
window.isen = true;

/**
 * css3动画
 * @return {[type]} [description]
 */

function tsAnimate() {
    window.start += 10;
    window.$logotrans.css({
        transform: 'rotateX(' + window.start + 'deg)',
        '-webkit-transform': 'rotateX(' + window.start + 'deg)',
        '-moz-transform': 'rotateX(' + window.start + 'deg)'
    });
    if (window.start / 90 % 2 === 1) {
        if (window.isen) {
            window.$logotrans.css('background-image', 'url(http://static.yohobuy.com/newheader/img/logo1.png)');
            window.isen = false;
        } else {
            window.$logotrans.css('background-image', 'url(http://static.yohobuy.com/newheader/img/logo_e.png)');
            window.isen = true;
        }
    }
    if (window.start / 90 % 2 === 0 && window.start % 360 !== 0) {
        window.setTimeout(tsAnimate, 3000);
    } else {
        if (window.start % 360 === 0) {
            window.setTimeout(tsAnimate, 1 * 60 * 1000);
        } else {
            window.requestFrame(function() {
                tsAnimate();
            });
        }
    }
}

window.loopdurationtime = 500;
window.globaltimeout;
window.onetimeoout;
/**
 * 淡出
 * @return {[type]} [description]
 */
function fadeAnimate() {
    if (window.globaltimeout) {
        window.clearTimeout(window.globaltimeout);
    }
    window.logotrans.fadeOut(window.loopdurationtime, function() {
        window.isen = false;
        window.logotrans.css('background-image', 'url(http://static.yohobuy.com/newheader/img/logo.png)');
        window.logotrans.fadeIn(window.loopdurationtime, function() {
            window.onetimeoout = window.setTimeout(function() {
                window.logotrans.fadeOut(window.loopdurationtime, function() {
                    window.clearTimeout(window.onetimeoout);
                    window.isen = true;
                    window.logotrans.css('background-image', 'url(http://static.yohobuy.com/newheader/img/logo_e.png)');
                    window.logotrans.fadeIn(window.loopdurationtime, function() {
                        window.globaltimeout = window.setTimeout(fadeAnimate, 1 * 60 * 1000);
                    });
                });
            }, 3000);
        });
    });
}
/**
 * 执行头部logo动画
 * @return {[type]} [description]
 */
function actionTopLogoAnimate() {
    if (isSupportCss3Animation()) {
        window.setTimeout(tsAnimate, 3000);
    } else {
        window.setTimeout(fadeAnimate, 3000);
    }
}
/**
 * 查询跳转后保留关键字
 * @return {[type]} [description]
 */
function actionAddKeyWords() {
    var $keywords = $('#nav_keyword').text();
    var defaultsearch = 'vans';
    var $querykey = $('#query_key');

    if ($keywords !== '') {
        $querykey.css({
            color: '#000'
        });
        $querykey.val($keywords);
    } else {
        $querykey.css({
            color: '#e0e0e0'
        });
        $querykey.val(defaultsearch);
        $querykey.on('focus', function(e) {
            $querykey.css({
                color: '#000'
            });
            $querykey.val('');
        });
    }
}
window.dataLayer = [];

function getSource(column, postition, event) {
    try {
        window.dataLayer.push({
            louceng: column,
            weizhi: postition,
            event: event
        });
    } catch (e) {}
}
/**
 * 搜寻的时候过滤非法字符（+-/:等非法字符单独出现）
 * @type {RegExp}
 */
window.reg = /^[\^\!\+\-\(\)\:\[\]\\\{\}\~\*\?\|\&\;\/\s]{0,}$/g;
window.keyword = '';
window.link = '';

window.submitSearch = function() {
    var $keywordinput = $('#query_key').val();
    var column = 'Search';
    var postition = 'Head Search';
    var event = 'Search';
    var $formatkeyword,
        $formatkeywordinput;

    $formatkeyword = $.trim(window.keyword.toLowerCase());
    $formatkeywordinput = $.trim($keywordinput.toLowerCase());
    getSource(column, postition, event);
    if (window.link !== '' && window.keyword !== '' && $formatkeyword === $formatkeywordinput) {
        location.href = window.link.replace('\'', '');
    } else {
        if (window.reg.test($keywordinput)) {
            location.href = 'http://search.yohobuy.com/error?query=' + $keywordinput + '&result=error';
        } else {
            $('#searchForm').submit();
            return false;
        }
    }
};
/**
 * banner和地址的映射
 * @type {Object}
 */
window.bannerMap = {
    listboys: '4f78b0f418fc42314d8b6e791cfb7fa8',
    listgirls: '00c1f025a51b6b597dc37925951ea27d',
    listkids: 'b02df11184727701ade1b6de9737d08c',
    listlifestyle: 'fd35c52dced0c880976ba858346d1fc5',
    searchboys: '9fb8986ea700cc27a8057361c3924394',
    searchgirls: 'e3e207a1443ca60c8037fe52a5560c18',
    searchkids: '620fc77f479da8feaeb06f2324e5d0bb',
    searchlifestyle: 'a3c93301c6ffaf3ed0f36a4a451be36d',
    uniquebrandboys: '2ebb0810c0d1a67e5229149c9c3aba7d',
    uniquebrandgirls: '99e23385f4ba4b65f406b7e2968ac821',
    uniquebrandkids: 'a74ebc9b17840c91b9ea46568111fe6b',
    uniquebrandlifestyle: '0e8c81ead53f56302baa4d0ad967f527',
    brandsboys: '77b352db07129c76a9d532acad149f9f',
    brandsgirls: 'bf047f16e52ebc38be5ce9c7623831e6',
    brandskids: 'e3ae1ce9b5e13c6d271ef3eccb831652',
    brandslifestyle: 'e4ac8029c30f65d7f1af030980d140fe',
    newboys: '869d3c5f3b450fb52101d00a61ce87cb',
    newgirls: 'd953b6dfdac02483d1dcce8d96055954',
    newkids: '0874cb6d75df8e0e78f2d475e53ecc08',
    newlifestyle: '43e8fc8e178115c262bbce2bd0012db7',
    saleboys: 'c846e3165c994769b4201d8c32f3ae9b',
    salegirls: '52b1d389edcbc62d65de71b80c4d6ad0',
    salekids: 'ad8b1703c761ba00973868ab5199cc27',
    salelifestyle: '7acc64905c70ac91846f43fb2cec4bbd',
    homeboys: 'b0856a771ef1b59ab1234c74688fa42d',
    homegirls: '2bd61fa12e4933211518f70fe5ce3c48',
    homekids: '895c59e8c64b40399c9533509507320c',
    homelifestyle: '2e037d4e25d2767352ca3e0a4627f7bd',
    indexboys: '0c911d3000f52e8ca7cffb74f5864c29',
    indexgirls: 'b645b8980c423ab30485e0a9d08c2ef7',
    indexkids: '17f6d5d5d454d2c507bc5fcbc90f7756',
    indexlifestyle: '735cd393e841762af8793c346abbbc36'
};

/**
 * cookie 初始化
 * @return {[type]} [description]
 */
function actionInitCookie() {
    var $cookieGender = $.cookie('_Gender');
    var $target = $('.cure');

    if (typeof $cookieGender !== 'undefined' && $cookieGender !== '') {
        $.setcookie('_Gender', 1, {
            path: '/',
            domain: '.yohobuy.com',
            expires: 7
        });
    }
    if ($target.find('.name-cn a').text() === '男生') {
        $.setcookie('_Gender', '1,3', {
            path: '/',
            domain: '.yohobuy.com',
            expires: 7
        });
        $.setcookie('_Channel', 'boys', {
            path: '/',
            domain: '.yohobuy.com',
            expires: 7
        });
    }
    if ($target.find('.name-cn a').text() === '女生') {
        $.setcookie('_Gender', '2,3', {
            path: '/',
            domain: '.yohobuy.com',
            expires: 7
        });
        $.setcookie('_Channel', 'girls', {
            path: '/',
            domain: '.yohobuy.com',
            expires: 7
        });
    }
    if ($target.find('.name-cn a').text() === '创意生活') {
        $.setcookie('_Channel', 'lifestyle', {
            path: '/',
            domain: '.yohobuy.com',
            expires: 7
        });
    }
    if ($target.find('.name-cn a').text() === '潮童') {
        $.setcookie('_Channel', 'kids', {
            path: '/',
            domain: '.yohobuy.com',
            expires: 7
        });
    }
}

/**
 * cookie集合
 * @type {Object}
 */
window.cookieMap = {};

function actionExeCookieMap() {
    var cookies = document.cookie;
    var cookiearr = cookies.split(';');
    var i;
    var temparr;
    var key;

    for (i = 0; i < cookiearr.length; i++) {
        temparr = cookiearr[i].split('=');
        key = temparr[0].replace(/\s/g, '');
        window.cookieMap[key] = temparr[1];
    }
}
/**
 * 一级菜单点击（会设置cookie）
 * @return {[type]} [description]
 */
function actionFirstMenuClick() {
    var $cookieGender;

    $('.first-nav-item').click(function() {
        $cookieGender = $.cookie('_Gender');
        if (typeof $cookieGender !== 'undefined' && $cookieGender !== '') {
            $.setcookie('_Gender', 1, {
                path: '/',
                domain: '.yohobuy.com',
                expires: 7
            });
        }
        if ($(this).find('.name-cn a').text() === '男生') {
            $.setcookie('_Gender', '1,3', {
                path: '/',
                domain: '.yohobuy.com',
                expires: 7
            });
            $.setcookie('_Channel', 'boys', {
                path: '/',
                domain: '.yohobuy.com',
                expires: 7
            });
        }
        if ($(this).find('.name-cn a').text() === '女生') {
            $.setcookie('_Gender', '2,3', {
                path: '/',
                domain: '.yohobuy.com',
                expires: 7
            });
            $.setcookie('_Channel', 'girls', {
                path: '/',
                domain: '.yohobuy.com',
                expires: 7
            });
        }
        if ($(this).find('.name-cn a').text() === '创意生活') {
            $.setcookie('_Channel', 'lifestyle', {
                path: '/',
                domain: '.yohobuy.com',
                expires: 7
            });
        }
        if ($(this).find('.name-cn a').text() === '潮童') {
            $.setcookie('_Channel', 'kids', {
                path: '/',
                domain: '.yohobuy.com',
                expires: 7
            });
        }
    });

    $('#backToOld').click(function() {
        $.setcookie('_New', 1, {
            path: '/',
            domain: '.yohobuy.com'
        });
        location.href = 'http://www.yohobuy.com';
    });
}


/**
 * 购物车商品数量
 * @return {[type]} [description]
 */
function actionUpdateCartNum() {
    $('#miniCartBox').miniCart({
        cartNum: '.ic-infomation'
    });
}
/**
 * 加载购物车数据
 * @return {[type]} [description]
 */
function loadCartData() {
    var shoppingInfo,
        shoppingData,
        strK;

    $.getData(window.apiDomain, {
        method: 'open.Shoppingcart.getCartData',
        shopping_key: $.getShoppingKey()
    }, function(jsonData) {
        if (window.cartTpl === '') {
            window.cartTpl = handlebars.compile($('#mini-cart-tpl').html());
        }
        $('#miniCartBox').children('.gobuy-wrapper').html(window.cartTpl({
            carData: jsonData
        }));
        if (parseInt($('.ic-infomation').html()) === 0) {
            $('#miniCartBox .gobuy-wrapper').html('<div class="gobuy-empty">' +
                '<h3 class="information">您的购物车暂无商品</h3></div>');
        }
        if ($('#miniCartBox .goods-list li').length < 1) {
            shoppingInfo = $.cookie('_g');
            shoppingData = json2.parse(shoppingInfo);
            if (shoppingData !== null) {
                strK = '{"_k":"' + shoppingData._k + '","_nac":0' + ',"_ac":0,"_r":0}';
                $.setcookie('_g', strK, {
                    path: '/',
                    domain: '.yohobuy.com'
                });
            }
            $('.ic-infomation').html(0);
            $('#miniCartBox .gobuy-wrapper').html('<div class="gobuy-empty">' +
                '<h3 class="information">您的购物车暂无商品</h3></div>');
        }
    });
}
/**
 * 删除购物车数据
 * @param  {[type]}  id        [description]
 * @param  {Boolean} isreduce [description]
 * @return {[type]}            [description]
 */
function delCartGoods(id, isreduce) {
    $.getData(window.apiDomain, {
        method: 'open.Shoppingcart.delone',
        shopping_key: $.getShoppingKey(),
        id: id,
        isreduce: isreduce
    }, function(jsonData) {
        var shoppingInfo = $.cookie('_g');
        var shoppingData = json2.parse(shoppingInfo);
        var strK = '{"_k":"' + shoppingData._k + '","_nac":' + jsonData.total_goods_num + ',"_ac":0,"_r":0}';

        $.setcookie('_g', strK, {
            path: '/',
            domain: '.yohobuy.com'
        });
        loadCartData();
        actionUpdateCartNum();
    });
}
window.apiDomain = 'http://api.open.yohobuy.com';
window.cartTpl = '';

/**
 * 监听购物车删除
 * @return {[type]} [description]
 */
function actionListenDelCarGoods() {
    var $delcargoods;
    var goodsid,
        cheapest;

    $(document).on('click', '.goodscardelete', function(e) {
        $delcargoods = $(this);
        goodsid = $delcargoods.attr('goodsid');
        cheapest = $delcargoods.attr('cheapest');
        delCartGoods(goodsid, cheapest);
    });
}
/**
 * 监听点击更多打折商品
 * @return {[type]} [description]
 */
function actionListenCartMore() {
    var $morecart;

    $(document).on('click', '.mycart_i_down', function(e) {
        $morecart = $(this);
        $morecart.toggleClass('mycart_i_up');
        $('#mycartmore').slideToggle(300);
    });
}
/**
 * 点击购物车
 * @return {[type]} [description]
 */
function actionClickMiniCartBox() {
    var $target;
    var shopcarurl = 'http://www.yohobuy.com/shopping/cart';

    $('#miniCartBox').on('click', function(e) {
        $target = $(e.target);
        if ($target.hasClass('gobuy')) {
            window.location.href = shopcarurl;
        }
    });
}

/**
 * 显示购物车效果
 * @param  {Boolean} isShow [description]
 * @return {[type]}         [description]
 */
function showMiniCart(isShow) {
    if (isShow === 1) {
        $('#miniCartBox').addClass('list-cur');
        $('.gobuy-wrapper').show();
        if (parseInt($('.ic-infomation').html()) !== 0) {
            $('#miniCartBox .gobuy-wrapper').html('<div class="gobuy-loading">' +
                '<h3 class="information">加载中，请稍后</h3></div>');
            loadCartData();
        } else {
            $('#miniCartBox .gobuy-wrapper').html('<div class="gobuy-empty">' +
                '<h3 class="information">您的购物车暂无商品</h3></div>');
        }
    } else {
        $('#miniCartBox').removeClass('list-cur');
        $('.gobuy-wrapper').hide();
    }
}


/**
 * 鼠标购物车的滑入滑出效果
 * @return {[type]} [description]
 */
function actionGoodsCarMouseEffect() {
    var $target;

    $('#miniCartBox').mouseenter(function(e) {
        $target = $(e.target);
        if ($target.attr('id') === 'miniCartBox' || $target.attr('class') === 'ic-infomation') {
            showMiniCart(1);
        }
    });
    $('#miniCartBox').mouseleave(function(e) {
        showMiniCart(0);
    });
}
/**
 * 获得banner & 异常通知
 * @return {[type]} [description]
 */
function actionGetBannerAndNotice() {
    var INDEXKIDS = 'indexkids',
        INDEXLIFESTYLE = 'indexlifestyle',
        INDEXBOYS = 'indexboys',
        INDEXWOMAN = 'indexgirls',
        UNIQUEBRAND = 'uniquebrand';
    var url = window.location.href;
    var host = window.location.host;
    var code = '';
    var firstarea;

    if (url.indexOf('search') !== -1) {
        code = window.bannerMap['search' + window.cookieMap._Channel];
    }
    if (url.indexOf('list') !== -1) {
        code = window.bannerMap['list' + window.cookieMap._Channel];
    }
    if (url.indexOf('brands') !== -1) {
        code = window.bannerMap['brands' + window.cookieMap._Channel];
    }
    if (url.indexOf('new') !== -1) {
        code = window.bannerMap['new' + window.cookieMap._Channel];
    }
    if (url.indexOf('sale') !== -1) {
        code = window.bannerMap['sale' + window.cookieMap._Channel];
    }
    if (url.indexOf('home') !== -1) {
        code = window.bannerMap['home' + window.cookieMap._Channel];
    }
    if (url.indexOf('kids') !== -1) {
        code = window.bannerMap[INDEXKIDS];
    }
    if (url.indexOf('woman') !== -1) {
        code = window.bannerMap[INDEXWOMAN];
    }
    if (url.indexOf('lifestyle') !== -1) {
        code = window.bannerMap[INDEXLIFESTYLE];
    }
    if (url.indexOf('www.yohobuy.com') !== -1 && window.location.pathname === '/') {
        code = window.bannerMap[INDEXBOYS];
    }
    firstarea = host.split('.')[0];
    if (firstarea !== 'list' && firstarea !== 'search' && firstarea !== 'www' &&
        firstarea !== 'new' && firstarea !== 'item' && firstarea !== 'guang') {
        code = window.bannerMap[UNIQUEBRAND + window.cookieMap._Channel];
    }

    getBannerData(code); //获得banner信息
    getNoticeData(code); //获得公告信息

}

function brandSwitch(index) {
    $('.hot-brands').find('ul').stop().animate({
        opacity: 0,
        'z-index': 1
    }, 200).eq(index).animate({
        opacity: 1,
        'z-index': 2
    }, 200);
}
/**
 * 品牌左右切换
 * @return {[type]} [description]
 */
function actionBrandChange() {
    var activeIndex = 0,
        swiperLen;

    if ($('.hot-brands').size() > 0) {
        swiperLen = $('.hot-brands').find('ul').size();
        $('.hot-brands').find('ul').eq(0).css({
            opacity: 1,
            'z-index': 2
        });
        $('.brands-control').on('click', '.next', function() {
            if (activeIndex === swiperLen - 1) {
                activeIndex = 0;
            } else {
                activeIndex++;
            }
            brandSwitch(activeIndex);
        });
        $('.brands-control').on('click', '.prev', function() {
            if (activeIndex === 0) {
                activeIndex = swiperLen - 1;
            } else {
                activeIndex--;
            }
            brandSwitch(activeIndex);
        });


    }
}
/**
 * 循环检测购物车数量
 * @return {[type]} [description]
 */
function actionLoopUpdCartNum() {
    setInterval(actionUpdateCartNum, 2000);
}
/**
 * 处理模板
 * @return {[type]} [description]
 */
function actionExeTemplate() {
    var resulthtml = $('#goodcartempwarpper').html().replace(/\\/g, '');

    $('#goodcartempwarpper').html(resulthtml);
}
/**
 * 执行搜索
 * @return {[type]} [description]
 */
function actionSearch() {
    var searchDomain = 'http://search.yohobuy.com/api/suggest';

    $('#query_key').search(searchDomain);
}
/**
 * 初始化函数
 * @return {[type]} [description]
 */
function init() {
    actionExeTemplate(); //处理模板
    actionInitCookie(); //初始化cookie
    actionExeCookieMap(); //格式化cookie
    actionYoHoGroup(); // yoho集团鼠标效果
    actionTopTagToggle(); // yoho上部分开关
    actionTopLogoAnimate(); //yoho logo动画
    actionGetBannerAndNotice(); // 获取banner和服务器维护提示
    actionBrandChange(); //切换品牌
    actionAddKeyWords(); //跳转后增加关键字
    actionFirstMenuClick(); //一级菜单点击（会设置cookie）
    actionGoodsCarMouseEffect(); //鼠标滑入滑出效果
    actionUpdateCartNum(); //更新购物车数量
    actionLoopUpdCartNum(); //循环检测购物车数量
    actionSearch(); //搜索执行
    actionClickMiniCartBox(); //点击购物车跳转
    actionListenDelCarGoods(); //监听购物车删除
    actionListenCartMore(); //
}

init();
/**
 * 商品列表页
 * @author: xuqi<qi.xu@yoho.cn>
 * @date: 2015/11/23
 */

var $ = require('yoho.jquery');

var checkUnicode = {
    unchecked: '&#xe613;',
    checked: '&#xe612;'
},
moreUnicode = {
    up: '&#xe610;',
    down: '&#xe600;'
};

//品牌相关变量
var $brandDefault = $('.brand .default'),
    $brandPanel = $('.brand .brand-panel'),
    $brandAttrs = $('.brand .attr'),
    $brandMore = $('#brand-more'),
    $brandMulti = $('#brand-multi');

var $brandMoreTxt, $brandMoreIcon;

//商品相关变量
var $goodsContainer = $('.goods-container'),
    $goodItem = $goodsContainer.find('.good-info'),
    $goodItemWrapper = $goodsContainer.find('.good-item-wrapper'),
    $goodInfoMain = $goodsContainer.find('.good-info-main'),
    $goodSelectColor = $goodsContainer.find('.good-select-color');

//价格相关变量
var $udPrice = $('.ud-price-range'),
    interReg = /^\d+$/,
    $limit, $min, $max, $btn;

//分类相关变量
var $sortSub = $('.sort-sub-wrap');

//高级选项相关变量
var $seniorSubWrap = $('.senior-sub-wrap'),
    $seniorAttrWrap = $('.senior-attr-wrap');

var seniorHoverTime, hoveredIndex;

//清除checkbox选中状态
function clearChecked($checkbox) {
    $checkbox.removeClass('checked').html(checkUnicode.unchecked);
}

//显示更多品牌面板
function brandShowMore() {
    $brandDefault.addClass('hide');
    $brandPanel.removeClass('hide');
}

//隐藏更多品牌面板
function brandHideMore() {
    $brandPanel.addClass('hide');
    $brandDefault.removeClass('hide');
}

//url构造&跳转
function uriLoc(attr, val) {
    var href = decodeURIComponent(window.location.search),
        query = attr + '=' + val,
        newHref;

    if (href === '') {
        newHref = '?' + query;
    } else {
        newHref = href + '&' + query;
    }

    window.location.href = newHref;
}

//隐藏高级选项面板
function hideSeniorPanel(index) {
    $seniorSubWrap.children('.senior-sub:eq(' + hoveredIndex + ')').addClass('hide');
    $seniorAttrWrap.children('.attr:eq(' + hoveredIndex + ')').removeClass('hover');
    hoveredIndex = -1;
}

//屏蔽筛选项双击文字选中
$('.filter-box').on('selectstart', '.attr, .brands-index span', function() {
    return false;
});

//【分类】
$('.sort-pre').on('click', 'li', function() {
    var index = $(this).index();

    $sortSub.children(':not(.hide)').addClass('hide');
    $sortSub.children(':eq(' + index + ')').removeClass('hide');
});

//【品牌】
if ($brandMore.length > 0) {
    $brandMoreTxt = $brandMore.children('em');
    $brandMoreIcon = $brandMore.children('.iconfont');
}

//【品牌】多选
$brandMulti.click(function() {
    if ($brandPanel.css('display') === 'none') {

        //显示品牌面板
        brandShowMore();
    }

    $brandPanel.addClass('multi'); //显示出checkbox
    $(this).addClass('hide');
});

//【品牌】更多
$brandMore.click(function() {
    var $this = $(this);

    if ($this.hasClass('more')) {
        brandHideMore();

        $brandMoreTxt.text('更多');
        $brandMoreIcon.html(moreUnicode.down);
    } else {
        brandShowMore();

        $brandMoreTxt.text('收起');
        $brandMoreIcon.html(moreUnicode.up);
    }

    $(this).toggleClass('more');
});

//【品牌】索引
$('.brands-index').on('click', 'span', function() {
    var $this = $(this),
        index = $this.data('index');

    if ($this.index() === 0) {

        //全部
        $brandAttrs.removeClass('hide');
    } else {
        $brandAttrs.addClass('hide').filter('[data-index=' + index + ']').removeClass('hide');
    }
});

//【品牌】搜索
$('#brand-search-input').keyup(function() {
    var val = $(this).val().toLowerCase();

    if (val === '') {
        $brandAttrs.removeClass('hide');
    } else {
        $brandAttrs.addClass('hide').filter('[data-key*=' + val + ']').removeClass('hide');
    }
});

//【品牌】多选确定
$('#brand-multi-ok').click(function() {
    var val = '';

    if ($(this).hasClass('dis')) {
        return;
    }

    $brandPanel.find('.checked').each(function() {
        var id = $(this).data('id');

        val += (val === '') ? id : (',' + id);
    });

    uriLoc('brand', val);
});

//【品牌/高级选项】多选取消
$('.multi-select-cancel').click(function() {
    var $panel = $(this).closest('.multi');

    if ($panel.hasClass('brand-panel')) {
        brandHideMore();

        $brandMulti.removeClass('hide'); //显示多选按钮
    }

    $panel.removeClass('multi');
    clearChecked($panel.find('.checkbox.checked')); //清除选中状态
});

//【品牌/高级选项】checkbox
$('.check-container').on('click', '.attr', function() {
    var $this = $(this),
        $check = $this.find('.checkbox'),
        $btnOk = $this.parent('.check-container').next('.btns').find('.multi-select-ok');

    $check.toggleClass('checked');

    if ($check.hasClass('checked')) {
        $check.html(checkUnicode.checked);
    } else {
        $check.html(checkUnicode.unchecked);
    }

    //更新按钮状态
    if ($check.hasClass('checked') ||
        $this.siblings('.attr').find('.checked').length > 0) {
        $btnOk.removeClass('dis');
    } else {
        $btnOk.addClass('dis');
    }
});

//【品牌/高级选项】当多选时阻止链接默认跳转
$('.brand, .senior').on('click', '.attr > a', function(e) {
    if ($(this).closest('.multi').length > 0) {
        e.preventDefault();
    }
});

//【价格】用户定义价格处理
if ($udPrice.length > 0) {
    $limit = $udPrice.find('.limit');
    $min = $limit.filter('.min');
    $max = $limit.filter('.max');
    $btn = $udPrice.find('.price-sure');

    //【价格】输入
    $limit.keyup(function() {
        var min = $.trim($min.val()),
            max = $.trim($max.val()),
            isMinInt = interReg.test(min),
            isMaxInt = interReg.test(max);

        if (isMaxInt && (min === '' || isMinInt) ||
            isMinInt && (max === '' || isMaxInt)
            ) {
            $btn.removeClass('hide');
        } else {
            $btn.addClass('hide');
        }
    });

    //【价格】多项查询
    $btn.click(function() {
        var min = $.trim($min.val()),
            max = $.trim($max.val()),
            tmp;

        //对于min大于max的情况，交换位置
        if (min !== '' && max !== '' && +min > +max) {
            tmp = max;
            max = min;
            min = tmp;
        }

        uriLoc('price', min + ',' + max);
    });
}

//【高级选项】鼠标移入显示子项
$seniorAttrWrap.on('mouseenter', '.attr', function() {
    var index = $(this).addClass('hover').index();

    $seniorSubWrap.children('.senior-sub:eq(' + index + ')').removeClass('hide');
}).on('mouseleave', '.attr', function() {
    var $this = $(this),
        index = $this.index();

    hoveredIndex = index;

    seniorHoverTime = setTimeout(function() {
        hideSeniorPanel();
    }, 100);
});

//【高级选项】多选
$('.senior-sub').on('click', '.multi-select', function() {
    $(this).closest('.senior-sub').addClass('multi');
}).on('click', '.multi-select-ok', function() {
    var $btn = $(this),
        $sub = $btn.closest('.senior-sub'),
        val = '';

    if ($btn.hasClass('dis')) {
        return;
    }

    $sub.find('.checked').each(function() {
        var id = $(this).data('id');

        val += (val === '') ? id : (',' + id);
    });

    uriLoc($sub.data('attr'), val);
}).on('mouseenter', function() {
    clearTimeout(seniorHoverTime);
}).on('mouseleave', function() {
    hideSeniorPanel();
});

//操作栏
(function() {
    var $countPerPage = $('#count-per-page'),
        $countChose = $countPerPage.next('ul');

    var SLIDETIME = 200;

    $(document).click(function(e) {
        if ($(e.target).closest('.page-count').length > 0) {
            return;
        }

        $countChose && $countChose.slideUp(SLIDETIME);
    });

    $countPerPage.click(function() {
        if ($countChose.css('display') === 'none') {
            $countChose.slideDown(SLIDETIME);
        } else {
            $countChose.slideUp(SLIDETIME);
        }
    });
}());


/*
 * Description: 商品列表移入效果
 * Added by wangchenglong at 2015/12/1
 */

// 构造html
function createColorList(data) {
    var colorListStr = '',
        len = data.length,
        row = 4, //每列ul放4个li
        col = Math.ceil(len / row), //需要几**列**ul
        i,
        j,
        index,
        ulNum = 0;

    for (i = 0; i < col; i++) {
        colorListStr += '<ul>';
        for (j = 0; j < row; j++) {
            index = i * row + j;
            if (index === len) {
                break;
            }
            colorListStr +=
                '<li>' +
                    '<a href="' + data[i * row + j].url + '">' +
                        '<img src="' + data[i * row + j].src + '" />' +
                    '</a>' +
                '</li>';

            if (j === row - 1) {
                colorListStr += '</ul>';
                ulNum++;
            }
        }
    }
    if (ulNum < col) {
        colorListStr += '</ul>';
    }
    return colorListStr;
}

//todo
$goodItem.mouseenter(function() {
    var $cloneStr,
        activeIndex,
        X,
        left,
        Y,
        top,
        colNum = 5,
        itemW = 222,
        itemH = 400,
        itemMr = 10,
        itemMb = 35;

    activeIndex = $(this).index() + 1;

    X = (activeIndex % colNum) === 0 ? colNum : activeIndex % colNum;
    Y = Math.ceil(activeIndex / colNum);
    left = (X - 1) * (itemW + itemMr) + 15 - 21;
    top = (Y - 1) * (itemH + itemMb) + 25 - 19;

    $cloneStr = $(this).clone();

    $goodInfoMain.html('');
    $goodSelectColor.html('');
    $goodItemWrapper.css({
        display: 'none'
    });
    $.ajax({
        type: 'GET',
        url: '/product/index/productColor',
        dataType: 'json'
    }).then(function(data) {

        $goodInfoMain.append($cloneStr);
        $goodSelectColor.append($(createColorList(data)));
    });

    $goodItemWrapper.css({
        left: left,
        top: top,
        display: 'inline-block'
    });

});

$goodItemWrapper.mouseleave(function() {
    $goodInfoMain.html('');
    $goodSelectColor.html('');
    $goodItemWrapper.css({
        display: 'none'
    });
});
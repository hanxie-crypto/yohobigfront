/**
 * 首页
 * @author: xuqi<qi.xu@yoho.cn>
 * @date: 2015/11/23
 */

var $ = require('yoho.jquery'),
    Handlebars = require('yoho.handlebars'),
    lazyLoad = require('yoho.lazyload');

require('../common/linkage-slider');
require('../common/slider2');
require('../common/new-arrivls');

lazyLoad($('img.lazy'));
$('.slide-container').linkageSlider();
$('.img-brand').slider2();


$.ajax({
    type: 'GET',
    url: '/boys/getBrand',
    dataType: 'json',
    success: function(data) {
        var brandTpl,
            brandHtml;

        function brandShow(hidePage, showPage) {
            lazyLoad($('li[data-page=' + showPage + ']').find('img.lazy').trigger('appear'));
            $('.logo-brand').find('li[data-page=' + hidePage + ']').find('img').fadeOut('normal', function() {
                $('.logo-brand').find('li').hide();

                $('.logo-brand').find('li[data-page=' + showPage + ']').show().find('img').fadeIn();
            });

        }

        Handlebars.registerHelper('brandList', function(items, options) {
            var out = '<ul>',
                i = 0,
                item;

            for (i = 0; i < items.length; i++) {
                item = options.fn(items[i]);
                if (i % 16 === 5 || i === 5) {

                    //插入切换按钮的位置
                    out = out + '<li class="logo-brand-switch" data-page="' + Math.floor(i / 16) + '">' +
                                '<a class="prev iconfont" href="javascript:;">&#xe60f;</a>' +
                                '<a class="next iconfont" href="javascript:;">&#xe60e;</a></li>' +
                                '<li data-page="' + Math.floor(i / 16) + '">' + item + '</li>';
                } else if (i !== 0 && i % 16 === 0) {

                    //插入more的位置，more占的是下一页第一个brand的位置，所以page是i/17
                    out = out + '<li class="brand-more" data-page="' + Math.floor(i / 17) + '">' +
                                '<a href="{{href}}">MORE ></a></li>' +
                                '<li data-page="' + Math.floor(i / 16) + '">' + item + '</li>';
                } else {
                    out = out + '<li data-page="' + Math.floor(i / 16) + '">' + item + '</li>';
                }
            }

            //加上最后一个more, more占的是下一页第一个brand的位置，这里已经循环不到brand，所以加在末尾
            return out + '<li class="brand-more" data-page="' + Math.floor(i / 17) + '">' +
                        '<a href="{{href}}">MORE ></a></li></ul>';

        });
        brandHtml = '\{{#brandList logoBrand}}' +
                    '<a href="\{{href}}"><img class="lazy" data-original="\{{img}}" alt=""></a>' +
                    '\{{/brandList}}';
        brandTpl = Handlebars.compile(brandHtml);
        $('.logo-brand').html(brandTpl(data));
        lazyLoad($('.logo-brand').find('img.lazy'));

        //品牌翻页
        $('.logo-brand').on('click', '.next', function() {
            var page = $(this).parent().data('page'),
                nextPage = 0,
                totalPage = Math.ceil($('.logo-brand').find('li').size() / 18) - 1;

            if (page === totalPage) {
                nextPage = 0;
            } else {
                nextPage = page + 1;
            }
            brandShow(page, nextPage);
        });

        $('.logo-brand').on('click', '.prev', function() {
            var page = $(this).parent().data('page'),
                prevPage = 0,
                totalPage = Math.ceil($('.logo-brand').find('li').size() / 18) - 1;

            if (page === 0) {
                prevPage = totalPage;
            } else {
                prevPage = page - 1;
            }
            brandShow(page, prevPage);
        });
    }
});


var jQuery = require('yoho.jquery');
var $yohocookie = require('./yohocookie');

(function($) {
    $.fn.miniCart = function(options) {
        var defaults = {
            'cookie': '_g',
            'cartNum': ''
        };
        var params = $.extend(defaults, options);
        var cartInfo = eval('(' + $.cookie(params.cookie) + ')');

        if (cartInfo != null) {
            var totalNum = parseInt(cartInfo._nac) + parseInt(cartInfo._ac);
            if (totalNum == 0) {
                $('#icart-num').attr('class', 'icart-num icart-none');
            } else {
                $('#icart-num').attr('class', 'icart-num');
            }
            $(params.cartNum).html(totalNum);
        }
    }
    $.fn.search = function(searchDomain) {
        var query_num = 0;
        var list_index = 0;
        var tmp_list = 0;

        function getKeywords(obj) {
            var key = $.trim($(obj).val());
            
            key = key.replace(new RegExp("'", "gm"), ''); //去掉特殊字符
            if (key == '') {
                $('.search-list').hide();
                return false;
            }
            key = encodeURI(key); //编码
            $.get(searchDomain + '?callback=?&query=' + key, function(htmlData) {
                $('.search-list').html(htmlData['data']);
                query_num = $('.search-list').children('li').length;
                list_index = -1;
                if (query_num > 0) {
                    $('.search-list').show();
                } else {
                    $('.search-list').hide();
                }
                //绑定事件                  
                $('.search-list').find('a').hover(function() {
                    $(this).css("background-color", "#eee");
                }, function() {
                    $(this).css("background-color", "#fff");
                });
            }, 'jsonp');
        }

        function getText(obj) {
            $('.search-list li:eq(' + tmp_list + ')').children('a').css("background-color", "#fff");
            $('.search-list li:eq(' + list_index + ')').children('a').css("background-color", "#eee");
            var text = $('.search-list li:eq(' + list_index + ')').children('a').attr("title");
            $('#query_key').val(text);
        }
        return this.each(function() {
            $(this).keyup(function(event) {
                if (event.which == 38) {
                    if (query_num == 0) {
                        return false;
                    }
                    if (list_index == -1) {
                        list_index = 0;
                    }
                    tmp_list = list_index;
                    list_index = (list_index - 1 + query_num) % query_num;
                    getText(this);
                } else if (event.which == 40) {
                    if (query_num == 0) {
                        return false;
                    }
                    tmp_list = list_index;
                    list_index = (list_index + 1) % query_num;
                    getText(this);
                } else if (event.which == 13) {
                    submitSearch();
                } else {
                    getKeywords(this);
                }
            });
        });
    };
    $.extend({
        getData: function(domain, options, onSuccess) {
            var defaults = {
                'page': 1,
                'method': '',
                'v': 1,
                'return_type': 'jsonp',
                'open_key': '12345',
                'tmp': Math.random()
            };
            if (typeof(domain) == undefined || domain == '') {
                console.log('请设置请求的api地址');
                return false;
            }
            var params = $.extend(defaults, options);
            params.page = params.page || 1;
            if (params.method == '') {
                console.log('请设置请求的URL');
                return false;
            }
            try {
                $.getJSON(domain + '/?callback=?', params, function(_data) {
                    if (onSuccess != '') {
                        eval(onSuccess(_data.data));
                        return false;
                    }
                });
            } catch (e) {
                console.log(e.message);
            }
        },
        getShoppingKey: function() {
            var shoppingInfo = $.cookie('_g');
            if (typeof shoppingInfo == 'undefined' || shoppingInfo == null) {
                return '';
            }
            var shoppingData = eval('(' + shoppingInfo + ')');
            return shoppingData._k;
        },
    })
})(jQuery);
exports.init = function() {

}
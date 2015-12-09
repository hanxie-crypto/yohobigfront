/**
 * 尾部
 * @author: wangqing<robin.wang@yoho.cn>
 * @date: 2015/12/01
 */

var $ = require('yoho.jquery');

var apiDomain;

/**
 * 订阅
 * @return {[type]} [description]
 */
function actionSubscription() {
    var $subscriberBox = $('#subscriber-box'),
        $subscriberBtn = $('#subscriber-btn'),
        emailReg = /^[.\-_a-zA-Z0-9]+@[\-_a-zA-Z0-9]+\.[a-zA-Z0-9]/;

    var subscribeParam = {
        method: 'open.subscriber.subscriber',
        v: 1,
        return_type: 'jsonp',
        open_key: '12345'
    };

    var iconCode = {
        mail: '&#xe61b;',
        tick: '&#xe61a'
    };

    var email = $.trim($subscriberBox.val());

    var params = {};

    $subscriberBox.focus(function() {
        $(this).val('').css('color', '');
        $subscriberBtn.removeClass('done').html(iconCode.mail);
    });

    $subscriberBtn.click(function() {
        if (email !== '' && emailReg.test(email)) {
            $.extend(params, subscribeParam, {
                email: email,
                tmp: Math.random(),
                uid: $.uid('_UID')
            });
            try {
                $.getJSON('http://test.open.yohobuy.com' + '/?callback=?', params, function(data) {
                    if (data.data.result === 1) {
                        $subscriberBox.val('已订阅到:' + email);
                        $subscriberBtn.addClass('done').html(iconCode.tick);
                    } else {
                        $subscriberBox.css('color', 'red');
                    }
                });
            } catch (e) {
                console.log(e.message);
            }
        } else {
            $subscriberBox.css('color', 'red');
        }
    });
}

function actionhomeFootChange() {
    var $vote = $('.vote'),
        $feedBackPage = $('#feed-back-page'),
        count = $vote.children('li').length;

    //意见反馈
    $feedBackPage.on('click', 'span', function() {
        var $this = $(this);

        if ($this.hasClass('cur')) {
            return;
        }

        $this.siblings('.cur').removeClass('cur');
        $this.addClass('cur');

        $vote.children().not('.hide').addClass('hide')
            .end()
            .eq($this.index()).removeClass('hide');
    });

    $vote.on('click', '.feed-back-btn', function() {
        var $this = $(this),
            $li = $this.closest('li'),
            index = $li.index(),
            params = {},
            _solution = [];

        var _answer = $li.find('.feedback-answer').val(),
            _feedback = $li.find('.feedback-id').val(),
            _question = $li.find('.question-id').val();

        $li.find(':checked').each(function() {
            _solution.push($(this).val());
        });

        params = {
            method: 'open.feedback.submit',
            feedback: _feedback || 0,
            question: _question || 0,
            answer: _answer || '',
            solution: _solution.join(',')
        };

        $.getData(apiDomain, params, function(data) {
            var next = index + 1;

            if (data.result === 1) {
                if (index === count - 1) {
                    alert('感谢您的参与！');
                    return;
                }

                $li.addClass('hide');

                $vote.eq(index + 1).removeClass('hide');
                $feedBackPage.children('.cur').removeClass('cur');
                $feedBackPage.eq(next).addClass('cur');
            }
        });
    });
}

//初始化
actionSubscription();
actionhomeFootChange();

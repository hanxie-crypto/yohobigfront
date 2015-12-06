/**
 * 首页控制器
 * @author: liuyue(yue.liu@yoho.cn)
 * @date: 2015/7/13
 */
var data = require('../../public/js/data/index'),
	layoutPath = '../layouts/layout';
var proxy = require('../../util/proxy');
var eventproxy = require('eventproxy');
var nock = require('nock');
var superagent = require('superagent');
// 首页 bigpipe实现
exports.index = function(req, res, next) {
	console.time('bigpipe&协同数据测试');
	res.setHeader('content-type', 'text/html; charset=utf-8');
	res.render('pages/index', {
		title: '首页',
		layout: layoutPath
	}, function(err, str) {
		if (err) {
			next(err);
		}
		res.write(str);
	});
	var ep = eventproxy.create('user', 'order', function(user, order) {
		console.timeEnd('bigpipe&协同数据测试');
		res.end();
	});
	ep.fail(function(err) {
		next(err);
	});
	//获取用户
	proxy.get('/user', null, function(err, responsedata) {
		console.log(responsedata,'用户数据');
		if (err) ep.throw(err);
		res.render('partials/user', {
			user: responsedata.data
		}, function(err, str1) {
			if (err) ep.throw(err);
			var temp = encodeURIComponent(str1);
			var final1 = '<script>if(!$("#loading").hasClass("hide")){$("#loading").addClass("hide")};$("#user_partial").html(decodeURIComponent("' + temp + '"))</script>';
			res.write(final1);
			console.timeEnd('bigpipe&协同数据测试');
			ep.emit('user', responsedata.data);
		});
	});
	//获取订单
	proxy.get('/orderlist', null, function(err, responsedata) {
		if (err) ep.throw(err);
		console.log(responsedata,'订单数据');
		res.render('partials/order', {
			order: responsedata.data
		}, function(err, str2) {
			if (err) ep.throw(err);
			var temp = encodeURIComponent(str2);
			var final2 = '<script>if(!$("#loading").hasClass("hide")){$("#loading").addClass("hide")};$("#order_partial").html(decodeURIComponent("' + temp + '"))</script>';
			res.write(final2);
			console.timeEnd('bigpipe&协同数据测试');
			ep.emit('order', responsedata.data);
		});
	});
};
exports.orders = function(req, res, next) {
	console.time('混合查询测试');
	var ep = eventproxy.create();
	proxy.get('/user', null, ep.doneLater('findorder')); //查询所有的用户
	ep.once('findorder', function(responsedata) { //根据用户查询该用户的订单
		if (responsedata) {
			var users = responsedata.data;
			ep.after('order', users.length, function(list) { //根据每一个用户查询他们的编号
				console.timeEnd('混合查询测试');
				res.render('pages/userorder', {
					title: '用户和订单',
					list: list,
					layout: layoutPath
				});
			});
			users.forEach(function(user) {
					proxy.post('/orderdetail', {
						userid: user.id
					}, ep.group('order', function(responsedata) {
						var obj = {
							user: user,
							userorder: responsedata.data
						}
						return obj;
					}));
				})
				/**
				 * 无序的写法
				users.forEach(function(user) {
					proxy.post('/orderdetail', {
						userid: user.id
					}, function(err, responsedata) {
						if (err) ep.throw(err);
						var obj = {
							user: user,
							userorder: responsedata.data
						}
						ep.emit('order', obj);
					});
				})
				**/
		}
	})
}
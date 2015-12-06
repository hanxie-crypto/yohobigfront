/**
 * 查询对商户的评价
 * @type {[type]}
 */
var mysql = require('../../db/mysql');
var message = require('../../config/message');
var sqlconfig = require('../../config/sql');
var wap_fruitcar = sqlconfig.wap_fruitcar;
var mobile_biz_option = sqlconfig.mobile_biz_option;
var totalrow = sqlconfig.GET_DADA_TOTALS;
/**
 * 查询用户
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
exports.selectreviewbybizid = function(params, callback, next) {
	var sqlexe = mobile_biz_option.selectreview+ ';'+mobile_biz_option.selectreviewavg;
	mysql.query(sqlexe, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			err.message = '查询失败';
			next(err);
		} else {
			var rep = {};
			rep.status = true;
			rep.datas = data[0];
			rep.message = 'success';
			rep.average = data[1][0].average;
			callback(rep);
		}
	})
}
exports.selectturnover = function(params, callback, next) {
	var sqlexe = mobile_biz_option.selectstatic;
	mysql.query(sqlexe, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			err.message = '查询失败';
			next(err);
		} else {
			var rep = {};
			rep.status = true;
			rep.datas = data;
			rep.message = 'success';
			callback(rep);
		}
	})
}
exports.selectorderinfo = function(params, callback, next) {
	var sqlexe = mobile_biz_option.selectorderbybizid+';'+totalrow;
	mysql.query(sqlexe, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			err.message = '查询失败';
			next(err);
		} else {
			var rep = {};
			rep.status = true;
			rep.datas = data[0];
			rep.total = data[1][0].total;
			rep.message = 'success';
			callback(rep);
		}
	})
}

exports.selectorderinfobypubid = function(params, callback, next) {
	var sqlexe = mobile_biz_option.selectorderbypubid+';'+totalrow;
	mysql.query(sqlexe, params, function(data, err) {
		if (err) {
			console.log(err);
			err.async = true; //是否异步发送
			err.message = '查询失败';
			next(err);
		} else {
			var rep = {};
			rep.status = true;
			rep.datas = data[0];
			rep.total = data[1][0].total;
			rep.message = 'success';
			callback(rep);
		}
	})
}
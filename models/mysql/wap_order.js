var mysql = require('../../db/mysql');
var message = require('../../config/message');
var sqlconfig = require('../../config/sql');
var wap_commonorder = sqlconfig.wap_commonorder;
var mobile_biz_pubproduct = sqlconfig.mobile_biz_pubproduct;
var totalrow = sqlconfig.GET_DADA_TOTALS;


exports.createorder = function(params, callback, next) {
	mysql.query(wap_commonorder.insert, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			rep.message = 'createordersuccess';
			rep.status = true;
			rep.datas = {
				id: data.insertId
			};
			callback(rep);
		}
	})
}
exports.updateorder = function(params, callback, next) { 
	console.log(params,'参数');
	var sqlexe = wap_commonorder.update+';'+mobile_biz_pubproduct.updatebyid;
	mysql.queryTransactionInsertAndUpd(sqlexe, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			console.log(data);
			rep.message = 'updateordersuccess';
			rep.status = true;
			rep.datas = {
				id: data.updateId
			};
			callback(rep);
		}
	})
}
/**
 * 根据用户交易号查询订单
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
exports.findorderbytradeno = function(params, callback, next) {
	mysql.query(wap_commonorder.selectbyno, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			rep.message = 'findordersuccess';
			rep.status = true;
			rep.datas = data;
			callback(rep);
		}
	})
}
/**
 * 根据订单号查询订单
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
exports.findorderbyid = function(params, callback, next) {
	mysql.query(wap_commonorder.selectbyid, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			rep.message = 'findordersuccess';
			rep.status = true;
			rep.datas = data;
			callback(rep);
		}
	})
}
exports.updateorderstate = function(params, callback, next) { 
	var sqlexe = wap_commonorder.updatefinal;
	console.log(params);
	mysql.query(sqlexe, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			console.log(data);
			rep.message = 'updateordersuccess';
			rep.status = true;
			rep.datas = {
				id: data.updateId
			};
			callback(rep);
		}
	})
}
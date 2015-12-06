var mysql = require('../../db/mysql');
var message = require('../../config/message');
var sqlconfig = require('../../config/sql');
var wap_userreceive = sqlconfig.wap_userreceive;
var totalrow = sqlconfig.GET_DADA_TOTALS;

exports.saveuserreceive = function(params, callback, next) {
	mysql.query(wap_userreceive.insert, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			rep.message = message.ADDRECEIVEINFO_SUCCESS;
			rep.status = true;
			rep.datas = params;
			callback(rep);
		}
	})
}

exports.finduserreceive = function(params, callback, next) {
	mysql.query(wap_userreceive.select, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			rep.message = '';
			rep.status = true;
			rep.datas = data[0] || {};
			callback(rep);
		}
	})
}
exports.updateuserreceive = function(params, callback, next) {
	mysql.query(wap_userreceive.update_nameandphone, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			rep.message = '';
			rep.status = true;
			rep.datas = params;
			callback(rep);
		}
	})
}
exports.updateaddruserreceive = function(params, callback, next) {
	mysql.query(wap_userreceive.update_receiveaddr, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			rep.message = '';
			rep.status = true;
			rep.datas = params;
			callback(rep);
		}
	})
}
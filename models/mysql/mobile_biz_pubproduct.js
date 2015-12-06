var mysql = require('../../db/mysql');
var message = require('../../config/message');
var sqlconfig = require('../../config/sql');
var mobile_biz_pubproduct = sqlconfig.mobile_biz_pubproduct;
var totalrow = sqlconfig.GET_DADA_TOTALS;
/**
 * 发布水果班车
 * @param  {[type]}   params   [传入的参数]
 * @param  {Function} callback [响应回调]
 * @param  {Function} next     [错误链]
 * @return {[type]}            [无返回]
 */
exports.addpubproduct = function(params, callback, next) {
		mysql.query(mobile_biz_pubproduct.insert, params, function(data, err) {
			if (err) {
				err.async = true; //是否异步发送
				next(err);
			} else {
				var rep = {};
				rep.message = message.PUBINFO_SUCCESS;
				rep.status = true;
				rep.datas = {
					id: data.insertId,
					fruitpicurl: params.fruitpicurl
				};
				callback(rep);
			}
		})
	}
	/**
	 * 查询水果班车
	 * @param  {[type]}   params   [传入的参数]
	 * @param  {Function} callback [响应回调]
	 * @param  {Function} next     [错误链]
	 * @return {[type]}            [无返回]
	 */
exports.findproductinfo = function(params, callback, next) {
	mysql.query(mobile_biz_pubproduct.select + ';' + totalrow, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			rep.message = message.FINDPUBINFO_SUCCESS;
			rep.status = true;
			rep.datas = data[0];
			rep.total = data[1][0].total;
			callback(rep);
		}
	})
}
exports.findproductinfobyid = function(params, callback, next) {
	mysql.query(mobile_biz_pubproduct.selectbyid, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			rep.message = message.FINDPUBINFO_SUCCESS;
			rep.status = true;
			rep.datas = data[0] || {};
			callback(rep);
		}
	})
}
/**
 * 用户评论
 * @type {[type]}
 */
var mysql = require('../../db/mysql');
var message = require('../../config/message');
var sqlconfig = require('../../config/sql');
var wap_userreview = sqlconfig.wap_userreview;
var wap_order = sqlconfig.wap_commonorder;
var totalrow = sqlconfig.GET_DADA_TOTALS;
/**
 * 保存用户评论
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
exports.saveuserreview = function(params, callback, next) {
	var sqlexe = wap_userreview.insert+';'+wap_order.updatefinal;
	mysql.queryTransactionInsertAndUpd(sqlexe, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			console.log(data);
			var rep = {};
			rep.message = message.ADDREVIEWINFO_SUCCESS;
			rep.status = true;
			rep.datas = data;
			callback(rep);
		}
	})
}

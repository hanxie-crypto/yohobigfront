var mysql = require('../../db/mysql');
var message = require('../../config/message');
var sqlconfig = require('../../config/sql');
var wap_myorder = sqlconfig.wap_myorder;
var totalrow = sqlconfig.GET_DADA_TOTALS;

/**
 * 根据openid 查询用户的订单
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
exports.findmyorders = function(params, callback, next) {
	mysql.query(wap_myorder.selectbyopenid + ';' + totalrow, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			rep.message = message.FINDSEATS_SUCCESS;
			rep.status = true;
			rep.datas = data[0];
			rep.total = data[1][0].total;
			callback(rep);
		}
	})
}
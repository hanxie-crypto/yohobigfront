/**
 * 水果种类持久层
 * @type {[type]}
 */
var mysql = require('../../db/mysql');
var message = require('../../config/message');
var mobile_fruitcat = require('../../config/sql').mobile_fruitcat;
/**
 * 查询水果种类
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
exports.findfruitcat = function(params, callback, next) {
	mysql.query(mobile_fruitcat.select, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			rep.message = message.FRUITCAT_SUCCESS;
			rep.status = true;
			rep.datas = data;
			callback(rep);
		}
	})
}
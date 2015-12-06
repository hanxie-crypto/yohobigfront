/**
 * 微信用户信息
 * @type {[type]}
 */
var mysql = require('../../db/mysql');
var message = require('../../config/message');
var user_wechat_info = require('../../config/sql').user_wechat_info;
/**
 * 新增用户信息
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
exports.saveuserwechatinfo = function(params, callback, next) {
	mysql.query(user_wechat_info.insert, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			rep.message = '';
			rep.status = true;
			rep.datas = data;
			callback(rep);
		}
	})
}
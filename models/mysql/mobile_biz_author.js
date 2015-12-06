/**
 * 用户实体
 * @type {[type]}
 */
var mysql = require('../../db/mysql');
var message = require('../../config/message');
var mobile_user = require('../../config/sql').mobile_user;
/**
 * 查询用户
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
exports.selectuserbyaccount = function(params, callback, next) {
	mysql.query(mobile_user.selectbyaccount, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			err.message = message.LOGIN_FAIL;
			next(err);
		} else {
			var rep = {};
			rep.status = true;
			rep.user = data[0]||null;
			callback(rep);
		}
	})
}
var mysql = require('../../db/mysql');
var message = require('../../config/message');
var sqlconfig = require('../../config/sql');
var wap_fruitcar_time = sqlconfig.wap_fruitcar_time;
var wap_fruitcar_area = sqlconfig.wap_fruitcar_area;
var wap_user_feedback = sqlconfig.wap_userfeedback;
var totalrow = sqlconfig.GET_DADA_TOTALS;
/**
 * 查询水果班车时间
 * @param  {[type]}   params   [传入的参数]
 * @param  {Function} callback [响应回调]
 * @param  {Function} next     [错误链]
 * @return {[type]}            [无返回]
 */
exports.findfruitcartime = function(params, callback, next) {
		mysql.query(wap_fruitcar_time.select + ';' + totalrow, params, function(data, err) {
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
	/**
	 * 查询水果班车配送区
	 * @param  {[type]}   params   [description]
	 * @param  {Function} callback [description]
	 * @param  {Function} next     [description]
	 * @return {[type]}            [description]
	 */
exports.findfruitcararea = function(params, callback, next) {
		mysql.query(wap_fruitcar_area.select + ';' + totalrow, params, function(data, err) {
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
		});
	}
	/**
	 * 增加反馈
	 * @param  {[type]}   params   [description]
	 * @param  {Function} callback [description]
	 * @param  {Function} next     [description]
	 * @return {[type]}            [description]
	 */
exports.adduserfeedback = function(params, callback, next) {
	mysql.query(wap_user_feedback.insert, params, function(data, err) {
		if (err) {
			rep.message = message.ADDFEEDBACK_FAIL;
			err.async = true; //是否异步发送
			next(err);
		} else {
			var rep = {};
			rep.message = message.ADDFEEDBACK_SUCCESS;
			rep.status = true;
			rep.datas = data;
			callback(rep);
		}
	});
}
var mysql = require('../../db/mysql');
var message = require('../../config/message');
var sqlconfig = require('../../config/sql');
var wap_fruitcar = sqlconfig.wap_fruitcar;
var wap_haveaseat = sqlconfig.wap_haveaseat;
var totalrow = sqlconfig.GET_DADA_TOTALS;
/**
 * 查询水果班车
 * @param  {[type]}   params   [传入的参数]
 * @param  {Function} callback [响应回调]
 * @param  {Function} next     [错误链]
 * @return {[type]}            [无返回]
 */
exports.findproductinfo = function(params, callback, next) {
		mysql.query(wap_fruitcar.select + ';' + totalrow, params, function(data, err) {
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
 * 查询水果详情
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
exports.findfruitcardetail = function(params, callback, next) {
		mysql.query(wap_fruitcar.selectbyid, params, function(data, err) {
			if (err) {
				err.async = true; //是否异步发送
				next(err);
			} else {
				var rep = {};
				rep.message = message.FINDPUBINFO_SUCCESS;
				rep.status = true;
				rep.datas = data[0];
				callback(rep);
			}
		})
	}
/**
 * 占位
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
exports.haveaseat = function(params, callback, next) {
	/**
	var sqlexe = wap_haveaseat.insert + ';' + wap_haveaseat.updbmp;
	mysql.queryTransactionInsertAndUpd(sqlexe, params, function(data, err) {
		if (err) {
			console.log(err);
			err.async = true; //是否异步发送
			err.message = message.ALREADYHAVESEAT;
			next(err);
		} else {
			var rep = {};
			rep.message = message.HAVEASEAT_SUCCESS;
			rep.status = true;
			rep.datas = data;
			callback(rep);
		}
	});
	**/
	var sqlexe = wap_haveaseat.insert;
	mysql.query(sqlexe, params, function(data, err) {
		if (err) {
			console.log(err);
			err.async = true; //是否异步发送
			err.message = message.ALREADYHAVESEAT;
			next(err);
		} else {
			var rep = {};
			rep.message = message.HAVEASEAT_SUCCESS;
			rep.status = true;
			rep.datas = data;
			callback(rep);
		}
	});
}
/**
 * 根据openid 查询用户的占位
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
exports.findseats = function(params, callback, next) {
	mysql.query(wap_haveaseat.selectbyopenid + ';' + totalrow, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			err.message = '';
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
/**
删除占位
**/
exports.deletecarseat = function(params, callback, next) {
	mysql.query(wap_haveaseat.deletecarseatbyid, params, function(data, err) {
		if (err) {
			err.async = true; //是否异步发送
			err.message = '';
			next(err);
		} else {
			var rep = {};
			rep.message = 'deletecarseatsuccess';
			rep.status = true;
			rep.datas = data;
			callback(rep);
		}
	})
}
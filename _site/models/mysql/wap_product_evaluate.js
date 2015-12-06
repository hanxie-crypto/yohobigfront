/**
 * 查询对商品的评价
 * @type {[type]}
 */
var mysql = require('../../db/mysql');
var message = require('../../config/message');
var sqlconfig = require('../../config/sql');
var wap_product_evaluation = sqlconfig.wap_product_evaluation;
var totalrow = sqlconfig.GET_DADA_TOTALS;
/**
 * 查询评论
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
exports.selectuserevaluate = function(params, callback, next) {
	var sqlexe = wap_product_evaluation.selectevaluation+ ';'+totalrow;
	mysql.query(sqlexe, params, function(data, err) {
		if (err) {
			console.log(err);
			err.async = true; //是否异步发送
			err.message = '查询失败';
			next(err);
		} else {
			var rep = {};
			rep.status = true;
			rep.datas = data[0];
			rep.total = data[1][0].total;
			callback(rep);
		}
	})
}
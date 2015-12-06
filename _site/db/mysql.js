/**
 * mysql 连接工具
 * @type {[type]}
 */
var mysql = require('mysql');
var config = require('../config/global_config');
var _ = require('lodash');
var pool = mysql.createPool(_.extend(
	config.mysql, {
		typeCast: function(field, next) {
			if (field.type == 'FLOAT') {
				return (field.string());
			}
			return next();
		},
		queryFormat: function(query, values) {
			if (!values) return query;
			return query.replace(/\:(\w+)/g, function(txt, key) {
				if (values.hasOwnProperty(key)) {
					if (key == 'ordercondation' || key == 'order') {
						return escape(values[key]);
					} else {
						return this.escape(values[key]);
					}
				}
				return txt;
			}.bind(this));
		}
	}));
/**
 * mysql 执行函数
 * @param  {[type]}   sql      [语句]
 * @param  {[type]}   params   [参数]
 * @param  {Function} callback [回调]
 * @return {[type]}            [无返回]
 */
exports.query = function(sql, params, callback) {
	pool.getConnection(function(err, connection) {
		if (err) {
			connection.release();
			callback(null, new Error(err));
		} else {
			connection.query(sql, params,
				function(err, rows) {
					if (err) {
						connection.release();
						callback(null, new Error(err));
					} else {
						connection.release();
						callback(rows, null);
					}
				});
		}
	});
}
/**
 * 事务处理，包含两层查询分别是新增和修改
 * @param  {[type]}   sql      [description]
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.queryTransactionInsertAndUpd = function(sql, params, callback) {
	pool.getConnection(function(err, connection) {
		if (err) {
			connection.release();
			callback(null, new Error(err));
		} else {
			var sqlArray = sql.split(';');
			connection.beginTransaction(function(err) {
				if (err) {
					connection.release();
					callback(null, new Error(err))
				}
				connection.query(sqlArray[0], params, function(err, result1) {
					if (err) {
						return connection.rollback(function() {
							callback(null, new Error(err))
						});
					}
					var log = 'Post ' + result1.affectedRows + ' added';
					console.log(log)
					connection.query(sqlArray[1], params, function(err, result2) {
						if (err) {
							return connection.rollback(function() {
								connection.release();
								callback(null, new Error(err))
							});
						}
						connection.commit(function(err) {
							if (err) {
								return connection.rollback(function() {
									connection.release();
									callback(null, new Error(err))
								});
							}
							connection.release();
							callback(result2, null);
						});
					});
				});
			});
		}
	});
}
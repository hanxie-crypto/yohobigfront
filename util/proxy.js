var superagent = require('superagent');
/**
 * post请求
 * @param  {[type]}   url      [description]
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.post = function(url,params,callback) {
	superagent.post(url)
		.timeout(10000)
		//.set('Content-Type', 'application/json')
		.set('Content-Type','application/x-www-form-urlencoded')
		.send(params)
		.end(function(err, response) {
			if (err) {
				callback(err, null);
			} else {
				callback(null, JSON.parse(response.text));
			}
		});
}
/**
 * get 请求
 * @param  {[type]}   url      [description]
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.get = function(url, params, callback) {
	var superthis = superagent.get(url)
		.timeout(10000)
		.set('Content-Type', 'application/json');
	if (params) {
		superthis.query(params);
	}
	superthis
		.end(function(err, response) {
			if (err) {
				callback(err, null);
			} else {
				callback(null, JSON.parse(response.text));
			}
		});
}
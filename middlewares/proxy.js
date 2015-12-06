/**
 * 接口代理
 * @param  Request
 * @param  Response
 * @param  next
 * @return void
 */
var request = require('request');
var config = require('../config/global_config');
module.exports = function(req, res, next) {
	var reg = /\.(gif|jpg|jpeg|png|bmp|swf|JPG|js|css|html)/;
	if (!reg.test(req.path) && req.path != '/') {
		console.log(req.body);
		if (req.method === 'POST') {
			request.post({
				url: config.proxyserver + req.path,
				form: req.body
			}, function(err, response, body) {
				if (response && response.statusCode == 200) {
					res.proxyData = JSON.parse(body);
					next();
				} else {
					if (response) {
						next(new Error('error: ' + response.statusCode));
					} else {
						next(new Error('api server error!'));
					}
				}
			})
		}
	} else {
		next();
	}
}
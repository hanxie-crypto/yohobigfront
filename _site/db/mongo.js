/**
 * mongo 连接工具
 * @type {[type]}
 */
var mongoose = require('mongoose');
var config  =require('../config/global_config');
exports.connect=function(){
  mongoose.connect(config.mongo.db, function (err) {
  if (err) {
       console.error('connect to %s error: ', config.db, err.message);
       process.exit(1);
      }
	});
}

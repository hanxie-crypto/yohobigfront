var utility = require('utility');
var path = require('path');
var fs = require('fs');
var eventproxy = require('eventproxy');
var config = require('../config/global_config');
var Q = require('q');
var deferred = Q.defer();
exports.fileupload = function(req, res, next) {
  var namespace = req.path;
  var ep = new eventproxy();
  req.pipe(req.busboy);
  req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
    if (fieldname === 'jsondata') {
      var jsondata = decodeURIComponent(val);
      ep.emit('jsondata', jsondata);
    }
  });
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    uploadf(file, {
      filename: filename,
      foldername: namespace
    }, function(err, result) {
      if (err) {
        return next(err);
      }
      ep.emit('url', {
        url: result.url
      });
    });
  });
  ep.all('jsondata', 'url', function(jsondata, _url) {
    var filedata = {};
    filedata.jsondata = jsondata;
    filedata.url = url;
    res.filedata = filedata;
    next();
  });
}
var uploadf = function(file, options, callback) {
  var filename = options.filename,
    foldername = options.foldername;
  var newFilename = utility.md5(filename + String((new Date()).getTime())) +
    path.extname(filename);
  var upload_path = config.basepicpath + foldername;
  var base_url = foldername + '/';
  var filePath = path.join(upload_path, newFilename);
  var fileUrl = base_url + newFilename;
  file.on('end', function() {
    callback(null, {
      url: fileUrl
    });
  });
  file.pipe(fs.createWriteStream(filePath)); //文件流写入路径
};
/**
 * [将传入的base64转化为图片]
 * @param  {[type]} imgData    [传入的base64]
 * @param  {[type]} options [文件参数]
 * @return {[type]}            [description]
 */
exports.base64ToFile = function(req, res, next) {
    var imgData = req.body.imgData;
    var subindex=req.path.lastIndexOf('/');
    var  foldername = req.path.substring(1,subindex);
    var upload_path = config.basepicpath + foldername;
    var newFilename = utility.md5(String((new Date()).getTime())) + '.png';
    var filePath = path.join(upload_path, newFilename);
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile(filePath, dataBuffer, function(err) {
      if (err) {
        err.send=true;
        next(err);
      } else {
        res.picurl = foldername+'/'+newFilename;
        next();
      }
    });
  }
  /**
   * 为base64生成文件参数
   * @param  {[type]} foldername [要保存的文件夹]
   * @return {[type]}            [文件参数]
   */
exports.createBase64FileName = function(foldername) {
  var upload_path = config.basepicpath + foldername;
  var newFilename = utility.md5(String((new Date()).getTime())) + '.png';
  var filePath = path.join(upload_path, newFilename);
  return {
    writefilename: filePath,
    filename: foldername + '/' + newFilename
  };
}
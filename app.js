/**
 * 启动项
 * @type {[type]}
 */
var express = require('express');

var config = require('./config/global_config');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var hbs = require('hbs');
var hbshelper = require('./hbshelper');
var fs = require('fs');
//var mongo = require('./db/mongo');
var web_routers = require('./routes/web/web_routes');

var session = require('express-session');
var superagent = require('superagent');
var cache = require('./util/cache');
var RedisStore = require('connect-redis')(session);
var md5 = require('MD5');
var app = express();



var yohoproxy = require('./yohoproxy');
yohoproxy.init({mock:true});//初始化代理


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
hbs.registerHelper("test", hbshelper['test']); //测试helper
hbs.registerPartials(__dirname + '/views/partials');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {
  flags: 'a'
});
var errorLogStream = fs.createWriteStream(__dirname + '/error.log', {
  flags: 'a'
})
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  secret: config.session_secret,
  store: new RedisStore({
    port: config.redis_port,
    host: config.redis_host
  }),
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('tiny', {
  stream: accessLogStream
}))
app.use(busboy({
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
}));
app.use("/", web_routers);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('nopage', {
    message: '您访问的页面不存在',
    error: {}
  });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    var meta = '[' + new Date() + '] ' + req.url + '\n';
    res.status(err.status || 500);
    if (err.async) {
      console.log(err);
      res.send({
        message: err.message
      });
      return;
    }
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  var meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLogStream.write(meta + err + '\n');
  res.status(err.status || 500);
  if (err.async) {
    res.send({
      message: err.message
    });
    return;
  }
  res.render('error', {
    message: err,
    error: {}
  });
});
if (!module.parent) {
  app.listen(8888);
  console.log("server start at 8888")
}

module.exports = app;
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
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nock = require('nock');
var mockservers = require('./mockserver/mockservers');

mockservers.init(); //初始化mock服务
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
    message: err.message,
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
    message: err.message,
    error: {}
  });
});
//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;

io.on('connection', function(socket) {
  console.log('a user connected');

  //监听新用户加入
  socket.on('login', function(obj) {
    //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
    socket.name = obj.userid;

    //检查在线列表，如果不在里面就加入
    if (!onlineUsers.hasOwnProperty(obj.userid)) {
      onlineUsers[obj.userid] = obj.username;
      //在线人数+1
      onlineCount++;
    }

    //向所有客户端广播用户加入
    io.emit('login', {
      onlineUsers: onlineUsers,
      onlineCount: onlineCount,
      user: obj
    });
    console.log(obj.username + '加入了聊天室');
  });

  //监听用户退出
  socket.on('disconnect', function() {
    //将退出的用户从在线列表中删除
    if (onlineUsers.hasOwnProperty(socket.name)) {
      //退出用户的信息
      var obj = {
        userid: socket.name,
        username: onlineUsers[socket.name]
      };

      //删除
      delete onlineUsers[socket.name];
      //在线人数-1
      onlineCount--;

      //向所有客户端广播用户退出
      io.emit('logout', {
        onlineUsers: onlineUsers,
        onlineCount: onlineCount,
        user: obj
      });
      console.log(obj.username + '退出了聊天室');
    }
  });

  //监听用户发布聊天内容
  socket.on('message', function(obj) {
    //向所有客户端广播发布的消息
    io.emit('message', obj);
    console.log(obj.username + '说：' + obj.content);
  });

});

if (!module.parent) {
  http.listen(8888);
  console.log("server start at 8888")
}

module.exports = app;
var express = require('express')
  , RedisStore = require('connect-redis')(express)
  , connect = require('connect')
  , app = express.createServer()
  , jade = require('jade') 
  , routes = require('./routes')
  , socket = require('./controllers/socket-controller');
  
  redis = require('redis')


  io = require('socket.io').listen(app);
  socket.start();


// Configuration
app.configure(function(){
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyboard cat", store: new RedisStore, cookie: { maxAge: 60000 } }));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


rc = redis.createClient();

app.configure('development', function(){
  app.use(express.logger());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.get('/', routes.index);
app.listen(4000);

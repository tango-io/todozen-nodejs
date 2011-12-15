var express = require('express')
  , app = express.createServer()
  , jade = require('jade') 
  , routes = require('./routes')
  , io = require('socket.io').listen(app);

var users = [];

io.sockets.on('connection', function (socket) {
  console.log('Someone just connected!');
    socket.on('set nickname', function (nickname, callback) {
        if (users.indexOf(nickname) !== -1) {
            return callback(false);
        }

        socket.nickname = nickname;

        users.push(nickname);
        socket.broadcast.emit('user join', nickname);
        socket.emit('users', users);
        console.log('Wellcome: '+ nickname + ' !');
        callback(true);
    });
  
    socket.on('message', function (msg) {
        socket.broadcast.emit('user message', socket.nickname, msg);
    });
  
    socket.on('disconnect', function () {
        var nickname = socket.nickname;
        if (nickname) {
            socket.broadcast.emit('user part', nickname);
            users.splice(users.indexOf(nickname), 1);
            console.log('Good bye: '+ nickname + ' !');
        }
    });
});



// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});
//


app.get('/', routes.index);
app.listen(3000);

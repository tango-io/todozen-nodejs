exports.start = function(){
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
  
    socket.on('add todo', function(item){
      n_item = new models.Item();

      n_item.set({
      id_todo: item['id_todo'],
      title: item['title'],
      column: item['column'],
      color: item['color']
      });

      console.log(n_item);
      n_item.save();
      
      //models.collection.add(n_item);
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
}

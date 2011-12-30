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
  
    socket.on('add item', function(index,item){
      console.log(index);
      rc.set('index',JSON.stringify(index),redis.print); 
      rc.set(item['id_todo'],JSON.stringify(item),redis.print); 
      io.sockets.emit('get_message',JSON.stringify(item));
    });

    socket.on('set',function(id,item){
    rc.set(id,JSON.stringify(item),redis.print);
    });

    socket.on('del',function(id,item,i){
    rc.del(id,redis.print);
    io.sockets.emit('del_message',item,i);
    });

    socket.on('mod title',function(r,title,color){
    io.sockets.emit('mod_t',r,title,color);
    });
    
    socket.on('search', function (id, callback) {
      rc.get(id,function(err,value){
        return callback(value);
      })      
    });
    
    socket.on('index', function(callback){
      rc.get('index',function(err,value){
        return callback(value);
      })
    });

    socket.on('get', function(callback){

      function index(data){
        rc.get('index',function(err,value){
          return data(value);
        });
      }

      function item(id,data){
        rc.get(id,function(err,value){
          return data(value);
        });
      }


      index(function(data){

        if(data){
          id = JSON.parse(data);
          all = [];
          for(i=0;i<=id.length-1;i++){
            function send(call){
              item(id[i],function(item){
                all.push(item);
                return call(all);
              });
            }
            send(function(i){
              if(i.length == id.length)
                return callback(i);
            });
          }
        }

      });

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

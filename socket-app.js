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
      rc.set('index',index,redis.print); 
      rc.set(item['id_todo'],JSON.stringify(item),redis.print); 
    });

    socket.on('get', function(callback){

      function index(data){
      rc.get('index',function(err,value){
        return data(value);
      });
      }

      function values(values){
        index(function(data){
          index = JSON.parse(data);
          function everithing(finaly){
            if(index){
              function element(elements){
                all_data = [];
                for(i=0; i<=index.length-1;i++){
                  function get_val(val){
                    rc.get(index[i],function(err,value){
                      return val(value);
                    })
                  }
                  function get_all(all_d){
                    get_val(function(value){
                      all_data.push(value);
                      return all_d(all_data);
                    });
                  }
                  get_all(function(){
                    return elements(all_data);
                  });
                }
              }
              function a (res){
                function b(resp){
                  element(function(elements){
                    return resp(elements);
                  });
                }
                b(function(resp){
                  return res(resp);
                })
              }
              a(function(total){
                return finaly(all_data);
              });
            }
          }
          everithing(function(finaly){
            return values(finaly);
          });

        });
      }

      function get(all_data){

        function redis(red){
          values(function(all){
            data = [];
            data.push(all);
            return red(all);
          });
        }


        function collect(c){
          redis(function(call){
            return c(call);
          });
        }

        collect(function(data){
          return all_data(data);
        });

      }

      get(function(data){
        if(data.length == index.length)
        return callback(data);
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

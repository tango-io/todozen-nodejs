(function($){
  Backbone.sync = function(method, model, success, error){ 
    success();
  };

  COLUMNS = ["inbox", "working", "complete"];
  COLORS = ["red", "blue", "green", "yellow"];
  TAG = {
      "columns":"#",
      "colors":"!"
  }



  var socket = io.connect();
  socket.on('connect', function () {
    
    console.log('we are connected');
    
    var name = prompt('ehat is your name?');

    this.emit('set nickname', name, function (success){
             console.log('The server got the message!');
             if(!success){
               console.log('Nickname in use!');
             }
    });
  });



  var column = COLUMNS.map(function(column){return TAG['columns']+column}).join("|");
  var color = COLORS.map(function(color){return TAG['colors']+color}).join("|");
  regColumn = new RegExp(column,"gi") 
  regColor = new RegExp(color,"gi") 

  listView = new ListView();
})(jQuery);

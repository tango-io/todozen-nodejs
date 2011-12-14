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


//$.getScript('/socket.io/socket.io.js');
  //var socket = io.connect('http://localhost');
  //socket.on('news', function (data) {
    //console.log(data);
    //socket.emit('my other event', { my: 'data' });
  //});

$.getScript('/socket.io/socket.io.js', function(){
    var socket = new io.Socket(null, {port: 3000, rememberTransport: false});
    socket.connect();
    socket.on('message', function(json) {
        $('#container').prepend("<li>" + json.foo + "</li>");
    });
});


  var column = COLUMNS.map(function(column){return TAG['columns']+column}).join("|");
  var color = COLORS.map(function(color){return TAG['colors']+color}).join("|");
  regColumn = new RegExp(column,"gi") 
  regColor = new RegExp(color,"gi") 

  listView = new ListView();
})(jQuery);

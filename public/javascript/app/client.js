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
    $('#toolbar .led').removeClass('off');
  });

  var User = Backbone.View.extend({
    el: $('body'), 
    events: { 
      'keypress input#username': 'register'
    },

    initialize: function(){
      _.bindAll(this, 'register');
    },

    register: function(){
      if (event.keyCode == 13 && username.value!=''){
        var name = username.value;
        socket.emit('set nickname', name, function (success){
          console.log('Wellcome: '+ name + "!");
        $('#username').remove();
        $('label').remove();                             //CAUTION
          if(!success){
            console.log('Nickname in use!');
          }
        });
      }
    }
  
  });

  var user = new User();

  var column = COLUMNS.map(function(column){return TAG['columns']+column}).join("|");
  var color = COLORS.map(function(color){return TAG['colors']+color}).join("|");
  regColumn = new RegExp(column,"gi") 
  regColor = new RegExp(color,"gi") 

  var listView = new ListView();

  socket.on('disconnect', function(){
   console.log('ofline');
   $('#toolbar .led').addClass('off');
  });

})(jQuery);

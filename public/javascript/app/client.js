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


  
//---------------------------------------------------------------------- !making lists
      for(i=0;i<=COLUMNS.length-1;i++){
      var width = Math.floor(($("#kanban").width() - 40) / COLUMNS.length - 30);
      $("#kanban").append("<div style='width:"+width+"px' class='column "+COLUMNS[i]+"'><h1>"+COLUMNS[i]+"</h1><ol id='"+COLUMNS[i]+"'></ol></div>");
      }
//---------------------------------------------------------------------- !end of making lists

//---------------------------------------------------------------------- !socket connected
  var socket = io.connect();
  socket.on('connect', function () {  
    console.log('we are connected');
    $('#toolbar .led').removeClass('off');
      $('#username').val('User name');
      $('#username').css('color', '#a1a1a1');
      $('#username').css('font-style', 'italic');
      $('#username').attr('disabled', false);
  });
//---------------------------------------------------------------------- end socket connect!  
  


//---------------------------------------------------------------------- !logg in socket  
  var User = Backbone.View.extend({
    el: $('body'), 
    events: { 
      'keypress input#username': 'register',
      'click input#username': 'change',
      'blur input#username': 'check'
    },

    initialize: function(){
      _.bindAll(this, 'register');
    },

    register: function(){
      if (event.keyCode == 13 && username.value!=''){
        var name = username.value;
        socket.emit('set nickname', name, function (success){
          console.log('Wellcome: '+ name + "!");
        $('#username').attr('disabled', true);
          if(!success){
            console.log('Nickname in use!');
          }
        });
      }
    },

    change: function(){
      if($('#username').val()=='User name'){
      $('#username').val('');
      $('#username').css('color', '#333');
      $('#username').css('font-style', 'normal');
      }
    },

    check: function(){
      if($('#username').val()==''){
      $('#username').val('User name');
      $('#username').css('color', '#a1a1a1');
      $('#username').css('font-style', 'italic');
      }
    }
  
  });

  var user = new User();
//---------------------------------------------------------------------- end logg in socket!  



//---------------------------------------------------------------------- !List element generator  
  var column = COLUMNS.map(function(column){return TAG['columns']+column}).join("|");
  var color = COLORS.map(function(color){return TAG['colors']+color}).join("|");
  regColumn = new RegExp(column,"gi") 
  regColor = new RegExp(color,"gi") 

  var listView = new ListView();
//---------------------------------------------------------------------- end list element generator!  

//---------------------------------------------------------------------- !socket disconnect  
  socket.on('disconnect', function(){
   console.log('ofline');
   $('#toolbar .led').addClass('off');
  });
//---------------------------------------------------------------------- end socket disconnect!  

})(jQuery);

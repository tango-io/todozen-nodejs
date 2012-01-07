(function($){
//---------------------------------------------------------------------- !INITIALIZER
  Backbone.sync = function(method, model, success, error){};

  COLUMNS = ["inbox", "working", "complete"];
  COLORS = ["red", "blue", "green", "yellow"];
  TAG = {
      "columns":"#",
      "colors":"!"
  }

  var column = COLUMNS.map(function(column){return TAG['columns']+column}).join("|");
  var color = COLORS.map(function(color){return TAG['colors']+color}).join("|");
  regColumn = new RegExp(column,"gi") 
  regColor = new RegExp(color,"gi") 

      for(i=0;i<=COLUMNS.length-1;i++){
      var width = Math.floor(($("#kanban").width() - 40) / COLUMNS.length - 30);
      $("#kanban").append("<div style='width:"+width+"px' class='column "+COLUMNS[i]+"'><h1>"+COLUMNS[i]+"<span class='total num"+COLUMNS[i]+"'>0</span></h1><ol id='"+COLUMNS[i]+"'></ol></div>");
      }
//---------------------------------------------------------------------- !end of INITIALIZER

//---------------------------------------------------------------------- !sockets
  socket = io.connect();
  socket.on('connect', function () {  
    console.log('we are connected');
    $('#toolbar .led').removeClass('off');
      $('#username').val('User name');
      $('#username').css('color', '#a1a1a1');
      $('#username').css('font-style', 'italic');
      $('#username').attr('disabled', false);
  });

  socket.on('disconnect', function(){
   console.log('ofline');
   $('#toolbar .led').addClass('off');
  });
  
//---------------------------------------------------------------------- end sockets  


//---------------------------------------------------------------------- !User conecction  
  var user = new User();
//---------------------------------------------------------------------- end User conection!  
  
//---------------------------------------------------------------------- !List element generator  
  var listView = new ListView();
//---------------------------------------------------------------------- end list element generator!  

})(jQuery);

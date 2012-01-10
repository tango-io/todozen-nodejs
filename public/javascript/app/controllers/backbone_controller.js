(function($){
//---------------------------------------------------------------------- !INITIALIZER
  Backbone.sync = function(method, model, success, error){};
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

  var addcolumn = new AddColumnView();

})(jQuery);

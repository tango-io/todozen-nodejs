(function($){
//---------------------------------------------------------------------- !INITIALIZER
  Backbone.sync = function(method, model, success, error){};
//---------------------------------------------------------------------- !end of INITIALIZER

//---------------------------------------------------------------------- !Detect conection
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
  
//---------------------------------------------------------------------- end conection!


//---------------------------------------------------------------------- !column generator  
  var addcolumn = new AddColumnView();
  var columnview = new ColumnView();
//---------------------------------------------------------------------- !end column generator

//---------------------------------------------------------------------- !User conecction  
  var user = new User();
//---------------------------------------------------------------------- end User conection!  

})(jQuery);

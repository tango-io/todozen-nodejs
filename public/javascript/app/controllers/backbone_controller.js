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

  ToDoZen.tool_bar     = new ToDoZen.Views.ToolBarView();
  ToDoZen.columns_area = new ToDoZen.Views.ColumnsAreaView();
})(jQuery);

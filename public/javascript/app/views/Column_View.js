var ColumnView = Backbone.View.extend({
  el: $('body'),
  tagNAme: 'ol',

  initialize: function(){
    this.collection = new Columns();
    this.render();
    socket.on('rem_col',function(column){
      $('#'+column).remove();
    });
  },
  
  render: function(){
  var viewcolumns = columns;
    socket.emit('get','column',function(columns){
      var col_obj = JSON.parse(columns);

      if(col_obj){

        _.each(col_obj,function(col){
          var box = new Box({
            name: col.name
          });
          viewcolumns.add(box);

        });}else{

          _.each(COLUMNS,function(name){
           var box = new Box({
             name: name
           });
           viewcolumns.add(box);
          })

        }

          socket.emit('add_column');
    });
  }
});

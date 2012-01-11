var ColumnView = Backbone.View.extend({
  el: $('body'),
  tagNAme: 'ol',

  initialize: function(){
    _.bindAll(this, 'remove'); 
    this.collection = new Columns();
    this.render();
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

    });
  }
});

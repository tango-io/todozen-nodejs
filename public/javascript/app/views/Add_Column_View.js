var AddColumnView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click #addColumn': 'addColumn'
  },

  initialize: function(){
    _.bindAll(this, 'addColumn');
    columns = new Columns();
    view = this;

    socket.on('add_col',function(){
      view.render(columns);
      socket.emit('set','column',columns);
    });
  },

  render: function(columns){
    if(typeof(listView)==='undefined'){
      listView = new ListView();
    }
    method.show(columns);
  },

  addColumn: function(){
    newCol = prompt('Enter new column');

    if(newCol){

      var column = new Box({
        name: newCol
      });

      columns.add(column);
      socket.emit('add_column');
    }

  }
});

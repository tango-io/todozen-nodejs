var AddColumnView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click #addColumn': 'addColumn'
  },

  initialize: function(){
    _.bindAll(this, 'addColumn');
    columns = new Columns();
    columns.bind('add', this.showBox); 
  },

  showBox: function(){
    $('#kanban').empty();
      var width = Math.floor(($("#kanban").width() - 40) / columns.length - 30);
      
    _.each(columns.models,function(column){
      var name = column.get('name');
      $("#kanban").append("<div style='width:"+width+"px' class='column "+name+"'><h1>"+name+"<span class='total num"+name+"'>0</span></h1><ol id='"+name+"'></ol></div>");
    });
      

    socket.emit('set','column',columns);
  },

  addColumn: function(){
    var newcolumn = prompt("Enter new column");

    if(newcolumn){
      var column = new Box({
        name: newcolumn
      });
      columns.add(column);
    }

  }
});

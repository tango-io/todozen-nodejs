var AddColumnView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click #addColumn': 'addColumn'
  },

  initialize: function(){
    _.bindAll(this, 'addColumn', 'showBox');
    columns = new Columns();
    show = this.showBox;

    socket.on('add_col',function(){
      show(columns); 
      socket.emit('set','column',columns);
    });

  },

  render: function(){

      _.each(collection.models,function(item){
        listView.appendItem(item); 
      });

  },

  showBox: function(columns){

    if(typeof(listView)==='undefined'){
      listView = new ListView();
    }

    $('#kanban').empty();
    var width = Math.floor(($("#kanban").width() - 40) / columns.length - 30);

    _.each(columns.models,function(column){
      var name = column.get('name');
      var col_name = column.get('name'); 
      var num = collection.models.filter(function(col){return col.attributes.column==col_name}).length;

      $("#kanban").append("<div style='width:"+width+"px' class='column "+name+"'></div>");
      $('.'+name).html("<h1 class='title"+name+"'>"+name+"</h1>");
      $('.title'+name).append("<span class='total num"+name+"'>0</span>");
      $('.'+name).append("<ol id='"+name+"'></ol>");


      $('.num'+col_name).html(num+"<span id='D"+col_name+"' class='RemoveColumn'>[X]</span></div>");
      $('#D'+col_name).live('click',function(){
        console.log('set to: '+name);
        var deletecolumn = new DeleteColumnView(col_name,columns);
      });


    });

      this.render();
  },

  addColumn: function(){

    newCol = prompt('Enter new column');

    var column = new Box({
      name: newCol
    });

    columns.add(column);
    socket.emit('add_column');

  }
});

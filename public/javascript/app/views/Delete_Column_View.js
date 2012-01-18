var DeleteColumnView = Backbone.View.extend({

  initialize: function(){
    this.remove(arguments[0]);
    columns = arguments[1];
  },

  ClearBox: function(elements,column){
    columns.remove(_.find(columns.models, function(value){
      return value.get('name') == column;
    }));
    socket.emit('set','column',columns);
    this.reset(columns);
  },

  reset: function(columns){
    method.show(columns);
  },

  remove: function(column){
    socket.emit('remove_column',column);
    var elements = _.filter(collection.models,function(item){
      return item.get('column') == column;
    });

    this.ClearBox(elements,column);
  }
});

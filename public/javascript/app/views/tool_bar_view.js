ToDoZen.Views.ToolBarView = Backbone.View.extend({
  el: $('#toolbar'),

  events: {
    'click #addColumn': 'addColumn',
    'keyup #add'      : 'addTask'
  },

  addColumn: function() {
    var new_column_name = prompt('Enter new column name');

    if (new_column_name) {
      ToDoZen.columns_area.columns.add({ name: new_column_name });
    }
  },

  addTask: function(e) {
    if (e.keyCode != 13) return;

    var new_task_name = $('#add').val();
    var column_names  = new_task_name.match(/(\#([^\s])*)+/g);
    if (! column_names) return;

    ToDoZen.columns_area.columns.each(function(column) {
      if (column_names.indexOf('#'+column.get('name')) > -1) {
        column.get('tasks').add({ title: new_task_name });
      }
    });

  }
});

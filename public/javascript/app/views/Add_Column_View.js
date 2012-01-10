var AddColumnView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click #addColumn': 'add'
  },

  initialize: function(){
    _.bindAll(this, 'add');
  },

  add: function(){
    var newcolumn = prompt("Enter new column");
    COLUMNS.push(newcolumn);
    build_lists();
  }
});

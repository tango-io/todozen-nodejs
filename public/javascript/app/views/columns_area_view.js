ToDoZen.Views.ColumnsAreaView = Backbone.View.extend({
  el: $('#kanban'),

  initialize: function() {
    _.bindAll(this);

    this.columns = new ToDoZen.Collections.ColumnsCollection();
    this.columns.bind('add', this.render);
  },

  render: function() {
    this.el.html('');
    this.columns.each(this.renderColumnView);
    return this;
  },

  renderColumnView: function(column) {
    var column_view = new ToDoZen.Views.ColumnView({ model: column });
    this.el.append(column_view.render().el);
  }
});

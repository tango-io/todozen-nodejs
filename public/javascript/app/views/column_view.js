var jade = require('jade');
ToDoZen.Views.ColumnView = Backbone.View.extend({
  events: {
    'click span.RemoveColumn': 'destroy'
  },

  initialize: function() {
    _.bindAll(this);

    this.model.get('tasks').bind('add', this.render);
  },

  render: function() {
    var template = jade.compile($('#column-template').text());
    $(this.el).html(template(this.model.toJSON()));
    this.model.get('tasks').each(this.renderTaskView);
    return this;
  },

  renderTaskView: function(task){
    var task_view = new ToDoZen.Views.TaskView({ model: task });
    $(this.el).find('ol').append(task_view.render().el);
  },

  destroy: function() {
    this.model.destroy();
    this.el.remove();
  }
});

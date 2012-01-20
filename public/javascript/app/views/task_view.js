ToDoZen.Views.TaskView = Backbone.View.extend({
  tagName: 'li',

  events: {
    'click span.delete': 'destroy'
  },

  render: function() {
    $(this.el).html('<div class="item"">'+this.model.get('title')+'<span class="delete">[X]</span></div>');
    return this;
  },

  destroy: function() {
    this.model.destroy();
    $(this.el).remove();
  }
});

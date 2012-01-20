ToDoZen.Models.Column = Backbone.Model.extend({
  initialize: function() {
    this.set({ tasks: new ToDoZen.Collections.TasksCollection() });
  }
});

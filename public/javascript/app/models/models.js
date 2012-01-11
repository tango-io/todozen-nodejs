  var Item = Backbone.Model.extend({
    defaults:{
      id_todo: '',
      title: '',
      column: '',
      //tags: [],
      color: ''
    }
  });

  var Box = Backbone.Model.extend({
    defaults:{
      name: ""
    }
  });

    var server = false, models;
    if (typeof exports !== 'undefined') {
        Backbone = require('server-backbone-redis');

        models = exports;
        server = true;

    } else {
        models = this.models = {};
    }

	models.Backbone = Backbone;

  models.Item = Backbone.Model.extend({
  defaults:{
      id_todo: '',
      title: '',
      //title: '',
      column: '',
      //tags: [],
      color: ''
  },

    save:function() {
      _storeSet(this.get('id_todo'), this);
    },
  
  });

  //var Item = Backbone.Model.extend({
    //defaults:{
      //id_todo: '',
      //title: '',
      ////title: '',
      //column: '',
      ////tags: [],
      //color: ''
    //},

    //save:function() {
      //_storeSet(this.get('id_todo'), this);
    //},
  //});


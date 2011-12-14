var Item = Backbone.Model.extend({
  defaults:{
      id_todo: '',
      title: '',
      //title: '',
      column: ''
      //tags: [],
      //color: '',
  },

  save:function() {
    _storeSet(this.get('id_todo'), this);
  },



});

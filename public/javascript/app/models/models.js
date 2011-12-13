var Item = Backbone.Model.extend({
  defaults:{
      id_todo: '',
      Todo: ''
      //title: '',
      //column: '',
      //tags: [],
      //color: '',
  },

  save:function() {
    console.log('asdasdasd');
    storeSet(this.get('id_todo'), this);
  },



});

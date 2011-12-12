(function($){
  Backbone.sync = function(method, model, success, error){ 
    success();
  }
  
  var Item = Backbone.Model.extend({
    defaults: {
      Todo: ''
    }
  });
  
  var List = Backbone.Collection.extend({
    model: Item
  });

  var ItemView = Backbone.View.extend({
    tagName: 'li',      
    events: { 
      'click span.delete': 'remove'
    },    
    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'remove');
      this.model.bind('remove', this.unrender);
    },
    render: function(){
      $(this.el).html('<span style="color:black;">'+this.model.get('Todo')+'<span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
      return this; 
    },
    unrender: function(){
      $(this.el).remove();
    },
    remove: function(){
      this.model.destroy();
    }
  });
  
  var ListView = Backbone.View.extend({
    el: $('body'), 
    events: {
      'keypress input#add': 'addItem'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'addItem', 'appendItem'); 
      
      this.collection = new List();
      this.collection.bind('add', this.appendItem); 

      this.counter = 0;
      this.render();
    },
    render: function(){
      $(this.el).append("<input id='add'></input>");
      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(item){ 
        appendItem(item);
      }, this);
    },

    addItem: function(){
      if (event.keyCode == 13 && add.value!=''){
      this.counter++;

      var item = new Item();
      item.set({
        Todo: add.value
      });
      this.collection.add(item);
      add.value = '';
      }
    },


    appendItem: function(item){
      var itemView = new ItemView({
        model: item
      });
      $('ul', this.el).append(itemView.render().el);
    }
  });

  var listView = new ListView();
})(jQuery);

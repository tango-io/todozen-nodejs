  function S4(){
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }

  function guid(){
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

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
      $(this.el).html('<span style="color:black;">'+this.model.get('Todo')+'<span class="delete">[X]</span>');
      return this; 
    },
    unrender: function(){
      $(this.el).remove();
    },
    remove: function(){
      localStorage.removeItem(this.model.get('id_todo'));
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
      this.render();
    },

    count: function(){
      for (i=localStorage.length-1; i>=0; i--)  
      {
        var item = new Item()
           ,key = localStorage.key(i);
        item.set({
                 id_todo: localStorage.key(i),
                 Todo: JSON.parse(localStorage.getItem(key))['Todo']
        });
        this.collection.add(item);
      }     
    },


    render: function(){
      $(this.el).append("<input id='add'></input>");
      $(this.el).append("<ul></ul>");


      _(this.collection.models).each(function(item){ 
        appendItem(item);
      }, this);
      this.count();
    },

    addItem: function(){
      if (event.keyCode == 13 && add.value!=''){
        var item = new Item();
        item.set({
          id_todo: guid(),
          Todo: add.value
        });
        //localstorage
        localStorage.setItem(item.get('id_todo'), JSON.stringify({"id":item.get('id_todo'),"Todo":item.get("Todo")}))
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

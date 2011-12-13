  function S4(){
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }

  function guid(){
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  //setInterval( function(){
   //localStorage.setItem('index', index)
  //}, 2000)

  function _indexPop(key) {
      localStorage.removeItem(key);
      k = key;
       var index = this.indexGet();
       var position = index.indexOf(key);
       if(position != -1){
      index = index.filter(function(val) {return val != key.toString()});
         }
         this.indexSet(index);
  }

   function indexGet() {
       var index = this.storeGet('index');
       return index ? index : [];
     }

    function indexAdd(key){
      var index = this.indexGet();
    index.push(key);
      this.indexSet(index);
    }

    function indexSet(index) {
      localStorage.setItem('index', JSON.stringify(index));
    }

    function getAll() {
      var r = [];
      var keys = this.indexGet();
      for (var i = 0 ; i < keys.length ; i++){ 
        var rv = this.storeGet(keys[i]);
        if (rv != undefined) r.push(rv);
      }
      return r
    }

    function storeGet(key){
      try{
        return JSON.parse(localStorage.getItem(key));
      } catch(e){
        alert('ohhh my gosh! you tried to get and parse an invalid record! check your json.');
        return false
      }
    }

    function storeSet(key,value){
      localStorage.setItem(key, JSON.stringify(value));
      this.indexAdd(key);
    }
        

  var List = Backbone.Collection.extend({
    model: Item
  });

  index = indexGet();
  
  
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
      $(this.el).html('<span style="color:black;">'+this.model.get('Todo')+'<span class="delete">[X]</span><span class="edit">[EDIT]</span>');
      return this; 
    },
    unrender: function(){
      $(this.el).remove();
    },
    remove: function(){
      var id = this.model.get('id_todo');
      _indexPop(id);
      this.model.destroy();
    },

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
      this.collection.add(getAll())
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
        item.save();
        
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


  //-------------------------------------------------------------------------------------------- !private methods
  function _S4(){
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }

  function _guid(){
    return (_S4()+_S4()+"-"+_S4()+"-"+_S4()+"-"+_S4()+"-"+_S4()+_S4()+_S4());
  }

  function _indexPop(key) {
      localStorage.removeItem(key);
      k = key;
       var index = this._indexGet();
       var position = index.indexOf(key);
       if(position != -1){
      index = index.filter(function(val) {return val != key.toString()});
         }
         this._indexSet(index);
  }

   function _indexGet() {
       var index = this._storeGet('index');
       return index ? index : [];
     }

    function _indexAdd(key){
      var index = this._indexGet();
    index.push(key);
      this._indexSet(index);
    }

    function _indexSet(index) {
      localStorage.setItem('index', JSON.stringify(index));
    }

    function _getAll() {
      var r = [];
      var keys = this._indexGet();
      for (var i = 0 ; i < keys.length ; i++){ 
        var rv = this._storeGet(keys[i]);
        if (rv != undefined) r.push(rv);
      }
      return r
    }

    function _storeGet(key){
      try{
        return JSON.parse(localStorage.getItem(key));
      } catch(e){
        alert('ohhh my gosh! you tried to get and parse an invalid record! check your json.');
        return false
      }
    }

    function _storeSet(key,value){
      localStorage.setItem(key, JSON.stringify(value));
      this._indexAdd(key);
    }

    function _countColumns(){
      var colcount = [];
      _.each(COLUMNS, function(col){
        colcount.push(_.filter(column_count, function(value){ 
          return value==col 
        }))
      });
      //console.log(colcount);
    }
  //-------------------------------------------------------------------------------------------- end of methods!

  //-------------------------------------------------------------------------------------------- !backbone views 

  //-------------------------------------------------------------------------------------------- !backbone collection 

  var List = Backbone.Collection.extend({
    model: Item
  });

  index = _indexGet();
  var column_count = [];
  
  //-------------------------------------------------------------------------------------------- end of collection! 

  //-------------------------------------------------------------------------------------------- !ItemView 
  
  var ItemView = Backbone.View.extend({
    tagName: 'li',      
    events: { 
      'click span.delete': 'remove',
      'click span.edit': 'edit',
      'keypress input#modify': 'modItem'
    },    
    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'remove');
      this.model.bind('remove', this.unrender);
    },
    render: function(){
      $(this.el).html('<span style="color:black;">'+this.model.get('title')+'<span class="delete">[X]</span><span class="edit">[EDIT]</span>');
      column_count.push(this.model.get('column'));
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
    edit: function(){
      if(typeof(modify)!='object'){
        var value = JSON.parse(localStorage.getItem(this.model.get('id_todo')))['title'];
        $(this.el).html("<input id='modify'></input>");
        $('#modify').val(value);
        $("#modify").focus();
      }
    },
    modItem: function(){
      if (event.keyCode == 13 && modify.value!=''){
        var val = modify.value;
        var id = this.model.get('id_todo');
        var item = new Item();
        var title = modify.value;
        var column = title.match(regColumn)? title.match(regColumn).pop().substring(1) : '';
        var color = title.match(regColor)? title.match(regColor).pop().substring(1) : '';
        item.set({
          id_todo: id,
          title: val,
          column: column,
          color: color
        });
        _indexPop(id);
        item.save();
        $(this.el).html('<span style="color:black;">'+val+'<span class="delete">[X]</span><span class="edit">[EDIT]</span>');
      }
    }

  });

  //-------------------------------------------------------------------------------------------- end of ItemView!

  //-------------------------------------------------------------------------------------------- !ListView 
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
      this.collection.add(_getAll())
      _countColumns();
    },

    render: function(){
      //$(this.el).append("<input id='add'></input>");
      $("#kanban").append("<ol></ol>");
      _(this.collection.models).each(function(item){
        appendItem(item);
      }, this);
      this.count();
    },

    addItem: function(){
      if (event.keyCode == 13 && add.value!=''){
        var item = new Item();
        var title = add.value;
        var column = title.match(regColumn)? title.match(regColumn).pop().substring(1) : '';
        var color = title.match(regColor)? title.match(regColor).pop().substring(1) : '';

        item.set({
          id_todo: _guid(),
          title: title,
          column: column,
          color: color
        });
        item.save();
        this.collection.add(item);
        add.value = '';
      }
    },

    appendItem: function(item){
      var itemView = new ItemView({
        model: item
      });
      $('ol', this.el).append(itemView.render().el);
    }
  });

  //-------------------------------------------------------------------------------------------- end of ListView! 

  //-------------------------------------------------------------------------------------------- end of backbone views

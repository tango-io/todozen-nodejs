
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

    function _refresh(){
      for(i=0;i<=COLUMNS.length-1;i++){
        $('.num'+COLUMNS[i]).html(collection.models.filter(function(col){return col.attributes.column==COLUMNS[i]}).length);
      }
    }

   //-------------------------------------------------------------------------------------------- end of methods!

  //-------------------------------------------------------------------------------------------- !backbone views 

  //-------------------------------------------------------------------------------------------- !backbone collection 

  var List = Backbone.Collection.extend({
    model: Item
  });

  index = _indexGet();
  selected = [];
  
  //-------------------------------------------------------------------------------------------- end of collection! 

  //-------------------------------------------------------------------------------------------- !ItemView 
  
  var ItemView = Backbone.View.extend({
    tagName: 'li',      
    events: { 
      'click span.delete': 'remove',
      'dblclick div.item': 'edit',
      'click div.item': 'select',
      'keypress input#modify': 'modItem',
      'blur input#modify': 'release'
    },    
    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'remove');
      this.model.bind('remove', this.unrender);
    },
    render: function(){
      $(this.el).html('<div class="item"">'+this.model.get('title')+'<span class="delete">[X]</span></div>');
      return this; 
    },
    unrender: function(){
      $(this.el).remove();
    },
    remove: function(){
      var id = this.model.get('id_todo');
      _indexPop(id);
      this.model.destroy();
      _refresh();
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
        var id = this.model.get('id_todo');
        var item = new Item();
        var title = modify.value;

        if(title.match(regColumn)){
        var column = title.match(regColumn).pop().substring(1); 
        title = title.substring(title.indexOf(title.match(regColumn)), 0);
        }else{
          var column = this.model.get('column');
        }

        var color = title.match(regColor)? title.match(regColor).pop().substring(1) : '';

        if(column != this.model.get('column')){
        item.set({
          id_todo: id,
          title: title,
          column: column,
          color: color
        });
        _indexPop(id);
        item.save();
        $(this.el).remove();
        collection.remove(this.model);
        collection.add(item);
        
        }else{
        this.model.set({
        title: title
        });
        localStorage.setItem(id, JSON.stringify(this.model));
        $(this.el).html('<div class="item"">'+title+'<span class="delete">[X]</span></div>');
        
        }
        _refresh();
      }
    },

    release: function(){
      $(this.el).html('<div class="item"">'+this.model.get('title')+'<span class="delete">[X]</span></div>');
    },

    select: function(){
    $(selected).css('background', '#F4F4F4');
    $(this.el).css('background', '#3399ff');
    selected = this.el;
    }

  });

  //-------------------------------------------------------------------------------------------- end of ItemView!

  //-------------------------------------------------------------------------------------------- !ListView 
  var ListView = Backbone.View.extend({
    el: $('body'), 
    events: {
      'keypress input#add': 'addItem',
      'click input#add': 'change',
      'blur input#add': 'check'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'addItem', 'appendItem'); 
      collection = new List();
      collection.bind('add', this.appendItem); 
      this.render();
    },

    count: function(){
      collection.add(_getAll())
      _refresh();
    },

    render: function(){
      _(collection.models).each(function(item){
        appendItem(item);
      }, this);
      this.count();


    },

    addItem: function(){
      if (event.keyCode == 13 && add.value!=''){
        var item = new Item();
        var title = add.value;

        if(title.match(regColumn)){
        var column = title.match(regColumn).pop().substring(1); 
        title = title.substring(title.indexOf(title.match(regColumn)), 0);
        }else{
          var column = COLUMNS[0];
        }
        
        var color = title.match(regColor)? title.match(regColor).pop().substring(1) : '';
        item.set({
          id_todo: _guid(),
          title: title,
          column: column,
          color: color
        });
        item.save();
        collection.add(item);
        add.value = '';
        _refresh();
      }
    },

    appendItem: function(item){
      var itemView = new ItemView({
        model: item
      });
      var column = item.attributes.column;
      $('#'+column, this.el).append(itemView.render().el);
    },

    change: function(){
      if($('#add').val()=='Enter task here'){
        $('#add').val('');
        $('#add').css('color', '#333');
        $('#add').css('font-style', 'normal');
      } 
    },

    check: function(){
      if($('#add').val()==''){
        $('#add').val('Enter task here');
        $('#add').css('color', '#a1a1a1');
        $('#add').css('font-style', 'italic');
      }
    }

  });

  //-------------------------------------------------------------------------------------------- end of ListView! 

  //-------------------------------------------------------------------------------------------- end of backbone views

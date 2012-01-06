
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

  function htmlspecialchars(str) {
   if (typeof(str) == "string") {
    str = str.replace(/&/g, "&amp;"); /* must do &amp; first */
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#039;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    }
   return str;
   }


   //-------------------------------------------------------------------------------------------- end of methods!

  //-------------------------------------------------------------------------------------------- !backbone views 

  //-------------------------------------------------------------------------------------------- !backbone collection 

  var List = Backbone.Collection.extend({
    model: Item
  });

  //index = _indexGet();
  index = [];
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
      $(this.el).css('background', this.model.get('color'));
      return this; 
    },
    unrender: function(){
      $(this.el).remove();
    },
    remove: function(){
      var id = this.model.get('id_todo');
      //this.model.destroy();
      var element = this.el;
      socket.emit('search','index',function(r_index){
        $(element).addClass('deleteMe');
        var element_index = $('li').index($('li.deleteMe')[0]);
        index = JSON.parse(r_index);
        w = index.indexOf(id);
        index.splice(w,1);                       
        socket.emit('set','index',index);
        socket.emit('del',id,this.model,element_index);
      });
    },    
    edit: function(){
      if(typeof(modify)!='object'){

        var id = this.model.get('id_todo');

        function get_value(callback){
        socket.emit('search',id,function(v){
        var value = JSON.parse(v)['title'];
        callback(value);
        });
        }

        get_value(function(value){
        $('#modify').val(value);
        $("#modify").focus();
        });

        $(this.el).html("<input id='modify'></input>");
      }
    },



    modItem: function(){
      if (event.keyCode == 13 && modify.value!=''){
        var id = this.model.get('id_todo');
        var item = new Item();
        var title = htmlspecialchars(modify.value);

        var color = title.match(regColor)? title.match(regColor).pop().substring(1) : '';
        if(title.match(regColumn)){
          var column = title.match(regColumn).pop().substring(1); 
          title = title.replace(regColumn,"");
        }else{
          var column = this.model.get('column');
        }

        $(this.el).addClass('deleteMe');
        var element_index = $('li').index($('li.deleteMe')[0]);

        if(column != this.model.get('column')){
          item.set({
            id_todo: id,
            title: title,
            column: column,
          });
          socket.emit('search','index',function(r_index){
            index = JSON.parse(r_index);
            socket.emit('del',id,this.model,element_index);
            socket.emit('add item',index,item);
          });
        }else{

          this.model.set({
            title: title,
            color: color
          });

          selected[1] = this.model.get('color');
          socket.emit('set',id,this.model);

          socket.emit('mod title',element_index,title,color)
        $(this.el).removeClass('deleteMe');
        }
      }
    },

    release: function(){
      $(this.el).html('<div class="item"">'+this.model.get('title')+'<span class="delete">[X]</span></div>');
    },

    select: function(){
    $(selected[0]).css('background', selected[1]);
    $(this.el).css('background', '#3399ff');
    selected[0] = this.el;
    selected[1] = this.model.get('color');
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

      view = this;
      socket.on('get_message',function(item){
        collection.add(JSON.parse(item));
        _refresh();
      });

      socket.on('del_message',function(item,i){
        var destroy = $('li').get(i);
        $(destroy).remove();
        collection.remove(item);
        _refresh();
      })

      socket.on('mod_t',function(r,title,color){
        var mod = $('li').get(r);
        $(mod).html('<div class="item"">'+title+'<span class="delete">[X]</span></div>');
        $(mod).css('background', color);
      });
      this.render();
    },

    count: function(){

      function get(callback){
        socket.emit('data', function(data){
        return callback(data);
        });
      }

      get(function(data){


        for(i=0;i<=data.length-1;i++)
        {
          var item = JSON.parse(data[i]);
          index.push(item.id_todo);
          localStorage.setItem(item.id_todo, JSON.stringify(item));
          localStorage.setItem('index', JSON.stringify(index));
          collection.add(item);
        }
        _refresh();
      });
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
        var title = htmlspecialchars(add.value);
        var color = title.match(regColor)? title.match(regColor).pop().substring(1) : '';
        if(title.match(regColumn)){
          var column = title.match(regColumn).pop().substring(1); 
          title = title.replace(regColumn,"");
        }else{
          var column = COLUMNS[0];
        }
        var id = _guid();
        item.set({
          id_todo: id,
          title: title,
          column: column,
          color: color
        });
        //sending data to localstorage
        item.save();
        add.value = '';
        // Sendind data to redis
        socket.emit('search','index',function(r_index){
          if (r_index){
            index = JSON.parse(r_index);;
            index.push(id);
          }else{
            index.push(id);
          }
          socket.emit('add item',index,item);
        });
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

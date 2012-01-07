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

    socket.on('get_message',function(item){
      collection.add(JSON.parse(item));
      _refresh();
    });

    socket.on('del_message',function(id,i){
      var destroy = $('li').get(i);
      $(destroy).remove();

      function find(item){
        collection.each(function(value){
          if(value.attributes.id_todo == id)
            return item(value);
        });}

        find(function(item){
          collection.remove(item);
          _refresh();
        });
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
      localStorage.clear();
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
      localStorage.setItem(id,JSON.stringify(item));
      item.save();
      //cleaning input value
      add.value = '';
      // Sendind data to redis
      socket.emit('get','index',function(r_index){
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
    var title = item.attributes.title;
    var color = title.match(regColor)? title.match(regColor).pop().substring(1) : '';
    item.set({
      color: color
    });
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

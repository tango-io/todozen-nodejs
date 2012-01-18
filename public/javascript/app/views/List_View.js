var ListView = Backbone.View.extend({
  el: $('body'), 
  events: {
    'keypress input#add': 'addItem',
    'click input#add': 'change',
    'blur input#add': 'check'
  },
  initialize: function(){
    _.bindAll(this, 'render', 'addItem', 'appendItem'); 

    if(!typeof(collection)==='undefined'){
      collection.reset();
    }

    collection = new List();
    collection.bind('add', this.appendItem); 

    socket.on('get_message',function(item){
      collection.add(JSON.parse(item));
      method.refresh();
    });

    socket.on('del_message',function(id,i){

      var destroy = $('li').get(i);
      $(destroy).remove();

      collection.remove(_.find(collection.models, function(value){
        return value.get('id_todo') == id;
      }));

      method.refresh();
    });

    socket.on('mod_t',function(r,title,color){
      var mod = $('li').get(r);
      $(mod).html('<div class="item"">'+title+'<span class="delete">[X]</span></div>');
      $(mod).css('background', color);
    });

    this.render();
  },

  count: function(){

    //Fetchong data from redis
    function get(callback){
      socket.emit('data', function(data){
        return callback(data);
      });
    }

    //Generating Lists
    get(function(data){
      _.each(data,function(item){
        collection.add(JSON.parse(item));
        index.push(JSON.parse(item).id_todo);
        localStorage.setItem(item.id_todo, JSON.stringify(item));
      });
      localStorage.setItem('index', JSON.stringify(index));
      method.refresh();
    });
  },

  render: function(){
    append = this.appendItem;
    _(collection.models).each(function(item){
      append(item);
    }, this);
    this.count();
  },

  addItem: function(){
    if (event.keyCode == 13 && add.value!=''){
      //Starting up variables
      var item = new Item();
      var title = method.clean(add.value);
      var color = title.match(regColor)? title.match(regColor).pop().substring(1) : '';
      var id = method.guid.id();

      //Seting up the item
      item.set({
        id_todo: id,
        title: title,
        color: color
      });

      //Determinate witch column
      method.Last.Tag(title,function(value){
        if(value){
          item.set({column: value.get('name')});
        }else{
          item.set({column: columns.models[0].get('name')});
        }
      });

      //Save item
      localStorage.setItem(id,JSON.stringify(item));
      item.save();

      //Send data to redis
      index.push(id);
      socket.emit('add item',index,item);

      //Clear add input value 
      add.value = '';
    }
  },

  appendItem: function(item){
    var itemView = new ItemView({
      model: item
    });
    var column = item.get('column');
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

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
    var element = this.el;
    var model = this.model.get('id_todo');
    socket.emit('get','index',function(r_index){
      $(element).addClass('deleteMe');
      var element_index = $('li').index($('li.deleteMe')[0]);
      index = JSON.parse(r_index);
      w = index.indexOf(id);
      index.splice(w,1);                       
      socket.emit('set','index',index);
      socket.emit('del',id,model,element_index);
    });
  },    
  edit: function(){
    if(typeof(modify)!='object'){

      var id = this.model.get('id_todo');

      function get_value(callback){
        socket.emit('get',id,function(v){
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
        socket.emit('get','index',function(r_index){
          index = JSON.parse(r_index);
          socket.emit('del',id,element_index);
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

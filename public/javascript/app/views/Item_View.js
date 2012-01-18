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
      localStorage.removeItem(id);
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
      var title = method.clean(modify.value);
      var color = title.match(regColor)? title.match(regColor).pop().substring(1) : '';
      var column = this.model.get('column');
      var item = this.model;

      $(this.el).addClass('deleteMe');
      var element_index = $('li').index($('li.deleteMe')[0]);

      method.Last.Tag(title,function(value){
        if(value){
          item.set({
            column: value.get('name')
          });
        }else{
          item.set({
            column: column
          });
        }
      });
     
      item.set({
        title: title,
        color: color
      });

      if(column == item.get('column')){
       socket.emit('set',item.get('id_todo'),item);
       socket.emit('mod title',element_index,title,color)
       $(this.el).removeClass('deleteMe');

      }else{
       socket.emit('del',item.get('id_todo'),element_index);
       socket.emit('add item',index,item);
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

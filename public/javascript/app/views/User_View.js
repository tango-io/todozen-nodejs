var User = Backbone.View.extend({
  el: $('body'), 
  events: { 
    'keypress input#username': 'register',
    'click input#username': 'change',
    'blur input#username': 'check'
  },

  initialize: function(){
    _.bindAll(this, 'register');
  },

  register: function(){
    if (event.keyCode == 13 && username.value!=''){
      var name = htmlspecialchars(username.value);
      socket.emit('set nickname', name, function (success){
      console.log('Wellcome: '+ name + "!");
      $('#username').attr('disabled', true);
      if(!success){
      console.log('Nickname in use!');
      }
      });
    }
  },

  change: function(){
    if($('#username').val()=='User name'){
      $('#username').val('');
      $('#username').css('color', '#333');
      $('#username').css('font-style', 'normal');
    }
  },

  check: function(){
    if($('#username').val()==''){
      $('#username').val('User name');
      $('#username').css('color', '#a1a1a1');
      $('#username').css('font-style', 'italic');
    }
  }
});

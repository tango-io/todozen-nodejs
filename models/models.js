(function ($){

  Backbone.sync = function(method, model, success, error){ 
    success();
  }

  var Item = Backbone.Model.extend({
    defaults: {
      Todo: ''
    }
  });

  var List = Backbone.Collection.extend({
    model: Item
  });


})()

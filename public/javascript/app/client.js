(function($){
  Backbone.sync = function(method, model, success, error){ 
    success();
  };

  COLUMNS = ["inbox", "working", "complete"];

  listView = new ListView();
})(jQuery);

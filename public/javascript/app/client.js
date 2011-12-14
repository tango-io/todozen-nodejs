(function($){
  Backbone.sync = function(method, model, success, error){ 
    success();
  };

  COLUMNS = ["inbox", "working", "complete"];
  r = COLUMNS.map(function(col){return "#"+col}).join("|");
  regExp = new RegExp(r,"gi") 

  listView = new ListView();
})(jQuery);

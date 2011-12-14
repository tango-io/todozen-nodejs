(function($){
  Backbone.sync = function(method, model, success, error){ 
    success();
  };

  COLUMNS = ["inbox", "working", "complete"];
  COLORS = ["red", "blue", "green", "yellow"];
  TAG = {
      "columns":"#",
      "colors":"!"
  }

  r = COLUMNS.map(function(col){return TAG['columns']+col}).join("|");
  regExp = new RegExp(r,"gi") 

  listView = new ListView();
})(jQuery);

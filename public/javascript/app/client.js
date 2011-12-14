(function($){
  Backbone.sync = function(method, model, success, error){ 
    success();
  };

  COLUMNS = ["inbox", "working", "complete"];

  TAG = {
      "columns":"#"
  }

  r = COLUMNS.map(function(col){return TAG['columns']+col}).join("|");
  regExp = new RegExp(r,"gi") 

  listView = new ListView();
})(jQuery);

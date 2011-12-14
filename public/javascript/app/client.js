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

  var column = COLUMNS.map(function(column){return TAG['columns']+column}).join("|");
  var color = COLORS.map(function(color){return TAG['colors']+color}).join("|");
  regColumn = new RegExp(column,"gi") 
  regColor = new RegExp(color,"gi") 

  listView = new ListView();
})(jQuery);

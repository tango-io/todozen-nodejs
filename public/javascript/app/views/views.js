  //-------------------------------------------------------------------------------------------- !private methods
  COLUMNS = ["inbox", "working", "complete"];
  COLORS = ["red", "blue", "green", "yellow"];
  TAG = {
    "columns":"#",
    "colors":"!"
  }

  function start(callback){
    var column = COLUMNS.map(function(column){return TAG['columns']+column}).join("|");
    var color = COLORS.map(function(color){return TAG['colors']+color}).join("|");
    regColumn = new RegExp(column,"gi") 
    regColor = new RegExp(color,"gi") 
    callback(true);
  }

  function build_lists(){
    start(function(ready){
      if (ready){
        $('#kanban').empty();
        for(i=0;i<=COLUMNS.length-1;i++){
          var width = Math.floor(($("#kanban").width() - 40) / COLUMNS.length - 30);
          $("#kanban").append("<div style='width:"+width+"px' class='column "+COLUMNS[i]+"'><h1>"+COLUMNS[i]+"<span class='total num"+COLUMNS[i]+"'>0</span></h1><ol id='"+COLUMNS[i]+"'></ol></div>");
        }
      }
    });
  }

  build_lists();

  function _S4(){
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }

  function _guid(){
    return (_S4()+_S4()+"-"+_S4()+"-"+_S4()+"-"+_S4()+"-"+_S4()+_S4()+_S4());
  }

  function _refresh(){
    for(i=0;i<=COLUMNS.length-1;i++){
      $('.num'+COLUMNS[i]).html(collection.models.filter(function(col){return col.attributes.column==COLUMNS[i]}).length);
    }
  }

  function htmlspecialchars(str){
    if (typeof(str) == "string") {
      str = str.replace(/&/g, "&amp;");
      str = str.replace(/"/g, "&quot;");
      str = str.replace(/'/g, "&#039;");
      str = str.replace(/</g, "&lt;");
      str = str.replace(/>/g, "&gt;");
    }
    return str;
  }
  //-------------------------------------------------------------------------------------------- end of methods!

  //-------------------------------------------------------------------------------------------- !backbone collection 
  var List = Backbone.Collection.extend({
    model: Item
  });

  index = [];
  selected = [];
  //-------------------------------------------------------------------------------------------- end of collection! 

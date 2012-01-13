  //-------------------------------------------------------------------------------------------- !private methods
  COLUMNS = ["inbox", "working", "complete"];
  COLORS = ["red", "blue", "green", "yellow"];
  TAG = {
    "columns":"#",
    "colors":"!"
  }

    var color = COLORS.map(function(color){return TAG['colors']+color}).join("|");
    regColor = new RegExp(color,"gi") 

  function _S4(){
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }

  function _guid(){
    return (_S4()+_S4()+"-"+_S4()+"-"+_S4()+"-"+_S4()+"-"+_S4()+_S4()+_S4());
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

  function Lasty(title,callback){
    var tags = title.split(" ");
    _.each(tags,function(value){

      var match = _.find(columns.models,function(col){
        var column = TAG['columns']+col.get('name');
        return value == column;
      });
      callback(match);
    })};

    function Last(title,callback){
      var last = [];
      Lasty(title,function(value){
        if(value){
          last.push(value);
        }
      });
      callback(last.pop());
    }


  function refresh(){
    _.each(columns.models,function(column){
    var col_name = column.get('name'); 
    var num = collection.models.filter(function(col){return col.attributes.column==col_name}).length;
    $('.num'+col_name).html(num+"<span id='D"+col_name+"' class='RemoveColumn'>[X]</span></div>");
    });
  }
    


  //-------------------------------------------------------------------------------------------- end of methods!

  //-------------------------------------------------------------------------------------------- !backbone collection 
  var Columns = Backbone.Collection.extend({
    model: Box
  }); 

  var List = Backbone.Collection.extend({
    model: Item
  });

  index = [];
  selected = [];
  //-------------------------------------------------------------------------------------------- end of collection! 

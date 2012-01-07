  //-------------------------------------------------------------------------------------------- !private methods
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

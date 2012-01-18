(function($){
  method = {

    //Display all columns
    show: function(columns){
      $('#kanban').empty();
      var width = Math.floor(($("#kanban").width() - 40) / columns.length - 30);

      _.each(columns.models,function(column){
        var name = column.get('name');
        $("#kanban").append("<div style='width:"+width+"px' class='column "+name+"'></div>");
        $('.'+name).html("<h1 class='title"+name+"'>"+name+"</h1>");
        $('.title'+name).append("<span class='total num"+name+"'>0</span>");
        $('.'+name).append("<ol id='"+name+"'></ol>");
      });

      this.refresh();
      _.each(collection.models,function(item){
        listView.appendItem(item); 
      });
    },

    //Get current number of element per column
    refresh: function(){
      _.each(columns.models,function(column){
        var col_name = column.get('name'); 
        var num = collection.models.filter(function(col){return col.attributes.column==col_name}).length; 
        $('.num'+col_name).html(num+"<span id='D"+col_name+"' class='RemoveColumn'>[X]</span></div>");
        $('#D'+col_name).on('click',function(){
          var deletecolumn = new DeleteColumnView(col_name,columns);
        });
      });
    },

    //Get last column tag or clumn tag match
    Last: {
    
      Match: function (title,callback){
        var tags = title.split(" ");
        _.each(tags,function(value){
          var match = _.find(columns.models,function(col){
            var column = TAG['columns']+col.get('name');
            return value == column;
          });
          callback(match);
        })
      },

      Tag: function Last(title,callback){
        var last = [];
        this.Match(title,function(value){
          if(value){
            last.push(value);
          }
        });
        callback(last.pop());
      }

    },

    //Aviod js code injection
    clean: function (str){
      if (typeof(str) == "string") {
        str = str.replace(/&/g, "&amp;");
        str = str.replace(/"/g, "&quot;");
        str = str.replace(/'/g, "&#039;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
      }
      return str;
    },

    //Generate guid id
    guid:{
      S4: function (){
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      },
      id: function (){
        return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
      }
    }
      
  }

})(jQuery);
//-------------------------------------------------------------------------------------------- !private methods

COLUMNS = ["inbox", "working", "complete"];
COLORS = ["red", "blue", "green", "yellow"];
TAG = {
  "columns":"#",
  "colors":"!"
}

var color = COLORS.map(function(color){return TAG['colors']+color}).join("|");
regColor = new RegExp(color,"gi") 



  //-------------------------------------------------------------------------------------------- !backbone collection 
  var Columns = Backbone.Collection.extend({
    model: Box
  }); 

  var List = Backbone.Collection.extend({
    model: Item
  });

  var index = [];
  var selected = [];
  //-------------------------------------------------------------------------------------------- end of collection! 

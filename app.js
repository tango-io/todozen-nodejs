   _ = require('underscore');
   Backbone = require('backbone');
   redis = require('redis');


var express = require('express')
  , app = express.createServer()
  , jade = require('jade');

var routes = require('./routes')
  , models = require('./models/models');


// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});
//



app.get('/', routes.index);

app.listen(3000);

var express = require('express')
  , app = express.createServer();

app.get('/', function(req, res){
  res.send('To do zone');
});

app.listen(3000);

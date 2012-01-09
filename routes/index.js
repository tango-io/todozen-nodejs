exports.index = function(req, res){
  res.render('index', { title: 'To do zen' });
};

exports.test = function(req, res){
 res.render('test',{title: 'Testing!'});
};

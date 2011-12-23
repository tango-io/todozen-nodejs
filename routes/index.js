exports.index = function(req, res){
  var item1 = new models.Item();
  models.collection = Backbone.Collection.extend({
   model: models.Item
  });
  res.render('index', { title: 'To do zen' })
};

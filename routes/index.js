exports.index = function(req, res){

  models.collection = Backbone.Collection.extend({
   model: models.Item
  });

  models.Wrapper = Backbone.Model.extend({});

  res.render('index', { title: 'To do zen' })
};

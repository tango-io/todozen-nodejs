var TodoList = [{
  'id_todo': '1',
  'title': 'Finish up todozen',
  'column': 'inbox',
  'color': 'yellow'
},{
  'id_todo': '2',
  'title': 'Implement testing',
  'column': 'working',
  'color': 'red'
}];


describe('List',function(){

  it('creates todo list',function(){
    expect(TodoList.length).toEqual(2);
  });
});

  jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
  jasmine.getEnv().execute();


var course = require('./course'),
    user = require('./user');

module.exports = function(app) {

  // route to main page
  app.get('/', function(req, res){
    res.render('index');
  });

  app.post('/login', user.login);

  app.post('/course/create', course.create);

  app.get('/course/all', course.all);

  app.get('/course/my', course.my);

  app.post('/course/add', course.add);



};


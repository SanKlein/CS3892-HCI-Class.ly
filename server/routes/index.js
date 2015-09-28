var course = require('./course'),
    user = require('./user');

module.exports = function(app) {

  // route to main page
  app.get('/', function(req, res){
    res.render('index');
  });

  app.post('/login', user.login);

  app.post('/course/create', course.create);

  app.post('/course/all', course.all);

  app.post('/course/my', course.my);



};


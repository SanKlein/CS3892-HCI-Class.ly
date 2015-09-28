var mongoose = require("mongoose"),
    User = require('../models/user');

module.exports = {

  // GET /users
  getUsers: function (req, res) {
    User.find({}, function (error, users) {
      res.json(users);
    });
  },

  // POST /users/sign_in
  login: function (req, res) {

    var username = req.body.username;
    username = username.toLowerCase();

    if (username) {
      User.findOne({username: username}, function (error, user) {
        if (error)
          console.log(error);
        if (user) {
          res.json(user);
        } else {
          var user = new User();

          user.username = username;

          user.save(function(err){
            if (!err) {
              res.json(user);
            } else {
              res.send(err, 403);
            }
          });
        }
      });
    } else {
      console.log("no credentials submitted");
      res.send("fail", 500);
    }
  }
};

var mongoose = require('mongoose');

var User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true
  },
  school: {
    type: String
  }
});

module.exports = mongoose.model('User', User);

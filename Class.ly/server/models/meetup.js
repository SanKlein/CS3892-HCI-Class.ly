var mongoose = require('mongoose'),
    User = require('./user'),
    Group = require('./group'),
    Course = require('./course');

var Meetup = new mongoose.Schema({
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  title: {
    type: String
  },
  date: {
    type: Date
  },
  location: {
    type: String
  }
});

module.exports = mongoose.model('Meetup', Meetup);

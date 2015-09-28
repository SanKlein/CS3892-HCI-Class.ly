var mongoose = require('mongoose');

var Meetup = new mongoose.Schema({
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
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

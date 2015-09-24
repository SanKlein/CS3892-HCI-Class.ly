var mongoose = require('mongoose');

var Group = new mongoose.Schema({
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  title: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Group', Group);

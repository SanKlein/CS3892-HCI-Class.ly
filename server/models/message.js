var mongoose = require('mongoose');

var Message = new mongoose.Schema({
  text: {
    type: String
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: ''
  },
  user_username: {
    type: String
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    default: ''
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    default: ''
  },
  sent: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Message', Message);

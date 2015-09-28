var mongoose = require('mongoose');

var Message = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  user_username: {
    type: String
  },
  text: {
    type: String
  },
  course: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Course',
    default: []
  },
  sent: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Message', Message);

var mongoose = require("mongoose"),
  Meetup = require('../models/meetup');

module.exports = {

  all: function(req, res) {

    Meetup.find().sort({_id: 1}).exec(function(err, meetups) {
      console.log(meetups);
      if (meetups.length) {
        res.send(meetups);
      } else {
        res.send(err, 404);
      }
    });
  },

  create: function(req, res) {

    var meetup = new Meetup();

    meetup.course = req.body.course;
    meetup.group = req.body.group;
    meetup.date = req.body.date;
    meetup.time = req.body.time;
    meetup.location = req.body.location;

    meetup.save(function(err){
      if (!err) {
        res.json(meetup);
      } else {
        res.send(err, 403);
      }
    });
  }

};

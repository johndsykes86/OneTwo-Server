const express = require("express"),
  router = express.Router(),
  Stadium = require("../models/Stadium.js"),
  CheckIn = require("../models/CheckIn.js"),
  Comment = require("../models/Comment.js"),
  User = require("../models/User.js");


//Save checkin into stadium
router.post("/:id/", (req, res) => {
  User.findById(req.user._id, (err, user) => {
    var newCheckIn = new CheckIn({
      _stadiumID: req.body._stadiumID,
      _userID: req.body._userID,
      comment: req.body.comment,
      userName: req.body.userName,
      stadiumName: req.body.stadiumName,
      team: req.body.team
    });

    newCheckIn.save((err, newCheckIn) => {
      if (err) console.log(err);
      user._checkIns.push(newCheckIn);
      user.save(function(err, user) {
        if (err) console.log(err);
        console.log("saved");
        res.json(newCheckIn);
      });
    });
  });
});



//get checkins for a single stadium
router.get("/stadiums/:id/", (req, res) => {
  CheckIn.find({ _stadiumID: req.params.id }, (err, checkIns) => {
    if (err) console.log(err);
    res.json({ data: checkIns });
  });
});

//get a single checkin
router.get("/:id/", (req, res) => {
  CheckIn.find({ _id: req.params.id }, (err, checkIns) => {
    if (err) console.log(err);
    res.json({ data: checkIns });
  });
});

//get all checkins for a single user
router.get("/users/:id", (req, res) => {
  CheckIn.find({ _userID: req.params.id }, (err, checkIns) => {
    if (err) console.log(err);
    res.json({ data: checkIns });
  });
});

//get all checkins
router.get("/", (req, res) => {
  CheckIn.find({}, (err, checkIns) => {
    if (err) console.log(err);
    res.json({ data: checkIns });
  });
});

module.exports = router;

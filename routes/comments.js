const express = require("express"),
    router = express.Router(),
    Stadium = require("../models/Stadium.js"),
    CheckIn = require("../models/CheckIn.js"),
    Comment = require("../models/Comment.js"),
    User = require("../models/User.js");


//Save comment into checkin
router.post("/:id/", (req, res) => {
    CheckIn.findById(req.params.id, (err, checkin) => {
        var newComment = new Comment({
            _stadiumID: req.body._stadiumID,
            _userID: req.body._userID,
            _checkInID: req.body._checkInID,
            comment: req.body.comment,
            userName: req.body.userName,
            stadiumName: req.body.stadiumName,
            team: req.body.team
        });

        newComment.save((err, newComment) => {
            if (err) console.log(err);
            checkin._replies.push(newComment);
            checkin.save(function (err, checkin) {
                if (err) console.log(err);
                res.json(newComment);
            });
        });
    });
});

//get comments for a single checkin
router.get("/checkin/:id/", (req, res) => {
    Comment.find({ _checkInID: req.params.id }, (err, comments) => {
        if (err) console.log(err);
        res.json(comments)
    });
});

//get a single comment
router.get("/:id/", (req, res) => {
    Comment.find({ _id: req.params.id }, (err, comment) => {
        console.log(comment, req.params.id)
        if (err) console.log(err);
        res.json(comment)
    });
});

//delete a comment
router.delete("/:id/", (req, res) => {
    Comment.findOne( {_id: req.params.id}, (err, comment) => {
        const commentID = req.params.id
        const checkInID = comment._checkInID

        CheckIn.findById(checkInID, (err, checkin) => {
            checkin._replies.remove(commentID)
            checkin.save()
        })

       comment.remove()
       res.json({"msg": "the comment has been removed"})

    })
})

//get all checkins
router.get("/", (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) console.log(err);
        res.json({ data: comments });
    });
});



module.exports = router;
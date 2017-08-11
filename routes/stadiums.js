const express = require('express'),
  router = express.Router(),
  Stadium = require('../models/Stadium.js'),
  CheckIn = require('../models/CheckIn.js'),
  User = require('../models/User.js'),
  fs = require('fs')


  //Shows all stadiums
  router.get('/', (req,res)=>{
    Stadium.find({}, (err, stadiums)=>{
      res.json(stadiums)
    })
  })


//Seed stadium database router
router.get('/seed', (req, res) => {
  Stadium.remove({}, (err)=>{
    console.log("all stadiums are DELETED!")
  })

  fs.readFile('./data.json', 'utf-8', (err, data) => {
      if (err) console.log(err)
      const stadiums = JSON.parse(data)

      Stadium.insertMany(stadiums, (err, result)=>{
        res.json(result)
      })
    })
  })

  router.post('/:id/checkin', (req, res)=>{
    console.log(req.user)
     User.findById(req.user._id, (err, user)=>{
       var newCheckIn = new CheckIn({
         _stadiumID: req.body._stadiumID,
         _userID: req.body._userID,
         comment: req.body.comment,
         userName: req.body.userName
       })


       newCheckIn.save((err, newCheckIn)=>{
         if (err) console.log(err)
         user._checkIns.push(newCheckIn)
         user.save(function(err, user) {
           if(err) console.log(err)
           console.log('saved')
           res.json(newCheckIn)
         })

       })
     })

  })


  router.get('/:id/checkin', (req, res)=>{
    console.log()
    CheckIn.find({_stadiumID: req.params.id}, (err, checkIns)=>{
      if(err) console.log(err)
      res.json({data: checkIns})
    })
  })


router.get('/:id', (req, res)=>{
  Stadium.findById(req.params.id, (err, stadium)=>{
    if (err) console.log(err)
    res.json(stadium)
  })
})




module.exports = router

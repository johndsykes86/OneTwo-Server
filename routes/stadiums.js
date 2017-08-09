const express = require('express'),
  router = express.Router(),
  Stadium = require('../models/Stadium.js'),
  CheckIn = require('../models/CheckIn.js'),
  User = require('../models/User.js'),
  fs = require('fs')


  //Shows all stadiums
  router.get('/', (req,res)=>{
    Stadium.find({}, (err, stadiums)=>{
      console.log(stadiums.length)
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

  router.get('/checkins', (req, res)=>{
    CheckIn.find({}, (err, checkIns)=>{
      if(err) console.log(err)
      res.json({message:"ok", data: checkIns})
    })
  })


router.get('/:id', (req, res)=>{
  Stadium.findById(req.params.id, (err, stadium)=>{
    if (err) console.log(err)
    res.json(stadium)
  })
})

router.post('/:id/checkin', (req, res)=>{
   User.findById(req.user._id, (err, user)=>{
     var newCheckIn = new CheckIn({
       _stadiumID: req.params.id,
       _userID: req.user._id,
       comment: req.body.comment
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



module.exports = router

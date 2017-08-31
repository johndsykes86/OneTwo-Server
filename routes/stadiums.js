const express = require('express'),
  router = express.Router(),
  Stadium = require('../models/Stadium.js'),
  CheckIn = require('../models/CheckIn.js'),
  User = require('../models/User.js'),
  fs = require('fs')


//Seed stadium database route
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


  //Shows all stadiums
  router.get('/', (req,res)=>{
    Stadium.find({}, (err, stadiums)=>{
      res.json(stadiums)
    })
  })

//shows information for one stadium
router.get('/:id', (req, res)=>{
  Stadium.findById(req.params.id, (err, stadium)=>{
    if (err) console.log(err)
    res.json(stadium)
  })
})




module.exports = router

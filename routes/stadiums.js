const express = require('express'),
  router = express.Router(),
  Stadium = require('../models/Stadium.js'),
  fs = require('fs')

//Seed stadium database router
router.get('/seed', (req, res) => {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
      if (err) console.log(err)
      const stadiums = JSON.parse(data)

      Stadium.insertMany(stadiums, (err, result)=>{
        res.json(result)
      })
    })
  });


router.get('/', (req, res)=>{
  Stadium.find({}, (err, stadiums)=>{
    if (err) console.log(err)
    res.json(stadiums)
  })
})

module.exports = router

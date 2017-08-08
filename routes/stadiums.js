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

    router.get('/', (req,res)=>{
      Stadium.find({}, (err, stadiums)=>{
        res.json(stadiums)
      })
    })
  });


router.get('/:id', (req, res)=>{
  Stadium.findById(req.params.id, (err, stadium)=>{
    if (err) console.log(err)
    res.json(stadium)
  })
})

module.exports = router

const express = require('express'),
 router = express.Router(),
 User = require('../models/User.js')


//Users Index route
router.get('/', (req, res)=>{
  User.find({}, (err, users)=>{
    res.json({message: "This is the user index route", users: users})
  })
})

//Create User route
router.post('/', (req, res)=>{
  User.create(req.body, (err, user)=>{
    if (err) return res.json(err)
    res.json({message: 'user created', data:user})
  })
})

//Get ind. user route
router.get('/:id', (req, res)=>{
  User.findById(req.params.id, (err, user)=>{
    if (err) console.log(err)
    res.json(user)
  })
})

//update ind. user route
router.patch('/:id', (req, res)=>{
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, userUpdated)=>{
    if (err) console.log(err)
    res.json({message: "User Updated", user: userUpdated})
  })
})

//delete user route
router.delete('/:id', (req, res)=>{
  User.findByIdAndRemove(req.params.id, (err, removedUser)=>{
    if (err) console.log(err)
    res.json({message: "User Deleted", user: removedUser})
  })
})

module.exports = router

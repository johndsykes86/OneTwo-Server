const express = require('express'),
 router = express.Router(),
 jwt = require('jsonwebtoken'),
 User = require('../models/User.js')



//Users Index route
// router.get('/', (req, res)=>{
//   User.find({}, (err, users)=>{
//     res.json({message: "This is the user index route", users: users})
//   })
// })



//Get ind. user route
router.get('/:id', (req, res)=>{
  User.findById(req.params.id, (err, user)=>{
    if (err) console.log(err)
    res.json(user)
  })
})

//update ind. user route
router.patch('/:id', (req, res)=>{
  // Instead of using User.findByIdAndUpdate(), we'll use User.findById()
   User.findById(req.params.id, (err, user) => {
     // and update manually here by merging the request body ({name, email, and/or password}) into the user we found by ID.
     Object.assign(user, req.body)

     // then we save here, which triggers the mongoose middleware in our User model
     // so that in case the user is changing their password, the new password gets hashed before
     // saving to the database (see User model, in userSchema.pre('save')...):
     user.save((err, updatedUser) => {
       res.json({success: true, message: "User updated.", user: updatedUser})
     })
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

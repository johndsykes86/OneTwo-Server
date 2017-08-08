const express = require('express'),
 router = express.Router(),
 jwt = require('jsonwebtoken'),
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



//User log-in
router.post('/login', (req, res) => {
  // first, find user by the email in the request body.
  // When retrieving the user from database, include the password for authentication:
  User.findOne({email: req.body.email}, '+password', (err, user) => {
    // if there's no user found, or they put a wrong password:
    if(!user || (user && !user.validPassword(req.body.password))) {
      // stop here and let the client know that the info is incorrect:
      return res.json({success: false, message: "Incorrect email or password."})
    }
    // otherwise, use mongoose document's toObject() method to get a stripped down version of
    // just the user's data (name, email etc) as a simple object:
    const userData = user.toObject()

    // remove the password from this object before creating the token:
    delete userData.password

    // create the token, embedding the user's info in the payload of the token:
    const token = jwt.sign(userData, process.env.SECRET)

    // send the token back to the client in our response:
    res.json({success: true, message: "Logged in successfully.", token})
  })
})

module.exports = router

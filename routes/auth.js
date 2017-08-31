const express = require('express'),
      jwt = require('jsonwebtoken'),
      authRouter = express.Router(),
      User = require('../models/User.js')


authRouter.get('/', (req,res)=>{
  res.json({message: "this is the index route. If I were a better developer, I'd have a properly documented route"})
})


//User creation
authRouter.post('/signup', (req, res)=>{
  User.create(req.body, (err, user)=>{
    if (err) return res.json(err)
    res.json({message: 'user created', data:user})
  })
})

//User log-in
authRouter.post('/login', (req, res) => {
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

module.exports = authRouter

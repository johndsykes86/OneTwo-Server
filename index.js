//package requirements
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs');



//routes
const userRoutes = require('./routes/users')
const stadiumRoutes = require('./routes/stadiums')
const authRoutes = require('./routes/auth')
//models
const User = require('./models/User.js')


//utility variables
port = process.env.PORT||3001
MongoUrl = process.env.MONGO_URL || 'mongodb://localhost/onetwo'

mongoose.connect(MongoUrl, (err)=>{
  console.log(err|| "Connected to MongoDB")
})

//Enables CORS on the server
app.use(cors())

//calls Morgan middleware for logging of requests
app.use(logger('dev'))

//calls bodyParser for parsing json
app.use(bodyParser.json())

//Api routes & token verifiation.
app.use('/',authRoutes)
app.use('/users', userRoutes)
app.use('/stadiums', stadiumRoutes)

// this function is used as middleware to restrict access.
// client must include a token in their request(s) to proceed
function verifyToken(req, res, next) {
  // try to find a token in the request's headers:
  const token = req.headers['token']
  // if the token exists
  if(token) {
    // verify the token's authenticity:
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      // if there's a problem verifying:
      if(err) return res.json({success: false, message: "Token could not be verified."})
      // otherwise, we can get the user's info from the decoded token
      // and make it available from the req object:
      req.user = decoded

      // proceed to the originally requested route:
      next()
    })
  } else { // if token is NOT provided in the request headers:
    res.json({success: false, message: "No token provided. Access denied."})
  }
}








app.listen(port, (err)=>{
  console.log(err||`Server running on ${port}`)
})

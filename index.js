//package requirements
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs');


//routes
const userRoutes = require('./routes/users')
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

app.use('/users', userRoutes)








app.listen(port, (err)=>{
  console.log(err||`Server running on ${port}`)
})

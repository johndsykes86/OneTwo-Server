//package requirements
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const cors = require('cors')
//utility variables
port = process.env.PORT||3001
MongoUrl = proces.env.MONGO_URL || 'mongodb://localhost/onetwo'

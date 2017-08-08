const mongoose = require('mongoose'),
      checkInSchema = new mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
        _stadium: {type: mongoose.Schema.Types.ObjectId, ref:"Stadium", required: true},
        hascheckedIn: {type: Boolean, required: true},

      })
